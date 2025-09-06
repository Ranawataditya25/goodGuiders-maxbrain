import { useEffect, useState, useMemo, useRef } from "react";
import { Card, Row, Col, Button, Spinner, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

const API = "http://localhost:5000/api";
const BASE = "/bootstrapreact/medixo"; // aligns with your screenshot path

/* ---------------- helpers (same logic as page) ---------------- */
const extractId = (x) => (typeof x === "string" ? x : x && (x._id || x.id) ? (x._id || x.id) : null);
const toDateMs = (v) => { try { return v ? new Date(v).getTime() || 0 : 0; } catch { return 0; } };
const normalizeStatus = (s) => {
  const v = String(s || "").toLowerCase().replace(/\s+/g, "_");
  if (["completed", "submitted", "finished", "done"].includes(v)) return "completed";
  if (["in_progress", "ongoing", "started", "active"].includes(v)) return "in_progress";
  if (["assigned", "pending", "not_started", "new", ""].includes(v)) return "assigned";
  return "assigned";
};
const pickLatestLocal = (arr) => {
  if (!arr?.length) return null;
  return arr
    .filter(Boolean)
    .sort(
      (a, b) =>
        (toDateMs(b?.submittedAt) || toDateMs(b?.updatedAt) || toDateMs(b?.startedAt)) -
        (toDateMs(a?.submittedAt) || toDateMs(a?.updatedAt) || toDateMs(a?.startedAt))
    )[0] || null;
};
const deriveStatus = (a) => {
  if (a?.derivedStatus) return a.derivedStatus;
  const hint = normalizeStatus(a?.status);
  const att =
    a?._latestAttempt ||
    a?.latestAttempt ||
    a?.attempt ||
    (Array.isArray(a?.attempts) ? pickLatestLocal(a.attempts) : null) ||
    null;

  if (att) {
    const s = normalizeStatus(att?.status);
    const isSubmitted =
      !!att?.submitted || !!att?.isSubmitted || !!att?.submittedAt || !!att?.finishedAt || s === "completed";
    if (isSubmitted) return "completed";

    const hasProgress =
      !!att?.startedAt || !!att?.startTime || (att?.answers && Object.keys(att.answers || {}).length > 0) || s === "in_progress";
    if (hasProgress) return "in_progress";
  }

  if (a?.isCompleted || a?.completed || a?.submittedAt) return "completed";
  if (a?.inProgress || a?.startedAt) return "in_progress";
  return hint;
};
/* ---------------------------------------------------------------- */

export default function AssignedTestsSummary() {
  const [user, setUser] = useState(null);
  const [assignmentsRaw, setAssignmentsRaw] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const enrichSigRef = useRef("");

  // user from localStorage
  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedIn || null);
  }, []);

  // fetch assignments quickly
  useEffect(() => {
    (async () => {
      if (!user?.email && !user?._id) { setLoading(false); return; }
      setLoading(true);
      try {
        const url = new URL(`${API}/assignments`);
        if (user?._id) url.searchParams.set("studentId", user._id);
        if (user?.email) url.searchParams.set("studentEmail", user.email);
        const r = await fetch(url.toString());
        const j = await r.json();
        const list =
          (Array.isArray(j) && j) ||
          (Array.isArray(j?.data) && j.data) ||
          (Array.isArray(j?.assignments) && j.assignments) ||
          (Array.isArray(j?.data?.data) && j.data.data) ||
          [];
        setAssignmentsRaw(Array.isArray(list) ? list : []);
        setAssignments(Array.isArray(list) ? list : []);
      } catch (e) {
        console.warn("Failed to load assignments", e);
        setAssignmentsRaw([]);
        setAssignments([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [user?._id, user?.email]);

  // enrich with latest attempt
  useEffect(() => {
    if (!assignmentsRaw?.length || (!user?._id && !user?.email)) return;
    const sig = JSON.stringify(assignmentsRaw.map(a => a?._id || a?.id || "x"));
    if (enrichSigRef.current === sig) return;
    enrichSigRef.current = sig;

    (async () => {
      const enriched = await Promise.all(
        assignmentsRaw.map(async (a) => {
          let candidates = [];
          if (a?.attempt) candidates.push(a.attempt);
          if (a?.latestAttempt) candidates.push(a.latestAttempt);
          if (Array.isArray(a?.attempts)) candidates.push(...a.attempts);
          if (Array.isArray(a?.previousAttempts)) candidates.push(...a.previousAttempts);

          let latest = pickLatestLocal(candidates);

          if (!latest) {
            // (A) /assignments/:id/attempt/latest
            try {
              const u = new URL(`${API}/assignments/${a._id}/attempt/latest`);
              if (user?._id) u.searchParams.set("studentId", user._id);
              if (user?.email) u.searchParams.set("studentEmail", user.email);
              const r = await fetch(u.toString());
              if (r.ok) {
                const j = await r.json();
                latest = j?.data || j?.attempt || j || null;
              }
            } catch {}
          }
          if (!latest) {
            // (B) /attempts?assignmentId=...&studentId=...&limit=1&sort=desc
            try {
              const u = new URL(`${API}/attempts`);
              u.searchParams.set("assignmentId", a._id);
              if (user?._id) u.searchParams.set("studentId", user._id);
              if (user?.email) u.searchParams.set("studentEmail", user.email);
              u.searchParams.set("limit", "1");
              u.searchParams.set("sort", "desc");
              const r = await fetch(u.toString());
              if (r.ok) {
                const j = await r.json();
                const list = Array.isArray(j?.data) ? j.data : Array.isArray(j) ? j : null;
                latest = list?.[0] || j?.attempt || j?.data || null;
              }
            } catch {}
          }

          return { ...a, _latestAttempt: latest || null };
        })
      );
      setAssignments(enriched);
    })();
  }, [assignmentsRaw, user?._id, user?.email]);

  // counters
  const { total, assigned, in_progress, completed } = useMemo(() => {
    const buckets = { total: 0, assigned: 0, in_progress: 0, completed: 0 };
    for (const a of assignments) {
      buckets.total++;
      buckets[deriveStatus(a)]++;
    }
    return buckets;
  }, [assignments]);

  return (
    <Card className="h-100">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <FeatherIcon icon="book-open" />
          <strong>Assigned Tests</strong>
          <Badge bg={total ? "primary" : "secondary"}>{total}</Badge>
        </div>
        <Button
          as={Link}
          to={`${BASE}/my-assignments`}
          size="sm"
          variant="outline-dark"
        >
          View all
        </Button>
      </Card.Header>

      <Card.Body>
        {loading ? (
          <div className="text-center py-3"><Spinner animation="border" /></div>
        ) : (
          <Row className="g-2">
            <Col xs={12} md={4}>
              <Card className="shadow-sm h-100">
                <Card.Body className="d-flex flex-column align-items-start">
                  <div className="text-muted small">Assigned</div>
                  <div className="fs-3 fw-bold">{assigned}</div>
                  <Button
                    as={Link}
                    to={`${BASE}/my-assignments?status=assigned`}
                    size="sm"
                    className="mt-auto"
                    variant="outline-primary"
                  >
                    Open
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="shadow-sm h-100">
                <Card.Body className="d-flex flex-column align-items-start">
                  <div className="text-muted small">In Progress</div>
                  <div className="fs-3 fw-bold">{in_progress}</div>
                  <Button
                    as={Link}
                    to={`${BASE}/my-assignments?status=in_progress`}
                    size="sm"
                    className="mt-auto"
                    variant="outline-info"
                  >
                    Open
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="shadow-sm h-100">
                <Card.Body className="d-flex flex-column align-items-start">
                  <div className="text-muted small">Completed</div>
                  <div className="fs-3 fw-bold">{completed}</div>
                  <Button
                    as={Link}
                    to={`${BASE}/my-assignments?status=completed`}
                    size="sm"
                    className="mt-auto"
                    variant="outline-success"
                  >
                    Open
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
}
