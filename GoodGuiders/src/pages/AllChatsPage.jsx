import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Spinner } from "react-bootstrap";

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
          `http://127.0.0.1:5000/api/conversations?email=${userEmail}`
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
    const otherEmail = conv.participants.find((p) => p !== userEmail);

    // Pass the uniqueName of the conversation via state
    navigate(`/chat/${encodeURIComponent(otherEmail)}`, {
      state: { conversationUniqueName: conv.uniqueName },
    });
  };

  return (
    <Container className="mt-95">
      <Button variant="secondary" className="mb-4" onClick={() => navigate(-1)}>
        &larr; Back
      </Button>
      <h1 className="mb-4 text-center">All Chats</h1>

      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" />
        </div>
      ) : conversations.length === 0 ? (
        <p className="text-center">No conversations yet.</p>
      ) : (
        <div className="d-flex flex-column gap-3">
          {conversations.map((conv, idx) => {
            const otherEmail = conv.participants.find((p) => p !== userEmail);
            return (
              <Card
                key={idx}
                onClick={() => openChat(conv)}
                style={{ cursor: "pointer", minHeight: "80px" }}
                className="shadow-sm"
              >
                <Card.Body className="d-flex flex-column justify-content-center">
                  <h5 className="mb-2">{otherEmail}</h5>
                  <small className="text-muted">
                    {conv.lastMessage
                      ? `${
                          conv.lastMessage.author === userEmail ? "You: " : ""
                        }${conv.lastMessage.body}`
                      : "No messages yet"}
                  </small>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}
    </Container>
  );
}
