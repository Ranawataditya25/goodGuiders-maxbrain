import { useEffect, useMemo, useState } from "react";
import {
  Card,
  Table,
  Button,
  Badge,
  Collapse,
  Spinner,
  Alert,
} from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

export default function StudentClassesCard() {
  const [rows, setRows] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    async function loadClasses() {
      try {
        setLoading(true);

        if (!loggedInUser?.email) throw new Error("Student not logged in");

        const res = await fetch(
          `${API}/classes/student?email=${encodeURIComponent(
            loggedInUser.email
          )}`
        );

        const data = await res.json();

        if (!res.ok || !data.ok) {
          throw new Error(data.message || "Failed to load classes");
        }

        setRows(data.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadClasses();
  }, []);

  const totals = useMemo(
    () =>
      rows.map((r) => ({
        subjects: r.subjects?.length || 0,
      })),
    [rows]
  );

  function handleOpenPdf(fileUrl) {
    if (!fileUrl) return;

    const user = localStorage.getItem("loggedInUser");
    if (!user) {
      navigate("/login");
      return;
    }

    window.open(fileUrl, "_blank", "noopener,noreferrer");
  }

  const toggleRow = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const renderDetails = (item) => {
    const subjects = item.subjects || [];
    if (!subjects.length) {
      return <div className="text-muted">No subjects available.</div>;
    }

    return (
      <div className="p-3 bg-light border rounded">
        {subjects.map((s, si) => (
          <div key={si} className="mb-3">
            <div className="d-flex align-items-center mb-2">
              <strong className="me-2">{s.name}</strong>
              <Badge bg="secondary">{s.chapters?.length || 0} chapters</Badge>
            </div>

            {(s.chapters || []).map((c, ci) => (
              <div key={ci} className="mb-2 ps-3">
                <div className="fw-semibold">{c.name}</div>

                <div className="d-flex gap-2 flex-wrap mt-1">
                  {c.onePagePdfUrl && (
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => handleOpenPdf(c.onePagePdfUrl)}
                    >
                      <FeatherIcon icon="file-text" size={14} className="me-1" />
                      1-page
                    </Button>
                  )}

                  {c.fullPdfUrl && (
                    <Button
                      size="sm"
                      variant="outline-success"
                      onClick={() => handleOpenPdf(c.fullPdfUrl)}
                    >
                      <FeatherIcon icon="file" size={14} className="me-1" />
                      Full PDF
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="mb-4">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h4 className="mb-0">📚 Study Materials</h4>
        <Button
          size="sm"
          variant="outline-primary"
          onClick={() => navigate("/student/classes")}
        >
          View All
        </Button>
      </Card.Header>

      <Card.Body>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : rows.length === 0 ? (
          <Alert variant="info">
            No study material available for your class yet.
          </Alert>
        ) : (
          <div className="table-responsive">
            <Table bordered hover size="sm" className="align-middle">
              <thead>
                <tr>
                  <th style={{ width: 40 }}></th>
                  <th>#</th>
                  <th>Class</th>
                  <th>Board</th>
                  <th>Subjects</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <>
                    <tr key={r._id}>
                      <td className="text-center">
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          onClick={() => toggleRow(r._id)}
                        >
                          <FeatherIcon
                            icon={
                              expanded[r._id]
                                ? "chevron-up"
                                : "chevron-down"
                            }
                            size={14}
                          />
                        </Button>
                      </td>
                      <td>{i + 1}</td>
                      <td>{r.name}</td>
                      <td>{r.educationBoard || "-"}</td>
                      <td>{totals[i].subjects}</td>
                    </tr>

                    <tr>
                      <td colSpan={5} className="p-0 border-0">
                        <Collapse in={expanded[r._id]}>
                          <div className="p-3">{renderDetails(r)}</div>
                        </Collapse>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}