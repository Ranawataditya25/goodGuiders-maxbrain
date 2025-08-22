import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Card, Table, Button, Badge, Modal, Form } from "react-bootstrap";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function AssignTest() {
  const [tests, setTests] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [dueAt, setDueAt] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [t, s] = await Promise.all([
          axios.get(`${API}/tests`),      // from assignment.route GET /api/tests
          axios.get(`${API}/students`),   // GET /api/students
        ]);
        setTests(t.data?.data || []);
        setStudents(s.data?.data || []);
      } catch (e) {
        console.error(e);
        setError("Failed to load tests or students");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const openAssign = (test) => {
    setSelectedTest(test);
    setSelectedStudentIds([]);
    setDueAt("");
    setNote("");
    setShow(true);
  };

  const submitAssign = async () => {
    if (!selectedTest) return;
    if (selectedStudentIds.length === 0) {
      setError("Select at least one student");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await axios.post(`${API}/tests/${selectedTest._id}/assign`, {
        studentIds: selectedStudentIds,
        dueAt: dueAt || undefined,
        note,
      });
      setShow(false);
      alert("✅ Assigned!");
    } catch (e) {
      setError(e.response?.data?.message || "Failed to assign");
    } finally {
      setSaving(false);
    }
  };

  const studentsById = useMemo(() => {
    const map = new Map();
    students.forEach(s => map.set(String(s._id), s));
    return map;
  }, [students]);

  if (loading) {
    return <Container style={{ marginTop: 120 }}><div>Loading…</div></Container>;
  }

  return (
    <div style={{ marginTop: 120 }}>
      <Container>
        <Row className="mb-3">
          <Col>
            <h3 className="mb-0">Assign Tests</h3>
            <div className="text-muted">Pick a test and assign it to students with a due date.</div>
          </Col>
        </Row>

        {error && <div className="alert alert-danger">{error}</div>}

        <Card>
          <Card.Body>
            <Table responsive hover className="align-middle">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Subjects</th>
                  <th>Type</th>
                  <th>Difficulty</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tests.map((t) => (
                  <tr key={t._id}>
                    <td><Badge bg="secondary">{t.class}</Badge></td>
                    <td>{(t.subjects || []).join(", ")}</td>
                    <td><Badge bg="dark">{t.testType}</Badge></td>
                    <td><Badge bg="info" text="dark">{t.difficulty}</Badge></td>
                    <td>{new Date(t.createdAt).toLocaleString()}</td>
                    <td className="text-end">
                      <Button size="sm" variant="primary" onClick={() => openAssign(t)}>
                        Assign
                      </Button>
                    </td>
                  </tr>
                ))}
                {tests.length === 0 && (
                  <tr><td colSpan={6} className="text-center text-muted">No tests found.</td></tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Assign modal */}
        <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Assign: {selectedTest?.subjects?.join(", ") || "(Test)"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <div className="alert alert-danger">{error}</div>}

            <Form.Group className="mb-3">
              <Form.Label>Students</Form.Label>
              <Form.Select
                multiple
                value={selectedStudentIds}
                onChange={(e) => {
                  const opts = Array.from(e.target.selectedOptions).map(o => o.value);
                  setSelectedStudentIds(opts);
                }}
              >
                {students.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name || s.email} {s.rollNo ? `(${s.rollNo})` : ""}
                  </option>
                ))}
              </Form.Select>
              <div className="small text-muted mt-1">Hold Ctrl/Cmd to select multiple.</div>
              <div className="mt-2 d-flex flex-wrap gap-2">
                {selectedStudentIds.map(id => {
                  const st = studentsById.get(id);
                  return <Badge bg="light" text="dark" key={id}>{st?.name || st?.email}</Badge>;
                })}
              </div>
            </Form.Group>

            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Due Date & Time (optional)</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={dueAt}
                    onChange={(e) => setDueAt(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Note (optional)</Form.Label>
                  <Form.Control
                    placeholder="Any instructions for students"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShow(false)}>Cancel</Button>
            <Button variant="success" onClick={submitAssign} disabled={saving || selectedStudentIds.length === 0}>
              {saving ? "Assigning…" : "Assign"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}
