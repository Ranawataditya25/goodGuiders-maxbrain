// goodGuiderss/src/pages/TestPage.jsx
import { useMemo, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ButtonGroup,
  ToggleButton,
  Badge,
  InputGroup,
  Accordion,
  ProgressBar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:5000/api";

export default function TestPage() {
  const [formData, setFormData] = useState({
    educationBoard: "",   // <-- NEW
    class: "",
    subjects: [],
    testType: "",
    difficulty: "",
    numberOfQuestion: "",
    mcqCount: "",
    subjectiveCount: "",
    mixOrder: "grouped", // grouped | alternate
  });

  const [subjectInput, setSubjectInput] = useState("");
  const [context, setContext] = useState({ chapter: "", topic: "" }); // topic = sub-topic
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // ------------ Prefill from query params ------------
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const qBoard = params.get("board");     // optional
    const qClass = params.get("class");
    const qSubject = params.get("subject");
    const qDifficulty = params.get("difficulty");
    const qChapter = params.get("chapter");
    const qTopic = params.get("topic");

    if (qBoard) {
      setFormData((prev) => ({ ...prev, educationBoard: qBoard }));
    }

    if (qClass) {
      // Accept "Class 11" or just "11"
      const match = String(qClass).match(/\d+/);
      setFormData((prev) => ({ ...prev, class: match ? match[0] : qClass }));
    }

    if (qSubject) setSubjectInput(qSubject);
    if (qDifficulty) setFormData((prev) => ({ ...prev, difficulty: qDifficulty }));
    if (qChapter || qTopic) setContext({ chapter: qChapter || "", topic: qTopic || "" });
  }, [location.search]);

  // ------------ Helpers ------------
  const isMixed = formData.testType === "mcq+subjective";
  const totalMixed =
    (parseInt(formData.mcqCount || 0, 10) || 0) +
    (parseInt(formData.subjectiveCount || 0, 10) || 0);
  const totalSingle = parseInt(formData.numberOfQuestion || 0, 10) || 0;
  const totalQuestionsPlanned = isMixed ? totalMixed : totalSingle;

  const completion = useMemo(() => {
    if (questions.length === 0) return 0;
    const filled = questions.filter((q) => (q.question || "").trim().length > 0).length;
    return Math.round((100 * filled) / questions.length);
  }, [questions]);

  const setFD = (patch) => setFormData((prev) => ({ ...prev, ...patch }));

  // ------------ UI actions ------------
  const generateQuestions = () => {
    setError("");

    if (!formData.testType) {
      setError("Please choose a Test Type.");
      return;
    }

    const make = (type = "mcq") => ({
      type, // "mcq" | "subjective"
      question: "",
      options: type === "mcq" ? ["", "", "", ""] : undefined,
      correctAnswer: type === "mcq" ? "" : undefined,
      marks: 1,
    });

    let next = [];

    if (!isMixed) {
      if (totalSingle < 1) return setError("Enter at least 1 question.");
      const type = formData.testType === "mcq" ? "mcq" : "subjective";
      for (let i = 0; i < totalSingle; i++) next.push(make(type));
    } else {
      const m = parseInt(formData.mcqCount || 0, 10) || 0;
      const s = parseInt(formData.subjectiveCount || 0, 10) || 0;
      if (m + s < 1) return setError("Enter at least 1 question in total.");
      if (formData.mixOrder === "alternate") {
        let i = 0, j = 0;
        while (i < m || j < s) {
          if (i < m) next.push(make("mcq")), i++;
          if (j < s) next.push(make("subjective")), j++;
        }
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

  const removeQuestion = (idx) =>
    setQuestions((prev) => prev.filter((_, i) => i !== idx));

  const clearAll = () => {
    setFormData({
      educationBoard: "",
      class: "",
      subjects: [],
      testType: "",
      difficulty: "",
      numberOfQuestion: "",
      mcqCount: "",
      subjectiveCount: "",
      mixOrder: "grouped",
    });
    setSubjectInput("");
    setContext({ chapter: "", topic: "" });
    setQuestions([]);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const subjectList = subjectInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (subjectList.length > 3) {
      setError("Maximum 3 subjects allowed.");
      setLoading(false);
      return;
    }

    if (!formData.class) {
      setError("Please select a class.");
      setLoading(false);
      return;
    }
    if (!formData.testType) {
      setError("Please choose a test type.");
      setLoading(false);
      return;
    }
    if (!formData.difficulty) {
      setError("Please choose a difficulty.");
      setLoading(false);
      return;
    }
    if (questions.length === 0) {
      setError("Generate questions first.");
      setLoading(false);
      return;
    }

    const payload = {
      ...formData,
      subjects: subjectList,
      questions,
      context, // { chapter, topic }
    };

    try {
      await axios.post(`${API_URL}/tests`, payload);
      navigate("/assign-test");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create test");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "120px" }}>
      <Container>
        {/* Header / Summary */}
        <Card className="mb-4">
          <Card.Body className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div>
              <h3 className="mb-1">Create Test</h3>
              <div className="text-muted">
                Design MCQ, Subjective, or a Mixed paper with clear counts and live preview.
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Badge bg="secondary">Type</Badge>
              <Badge bg="dark">{formData.testType || "—"}</Badge>
              <Badge bg="secondary">Planned</Badge>
              <Badge bg="dark">{totalQuestionsPlanned}</Badge>
              <Badge bg="secondary">Filled</Badge>
              <Badge bg={completion === 100 ? "success" : "info"}>{completion}%</Badge>
            </div>
          </Card.Body>
        </Card>

        {/* Page-level context preview */}
        {(context.chapter || context.topic) && (
          <div className="alert alert-info mb-4">
            <div className="d-flex flex-wrap gap-3 align-items-center mb-0">
              <strong className="me-2">Context:</strong>
              {formData.educationBoard && (
                <span>
                  Board:{" "}
                  <Badge bg="light" text="dark">
                    {formData.educationBoard}
                  </Badge>
                </span>
              )}
              {context.chapter && (
                <span>
                  Chapter:{" "}
                  <Badge bg="light" text="dark">
                    {context.chapter}
                  </Badge>
                </span>
              )}
              {context.topic && (
                <span>
                  Sub-topic:{" "}
                  <Badge bg="light" text="dark">
                    {context.topic}
                  </Badge>
                </span>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <Row className="g-4">
            {/* BASICS */}
            <Col lg={6}>
              <Card className="mb-3">
                <Card.Header className="fw-semibold">Basics</Card.Header>
                <Card.Body>
                  {/* Education Board */}
                  <Form.Group className="mb-3">
                    <Form.Label>Education Board</Form.Label>
                    <Form.Control
                      list="boardOptions"
                      placeholder="e.g., CBSE"
                      value={formData.educationBoard}
                      onChange={(e) => setFD({ educationBoard: e.target.value })}
                    />
                    <datalist id="boardOptions">
                      <option value="CBSE" />
                      <option value="ICSE" />
                      <option value="State Board" />
                      <option value="IB (International Baccalaureate)" />
                      <option value="Cambridge (IGCSE)" />
                      <option value="Other" />
                    </datalist>
                  </Form.Group>

                  {/* Class */}
                  <Form.Group className="mb-3">
                    <Form.Label>Class</Form.Label>
                    <Form.Select
                      value={formData.class}
                      onChange={(e) => setFD({ class: e.target.value })}
                      required
                    >
                      <option value="">-- Select --</option>
                      {Array.from({ length: 7 }).map((_, i) => (
                        <option key={i} value={6 + i}>
                          Class {6 + i}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  {/* Subjects */}
                  <Form.Group className="mb-3">
                    <Form.Label>Subjects (Max 3, Comma Separated)</Form.Label>
                    <Form.Control
                      type="text"
                      value={subjectInput}
                      onChange={(e) => setSubjectInput(e.target.value)}
                      placeholder="e.g., Physics, Chemistry, Maths"
                      required
                    />
                    <div className="mt-2 d-flex flex-wrap gap-2">
                      {subjectInput
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                        .slice(0, 3)
                        .map((chip, idx) => (
                          <Badge bg="light" text="dark" key={idx}>
                            {chip}
                          </Badge>
                        ))}
                    </div>
                  </Form.Group>

                  {/* Chapter + Sub-topic neatly side-by-side */}
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Chapter</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="e.g., Motion"
                          value={context.chapter}
                          onChange={(e) => setContext((c) => ({ ...c, chapter: e.target.value }))}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Sub-topic</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="e.g., Pulley"
                          value={context.topic}
                          onChange={(e) => setContext((c) => ({ ...c, topic: e.target.value }))}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Difficulty */}
                  <Form.Group className="mb-3">
                    <Form.Label>Difficulty</Form.Label>
                    <Form.Select
                      value={formData.difficulty}
                      onChange={(e) => setFD({ difficulty: e.target.value })}
                      required
                    >
                      <option value="">-- Select --</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </Form.Select>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>

            {/* COMPOSITION */}
            <Col lg={6}>
              <Card>
                <Card.Header className="fw-semibold">Composition</Card.Header>
                <Card.Body>
                  <div className="mb-3">
                    <div className="mb-2">Test Type</div>
                    <ButtonGroup>
                      {[
                        { value: "mcq", label: "MCQ" },
                        { value: "subjective", label: "Subjective" },
                        { value: "mcq+subjective", label: "Mixed" },
                      ].map((opt) => (
                        <ToggleButton
                          key={opt.value}
                          id={`tt-${opt.value}`}
                          type="radio"
                          variant={formData.testType === opt.value ? "primary" : "outline-primary"}
                          name="testType"
                          value={opt.value}
                          checked={formData.testType === opt.value}
                          onChange={(e) => {
                            setFD({ testType: e.currentTarget.value });
                            setQuestions([]);
                          }}
                        >
                          {opt.label}
                        </ToggleButton>
                      ))}
                    </ButtonGroup>
                  </div>

                  {/* Counts */}
                  {!isMixed && (
                    <Form.Group className="mb-3">
                      <Form.Label>Number Of Questions</Form.Label>
                      <Form.Control
                        type="number"
                        min={1}
                        value={formData.numberOfQuestion}
                        onChange={(e) => setFD({ numberOfQuestion: e.target.value })}
                        placeholder="e.g., 10"
                        required
                      />
                    </Form.Group>
                  )}

                  {isMixed && (
                    <>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>MCQ Count</Form.Label>
                            <Form.Control
                              type="number"
                              min={0}
                              value={formData.mcqCount}
                              onChange={(e) => setFD({ mcqCount: e.target.value })}
                              placeholder="e.g., 10"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Subjective Count</Form.Label>
                            <Form.Control
                              type="number"
                              min={0}
                              value={formData.subjectiveCount}
                              onChange={(e) => setFD({ subjectiveCount: e.target.value })}
                              placeholder="e.g., 5"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>Mix Order</Form.Label>
                        <Form.Select
                          value={formData.mixOrder}
                          onChange={(e) => setFD({ mixOrder: e.target.value })}
                        >
                          <option value="grouped">Grouped (MCQs first)</option>
                          <option value="alternate">Alternate (Interleaved)</option>
                        </Form.Select>
                      </Form.Group>
                    </>
                  )}

                  <div className="d-flex gap-2">
                    <Button variant="outline-secondary" onClick={generateQuestions}>
                      Generate Questions
                    </Button>
                    <Button variant="outline-danger" onClick={clearAll}>
                      Clear
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* QUESTIONS */}
          <Card className="mt-4">
            <Card.Header className="fw-semibold">
              Questions ({questions.length})
              <span className="ms-3 small text-muted">Filled:</span>
              <span className="ms-1 small">{completion}%</span>
              <ProgressBar now={completion} className="mt-2" />
            </Card.Header>
            <Card.Body>
              {questions.length === 0 ? (
                <div className="text-muted">No questions generated yet.</div>
              ) : (
                <Accordion alwaysOpen>
                  {questions.map((q, idx) => (
                    <Accordion.Item eventKey={String(idx)} key={idx}>
                      <Accordion.Header>
                        <span className="me-2">Q{idx + 1}.</span>
                        <Badge bg={q.type === "mcq" ? "primary" : "secondary"}>
                          {q.type.toUpperCase()}
                        </Badge>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Form.Group className="mb-3">
                          <Form.Label>Question</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={q.question}
                            onChange={(e) => updateQuestion(idx, { question: e.target.value })}
                            placeholder="Type your question here"
                            required
                          />
                        </Form.Group>

                        {q.type === "mcq" ? (
                          <>
                            <Row className="g-2">
                              {q.options?.map((opt, oi) => (
                                <Col md={6} key={oi}>
                                  <Form.Group className="mb-2">
                                    <InputGroup>
                                      <InputGroup.Text>{String.fromCharCode(65 + oi)}</InputGroup.Text>
                                      <Form.Control
                                        value={opt}
                                        onChange={(e) => {
                                          const next = [...(q.options || [])];
                                          next[oi] = e.target.value;
                                          updateQuestion(idx, { options: next });
                                        }}
                                        placeholder={`Option ${oi + 1}`}
                                      />
                                    </InputGroup>
                                  </Form.Group>
                                </Col>
                              ))}
                            </Row>
                            <Form.Group className="mb-3">
                              <Form.Label>Correct Answer</Form.Label>
                              <Form.Select
                                value={q.correctAnswer || ""}
                                onChange={(e) => updateQuestion(idx, { correctAnswer: e.target.value })}
                              >
                                <option value="">-- Select --</option>
                                {q.options?.map((opt, oi) => (
                                  <option key={oi} value={opt}>
                                    {opt || `Option ${oi + 1}`}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </>
                        ) : (
                          <Form.Group className="mb-3">
                            <Form.Label>Marks</Form.Label>
                            <Form.Control
                              type="number"
                              min={1}
                              value={q.marks || 1}
                              onChange={(e) =>
                                updateQuestion(idx, {
                                  marks: parseInt(e.target.value, 10) || 1,
                                })
                              }
                              placeholder="e.g., 5"
                            />
                          </Form.Group>
                        )}

                        <div className="d-flex justify-content-end">
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id={`tip-del-${idx}`}>Remove this question</Tooltip>}
                          >
                            <Button variant="outline-danger" size="sm" onClick={() => removeQuestion(idx)}>
                              Remove
                            </Button>
                          </OverlayTrigger>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              )}
            </Card.Body>
          </Card>

          <div className="text-center mt-3">
            <Button variant="success" type="submit" disabled={loading || questions.length === 0}>
              {loading ? "Creating..." : "Create Test"}
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
