import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Spinner } from "react-bootstrap";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function AllChatsPage() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const userEmail = loggedInUser.email;

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch(
          `${API}/conversations?email=${userEmail}`
        );
        const data = await res.json();
        setConversations(data.conversations || []);
      } catch (err) {
        console.error("Fetch conversations error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) fetchConversations();
  }, [userEmail]);

  const openChat = (conv) => {
    const otherParticipant = conv.participantsDetailed.find(
      (p) => p.email !== userEmail
    );

    navigate(`/chat/${encodeURIComponent(otherParticipant.email)}`, {
      state: {
        conversationUniqueName: conv.uniqueName,
        mentorName: otherParticipant.name, // ✅ PASS NAME
      },
    });
  };

  const formatDateTime = (timestamp) => {
  if (!timestamp) return "";

  const date = new Date(timestamp);
  const now = new Date();

  const isToday =
    date.toDateString() === now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.toDateString() === yesterday.toDateString();

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) return time;
  if (isYesterday) return `Yesterday, ${time}`;

  return `${date.toLocaleDateString([], {
    day: "2-digit",
    month: "short",
  })}, ${time}`;
};

  return (
    <Container style={{ marginTop: 120, maxWidth: 720 }}>
      <Button variant="secondary" className="mb-4" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <h2 className="mb-4 text-center fw-bold">Chats</h2>

      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" />
        </div>
      ) : conversations.length === 0 ? (
        <p className="text-center text-muted">No conversations yet.</p>
      ) : (
        <div className="d-flex flex-column gap-2">
          {conversations.map((conv, idx) => {
            const otherParticipant = conv.participantsDetailed?.find(
              (p) => p.email !== userEmail
            );

            const initial =
              otherParticipant?.name?.charAt(0).toUpperCase() ||
              otherParticipant?.email?.charAt(0).toUpperCase();

            return (
              <Card
                key={idx}
                onClick={() => openChat(conv)}
                className="shadow-sm chat-card"
                style={{ cursor: "pointer", borderRadius: 12 }}
              >
                <Card.Body className="d-flex align-items-center gap-3">
                  {/* Avatar */}
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      backgroundColor: "#0d6efd",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  >
                    {initial}
                  </div>

                  {/* Chat info */}
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-1 fw-semibold">
                        {otherParticipant?.name || otherParticipant?.email}
                      </h6>

                      {conv.lastMessage?.timestamp && (
  <small className="text-muted">
    {formatDateTime(conv.lastMessage.timestamp)}
  </small>
)}
                    </div>

                    <small className="text-muted">
                      {conv.lastMessage ? (
                        <>
                          {conv.lastMessage.author === userEmail && (
                            <strong>You: </strong>
                          )}
                          {conv.lastMessage.body}
                        </>
                      ) : (
                        "No messages yet"
                      )}
                    </small>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}

      {/* Hover effect */}
      <style>{`
        .chat-card:hover {
          background-color: #f8f9fa;
        }
      `}</style>
    </Container>
  );
}