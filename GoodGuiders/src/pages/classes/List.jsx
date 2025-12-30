// import { useEffect, useMemo, useState } from "react";
// import { Container, Table, Button, Badge, Collapse } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import FeatherIcon from "feather-icons-react";
// import PageBreadcrumb from "../../componets/PageBreadcrumb";

// const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

// export default function List() {
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");
//   const [expanded, setExpanded] = useState({});
//   const navigate = useNavigate();

//   const fetchAll = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`${API}/classes`);
//       const data = await res.json();
//       if (!res.ok || !data?.ok) throw new Error(data?.message || "Failed to load");
//       setRows(data.items || []);
//     } catch (e) {
//       setErr(e.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   const totals = useMemo(
//     () =>
//       rows.map((r) => {
//         const subjects = r.subjects?.length || 0;
//         const chapters = (r.subjects || []).reduce(
//           (acc, s) => acc + (s.chapters?.length || 0),
//           0
//         );
//         return { subjects, chapters };
//       }),
//     [rows]
//   );

//   const onDelete = async (id) => {
//     if (!window.confirm("Delete this class?")) return;
//     try {
//       const res = await fetch(`${API}/classes/${id}`, { method: "DELETE" });
//       const data = await res.json();
//       if (!res.ok || !data?.ok) throw new Error(data?.message || "Delete failed");
//       fetchAll();
//     } catch (e) {
//       alert(e.message);
//     }
//   };

//   const toggleRow = (id) => setExpanded((m) => ({ ...m, [id]: !m[id] }));
//   const expandAll = () => {
//     const map = {};
//     rows.forEach((r) => (map[r._id] = true));
//     setExpanded(map);
//   };
//   const collapseAll = () => setExpanded({});

//   const renderDetails = (item) => {
//     const subjects = item.subjects || [];
//     if (!subjects.length) return <div className="text-muted">No subjects yet.</div>;

//     return (
//       <div className="p-3 bg-light rounded border">
//         {item.educationBoard ? (
//           <div className="mb-2">
//             <Badge bg="info" className="me-2">
//               Board
//             </Badge>
//             <span>{item.educationBoard}</span>
//           </div>
//         ) : null}

//         {subjects.map((s, si) => (
//           <div key={si} className="mb-3">
//             <div className="d-flex align-items-center mb-1">
//               <strong className="me-2">{s.name || `Subject #${si + 1}`}</strong>
//               <Badge bg="secondary">{s.chapters?.length || 0} chapters</Badge>
//             </div>

//             {(s.chapters || []).length ? (
//               <ul className="mb-0" style={{ listStyle: "disc", paddingLeft: "1.2rem" }}>
//                 {s.chapters.map((c, ci) => (
//                   <li key={ci} className="mb-2">
//                     <div>
//                       <span className="me-2">{c.name || `Chapter #${ci + 1}`}</span>
//                       {c.onePagePdfUrl && (
//                         <a
//                           href={c.onePagePdfUrl}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="me-2 small"
//                           title="1-Page Notes PDF"
//                         >
//                           <FeatherIcon icon="file-text" className="me-1" size={14} />
//                           1-page
//                         </a>
//                       )}
//                       {c.fullPdfUrl && (
//                         <a
//                           href={c.fullPdfUrl}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="small"
//                           title="Full Notes PDF"
//                         >
//                           <FeatherIcon icon="file" className="me-1" size={14} />
//                           full
//                         </a>
//                       )}
//                     </div>

//                     {c.subTopics?.length ? (
//                       <ul
//                         className="mb-0 mt-1"
//                         style={{ listStyle: "circle", paddingLeft: "1.2rem" }}
//                       >
//                         {c.subTopics.map((t, ti) => (
//                           <li key={ti} className="mb-1">
//                             <div className="d-flex align-items-center gap-2 flex-wrap">
//                               <span className="small">{t.name}</span>
//                               {t.onePagePdfUrl && (
//                                 <a
//                                   href={t.onePagePdfUrl}
//                                   target="_blank"
//                                   rel="noreferrer"
//                                   className="small"
//                                 >
//                                   1-page
//                                 </a>
//                               )}
//                               {t.fullPdfUrl && (
//                                 <a
//                                   href={t.fullPdfUrl}
//                                   target="_blank"
//                                   rel="noreferrer"
//                                   className="small"
//                                 >
//                                   full
//                                 </a>
//                               )}
//                               <Link
//                                 to={`/test-page?class=${encodeURIComponent(
//                                   item.name
//                                 )}&subject=${encodeURIComponent(
//                                   s.name
//                                 )}&chapter=${encodeURIComponent(
//                                   c.name
//                                 )}&topic=${encodeURIComponent(
//                                   t.name
//                                 )}&difficulty=beginner`}
//                                 className="btn btn-xs btn-outline-success"
//                               >
//                                 Beginner
//                               </Link>
//                               <Link
//                                 to={`/test-page?class=${encodeURIComponent(
//                                   item.name
//                                 )}&subject=${encodeURIComponent(
//                                   s.name
//                                 )}&chapter=${encodeURIComponent(
//                                   c.name
//                                 )}&topic=${encodeURIComponent(
//                                   t.name
//                                 )}&difficulty=intermediate`}
//                                 className="btn btn-xs btn-outline-warning"
//                               >
//                                 Intermediate
//                               </Link>
//                               <Link
//                                 to={`/test-page?class=${encodeURIComponent(
//                                   item.name
//                                 )}&subject=${encodeURIComponent(
//                                   s.name
//                                 )}&chapter=${encodeURIComponent(
//                                   c.name
//                                 )}&topic=${encodeURIComponent(
//                                   t.name
//                                 )}&difficulty=advanced`}
//                                 className="btn btn-xs btn-outline-danger"
//                               >
//                                 Advanced
//                               </Link>
//                             </div>
//                           </li>
//                         ))}
//                       </ul>
//                     ) : null}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <div className="text-muted small">No chapters added.</div>
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="themebody-wrap">
//       <PageBreadcrumb pagename="Classes" />
//       <Container fluid className="pb-4">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h4 className="mb-0">All Classes</h4>
//           <div className="d-flex gap-2">
//             <Button variant="outline-secondary" size="sm" onClick={expandAll}>
//               <FeatherIcon icon="chevrons-down" className="me-1" /> Expand All
//             </Button>
//             <Button variant="outline-secondary" size="sm" onClick={collapseAll}>
//               <FeatherIcon icon="chevrons-up" className="me-1" /> Collapse All
//             </Button>
//             <Link to="/classes/new" className="btn btn-primary">
//               + Create Class
//             </Link>
//           </div>
//         </div>

//         {err && <div className="text-danger mb-2">{err}</div>}

//         <Table bordered responsive hover>
//           <thead>
//             <tr>
//               <th style={{ width: 56 }}></th>
//               <th>#</th>
//               <th>Class Name</th>
//               <th>Board</th>
//               <th>Subjects</th>
//               <th>Chapters</th>
//               <th>Created</th>
//               <th style={{ width: 220 }}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan={8}>Loading…</td>
//               </tr>
//             ) : rows.length === 0 ? (
//               <tr>
//                 <td colSpan={8}>No classes yet.</td>
//               </tr>
//             ) : (
//               rows.map((r, i) => {
//                 const isOpen = !!expanded[r._id];
//                 return (
//                   <FragmentRow
//                     key={r._id}
//                     index={i}
//                     item={r}
//                     totals={totals[i]}
//                     isOpen={isOpen}
//                     onToggle={() => toggleRow(r._id)}
//                     onEdit={() => navigate(`/classes/${r._id}/edit`)}
//                     onDelete={() => onDelete(r._id)}
//                     renderDetails={() => renderDetails(r)}
//                   />
//                 );
//               })
//             )}
//           </tbody>
//         </Table>
//       </Container>
//     </div>
//   );
// }

// function FragmentRow({
//   index,
//   item,
//   totals,
//   isOpen,
//   onToggle,
//   onEdit,
//   onDelete,
//   renderDetails,
// }) {
//   return (
//     <>
//       <tr>
//         <td className="text-center align-middle">
//           <Button
//             variant="outline-secondary"
//             size="sm"
//             onClick={onToggle}
//             aria-expanded={isOpen}
//           >
//             <FeatherIcon icon={isOpen ? "chevron-up" : "chevron-down"} size={16} />
//           </Button>
//         </td>
//         <td className="align-middle">{index + 1}</td>
//         <td className="align-middle">{item.name}</td>
//         <td className="align-middle">{item.educationBoard || "-"}</td>
//         <td className="align-middle">{totals.subjects}</td>
//         <td className="align-middle">{totals.chapters}</td>
//         <td className="align-middle">
//           {item.createdAt ? new Date(item.createdAt).toLocaleString() : "-"}
//         </td>
//         <td className="align-middle">
//           <div className="d-flex gap-2">
//             <Button size="sm" variant="outline-primary" onClick={onEdit}>
//               Edit
//             </Button>
//             <Button size="sm" variant="outline-danger" onClick={onDelete}>
//               Delete
//             </Button>
//             <Button size="sm" variant="outline-secondary" onClick={onToggle}>
//               {isOpen ? "Hide" : "Details"}
//             </Button>
//           </div>
//         </td>
//       </tr>
//       <tr>
//         <td colSpan={8} className="p-0 border-0">
//           <Collapse in={isOpen}>
//             <div className="p-3 pt-0">{renderDetails()}</div>
//           </Collapse>
//         </td>
//       </tr>
//     </>
//   );
// }



// src/pages/classes/List.jsx  (updated)
import { useEffect, useMemo, useState } from "react";
import { Container, Table, Button, Badge, Collapse } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import PropTypes from "prop-types";
import PageBreadcrumb from "../../componets/PageBreadcrumb";
import PurchaseModal from "../../componets/PurchaseModal";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

export default function List() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [expanded, setExpanded] = useState({});

  // purchase modal
  const [modalShow, setModalShow] = useState(false);
  const [modalNote, setModalNote] = useState(null);

  const navigate = useNavigate();

  // Fetch classes
  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/classes`);
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.message || "Failed to load");
      setRows(data.items || []);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const totals = useMemo(
    () =>
      rows.map((r) => {
        const subjects = r.subjects?.length || 0;
        const chapters = (r.subjects || []).reduce(
          (acc, s) => acc + (s.chapters?.length || 0),
          0
        );
        return { subjects, chapters };
      }),
    [rows]
  );

  // Open PDF placeholder
  function handleOpenPdf(fileUrl, title = "Note", price = 49) {
    const userRaw = localStorage.getItem("loggedInUser");
    if (!userRaw) {
      alert("Please login to view or download notes.");
      navigate("/login");
      return;
    }

    // Show modal
    setModalNote({ title, price });
    setModalShow(true);
  }

  // Handle purchase button (placeholder)
  const handlePurchaseClick = () => {
    setModalShow(false);
    navigate("/purchase-temp"); // temporary placeholder page
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this class?")) return;
    try {
      const res = await fetch(`${API}/classes/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.message || "Delete failed");
      fetchAll();
    } catch (e) {
      alert(e.message);
    }
  };

  const toggleRow = (id) => setExpanded((m) => ({ ...m, [id]: !m[id] }));
  const expandAll = () => {
    const map = {};
    rows.forEach((r) => (map[r._id] = true));
    setExpanded(map);
  };
  const collapseAll = () => setExpanded({});

  const renderDetails = (item) => {
    const subjects = item.subjects || [];
    if (!subjects.length) return <div className="text-muted">No subjects yet.</div>;

    return (
      <div className="p-3 bg-light rounded border">
        {item.educationBoard && (
          <div className="mb-2">
            <Badge bg="info" className="me-2">Board</Badge>
            <span>{item.educationBoard}</span>
          </div>
        )}

        {subjects.map((s, si) => (
          <div key={si} className="mb-3">
            <div className="d-flex align-items-center mb-1">
              <strong className="me-2">{s.name || `Subject #${si + 1}`}</strong>
              <Badge bg="secondary">{s.chapters?.length || 0} chapters</Badge>
            </div>

            {(s.chapters || []).length ? (
              <ul className="mb-0" style={{ listStyle: "disc", paddingLeft: "1.2rem" }}>
                {s.chapters.map((c, ci) => (
                  <li key={ci} className="mb-2">
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <span className="me-2">{c.name || `Chapter #${ci + 1}`}</span>

                      {c.onePagePdfUrl && (
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleOpenPdf(c.onePagePdfUrl, `${item.name} - ${s.name} - ${c.name} (1-page)`)}
                        >
                          <FeatherIcon icon="file-text" className="me-1" />1-page
                        </button>
                      )}

                      {c.fullPdfUrl && (
                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => handleOpenPdf(c.fullPdfUrl, `${item.name} - ${s.name} - ${c.name} (Full)`)}
                        >
                          <FeatherIcon icon="file" className="me-1" />full
                        </button>
                      )}
                    </div>

                    {c.subTopics?.length && (
                      <ul className="mb-0 mt-1" style={{ listStyle: "circle", paddingLeft: "1.2rem" }}>
                        {c.subTopics.map((t, ti) => (
                          <li key={ti} className="mb-1">
                            <div className="d-flex align-items-center gap-2 flex-wrap">
                              <span className="small">{t.name}</span>

                              {t.onePagePdfUrl && (
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => handleOpenPdf(t.onePagePdfUrl, `${item.name} - ${s.name} - ${c.name} - ${t.name} (1-page)`)}
                                >
                                  1-page
                                </button>
                              )}
                              {t.fullPdfUrl && (
                                <button
                                  className="btn btn-sm btn-outline-success"
                                  onClick={() => handleOpenPdf(t.fullPdfUrl, `${item.name} - ${s.name} - ${c.name} - ${t.name} (Full)`)}
                                >
                                  full
                                </button>
                              )}

                              {/* Test links */}
                              <Link
                                to={`/test-page?class=${encodeURIComponent(item.name)}&subject=${encodeURIComponent(s.name)}&chapter=${encodeURIComponent(c.name)}&topic=${encodeURIComponent(t.name)}&difficulty=beginner`}
                                className="btn btn-xs btn-outline-success"
                              >
                                Beginner
                              </Link>
                              <Link
                                to={`/test-page?class=${encodeURIComponent(item.name)}&subject=${encodeURIComponent(s.name)}&chapter=${encodeURIComponent(c.name)}&topic=${encodeURIComponent(t.name)}&difficulty=intermediate`}
                                className="btn btn-xs btn-outline-warning"
                              >
                                Intermediate
                              </Link>
                              <Link
                                to={`/test-page?class=${encodeURIComponent(item.name)}&subject=${encodeURIComponent(s.name)}&chapter=${encodeURIComponent(c.name)}&topic=${encodeURIComponent(t.name)}&difficulty=advanced`}
                                className="btn btn-xs btn-outline-danger"
                              >
                                Advanced
                              </Link>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-muted small">No chapters added.</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="themebody-wrap">
      <PageBreadcrumb pagename="Classes" />
      <Container fluid className="pb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">All Classes</h4>
          <div className="d-flex gap-2">
            <Button variant="outline-secondary" size="sm" onClick={expandAll}>
              <FeatherIcon icon="chevrons-down" className="me-1" /> Expand All
            </Button>
            <Button variant="outline-secondary" size="sm" onClick={collapseAll}>
              <FeatherIcon icon="chevrons-up" className="me-1" /> Collapse All
            </Button>
            <Link to="/classes/new" className="btn btn-primary">+ Create Class</Link>
          </div>
        </div>

        {err && <div className="text-danger mb-2">{err}</div>}

        <Table bordered responsive hover>
          <thead>
            <tr>
              <th style={{ width: 56 }}></th>
              <th>#</th>
              <th>Class Name</th>
              <th>Board</th>
              <th>Subjects</th>
              <th>Chapters</th>
              <th>Created</th>
              <th style={{ width: 220 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8}>Loading…</td></tr>
            ) : rows.length === 0 ? (
              <tr><td colSpan={8}>No classes yet.</td></tr>
            ) : (
              rows.map((r, i) => (
                <FragmentRow
                  key={r._id}
                  index={i}
                  item={r}
                  totals={totals[i]}
                  isOpen={!!expanded[r._id]}
                  onToggle={() => toggleRow(r._id)}
                  onEdit={() => navigate(`/classes/${r._id}/edit`)}
                  onDelete={() => onDelete(r._id)}
                  renderDetails={() => renderDetails(r)}
                />
              ))
            )}
          </tbody>
        </Table>
      </Container>

      {/* Purchase modal instance */}
      <PurchaseModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        note={modalNote}
        onPurchase={handlePurchaseClick} // placeholder
      />
    </div>
  );
}

// FragmentRow component
function FragmentRow({ index, item, totals, isOpen, onToggle, onEdit, onDelete, renderDetails }) {
  return (
    <>
      <tr>
        <td className="text-center align-middle">
          <Button variant="outline-secondary" size="sm" onClick={onToggle} aria-expanded={isOpen}>
            <FeatherIcon icon={isOpen ? "chevron-up" : "chevron-down"} size={16} />
          </Button>
        </td>
        <td className="align-middle">{index + 1}</td>
        <td className="align-middle">{item.name}</td>
        <td className="align-middle">{item.educationBoard || "-"}</td>
        <td className="align-middle">{totals.subjects}</td>
        <td className="align-middle">{totals.chapters}</td>
        <td className="align-middle">{item.createdAt ? new Date(item.createdAt).toLocaleString() : "-"}</td>
        <td className="align-middle">
          <div className="d-flex gap-2">
            <Button size="sm" variant="outline-primary" onClick={onEdit}>Edit</Button>
            <Button size="sm" variant="outline-danger" onClick={onDelete}>Delete</Button>
            <Button size="sm" variant="outline-secondary" onClick={onToggle}>{isOpen ? "Hide" : "Details"}</Button>
          </div>
        </td>
      </tr>
      <tr>
        <td colSpan={8} className="p-0 border-0">
          <Collapse in={isOpen}>
            <div className="p-3 pt-0">{renderDetails()}</div>
          </Collapse>
        </td>
      </tr>
    </>
  );
}

FragmentRow.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string,
    educationBoard: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  totals: PropTypes.shape({
    subjects: PropTypes.number,
    chapters: PropTypes.number,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  renderDetails: PropTypes.func.isRequired,
};