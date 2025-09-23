import { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import PageBreadcrumb from "../componets/PageBreadcrumb";

export default function ChatPage() {
  const { mentorEmail } = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const userEmail = loggedInUser.email;
  const isMentor = loggedInUser.role === "mentor";

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [conversation, setConversation] = useState(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [subscriptionExpired, setSubscriptionExpired] = useState(false);

  const messagesEndRef = useRef(null);
  const location = useLocation();
  const uniqueNameFromState = location.state?.conversationUniqueName;

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  // Initialize conversation
  useEffect(() => {
    if (!userEmail && !mentorEmail) return;

    const initChat = async () => {
      try {
        let uniqueName;
        if (isMentor) {
          uniqueName = uniqueNameFromState;
          if (!uniqueName) {
            console.error("Mentor must select an existing conversation");
            setLoading(false);
            return;
          }
        } else {
          const convRes = await fetch(
            "http://127.0.0.1:5000/api/conversation",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ studentEmail: userEmail, mentorEmail }),
            }
          );
          const convData = await convRes.json();
          uniqueName = convData.uniqueName;
          if (!uniqueName) {
            console.error("No conversation uniqueName found");
            setLoading(false);
            return;
          }
        }

        setConversation({ uniqueName });
        setLoading(false);
      } catch (err) {
        console.error("Chat init error:", err);
        setLoading(false);
      }
    };

    initChat();
  }, [mentorEmail, userEmail, uniqueNameFromState, isMentor]);

  // Poll messages every 2s
  useEffect(() => {
    if (!conversation?.uniqueName) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/api/conversation/${conversation.uniqueName}/messages`
        );
        const data = await res.json();
        const sortedMessages = (data.messages || [])
          .map((m) => ({
            author: m.author,
            body: m.body,
            timestamp: m.dateCreated,
          }))
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        setMessages((prev) => {
          const prevStr = JSON.stringify(prev);
          const newStr = JSON.stringify(sortedMessages);
          return prevStr === newStr ? prev : sortedMessages;
        });
      } catch (err) {
        console.error("Fetch messages error:", err);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [conversation?.uniqueName]);

  const handleSendMessage = async () => {
    if (!input.trim() || !conversation) return;

    // const newMessage = {
    //   author: userEmail,
    //   body: input,
    //   timestamp: new Date(),
    // };

    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/conversation/${conversation.uniqueName}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ author: userEmail, body: input }),
        }
      );

      if (res.status === 403 && !isMentor) {
        // Free chat expired for student
        setSubscriptionExpired(true);
        return;
      }

      const msgData = await res.json();
      setMessages((prev) => [...prev, { author: msgData.author, body: msgData.body, timestamp: msgData.dateCreated }]);
      setInput("");
      setTimeout(scrollToBottom, 100);
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  const handleScroll = (e) => {
    const el = e.target;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setAutoScroll(distanceFromBottom < 50);
  };

  useEffect(() => {
    const list = document.getElementById("chat-list");
    if (list) list.addEventListener("scroll", handleScroll);
    return () => list?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (autoScroll) scrollToBottom();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]); 

  return (
    <div className="themebody-wrap">
      <PageBreadcrumb pagename={`Chat with ${mentorEmail}`} />
      <div className="theme-body">
        <Container fluid>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Card>
                <Card.Body style={{ height: "70vh", display: "flex", flexDirection: "column" }}>
                  {loading ? (
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <Spinner animation="border" />
                    </div>
                  ) : (
                    <>
                      {!isMentor && subscriptionExpired && (
                        <div
                          style={{
                            backgroundColor: "#ffe5e5",
                            color: "#900",
                            padding: "10px",
                            textAlign: "center",
                            borderRadius: "5px",
                            marginBottom: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          ⏳ Your 5-minute free chat is over. Please{" "}
                          <a href="/subscribe">subscribe</a> to continue.
                        </div>
                      )}

                      <ListGroup id="chat-list" className="flex-grow-1 overflow-auto mb-3">
                        {messages.map((msg, idx) => (
                          <ListGroup.Item
                            key={idx}
                            className={msg.author === userEmail ? "text-end bg-light" : "text-start bg-white"}
                          >
                            <b>{msg.author === userEmail ? "You" : msg.author}</b>: {msg.body}
                          </ListGroup.Item>
                        ))}
                        <div ref={messagesEndRef} />
                      </ListGroup>

                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSendMessage();
                        }}
                        className="d-flex"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Type a message..."
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          disabled={!isMentor && subscriptionExpired}
                        />
                        <Button
                          type="submit"
                          variant="primary"
                          className="ms-2"
                          disabled={!isMentor && subscriptionExpired}
                        >
                          Send
                        </Button>
                      </Form>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
