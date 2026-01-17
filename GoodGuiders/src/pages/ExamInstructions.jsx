import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams, Link, useSearchParams } from "react-router-dom";
import { Container, Card, Row, Col, Badge, Button, Spinner, Form, Alert, ListGroup } from "react-bootstrap";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";
const LS_KEY = "assignProgressByAssignment";

// small helpers (kept inline so this file is standalone)
const extractId = (x) => (typeof x === "string" ? x : x?._id || x?.id || null);
const normalizeStringList = (list) => {
  const arr = Array.isArray(list) ? list : typeof list === "string" ? list.split(",") : [];
  return arr
    .map((item) => {
      if (!item) return null;
      if (typeof item === "string") return item.trim();
      if (typeof item === "object") return (item.name ?? item.title ?? item.label ?? item.value ?? "").toString().trim();
      return String(item).trim();
    })
    .filter(Boolean);
};
const pickSubjects = (obj) =>
  normalizeStringList(obj?.subjects) ||
  normalizeStringList(obj?.subjectNames) ||
  normalizeStringList(obj?.tags) ||
  [];
const pickClass = (obj) =>
  obj?.class ?? obj?.className ?? obj?.klass ?? obj?.grade ?? obj?.standard ?? null;

export default function ExamInstructions() {
  const { assignmentId } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // incoming (optional) hints
  const hintedTestId = params.get("testId") || null;

  // ui
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [agree, setAgree] = useState(false);
  const [starting, setStarting] = useState(false);

  // data
  const [assignment, setAssignment] = useState(null);
  const [paper, setPaper] = useState(null);

  // ---- Fetch assignment + try to fetch the paper for metadata ----
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        // 1) assignment details
        const aRes = await fetch(`${API}/assignments/${assignmentId}`);
        const aJson = await aRes.json();
        const a = aJson?.data || aJson?.assignment || aJson || {};
        setAssignment(a);

        // 2) locate test id (row hint -> detail)
        const testId =
          hintedTestId ||
          extractId(a?.test || a?.testId || a?.exam || a?.paper || a?.meta?.testId);

        // 3) paper (best effort) for counts
        let p = null;
        if (testId) {
          let r = await fetch(`${API}/tests/${encodeURIComponent(testId)}`);
          if (r.ok) {
            const j = await r.json();
            const raw = j?.data || j?.test || j || {};
            p = {
              title: raw?.title || a?.title || "Test",
              subjects: pickSubjects(raw),
              class: pickClass(raw),
              questions: Array.isArray(raw?.questions) ? raw.questions : [],
              durationMin: raw?.durationMin ?? raw?.durationMinutes ?? raw?.timeLimitMin ?? a?.durationMin ?? a?.durationMinutes ?? a?.timeLimitMin ?? null
            };
          } else {
            // fallback endpoint some backends expose
            r = await fetch(`${API}/assignments/${assignmentId}/paper`);
            if (r.ok) {
              const j2 = await r.json();
              const raw2 = j2?.data || j2?.test || j2 || {};
              p = {
                title: raw2?.title || a?.title || "Test",
                subjects: pickSubjects(raw2),
                class: pickClass(raw2),
                questions: Array.isArray(raw2?.questions) ? raw2.questions : [],
                durationMin: raw2?.durationMin ?? raw2?.durationMinutes ?? raw2?.timeLimitMin ?? null
              };
            }
          }
        }
        setPaper(p);
      } catch (e) {
        setError(e?.message || "Failed to load exam information.");
      } finally {
        setLoading(false);
      }
    })();
  }, [assignmentId, hintedTestId]);

  const qCount = useMemo(() => (Array.isArray(paper?.questions) ? paper.questions.length : null), [paper]);
  const subjects = useMemo(() => (paper?.subjects?.length ? paper.subjects.join(", ") : "—"), [paper]);

  const handleConfirm = async () => {
    setStarting(true);
    try {
      // create / reuse attempt
      let attemptId = null;
      let testId =
        hintedTestId ||
        extractId(assignment?.test || assignment?.testId || assignment?.exam || assignment?.paper || assignment?.meta?.testId);

      try {
        const res = await fetch(`${API}/assignments/${assignmentId}/start`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ testId: testId || undefined }),
        });
        if (res.ok) {
          const data = await res.json();
          attemptId = data?.attemptId || data?.data?._id || data?.attempt?._id || null;
          testId =
            testId ||
            extractId(
              data?.test || data?.testId || data?.exam || data?.paper || data?.data?.test || data?.data?.testId
            );
        }
      } catch {
        // non-fatal; the player can still resolve on its own
      }

      // persist a local start hint
      try {
        const map = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
        map[assignmentId] = {
          ...(map[assignmentId] || {}),
          status: "in_progress",
          attemptId,
          testId,
          startedAt: new Date().toISOString(),
        };
        localStorage.setItem(LS_KEY, JSON.stringify(map));
      } catch {}

      // go to player
      const qs = new URLSearchParams(
        Object.fromEntries(
          Object.entries({
            testId: testId || undefined,
            attemptId: attemptId || undefined,
          }).filter(([, v]) => !!v)
        )
      ).toString();
      navigate(`/test-player/${assignmentId}${qs ? `?${qs}` : ""}`, {
        replace: false,
        state: { from: location.pathname },
      });
    } finally {
      setStarting(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Header>
          <Row className="align-items-center">
            <Col>
              <h4 className="mb-0">{paper?.title || assignment?.title || "Exam Instructions"}</h4>
              <small className="text-muted">
                Subjects: {subjects} &nbsp;•&nbsp; Class: {paper?.class ?? "—"} {qCount != null ? `• Questions: ${qCount}` : ""}
                {assignment?.dueAt ? ` • Due: ${new Date(assignment.dueAt).toLocaleString()}` : ""}
                {paper?.durationMin ? ` • Duration: ${paper.durationMin} min` : ""}
              </small>
            </Col>
            <Col md="auto">
              <Badge bg="info">Assignment</Badge>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          {error && <Alert variant="warning">{error}</Alert>}

          <p className="mb-2"><strong>Please read carefully before you start:</strong></p>
          <ListGroup className="mb-3">
            <ListGroup.Item>1) Do not refresh or close the tab while the exam is in progress.</ListGroup.Item>
            <ListGroup.Item>2) Your answers are auto-saved as you select options; you can also click <em>Save</em> anytime.</ListGroup.Item>
            <ListGroup.Item>3) Use the <strong>Question Palette</strong> to jump between questions.</ListGroup.Item>
            <ListGroup.Item>4) After reviewing on the <strong>Preview</strong> screen, click <strong>Submit Paper</strong>. You cannot edit answers after submitting.</ListGroup.Item>
            <ListGroup.Item>5) If your time expires, the paper will auto-submit with the last saved answers.</ListGroup.Item>
          </ListGroup>

          <Form.Check
            type="checkbox"
            id="agree"
            label="I have read and agree to the instructions."
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
        </Card.Body>

        <Card.Footer className="d-flex justify-content-between">
          <Button as={Link} to="/my-assignments" variant="outline-secondary">
            Back
          </Button>
          <Button variant="success" disabled={!agree || starting} onClick={handleConfirm}>
            {starting ? "Starting…" : "Confirm & Start"}
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}
