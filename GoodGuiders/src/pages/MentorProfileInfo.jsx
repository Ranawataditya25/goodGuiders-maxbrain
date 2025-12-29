import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Modal, ListGroup, Spinner } from "react-bootstrap";

export default function MentorProfileInfo() {
  const { email } = useParams();
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const role = loggedInUser.role; // admin | student | mentor

  const canView = role === "admin" || role === "student";

  const [mentorDetails, setMentorDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const [avgRating, setAvgRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);

  /* ---------- rating modal ---------- */
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingSubmitting, setRatingSubmitting] = useState(false);

  /* ---------- messages modal (admin) ---------- */
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesList, setMessagesList] = useState([]);
  const [activeChatTitle, setActiveChatTitle] = useState("");

  /* ---------- helpers ---------- */
  const sanitize = (s = "") =>
    String(s).trim().toLowerCase().replace(/[^a-z0-9]/g, "_");

  const makeUniqueName = (a = "", b = "") =>
    [sanitize(a), sanitize(b)].sort().join("_");

  /* ---------- load mentor ---------- */
  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const res = await fetch(
        `http://127.0.0.1:5000/api/stats/mentor/${encodeURIComponent(
          email
        )}/details`
      );
      const data = await res.json();
      setMentorDetails(data);

      const ratingRes = await fetch(
        `http://127.0.0.1:5000/api/stats/mentor/${encodeURIComponent(
          email
        )}/rating`
      );
      const ratingData = await ratingRes.json();
      setAvgRating(ratingData.avgRating || 0);
      setRatingCount(ratingData.count || 0);

      setLoading(false);
    }

    loadData();
  }, [email]);

  /* ---------- admin: view messages ---------- */
  const handleViewMessages = async (studentEmail, studentName) => {
    const uniqueName = makeUniqueName(email, studentEmail);
    setActiveChatTitle(`${mentorDetails.mentor.name} ↔ ${studentName}`);
    setShowMessagesModal(true);
    setMessagesLoading(true);

    const res = await fetch(
      `http://127.0.0.1:5000/api/conversation/${encodeURIComponent(
        uniqueName
      )}/messages`
    );
    const data = await res.json();
    setMessagesList(data.messages?.reverse() || []);
    setMessagesLoading(false);
  };

  /* ---------- submit rating ---------- */
  const submitRating = async () => {
    setRatingSubmitting(true);

    await fetch(
      `http://127.0.0.1:5000/api/stats/mentor/${encodeURIComponent(
        email
      )}/rate`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentEmail: loggedInUser.email,
          rating: selectedRating,
        }),
      }
    );

    setShowRatingModal(false);
    setSelectedRating(0);
    setRatingSubmitting(false);
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  if (!canView) return <p className="text-center mt-5">Access denied</p>;

  const mentor = mentorDetails.mentor;

  /* ================= UI ================= */
  return (
    <>
      {/* COVER */}
      <div
        style={{
          height: 220,
          background:
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      />

      <div className="container" style={{ marginTop: -90 }}>
        <div className="row g-4">
          {/* LEFT CARD */}
          <div className="col-md-4">
            <div
  className="card text-center p-3"
  style={{
    borderRadius: 14,
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  }}
>
              <img
                src={
                  mentor.profileImage
                    ? `http://127.0.0.1:5000${mentor.profileImage}`
                    : "https://i.pravatar.cc/200"
                }
                className="rounded-circle mx-auto"
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "cover",
                  border: "4px solid white",
                }}
              />

              <h5 className="mt-3 mb-0 fw-bold">{mentor.name}</h5>
<div className="text-warning small">
  ⭐ {avgRating.toFixed(1)}{" "}
  <span className="text-muted">({ratingCount})</span>
</div>

              <p className="small text-muted">
                {mentor.specialization || "—"}
              </p>

             <div className="d-grid gap-2 mt-3">
  {role === "student" && (
    <Button
      size="sm"
      variant="primary"
      className="fw-semibold"
      onClick={() =>
        navigate(`/chat/${mentor.email}`, {
          state: { mentorName: mentor.name },
        })
      }
    >
      💬 Chat
    </Button>
  )}

  {role === "student" && (
    <Button
      size="sm"
      variant="outline-warning"
      onClick={() => setShowRatingModal(true)}
    >
      ⭐ Rate
    </Button>
  )}

  {(role === "admin" || role === "student") && (
    <Button
      size="sm"
      variant="outline-secondary"
      onClick={() =>
        navigate(`/mentor/${email}/materials`, {
          state: { mentorName: mentor.name },
        })
      }
    >
      📚 Materials
    </Button>
  )}
</div>

            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="col-md-8">
            <div className="card shadow-sm p-4">
              <h5 className="fw-bold mb-2">About Mentor</h5>
              <p className="text-muted">
                {mentor.bio || "No bio available"}
              </p>

              <hr className="my-3" />
<div className="row g-3">
                <div className="col-md-6">
                  <p>
                    <strong>Email:</strong> {mentor.email}
                  </p>
                  <p>
                    <strong>Experience:</strong> {mentor.experience} yrs
                  </p>
                  <p>
                    <strong>Degree:</strong> {mentor.degree || "-"}
                  </p>
                </div>

                <div className="col-md-6">
                  <p>
                    <strong>Specialization:</strong>{" "}
                    {mentor.specialization || "-"}
                  </p>
                  <p>
  <strong>Status:</strong>{" "}
  <span
    className={`badge ${
      mentor.isDisabled ? "bg-danger" : "bg-success"
    }`}
  >
    {mentor.isDisabled ? "Disabled" : "Active"}
  </span>
</p>
                  {role !== "student" && (
                    <p>
                      <strong>Mobile:</strong> {mentor.mobileNo}
                    </p>
                  )}
                </div>
              </div>

              <hr />

              <h6>Connected Students</h6>
              {mentorDetails.students?.count === 0 ? (
                <p className="text-muted">No students connected</p>
              ) : (
                <ListGroup>
                  {mentorDetails.students.items.map((s) => (
                    <ListGroup.Item
                      key={s.email}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>{s.name}</strong> ({s.class || "-"})
                      </div>

                      {role === "admin" && (
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => handleViewMessages(s.email, s.name)}
                        >
                          View Chat
                        </Button>
                      )}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RATING MODAL */}
      <Modal show={showRatingModal} onHide={() => setShowRatingModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rate Mentor</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {[1, 2, 3, 4, 5].map((s) => (
            <span
              key={s}
              style={{
                fontSize: 32,
                cursor: "pointer",
                color: s <= selectedRating ? "#ffc107" : "#ccc",
              }}
              onClick={() => setSelectedRating(s)}
            >
              ★
            </span>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submitRating} disabled={!selectedRating}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ADMIN CHAT MODAL */}
      <Modal
        show={showMessagesModal}
        onHide={() => setShowMessagesModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{activeChatTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {messagesLoading && <Spinner />}
          {messagesList.map((m, i) => (
            <div key={i}>
              <strong>{m.author}</strong>
              <p>{m.body}</p>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
}