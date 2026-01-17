// AssignedTestsPage.jsx
import { useEffect, useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  Spinner,
  Form,
  InputGroup,
  Modal,
  Pagination,
} from "react-bootstrap";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import { Link } from "react-router-dom";
import PageBreadcrumb from "../componets/PageBreadcrumb";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

function statusBadge(s = "assigned") {
  const map = {
    assigned: "warning",
    in_progress: "info",
    completed: "success",
    expired: "secondary",
  };
  return <Badge bg={map[s] || "secondary"}>{s}</Badge>;
}

export default function AssignedTestsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Filters
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [klass, setKlass] = useState("all");

  // Pagination
  const [page, setPage] = useState(1);
  const perPage = 10;

  // Details modal
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(null);

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      // populate=1 – ask backend to join test + students
      const { data } = await axios.get(`${API}/assignments?populate=1`);
      if (data?.ok) {
        setRows(data.data || []);
      } else {
        setRows([]);
        setErr(data?.message || "Failed to load assignments");
      }
    } catch (e) {
      console.error(e);
      setErr("Server error while fetching assignments.");
      setRows([]);
    } finally {
      setLoading(false);
      setPage(1);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Derived: normalize every row to a consistent shape
  const normalized = useMemo(() => {
    return rows.map((a) => {
      // Support both `.test` (aggregate) and `.testId` (populate)
      const test = a.test || a.testId || {};
      const subjects = Array.isArray(test.subjects) ? test.subjects.join(", ") : "—";
      const type = test.testType || "—";
      const cls = test.class || "—";
      const dueAt = a.dueAt ? new Date(a.dueAt) : null;

      // Student completion summary. If your model stores per-student status
      // (e.g. a.submissions or a.studentStatuses), adapt here.
      const totalStudents = Array.isArray(a.studentIds) ? a.studentIds.length : 0;
      const completedCount = Array.isArray(a.completions)
        ? a.completions.length
        : (a.completedStudentIds || []).length; // ← adjust if your API differs

      return {
        _id: a._id,
        raw: a,
        test,
        subjects,
        type,
        classLabel: cls,
        dueText: dueAt ? dueAt.toLocaleString() : "—",
        status: a.status || (completedCount >= totalStudents && totalStudents > 0 ? "completed" : "assigned"),
        totalStudents,
        completedCount,
      };
    });
  }, [rows]);

  // Filtering
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return normalized.filter((r) => {
      const matchesText =
        !q ||
        r.subjects.toLowerCase().includes(q) ||
        String(r.type).toLowerCase().includes(q) ||
        String(r.classLabel).toLowerCase().includes(q);

      const matchesStatus = status === "all" ? true : r.status === status;
      const matchesClass = klass === "all" ? true : String(r.classLabel) === String(klass);

      return matchesText && matchesStatus && matchesClass;
    });
  }, [normalized, query, status, klass]);

  // Pagination slice
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageSafe = Math.min(Math.max(1, page), totalPages);
  const paged = filtered.slice((pageSafe - 1) * perPage, pageSafe * perPage);

  // Build class options from data
  const classOptions = useMemo(() => {
    const set = new Set();
    normalized.forEach((r) => {
      if (r.classLabel && r.classLabel !== "—") set.add(String(r.classLabel));
    });
    return Array.from(set).sort((a, b) => Number(a) - Number(b));
  }, [normalized]);

  const openDetails = (row) => {
    setActive(row);
    setShow(true);
  };

  return (
    <div className="themebody-wrap">
      <PageBreadcrumb pagename="Assigned Tests" />
      <div className="theme-body">
        <Container fluid>
          <Row>
            <Col>
              <Card>
                <Card.Header className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    <Button variant="outline-primary" onClick={load}>
                      <FeatherIcon icon="refresh-cw" className="me-2" />
                      Refresh
                    </Button>
                    <Badge bg="primary">{filtered.length} total</Badge>
                  </div>

                  <div className="d-flex flex-wrap gap-2">
                    <InputGroup style={{ minWidth: 240 }}>
                      <InputGroup.Text>
                        <FeatherIcon icon="search" size={16} />
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="Search subjects / type / class"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </InputGroup>

                    <Form.Select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      style={{ minWidth: 160 }}
                    >
                      <option value="all">All Statuses</option>
                      <option value="assigned">Assigned</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="expired">Expired</option>
                    </Form.Select>

                    <Form.Select
                      value={klass}
                      onChange={(e) => setKlass(e.target.value)}
                      style={{ minWidth: 140 }}
                    >
                      <option value="all">All Classes</option>
                      {classOptions.map((c) => (
                        <option key={c} value={c}>
                          Class {c}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </Card.Header>

                <Card.Body>
                  {err && (
                    <div className="alert alert-warning mb-3">{err}</div>
                  )}

                  {loading ? (
                    <div className="text-center py-4">
                      <Spinner animation="border" />
                    </div>
                  ) : (
                    <>
                      <div className="table-responsive">
                        <Table hover className="align-middle">
                          <thead>
                            <tr>
                              <th style={{ minWidth: 220 }}>Subjects</th>
                              <th>Type</th>
                              <th>Class</th>
                              <th>Due</th>
                              <th>Students</th>
                              <th>Completed</th>
                              <th>Status</th>
                              <th className="text-end">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paged.map((r) => (
                              <tr key={r._id}>
                                <td>{r.subjects}</td>
                                <td>
                                  {r.type !== "—" ? (
                                    <Badge bg="dark">{String(r.type).toUpperCase()}</Badge>
                                  ) : (
                                    "—"
                                  )}
                                </td>
                                <td>
                                  {r.classLabel !== "—" ? (
                                    <Badge bg="secondary">Class {r.classLabel}</Badge>
                                  ) : (
                                    "—"
                                  )}
                                </td>
                                <td>{r.dueText}</td>
                                <td>{r.totalStudents}</td>
                                <td>{r.completedCount}</td>
                                <td>{statusBadge(r.status)}</td>
                                <td className="text-end">
                                  <Button
                                    size="sm"
                                    variant="outline-primary"
                                    className="me-2"
                                    onClick={() => openDetails(r)}
                                  >
                                    <FeatherIcon icon="eye" size={16} className="me-1" />
                                    Details
                                  </Button>
                                  <Link
                                    to={`/bootstrapreact/medixo/assign-test?assignment=${r._id}`}
                                    className="btn btn-sm btn-outline-secondary"
                                  >
                                    <FeatherIcon icon="edit-3" size={16} className="me-1" />
                                    Edit
                                  </Link>
                                </td>
                              </tr>
                            ))}

                            {!paged.length && (
                              <tr>
                                <td colSpan={8} className="text-center text-muted py-4">
                                  No results.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </Table>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          Showing {(pageSafe - 1) * perPage + 1}–
                          {Math.min(pageSafe * perPage, filtered.length)} of {filtered.length}
                        </small>

                        <Pagination className="mb-0">
                          <Pagination.First onClick={() => setPage(1)} disabled={pageSafe === 1} />
                          <Pagination.Prev onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={pageSafe === 1} />
                          <Pagination.Item active>{pageSafe}</Pagination.Item>
                          <Pagination.Next
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={pageSafe === totalPages}
                          />
                          <Pagination.Last onClick={() => setPage(totalPages)} disabled={pageSafe === totalPages} />
                        </Pagination>
                      </div>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Details Modal */}
      <Modal show={show} onHide={() => setShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Assignment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!active ? (
            <div className="text-center py-3">
              <Spinner animation="border" />
            </div>
          ) : (
            <>
              <div className="mb-3">
                <div><strong>Subjects:</strong> {active.subjects}</div>
                <div><strong>Type:</strong> {String(active.type).toUpperCase()}</div>
                <div><strong>Class:</strong> {active.classLabel}</div>
                <div><strong>Due:</strong> {active.dueText}</div>
                <div><strong>Status:</strong> {statusBadge(active.status)}</div>
              </div>

              <h6 className="mb-2">Students ({active.totalStudents})</h6>
              <div className="table-responsive">
                <Table size="sm" bordered hover className="align-middle">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(active.raw.studentIds || []).map((s, i) => {
                      // When populate=1: s is full user doc { _id, name, email }
                      // Otherwise it might be just an id – handle both.
                      const name = s?.name || "—";
                      const email = s?.email || "—";

                      // If your backend provides per-student status array, map it here:
                      let st = "assigned";
                      // Example if API returns active.raw.studentStatuses: [{studentId, status}]
                      if (Array.isArray(active.raw.studentStatuses)) {
                        const found = active.raw.studentStatuses.find(
                          (x) => String(x.studentId) === String(s?._id || s)
                        );
                        if (found?.status) st = found.status;
                      } else if (
                        Array.isArray(active.raw.completedStudentIds) &&
                        active.raw.completedStudentIds.some((id) => String(id) === String(s?._id || s))
                      ) {
                        st = "completed";
                      }

                      return (
                        <tr key={s?._id || s || i}>
                          <td>{name}</td>
                          <td>{email}</td>
                          <td>{statusBadge(st)}</td>
                        </tr>
                      );
                    })}
                    {!active.raw.studentIds?.length && (
                      <tr>
                        <td colSpan={3} className="text-center text-muted">
                          No students.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
