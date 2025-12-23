import { useEffect, useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Badge,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  // --- NEW: time-limit controls ---
  const [limitEnabled, setLimitEnabled] = useState(true);
  const [limitPreset, setLimitPreset] = useState("60"); // minutes as string; "custom" for custom
  const [customHours, setCustomHours] = useState("");
  const [customMinutes, setCustomMinutes] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const submissions = () => navigate("/mentor-submissions");

  useEffect(() => {
    (async () => {
      try {
        const loggedInUser = JSON.parse(
          localStorage.getItem("loggedInUser") || "{}"
        );
        const email = loggedInUser.email;

        if (!email) {
          setError("User email not found. Please log in again.");
          setLoading(false);
          return;
        }

        const [t, s] = await Promise.all([
          axios.get(`${API}/tests`, { params: { email } }),
          axios.get(`${API}/students`),
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

    // reset time-limit UI each open
    setLimitEnabled(true);
    setLimitPreset("60");
    setCustomHours("");
    setCustomMinutes("");

    setShow(true);
    setError("");
  };

  const studentsById = useMemo(() => {
    const map = new Map();
    students.forEach((s) => map.set(String(s._id), s));
    return map;
  }, [students]);

  const effectiveMinutes = useMemo(() => {
    if (!limitEnabled) return null; // no limit
    if (limitPreset !== "custom")
      return Math.max(0, parseInt(limitPreset || "0", 10));
    const h = Math.max(0, parseInt(customHours || "0", 10));
    const m = Math.max(0, parseInt(customMinutes || "0", 10));
    return h * 60 + m;
  }, [limitEnabled, limitPreset, customHours, customMinutes]);

  const humanLimit = useMemo(() => {
    if (!limitEnabled) return "No time limit";
    const mins = effectiveMinutes ?? 0;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (mins <= 0) return "0 minutes";
    if (h && m) return `${h}h ${m}m`;
    if (h) return `${h}h`;
    return `${m}m`;
  }, [limitEnabled, effectiveMinutes]);

  const submitAssign = async () => {
    if (!selectedTest) return;
    if (selectedStudentIds.length === 0) {
      setError("Select at least one student");
      return;
    }
    if (limitEnabled && (!effectiveMinutes || effectiveMinutes <= 0)) {
      setError("Please set a valid time limit or disable it.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const payload = {
        studentIds: selectedStudentIds,
        dueAt: dueAt || undefined,
        note,
      };

      // include multiple field names for maximum backend compatibility
      if (limitEnabled && effectiveMinutes > 0) {
        payload.durationMinutes = effectiveMinutes;
        payload.timeLimitMin = effectiveMinutes;
        payload.durationMin = effectiveMinutes;
      }

      await axios.post(`${API}/tests/${selectedTest._id}/assign`, payload);
      setShow(false);
      alert("✅ Assigned!");
    } catch (e) {
      setError(e.response?.data?.message || "Failed to assign");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container style={{ marginTop: 120 }}>
        <div>Loading…</div>
      </Container>
    );
  }

  return (
    <div style={{ marginTop: 120 }}>
      <Container>
        <Row className="mb-3">
          <Col>
            <h3 className="mb-4">Assign Tests</h3>
            <div className="text-muted">
              Pick a test and assign it to students with a due date and a time
              limit.
            </div>
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
                  <th />
                </tr>
              </thead>
              <tbody>
                {tests.map((t) => (
                  <tr key={t._id}>
                    <td>
                      <Badge bg="secondary">{t.class}</Badge>
                    </td>
                    <td>{(t.subjects || []).join(", ")}</td>
                    <td>
                      <Badge bg="dark">
                        {t.testType ? t.testType.replace("_", " ") : "UNKNOWN"}
                      </Badge>
                      {t.testType === "subjective_pdf" && (
                        <Badge bg="warning" text="dark" className="ms-2">
                          PDF
                        </Badge>
                      )}
                    </td>
                    <td>
                      <Badge bg="info" text="dark">
                        {t.difficulty}
                      </Badge>
                    </td>
                    <td>{new Date(t.createdAt).toLocaleString()}</td>
                    <td className="text-end">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => openAssign(t)}
                      >
                        Assign
                      </Button>
                    </td>
                  </tr>
                ))}
                {tests.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-muted">
                      No tests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Assign modal */}
        <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>
              Assign: {selectedTest?.subjects?.join(", ") || "(Test)"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Students multi-select */}
            <Form.Group className="mb-3">
              <Form.Label>Students</Form.Label>
              <Form.Select
                multiple
                value={selectedStudentIds}
                onChange={(e) => {
                  const opts = Array.from(e.target.selectedOptions).map(
                    (o) => o.value
                  );
                  setSelectedStudentIds(opts);
                }}
              >
                {students.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name || s.email} {s.rollNo ? `(${s.rollNo})` : ""}
                  </option>
                ))}
              </Form.Select>
              <div className="small text-muted mt-1">
                Hold Ctrl/Cmd to select multiple.
              </div>
              <div className="mt-2 d-flex flex-wrap gap-2">
                {selectedStudentIds.map((id) => {
                  const st = studentsById.get(id);
                  return (
                    <Badge bg="light" text="dark" key={id}>
                      {st?.name || st?.email}
                    </Badge>
                  );
                })}
              </div>
            </Form.Group>

            <Row className="g-3">
              {/* Due date */}
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

              {/* Note */}
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

            {/* --- NEW: Time Limit section --- */}
            <Card className="mt-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Form.Check
                    type="switch"
                    id="limit-switch"
                    label={<strong>Time Limit</strong>}
                    checked={limitEnabled}
                    onChange={(e) => setLimitEnabled(e.target.checked)}
                  />
                  <Badge bg="light" text="dark">
                    {humanLimit}
                  </Badge>
                </div>

                <Row className="g-2">
                  <Col md={7}>
                    <div className="d-flex flex-wrap gap-2">
                      {[
                        { label: "30m", value: "30" },
                        { label: "45m", value: "45" },
                        { label: "1h", value: "60" },
                        { label: "1.5h", value: "90" },
                        { label: "2h", value: "120" },
                      ].map((p) => (
                        <Button
                          key={p.value}
                          variant={
                            limitPreset === p.value && limitEnabled
                              ? "primary"
                              : "outline-primary"
                          }
                          size="sm"
                          disabled={!limitEnabled}
                          onClick={() => setLimitPreset(p.value)}
                        >
                          {p.label}
                        </Button>
                      ))}

                      <Button
                        variant={
                          limitPreset === "custom" && limitEnabled
                            ? "primary"
                            : "outline-primary"
                        }
                        size="sm"
                        disabled={!limitEnabled}
                        onClick={() => setLimitPreset("custom")}
                      >
                        Custom
                      </Button>
                    </div>
                  </Col>

                  <Col md={5}>
                    <InputGroup>
                      <InputGroup.Text>HH</InputGroup.Text>
                      <Form.Control
                        type="number"
                        min={0}
                        step={1}
                        disabled={!limitEnabled || limitPreset !== "custom"}
                        value={customHours}
                        onChange={(e) => setCustomHours(e.target.value)}
                      />
                      <InputGroup.Text>MM</InputGroup.Text>
                      <Form.Control
                        type="number"
                        min={0}
                        max={59}
                        step={1}
                        disabled={!limitEnabled || limitPreset !== "custom"}
                        value={customMinutes}
                        onChange={(e) => setCustomMinutes(e.target.value)}
                      />
                    </InputGroup>
                    <div className="small text-muted mt-1">
                      This will be the countdown clock when the student starts
                      the test.
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={submitAssign}
              disabled={saving || selectedStudentIds.length === 0}
            >
              {saving ? "Assigning…" : "Assign"}
            </Button>
          </Modal.Footer>
        </Modal>
        <Button
          variant="outline-primary"
          size="sm"
          className="ms-2 mb-13 mt-13"
          onClick={submissions}
        >
          View Submissions
        </Button>
        {user?.role === "admin" && (
          <Button
            size="sm"
            variant="outline-warning"
            onClick={() => navigate("/admin/pdf-submissions")}
          >
            PDF Submissions
          </Button>
        )}
      </Container>
    </div>
  );
}
