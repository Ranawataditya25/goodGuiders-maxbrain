// src/pages/TestPlayer.jsx
import { useEffect, useMemo, useRef, useState } from "react";
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
  Table,
} from "react-bootstrap";
import {
  useParams,
  useSearchParams,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "../styles/TestPlayer.css";

const API = import.meta.env?.VITE_API_URL || "http://localhost:5000/api";

/** Detect runtime base path (when served under a subfolder) */
const detectRuntimeBase = () => {
  const path = window.location.pathname || "/";
  const markers = [
    "/test-player",
    "/test-result",
    "/my-assignments",
    "/assign-test",
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
  const envBase = import.meta?.env?.BASE_URL || "/";
  const runtime = detectRuntimeBase();
  let base = envBase && envBase !== "/" ? envBase : runtime;
  base = (base || "").replace(/\/+$/, "");
  const normPath = String(p || "/").replace(/^\/+/, "");
  return `${base}/${normPath}`;
};

/* ============================================================
   SOFT PROCTORING
   - Detects tab/app switch & fullscreen exits
   - Single-violation gate (no double counting)
   - Optional context/clipboard blocking
   ============================================================ */
const PROCTOR = {
  enabled: true,
  requireFullscreen: true,  // force fullscreen during exam
  maxViolations: 3,         // auto-submit at this count
  blockContextMenu: true,
  blockClipboard: true,
};

const LS_KEY = "assignProgressByAssignment";
const readProgressMap = () => {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || {};
  } catch {
    return {};
  }
};
const writeProgress = (assignmentId, patch) => {
  try {
    const all = readProgressMap();
    const prev = all[assignmentId] || {};
    all[assignmentId] = { ...prev, ...patch, updatedAt: new Date().toISOString() };
    localStorage.setItem(LS_KEY, JSON.stringify(all));
  } catch {}
};

const AUTOSAVE_DEBOUNCE_MS = 400;

export default function TestPlayer() {
  const { assignmentId } = useParams();
  const [search] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const queryTestId = search.get("testId") || null;
  const queryAttemptId = search.get("attemptId") || null;

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  const [assignment, setAssignment] = useState(null);
  const [paper, setPaper] = useState(null);
  const [attemptId, setAttemptId] = useState(queryAttemptId);
  const [attemptMeta, setAttemptMeta] = useState(null);
  const [attemptReady, setAttemptReady] = useState(false);

  const [answers, setAnswers] = useState({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visited, setVisited] = useState(new Set([0]));

  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /** ---- TIMER ---- */
  const [secondsLeft, setSecondsLeft] = useState(undefined); // undefined while computing; null => no limit
  const totalSecondsRef = useRef(null);
  const tickRef = useRef(null);

  /** ---- AUTOSAVE ---- */
  const [autoSaving, setAutoSaving] = useState(false);
  const [autoSavedAt, setAutoSavedAt] = useState(null);
  const [autosaveDisabled, setAutosaveDisabled] = useState(false);
  const pendingRef = useRef({});
  const debRef = useRef(null);
  const inflightRef = useRef(false);

  /** ---- SOFT PROCTORING ---- */
  const [violations, setViolations] = useState(0);
  const [fsReady, setFsReady] = useState(!PROCTOR.requireFullscreen);

  // Gate to avoid double counting (blur + visibilitychange + fschange)
  const engagedRef = useRef(true);           // true when we're "armed" to count a violation
  const lastViolationRef = useRef(0);        // for short cooldown
  const VIOLATION_COOLDOWN_MS = 1500;

  const getId = (x) => x?._id || x?.id || null;

  /** Normalize paper shape */
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
            typeof s === "string" ? s : s?.name || s?.label || s?.title || ""
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

  /** -------------- API -------------- */
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
    r = await fetch(`${API}/assignments/${assignmentId}/paper`);
    if (r.ok) return normalizePaper(await tryJson(r));
    throw new Error(`Could not fetch paper for testId=${tid}`);
  };

  const fetchAttempt = async (id) => {
    const r = await fetch(`${API}/attempts/${id}`);
    if (!r.ok) return null;
    const j = await tryJson(r);
    const a = j?.data || j?.attempt || j;
    return a;
  };

  const stripAttemptIdFromUrl = () => {
    const params = new URLSearchParams(location.search);
    if (params.has("attemptId")) {
      params.delete("attemptId");
      navigate(
        { pathname: location.pathname, search: params.toString() },
        { replace: true }
      );
    }
  };

  /** -------------- TIME LIMIT PICKER -------------- */
  const num = (v) => {
    if (v == null) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };
  const hhmmToMinutes = (str) => {
    if (typeof str !== "string") return null;
    const m = str.match(/^(\d{1,2}):(\d{1,2})$/);
    if (!m) return null;
    const h = Number(m[1]),
      min = Number(m[2]);
    if (!Number.isFinite(h) || !Number.isFinite(min)) return null;
    return h * 60 + min;
  };

  /** Try many common keys (assignment wins over test). Return minutes or null. */
  const pickLimitMinutes = (a, p) => {
    const candidates = [
      a?.durationMinutes,
      a?.durationMin,
      a?.timeLimitMin,
      a?.timeLimitMinutes,
      a?.limitMinutes,
      a?.timerMinutes,
      a?.settings?.durationMinutes,
      a?.settings?.durationMin,
      a?.settings?.timeLimitMin,
      p?.durationMinutes,
      p?.durationMin,
      p?.timeLimitMin,
      p?.timeLimitMinutes,
      p?.limitMinutes,
      p?.timerMinutes,
    ];

    for (const v of candidates) {
      const direct = num(v);
      if (direct && direct > 0) return Math.round(direct);
      const hhmm = hhmmToMinutes(v);
      if (hhmm && hhmm > 0) return hhmm;
    }
    return null; // "no limit"
  };

  /** Apply timer using limit (minutes) + attempt.startedAt -> remaining seconds */
  const applyTimer = (limitMinutes, startedAtISO) => {
    if (!limitMinutes || limitMinutes <= 0) {
      totalSecondsRef.current = null;
      setSecondsLeft(null); // no limit
      return;
    }
    const totalSec = limitMinutes * 60;
    totalSecondsRef.current = totalSec;

    const startedMs = startedAtISO ? new Date(startedAtISO).getTime() : Date.now();
    const elapsed = Math.max(0, Math.floor((Date.now() - startedMs) / 1000));
    const remaining = Math.max(0, totalSec - elapsed);
    setSecondsLeft(remaining);
  };

  /** -------------- Attempt bootstrapping -------------- */
  const ensureAttempt = async (tid) => {
    try {
      setAttemptReady(false);
      let id = attemptId || queryAttemptId || null;

      // Reuse if exists
      if (id) {
        const a = await fetchAttempt(id);
        if (a) {
          setAttemptId(String(a._id));
          setAttemptMeta(a);
          if (a.answers && typeof a.answers === "object") setAnswers(a.answers);
          setAttemptReady(true);
          writeProgress(assignmentId, {
            status: "in_progress",
            attemptId: String(a._id),
            testId: tid,
          });
          return String(a._id);
        }
        id = null;
        setAttemptId(null);
        stripAttemptIdFromUrl();
      }

      // Start a new attempt
      const s = await fetch(`${API}/assignments/${assignmentId}/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testId: tid }),
      });
      if (s.ok) {
        const j = await s.json();
        const newId = j?.attemptId || j?.data?._id || null;

        const a = newId ? await fetchAttempt(newId) : null; // fetch to get startedAt
        if (a) {
          setAttemptId(String(a._id));
          setAttemptMeta(a);
          if (a.answers && typeof a.answers === "object") setAnswers(a.answers);
          setAttemptReady(true);
          stripAttemptIdFromUrl();
          writeProgress(assignmentId, {
            status: "in_progress",
            attemptId: String(a._id),
            testId: tid,
          });
          return String(a._id);
        }
      }

      setAttemptReady(false);
      return null;
    } catch {
      setAttemptReady(false);
      return null;
    }
  };

  /** -------------- Load assignment & paper (temp timer) -------------- */
  useEffect(() => {
    (async () => {
      setLoading(true);
      setErrorMsg("");
      setPreviewMode(false);
      try {
        const a = await fetchAssignment(assignmentId);
        setAssignment(a);

        let effectiveTestId = queryTestId || extractTestIdFromAssignment(a) || null;

        if (!effectiveTestId && Array.isArray(a?.questions) && a.questions.length) {
          const p = normalizePaper({
            data: { title: a.title || "Test", questions: a.questions },
          });
          setPaper(p);
          await ensureAttempt(null);
          applyTimer(pickLimitMinutes(a, p), undefined); // will be corrected once attemptMeta arrives
          setLoading(false);
          return;
        }

        if (!effectiveTestId)
          throw new Error("No test id available for this assignment.");

        const p = await fetchPaperByTestId(effectiveTestId);
        setPaper(p);
        await ensureAttempt(effectiveTestId);

        const limitMin = pickLimitMinutes(a, p);
        applyTimer(limitMin, undefined); // temporary
      } catch (e) {
        setErrorMsg(e?.message || "Could not load this test.");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignmentId, queryTestId]);

  /** ✅ Re-apply timer when startedAt (or assignment/paper) is known */
  useEffect(() => {
    if (assignment && paper && attemptMeta) {
      const limitMin = pickLimitMinutes(assignment, paper);
      applyTimer(limitMin, attemptMeta.startedAt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptMeta, assignment, paper]);

  /** ---------- Soft proctoring listeners (de-duped) ---------- */
  const inFullscreen = () => !!document.fullscreenElement;
  const enterFullscreen = async () => {
    try { await document.documentElement.requestFullscreen?.(); } catch {}
  };

  const recordViolationOnce = (reason) => {
    const now = Date.now();

    // ignore if already "disengaged" (we'll re-arm on focus/visible/fullscreen)
    if (!engagedRef.current) return;

    // short cooldown to avoid quick double-triggers
    if (now - lastViolationRef.current < VIOLATION_COOLDOWN_MS) return;

    engagedRef.current = false;           // disarm until user returns focus
    lastViolationRef.current = now;

    setViolations((prev) => {
      const next = prev + 1;
      console.warn("[Proctoring] violation:", reason, "count:", next);
      if (next >= PROCTOR.maxViolations) {
        alert("Exam is being auto-submitted due to repeated focus changes.");
        submitAttempt(true);
      } else {
        alert(`Please stay on this page while taking the exam. (${next}/${PROCTOR.maxViolations})`);
      }
      return next;
    });
  };

  useEffect(() => {
    if (!PROCTOR.enabled) return;

    const onVis = () => {
      if (document.hidden) {
        recordViolationOnce("visibilitychange: hidden");
      } else {
        // user came back to the tab — re-arm
        engagedRef.current = true;
        if (!PROCTOR.requireFullscreen || inFullscreen()) setFsReady(true);
      }
    };

    const onBlur = () => {
      // If tab actually got hidden, visibilitychange will handle it.
      // Count blur only when tab is still visible (e.g., alt-tabbing)
      if (!document.hidden) recordViolationOnce("window blur");
    };

    const onFocus = () => {
      engagedRef.current = true; // re-arm on focus
      if (!PROCTOR.requireFullscreen || inFullscreen()) setFsReady(true);
    };

    const onFsChange = () => {
      if (PROCTOR.requireFullscreen && !inFullscreen()) {
        recordViolationOnce("exited fullscreen");
        setFsReady(false);
      } else {
        engagedRef.current = true; // re-arm when entering fullscreen
        setFsReady(true);
      }
    };

    const onContextMenu = (e) => {
      if (PROCTOR.blockContextMenu) e.preventDefault();
    };
    const onCopy = (e) => {
      if (PROCTOR.blockClipboard) e.preventDefault();
    };
    const onCut = (e) => {
      if (PROCTOR.blockClipboard) e.preventDefault();
    };
    const onPaste = (e) => {
      if (PROCTOR.blockClipboard) e.preventDefault();
    };

    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("copy", onCopy);
    document.addEventListener("cut", onCut);
    document.addEventListener("paste", onPaste);

    // If fullscreen required, try to enter once attempt is ready
    if (PROCTOR.requireFullscreen && attemptReady && !inFullscreen()) {
      enterFullscreen().finally(() => setFsReady(inFullscreen()));
    } else {
      setFsReady(true);
    }

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("cut", onCut);
      document.removeEventListener("paste", onPaste);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptReady]);

  /** -------- derived data & UI helpers -------- */
  const qs = useMemo(() => paper?.questions || [], [paper]);
  const totalQ = qs.length;
  const q = totalQ ? qs[currentIdx] : null;

  const answeredCount = useMemo(
    () =>
      qs.filter(
        (qq, i) => (answers[qq?._id || qq?.id || String(i)] ?? "") !== ""
      ).length,
    [qs, answers]
  );

  useEffect(() => {
    setCurrentIdx(0);
    setVisited(new Set([0]));
  }, [totalQ]);

  /** countdown tick (only if secondsLeft is a number) */
  useEffect(() => {
    if (typeof secondsLeft !== "number") return;
    clearInterval(tickRef.current);
    tickRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (typeof s !== "number") return s;
        if (s <= 1) {
          clearInterval(tickRef.current);
          flushAutosaveSync();
          submitAttempt(true); // auto-submit on timer end
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(tickRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  /** autosave plumbing */
  useEffect(() => {
    const onBeforeUnload = () => {
      flushAutosaveSync();
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptId]);

  useEffect(() => {
    if (attemptReady && Object.keys(pendingRef.current || {}).length)
      setTimeout(() => flushAutosave(), 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptReady]);

  async function trySaveOnServer({ answersPayload, merge }) {
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({ answers: answersPayload, merge });
    try {
      const res = await fetch(`${API}/attempts/${attemptId}/save`, {
        method: "POST",
        headers,
        body,
      });
      if (res.ok) return res;
    } catch {}
    return null;
  }

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
      let res = await trySaveOnServer({ answersPayload: delta, merge: true });
      if (!res) {
        const testId = queryTestId || extractTestIdFromAssignment(assignment) || null;
        const newId = await ensureAttempt(testId);
        if (newId) res = await trySaveOnServer({ answersPayload: delta, merge: true });
      }
      if (!res) {
        setAutosaveDisabled(true);
        return;
      }
      setAutoSavedAt(new Date());
      pendingRef.current = {};
      writeProgress(assignmentId, {
        status: "in_progress",
        attemptId,
        testId: queryTestId || extractTestIdFromAssignment(assignment) || null,
      });
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

  const fmtTime = (s) => {
    if (s == null) return "—";
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    return `${m}:${ss}`;
  };
  const timeAgo = (d) => {
    if (!d) return "";
    const secs = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
    if (secs < 5) return "just now";
    if (secs < 60) return `${secs}s ago`;
    return `${Math.floor(secs / 60)}m ago`;
  };

  const updateAnswer = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
    if (attemptReady && !autosaveDisabled) queueAutosave({ [qid]: value });
  };

  const saveProgress = async () => {
    if (!attemptReady || !attemptId) return alert("Attempt not initialized yet.");
    try {
      setSaving(true);
      const full = { ...answers, ...pendingRef.current };
      pendingRef.current = {};
      let res = await fetch(`${API}/attempts/${attemptId}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: full, merge: false }),
      });
      if (!res.ok) throw new Error();
      setAutoSavedAt(new Date());
      writeProgress(assignmentId, {
        status: "in_progress",
        attemptId,
        testId: queryTestId || extractTestIdFromAssignment(assignment) || null,
      });
      alert("Saved!");
    } catch {
      alert("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const redirectToResults = () => {
    writeProgress(assignmentId, {
      status: "completed",
      attemptId,
      testId: queryTestId || extractTestIdFromAssignment(assignment) || null,
    });
    window.location.replace(withBase(`/test-result/${attemptId}`));
  };

  const submitAttempt = async (auto = false) => {
    if (!attemptReady || !attemptId) return alert("Attempt not initialized yet.");
    if (!auto) {
      const ok = window.confirm(
        "Submit your answers? You won't be able to edit after submission."
      );
      if (!ok) return;
    }
    await flushAutosave();
    try {
      setSubmitting(true);
      await fetch(`${API}/attempts/${attemptId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
    } catch {
      // ignore; result page will reflect final state
    } finally {
      setSubmitting(false);
      redirectToResults();
    }
  };

  const goTo = (i) => {
    setCurrentIdx(i);
    setVisited((prev) => new Set(prev).add(i));
    setPreviewMode(false);
  };
  const next = () => goTo(Math.min(currentIdx + 1, totalQ - 1));
  const prev = () => goTo(Math.max(currentIdx - 1, 0));

  const statusFor = (i) => {
    const qid = qs[i]?._id || qs[i]?.id || String(i);
    if (i === currentIdx && !previewMode) return "current";
    if ((answers[qid] ?? "") !== "") return "answered";
    if (visited.has(i)) return "seen";
    return "not-visited";
  };

  const getOptionText = (opt, i) =>
    opt == null
      ? `Option ${i + 1}`
      : typeof opt === "object"
      ? opt.text || opt.label || opt.value || `Option ${i + 1}`
      : String(opt);

  const getQuestionText = (q) => {
    if (!q) return { isHtml: false, text: "" };
    const htmlCandidate =
      q.html || q.richText || q.contentHtml || q.questionHtml || q.stemHtml;
    if (typeof htmlCandidate === "string" && htmlCandidate.trim())
      return { isHtml: true, html: htmlCandidate };
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
    const pick = candidates.find(
      (x) => typeof x === "string" && x.trim() !== ""
    );
    return { isHtml: false, text: pick || "Untitled question" };
  };

  const qsArr = qs || [];
  const totalSecs = totalSecondsRef.current;
  const pctLeft =
    typeof secondsLeft === "number" && totalSecs
      ? Math.max(0, Math.min(100, (secondsLeft / totalSecs) * 100))
      : 0;

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container fluid className="py-3 test-player">
      <div className="tp-sticky pt-2 pb-2" style={{ borderBottom: "1px solid #eef1f5" }}>
        <Row className="align-items-center g-2">
          <Col md="auto">
            <h4 className="mb-0">{paper?.title || "Test"}</h4>
            {paper?.subjects?.length ? (
              <small className="text-muted d-block">
                Subjects: {paper.subjects.join(", ")}
              </small>
            ) : null}
            {previewMode && (
              <Badge bg="warning" className="ms-0 mt-1">
                Preview Mode
              </Badge>
            )}
          </Col>
          <Col className="d-none d-md-block" />
          <Col md="auto" className="text-md-end">
            <div className="d-flex align-items-center gap-2">
              {attemptId && (
                <Badge bg="secondary">Attempt: {String(attemptId).slice(0, 6)}…</Badge>
              )}
              <Badge bg="light" text="dark">
                {answeredCount}/{qsArr.length} answered
              </Badge>

              {/* TIMER BADGE */}
              <Badge
                bg={
                  typeof secondsLeft === "number" && secondsLeft <= 60
                    ? "danger"
                    : "primary"
                }
                className="ms-1"
              >
                ⏱ {secondsLeft == null ? "No limit" : fmtTime(secondsLeft)}
              </Badge>

              {/* violations counter */}
              {PROCTOR.enabled && (
                <Badge bg="dark" className="ms-1" title="Focus/Fullscreen violations">
                  ⚠ {violations}
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

              {!previewMode ? (
                <>
                  <Button
                    variant="outline-secondary"
                    onClick={saveProgress}
                    disabled={!attemptReady || !attemptId || saving}
                  >
                    {saving ? "Saving…" : "Save"}
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => setPreviewMode(true)}
                    disabled={!attemptReady || !attemptId}
                  >
                    Preview & Submit
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline-secondary"
                    onClick={() => setPreviewMode(false)}
                  >
                    Back to Questions
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => submitAttempt(false)}
                    disabled={!attemptReady || !attemptId || submitting}
                  >
                    {submitting ? "Submitting…" : "Submit Paper"}
                  </Button>
                </>
              )}
            </div>
          </Col>
        </Row>
        {typeof secondsLeft === "number" && totalSecs ? (
          <ProgressBar className="mt-2" now={pctLeft} style={{ height: 6 }} />
        ) : (
          <div className="mt-2" />
        )}
      </div>

      {errorMsg && (
        <Alert variant="warning" className="mt-3">
          {errorMsg}
        </Alert>
      )}

      {/* Fullscreen requirement gate (optional) */}
      {PROCTOR.enabled && PROCTOR.requireFullscreen && !fsReady && (
        <Card className="mb-3 shadow-sm">
          <Card.Body className="d-flex align-items-center justify-content-between">
            <div>
              <strong>Fullscreen required</strong>
              <div className="text-muted small">
                Please stay in fullscreen for the duration of the test. Leaving fullscreen will be recorded.
              </div>
            </div>
            <Button onClick={async () => { await document.documentElement.requestFullscreen?.(); }}>
              Enter Fullscreen
            </Button>
          </Card.Body>
        </Card>
      )}

      <Row className="mt-3 with-left-rail">
        <Col lg={9} className="questions-col">
          {!previewMode ? (
            !q ? (
              <Card body className="border">
                <div className="text-muted">No questions in this paper.</div>
              </Card>
            ) : (
              <Card className="mb-3 shadow-sm question-card">
                <Card.Body className="p-3 p-md-4">
                  {(() => {
                    const { isHtml, html, text } = getQuestionText(q);
                    return (
                      <div className="question-header">
                        <div className="qno">Q{currentIdx + 1}.</div>
                        {isHtml ? (
                          <div
                            className="question-title"
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
                      </div>
                    );
                  })()}

                  {(() => {
                    const qType = (q.type || "mcq").toLowerCase();
                    const qid = q._id || q.id || String(currentIdx);
                    const options = Array.isArray(q.options) ? q.options : [];
                    const value = answers[qid] ?? "";

                    if (qType === "mcq") {
                      return (
                        <div className="d-grid">
                          {options.map((opt, i) => {
                            const optKey = String(
                              opt?._id || opt?.id || opt?.key || i
                            );
                            const optText = getOptionText(opt, i);
                            const letter =
                              i < 26 ? String.fromCharCode(65 + i) : String(i + 1);
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
                  {currentIdx === totalQ - 1 ? (
                    <Button variant="success" onClick={() => setPreviewMode(true)}>
                      Preview →
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={next}
                      disabled={currentIdx === totalQ - 1}
                    >
                      Next →
                    </Button>
                  )}
                </Card.Footer>
              </Card>
            )
          ) : (
            <Card className="mb-3 shadow-sm">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Preview Answers</strong>
                  <div className="text-muted small">
                    Review your answers. Click <em>Edit</em> if needed, then press <strong>Submit Paper</strong>.
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <Button variant="outline-secondary" onClick={() => setPreviewMode(false)}>
                    Back to Questions
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => submitAttempt(false)}
                    disabled={!attemptReady || !attemptId || submitting}
                  >
                    {submitting ? "Submitting…" : "Submit Paper"}
                  </Button>
                </div>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table hover className="mb-0 align-middle">
                    <thead>
                      <tr>
                        <th style={{ width: 70 }}>#</th>
                        <th>Question</th>
                        <th style={{ width: "40%" }}>Your Answer</th>
                        <th style={{ width: 100 }} />
                      </tr>
                    </thead>
                    <tbody>
                      {qsArr.map((qq, i) => {
                        const qid = qq._id || qq.id || String(i);
                        const val = answers[qid];
                        const { isHtml, html, text } = getQuestionText(qq);
                        const options = Array.isArray(qq.options) ? qq.options : [];
                        const mi = options.findIndex(
                          (opt, k) => String(opt?._id || opt?.id || k) === String(val)
                        );
                        const disp =
                          val == null || val === "" ? (
                            <span className="badge bg-light text-dark">Unanswered</span>
                          ) : mi >= 0 ? (
                            `${String.fromCharCode(65 + mi)}) ${getOptionText(options[mi], mi)}`
                          ) : (
                            `Selected: ${val}`
                          );
                        return (
                          <tr key={`prev-${qid}`}>
                            <td><Badge bg="secondary">{i + 1}</Badge></td>
                            <td>
                              {isHtml ? (
                                <div className="small text-wrap" dangerouslySetInnerHTML={{ __html: html }} />
                              ) : (
                                <div className="small text-wrap">{text}</div>
                              )}
                            </td>
                            <td>{disp}</td>
                            <td className="text-end">
                              <Button size="sm" variant="outline-primary" onClick={() => goTo(i)}>
                                Edit
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <div className="text-muted small">
                  Answered: <strong>{answeredCount}/{qsArr.length}</strong>
                </div>
                <div className="d-flex gap-2">
                  <Button variant="outline-secondary" onClick={() => setPreviewMode(false)}>
                    Back to Questions
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => submitAttempt(false)}
                    disabled={!attemptReady || !attemptId || submitting}
                  >
                    {submitting ? "Submitting…" : "Submit Paper"}
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          )}

          {!previewMode && (
            <div className="d-flex justify-content-between my-4">
              <Link className="btn btn-outline-secondary" to={withBase("/my-assignments")}>
                Back
              </Link>
              <div className="d-flex gap-2">
                <Button
                  variant="outline-secondary"
                  onClick={saveProgress}
                  disabled={!attemptReady || !attemptId || saving}
                >
                  {saving ? "Saving…" : "Save"}
                </Button>
                <Button
                  variant="success"
                  onClick={() => setPreviewMode(true)}
                  disabled={!attemptReady || !attemptId}
                >
                  Preview & Submit
                </Button>
              </div>
            </div>
          )}
        </Col>

        {/* Right rail: Timer + palette */}
        <Col lg={3} className="mb-4">
          <Card className="shadow-sm sticky-card mb-3">
            <Card.Header><strong>Time Left</strong></Card.Header>
            <Card.Body>
              <div className={`display-6 fw-bold ${typeof secondsLeft === "number" && secondsLeft <= 60 ? "text-danger" : ""}`}>
                {secondsLeft == null ? "No limit" : fmtTime(secondsLeft)}
              </div>
              {typeof secondsLeft === "number" && totalSecs ? (
                <div className="mt-2">
                  <ProgressBar now={pctLeft} style={{ height: 10 }} />
                </div>
              ) : null}
              <div className="text-muted small mt-2">Auto-submit when the timer ends.</div>
            </Card.Body>
          </Card>

          <Card className="shadow-sm sticky-card">
            <Card.Header><strong>Question Palette</strong></Card.Header>
            <Card.Body>
              <div className="palette mb-2">
                {qsArr.map((_, i) => (
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
        </Col>
      </Row>
    </Container>
  );
}
