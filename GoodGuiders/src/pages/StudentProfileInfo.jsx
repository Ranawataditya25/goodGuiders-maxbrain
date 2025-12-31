import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Modal, ListGroup, Spinner, Badge } from "react-bootstrap";
import IMAGE_URLS from "/src/pages/api/Imgconfig.js";

/* ---------- avatar helper (same as All_Student) ---------- */
function getStudentAvatar(email = "") {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  const avatarIndex = Math.abs(hash % 10) + 1;
  return IMAGE_URLS[`avtar/${avatarIndex}.jpg`];
}

export default function StudentProfileInfo() {
  const { email } = useParams();
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const role = loggedInUser.role; // admin | mentor | student
  const canView = role === "admin" || role === "mentor";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------- chat modal ---------- */
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

  /* ---------- load student ---------- */
  useEffect(() => {
    async function loadStudent() {
      setLoading(true);
      const res = await fetch(
        `http://127.0.0.1:5000/api/stats/student/${encodeURIComponent(
          email
        )}/details`
      );
      const json = await res.json();
      setData(json);
      setLoading(false);
    }
    loadStudent();
  }, [email]);

  /* ---------- admin: view chat ---------- */
  const handleViewMessages = async (mentorEmail, mentorName) => {
    const uniqueName = makeUniqueName(email, mentorEmail);
    setActiveChatTitle(`${student.name} ↔ ${mentorName}`);
    setShowMessagesModal(true);
    setMessagesLoading(true);

    const res = await fetch(
      `http://127.0.0.1:5000/api/conversation/${encodeURIComponent(
        uniqueName
      )}/messages`
    );
    const json = await res.json();
    setMessagesList(json.messages?.reverse() || []);
    setMessagesLoading(false);
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  if (!canView) return <p className="text-center mt-5">Access denied</p>;

  /* ---------- safe destructuring ---------- */
  const student = data?.student || {};
  const performance = data?.performance || {};
  const exams = data?.exams || [];
  const mentors = data?.mentors || { count: 0, items: [] };

  /* ================= UI ================= */
  return (
    <>
    <div className="themebody-wrap" style={{ marginTop: 120 }}>
      {/* COVER */}
      <div
        style={{
          height: 220,
          background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
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
                top: 110, // below navbar
              }}
            >
              <img
                src={getStudentAvatar(student.email)}
                className="rounded-circle mx-auto"
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "cover",
                  border: "4px solid white",
                }}
                alt="student"
              />

              <h5 className="mt-3 mb-0 fw-bold">{student.name}</h5>
              <p className="small text-muted">
                Class {student.className || "—"}
              </p>

              {role === "mentor" && (
                <Button
                  size="sm"
                  className="mt-3"
                  onClick={() =>
                    navigate(`/chat/${student.email}`, {
                      state: { studentName: student.name },
                    })
                  }
                >
                  💬 Chat
                </Button>
              )}
            </div>
          </div>

          {/* ================= RIGHT (SPLIT CARDS) ================= */}
          <div className="col-md-8">
            {/* ABOUT */}
            <div className="card shadow-sm p-4 mb-3">
              <h5 className="fw-bold mb-3">About Student</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <p>
                    <strong>Email:</strong> {student.email}
                  </p>
                  <p>
                    <strong>DOB:</strong> {student.dob || "-"}
                  </p>
                  <p>
                    <strong>Address:</strong> {student.address || "-"}
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Mobile:</strong> {student.mobileNo || "-"}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge ${
                        student.isDisabled ? "bg-danger" : "bg-success"
                      }`}
                    >
                      {student.isDisabled ? "Disabled" : "Active"}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* PERFORMANCE */}
            <div className="card shadow-sm p-4 mb-3">
              <h5 className="fw-bold mb-3">📊 Performance</h5>
              <div className="d-flex gap-3">
                <Badge bg="primary">
                  Exams Given: {performance.examsCount || 0}
                </Badge>
                <Badge bg="info">
                  {performance.category || "Not evaluated"}
                </Badge>
              </div>
            </div>

            {/* EXAMS */}
            <div className="card shadow-sm p-4 mb-3">
              <h5 className="fw-bold mb-3">📝 Recent Exams</h5>
              {exams.length === 0 ? (
                <p className="text-muted">No exams found</p>
              ) : (
                <ListGroup>
                  {exams.slice(0, 5).map((e) => (
                    <ListGroup.Item key={e.id}>
                      <strong>
                        Class {e.class} – {e.type?.toUpperCase()}
                      </strong>
                      <br />
                      <small className="text-muted">
                        {e.percentage !== null
                          ? `${e.percentage}% (${e.score}/${e.totalMarks})`
                          : "Not evaluated"}
                      </small>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </div>

            {/* MENTORS */}
            {role === "admin" && (
              <div className="card shadow-sm p-4">
                <h5 className="fw-bold mb-3">👨‍🏫 Connected Mentors</h5>
                {mentors.count === 0 ? (
                  <p className="text-muted">No mentors connected</p>
                ) : (
                  <ListGroup>
                    {mentors.items.map((m) => (
                      <ListGroup.Item
                        key={m.email}
                        className="d-flex justify-content-between align-items-center"
                      >
                        {/* 👇 CLICKABLE MENTOR PROFILE */}
                        <div
                          className="d-flex align-items-center gap-2"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigate(
                              `/doctor-info/${encodeURIComponent(m.email)}`
                            )
                          }
                        >
                          <img
                            src={getStudentAvatar(m.email)}
                            alt={m.name}
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />

                          <div>
                            <strong>{m.name}</strong>
                            <div className="small text-muted">
                              {m.specialization || "-"}
                            </div>
                          </div>
                        </div>

                        {/* 👇 ADMIN CHAT BUTTON (unchanged) */}
                        {role === "admin" && (
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => handleViewMessages(m.email, m.name)}
                          >
                            View Chat
                          </Button>
                        )}
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

      {/* ================= CHAT MODAL ================= */}
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
