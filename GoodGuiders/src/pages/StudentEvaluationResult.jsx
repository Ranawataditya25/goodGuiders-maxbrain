// src/pages/StudentEvaluationResult.jsx
import { useEffect, useState } from "react";
import { Card, Spinner, Alert, Badge, Modal, ListGroup } from "react-bootstrap";

export default function StudentEvaluationResult() {
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  /* -------------------- list state -------------------- */
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  /* -------------------- modal state -------------------- */
  const [showModal, setShowModal] = useState(false);
  const [activeId, setActiveId] = useState(null);

  /* -------------------- active result -------------------- */
  const [activeResult, setActiveResult] = useState(null);
  const [resultLoading, setResultLoading] = useState(false);

  /* ================= FETCH LIST ================= */
useEffect(() => {
  if (!loggedInUser?._id) {
    setError("User not logged in");
    setLoading(false);
    return;
  }

  async function loadList() {
    try {
      setLoading(true);
      const res = await fetch(
        "http://127.0.0.1:5000/api/pdf-evaluations/student",
        {
          credentials: "include",
          headers: {
            "x-user-id": loggedInUser._id,
            "x-user-role": "student",
          },
        }
      );

      const data = await res.json();
      console.log("Evaluation list:", data);

      if (!res.ok) {
        setError(data.message || "Failed to load results");
      } else {
        setResults(data.items || []);
      }
    } catch (e) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  }

  loadList();
}, []);

  /* ================= FETCH SINGLE RESULT ================= */
  const openResult = async (id) => {
    try {
      setShowModal(true);
      setActiveId(id);
      setResultLoading(true);
      setActiveResult(null);

      const res = await fetch(
  `http://127.0.0.1:5000/api/pdf-evaluations/student/${id}`,
  {
    credentials: "include",
    headers: {
      "x-user-id": loggedInUser._id,
      "x-user-role": "student",
    },
  }
);
      const data = await res.json();

      if (res.ok && data.evaluated) {
        setActiveResult(data.data);
      }
    } finally {
      setResultLoading(false);
    }
  };

  /* ================= RENDER STATES ================= */
  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="mt-4">{error}</Alert>;
  }

  /* ================= MAIN RENDER ================= */
  return (
    <>
      <div className="container" style={{ maxWidth: 750, marginTop: 120 }}>
        <Card className="shadow-sm">
          <Card.Body>
            <h4 className="fw-bold mb-33">
              📄 Your Evaluation Results{" "}
              <Badge bg="success">{results.length}</Badge>
            </h4>

            {results.length === 0 ? (
              <Alert variant="info">
                ⏳ No evaluated results available yet.
              </Alert>
            ) : (
              <ListGroup>
                {results.map((r, i) => (
                  <ListGroup.Item
                    key={r.id}
                    action
                    onClick={() => openResult(r.id)}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <span>
                      <strong>{i + 1}.</strong> {r.title}
                    </span>
                    <small className="text-muted">
                      {new Date(r.evaluatedAt).toLocaleDateString()}
                    </small>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Card.Body>
        </Card>
      </div>

      {/* ================= RESULT MODAL ================= */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Evaluation Result</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {resultLoading && (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          )}

          {!resultLoading && activeResult && (
            <Card className="border-0">
              <Card.Body>
                <h5 className="fw-bold mb-3">{activeResult.title}</h5>

                <Badge bg="success" className="mb-3 px-3 py-2">
                  Marks: {activeResult.marks}
                </Badge>

                <p className="mb-2">
                  <strong>Evaluated By:</strong>{" "}
                  {activeResult.mentor?.name || "Mentor"}
                </p>

                <p className="text-muted">
                  {new Date(activeResult.evaluatedAt).toLocaleString()}
                </p>

                <hr />

                <h6 className="fw-bold">Mentor Feedback</h6>
                <p style={{ whiteSpace: "pre-wrap" }}>
                  {activeResult.feedback || "No feedback provided"}
                </p>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}