import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  Table,
  Button,
  // Badge,
  // Collapse,
  Spinner,
  Alert,
  Modal,
} from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function StudentClassesCard() {
  const [rows, setRows] = useState([]);
  // const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showQAModal, setShowQAModal] = useState(false);
  const [activeSubTopic, setActiveSubTopic] = useState(null);
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [activeSubject, setActiveSubject] = useState(null);
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    async function loadClasses() {
      try {
        setLoading(true);

        if (!loggedInUser?.email) throw new Error("Student not logged in");

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

  const totals = useMemo(
    () =>
      rows.map((r) => ({
        subjects: r.subjects?.length || 0,
      })),
    [rows],
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

  // const toggleRow = (id) =>
  //   setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  // const renderDetails = (item) => {
  //   const subjects = item.subjects || [];
  //   if (!subjects.length) {
  //     return <div className="text-muted">No subjects available.</div>;
  //   }

  //   return (
  //     <div className="p-3 bg-light border rounded">
  //       {subjects.map((s, si) => (
  //         <div key={si} className="mb-3">
  //           <div className="d-flex align-items-center mb-2">
  //             <strong className="me-2">{s.name}</strong>
  //             <Badge bg="secondary">{s.chapters?.length || 0} chapters</Badge>
  //           </div>

  //           {(s.chapters || []).map((c, ci) => (
  //             <div key={ci} className="mb-2 ps-3">
  //               <div className="fw-semibold">{c.name}</div>

  //               <div className="d-flex gap-2 flex-wrap mt-1">
  //                 {c.onePagePdfUrl && (
  //                   <Button
  //                     size="sm"
  //                     variant="outline-primary"
  //                     onClick={() => handleOpenPdf(c.onePagePdfUrl)}
  //                   >
  //                     <FeatherIcon icon="file-text" size={14} className="me-1" />
  //                     1-page
  //                   </Button>
  //                 )}

  //                 {c.fullPdfUrl && (
  //                   <Button
  //                     size="sm"
  //                     variant="outline-success"
  //                     onClick={() => handleOpenPdf(c.fullPdfUrl)}
  //                   >
  //                     <FeatherIcon icon="file" size={14} className="me-1" />
  //                     Full PDF
  //                   </Button>
  //                 )}
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  return (
    <Card className="mb-4">
      <style>
        {`
  .subject-tile:hover {
    background: #eaf2ff !important;
    border-color: #0d6efd !important;
    color: #0d6efd !important;
    transform: scale(1.05);
  }
`}
      </style>
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
                  <th>#</th>
                  <th>Class</th>
                  <th>Board</th>
                  <th>Subjects</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <React.Fragment key={r._id}>
                    {/* Main class row */}
                    <tr>
                      <td>{i + 1}</td>
                      <td>{r.name}</td>
                      <td>{r.educationBoard || "-"}</td>
                      <td>{totals[i].subjects}</td>
                    </tr>

                    {/* Subject child row */}
                    <tr>
                      <td colSpan={4} className="bg-light">
                        <div className="d-flex flex-wrap gap-2 p-2">
                          {(r.subjects || []).map((s, si) => (
                            <div
                              key={si}
                              onClick={() => {
                                setActiveSubject(s);
                                setShowSubjectModal(true);
                              }}
                              className="d-flex align-items-center gap-1 px-3 py-2 border rounded subject-tile"
                              style={{
                                cursor: "pointer",
                                background: "white",
                                fontSize: "16px",
                                boxShadow: "0 1px 2px rgba(0,0,0,.05)",
                              }}
                            >
                              <FeatherIcon icon="book" size={16} />
                              {s.name}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          </div>
        )}
        <Modal
          show={showSubjectModal}
          onHide={() => setShowSubjectModal(false)}
          size="xl"
          centered
          dialogClassName="modal-90w"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <FeatherIcon icon="book" size={20} /> {activeSubject?.name}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {activeSubject?.chapters?.length ? (
              activeSubject.chapters.map((c, ci) => (
                <div
                  key={ci}
                  className="mb-5 p-4 border rounded bg-white shadow-sm"
                >
                  {/* Chapter title */}
                  <h5 className="fw-semibold mb-3">📘 {c.name}</h5>

                  {/* Chapter PDFs */}
                  <div className="d-flex gap-3 mb-4 flex-wrap">
                    {c.onePagePdfUrl && (
                      <Button
                        size="sm"
                        variant="outline-dark"
                        onClick={() => handleOpenPdf(c.onePagePdfUrl)}
                      >
                        <FeatherIcon
                          icon="file-text"
                          size={14}
                          className="me-1"
                        />
                        1-Page PDF
                      </Button>
                    )}

                    {c.fullPdfUrl && (
                      <Button
                        size="sm"
                        variant="outline-dark"
                        onClick={() => handleOpenPdf(c.fullPdfUrl)}
                      >
                        <FeatherIcon icon="file" size={14} className="me-1" />
                        Full PDF
                      </Button>
                    )}
                  </div>

                  {/* Sub-topics */}
                  {c.subTopics?.length ? (
                    <div className="ps-3 mt-2">
                      {c.subTopics.map((t, ti) => (
                        <div
                          key={ti}
                          className="mb-3 p-3 border rounded bg-light"
                        >
                          <div className="fw-semibold mb-2">🔹 {t.name}</div>

                          <div className="d-flex gap-3 mt-3 flex-wrap">
                            {t.onePagePdfUrl && (
                              <Button
                                size="sm"
                                variant="outline-dark"
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
                                variant="outline-dark"
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
                                size={14}
                                className="me-1"
                              />
                              Sub-topic test
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-muted small">No sub-topics</div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-muted">No chapters available</p>
            )}
          </Modal.Body>
        </Modal>

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
                    {/* Question row */}
                    <div
                      className="d-flex justify-content-between align-items-center p-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => setOpenQuestionIndex(isOpen ? null : i)}
                    >
                      <div className="fw-semibold px-3 py-3">
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
      </Card.Body>
    </Card>
  );
}
