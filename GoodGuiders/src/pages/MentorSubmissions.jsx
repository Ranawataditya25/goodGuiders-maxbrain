// MentorSubmissions.jsx (updated to show answers with questions)
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Accordion,
  Spinner,
  Badge,
} from "react-bootstrap";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

export default function MentorSubmissions() {
  const [tests, setTests] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [loadingTests, setLoadingTests] = useState(true);
  const [loadingAssignments, setLoadingAssignments] = useState(false);
  const [error, setError] = useState("");

  // Load mentor tests
  useEffect(() => {
    (async () => {
      try {
        setLoadingTests(true);
        const loggedInUser = JSON.parse(
          localStorage.getItem("loggedInUser") || "{}"
        );
        const email = loggedInUser.email;

        if (!email) {
          setError("User email not found. Please log in again.");
          setLoadingTests(false);
          return;
        }

        const res = await axios.get(`${API}/tests`, { params: { email } });
        setTests(res.data?.data || []);
      } catch (e) {
        console.error(e);
        setError("Failed to load tests.");
      } finally {
        setLoadingTests(false);
      }
    })();
  }, []);

  // Load assignments for a test
  const loadAssignments = async (test) => {
    setSelectedTest(test);
    setAssignments([]);
    try {
      setLoadingAssignments(true);

      // Fetch assignments
      const res = await axios.get(`${API}/assignments`, {
        params: { testId: test._id },
      });
      const assignmentsWithQuestions = res.data?.data || [];

      // Fetch test questions
      const questionsRes = await axios.get(`${API}/tests/${test._id}`);
      const questions = questionsRes.data?.data?.questions || [];
      console.log("Test questions:", questions);

assignmentsWithQuestions.forEach((a) => {
  let ansArray = a.latestAttempt?.answers;
  if (!ansArray) return;

  // Convert object answers to array of answer objects
if (!Array.isArray(ansArray)) {
  // Convert object answers to array of answer objects
  ansArray = Object.values(ansArray).map((value) => {
    return { selectedAnswer: value }; // use the value, not the key
  });
}
a.latestAttempt.answers = ansArray.map((ans, idx) => {
  const question = questions[idx];
  if (!question) return { ...ans, questionText: "Unknown Question" };

  let text = "No Answer";

  if (question.type === "mcq") {
    if (ans.selectedAnswer != null) {
      // If selectedAnswer is a number and corresponds to an index in options
      const numericIndex = Number(ans.selectedAnswer);
      if (!isNaN(numericIndex) && question.options?.[numericIndex] != null) {
        text = question.options[numericIndex]; // pick option text by index
      } else {
        text = ans.selectedAnswer; // otherwise use the raw answer (string)
      }
    }

    return {
      ...ans,
      selectedAnswerText: text,
      questionText: question.question,
      type: "mcq",
    };
  } else {
    return {
      ...ans,
      writtenAnswerText: ans.writtenAnswer || "No Answer",
      questionText: question.question,
      type: "subjective",
    };
  }
});





});



      setAssignments(assignmentsWithQuestions);
    } catch (e) {
      console.error(e);
      setError("Failed to load assignments.");
    } finally {
      setLoadingAssignments(false);
    }
  };

  return (
    <div style={{ marginTop: 120 }}>
      <Container>
        <Row className="mb-3">
          <Col>
            <h3 className="mb-0">Mentor Submissions</h3>
            <div className="text-muted">
              View students answers for your assigned tests.
            </div>
          </Col>
        </Row>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* Tests */}
        <Card className="mb-4">
          <Card.Body>
            <h5>Your Tests</h5>
            {loadingTests ? (
              <Spinner animation="border" />
            ) : (
              <Table responsive hover className="align-middle">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Subjects</th>
                    <th>Type</th>
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
                        <Badge bg="dark">{t.testType}</Badge>
                      </td>
                      <td>{new Date(t.createdAt).toLocaleString()}</td>
                      <td className="text-end">
                        <Button
                          size="sm"
                          variant="info"
                          onClick={() => loadAssignments(t)}
                        >
                          View Submissions
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {tests.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center text-muted">
                        No tests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>

        {/* Assignments */}
        {selectedTest && (
          <Card>
            <Card.Body>
              <h5>
                Submissions for{" "}
                <span className="text-primary">
                  {selectedTest.subjects?.join(", ")}
                </span>
              </h5>

              {loadingAssignments ? (
                <Spinner animation="border" />
              ) : assignments.length === 0 ? (
                <p className="text-muted">No submissions yet.</p>
              ) : (
                <Accordion defaultActiveKey="0" alwaysOpen>
                  {assignments.map((a, idx) => (
                    <Accordion.Item eventKey={idx.toString()} key={a._id}>
                      <Accordion.Header>
                        {a.latestAttempt?.userEmail ||
                          a.students?.map((s) => s.name).join(", ") ||
                          "Unknown Student"}{" "}
                        —{" "}
                        {a.latestAttempt?.submittedAt ? (
                          <small className="text-muted">
                            Submitted on{" "}
                            {new Date(
                              a.latestAttempt.submittedAt
                            ).toLocaleString()}
                          </small>
                        ) : (
                          <span className="text-warning">
                            Not submitted yet
                          </span>
                        )}
                      </Accordion.Header>

                      <Accordion.Body>
                        {a.latestAttempt ? (
                          Array.isArray(a.latestAttempt.answers) &&
                          a.latestAttempt.answers.length > 0 ? (
                            <ul>
                              {a.latestAttempt.answers.map((ans, i) => (
                                <li key={i}>
                                  <strong>Q{i + 1}:</strong>{" "}
                                  {ans.questionText && (
                                    <span>{ans.questionText} — </span>
                                  )}
                                  {ans.type === "mcq"
                                    ? ans.selectedAnswerText || "No Answer"
                                    : ans.writtenAnswerText || "No Answer"}
                                </li>
                              ))}
                            </ul>
                          ) : a.latestAttempt.answers &&
                            typeof a.latestAttempt.answers === "object" ? (
                            // fallback if answers is an object instead of array
                            <ul>
                              {Object.values(a.latestAttempt.answers).map(
                                (ans, i) => (
                                  <li key={i}>
                                    <strong>Q{i + 1}:</strong>{" "}
                                    {ans.questionText && (
                                      <span>{ans.questionText} — </span>
                                    )}
                                    {ans.type === "mcq"
                                      ? ans.selectedAnswerText || "No Answer"
                                      : ans.writtenAnswerText || "No Answer"}
                                  </li>
                                )
                              )}
                            </ul>
                          ) : (
                            <p className="text-muted">No answers submitted.</p>
                          )
                        ) : (
                          <p className="text-muted">No attempt yet.</p>
                        )}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              )}
            </Card.Body>
          </Card>
        )}
      </Container>
    </div>
  );
}
