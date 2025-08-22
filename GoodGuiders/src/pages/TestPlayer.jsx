import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useSearchParams, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Spinner,
  Form,
  Badge,
  Alert,
  ProgressBar,
  Row,
  Col,
} from "react-bootstrap";
import "../styles/TestPlayer.css";

const API = "http://localhost:5000/api";
const AUTOSAVE_DEBOUNCE_MS = 400;

export default function TestPlayer() {
  const { assignmentId } = useParams();
  const [search] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Optional query params
  const queryTestId = search.get("testId") || null;
  const queryAttemptId = search.get("attemptId") || null;

  // UI state
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [debugOpen, setDebugOpen] = useState(false);

  // Data
  const [assignment, setAssignment] = useState(null);
  const [paper, setPaper] = useState(null);
  const [attemptId, setAttemptId] = useState(queryAttemptId);
  const [attemptReady, setAttemptReady] = useState(false); // <-- gate network saves
  const [answers, setAnswers] = useState({}); // { [qid]: value }
  const [result, setResult] = useState(null);

  // Navigation (one question at a time)
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visited, setVisited] = useState(new Set([0]));

  // Buttons
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Timer
  const [secondsLeft, setSecondsLeft] = useState(null);
  const tickRef = useRef(null);

  // Refs (optional jump targets)
  const questionRefs = useRef({});

  // AUTOSAVE state
  const [autoSaving, setAutoSaving] = useState(false);
  const [autoSavedAt, setAutoSavedAt] = useState(null);
  const [autosaveDisabled, setAutosaveDisabled] = useState(false);
  const pendingRef = useRef({});   // accumulated deltas not yet sent
  const debRef = useRef(null);
  const inflightRef = useRef(false);

  // ---------- Helpers ----------
  const getId = (x) => x?._id || x?.id || null;

  const normalizePaper = (raw) => {
    const p = raw?.data || raw?.test || raw?.exam || raw;
    const qs =
      (Array.isArray(p?.questions) && p.questions) ||
      (Array.isArray(p?.questionList) && p.questionList) ||
      (Array.isArray(p?.mcqs) && p.mcqs) ||
      [];
    const subjects = Array.isArray(p?.subjects)
      ? p.subjects
          .map((s) =>
            typeof s === "string" ? s : (s?.name || s?.label || s?.title || "").toString()
          )
          .filter(Boolean)
      : [];
    return { ...p, questions: qs, subjects };
  };

  const tryJson = async (res) => {
    try {
      return await res.json();
    } catch {
      return null;
    }
  };

  const fetchAssignment = async (id) => {
    let r = await fetch(`${API}/assignments/${id}`);
    if (r.ok) {
      const j = await tryJson(r);
      return j?.data || j?.assignment || j;
    }
    r = await fetch(`${API}/assignments?id=${encodeURIComponent(id)}`);
    if (r.ok) {
      const j = await tryJson(r);
      return j?.data || j?.assignment || j;
    }
    return null;
  };

  const extractTestIdFromAssignment = (a) => {
    const t = a?.test ?? a?.testId ?? a?.exam ?? a?.paper ?? null;
    if (!t) return null;
    if (typeof t === "string") return t;
    return getId(t);
  };

  const fetchPaperByTestId = async (tid) => {
    let r = await fetch(`${API}/tests/${encodeURIComponent(tid)}`);
    if (r.ok) return normalizePaper(await tryJson(r));

    // fallback
    r = await fetch(`${API}/assignments/${assignmentId}/paper`);
    if (r.ok) return normalizePaper(await tryJson(r));

    throw new Error(`Could not fetch paper for testId=${tid}`);
  };

  // Remove attemptId from URL if we detect it's stale (prevents future reload issues)
  const stripAttemptIdFromUrl = () => {
    const params = new URLSearchParams(location.search);
    if (params.has("attemptId")) {
      params.delete("attemptId");
      navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
    }
  };

  // Create or validate attempt; only enable autosave once it's confirmed
  const ensureAttempt = async (tid) => {
    try {
      setAttemptReady(false);

      // 1) If we have an attemptId (from state or URL), verify it exists
      let candidate = attemptId || queryAttemptId || null;
      if (candidate) {
        const r = await fetch(`${API}/attempts/${candidate}`);
        if (r.ok) {
          const j = await r.json();
          const att = j?.data || j?.attempt || j;
          if (att?.answers && typeof att.answers === "object") setAnswers(att.answers);
          setAttemptId(candidate);
          setAttemptReady(true);
          return candidate;
        } else {
          // stale id in URL/state — clear it
          candidate = null;
          setAttemptId(null);
          stripAttemptIdFromUrl();
        }
      }

      // 2) Start a new attempt
      const s = await fetch(`${API}/assignments/${assignmentId}/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testId: tid }),
      });
      if (s.ok) {
        const j = await s.json();
        const newAttemptId = j?.attemptId || j?.data?._id || null;
        if (j?.answers && typeof j.answers === "object") setAnswers(j.answers);
        setAttemptId(newAttemptId);
        setAttemptReady(true);
        // also strip any stale attemptId param from the URL
        stripAttemptIdFromUrl();
        return newAttemptId;
      }

      // failed to start
      setAttemptReady(false);
      return null;
    } catch (e) {
      console.error("ensureAttempt error", e);
      setAttemptReady(false);
      return null;
    }
  };

  // Robust resolver for question prompt (plain text or HTML)
  const getQuestionText = (q) => {
    if (!q) return { isHtml: false, text: "" };
    const htmlCandidate =
      q.html || q.richText || q.contentHtml || q.questionHtml || q.stemHtml;
    if (typeof htmlCandidate === "string" && htmlCandidate.trim()) {
      return { isHtml: true, html: htmlCandidate };
    }
    const candidates = [
      q.text,
      q.question,
      q.title,
      q.name,
      q.prompt,
      q.statement,
      q.qtext,
      q.label,
      q.questionText,
      q.desc,
      q.description,
    ];
    const pick = candidates.find((x) => typeof x === "string" && x.trim() !== "");
    return { isHtml: false, text: pick || "Untitled question" };
  };

  // Guess duration in seconds. Defaults to 30 minutes if none present.
  const guessDurationSec = (p, a) => {
    const mins =
      a?.durationMin ??
      a?.durationMinutes ??
      a?.timeLimitMin ??
      p?.durationMin ??
      p?.durationMinutes ??
      p?.timeLimitMin ??
      p?.duration ??
      a?.duration ??
      null;
    if (typeof mins === "number" && mins > 0) return Math.round(mins * 60);
    return 30 * 60;
  };

  // Local scoring fallback (MCQ + simple text)
  const scoreLocally = (paperObj, given) => {
    const questions = paperObj?.questions || [];
    let earned = 0;
    const details = [];

    questions.forEach((q, idx) => {
      const qid = q._id || q.id || String(idx);
      const userVal = given[qid];
      const max = Number(q.marks || q.points || 1) || 1;
      const type = (q.type || "mcq").toLowerCase();
      let correct = false;

      if (type === "mcq") {
        let correctKey = null;
        if (q.correctOption != null) correctKey = String(q.correctOption);
        else if (q.answerKey != null) correctKey = String(q.answerKey);
        else if (Array.isArray(q.options)) {
          const idxTrue = q.options.findIndex((o) => o?.isCorrect === true);
          if (idxTrue >= 0)
            correctKey = String(q.options[idxTrue]?._id || q.options[idxTrue]?.id || idxTrue);
        }
        if (userVal != null && correctKey != null) {
          correct = String(userVal) === String(correctKey);
        }
      } else {
        const ref =
          q.correctAnswer ??
          q.answer ??
          (Array.isArray(q.correctAnswers) ? q.correctAnswers : null);
        if (typeof ref === "string" && typeof userVal === "string") {
          correct = ref.trim().toLowerCase() === userVal.trim().toLowerCase();
        } else if (Array.isArray(ref) && typeof userVal === "string") {
          correct = ref.some(
            (ans) => String(ans).trim().toLowerCase() === userVal.trim().toLowerCase()
          );
        }
      }

      earned += correct ? max : 0;
      details.push({ qid, correct, earned: correct ? max : 0, max });
    });

    return { score: earned, total: details.reduce((s, d) => s + d.max, 0), details };
  };

  // ---------- Load assignment + paper + attempt ----------
  useEffect(() => {
    (async () => {
      setLoading(true);
      setErrorMsg("");
      setResult(null);
      try {
        const a = await fetchAssignment(assignmentId);
        setAssignment(a);

        let effectiveTestId = queryTestId || extractTestIdFromAssignment(a) || null;

        // If assignment already embeds questions
        if (!effectiveTestId && Array.isArray(a?.questions) && a.questions.length) {
          setPaper(
            normalizePaper({ data: { title: a.title || "Test", questions: a.questions } })
          );
          await ensureAttempt(null);
          setLoading(false);
          return;
        }

        if (!effectiveTestId) throw new Error("No test id available for this assignment.");

        const p = await fetchPaperByTestId(effectiveTestId);
        setPaper(p);

        await ensureAttempt(effectiveTestId);
      } catch (e) {
        console.error(e);
        setErrorMsg(e?.message || "Could not load this test.");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignmentId, queryTestId]);

  // ---------- Derived data ----------
  const qs = useMemo(() => paper?.questions || [], [paper]);
  const totalQ = qs.length;
  const q = totalQ ? qs[currentIdx] : null;

  const answeredCount = useMemo(
    () => qs.filter((q, i) => (answers[q?._id || q?.id || String(i)] ?? "") !== "").length,
    [qs, answers]
  );

  // Reset nav state when questions change
  useEffect(() => {
    setCurrentIdx(0);
    setVisited(new Set([0]));
  }, [totalQ]);

  // Init timer when paper/assignment available
  useEffect(() => {
    if (!paper) return;
    const dur = guessDurationSec(paper, assignment);
    setSecondsLeft(dur);
  }, [paper, assignment]);

  // Countdown effect
  useEffect(() => {
    if (secondsLeft == null) return;
    clearInterval(tickRef.current);
    tickRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(tickRef.current);
          flushAutosaveSync(); // best-effort flush before auto-submit
          submitAttempt(true); // auto-submit on timeout
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(tickRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  // Flush pending on tab close/refresh
  useEffect(() => {
    const onBeforeUnload = () => { flushAutosaveSync(); };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptId]);

  // If attempt becomes ready and there were pending edits, push them once
  useEffect(() => {
    if (attemptReady && Object.keys(pendingRef.current || {}).length) {
      // small delay to avoid racing with state set
      setTimeout(() => flushAutosave(), 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptReady]);

  // ---------- Save helpers (with route fallbacks + retry on 404) ----------
  async function trySaveOnServer({ answersPayload, merge }) {
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({ answers: answersPayload, merge });

    // Ordered fallbacks:
    const attempts = [
      { url: `${API}/attempts/${attemptId}/save`, method: "POST", body }, // preferred
    ];

    for (const a of attempts) {
      try {
        const res = await fetch(a.url, { method: a.method, headers, body: a.body });
        if (res.ok) return res;
        if (res.status === 404 || res.status === 405) continue;
      } catch {
        // try next
      }
    }
    return null;
  }

  // ---------- Autosave (debounced) ----------
  const queueAutosave = (deltaObj) => {
    Object.assign(pendingRef.current, deltaObj);
    if (debRef.current) clearTimeout(debRef.current);
    debRef.current = setTimeout(flushAutosave, AUTOSAVE_DEBOUNCE_MS);
  };

  const flushAutosave = async () => {
    if (!attemptReady || !attemptId || autosaveDisabled) return;
    const delta = pendingRef.current;
    if (!delta || !Object.keys(delta).length || inflightRef.current) return;

    inflightRef.current = true;
    setAutoSaving(true);
    try {
      // First attempt
      let res = await trySaveOnServer({ answersPayload: delta, merge: true });

      // If no route or 404-like failure, re-ensure a fresh attempt and retry once.
      if (!res) {
        const testId = queryTestId || extractTestIdFromAssignment(assignment) || null;
        const newId = await ensureAttempt(testId);
        if (newId) {
          res = await trySaveOnServer({ answersPayload: delta, merge: true });
        }
      }

      if (!res) {
        // No route matched — disable autosave to keep UI responsive.
        setAutosaveDisabled(true);
        // keep pending so user can click Save
        return;
      }

      setAutoSavedAt(new Date());
      pendingRef.current = {};
    } catch (e) {
      console.error("autosave error", e);
      // leave pending; user can hit Save manually
    } finally {
      setAutoSaving(false);
      inflightRef.current = false;
    }
  };

  const flushAutosaveSync = () => {
    try {
      if (!attemptReady || !attemptId) return;
      const delta = pendingRef.current;
      if (!delta || !Object.keys(delta).length) return;
      const blob = new Blob([JSON.stringify({ answers: delta, merge: true })], {
        type: "application/json",
      });
      navigator.sendBeacon?.(`${API}/attempts/${attemptId}/save`, blob);
      pendingRef.current = {};
    } catch {}
  };

  const timeAgo = (d) => {
    if (!d) return "";
    const secs = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
    if (secs < 5) return "just now";
    if (secs < 60) return `${secs}s ago`;
    return `${Math.floor(secs / 60)}m ago`;
  };

  // ---------- Actions ----------
  const updateAnswer = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
    // Queue autosave only when attempt is actually ready
    if (attemptReady && !autosaveDisabled) queueAutosave({ [qid]: value });
  };

  const saveProgress = async () => {
    if (!attemptReady || !attemptId) return alert("Attempt not initialized yet. Try again in a moment.");
    try {
      setSaving(true);
      const full = { ...answers, ...pendingRef.current };
      pendingRef.current = {};
      let res = await trySaveOnServer({ answersPayload: full, merge: false });
      if (!res) {
        const testId = queryTestId || extractTestIdFromAssignment(assignment) || null;
        const newId = await ensureAttempt(testId);
        if (newId) res = await trySaveOnServer({ answersPayload: full, merge: false });
      }
      if (!res) throw new Error("No save route available (404/405).");
      setAutoSavedAt(new Date());
    } catch (e) {
      console.error(e);
      alert("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const submitAttempt = async (auto = false) => {
    if (!attemptReady || !attemptId) return alert("Attempt not initialized yet. Try again in a moment.");
    if (!auto) {
      const ok = window.confirm(
        "Submit your answers? You won't be able to edit after submission."
      );
      if (!ok) return;
    }

    // persist any pending changes first
    await flushAutosave();

    try {
      setSubmitting(true);
      const res = await fetch(`${API}/attempts/${attemptId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      if (res.ok) {
        const j = await res.json();
        if (j?.score != null && j?.total != null) {
          setResult({ score: j.score, total: j.total, details: j.details || [] });
        } else {
          setResult(scoreLocally(paper, answers));
        }
        if (!auto) alert("Submitted! 🎉");
      } else {
        setResult(scoreLocally(paper, answers));
        if (!auto) alert("Server error during submit — showing local score.");
      }
    } catch (e) {
      console.error(e);
      setResult(scoreLocally(paper, answers));
      if (!auto) alert("Network error during submit — showing local score.");
    } finally {
      setSubmitting(false);
    }
  };

  const goTo = (i) => {
    setCurrentIdx(i);
    setVisited((prev) => new Set(prev).add(i));
  };
  const next = () => goTo(Math.min(currentIdx + 1, totalQ - 1));
  const prev = () => goTo(Math.max(currentIdx - 1, 0));

  const statusFor = (i) => {
    const qid = qs[i]?._id || qs[i]?.id || String(i);
    if (i === currentIdx) return "current";
    if ((answers[qid] ?? "") !== "") return "answered";
    if (visited.has(i)) return "seen";
    return "not-visited";
  };

  const fmtTime = (s) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    return `${m} mins : ${ss} secs`;
  };

  // ---------- UI ----------
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container fluid className="py-3 test-player">
      {/* Sticky header */}
      <div className="tp-sticky pt-2 pb-2" style={{ borderBottom: "1px solid #eef1f5" }}>
        <Row className="align-items-center g-2">
          <Col md="auto">
            <h4 className="mb-0">{paper?.title || "Test"}</h4>
            {paper?.subjects?.length ? (
              <small className="text-muted d-block">
                Subjects: {paper.subjects.join(", ")}
              </small>
            ) : null}
          </Col>
          <Col className="d-none d-md-block" />
          <Col md="auto" className="text-md-end">
            <div className="d-flex align-items-center gap-2">
              {attemptId && (
                <Badge bg="secondary">Attempt: {String(attemptId).slice(0, 6)}…</Badge>
              )}
              <Badge bg="light" text="dark">
                {answeredCount}/{qs.length} answered
              </Badge>
              {secondsLeft != null && (
                <Badge bg="danger" className="ms-1">
                  Time left: {fmtTime(secondsLeft)}
                </Badge>
              )}
              <small className="text-muted">
                {!attemptReady
                  ? "Preparing…"
                  : autosaveDisabled
                  ? "Autosave off"
                  : autoSaving
                  ? "Saving…"
                  : autoSavedAt
                  ? `Saved ${timeAgo(autoSavedAt)}`
                  : ""}
              </small>
              <Button
                variant="outline-secondary"
                onClick={saveProgress}
                disabled={!attemptReady || !attemptId || saving}
              >
                {saving ? "Saving…" : "Save"}
              </Button>
              <Button
                variant="success"
                onClick={() => submitAttempt(false)}
                disabled={!attemptReady || !attemptId || submitting}
              >
                {submitting ? "Submitting…" : "Submit"}
              </Button>
            </div>
          </Col>
        </Row>

        <ProgressBar
          className="mt-2"
          now={qs.length ? (answeredCount / qs.length) * 100 : 0}
          style={{ height: 6 }}
        />
      </div>

      {errorMsg && <Alert variant="warning" className="mt-3">{errorMsg}</Alert>}
      {result && (
        <Alert variant="success" className="mt-3">
          <strong>Score:</strong> {result.score} / {result.total}
        </Alert>
      )}

      <Row className="mt-3 with-left-rail">
        {/* LEFT: Single question view */}
        <Col lg={9} className="questions-col">
          {!q ? (
            <Card body className="border">
              <div className="text-muted">No questions in this paper.</div>
            </Card>
          ) : (
            <Card
              className="mb-3 shadow-sm question-card"
              ref={(el) => {
                const qid = q._id || q.id || String(currentIdx);
                questionRefs.current[qid] = { el };
              }}
            >
              <Card.Body className="p-3 p-md-4">
                {/* Question number + text */}
                {(() => {
                  const { isHtml, html, text } = getQuestionText(q);
                  return (
                    <div className="question-header">
                      <div className="qno">Q{currentIdx + 1}.</div>
                      {isHtml ? (
                        <div
                          className="question-title"
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{ __html: html }}
                        />
                      ) : (
                        <div className="question-title">{text}</div>
                      )}
                      {(q.marks || q.points) && (
                        <Badge bg="light" text="dark" className="ms-2">
                          {q.marks || q.points} mark(s)
                        </Badge>
                      )}
                      {result?.details && (() => {
                        const feedback = result.details.find(
                          (d) =>
                            String(d.qid) ===
                            String(q._id || q.id || String(currentIdx))
                        );
                        return feedback ? (
                          <Badge
                            bg={feedback.correct ? "success" : "danger"}
                            className="ms-2"
                          >
                            {feedback.correct ? "Correct" : "Incorrect"}
                          </Badge>
                        ) : null;
                      })()}
                    </div>
                  );
                })()}

                {/* Answer input */}
                {(() => {
                  const qType = (q.type || "mcq").toLowerCase();
                  const qid = q._id || q.id || String(currentIdx);
                  const options = Array.isArray(q.options) ? q.options : [];
                  const value = answers[qid] ?? "";

                  if (qType === "mcq") {
                    return (
                      <div className="d-grid">
                        {options.map((opt, i) => {
                          const optKey = String(opt?._id || opt?.id || opt?.key || i);
                          const optText =
                            (typeof opt === "object"
                              ? opt.text || opt.label || opt.value
                              : String(opt)) ?? String(i);
                          const letter = i < 26 ? String.fromCharCode(65 + i) : String(i + 1);
                          const selected = String(value) === optKey;

                          return (
                            <div
                              className={`option-row ${selected ? "is-selected" : ""}`}
                              key={`${qid}-${optKey}`}
                            >
                              <Form.Check
                                type="radio"
                                id={`q-${qid}-${optKey}`}
                                name={`q-${qid}`}
                                checked={selected}
                                onChange={() => updateAnswer(qid, optKey)}
                                label={
                                  <span className="option-label">
                                    <span className="opt-letter">{letter})</span>
                                    <span className="opt-text">{optText}</span>
                                  </span>
                                }
                              />
                            </div>
                          );
                        })}
                      </div>
                    );
                  }

                  if (qType === "short" || qType === "text") {
                    return (
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Type your answer…"
                        value={value}
                        onChange={(e) => updateAnswer(qid, e.target.value)}
                      />
                    );
                  }

                  return (
                    <Form.Control
                      type="text"
                      placeholder="Your answer"
                      value={value}
                      onChange={(e) => updateAnswer(qid, e.target.value)}
                    />
                  );
                })()}
              </Card.Body>

              <Card.Footer className="d-flex justify-content-between">
                <Button variant="outline-secondary" onClick={prev} disabled={currentIdx === 0}>
                  ← Prev
                </Button>
                <Button
                  variant="primary"
                  onClick={next}
                  disabled={currentIdx === totalQ - 1}
                >
                  Next →
                </Button>
              </Card.Footer>
            </Card>
          )}

          <div className="d-flex justify-content-between my-4">
            <Link className="btn btn-outline-secondary" to="/bootstrapreact/medixo/my-assignments">
              Back
            </Link>
            <div className="d-flex gap-2">
              <Button variant="outline-secondary" onClick={saveProgress} disabled={!attemptReady || !attemptId || saving}>
                {saving ? "Saving…" : "Save"}
              </Button>
              <Button variant="success" onClick={() => submitAttempt(false)} disabled={!attemptReady || !attemptId || submitting}>
                {submitting ? "Submitting…" : "Submit"}
              </Button>
            </div>
          </div>
        </Col>

        {/* RIGHT: Palette */}
        <Col lg={3} className="mb-4">
          <Card className="shadow-sm sticky-card">
            <Card.Header>
              <strong>Question Palette</strong>
            </Card.Header>
            <Card.Body>
              <div className="palette mb-2">
                {qs.map((_, i) => (
                  <button
                    key={`pal-${i}`}
                    type="button"
                    className={`qbtn ${statusFor(i)}`}
                    onClick={() => goTo(i)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <div className="legend small">
                <span className="leg answered">Answered</span>
                <span className="leg current">Current</span>
                <span className="leg seen">Seen</span>
                <span className="leg not-visited">Not visited</span>
              </div>
            </Card.Body>
          </Card>

          <div className="text-end mt-3">
            <Button size="sm" variant="outline-secondary" onClick={() => setDebugOpen((s) => !s)}>
              {debugOpen ? "Hide Debug" : "Show Debug"}
            </Button>
          </div>

          {debugOpen && (
            <Card className="mt-2">
              <Card.Body style={{ maxHeight: 220, overflow: "auto", background: "#fafafa" }}>
                <pre style={{ fontSize: 12, marginBottom: 8 }}>
Assignment: {JSON.stringify(assignment, null, 2)}
                </pre>
                <pre style={{ fontSize: 12 }}>
Paper: {JSON.stringify(paper, null, 2)}
                </pre>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}
