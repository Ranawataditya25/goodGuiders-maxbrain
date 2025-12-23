import { useEffect, useState, useCallback } from "react";
import {
  Container,
  Card,
  Table,
  Button,
  Spinner,
  Badge,
  Modal,
  Form,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function AdminPdfSubmissions() {
  const [list, setList] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal state
  const [show, setShow] = useState(false);
  const [selectedEval, setSelectedEval] = useState(null);
  const [selectedMentorId, setSelectedMentorId] = useState("");
  const [deadline, setDeadline] = useState("");
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");

  /* ---------------- ADMIN GUARD ---------------- */
  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/login");
    }
  }, [user?.role, navigate]);

  /* ---------------- LOAD SUBMISSIONS ---------------- */
  const load = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/pdf-evaluations`, {
        headers: {
          "x-user-id": user._id,
          "x-user-role": user.role,
        },
      });
      setList(res.data?.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [user._id, user.role]);

  /* ---------------- LOAD MENTORS ---------------- */
  const loadMentors = async () => {
    const res = await axios.get(`${API}/stats/mentors`, {
      headers: {
        "x-user-id": user._id,
        "x-user-role": user.role,
      },
    });

    // API returns { mentors: [...] }
    const activeMentors = (res.data?.mentors || []).filter(
      (m) => !m.isDisabled
    );

    setMentors(activeMentors);
  };

  useEffect(() => {
    load();
    loadMentors();
  }, [load]);


  /* ---------------- OPEN MODAL ---------------- */
  const openAssignMentor = (evalDoc) => {
    setSelectedEval(evalDoc);
    setSelectedMentorId("");
    setDeadline("");
    setShow(true);
  };

  /* ---------------- ASSIGN ---------------- */
  const assignMentor = async () => {
    if (!selectedMentor || !deadline || !selectedEval) {
      alert("Mentor and deadline are required");
      return;
    }

    setSaving(true);
    try {
      await axios.post(
        `${API}/pdf-evaluations/${selectedEval._id}/assign-mentor`,
        {
          mentorId: selectedMentorId,
          deadline, // ✅ ISO datetime
        },
        {
          headers: {
            "x-user-id": user._id,
            "x-user-role": user.role,
          },
        }
      );

      alert("✅ Mentor assigned successfully");
      closeModal();
      load();
    } catch (e) {
      alert(e.response?.data?.message || "Failed to assign mentor");
    } finally {
      setSaving(false);
    }
  };
  const canAssignMentor = (status) =>
    ["pending_admin", "rejected", "expired"].includes(status);

  const isAssigned = (status) =>
    ["assigned_mentor", "accepted"].includes(status);

  const isEvaluated = (status) => status === "evaluated";

  const statusVariant = (status) => {
    switch (status) {
      case "pending_admin":
        return "warning";
      case "assigned_mentor":
      case "accepted":
        return "info";
      case "evaluated":
        return "success";
      case "rejected":
      case "expired":
        return "danger";
      default:
        return "secondary";
    }
  };

  const closeModal = () => {
    setShow(false);
    setSelectedEval(null);
    setSelectedMentorId("");
    setDeadline("");
  };

const selectedMentor = mentors.find(
  (m) => String(m._id) === String(selectedMentorId)
);

  /* ---------------- UI ---------------- */
  return (
    <Container style={{ marginTop: 120 }}>
      <Card>
        <Card.Header>
          <h4>Subjective PDF Submissions</h4>
        </Card.Header>

        <Card.Body>
          {loading ? (
            <Spinner />
          ) : list.length === 0 ? (
            <p className="text-muted">No submissions found.</p>
          ) : (
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Subject</th>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Status</th>
                  <th>Assigned</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {list.map((x) => (
                  <tr key={x._id}>
                    <td>
                      {x.studentId?.name}
                      <br />
                      <small>{x.studentId?.email}</small>
                    </td>
                    <td>{x.testId?.class}</td>
                    <td>{x.testId?.subjects?.join(", ")}</td>
                    <td>
                      <a
                        href={`http://localhost:5000${x.questionPdfUrl}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </td>
                    <td>
                      <a
                        href={`http://localhost:5000${x.answerPdfUrl}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </td>
                    <td>
                      <Badge bg={statusVariant(x.status)}>{x.status}</Badge>
                    </td>
                    <td>{x.mentorId?.name || "—"}</td>
                    <td>
                      {/* ✅ Evaluated → show result */}
                      {isEvaluated(x.status) && (
                        <Button
                          size="sm"
                          variant="success"
                          onClick={() => {
                            setSelectedEval(x);
                            setSelectedMentorId("");
                            setDeadline("");
                            setShow(true);
                          }}
                        >
                          Evaluation Result
                        </Button>
                      )}

                      {/* ⛔ Assigned but not evaluated */}
                      {isAssigned(x.status) && (
                        <Button size="sm" variant="secondary" disabled>
                          Assigned
                        </Button>
                      )}

                      {/* ✅ Can assign / reassign */}
                      {canAssignMentor(x.status) && (
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => openAssignMentor(x)}
                        >
                          Assign Mentor
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* ================= ASSIGN MENTOR MODAL ================= */}
      <Modal show={show} onHide={() => closeModal()} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Assign Mentor for Evaluation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* ===== EVALUATION RESULT (READ ONLY) ===== */}
          {selectedEval?.status === "evaluated" && (
            <Card className="mb-3">
              <Card.Body>
                <h6 className="mb-2">Evaluation Result</h6>
                <p>
                  <strong>Marks:</strong> {selectedEval.evaluation?.marks}
                </p>
                <p>
                  <strong>Feedback:</strong>{" "}
                  {selectedEval.evaluation?.feedback || "—"}
                </p>
              </Card.Body>
            </Card>
          )}
          {selectedEval?.status !== "evaluated" && (
            <>
              {/* Mentor Select */}
              <Form.Group className="mb-3">
                <Form.Label>Select Mentor</Form.Label>
                <Form.Select
  value={selectedMentorId}
  onChange={(e) => setSelectedMentorId(e.target.value)}
>
  <option value="">-- Select Mentor --</option>
  {mentors.map((m) => (
    <option key={m._id} value={String(m._id)}>
      {m.name?.trim() || m.email} — {m.specializedIn || "General"}
    </option>
  ))}
</Form.Select>
              </Form.Group>

              {/* Mentor Preview */}
            {selectedMentor && (
  <Card className="mb-3">
    <Card.Body>
      <strong>Name:</strong> {selectedMentor.name}
      <br />
      <strong>Email:</strong> {selectedMentor.email}
      <br />
      <strong>Specialized In:</strong>{" "}
      {selectedMentor.specializedIn || "Not specified"}
      <br />
      <strong>Abilities:</strong>{" "}
      {selectedMentor.mentorAbilities?.length
        ? selectedMentor.mentorAbilities.join(", ")
        : "Not specified"}
      <br />
      <strong>Experience:</strong>{" "}
      {selectedMentor.experience || "—"}
    </Card.Body>
  </Card>
)}

              {/* Deadline */}
              <Form.Group>
                <Form.Label>
                  Evaluation Deadline <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => closeModal()}>
            Close
          </Button>

          {selectedEval?.status !== "evaluated" && (
            <Button
              variant="success"
              onClick={assignMentor}
              disabled={!selectedMentor || !deadline || saving}
            >
              {saving ? "Assigning…" : "Assign Mentor"}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
