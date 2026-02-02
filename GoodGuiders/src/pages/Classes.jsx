import { useEffect, useMemo, useState } from "react";
import {
  Container,
  Table,
  Button,
  Badge,
  Collapse,
  Spinner,
  Alert,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import PageBreadcrumb from "../componets/PageBreadcrumb";
// import PurchaseModal from "../componets/PurchaseModal";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

export default function StudentClasses() {
  const [rows, setRows] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showQAModal, setShowQAModal] = useState(false);
  const [activeSubTopic, setActiveSubTopic] = useState(null);
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  // purchase modal
  // const [modalShow, setModalShow] = useState(false);
  // const [modalNote, setModalNote] = useState(null);

  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  /* ================= FETCH STUDENT CLASSES ================= */
  useEffect(() => {
    async function loadClasses() {
      try {
        setLoading(true);

        if (!loggedInUser?.email) {
          throw new Error("Student not logged in");
        }

        const res = await fetch(
          `${API}/classes/student?email=${encodeURIComponent(
            loggedInUser.email,
          )}`,
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

  /* ================= TOTAL COUNTS ================= */
  const totals = useMemo(
    () =>
      rows.map((r) => {
        const subjects = r.subjects?.length || 0;
        const chapters = (r.subjects || []).reduce(
          (acc, s) => acc + (s.chapters?.length || 0),
          0,
        );
        return { subjects, chapters };
      }),
    [rows],
  );

  /* ================= PDF CLICK (LOCKED) ================= */
  function handleOpenPdf(fileUrl) {
    if (!fileUrl) return;

    const user = localStorage.getItem("loggedInUser");
    if (!user) {
      navigate("/login");
      return;
    }

    // Open PDF in new tab
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  }

  const toggleRow = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  /* ================= RENDER DETAILS ================= */
  const renderDetails = (item) => {
    const subjects = item.subjects || [];
    if (!subjects.length) {
      return <div className="text-muted">No subjects available.</div>;
    }

    return (
      <div className="p-3 bg-light border rounded bg-white">
        {subjects.map((s, si) => (
          <div key={si} className="mb-3">
            <div className="d-flex align-items-center mb-2">
              <strong className="me-2">{s.name}</strong>
              <Badge bg="secondary">{s.chapters?.length || 0} chapters</Badge>
            </div>

            {(s.chapters || []).map((c, ci) => (
              <div key={ci} className="mb-3 ps-3">
                <div className="fw-semibold">{c.name}</div>

                <div className="d-flex gap-2 flex-wrap mt-1">
                  {c.onePagePdfUrl && (
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => handleOpenPdf(c.onePagePdfUrl)}
                    >
                      <FeatherIcon
                        icon="file-text"
                        size={14}
                        className="me-1"
                      />
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

                {/* ===== Sub-topics ===== */}
                {c.subTopics?.length > 0 && (
                  <div className="mt-3 ps-3">
                    {c.subTopics.map((t, ti) => (
                      <div
                        key={ti}
                        className="mb-3 p-3 border rounded bg-white"
                      >
                        {/* Sub-topic title */}
                        <div className="fw-semibold mb-2 text-dark">
                          🔹 {t.name}
                        </div>

                        {/* Sub-topic PDFs + Q&A */}
                        <div className="d-flex gap-2 flex-wrap">
                          {t.onePagePdfUrl && (
                            <Button
                              size="sm"
                              variant="outline-secondary"
                              onClick={() => handleOpenPdf(t.onePagePdfUrl)}
                            >
                              <FeatherIcon
                                icon="file-text"
                                size={13}
                                className="me-1"
                              />
                              1-Page
                            </Button>
                          )}

                          {t.fullPdfUrl && (
                            <Button
                              size="sm"
                              variant="outline-secondary"
                              onClick={() => handleOpenPdf(t.fullPdfUrl)}
                            >
                              <FeatherIcon
                                icon="file"
                                size={13}
                                className="me-1"
                              />
                              Full PDF
                            </Button>
                          )}

                          {t.questions?.length > 0 && (
                            <Button
                              size="sm"
                              variant="outline-dark"
                              onClick={() => {
                                setActiveSubTopic(t);
                                setShowQAModal(true);
                              }}
                            >
                              <FeatherIcon
                                icon="help-circle"
                                size={13}
                                className="me-1"
                              />
                              Sub-topic test
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}

        <Modal
          show={showQAModal}
          onHide={() => setShowQAModal(false)}
          size="xl"
          centered
          dialogClassName="modal-90w"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              📖 {activeSubTopic?.name} — Questions & Answers
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="px-4 py-4">
            {activeSubTopic?.questions?.length ? (
              activeSubTopic.questions.map((q, i) => {
                const isOpen = openQuestionIndex === i;

                return (
                  <div
                    key={i}
                    className="mb-3 border rounded bg-white shadow-sm"
                  >
                    {/* Question header */}
                    <div
                      className="d-flex justify-content-between align-items-center p-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => setOpenQuestionIndex(isOpen ? null : i)}
                    >
                      <div className="fw-semibold text-dark px-3 py-3">
                        Q{i + 1}. {q.question}
                      </div>

                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenQuestionIndex(isOpen ? null : i);
                        }}
                      >
                        <FeatherIcon
                          icon={isOpen ? "minus" : "plus"}
                          size={14}
                        />
                      </Button>
                    </div>

                    {/* Answer dropdown */}
                    {isOpen && (
                      <div className="border-top px-3 py-3 text-dark">
                        <span className="fw-semibold text-secondary me-1">
                          Answer:
                        </span>
                        {q.answer}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-muted">
                No questions available for this topic.
              </p>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowQAModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  /* ================= RENDER ================= */
  return (
    <div className="themebody-wrap">
      <PageBreadcrumb pagename="Study Materials" />

      <Container fluid className="pb-4">
        <h4 className="mb-3">📚 Your Class Notes</h4>

        {loading && (
          <div className="text-center mt-4">
            <Spinner animation="border" />
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && rows.length === 0 && (
          <Alert variant="info">
            No study material available for your class yet.
          </Alert>
        )}

        {!loading && rows.length > 0 && (
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th style={{ width: 50 }}></th>
                <th>#</th>
                <th>Class</th>
                <th>Board</th>
                <th>Subjects</th>
                <th>Chapters</th>
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
                          icon={expanded[r._id] ? "chevron-up" : "chevron-down"}
                          size={14}
                        />
                      </Button>
                    </td>
                    <td>{i + 1}</td>
                    <td>{r.name}</td>
                    <td>{r.educationBoard || "-"}</td>
                    <td>{totals[i].subjects}</td>
                    <td>{totals[i].chapters}</td>
                  </tr>

                  <tr>
                    <td colSpan={6} className="p-0 border-0">
                      <Collapse in={expanded[r._id]}>
                        <div className="p-3">{renderDetails(r)}</div>
                      </Collapse>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
        )}
      </Container>

      {/* ===== Purchase Modal ===== */}
      {/* <PurchaseModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        note={modalNote}
        onPurchase={() => navigate("/purchase-temp")}
      /> */}
    </div>
  );
}
