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
  const { mentorEmail } = useParams(); // from route
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const userEmail = loggedInUser.email;
  const isMentor = loggedInUser.role === "mentor";

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [conversation, setConversation] = useState(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const messagesEndRef = useRef(null);
  const location = useLocation();
  const uniqueNameFromState = location.state?.conversationUniqueName;

  // Scroll to bottom helper
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  // Initialize conversation
  useEffect(() => {
    if (!userEmail && !mentorEmail) return;

    const initChat = async () => {
      try {
        let uniqueName;

        if (isMentor) {
          // Mentor can only access existing conversation
          uniqueName = uniqueNameFromState;
          if (!uniqueName) {
            console.error("Mentor must select an existing conversation");
            setLoading(false);
            return;
          }
        } else {
          // Student creates or gets conversation
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

  // Polling to fetch messages every 2 seconds
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

    // ✅ only update if changed
    setMessages((prev) => {
      const prevStr = JSON.stringify(prev);
      const newStr = JSON.stringify(sortedMessages);
      return prevStr === newStr ? prev : sortedMessages;
    });
  } catch (err) {
    console.error("Fetch messages error:", err);
  }
};


    fetchMessages(); // initial fetch
    const interval = setInterval(fetchMessages, 2000); // fetch every 2s

    return () => clearInterval(interval); // cleanup on unmount
  }, [conversation?.uniqueName]);

  // Send message
const handleSendMessage = async () => {
  if (!input.trim() || !conversation) return;

  const newMessage = {
    author: userEmail,
    body: input,
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, newMessage]);
  setInput("");

  // force scroll to bottom
  setTimeout(() => {
    scrollToBottom();
    setAutoScroll(true); // reset autoScroll
  }, 100);

  try {
    await fetch(
      `http://127.0.0.1:5000/api/conversation/${conversation.uniqueName}/messages`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: userEmail, body: input }),
      }
    );
  } catch (err) {
    console.error("Send message error:", err);
  }
};


  // Scroll to bottom whenever messages change

const handleScroll = (e) => {
  const el = e.target;
  const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
  setAutoScroll(distanceFromBottom < 50); // only true if within 50px
};

  // Attach scroll listener
  useEffect(() => {
    const list = document.getElementById("chat-list");
    if (list) list.addEventListener("scroll", handleScroll);
    return () => list?.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll only if user is at bottom
 useEffect(() => {
  if (autoScroll) {
    scrollToBottom();
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [messages]); // remove autoScroll from deps

  return (
    <div className="themebody-wrap">
      <PageBreadcrumb pagename={`Chat with ${mentorEmail}`} />
      <div className="theme-body">
        <Container fluid>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Card>
                <Card.Body
                  style={{
                    height: "70vh",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {loading ? (
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <Spinner animation="border" />
                    </div>
                  ) : (
                    <>
                      <ListGroup
                        id="chat-list"
                        className="flex-grow-1 overflow-auto mb-3"
                      >
                        {messages.map((msg, idx) => (
                          <ListGroup.Item
                            key={idx}
                            className={
                              msg.author === userEmail
                                ? "text-end bg-light"
                                : "text-start bg-white"
                            }
                          >
                            <b>
                              {msg.author === userEmail ? "You" : msg.author}
                            </b>
                            : {msg.body}
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
                        />
                        <Button
                          type="submit"
                          variant="primary"
                          className="ms-2"
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
