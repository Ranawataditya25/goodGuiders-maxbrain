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
import VideoCall from "./VideoCall";

export default function ChatPage() {
  const { mentorEmail } = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const userEmail = loggedInUser.email;
  const isMentor = loggedInUser.role === "mentor";

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [conversation, setConversation] = useState(null);
  // const [autoScroll, setAutoScroll] = useState(true);
  const [subscriptionExpired, setSubscriptionExpired] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [incomingCall, setIncomingCall] = useState(false);
  const [caller, setCaller] = useState("");

  const messagesEndRef = useRef(null);
  const location = useLocation();
  const uniqueNameFromState = location.state?.conversationUniqueName;

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  // ✅ Initialize conversation
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

  // ✅ Poll messages
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

  // ✅ Start Call
  const startVideoCall = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/video/${conversation.uniqueName}/start-call`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ caller: userEmail }),
        }
      );
      if (res.ok) setShowVideo(true);
    } catch (err) {
      console.error("Start call error:", err);
    }
  };

  // ✅ Poll call status (incoming)
  useEffect(() => {
    if (!conversation?.uniqueName) return;

    const checkCallStatus = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/api/conversation/${conversation.uniqueName}`
        );
        if (!res.ok) return; // handle 404
        const convo = await res.json();
        if (convo.callStatus === "ringing" && convo.caller !== userEmail) {
          setIncomingCall(true);
          setCaller(convo.caller);
        }
      } catch (err) {
        console.error("Poll call error:", err);
      }
    };

    const interval = setInterval(checkCallStatus, 3000);
    return () => clearInterval(interval);
  }, [conversation?.uniqueName, userEmail]);

  const handleAcceptCall = async () => {
    await fetch(
      `http://127.0.0.1:5000/api/video/${conversation.uniqueName}/answer-call`,
      { method: "PUT" }
    );
    setIncomingCall(false);
    setShowVideo(true);
  };

  const handleEndCall = async () => {
    await fetch(
      `http://127.0.0.1:5000/api/video/${conversation.uniqueName}/end-call`,
      { method: "PUT" }
    );
    setShowVideo(false);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !conversation) return;
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
        setSubscriptionExpired(true);
        return;
      }

      const msgData = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          author: msgData.author,
          body: msgData.body,
          timestamp: msgData.dateCreated,
        },
      ]);
      setInput("");
      setTimeout(scrollToBottom, 100);
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

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
                      {!isMentor && subscriptionExpired && (
                        <div className="bg-danger text-white p-2 rounded mb-2 text-center">
                          ⏳ Free chat over. <a href="/subscribe">Subscribe</a>{" "}
                          to continue.
                        </div>
                      )}

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

                        <Button
                          variant="success"
                          className="ms-2"
                          onClick={startVideoCall}
                        >
                        Start Call
                        </Button>
                      </Form>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* ✅ Incoming Call Popup */}
        {incomingCall && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-bounce">
            <div className="bg-white rounded-lg p-5 text-center shadow-xl">
              <h4 className="mb-3">{caller} is calling...</h4>
              <div className="flex justify-center gap-3">
                <Button variant="success" onClick={handleAcceptCall}>
                  Accept
                </Button>
                <Button variant="danger" onClick={() => setIncomingCall(false)}>
                  Reject
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ✅ Video Call Window */}
        {showVideo && (
          <VideoCall
            userName={userEmail}
            roomName={conversation?.uniqueName}
            onClose={handleEndCall}
          />
        )}
      </div>
    </div>
  );
}
