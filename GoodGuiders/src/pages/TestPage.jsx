import { useMemo, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Adjust to your backend

export const TestPage = () => {
  const [formData, setFormData] = useState({
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
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const generateQuestions = () => {
    setError("");

    if (!formData.testType) {
      setError("Please choose a Test Type.");
      return;
    }

    if (!isMixed) {
      if (totalSingle < 1) return setError("Enter at least 1 question.");
      if (totalSingle > 50) return setError("Maximum 50 questions.");
    } else {
      if (totalMixed < 1) return setError("Enter at least 1 question in total.");
      if (totalMixed > 50) return setError("Maximum 50 questions in total.");
    }

    const next = [];
    if (!isMixed) {
      const count = totalSingle;
      const isMCQ = formData.testType === "mcq";
      for (let i = 0; i < count; i++) {
        next.push(baseQuestion(isMCQ ? "mcq" : "subjective"));
      }
    } else {
      const m = parseInt(formData.mcqCount || 0, 10) || 0;
      const s = parseInt(formData.subjectiveCount || 0, 10) || 0;

      if (formData.mixOrder === "alternate") {
        // Interleave while respecting counts
        let i = 0,
          j = 0;
        while (i < m || j < s) {
          if (i < m) next.push(baseQuestion("mcq")), i++;
          if (j < s) next.push(baseQuestion("subjective")), j++;
        }
      } else {
        // grouped: MCQs first, then Subjectives
        for (let i = 0; i < m; i++) next.push(baseQuestion("mcq"));
        for (let i = 0; i < s; i++) next.push(baseQuestion("subjective"));
      }
    }
    setQuestions(next);
  };

  const baseQuestion = (type) =>
    type === "mcq"
      ? {
          type: "mcq",
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
          suggestedAnswer: undefined,
          marks: 1,
        }
      : {
          type: "subjective",
          question: "",
          options: [],
          correctAnswer: undefined,
          suggestedAnswer: "",
          marks: 5,
        };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    if (field === "options") {
      updated[index].options = value;
    } else {
      updated[index][field] = value;
    }
    setQuestions(updated);
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const updated = [...questions];
    if (!updated[questionIndex].options) updated[questionIndex].options = ["", "", "", ""];
    updated[questionIndex].options[optionIndex] = value;
    setQuestions(updated);
  };

  const removeQuestion = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
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

    const payload = {
      ...formData,
      subjects: subjectList,
      questions,
    };

    try {
      await axios.post(`${API_URL}/questions`, payload);
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

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <Row className="g-4">
            {/* Basics */}
            <Col lg={6}>
              <Card>
                <Card.Body>
                  <Card.Title className="mb-3">Basics</Card.Title>

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

            {/* Composition */}
            <Col lg={6}>
              <Card>
                <Card.Body>
                  <Card.Title className="mb-3">Composition</Card.Title>

                  <div className="mb-3">
                    <Form.Label className="me-2">Test Type</Form.Label>
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
                          variant={formData.testType === opt.value ? "primary" : "outline-secondary"}
                          name="testType"
                          value={opt.value}
                          checked={formData.testType === opt.value}
                          onChange={(e) => {
                            setFD({ testType: e.currentTarget.value });
                            setQuestions([]); // reset preview when type changes
                          }}
                        >
                          {opt.label}
                        </ToggleButton>
                      ))}
                    </ButtonGroup>
                  </div>

                  {!isMixed && (
                    <Form.Group className="mb-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <Form.Label className="mb-0">Number Of Questions</Form.Label>
                        <Badge bg="secondary">{totalSingle}</Badge>
                      </div>
                      <InputGroup className="mt-1">
                        <Form.Control
                          type="number"
                          min="1"
                          max="50"
                          value={formData.numberOfQuestion}
                          onChange={(e) => setFD({ numberOfQuestion: e.target.value })}
                          placeholder="e.g., 10"
                          required
                        />
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>Allowed range: 1–50</Tooltip>}
                        >
                          <InputGroup.Text>?</InputGroup.Text>
                        </OverlayTrigger>
                      </InputGroup>
                    </Form.Group>
                  )}

                  {isMixed && (
                    <>
                      <Row className="g-3">
                        <Col sm={6}>
                          <Form.Group>
                            <div className="d-flex justify-content-between align-items-center">
                              <Form.Label className="mb-0">MCQ Count</Form.Label>
                              <Badge bg="secondary">{parseInt(formData.mcqCount || 0, 10) || 0}</Badge>
                            </div>
                            <Form.Control
                              type="number"
                              min="0"
                              max="50"
                              value={formData.mcqCount}
                              onChange={(e) => setFD({ mcqCount: e.target.value })}
                              placeholder="e.g., 10"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group>
                            <div className="d-flex justify-content-between align-items-center">
                              <Form.Label className="mb-0">Subjective Count</Form.Label>
                              <Badge bg="secondary">
                                {parseInt(formData.subjectiveCount || 0, 10) || 0}
                              </Badge>
                            </div>
                            <Form.Control
                              type="number"
                              min="0"
                              max="50"
                              value={formData.subjectiveCount}
                              onChange={(e) => setFD({ subjectiveCount: e.target.value })}
                              placeholder="e.g., 5"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <div className="mt-2 small text-muted">
                        Total planned: <strong>{totalMixed}</strong> (limit 50)
                      </div>

                      <Form.Group className="mt-3">
                        <Form.Label className="me-2">Order in Paper</Form.Label>
                        <ButtonGroup>
                          {[
                            { value: "grouped", label: "Group by Type" },
                            { value: "alternate", label: "Alternate (MCQ, Subj…)" },
                          ].map((opt) => (
                            <ToggleButton
                              key={opt.value}
                              id={`ord-${opt.value}`}
                              type="radio"
                              variant={
                                formData.mixOrder === opt.value ? "secondary" : "outline-secondary"
                              }
                              name="mixOrder"
                              value={opt.value}
                              checked={formData.mixOrder === opt.value}
                              onChange={(e) => setFD({ mixOrder: e.currentTarget.value })}
                            >
                              {opt.label}
                            </ToggleButton>
                          ))}
                        </ButtonGroup>
                      </Form.Group>
                    </>
                  )}

                  <div className="mt-3 d-flex align-items-center gap-2">
                    <Button variant="warning" onClick={generateQuestions}>
                      Generate Questions
                    </Button>
                    <span className="small text-muted">
                      This will refresh the preview below.
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Preview & progress */}
          <Card className="mt-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Card.Title className="mb-0">Questions Preview</Card.Title>
                <div className="d-flex align-items-center gap-2">
                  <Badge bg="info" text="dark">
                    {questions.length} generated
                  </Badge>
                  <div style={{ minWidth: 160 }}>
                    <ProgressBar now={completion} label={`${completion}%`} />
                  </div>
                </div>
              </div>

              {questions.length === 0 ? (
                <div className="text-muted">
                  No questions yet. Choose test type and counts, then click{" "}
                  <strong>Generate Questions</strong>.
                </div>
              ) : (
                <Accordion alwaysOpen>
                  {questions.map((q, index) => {
                    const isMCQ = q.type === "mcq";
                    return (
                      <Accordion.Item eventKey={String(index)} key={index} className="mb-2">
                        <Accordion.Header>
                          <div className="me-2">
                            <Badge bg={isMCQ ? "primary" : "warning"} text="dark">
                              {isMCQ ? "MCQ" : "Subjective"}
                            </Badge>
                          </div>
                          <strong className="me-2">Q{index + 1}</strong>
                          <span className="text-muted small">
                            {((q.question || "").trim().length > 0 && "• filled") || "• empty"}
                          </span>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Form.Group className="mb-3">
                            <Form.Label>Question</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={isMCQ ? 2 : 3}
                              value={q.question}
                              onChange={(e) => updateQuestion(index, "question", e.target.value)}
                              required
                            />
                          </Form.Group>

                          {isMCQ ? (
                            <>
                              <Row className="g-2">
                                {q.options.map((opt, i) => (
                                  <Col md={6} key={i}>
                                    <Form.Control
                                      placeholder={`Option ${String.fromCharCode(65 + i)}`}
                                      value={opt}
                                      onChange={(e) => updateOption(index, i, e.target.value)}
                                      required
                                    />
                                  </Col>
                                ))}
                              </Row>

                              <Form.Group className="mt-3">
                                <Form.Label>Correct Answer</Form.Label>
                                <Form.Select
                                  value={q.correctAnswer}
                                  onChange={(e) =>
                                    updateQuestion(index, "correctAnswer", e.target.value)
                                  }
                                  required
                                >
                                  <option value="">Select</option>
                                  {q.options.map((opt, i) => (
                                    <option key={i} value={opt}>
                                      {String.fromCharCode(65 + i)}: {opt || "(empty)"}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Form.Group>
                            </>
                          ) : (
                            <Form.Group>
                              <Form.Label>Suggested Answer (optional)</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={2}
                                value={q.suggestedAnswer}
                                onChange={(e) =>
                                  updateQuestion(index, "suggestedAnswer", e.target.value)
                                }
                              />
                            </Form.Group>
                          )}

                          <Row className="align-items-center mt-3">
                            <Col xs="auto">
                              <Form.Label className="mb-0">Marks</Form.Label>
                            </Col>
                            <Col xs="auto">
                              <Form.Control
                                type="number"
                                min="1"
                                value={q.marks}
                                onChange={(e) =>
                                  updateQuestion(index, "marks", parseInt(e.target.value || 1, 10))
                                }
                                style={{ width: 100 }}
                              />
                            </Col>
                            <Col className="text-end">
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => removeQuestion(index)}
                              >
                                Remove Question
                              </Button>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                    );
                  })}
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
};

export default TestPage;