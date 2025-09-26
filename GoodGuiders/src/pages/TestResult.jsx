// src/pages/TestResult.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import {
  Container,
  Card,
  Row,
  Col,
  Badge,
  ProgressBar,
  Table,
  Button,
  Spinner,
} from "react-bootstrap";

const API = import.meta.env?.VITE_API_URL || "http://localhost:5000/api";

/* ---------- Base path helper (works under /bootstrapreact/medixo) ---------- */
const detectRuntimeBase = () => {
  const path = window.location.pathname || "/";
  const markers = [
    "/test-player",
    "/test-result",
    "/my-assignments",
    "/assign-test",
    "/patient-dashboard",
    "/dashboard",
  ];
  for (const m of markers) {
    const i = path.indexOf(m);
    if (i > 0) return path.slice(0, i);
  }
  const parts = path.split("/").filter(Boolean);
  if (parts.length >= 2) return `/${parts[0]}/${parts[1]}`;
  return "";
};
const withBase = (p) => {
  const envBase = (import.meta?.env?.BASE_URL) || "/";
  const runtime = detectRuntimeBase();
  let base = envBase && envBase !== "/" ? envBase : runtime;
  base = (base || "").replace(/\/+$/, "");
  const normPath = String(p || "/").replace(/^\/+/, "");
  return `${base}/${normPath}`;
};

/* ---------- Robust option label extractor ---------- */
const optionText = (opt, i) => {
  if (opt == null) return `Option ${i + 1}`;
  if (typeof opt === "string" || typeof opt === "number") return String(opt);
  return (
    opt.text ||
    opt.label ||
    opt.value ||
    opt.name ||
    opt.title ||
    (typeof opt.content === "string" ? opt.content : null) ||
    `Option ${i + 1}`
  );
};

export default function TestResult() {
  const { attemptId } = useParams();
  const loc = useLocation();
  const navigate = useNavigate();

  const state = loc.state || {};
  const [loading, setLoading] = useState(!state?.result);
  const [paper, setPaper] = useState(state?.paper || null);
  const [summary, setSummary] = useState(state?.result || null);
  const [testId, setTestId] = useState(state?.testId || null);
  const assignmentId = state?.assignmentId || null;

  useEffect(() => {
    if (summary && paper) return;
    (async () => {
      try {
        setLoading(true);
        // fetch attempt
        const aRes = await fetch(`${API}/attempts/${attemptId}`);
        const aJson = await aRes.json();
        const attempt = aJson?.data || aJson || {};
        const tId = attempt?.testId || testId;
        setTestId(tId);

        // fetch paper
        let pRes = await fetch(`${API}/tests/${tId}`);
        if (!pRes.ok && assignmentId) {
          pRes = await fetch(`${API}/assignments/${assignmentId}/paper`);
        }
        const pJson = await pRes.json();
        const pRaw = pJson?.data || pJson?.test || pJson;
        const p = {
          title: pRaw?.title || "Test",
          subjects: Array.isArray(pRaw?.subjects) ? pRaw.subjects : [],
          questions: Array.isArray(pRaw?.questions) ? pRaw.questions : [],
        };
        setPaper(p);

        // if server didn't send summary, compute a basic one
        if (!summary) {
          const qs = p.questions || [];
          let score = 0,
            total = 0;
          const details = qs.map((q, idx) => {
            const qid = q._id || q.id || String(idx);
            const val = attempt?.answers?.[qid];
            const max = Number(q.marks || q.points || 1) || 1;
            total += max;

            // simple correctness for MCQ (single)
            let correct = false;
            if ((q.type || "mcq").toLowerCase() === "mcq") {
              let key = null;
              if (q.correctOption != null) key = String(q.correctOption);
              else if (q.answerKey != null) key = String(q.answerKey);
              else if (Array.isArray(q.options)) {
                const i = q.options.findIndex(
                  (o) => o && (o.isCorrect === true || o.correct === true)
                );
                if (i >= 0) key = String(i);
              }
              if (val != null && key != null) correct = String(val) === String(key);
            }
            if (correct) score += max;
            return { qid, correct, earned: correct ? max : 0, max, given: val };
          });
          setSummary({ score, total, details });
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptId]);

  const percent = useMemo(
    () =>
      !summary || !summary.total
        ? 0
        : Math.round((summary.score / summary.total) * 100),
    [summary]
  );
  const subjects = paper?.subjects?.length ? paper.subjects.join(", ") : "—";
  const correctCount = useMemo(
    () => (summary?.details || []).filter((d) => d.correct).length,
    [summary]
  );
  const incorrectCount = useMemo(
    () => (summary?.details || []).filter((d) => d.correct === false).length,
    [summary]
  );
  const unansweredCount = useMemo(
    () =>
      (summary?.details || []).filter(
        (d) => d.earned === 0 && d.correct === false && (d.given == null || d.given === "")
      ).length,
    [summary]
  );

  const goDashboard = () =>
    navigate(withBase("/patient-dashboard"), { replace: true });

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-4 mt-99">
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={8}>
              <h3 className="mb-1">{paper?.title || "Test Result"}</h3>
              <div className="text-muted">Subjects: {subjects}</div>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <Badge bg={percent >= 60 ? "success" : "secondary"} className="fs-6">
                {percent}% Overall
              </Badge>
              <div className="mt-2">
                <Button
                  variant="outline-primary"
                  className="me-2"
                  as={Link}
                  to={withBase("/my-assignments")}
                >
                  Back to Assignments
                </Button>
                <Button variant="success" onClick={goDashboard}>
                  Back to Dashboard
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={4}>
              <h4 className="mb-1">Score</h4>
              <div className="display-6 fw-bold">
                {summary?.score ?? 0} / {summary?.total ?? 0}
              </div>
              <div className="text-muted">
                Correct: {correctCount} &nbsp;•&nbsp; Incorrect: {incorrectCount} &nbsp;•&nbsp; Unanswered: {unansweredCount}
              </div>
            </Col>
            <Col md={8}>
              <div className="mb-1 d-flex justify-content-between">
                <span className="text-muted">Performance</span>
                <span className="text-muted">{percent}%</span>
              </div>
              <ProgressBar now={percent} style={{ height: 10 }} />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Header>
          <strong>Question Review</strong>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0 align-middle">
              <thead>
                <tr>
                  <th style={{ width: 70 }}>#</th>
                  <th>Question</th>
                  <th style={{ width: "30%" }}>Your Answer</th>
                  <th style={{ width: "15%" }}>Result</th>
                </tr>
              </thead>
              <tbody>
                {(paper?.questions || []).map((q, i) => {
                  const det = (summary?.details || [])[i] || {};
                  const qText =
                    q.text ||
                    q.question ||
                    q.title ||
                    q.name ||
                    q.prompt ||
                    q.statement ||
                    q.description ||
                    "Untitled question";
                  const type = (q.type || "mcq").toLowerCase();

                  // ---- Build "Your Answer" string for MCQ (supports string or object options)
                  let yourAnswerText = "—";
                  if (type === "mcq") {
                    const options = Array.isArray(q.options) ? q.options : [];

                    // single select (string key) or multi-select (array of keys)
                    const givenKeys = Array.isArray(det.given) ? det.given : [det.given];

                    const parts = givenKeys
                      .filter((v) => v !== undefined && v !== null && v !== "")
                      .map((val) => {
                        const idx = options.findIndex(
                          (opt, k) =>
                            String(opt?._id || opt?.id || opt?.key || k) ===
                            String(val)
                        );
                        if (idx >= 0) {
                          const label = optionText(options[idx], idx);
                          return `${String.fromCharCode(65 + idx)}) ${label}`;
                        }
                        return `Selected: ${val}`;
                      });

                    if (parts.length) yourAnswerText = parts.join(", ");
                  } else {
                    if (det.given != null && det.given !== "") {
                      yourAnswerText = String(det.given);
                    }
                  }

                  return (
                    <tr key={`res-${i}`}>
                      <td>
                        <Badge bg="secondary">{i + 1}</Badge>
                      </td>
                      <td>
                        <div className="text-wrap">{qText}</div>
                      </td>
                      <td>{yourAnswerText}</td>
                      <td>
                        {det.correct ? (
                          <Badge bg="success">Correct</Badge>
                        ) : det.given == null || det.given === "" ? (
                          <Badge bg="secondary">Unanswered</Badge>
                        ) : (
                          <Badge bg="danger">Incorrect</Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
