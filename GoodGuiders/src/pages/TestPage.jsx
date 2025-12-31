// src/pages/TestPage.jsx
import { useMemo, useState, useEffect } from "react";
import {
  Container, Row, Col, Card, Form, Button, ButtonGroup,
  ToggleButton, Badge, InputGroup, Accordion, ProgressBar,
  OverlayTrigger, Tooltip,
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:5000/api";

/* ---------------------- Resolve current user (no hardcoding) ---------------------- */
async function fetchUserFromAPI() {
  const candidates = ["/profile/me", "/auth/me", "/users/me", "/profile", "/auth"];
  for (const path of candidates) {
    try {
      const { data } = await axios.get(`${API_URL}${path}`, { withCredentials: true });
      const u = data?.user ?? data?.data ?? data;
      if (u && (u._id || u.id || u.email)) return u;
    } catch {
      /* try next */
    }
  }
  return null;
}

function scanStoragesForUser() {
  // Fast path: common keys your app may already use for the logged-in user
  const common = ["auth:user", "user", "currentUser", "gg:user", "profile"];
  for (const k of common) {
    const raw = localStorage.getItem(k) || sessionStorage.getItem(k);
    if (!raw) continue;
    try {
      const u = JSON.parse(raw);
      if (u && (u._id || u.id || u.email)) return u;
      if (u?.user && (u.user._id || u.user.id || u.user.email)) return u.user;
      if (u?.data?.user && (u.data.user._id || u.data.user.id || u.data.user.email)) return u.data.user;
    } catch {}
  }

  // Deep scan (fallback): look through all keys once
  const readStore = (store) => {
    for (let i = 0; i < store.length; i++) {
      const k = store.key(i);
      if (!k) continue;
      const v = store.getItem(k);
      if (!v) continue;
      try {
        const obj = JSON.parse(v);
        if (obj && (obj._id || obj.id || obj.email)) return obj;
        if (obj?.user && (obj.user._id || obj.user.id || obj.user.email)) return obj.user;
      } catch {}
    }
    return null;
  };
  return readStore(localStorage) || readStore(sessionStorage);
}

async function resolveCurrentUser() {
  // 1) try your server (cookie/session auth)
  const apiUser = await fetchUserFromAPI();
  if (apiUser) return apiUser;

  // 2) try app storage (SPA auth state)
  const stored = scanStoragesForUser();
  if (stored) return stored;

  return null;
}

function buildIdentityHeaders(user) {
  const headers = {};
  if (!user) return headers;
  const id = String(user._id || user.id || "");
  const email = (user.email || "").toLowerCase();
  if (id) headers["x-user-id"] = id;
  if (email) headers["x-user-email"] = email;
  return headers;
}

/* ---------------------------------- Page ---------------------------------- */
export default function TestPage() {
  const [formData, setFormData] = useState({
    educationBoard: "",
    class: "",
    subjects: [],
    testType: "mcq", // "mcq" | "subjective" | "mcq+subjective"
    difficulty: "beginner",
    numberOfQuestion: "",
    mcqCount: "",
    subjectiveCount: "",
    mixOrder: "grouped", // "grouped" | "alternate"
  });

  const [subjectInput, setSubjectInput] = useState("");
  const [context, setContext] = useState({ chapter: "", topic: "" });
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [questionPdf, setQuestionPdf] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  /* ---------------- Prefill from query params ---------------- */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const qBoard = params.get("board");
    const qClass = params.get("class");
    const qSubject = params.get("subject");
    const qDifficulty = params.get("difficulty");
    const qChapter = params.get("chapter");
    const qTopic = params.get("topic");

    if (qBoard) setFormData((prev) => ({ ...prev, educationBoard: qBoard }));
    if (qClass) {
      const m = String(qClass).match(/\d+/);
      setFormData((prev) => ({ ...prev, class: m ? m[0] : qClass }));
    }
    if (qSubject) setSubjectInput(qSubject);
    if (qDifficulty) setFormData((prev) => ({ ...prev, difficulty: qDifficulty }));
    if (qChapter || qTopic) setContext({ chapter: qChapter || "", topic: qTopic || "" });
  }, [location.search]);

  /* ---------------- Derived values ---------------- */
  const subjectList = useMemo(() => {
    const set = new Set(
      String(subjectInput || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    );
    return Array.from(set).slice(0, 3);
  }, [subjectInput]);

  const totalPlannedQuestions = useMemo(() => {
    if (formData.testType === "mcq+subjective") {
      const m = parseInt(formData.mcqCount || 0, 10) || 0;
      const s = parseInt(formData.subjectiveCount || 0, 10) || 0;
      return m + s;
    }
    return parseInt(formData.numberOfQuestion || 0, 10) || 0;
  }, [formData]);

  const progress = useMemo(() => {
    if (!totalPlannedQuestions) return 0;
    const pct = Math.min(100, Math.round((questions.length / totalPlannedQuestions) * 100));
    return isFinite(pct) ? pct : 0;
  }, [questions.length, totalPlannedQuestions]);

  /* ---------------- Question builders ---------------- */
  const make = (type = "mcq") =>
    type === "subjective"
      ? { type: "subjective", question: "", suggestedAnswer: "", marks: 5 }
      : { type: "mcq", question: "", options: ["", "", "", ""], correctAnswer: "", marks: 1 };

  const autoBuildQuestions = () => {
    setError("");
    const next = [];
    if (formData.testType !== "mcq+subjective") {
      const total = parseInt(formData.numberOfQuestion || 0, 10) || 0;
      if (total < 1) return setError("Enter at least 1 question.");
      const type = formData.testType === "mcq" ? "mcq" : "subjective";
      for (let i = 0; i < total; i++) next.push(make(type));
    } else {
      const m = parseInt(formData.mcqCount || 0, 10) || 0;
      const s = parseInt(formData.subjectiveCount || 0, 10) || 0;
      if (m + s < 1) return setError("Enter at least 1 question in total.");
      if (formData.mixOrder === "alternate") {
        let i = 0, j = 0;
        while (i < m || j < s) { if (i < m) next.push(make("mcq")), i++; if (j < s) next.push(make("subjective")), j++; }
      } else {
        for (let i = 0; i < m; i++) next.push(make("mcq"));
        for (let i = 0; i < s; i++) next.push(make("subjective"));
      }
    }
    setQuestions(next);
  };

  const updateQuestion = (idx, patch) =>
    setQuestions((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], ...patch };
      return next;
    });

  const removeQuestion = (idx) => setQuestions((prev) => prev.filter((_, i) => i !== idx));

  /* ---------------- Validation ---------------- */
const validateForm = () => {
  // Basic fields
  if (!formData.class) return "Please select a Class.";
  if (subjectList.length === 0) return "Add at least one Subject.";

  // ✅ Allow subjective_pdf
  if (
    !["mcq", "subjective", "mcq+subjective", "subjective_pdf"].includes(
      formData.testType
    )
  ) {
    return "Invalid test type.";
  }

  // ✅ PDF Subjective: ONLY validate PDF and STOP
  if (formData.testType === "subjective_pdf") {
    if (!questionPdf) {
      return "Question paper PDF is required for PDF Subjective test.";
    }
    return ""; // 🚫 skip all question validations
  }

  // 🔽 Normal test validations
  if (formData.testType === "mcq+subjective") {
    const m = parseInt(formData.mcqCount || 0, 10) || 0;
    const s = parseInt(formData.subjectiveCount || 0, 10) || 0;
    if (m + s < 1) return "Total questions must be at least 1.";
  } else {
    const n = parseInt(formData.numberOfQuestion || 0, 10) || 0;
    if (n < 1) return "Number of questions must be at least 1.";
  }

  if (questions.length === 0) return "Please add at least one question.";

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    if (!q?.question?.trim()) return `Question ${i + 1} is empty.`;

    if (q.type === "mcq") {
      const opts = (q.options || []).map((x) => String(x || "").trim());
      if (opts.length < 2 || opts.filter(Boolean).length < 2) {
        return `Question ${i + 1}: add at least 2 options.`;
      }
      if (!q.correctAnswer) {
        return `Question ${i + 1}: pick the correct answer.`;
      }
    }

    if ((q.marks ?? 0) < 0) {
      return `Question ${i + 1}: marks cannot be negative.`;
    }
  }

  return "";
};

  /* ---------------- Submit ---------------- */
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const err = validateForm();
    if (err) {
      setError(err);
      setLoading(false);
      return;
    }

    try {
      const user = await resolveCurrentUser();
      const headers = buildIdentityHeaders(user);

      let res;

      if (formData.testType === "subjective_pdf") {
        const fd = new FormData();
        fd.append("class", formData.class);
        fd.append("testType", "subjective_pdf");
        fd.append("difficulty", formData.difficulty);
        fd.append("subjects", JSON.stringify(subjectList));
        fd.append("educationBoard", formData.educationBoard || "");
        fd.append("questionPaper", questionPdf);

        res = await axios.post(`${API_URL}/questions/pdf`, fd, {
          headers,
          withCredentials: true,
        });
      } else {
        // EXISTING FLOW (unchanged)
        res = await axios.post(`${API_URL}/questions`, {
          ...formData,
          subjects: subjectList,
          questions,
          context,
        }, {
          headers,
          withCredentials: true,
        });
      }

      navigate("/assign-test");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create test");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="themebody-wrap" style={{ marginTop: 120 }}>
      <Container>
        {/* Header / Summary */}
        <Card className="mb-4">
          <Card.Body className="d-flex flex-wrap align-items-center justify-content-between gap-2">
            <div>
              <h4 className="mb-1">Create Test / Question Paper</h4>
              <div className="text-muted small">Plan — Generate — Review — Submit</div>
            </div>

            <div className="d-flex align-items-center gap-3">
              <div className="text-end">
                <div className="small text-muted">Planned</div>
                <div className="fw-semibold">{totalPlannedQuestions} questions</div>
              </div>
              <div style={{ minWidth: 220 }}>
                <ProgressBar now={progress} label={`${progress}%`} />
              </div>
              <OverlayTrigger placement="top" overlay={<Tooltip>Auto-generate an empty scaffold</Tooltip>}>
                <Button variant="outline-primary" onClick={autoBuildQuestions}>
                  Auto Build
                </Button>
              </OverlayTrigger>
            </div>
          </Card.Body>
        </Card>

        {error && <div className="alert alert-danger">{error}</div>}

        <Form onSubmit={onSubmit}>
          {/* Basics */}
          <Card className="mb-4">
            <Card.Body>
              <Row className="g-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Education Board (Optional)</Form.Label>
                    <Form.Control
                      placeholder="CBSE / ICSE / RBSE ..."
                      value={formData.educationBoard}
                      onChange={(e) => setFormData((prev) => ({ ...prev, educationBoard: e.target.value }))}
                    />
                    <Form.Text className="text-muted">This helps you filter tests later, but is optional.</Form.Text>
                  </Form.Group>
                </Col>

                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Class</Form.Label>
                    <Form.Select
                      value={formData.class}
                      onChange={(e) => setFormData((prev) => ({ ...prev, class: e.target.value }))}
                    >
                      <option value="">Select</option>
                      {[6, 7, 8, 9, 10, 11, 12].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Subjects (Comma Separated, Max 3)</Form.Label>
                    <Form.Control
                      placeholder="e.g., Physics, Chemistry"
                      value={subjectInput}
                      onChange={(e) => setSubjectInput(e.target.value)}
                    />
                    <div className="mt-2">
                      {subjectList.map((s, i) => (
                        <Badge key={i} bg="light" text="dark" className="me-2">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Context */}
          <Card className="mb-4">
            <Card.Body>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Chapter (Optional)</Form.Label>
                    <Form.Control
                      placeholder="Chapter name"
                      value={context.chapter}
                      onChange={(e) => setContext((prev) => ({ ...prev, chapter: e.target.value }))}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Sub-topic (Optional)</Form.Label>
                    <Form.Control
                      placeholder="Topic / Sub-topic"
                      value={context.topic}
                      onChange={(e) => setContext((prev) => ({ ...prev, topic: e.target.value }))}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Test type & difficulty */}
          <Card className="mb-4">
            <Card.Body>
              <Row className="g-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Test Type</Form.Label>
                    <div>
                      <ButtonGroup>
                        {[
                          { label: "MCQ", value: "mcq" },
                          { label: "Subjective", value: "subjective" },
                          { label: "Mixed", value: "mcq+subjective" },
                          { label: "PDF Subjective", value: "subjective_pdf" },
                        ].map((opt, idx) => (
                          <ToggleButton
                            key={idx}
                            id={`type-${opt.value}`}
                            type="radio"
                            variant={formData.testType === opt.value ? "primary" : "outline-primary"}
                            checked={formData.testType === opt.value}
                            value={opt.value}
                            onChange={() =>
                              setFormData((prev) => ({
                                ...prev,
                                testType: opt.value, // ✅ SAFE
                              }))
                            }
                          >
                            {opt.label}
                          </ToggleButton>
                        ))}
                      </ButtonGroup>
                    </div>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Difficulty</Form.Label>
                    <Form.Select
                      value={formData.difficulty}
                      onChange={(e) => setFormData((prev) => ({ ...prev, difficulty: e.target.value }))}
                    >
                      {["beginner", "intermediate", "advanced"].map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  {formData.testType !== "mcq+subjective" ? (
                    <Form.Group>
                      <Form.Label>Number Of Questions</Form.Label>
                      <Form.Control
                        type="number"
                        min={1}
                        value={formData.numberOfQuestion}
                        onChange={(e) => setFormData((prev) => ({ ...prev, numberOfQuestion: e.target.value }))}
                      />
                    </Form.Group>
                  ) : (
                    <Row className="g-2">
                      <Col xs={6}>
                        <Form.Group>
                          <Form.Label>MCQ Count</Form.Label>
                          <Form.Control
                            type="number"
                            min={0}
                            value={formData.mcqCount}
                            onChange={(e) => setFormData((prev) => ({ ...prev, mcqCount: e.target.value }))}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={6}>
                        <Form.Group>
                          <Form.Label>Subjective Count</Form.Label>
                          <Form.Control
                            type="number"
                            min={0}
                            value={formData.subjectiveCount}
                            onChange={(e) => setFormData((prev) => ({ ...prev, subjectiveCount: e.target.value }))}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label>Mix Order</Form.Label>
                          <Form.Select
                            value={formData.mixOrder}
                            onChange={(e) => setFormData((prev) => ({ ...prev, mixOrder: e.target.value }))}
                          >
                            <option value="grouped">Group by type</option>
                            <option value="alternate">Alternate (MCQ then Subjective)</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {formData.testType === "subjective_pdf" && (
            <Card className="mb-4">
              <Card.Body>
                <Form.Group>
                  <Form.Label>Question Paper (PDF only)</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setQuestionPdf(e.target.files[0])}
                  />
                  <Form.Text className="text-muted">
                    Upload the official question paper PDF.
                  </Form.Text>
                </Form.Group>
              </Card.Body>
            </Card>
          )}

          {/* Questions Builder */}
          {formData.testType !== "subjective_pdf" && (
          <Card className="mb-4">
            <Card.Header className="d-flex align-items-center justify-content-between">
              <div className="fw-semibold">Questions ({questions.length})</div>
              <div className="d-flex gap-2">
                <OverlayTrigger overlay={<Tooltip>Add one MCQ</Tooltip>} placement="top">
                  <Button variant="outline-secondary" onClick={() => setQuestions((p) => [...p, make("mcq")])}>
                    + MCQ
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>Add one Subjective</Tooltip>} placement="top">
                  <Button variant="outline-secondary" onClick={() => setQuestions((p) => [...p, make("subjective")])}>
                    + Subjective
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>Auto-generate scaffold based on counts</Tooltip>} placement="top">
                  <Button variant="primary" onClick={autoBuildQuestions}>
                    Auto Build
                  </Button>
                </OverlayTrigger>
              </div>
            </Card.Header>

            <Card.Body>
              {questions.length === 0 ? (
                <div className="text-muted">No questions yet. Use <strong>Auto Build</strong> or add manually.</div>
              ) : (
                <Accordion defaultActiveKey="0" alwaysOpen>
                  {questions.map((q, idx) => (
                    <Accordion.Item key={idx} eventKey={String(idx)}>
                      <Accordion.Header>
                        <div className="d-flex align-items-center gap-2">
                          <Badge bg={q.type === "mcq" ? "info" : "warning"} text="dark">
                            {q.type.toUpperCase()}
                          </Badge>
                          <span className="text-truncate" style={{ maxWidth: 540 }}>
                            {q.question?.trim() || `Question #${idx + 1}`}
                          </span>
                          <Badge bg="light" text="dark">{q.marks ?? 0} Marks</Badge>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="g-3">
                          <Col xs={12}>
                            <Form.Group>
                              <Form.Label>Question</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder={q.type === "mcq" ? "Enter the MCQ question" : "Enter the question"}
                                value={q.question}
                                onChange={(e) => updateQuestion(idx, { question: e.target.value })}
                              />
                            </Form.Group>
                          </Col>

                          {q.type === "mcq" ? (
                            <>
                              <Row className="g-2">
                                {q.options?.map((opt, oi) => (
                                  <Col md={6} key={oi}>
                                    <Form.Group className="mb-2">
                                      <InputGroup>
                                        <InputGroup.Text>Option {oi + 1}</InputGroup.Text>
                                        <Form.Control
                                          value={opt}
                                          placeholder={`Option ${oi + 1}`}
                                          onChange={(e) => {
                                            const next = [...(q.options || [])];
                                            next[oi] = e.target.value;
                                            updateQuestion(idx, { options: next });
                                          }}
                                        />
                                        <Button
                                          variant="outline-danger"
                                          onClick={() => {
                                            const next = [...(q.options || [])];
                                            next.splice(oi, 1);
                                            updateQuestion(idx, { options: next });
                                          }}
                                          disabled={(q.options || []).length <= 2}
                                        >
                                          ✕
                                        </Button>
                                      </InputGroup>
                                    </Form.Group>
                                  </Col>
                                ))}
                              </Row>

                              <div className="d-flex justify-content-between align-items-center">
                                <Button
                                  variant="outline-secondary"
                                  onClick={() => updateQuestion(idx, { options: [...(q.options || []), ""] })}
                                >
                                  + Add Option
                                </Button>

                                <Form.Group className="d-flex align-items-center gap-2">
                                  <Form.Label className="mb-0">Correct Answer:</Form.Label>
                                  <Form.Select
                                    style={{ minWidth: 220 }}
                                    value={q.correctAnswer}
                                    onChange={(e) => updateQuestion(idx, { correctAnswer: e.target.value })}
                                  >
                                    <option value="">-- Select --</option>
                                    {q.options?.map((opt, oi) => (
                                      <option key={oi} value={opt}>{opt || `Option ${oi + 1}`}</option>
                                    ))}
                                  </Form.Select>
                                </Form.Group>
                              </div>
                            </>
                          ) : (
                            <Col xs={12}>
                              <Form.Group>
                                <Form.Label>Suggested Answer (optional)</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={3}
                                  placeholder="Provide a model answer or key points"
                                  value={q.suggestedAnswer}
                                  onChange={(e) => updateQuestion(idx, { suggestedAnswer: e.target.value })}
                                />
                              </Form.Group>
                            </Col>
                          )}

                          <Col xs={12} md={4}>
                            <Form.Group>
                              <Form.Label>Marks</Form.Label>
                              <Form.Control
                                type="number"
                                min={0}
                                value={q.marks ?? 0}
                                onChange={(e) => updateQuestion(idx, { marks: Number(e.target.value || 0) })}
                              />
                            </Form.Group>
                          </Col>

                          <Col xs={12} className="d-flex justify-content-end">
                            <Button variant="outline-danger" onClick={() => removeQuestion(idx)}>
                              Remove Question
                            </Button>
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              )}
            </Card.Body>
          </Card>
          )}

          <div className="text-center mt-3">
            <Button
              variant="success"
              type="submit"
              disabled={
                loading ||
                (formData.testType !== "subjective_pdf" && questions.length === 0)
              }
            >
              {loading ? "Creating..." : "Create Test"}
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export { TestPage };
