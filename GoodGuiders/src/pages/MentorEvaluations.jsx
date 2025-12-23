import { useEffect, useState } from "react";
import {
  Container,
  Card,
  Table,
  Button,
  Badge,
  Spinner,
  Modal,
  Form,
} from "react-bootstrap";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const FILE_BASE = import.meta.env.VITE_FILE_BASE_URL 
  || "http://localhost:5000/bootstrapreact/medixo";

const statusColor = {
  assigned_mentor: "warning",
  accepted: "info",
  evaluated: "success",
  rejected: "danger",
  expired: "dark",
};

const formatDateTime = (date) => {
  if (!date) return "—";
  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function MentorEvaluations() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal
  const [show, setShow] = useState(false);
  const [selectedEval, setSelectedEval] = useState(null);
  const [marks, setMarks] = useState("");
  const [feedback, setFeedback] = useState("");
  const [saving, setSaving] = useState(false);

  const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");

  /* ---------------- AUTH GUARD ---------------- */
  useEffect(() => {
    if (user.role !== "mentor") {
      window.location.href = "/login";
    }
  }, [user.role]);

  /* ---------------- LOAD EVALUATIONS ---------------- */
  const load = async () => {
    try {
      const res = await axios.get(`${API}/pdf-evaluations/mentor`, {
        headers: {
          "x-user-id": user._id,
          "x-user-role": user.role,
        },
      });
      setList(res.data.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  /* ---------------- ACCEPT / REJECT ---------------- */
  const decide = async (id, decision) => {
    try {
      await axios.post(
        `${API}/pdf-evaluations/${id}/decision`,
        { decision },
        {
          headers: {
            "x-user-id": user._id,
            "x-user-role": user.role,
          },
        }
      );
      load();
    } catch (e) {
      alert(e.response?.data?.message || "Action failed");
    }
  };

  /* ---------------- OPEN MODAL ---------------- */
const openEvaluate = (evalDoc) => {
  if (evalDoc.status !== "accepted") return;
  setSelectedEval(evalDoc);
  setMarks("");
  setFeedback("");
  setShow(true);
};

  /* ---------------- SUBMIT EVALUATION ---------------- */
  const submitEvaluation = async () => {
    if (!/^\d+\s*\/\s*\d+$/.test(marks)) {
      alert("Marks must be in format obtained/total (e.g. 45/50)");
      return;
    }

    setSaving(true);
    try {
      await axios.post(
        `${API}/pdf-evaluations/${selectedEval._id}/evaluate`,
        { marks, feedback },
        {
          headers: {
            "x-user-id": user._id,
            "x-user-role": user.role,
          },
        }
      );

      alert("✅ Evaluation submitted");
      setShow(false);
      load();
    } catch (e) {
      alert(e.response?.data?.message || "Failed to submit");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <Container style={{ marginTop: 120 }}>
      <Card>
        <Card.Header>
          <h4>My Evaluations</h4>
        </Card.Header>

        <Card.Body>
          {loading ? (
            <Spinner />
          ) : list.length === 0 ? (
            <p className="text-muted">No evaluations assigned.</p>
          ) : (
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Subject</th>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Marks</th>
                  <th>Feedback</th>
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
                    <td>{x.testId?.subjects?.join(", ")}</td>
                    <td>
                      <a href={`${FILE_BASE}${x.questionPdfUrl}`} target="_blank" rel="noreferrer">
                        View
                      </a>
                    </td>
                    <td>
                      <a href={`${FILE_BASE}${x.answerPdfUrl}`} target="_blank" rel="noreferrer">
                        View
                      </a>
                    </td>
                    <td>
  {x.status !== "evaluated"
    ? formatDateTime(x.mentorDeadline)
    : "—"}
</td>
                    <td>
                      <Badge bg={statusColor[x.status]}>
                        {x.status}
                      </Badge>
                    </td>
                    <td>{x.evaluation?.marks || "—"}</td>
                    <td>{x.evaluation?.feedback || "—"}</td>
                   <td>
  {x.status === "assigned_mentor" && (
    <>
      <Button
        size="sm"
        variant="success"
        className="me-2"
        onClick={() => decide(x._id, "accepted")}
      >
        Accept
      </Button>
      <Button
        size="sm"
        variant="danger"
        onClick={() => decide(x._id, "rejected")}
      >
        Reject
      </Button>
    </>
  )}

  {x.status === "accepted" && (
    <Button
      size="sm"
      variant="primary"
      onClick={() => openEvaluate(x)}
    >
      Evaluate
    </Button>
  )}

  {x.status === "evaluated" && (
    <Badge bg="success">Submitted</Badge>
  )}
</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* ================= EVALUATION MODAL ================= */}
      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Evaluate Submission</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedEval && (
            <>
              <p>
                <strong>Student:</strong>{" "}
                {selectedEval.studentId?.name}
              </p>
              <p>
  <strong>Deadline:</strong>{" "}
  <span className="text-danger">
    {formatDateTime(selectedEval.mentorDeadline)}
  </span>
</p>
              <p>
                <a href={`${FILE_BASE}${selectedEval.questionPdfUrl}`} target="_blank">
                  📄 Question PDF
                </a>{" "}
                |{" "}
                <a href={`${FILE_BASE}${selectedEval.answerPdfUrl}`} target="_blank">
                  📄 Answer PDF
                </a>
              </p>

              <Form.Group className="mb-3">
                <Form.Label>Marks</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. 45/50"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Feedback</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={submitEvaluation}
            disabled={saving}
          >
            {saving ? "Submitting…" : "Submit Evaluation"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}