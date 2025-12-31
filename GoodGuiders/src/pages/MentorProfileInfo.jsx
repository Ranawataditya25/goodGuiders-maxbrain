import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Modal, ListGroup, Spinner, Badge } from "react-bootstrap";
import IMAGE_URLS from "/src/pages/api/Imgconfig.js";

/* ---------- avatar helper (same pattern as students) ---------- */
function getMentorAvatar(email = "") {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  const avatarIndex = Math.abs(hash % 10) + 1;
  return IMAGE_URLS[`avtar/${avatarIndex}.jpg`];
}

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

  /* ---------- messages modal (admin) ---------- */
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesList, setMessagesList] = useState([]);
  const [activeChatTitle, setActiveChatTitle] = useState("");

  /* ---------- helpers ---------- */
  const sanitize = (s = "") =>
    String(s)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_");

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
    setActiveChatTitle(`${mentor.name} ↔ ${studentName}`);
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
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  if (!canView) return <p className="text-center mt-5">Access denied</p>;

  /* ---------- safe destructuring ---------- */
  const mentor = mentorDetails?.mentor || {};
  const students = mentorDetails?.students || { count: 0, items: [] };

  /* ================= UI ================= */
  return (
    <>
      <div className="themebody-wrap" style={{ marginTop: 120 }}>
        {/* COVER */}
        <div
          style={{
            height: 220,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        />

        <div className="container" style={{ marginTop: -90 }}>
          <div className="row g-4 align-items-start">
            {/* ================= LEFT (STICKY) ================= */}
            <div className="col-md-4">
              <div
                className="card text-center p-3"
                style={{
                  borderRadius: 14,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  position: "sticky",
                  top: 110,
                }}
              >
                <img
                  src={getMentorAvatar(mentor.email)}
                  className="rounded-circle mx-auto"
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: "cover",
                    border: "4px solid white",
                  }}
                  alt="mentor"
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

            {/* ================= RIGHT (SPLIT CARDS) ================= */}
            <div className="col-md-8">
              {/* ABOUT */}
              <div className="card shadow-sm p-4 mb-3">
                <h5 className="fw-bold mb-3">About Mentor</h5>
                <p className="text-muted">{mentor.bio || "No bio available"}</p>

                <div className="row g-3">
                  <div className="col-md-6">
                    <p>
                      <strong>Email:</strong> {mentor.email}
                    </p>
                    <p>
                      <strong>Experience:</strong> {mentor.experience || "-"}{" "}
                      yrs
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
                        <strong>Mobile:</strong> {mentor.mobileNo || "-"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* CONNECTED STUDENTS */}
              {role === "admin" && (
                <div className="card shadow-sm p-4">
                  <h5 className="fw-bold mb-3">👨‍🎓 Connected Students</h5>
                  {students.count === 0 ? (
                    <p className="text-muted">No students connected</p>
                  ) : (
                    <ListGroup>
                      {students.items.map((s) => (
                        <ListGroup.Item
                          key={s.email}
                          className="d-flex justify-content-between align-items-center"
                        >
                          {/* 👇 CLICKABLE STUDENT PROFILE */}
                          <div
                            className="d-flex align-items-center gap-2"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigate(
                                `/patient-info/${encodeURIComponent(s.email)}`
                              )
                            }
                          >
                            <img
                              src={getMentorAvatar(s.email)}
                              alt={s.name}
                              style={{
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />

                            <div>
                              <strong>{s.name}</strong>
                              <div className="small text-muted">
                                {s.class || "-"}
                              </div>
                            </div>
                          </div>

                          {/* RIGHT: buttons */}
                          <div className="d-flex gap-2">
                            {/* ✅ VIEW PROFILE BUTTON */}
                            <Button
                              size="sm"
                              variant="outline-secondary"
                              onClick={() =>
                                navigate(
                                  `/patient-info/${encodeURIComponent(s.email)}`
                                )
                              }
                            >
                              View Profile
                            </Button>

                            {/* ADMIN CHAT */}
                            <Button
                              size="sm"
                              variant="outline-primary"
                              onClick={() =>
                                handleViewMessages(s.email, s.name)
                              }
                            >
                              View Chat
                            </Button>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= RATING MODAL ================= */}
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

      {/* ================= ADMIN CHAT MODAL ================= */}
      <Modal
        show={showMessagesModal}
        onHide={() => setShowMessagesModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{activeChatTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {messagesLoading && <Spinner />}
          {messagesList.map((m, i) => (
            <div key={i} className="mb-2">
              <strong>{m.author}</strong>
              <p className="mb-1">{m.body}</p>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
}
