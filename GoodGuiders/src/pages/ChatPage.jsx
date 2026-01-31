import { useEffect, useState, useRef } from "react";
import { useCall } from "../context/CallContext";
import { useParams, useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import PageBreadcrumb from "../componets/PageBreadcrumb";
import VideoCall from "./VideoCall";
// import Video from "twilio-video";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function ChatPage() {
  const { mentorEmail } = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const userEmail = loggedInUser.email;
  const isMentor = loggedInUser.role === "mentor";

  const { stopRinging, setIncomingCall, unlockAudio, audioUnlocked } = useCall();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [conversation, setConversation] = useState(null);
  // const [autoScroll, setAutoScroll] = useState(true);
  const [subscriptionExpired, setSubscriptionExpired] = useState(false);
  const [callTracks, setCallTracks] = useState(null);
  // const [incomingCall, setIncomingCall] = useState(false);
  // const [caller, setCaller] = useState("");

  const messagesEndRef = useRef(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const uniqueNameFromQuery = params.get("uniqueName");
  const autoJoinFromQuery = params.get("autoJoinCall") === "1";
  const uniqueNameFromState = location.state?.conversationUniqueName || uniqueNameFromQuery;
  const mentorNameFromState = location.state?.mentorName;

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  // ✅ Initialize conversation
  useEffect(() => {
    if (!userEmail || !mentorEmail) return;

    const initChat = async () => {
      try {
        let uniqueName;
       if (isMentor) {
  if (uniqueNameFromState) {
    uniqueName = uniqueNameFromState;
  } else {
    // 🔥 FIX: push notification / direct open
    const convRes = await fetch(`${API}/conversation/by-users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mentorEmail: userEmail,
        studentEmail: mentorEmail,
      }),
    });

    const convData = await convRes.json();
    uniqueName = convData.uniqueName;
  }

  if (!uniqueName) {
    console.error("❌ Conversation not found");
    setLoading(false);
    return;
  }
} else {
          const convRes = await fetch(`${API}/conversation`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ studentEmail: userEmail, mentorEmail }),
          });
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
          `${API}/conversation/${conversation.uniqueName}/messages`,
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
    if (callTracks) return;

    try {
      const res = await fetch(
        `${API}/video/${conversation.uniqueName}/start-call`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            caller: userEmail,
            receiverId: mentorEmail,
          }),
        },
      );

      if (!res.ok) {
        throw new Error(await res.text());
      }

      // IMPORTANT: just open VideoCall UI
      setCallTracks(true);
    } catch (err) {
      console.error("start-call API failed:", err);
      alert("Failed to start call");
    }
  };

  // // ✅ Poll call status (incoming)
  // useEffect(() => {
  //   if (!conversation?.uniqueName) return;

  //   const checkCallStatus = async () => {
  //     try {
  //       const res = await fetch(`${API}/video/${conversation.uniqueName}`);
  //       if (!res.ok) return; // handle 404
  //       const convo = await res.json();
  //       if (
  //         convo.callStatus === "ringing" &&
  //         convo.caller !== userEmail &&
  //         !convo.isRejected
  //       ) {
  //         setIncomingCall(true);
  //         setCaller(convo.caller);
  //       }
  //     } catch (err) {
  //       console.error("Poll call error:", err);
  //     }
  //   };

  //   const interval = setInterval(checkCallStatus, 3000);
  //   return () => clearInterval(interval);
  // }, [conversation?.uniqueName, userEmail]);

  // const handleAcceptCall = async () => {
  //   try {
  //     await fetch(`${API}/video/${conversation.uniqueName}/answer-call`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         caller: caller,
  //         receiverId: userEmail,
  //       }),
  //     });

  //     // 🔥 THIS IS THE MISSING PART
  //     setIncomingCall(false);
  //     setCallTracks(true); // <-- open VideoCall UI
  //   } catch (err) {
  //     console.error("Accept call error:", err);
  //   }
  // };

  // const handleEndCall = async () => {
  //   await fetch(
  //     `http://127.0.0.1:5000/api/video/${conversation.uniqueName}/end-call`,
  //     {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         caller: userEmail,
  //         receiverId: mentorEmail,
  //         reason: "finished",
  //       }),
  //     }
  //   );
  //   setCallTracks(null);
  // };

  // add this function somewhere inside ChatPage

  // const handleRejectCall = async () => {
  //   try {
  //     await fetch(`${API}/video/${conversation.uniqueName}/end-call`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         caller: caller, // person who started call
  //         receiverId: userEmail, // person rejecting
  //         reason: "rejected",
  //       }),
  //     });
  //   } catch (err) {
  //     console.error("Reject call error:", err);
  //   } finally {
  //     setIncomingCall(false); // close popup immediately
  //   }
  // };

  const handleSendMessage = async () => {
    if (!input.trim() || !conversation) return;
    try {
      const res = await fetch(
        `${API}/conversation/${conversation.uniqueName}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ author: userEmail, body: input }),
        },
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

useEffect(() => {
  const shouldAutoJoin = location.state?.autoJoinCall || autoJoinFromQuery;
  if (!shouldAutoJoin) return;
  if (!conversation?.uniqueName) return;
  if (callTracks) return;

  const doAutoJoin = async () => {
    try {
      console.log("📞 Auto-opening VideoCall UI (attempting to answer on server)");

      // Fetch call status to get caller (if not known)
      const res = await fetch(`${API}/video/${conversation.uniqueName}`);
      if (!res.ok) {
        console.warn("Auto-join: conversation not found or no active call");
        setCallTracks(true); // still open UI
        return;
      }

      const convo = await res.json();

      // If there's an active ringing call and we are the receiver, answer it
      if (convo.callStatus === "ringing" && convo.caller && convo.caller !== userEmail) {
        await fetch(`${API}/video/${conversation.uniqueName}/answer-call`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ caller: convo.caller, receiverId: userEmail }),
        });

        // stop local ringtone immediately when we answered
        try {
          stopRinging();
          setIncomingCall(null);
        } catch (e) {
          console.warn("Auto-join stopRinging failed", e);
        }
      }

      setCallTracks(true);
    } catch (err) {
      console.error("Auto-join error:", err);
      setCallTracks(true);
    }
  };

  doAutoJoin();
}, [location.state?.autoJoinCall, autoJoinFromQuery, conversation?.uniqueName]);

  const chatStyles = `
.chat-wrapper {
  display: flex;
  flex-direction: column;
  padding: 8px;
}

.chat-bubble {
  max-width: 72%;
  padding: 8px 12px;
  margin-bottom: 4px; /* ⬅ less gap */
  border-radius: 14px;
  word-wrap: break-word;
  font-size: 16px; /* ⬅ bigger text */
  line-height: 1.35;
}

.chat-bubble.sent {
  align-self: flex-end;
  background-color: #dcf8c6; /* WhatsApp green */
  border-bottom-right-radius: 4px;
}

.chat-bubble.received {
  align-self: flex-start;
  background-color: #dcf8c6;
  border: 1px solid #eee;
  border-bottom-left-radius: 4px;
}

.chat-time {
  font-size: 9px; /* ⬅ smaller time */
  color: #888;
  text-align: right;
  margin-top: 2px;
}

/* Hide scrollbar but keep scrolling */
.chat-wrapper {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

.chat-wrapper::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}
`;

  return (
    <div className="themebody-wrap">
      <PageBreadcrumb
        pagename={`Chat with ${mentorNameFromState || mentorEmail}`}
      />
      <div className="theme-body">
        <Container fluid>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Card>
                <style>{chatStyles}</style>
                <Card.Body
                  style={{
                    height: "80vh",
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

                      <div
                        className="flex-grow-1 overflow-auto mb-3 chat-wrapper"
                        id="chat-list"
                      >
                        {messages.map((msg, idx) => {
                          const isSender = msg.author === userEmail;

                          return (
                            <div
                              key={idx}
                              className={`chat-bubble ${isSender ? "sent" : "received"}`}
                            >
                              <div>{msg.body}</div>

                              <div className="chat-time">
                                {new Date(msg.timestamp).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}
                              </div>
                            </div>
                          );
                        })}
                        <div ref={messagesEndRef} />
                      </div>
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

                        <Button
                          variant={audioUnlocked ? "outline-success" : "outline-secondary"}
                          className="ms-2"
                          onClick={() => {
                            try {
                              unlockAudio();
                            } catch (e) {
                              console.error("unlockAudio failed", e);
                            }
                          }}
                          title="Enable sound / test ringtone (requires a user gesture)"
                        >
                          {audioUnlocked ? "Sound Enabled" : "Enable sound"}
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
        {/* {incomingCall && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-bounce">
            <div className="bg-white rounded-lg p-5 text-center shadow-xl">
              <h4 className="mb-3">{caller} is calling...</h4>
              <div className="flex justify-center gap-3">
                <Button variant="success" onClick={handleAcceptCall}>
                  Accept
                </Button>
                <Button variant="danger" onClick={handleRejectCall}>
                  Reject
                </Button>
              </div>
            </div>
          </div>
        )} */}

        {/* ✅ Video Call Window */}
        {callTracks && (
          <VideoCall
            userName={userEmail}
            uniqueName={conversation.uniqueName}
            receiverId={mentorEmail}
            onClose={() => {
              setCallTracks(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
