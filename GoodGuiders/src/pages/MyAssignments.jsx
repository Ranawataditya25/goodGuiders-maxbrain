import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Spinner,
  Badge,
  Button,
  Form,
} from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import PageBreadcrumb from "../componets/PageBreadcrumb";

const API = "http://localhost:5000/api";
const LS_KEY = "assignProgressByAssignment"; // <- local fallback from TestPlayer

/* ---------------- Helpers ---------------- */
function pickAssignee(a) {
  const u = a?.assignedBy;

  // If truly not assigned (system / legacy)
  if (!u) return "System (Admin)";

  const name = u.name || u.email || "";
  const role = u.role ;

  return `${name} (${role})`;
}

function coerceArray(x) {
  if (!x) return [];
  if (Array.isArray(x)) return x;
  if (typeof x === "string") {
    return x
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}
function normalizeStringList(list) {
  const arr = coerceArray(list);
  return arr
    .map((item) => {
      if (item == null) return null;
      if (typeof item === "string") return item.trim();
      if (typeof item === "object") {
        return (
          item.name ??
          item.title ??
          item.subject ??
          item.label ??
          item.value ??
          ""
        )
          .toString()
          .trim();
      }
      return String(item).trim();
    })
    .filter(Boolean);
}
function pickTestObj(a) {
  return a?.test || a?.testId || a?.exam || null;
}
function pickSubjects(test) {
  const arr =
    normalizeStringList(test?.subjects) ||
    normalizeStringList(test?.subjectNames) ||
    normalizeStringList(test?.tags);
  return arr && arr.length ? arr : [];
}
function pickType(test) {
  return test?.testType || test?.type || test?.mode || test?.format || "—";
}
function pickClass(test) {
  const val =
    test?.class ??
    test?.className ??
    test?.klass ??
    test?.grade ??
    test?.standard ??
    null;
  if (val === 0 || val === "0") return "0";
  if (!val && val !== 0) return "—";
  return typeof val === "string" ? val : String(val);
}
function asLocale(dt) {
  try {
    return dt ? new Date(dt).toLocaleString() : "—";
  } catch {
    return "—";
  }
}
const extractId = (x) => {
  if (!x) return null;
  if (typeof x === "string") return x;
  if (typeof x === "object") return x._id || x.id || null;
  return null;
};
const toDateMs = (v) => {
  if (!v) return 0;
  try {
    return new Date(v).getTime() || 0;
  } catch {
    return 0;
  }
};
const normalizeStatus = (s) => {
  const v = String(s || "")
    .toLowerCase()
    .replace(/\s+/g, "_");
  if (["completed", "submitted", "finished", "done"].includes(v))
    return "completed";
  if (["in_progress", "ongoing", "started", "active"].includes(v))
    return "in_progress";
  if (["assigned", "pending", "not_started", "new", ""].includes(v))
    return "assigned";
  return "assigned";
};
const pickLatestLocal = (arr) => {
  if (!arr?.length) return null;
  return (
    arr
      .filter(Boolean)
      .sort(
        (a, b) =>
          (toDateMs(b?.submittedAt) ||
            toDateMs(b?.updatedAt) ||
            toDateMs(b?.startedAt)) -
          (toDateMs(a?.submittedAt) ||
            toDateMs(a?.updatedAt) ||
            toDateMs(a?.startedAt))
      )[0] || null
  );
};
const readLocal = () => {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || {};
  } catch {
    return {};
  }
};
/* ----------------------------------------- */

export default function MyAssignments() {
  const navigate = useNavigate();

  // read deep-link filters once
  const initialStatus = (() => {
    try {
      return new URLSearchParams(window.location.search).get("status") || "all";
    } catch {
      return "all";
    }
  })();
  const initialQ = (() => {
    try {
      return new URLSearchParams(window.location.search).get("q") || "";
    } catch {
      return "";
    }
  })();

  // user
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // raw + enriched data
  const [assignmentsRaw, setAssignmentsRaw] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [assignLoading, setAssignLoading] = useState(true);
  const [assignErr, setAssignErr] = useState("");
  const enrichSigRef = useRef("");

  // UI
  const [startingId, setStartingId] = useState(null);
  const [q, setQ] = useState(initialQ); // search text
  const [status, setStatus] = useState(initialStatus); // filter by status
  const [sortKey, setSortKey] = useState("dueAt");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 10;

  /* -------- 1) Load student profile -------- */
  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedIn?.email) {
      setLoadingUser(false);
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${API}/auth/dashboard?email=${encodeURIComponent(loggedIn.email)}`
        );
        const json = await res.json();
        const backendUser = json?.data || json?.user || json;
        const resolvedId =
          backendUser?._id || backendUser?.user?._id || loggedIn?._id || null;
        setUser({ ...loggedIn, ...backendUser, _id: resolvedId });
      } catch {
      } finally {
        setLoadingUser(false);
      }
    })();
  }, []);

  /* -------- 2) Fetch assignments for this student -------- */
  const fetchAssignments = useCallback(async () => {
    if (!user?.email && !user?._id) return;
    setAssignLoading(true);
    setAssignErr("");
    try {
      const url = new URL(`${API}/assignments`);
      if (user?._id) url.searchParams.set("studentId", user._id);
      if (user?.email) url.searchParams.set("studentEmail", user.email);
      const res = await fetch(url.toString());
      const json = await res.json();
      const payload =
        (Array.isArray(json) && json) ||
        (Array.isArray(json?.data) && json.data) ||
        (Array.isArray(json?.assignments) && json.assignments) ||
        (Array.isArray(json?.data?.data) && json.data.data) ||
        [];
      setAssignmentsRaw(payload);
      setAssignments(payload); // render quickly; enrich below
      if (!res.ok || json?.ok === false) {
        setAssignErr(
          json?.message || "Server error while fetching assignments"
        );
      }
    } catch {
      setAssignmentsRaw([]);
      setAssignments([]);
      setAssignErr("Server error while fetching assignments");
    } finally {
      setAssignLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user?.email || user?._id) fetchAssignments();
  }, [user, fetchAssignments]);

  /* -------- 3) Enrich each assignment with latest attempt + local fallback -------- */
  useEffect(() => {
    if (!assignmentsRaw?.length || (!user?._id && !user?.email)) return;
    const sig = JSON.stringify(
      assignmentsRaw.map((a) => a?._id || a?.id || "x")
    );
    if (enrichSigRef.current === sig) return;
    enrichSigRef.current = sig;

    (async () => {
      const enriched = await Promise.all(
        assignmentsRaw.map(async (a) => {
          let candidates = [];
          if (a?.attempt) candidates.push(a.attempt);
          if (a?.latestAttempt) candidates.push(a.latestAttempt);
          if (Array.isArray(a?.attempts)) candidates.push(...a.attempts);
          if (Array.isArray(a?.previousAttempts))
            candidates.push(...a.previousAttempts);

          let latest = pickLatestLocal(candidates);

          // (A) /assignments/:id/attempt/latest
          if (!latest) {
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

          // (B) /attempts?assignmentId=&studentId=&limit=1&sort=desc
          if (!latest) {
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
                const list = Array.isArray(j?.data)
                  ? j.data
                  : Array.isArray(j)
                  ? j
                  : null;
                latest = list?.[0] || j?.attempt || j?.data || null;
              }
            } catch {}
          }

          // attach local fallback info
          const local = readLocal()[a._id] || null;
          return { ...a, _latestAttempt: latest || null, _local: local };
        })
      );
      setAssignments(enriched);
    })();
  }, [assignmentsRaw, user?._id, user?.email]);

  /* -------- 4) Status derivation + IDs (with local override) -------- */
  const deriveStatus = (a) => {
    // Local override always wins
    if (a?.derivedStatus) return a.derivedStatus;
    if (a?._local?.status === "completed") return "completed";
    if (a?._local?.status === "in_progress") return "in_progress";

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
        !!att?.submitted ||
        !!att?.isSubmitted ||
        !!att?.submittedAt ||
        !!att?.finishedAt ||
        s === "completed";
      if (isSubmitted) return "completed";

      const hasProgress =
        !!att?.startedAt ||
        !!att?.startTime ||
        (att?.answers && Object.keys(att.answers || {}).length > 0) ||
        s === "in_progress";
      if (hasProgress) return "in_progress";
    }

    if (a?.isCompleted || a?.completed || a?.submittedAt) return "completed";
    if (a?.inProgress || a?.startedAt) return "in_progress";
    return hint;
  };

  const getTestIdFor = (a) => {
    const fromRow =
      a?.test ??
      a?.testId ??
      a?.exam ??
      a?.examId ??
      a?.paper ??
      a?.paperId ??
      a?.meta?.testId ??
      a?.metadata?.testId ??
      null;
    const fromAttempt =
      a?._latestAttempt?.test ||
      a?._latestAttempt?.testId ||
      a?._latestAttempt?.paperId ||
      null;
    const fromLocal = a?._local?.testId || null;
    return extractId(fromRow) || extractId(fromAttempt) || fromLocal || null;
  };

  const getAttemptIdFor = (a) =>
    extractId(a?._latestAttempt || a?.attempt || null) ||
    a?._local?.attemptId ||
    null;

  /* -------- 5) CTA: Start/Continue/Review -------- */
  const startNewAttemptAndOpen = async (a, testId) => {
    let attemptId = null;
    let tId = testId;
    try {
      const res = await fetch(`${API}/assignments/${a._id}/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: user?._id,
          studentEmail: user?.email,
          testId: tId || undefined,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        attemptId =
          data?.attemptId || data?.data?._id || data?.attempt?._id || null;
        tId =
          tId ||
          extractId(
            data?.test ||
              data?.testId ||
              data?.exam ||
              data?.paper ||
              data?.data?.test ||
              data?.data?.testId
          );
        // persist local "in_progress"
        const map = readLocal();
        map[a._id] = {
          ...(map[a._id] || {}),
          status: "in_progress",
          attemptId,
          testId: tId,
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem(LS_KEY, JSON.stringify(map));
      }
    } catch (e) {
      console.warn("Start endpoint failed; proceeding anyway.", e);
    }
    const qs = new URLSearchParams(
      Object.fromEntries(
        Object.entries({ testId: tId, attemptId }).filter(([, v]) => !!v)
      )
    ).toString();
    if (!tId)
      alert(
        "This assignment has no linked test yet. Please contact your mentor."
      );
    navigate(`/test-player/${a._id}${qs ? `?${qs}` : ""}`);
  };

  // const handleOpen = async (a) => {
  //   const stat = deriveStatus(a);
  //   const testId = getTestIdFor(a);
  //   const attemptId = getAttemptIdFor(a);

  //   setStartingId(a._id);
  //   try {
  //     if (stat === "in_progress" || stat === "completed") {
  //       const qs = new URLSearchParams(
  //         Object.fromEntries(Object.entries({ testId, attemptId }).filter(([, v]) => !!v))
  //       ).toString();
  //       navigate(`/test-player/${a._id}${qs ? `?${qs}` : ""}`);
  //     } else {
  //       await startNewAttemptAndOpen(a, testId);
  //     }
  //   } finally {
  //     setStartingId(null);
  //   }
  // };

  const handleOpen = async (a) => {
    const stat = deriveStatus(a);
    const testId = getTestIdFor(a);
    const attemptId = getAttemptIdFor(a);

    setStartingId(a._id);
    try {
      if (stat === "assigned") {
        // go via instructions gate (pass testId if known)
        const qs = new URLSearchParams(
          Object.fromEntries(Object.entries({ testId }).filter(([, v]) => !!v))
        ).toString();
        navigate(`/test-instructions/${a._id}${qs ? `?${qs}` : ""}`);
        return;
      }

      // in_progress / completed -> open player directly (as before)
      const qs = new URLSearchParams(
        Object.fromEntries(
          Object.entries({ testId, attemptId }).filter(([, v]) => !!v)
        )
      ).toString();
      navigate(`/test-player/${a._id}${qs ? `?${qs}` : ""}`);
    } finally {
      setStartingId(null);
    }
  };

  /* -------- 6) Derived rows (filter + search + sort + paginate) -------- */
  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();

    const filtered = assignments.filter((a) => {
      const t = pickTestObj(a) || {};
      const subj = (pickSubjects(t).join(", ") || "").toLowerCase();
      const typ = (pickType(t) || "").toLowerCase();
      const cls = (pickClass(t) || "").toLowerCase();
      const stat = deriveStatus(a);

      const passStatus = status === "all" ? true : stat === status;
      const passSearch = !term
        ? true
        : subj.includes(term) || typ.includes(term) || cls.includes(term);

      return passStatus && passSearch;
    });

    const sorted = filtered.sort((a, b) => {
      const tA = pickTestObj(a) || {};
      const tB = pickTestObj(b) || {};
      const key = sortKey;

      const getVal = (row, test) => {
        switch (key) {
          case "subjects":
            return pickSubjects(test).join(", ");
          case "type":
            return pickType(test);
          case "class":
            return pickClass(test);
          case "status":
            return deriveStatus(row);
          case "createdAt":
            return row?.createdAt || null;
          case "dueAt":
          default:
            return row?.dueAt || null;
        }
      };

      const va = getVal(a, tA);
      const vb = getVal(b, tB);

      if (va == null && vb == null) return 0;
      if (va == null) return sortAsc ? -1 : 1;
      if (vb == null) return sortAsc ? 1 : -1;

      if (key === "createdAt" || key === "dueAt") {
        const da = new Date(va).getTime();
        const db = new Date(vb).getTime();
        return sortAsc ? da - db : db - da;
      }

      return sortAsc
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });

    return sorted;
  }, [assignments, q, status, sortKey, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(rows.length / perPage));
  const pageRows = rows.slice((page - 1) * perPage, page * perPage);

  const setSort = (key) => {
    if (key === sortKey) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  /* ------------------------------- Render ------------------------------- */
  return (
    <div className="themebody-wrap">
      <PageBreadcrumb pagename="My Assignments" />
      <div className="theme-body">
        <Container fluid>
          {/* Controls */}
          <Card className="mb-3">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <h4 className="mb-0">All Assigned Tests</h4>
                <Badge bg={assignments.length ? "primary" : "secondary"}>
                  {assignments.length}
                </Badge>
              </div>
              <div className="d-flex gap-2">
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={fetchAssignments}
                >
                  <FeatherIcon icon="refresh-cw" className="me-2" />
                  Refresh
                </Button>
                <Button
                  as={Link}
                  to="/patient-dashboard"
                  size="sm"
                  variant="outline-dark"
                >
                  <FeatherIcon icon="home" className="me-2" />
                  Dashboard
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Row className="g-2 align-items-end">
                <Col md={4}>
                  <Form.Label>Search (subjects / type / class)</Form.Label>
                  <Form.Control
                    placeholder="e.g. Physics, Objective, Class 10"
                    value={q}
                    onChange={(e) => {
                      setQ(e.target.value);
                      setPage(1);
                    }}
                  />
                </Col>
                <Col md={3}>
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                      setPage(1);
                    }}
                  >
                    <option value="all">All</option>
                    <option value="assigned">Assigned</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </Form.Select>
                </Col>
                <Col md="auto" className="ms-auto">
                  <div className="text-muted small">
                    Sort by:{" "}
                    <Button
                      size="sm"
                      variant={sortKey === "dueAt" ? "primary" : "light"}
                      className="me-1"
                      onClick={() => setSort("dueAt")}
                    >
                      Due
                    </Button>
                    <Button
                      size="sm"
                      variant={sortKey === "createdAt" ? "primary" : "light"}
                      className="me-1"
                      onClick={() => setSort("createdAt")}
                    >
                      Assigned On
                    </Button>
                    <Button
                      size="sm"
                      variant={sortKey === "subjects" ? "primary" : "light"}
                      className="me-1"
                      onClick={() => setSort("subjects")}
                    >
                      Subjects
                    </Button>
                    <Button
                      size="sm"
                      variant={sortKey === "type" ? "primary" : "light"}
                      className="me-1"
                      onClick={() => setSort("type")}
                    >
                      Type
                    </Button>
                    <Button
                      size="sm"
                      variant={sortKey === "class" ? "primary" : "light"}
                      onClick={() => setSort("class")}
                    >
                      Class
                    </Button>
                    <span className="ms-2">{sortAsc ? "↑" : "↓"}</span>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Table */}
          <Card>
            <Card.Body>
              {assignErr ? (
                <div className="alert alert-warning py-2">{assignErr}</div>
              ) : loadingUser || assignLoading ? (
                <div className="text-center">
                  <Spinner animation="border" />
                </div>
              ) : rows.length === 0 ? (
                <div className="text-muted">
                  No tests found for your filters.
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="align-middle">
                    <thead>
                      <tr>
                        <th>Subjects</th>
                        <th>Type</th>
                        <th>Class</th>
                        <th>Assigned By</th>
                        <th>Assigned On</th>
                        <th>Due</th>
                        <th>Status</th>
                        <th className="text-end"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageRows.map((a) => {
                        const t = pickTestObj(a) || {};
                        const assignee = pickAssignee(a);
                        const subjects = pickSubjects(t).join(", ") || "—";
                        const typ = pickType(t);
                        const cls = pickClass(t);
                        const assigned = asLocale(a?.createdAt);
                        const due = asLocale(a?.dueAt);

                        const stat = deriveStatus(a);
                        const statusVariant =
                          stat === "completed"
                            ? "success"
                            : stat === "in_progress"
                            ? "info"
                            : "warning";

                        const cta =
                          stat === "completed"
                            ? "Review"
                            : stat === "in_progress"
                            ? "Continue"
                            : "Start";

                        return (
                          <tr key={a._id}>
                            <td>{subjects}</td>
                            <td>
                              <Badge bg="dark">{typ}</Badge>
                            </td>
                            <td>
                              <Badge bg="secondary">
                                {cls === "—" ? cls : `Class ${cls}`}
                              </Badge>
                            </td>
                            <td>
                              <span className="fw-medium">{assignee}</span>
                            </td>
                            <td>{assigned}</td>
                            <td>{due}</td>
                            <td>
                              <Badge bg={statusVariant}>{stat}</Badge>
                            </td>
                            <td className="text-end">
                              <Button
                                size="sm"
                                variant={
                                  stat === "completed"
                                    ? "outline-secondary"
                                    : "primary"
                                }
                                onClick={() => handleOpen(a)}
                                disabled={startingId === a._id}
                              >
                                {startingId === a._id ? (
                                  <>
                                    <Spinner
                                      animation="border"
                                      size="sm"
                                      className="me-2"
                                    />
                                    Opening…
                                  </>
                                ) : (
                                  cta
                                )}
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              )}

              {/* Pagination */}
              {rows.length > perPage && (
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div className="text-muted small">
                    Showing {(page - 1) * perPage + 1}–
                    {Math.min(page * perPage, rows.length)} of {rows.length}
                  </div>
                  <div className="d-flex gap-2">
                    <Button
                      size="sm"
                      variant="light"
                      disabled={page === 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      <FeatherIcon icon="chevron-left" className="me-1" /> Prev
                    </Button>
                    <Button
                      size="sm"
                      variant="light"
                      disabled={page === totalPages}
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                    >
                      Next <FeatherIcon icon="chevron-right" className="ms-1" />
                    </Button>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
}
