// import { useEffect, useMemo, useState, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Row,
//   Col,
//   Card,
//   Table,
//   Container,
//   Spinner,
//   Badge,
//   Button,
//   Collapse,
//   Modal,
//   Form,
// } from "react-bootstrap";
// import FeatherIcon from "feather-icons-react";
// import IMAGE_URLS from "/src/pages/api/Imgconfig.js";
// import PageBreadcrumb from "../componets/PageBreadcrumb";
// import AssignedTestsSummary from "../componets/AssignedTestsSummary";

// const API = "http://localhost:5000/api";

// /** --------------------------
//  *  Helpers to normalize shapes
//  *  -------------------------- */
// function coerceArray(x) {
//   if (!x) return [];
//   if (Array.isArray(x)) return x;
//   if (typeof x === "string") {
//     // handle comma-separated
//     return x
//       .split(",")
//       .map((s) => s.trim())
//       .filter(Boolean);
//   }
//   return [];
// }

// // Normalize array of strings or objects with common name keys
// function normalizeStringList(list) {
//   const arr = coerceArray(list);
//   return arr
//     .map((item) => {
//       if (item == null) return null;
//       if (typeof item === "string") return item.trim();
//       if (typeof item === "object") {
//         return (
//           item.name ??
//           item.title ??
//           item.subject ??
//           item.label ??
//           item.value ??
//           ""
//         )
//           .toString()
//           .trim();
//       }
//       return String(item).trim();
//     })
//     .filter(Boolean);
// }

// function pickTestObj(a) {
//   // Some backends send a populated `test`, others `testId` (as object or id), some `exam`
//   return a?.test || a?.testId || a?.exam || null;
// }

// function pickSubjects(test) {
//   // subjects can be: array, CSV string, or nested
//   const arr =
//     normalizeStringList(test?.subjects) ||
//     normalizeStringList(test?.subjectNames) ||
//     normalizeStringList(test?.tags);
//   return arr && arr.length ? arr : [];
// }

// function pickType(test) {
//   // type can be testType / type / mode / format
//   return test?.testType || test?.type || test?.mode || test?.format || "—";
// }

// function pickClass(test) {
//   // class can be `class`, `className`, `klass`, `grade`, `standard`
//   const val =
//     test?.class ??
//     test?.className ??
//     test?.klass ??
//     test?.grade ??
//     test?.standard ??
//     null;
//   if (val === 0 || val === "0") return "0";
//   if (!val && val !== 0) return "—";
//   return typeof val === "string" ? val : String(val);
// }

// function asLocale(dt) {
//   try {
//     return dt ? new Date(dt).toLocaleString() : "—";
//   } catch {
//     return "—";
//   }
// }

// // extract ID whether it's a string, object with _id/id, or falsy
// const extractId = (x) => {
//   if (!x) return null;
//   if (typeof x === "string") return x;
//   if (typeof x === "object") return x._id || x.id || null;
//   return null;
// };

// // ---- NEW: prefer server truth (derivedStatus), with robust fallbacks
// function deriveStatus(a) {
//   if (a?.derivedStatus) return String(a.derivedStatus).toLowerCase();

//   const la = a?.latestAttempt;
//   if (la?.status === "submitted" || la?.submittedAt) return "completed";

//   // consider in progress if attempt exists, has status or any work saved
//   const answersCount =
//     typeof la?.answersCount === "number"
//       ? la.answersCount
//       : la?.answers
//       ? Object.keys(la.answers).length
//       : 0;

//   if (
//     la?.status === "in_progress" ||
//     la?.startedAt ||
//     answersCount > 0
//   ) {
//     return "in_progress";
//   }

//   // final fallback: whatever assignment.status says, else "assigned"
//   return (a?.status || "assigned").toLowerCase();
// }

// function isPdfSubjective(a) {
//   const t = pickTestObj(a) || {};
//   return pickType(t) === "subjective_pdf";
// }

// function getQuestionPdfUrl(a) {
//   const t = pickTestObj(a) || {};

//   // ✅ correct path based on your schema
//   const fileUrl = t?.questionPaper?.fileUrl;

//   if (!fileUrl) return null;

//   // backend serves /uploads statically
//   return fileUrl.startsWith("http")
//     ? fileUrl
//     : `http://localhost:5000${fileUrl}`;
// }

// export default function Dashboard3() {
//   // ----- profile -----
//   const [user, setUser] = useState(null);
//   const [loadingUser, setLoadingUser] = useState(true);

//   // ----- referral (small) -----
//   const [activeTab, setActiveTab] = useState("avail");
//   const [referralInput, setReferralInput] = useState("");
//   const [referName, setReferName] = useState("");
//   const [referEmail, setReferEmail] = useState("");
//   const [referMobile, setReferMobile] = useState("");

//   // ----- assignments -----
//   const [assignLoading, setAssignLoading] = useState(true);
//   const [assignments, setAssignments] = useState([]);
//   const [assignErr, setAssignErr] = useState("");

//   // ----- debug inspector -----
//   const [showDebug, setShowDebug] = useState(false);
//   const [rawSample, setRawSample] = useState(null);

//   // ----- start button state -----
//   const [startingId, setStartingId] = useState(null);
//   const navigate = useNavigate();

//   const [showPdfModal, setShowPdfModal] = useState(false);
// const [activePdfAssignment, setActivePdfAssignment] = useState(null);
// const [answerPdf, setAnswerPdf] = useState(null);
// const [submittingPdf, setSubmittingPdf] = useState(false);

//   // demo table content that was already in your page
//   const visitData = useMemo(
//     () => [
//       {
//         name: "Tiger Nixon",
//         date: "10/05/2023",
//         time: "09:30 Am",
//         treatment: "Hindi",
//         charge: "$80",
//         status: "Active",
//       },
//       {
//         name: "Hal Appeno",
//         date: "05/06/2023",
//         time: "08:00 Am",
//         treatment: "Engineering",
//         charge: "$50",
//         status: "Active",
//       },
//     ],
//     []
//   );

//   /** -------- 1) Load student profile -------- */
//   useEffect(() => {
//     const loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (!loggedIn?.email) {
//       setLoadingUser(false);
//       console.warn("No loggedInUser in localStorage");
//       return;
//     }

//     (async () => {
//       try {
//         const res = await fetch(
//           `${API}/auth/dashboard?email=${encodeURIComponent(loggedIn.email)}`
//         );
//         const json = await res.json();

//         // Server might send {data}, {user}, or the object
//         const backendUser = json?.data || json?.user || json;

//         // lock a usable _id no matter how payload looks
//         const resolvedId =
//           backendUser?._id ||
//           backendUser?.user?._id ||
//           loggedIn?._id ||
//           null;

//         setUser({ ...loggedIn, ...backendUser, _id: resolvedId });
//       } catch (err) {
//         console.error("Profile load failed:", err);
//       } finally {
//         setLoadingUser(false);
//       }
//     })();
//   }, []);

//   /** Helper: render display values safely */
//   const renderSubjects = (a, test) => {
//     // Try test-level, then assignment-level as fallback
//     const list =
//       pickSubjects(test) ||
//       normalizeStringList(a?.subjects) ||
//       normalizeStringList(a?.subjectNames) ||
//       normalizeStringList(a?.subject) ||
//       normalizeStringList(a?.tags) ||
//       [];
//     return list.length ? list.join(", ") : "—";
//   };
//   const renderType = (a, test) =>
//     pickType(test) ||
//     a?.testType ||
//     a?.type ||
//     a?.mode ||
//     a?.format ||
//     "—";

//   const renderClass = (a, test) => {
//     const val =
//       pickClass(test) !== "—"
//         ? pickClass(test)
//         : (a?.class ??
//             a?.className ??
//             a?.klass ??
//             a?.grade ??
//             a?.standard ??
//             "—");
//     const cls = val === "—" ? "—" : typeof val === "string" ? val : String(val);
//     return cls === "—" ? cls : `Class ${cls}`;
//   };

//   /** -------- 2) Load assignments (uses studentId or email) -------- */
//   const fetchAssignments = useCallback(async () => {
//     if (!user?.email && !user?._id) return;

//     setAssignLoading(true);
//     setAssignErr("");

//     try {
//       const url = new URL(`${API}/assignments`);
//       // Our API supports either one; provide both for robustness
//       if (user?._id) url.searchParams.set("studentId", user._id);
//       if (user?.email) url.searchParams.set("studentEmail", user.email);

//       const res = await fetch(url.toString());
//       const json = await res.json();

//       // Accept multiple common shapes
//       const payload =
//         (Array.isArray(json) && json) ||
//         (Array.isArray(json?.data) && json.data) ||
//         (Array.isArray(json?.assignments) && json.assignments) ||
//         (Array.isArray(json?.data?.data) && json.data.data) ||
//         [];

//       setAssignments(payload);
//       setRawSample(payload[0] || null); // save one sample for the debug viewer
//       if (!res.ok || json?.ok === false) {
//         // still show what we got but warn
//         setAssignErr(json?.message || "Server error while fetching assignments");
//       }
//     } catch (err) {
//       console.error("[Assignments] Error:", err);
//       setAssignments([]);
//       setRawSample(null);
//       setAssignErr("Server error while fetching assignments");
//     } finally {
//       setAssignLoading(false);
//     }
//   }, [user]);

//   useEffect(() => {
//     if (user?.email || user?._id) fetchAssignments();
//   }, [user, fetchAssignments]);

//   /** -------- Start/Continue Attempt + Navigate to Paper -------- */

//   // Try many common locations for a test id on the row payload
//   const getPaperIdFromRow = (a) => {
//     const cand =
//       a?.test ??
//       a?.testId ??
//       a?.exam ??
//       a?.examId ??
//       a?.paper ??
//       a?.paperId ??
//       a?.meta?.testId ??
//       a?.metadata?.testId ??
//       null;
//     return extractId(cand);
//   };

//   // If the row didn't have a test id, ask the detail endpoint
//   const fetchPaperIdFromDetail = async (assignmentId) => {
//     try {
//       const r = await fetch(`${API}/assignments/${assignmentId}`);
//       const j = await r.json();
//       const a = j?.data || j?.assignment || j || {};
//       const cand =
//         a?.test ??
//         a?.testId ??
//         a?.exam ??
//         a?.examId ??
//         a?.paper ??
//         a?.paperId ??
//         a?.meta?.testId ??
//         a?.metadata?.testId ??
//         null;
//       return extractId(cand);
//     } catch {
//       return null;
//     }
//   };

//   // const handleStartAssignment = async (a) => {
//   //   try {
//   //     setStartingId(a._id);

//   //     // 1) Resolve testId as aggressively as possible
//   //     let paperId = getPaperIdFromRow(a);
//   //     if (!paperId) {
//   //       paperId = await fetchPaperIdFromDetail(a._id);
//   //     }

//   //     // 2) Create/reuse attempt (server reuses in_progress attempt)
//   //     let attemptId = null;
//   //     try {
//   //       const res = await fetch(`${API}/assignments/${a._id}/start`, {
//   //         method: "POST",
//   //         headers: { "Content-Type": "application/json" },
//   //         body: JSON.stringify({
//   //           studentId: user?._id,
//   //           studentEmail: user?.email,
//   //           testId: paperId || undefined,
//   //         }),
//   //       });
//   //       if (res.ok) {
//   //         const data = await res.json();
//   //         attemptId =
//   //           data?.attemptId || data?.data?._id || data?.attempt?._id || null;
//   //         // use testId from server if it comes back (last-resort)
//   //         paperId =
//   //           paperId ||
//   //           extractId(
//   //             data?.test ||
//   //               data?.testId ||
//   //               data?.exam ||
//   //               data?.paper ||
//   //               data?.data?.test ||
//   //               data?.data?.testId
//   //           );
//   //       }
//   //     } catch (e) {
//   //       console.warn("Start endpoint failed; proceeding with navigation anyway.", e);
//   //     }

//   //     // 3) Build query params for the player
//   //     const query = new URLSearchParams(
//   //       Object.fromEntries(
//   //         Object.entries({
//   //           testId: paperId || undefined,
//   //           attemptId: attemptId || undefined,
//   //         }).filter(([, v]) => !!v)
//   //       )
//   //     ).toString();

//   //     if (!paperId) {
//   //       alert(
//   //         "This assignment does not have a test linked yet. Please ask your mentor to attach a paper."
//   //       );
//   //     }

//   //     // 4) Navigate (even if paperId missing, the player will show a helpful message)
//   //     navigate(`/test-player/${a._id}${query ? `?${query}` : ""}`);
//   //   } catch (err) {
//   //     console.error("Failed to start assignment:", err);
//   //     // Fallback: still open player with whatever we have
//   //     navigate(`/test-player/${a._id}`);
//   //   } finally {
//   //     setStartingId(null);
//   //   }
//   // };

//   const handleStartAssignment = async (a) => {
//     try {
//       setStartingId(a._id);

//       // status from your existing helper
//       const stat = deriveStatus(a);

//       // resolve test id just like before
//       let paperId = getPaperIdFromRow(a) || (await fetchPaperIdFromDetail(a._id));

//       if (stat === "assigned") {
//         // route to instructions gate (no alerts)
//         const qs = new URLSearchParams(
//           Object.fromEntries(Object.entries({ testId: paperId || undefined }).filter(([, v]) => !!v))
//         ).toString();
//         navigate(`/test-instructions/${a._id}${qs ? `?${qs}` : ""}`);
//         return;
//       }

//       // for in-progress/completed keep your existing direct open flow
//       let attemptId = null;
//       try {
//         const res = await fetch(`${API}/assignments/${a._id}/start`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ testId: paperId || undefined }),
//         });
//         if (res.ok) {
//           const data = await res.json();
//           attemptId = data?.attemptId || data?.data?._id || data?.attempt?._id || null;
//           paperId =
//             paperId ||
//             (data?.test || data?.testId || data?.exam || data?.paper || data?.data?.test || data?.data?.testId);
//         }
//       } catch {}

//       const qs = new URLSearchParams(
//         Object.fromEntries(Object.entries({ testId: extractId(paperId), attemptId }).filter(([, v]) => !!v))
//       ).toString();
//       navigate(`/test-player/${a._id}${qs ? `?${qs}` : ""}`);
//     } finally {
//       setStartingId(null);
//     }
//   };

//   /** -------- referral handler -------- */
//   const handleUseReferral = async () => {
//     if (!referralInput.trim()) {
//       alert("Please enter a referral code.");
//       return;
//     }
//     try {
//       const res = await fetch(`${API}/auth/use-referral`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: user?.email,
//           referralCode: referralInput.trim(),
//         }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         alert(`✅ ${data.msg}`);
//         if (data.updatedCredits) {
//           setUser((prev) => ({ ...prev, credits: data.updatedCredits }));
//         }
//         setReferralInput("");
//       } else {
//         alert(`❌ ${data.msg}`);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error. Please try again.");
//     }
//   };

//   return (
//     <div className="themebody-wrap">
//       <PageBreadcrumb pagename="Student Dashboard" />
//       <div className="theme-body">
//         <Container fluid className="cdxuser-profile">
//           {/* ========================== TOP: PROFILE + SHORTCUTS ========================== */}
//           <Row className="mb-4">
//             <Col xl={12}>
//               <Card>
//                 <Card.Header className="d-flex align-items-center justify-content-between">
//   <div>
//     <h4 className="mb-0">Your Profile & Referral</h4>
//     <small className="text-muted">
//       <strong>Credits:</strong> {user?.credits ?? "—"}
//     </small>
//   </div>
//   <div className="d-flex gap-2">
//     <Button
//       size="sm"
//       variant="outline-primary"
//       as={Link}
//       to="/my-assignments"
//     >
//       <FeatherIcon icon="list" className="me-2" />
//       My Assignments
//     </Button>
//     <Button
//       size="sm"
//       variant="outline-success"
//       as={Link}
//       to="/assign-test"
//     >
//       <FeatherIcon icon="send" className="me-2" />
//       Assignments Hub
//     </Button>
//     {/* New Chat Button for Student */}
//     <Button
//       size="sm"
//       variant="outline-info"
//       as={Link}
//       to="/all-chats"
//     >
//       <FeatherIcon icon="message-square" className="me-2" />
//       Chat
//     </Button>
//   </div>
// </Card.Header>

//                 <Card.Body>
//                   {loadingUser ? (
//                     <div className="text-center">
//                       <Spinner animation="border" />
//                     </div>
//                   ) : user ? (
//                     <Row>
//                       {/* Left: snapshot */}
//                       <Col xxl={4} md={6}>
//                         <Card className="mt-3 shadow-sm">
//                           <Card.Header>
//                             <h5 className="mb-0">Personal Information</h5>
//                           </Card.Header>
//                           <Card.Body>
//                             <ul className="contact-list">
//                               <li className="d-flex align-items-center mb-2">
//                                 <FeatherIcon icon="user" />
//                                 <h6 className="mb-0 ms-2">{user?.name || "—"}</h6>
//                               </li>
//                               <li className="d-flex align-items-center mb-2">
//                                 <FeatherIcon icon="bookmark" />
//                                 <h6 className="mb-0 ms-2">{user?.role || "—"}</h6>
//                               </li>
//                               <li className="d-flex align-items-center mb-2">
//                                 <FeatherIcon icon="phone-call" />
//                                 <h6 className="mb-0 ms-2">
//                                   <a href={`tel:${user?.mobileNo || ""}`}>
//                                     {user?.mobileNo || "—"}
//                                   </a>
//                                 </h6>
//                               </li>
//                               <li className="d-flex align-items-center mb-2">
//                                 <FeatherIcon icon="mail" />
//                                 <h6 className="mb-0 ms-2">
//                                   <a href={`mailto:${user?.email || ""}`}>
//                                     {user?.email || "—"}
//                                   </a>
//                                 </h6>
//                               </li>
//                               <li className="d-flex align-items-center mb-2">
//                                 <FeatherIcon icon="map-pin" />
//                                 <h6 className="mb-0 ms-2">{user?.address || "—"}</h6>
//                               </li>
//                             </ul>
//                           </Card.Body>
//                         </Card>
//                       </Col>

//                       {/* Right: referral */}
//                       <Col xxl={8} md={6}>
//                         <Card className="mt-3 shadow-sm" style={{ minHeight: 400 }}>
//                           <Card.Body>
//                             <div
//                               className="d-flex justify-content-center gap-3 mb-3"
//                               style={{
//                                 backgroundColor: "rgba(102, 151, 159, 0.12)",
//                                 padding: 10,
//                                 borderRadius: 8,
//                               }}
//                             >
//                               <Button
//                                 variant={activeTab === "avail" ? "primary" : "light"}
//                                 className="px-4 rounded-pill"
//                                 onClick={() => setActiveTab("avail")}
//                               >
//                                 Avail Benefits
//                               </Button>
//                               <Button
//                                 variant={activeTab === "refer" ? "primary" : "light"}
//                                 className="px-4 rounded-pill"
//                                 onClick={() => setActiveTab("refer")}
//                               >
//                                 Refer & Earn
//                               </Button>
//                             </div>

//                             {activeTab === "avail" && (
//                               <>
//                                 <div className="d-flex align-items-center gap-2 justify-content-center">
//                                   <span className="badge bg-primary fs-6">
//                                     {user?.yourReferralCode ||
//                                       user?.referralCode ||
//                                       "—"}
//                                   </span>
//                                   <button
//                                     className="btn btn-outline-primary btn-sm"
//                                     onClick={() => {
//                                       const code =
//                                         user?.yourReferralCode || user?.referralCode;
//                                       if (code) {
//                                         navigator.clipboard.writeText(code);
//                                         alert("Referral code copied!");
//                                       }
//                                     }}
//                                   >
//                                     Copy Code
//                                   </button>
//                                 </div>

//                                 <div className="mt-4 text-center">
//                                   <p>Enter your friend’s referral code:</p>
//                                   <div className="d-flex justify-content-center">
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       placeholder="Enter Referral Code"
//                                       value={referralInput}
//                                       onChange={(e) => setReferralInput(e.target.value)}
//                                       style={{ width: 350 }}
//                                     />
//                                   </div>
//                                   <div className="mt-3">
//                                     <button
//                                       className="btn btn-success"
//                                       style={{ width: 200 }}
//                                       onClick={handleUseReferral}
//                                     >
//                                       Apply
//                                     </button>
//                                   </div>
//                                 </div>
//                               </>
//                             )}

//                             {activeTab === "refer" && (
//                               <div className="mt-3">
//                                 <div className="d-flex align-items-center gap-3 mt-3">
//                                   <label style={{ width: 250 }}>
//                                     <strong>Name:</strong>
//                                   </label>
//                                   <input
//                                     type="text"
//                                     className="form-control"
//                                     placeholder="Enter Name"
//                                     value={referName}
//                                     onChange={(e) => setReferName(e.target.value)}
//                                     style={{ width: 350 }}
//                                   />
//                                 </div>

//                                 <div className="d-flex align-items-center gap-3 mt-3">
//                                   <label style={{ width: 250 }}>
//                                     <strong>Friend's Email ID:</strong>
//                                   </label>
//                                   <input
//                                     type="email"
//                                     className="form-control"
//                                     placeholder="Enter Email ID"
//                                     value={referEmail}
//                                     onChange={(e) => setReferEmail(e.target.value)}
//                                     style={{ width: 350 }}
//                                   />
//                                 </div>

//                                 <div className="d-flex align-items-center gap-3 mt-3">
//                                   <label style={{ width: 250 }}>
//                                     <strong>Friend's Mobile Number:</strong>
//                                   </label>
//                                   <input
//                                     type="tel"
//                                     className="form-control"
//                                     placeholder="Enter Mobile Number"
//                                     value={referMobile}
//                                     onChange={(e) => setReferMobile(e.target.value)}
//                                     style={{ width: 350 }}
//                                   />
//                                 </div>

//                                 <div className="d-flex justify-content-center">
//                                   <button
//                                     className="btn btn-success"
//                                     style={{ width: 200, marginTop: 25 }}
//                                     onClick={() =>
//                                       alert(
//                                         `Refer to ${referName}, ${referEmail}, ${referMobile}`
//                                       )
//                                     }
//                                   >
//                                     Refer
//                                   </button>
//                                 </div>
//                               </div>
//                             )}
//                           </Card.Body>
//                         </Card>
//                       </Col>
//                     </Row>
//                   ) : (
//                     <p className="text-danger">User data not found</p>
//                   )}
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>

//           {/* ===== Summary counters (deep-link to filtered list) ===== */}
//           <Row className="mb-4">
//             <Col xl={12}>
//               <AssignedTestsSummary />
//             </Col>
//           </Row>

//           {/* ========================== ASSIGNED TESTS ========================== */}
//           <Card className="mb-4">
//             <Card.Header className="d-flex justify-content-between align-items-center">
//               <div className="d-flex align-items-center gap-2">
//                 <h4 className="mb-0">Assigned Tests</h4>
//                 <Badge bg={assignments.length ? "primary" : "secondary"}>
//                   {assignments.length} {assignments.length === 1 ? "Test" : "Tests"}
//                 </Badge>
//               </div>
//               <div className="d-flex align-items-center gap-2">
//                 <Button
//                   size="sm"
//                   variant="outline-secondary"
//                   onClick={fetchAssignments}
//                 >
//                   <FeatherIcon icon="refresh-cw" className="me-2" />
//                   Refresh
//                 </Button>
//                 <Button
//                   size="sm"
//                   variant="outline-dark"
//                   onClick={() => setShowDebug((s) => !s)}
//                 >
//                   <FeatherIcon icon="bug" className="me-2" />
//                   Debug
//                 </Button>
//                 <Button
//                   as={Link}
//                   to="/bootstrapreact/medixo/my-assignments"
//                   size="sm"
//                   variant="outline-primary"
//                 >
//                   View All
//                 </Button>
//               </div>
//             </Card.Header>

//             <Card.Body>
//               {assignErr ? (
//                 <div className="alert alert-warning py-2">{assignErr}</div>
//               ) : assignLoading ? (
//                 <div className="text-center">
//                   <Spinner animation="border" />
//                 </div>
//               ) : assignments.length === 0 ? (
//                 <div className="text-muted">
//                   No tests assigned yet. If a mentor assigns one, it will appear
//                   here.
//                 </div>
//               ) : (
//                 <>
//                   <div className="table-responsive">
//                     <Table hover className="align-middle">
//                       <thead>
//                         <tr>
//                           <th>Subjects</th>
//                           <th>Type</th>
//                           <th>Class</th>
//                           <th>Due</th>
//                           <th>Status</th>
//                           <th />
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {assignments.slice(0, 3).map((a) => {
//                           const t = pickTestObj(a) || {};
//                           const due = asLocale(a?.dueAt);
//                           const stat = deriveStatus(a); // <-- now using server truth
//                           const statusVariant =
//                             stat === "completed"
//                               ? "success"
//                               : stat === "in_progress"
//                               ? "info"
//                               : "warning";

//                           return (
//                             <tr key={a._id}>
//                               <td>{renderSubjects(a, t)}</td>
//                               <td>
//                                 <Badge bg="dark">{renderType(a, t)}</Badge>
//                               </td>
//                               <td>
//                                 <Badge bg="secondary">{renderClass(a, t)}</Badge>
//                               </td>
//                               <td>{due}</td>
//                               <td>
//                                 <Badge bg={statusVariant}>
//                                   {stat === "in_progress"
//                                     ? "In Progress"
//                                     : stat === "completed"
//                                     ? "Completed"
//                                     : "Assigned"}
//                                 </Badge>
//                               </td>
//                               <td className="text-end">
//                                 {isPdfSubjective(a) ? (
//                                   <Button
//                                     size="sm"
//                                     variant={
//                                       stat === "completed"
//                                         ? "outline-secondary"
//                                         : stat === "in_progress"
//                                           ? "info"
//                                           : "primary"
//                                     }
//                                     onClick={() => {
//                                       const stat = deriveStatus(a);
//                                       if (stat === "completed") {
//                                         // later you can open a "view submitted PDF" modal
//                                         return;
//                                       }
//                                       setActivePdfAssignment(a);
//                                       setAnswerPdf(null);
//                                       setShowPdfModal(true);
//                                     }}
//                                   >
//                                     {stat === "completed" ? (
//                                       "Review"
//                                     ) : stat === "in_progress" ? (
//                                       <>
//                                         {startingId === a._id ? (
//                                           <>
//                                             <Spinner animation="border" size="sm" className="me-2" />
//                                             Opening…
//                                           </>
//                                         ) : (
//                                           "Continue"
//                                         )}
//                                       </>
//                                     ) : (
//                                       <>
//                                         {startingId === a._id ? (
//                                           <>
//                                             <Spinner animation="border" size="sm" className="me-2" />
//                                             Starting…
//                                           </>
//                                         ) : (
//                                           "Start"
//                                         )}
//                                       </>
//                                     )}
//                                   </Button>
//                                 ) : stat === "completed" ? (
//                                   <Link
//                                     className="btn btn-sm btn-outline-secondary"
//                                     to={`/test-player/${a._id}`}
//                                   >
//                                     Review
//                                   </Link>
//                                 ) : stat === "in_progress" ? (
//                                   <Button
//                                     size="sm"
//                                     variant="info"
//                                     onClick={() => handleStartAssignment(a)}
//                                     disabled={startingId === a._id}
//                                   >
//                                     {startingId === a._id ? (
//                                       <>
//                                         <Spinner animation="border" size="sm" className="me-2" />
//                                         Opening…
//                                       </>
//                                     ) : (
//                                       "Continue"
//                                     )}
//                                   </Button>
//                                 ) : (
//                                   <Button
//                                     size="sm"
//                                     variant="primary"
//                                     onClick={() => handleStartAssignment(a)}
//                                     disabled={startingId === a._id}
//                                   >
//                                     {startingId === a._id ? (
//                                       <>
//                                         <Spinner animation="border" size="sm" className="me-2" />
//                                         Starting…
//                                       </>
//                                     ) : (
//                                       "Start"
//                                     )}
//                                   </Button>
//                                 )}
//                               </td>
//                             </tr>
//                           );
//                         })}
//                       </tbody>
//                     </Table>
//                   </div>
//                 </>
//               )}

//               {/* ---- Debug inspector (toggle) ---- */}
//               <Collapse in={showDebug}>
//                 <div className="mt-3">
//                   <Card bg="light" body className="border">
//                     <div className="d-flex justify-content-between align-items-center">
//                       <strong>Assignments Debug Sample</strong>
//                       <small className="text-muted">
//                         (showing the first item only)
//                       </small>
//                     </div>
//                     <pre
//                       className="mt-2"
//                       style={{
//                         whiteSpace: "pre-wrap",
//                         wordBreak: "break-word",
//                         fontSize: 12,
//                         maxHeight: 300,
//                         overflow: "auto",
//                         background: "#f8f9fa",
//                         padding: 12,
//                         borderRadius: 8,
//                         border: "1px solid #e9ecef",
//                       }}
//                     >
// {JSON.stringify(rawSample, null, 2)}
//                     </pre>
//                     <div className="mt-2 text-muted" style={{ fontSize: 12 }}>
//                       <div>
//                         Detected test path:{" "}
//                         <code>assignment.test || assignment.testId || assignment.exam</code>
//                       </div>
//                       <div>
//                         Detected subjects path (fallbacks too):{" "}
//                         <code>
//                           test.subjects | test.subjectNames | test.tags | assignment.subjects | assignment.subjectNames | assignment.subject | assignment.tags
//                         </code>
//                       </div>
//                       <div>
//                         Detected class path (fallbacks too):{" "}
//                         <code>
//                           test.class | className | klass | grade | standard (and same on assignment)
//                         </code>
//                       </div>
//                       <div>
//                         Detected type path (fallbacks too):{" "}
//                         <code>
//                           test.testType | type | mode | format (and same on assignment)
//                         </code>
//                       </div>
//                       <div>
//                         On Start/Continue: resolve <code>testId</code> → POST{" "}
//                         <code>/assignments/:id/start</code> → navigate to{" "}
//                         <code>/test-player/:assignmentId?testId=&amp;attemptId=</code>
//                       </div>
//                     </div>
//                   </Card>
//                 </div>
//               </Collapse>
//             </Card.Body>
//           </Card>

//           {/* ========================== THE REST OF YOUR EXISTING UI ========================== */}
//           <Row>
//             <Col xxl={4} xl={12}>
//               <Row>
//                 <Col xxl={12} md={6}>
//                   <Card className="doctor-probox">
//                     <Card.Body>
//                       <div className="img-wrap" />
//                       <div className="profile-head">
//                         <div className="proimg-wrap">
//                           <img
//                             src={
//                               user?.profileImage
//                                 ? user.profileImage.startsWith(
//                                     "/profilePhotoUploads"
//                                   )
//                                   ? `http://localhost:5000${user.profileImage}`
//                                   : `${import.meta.env.BASE_URL}default-avatar.png`
//                                 : `${import.meta.env.BASE_URL}default-avatar.png`
//                             }
//                             alt="Profile"
//                             className="profile-pic"
//                           />
//                         </div>
//                         <h4>Cedric Kelly</h4>
//                         <span>25 years, California</span>
//                         <p>Lorem ipsum dolor sit amet...</p>
//                       </div>
//                     </Card.Body>
//                     <ul className="docactivity-list">
//                       <li>
//                         <h4>50kg</h4>
//                         <span>Weight</span>
//                       </li>
//                       <li>
//                         <h4>170cm</h4>
//                         <span>Height</span>
//                       </li>
//                       <li>
//                         <h4>55kg</h4>
//                         <span>Goal</span>
//                       </li>
//                     </ul>
//                   </Card>
//                 </Col>

//                 <Col xxl={12} lg={6}>
//                   <Card>
//                     <Card.Header>
//                       <h4>Notifications</h4>
//                     </Card.Header>
//                     <Card.Body>
//                       <ul className="docnoti-list">
//                         {[1, 2, 3, 4].map((num) => (
//                           <li key={num}>
//                             <div className="media">
//                               <img
//                                 className="rounded-50 w-40"
//                                 src={IMAGE_URLS[`avtar/${num}.jpg`]}
//                                 alt=""
//                               />
//                               <div className="media-body">
//                                 <h6>Anna sent you a photo</h6>
//                                 <span className="text-light">Date Here</span>
//                               </div>
//                               <div className="badge badge-primary">10:00 Pm</div>
//                             </div>
//                           </li>
//                         ))}
//                       </ul>
//                     </Card.Body>
//                     <Card.Footer>
//                       <Link className="btn btn-primary d-block mx-auto btn-lg">
//                         See All Notification
//                       </Link>
//                     </Card.Footer>
//                   </Card>
//                 </Col>
//               </Row>
//             </Col>

//             <Col xxl={8} xl={12}>
//               <Row>
//                 <Col xl={12}>
//                   <Card>
//                     <Card.Header>
//                       <h4>Mentor Visits</h4>
//                     </Card.Header>
//                     <Card.Body>
//                       <div className="table-responsive">
//                         <Table className="table table-bordered">
//                           <thead>
//                             <tr>
//                               <th>Mentor Name</th>
//                               <th>Visit Date</th>
//                               <th>Visit Time</th>
//                               <th>Treatment</th>
//                               <th>Charges</th>
//                               <th>Status</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {visitData.map((item, index) => (
//                               <tr key={index}>
//                                 <td>{item.name}</td>
//                                 <td>{item.date}</td>
//                                 <td>{item.time}</td>
//                                 <td>{item.treatment}</td>
//                                 <td>{item.charge}</td>
//                                 <td
//                                   style={{
//                                     color: item.status === "Active" ? "green" : "red",
//                                   }}
//                                 >
//                                   {item.status}
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </Table>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//         </Container>
//         <Modal
//   show={showPdfModal}
//   onHide={() => setShowPdfModal(false)}
//   centered
// >
//   <Modal.Header closeButton>
//     <Modal.Title>Subjective Test (PDF)</Modal.Title>
//   </Modal.Header>

//   <Modal.Body>
//     {activePdfAssignment && (
//       <>
//         {/* Question PDF */}
//         <div className="mb-3">
//           <strong>Question Paper</strong>
//           <div className="mt-2">
//             <a
//               href={getQuestionPdfUrl(activePdfAssignment)}
//               target="_blank"
//               rel="noreferrer"
//               className="btn btn-outline-primary btn-sm"
//             >
//               View PDF
//             </a>
//           </div>
//         </div>

//         {/* Answer Upload */}
//         <Form.Group>
//           <Form.Label>Upload Answer Sheet (PDF)</Form.Label>
//           <Form.Control
//             type="file"
//             accept=".pdf"
//             onChange={(e) => setAnswerPdf(e.target.files[0])}
//           />
//         </Form.Group>
//       </>
//     )}
//   </Modal.Body>

//   <Modal.Footer>
//     <Button
//       variant="secondary"
//       onClick={() => setShowPdfModal(false)}
//     >
//       Cancel
//     </Button>
//     <Button
//       variant="success"
//       disabled={!answerPdf || submittingPdf || deriveStatus(activePdfAssignment) === "completed"}
//       onClick={async () => {
//         try {
//           setSubmittingPdf(true);
//           const fd = new FormData();
//           fd.append("answerPdf", answerPdf);

//           await fetch(
//             `${API}/assignments/${activePdfAssignment._id}/submit-pdf`,
//             { method: "POST", body: fd }
//           );

//           setShowPdfModal(false);
//           fetchAssignments(); // refresh dashboard
//         } catch (e) {
//           alert("Submission failed");
//         } finally {
//           setSubmittingPdf(false);
//         }
//       }}
//     >
//       {submittingPdf ? "Submitting..." : "Submit"}
//     </Button>
//   </Modal.Footer>
// </Modal>

//       </div>
//     </div>
//   );
// }

import { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Table,
  Container,
  Spinner,
  Badge,
  Button,
  Collapse,
  Modal,
  Form,
} from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import IMAGE_URLS from "/src/pages/api/Imgconfig.js";
import PageBreadcrumb from "../componets/PageBreadcrumb";
import AssignedTestsSummary from "../componets/AssignedTestsSummary";
import StudentClassesCard from "../componets/StudentClassesCard";

const API = "http://localhost:5000/api";

/** --------------------------
 *  Helpers to normalize shapes
 *  -------------------------- */
function coerceArray(x) {
  if (!x) return [];
  if (Array.isArray(x)) return x;
  if (typeof x === "string") {
    // handle comma-separated
    return x
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

// Normalize array of strings or objects with common name keys
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
  // Some backends send a populated `test`, others `testId` (as object or id), some `exam`
  return a?.test || a?.testId || a?.exam || null;
}

function pickSubjects(test) {
  // subjects can be: array, CSV string, or nested
  const arr =
    normalizeStringList(test?.subjects) ||
    normalizeStringList(test?.subjectNames) ||
    normalizeStringList(test?.tags);
  return arr && arr.length ? arr : [];
}

function pickType(test) {
  // type can be testType / type / mode / format
  return test?.testType || test?.type || test?.mode || test?.format || "—";
}

function pickClass(test) {
  // class can be `class`, `className`, `klass`, `grade`, `standard`
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

// extract ID whether it's a string, object with _id/id, or falsy
const extractId = (x) => {
  if (!x) return null;
  if (typeof x === "string") return x;
  if (typeof x === "object") return x._id || x.id || null;
  return null;
};

// ---- NEW: prefer server truth (derivedStatus), with robust fallbacks
function deriveStatus(a) {
  if (a?.derivedStatus) return String(a.derivedStatus).toLowerCase();

  const la = a?.latestAttempt;
  if (la?.status === "submitted" || la?.submittedAt) return "completed";

  // consider in progress if attempt exists, has status or any work saved
  const answersCount =
    typeof la?.answersCount === "number"
      ? la.answersCount
      : la?.answers
      ? Object.keys(la.answers).length
      : 0;

  if (la?.status === "in_progress" || la?.startedAt || answersCount > 0) {
    return "in_progress";
  }

  // final fallback: whatever assignment.status says, else "assigned"
  return (a?.status || "assigned").toLowerCase();
}

function isPdfSubjective(a) {
  const t = pickTestObj(a) || {};
  return pickType(t) === "subjective_pdf";
}

function getQuestionPdfUrl(a) {
  const t = pickTestObj(a) || {};

  // ✅ correct path based on your schema
  const fileUrl = t?.questionPaper?.fileUrl;

  if (!fileUrl) return null;

  // backend serves /uploads statically
  return fileUrl.startsWith("http")
    ? fileUrl
    : `http://localhost:5000${fileUrl}`;
}

function pickAssignee(a) {
  const u = a?.assignedBy;

  if (!u) return "System (Admin)";

  const name = u.name || u.email || "";
  const role = u.role || "mentor";

  return `${name} (${role})`;
}

export default function Dashboard3() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [activeTab, setActiveTab] = useState("avail");
  const [referralInput, setReferralInput] = useState("");
  const [referName, setReferName] = useState("");
  const [referEmail, setReferEmail] = useState("");
  const [referMobile, setReferMobile] = useState("");

  const [assignLoading, setAssignLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [assignErr, setAssignErr] = useState("");

  const [showDebug, setShowDebug] = useState(false);
  const [rawSample, setRawSample] = useState(null);
  const [showCreditsModal, setShowCreditsModal] = useState(false);

  const [startingId, setStartingId] = useState(null);
  const navigate = useNavigate();

  const [showPdfModal, setShowPdfModal] = useState(false);
  const [activePdfAssignment, setActivePdfAssignment] = useState(null);
  const [answerPdf, setAnswerPdf] = useState(null);
  const [submittingPdf, setSubmittingPdf] = useState(false);
  const [resultCount, setResultCount] = useState(0);

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  const [mentorVisits, setMentorVisits] = useState([]);
  const [loadingMentorVisits, setLoadingMentorVisits] = useState(true);

  const visitData = useMemo(
    () => [
      {
        name: "Tiger Nixon",
        date: "10/05/2023",
        time: "09:30 Am",
        treatment: "Hindi",
        charge: "$80",
        status: "Active",
      },
      {
        name: "Hal Appeno",
        date: "05/06/2023",
        time: "08:00 Am",
        treatment: "Engineering",
        charge: "$50",
        status: "Active",
      },
    ],
    []
  );

  /** -------- 1) Load student profile -------- */
  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedIn?.email) {
      setLoadingUser(false);
      console.warn("No loggedInUser in localStorage");
      return;
    }

    (async () => {
      try {
        const res = await fetch(
          `${API}/auth/dashboard?email=${encodeURIComponent(loggedIn.email)}`
        );
        const json = await res.json();

        // Server might send {data}, {user}, or the object
        const backendUser = json?.data || json?.user || json;

        // lock a usable _id no matter how payload looks
        const resolvedId =
          backendUser?._id || backendUser?.user?._id || loggedIn?._id || null;

        setUser({ ...loggedIn, ...backendUser, _id: resolvedId });
      } catch (err) {
        console.error("Profile load failed:", err);
      } finally {
        setLoadingUser(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!user?.email) return;

    const loadMentorVisits = async () => {
      try {
        const res = await fetch(
          `${API}/stats/student/${encodeURIComponent(user.email)}/details`
        );
        const data = await res.json();

        if (data?.mentors?.items) {
          setMentorVisits(data.mentors.items);
        } else {
          setMentorVisits([]);
        }
      } catch (err) {
        console.error("Failed to load mentor visits", err);
        setMentorVisits([]);
      } finally {
        setLoadingMentorVisits(false);
      }
    };

    loadMentorVisits();
  }, [user?.email]);

  /** Helper: render display values safely */
  const renderSubjects = (a, test) => {
    // Try test-level, then assignment-level as fallback
    const list =
      pickSubjects(test) ||
      normalizeStringList(a?.subjects) ||
      normalizeStringList(a?.subjectNames) ||
      normalizeStringList(a?.subject) ||
      normalizeStringList(a?.tags) ||
      [];
    return list.length ? list.join(", ") : "—";
  };
  const renderType = (a, test) =>
    pickType(test) || a?.testType || a?.type || a?.mode || a?.format || "—";

  const renderClass = (a, test) => {
    const val =
      pickClass(test) !== "—"
        ? pickClass(test)
        : a?.class ??
          a?.className ??
          a?.klass ??
          a?.grade ??
          a?.standard ??
          "—";
    const cls = val === "—" ? "—" : typeof val === "string" ? val : String(val);
    return cls === "—" ? cls : `Class ${cls}`;
  };

  /** -------- 2) Load assignments (uses studentId or email) -------- */
  const fetchAssignments = useCallback(async () => {
    if (!user?.email && !user?._id) return;

    setAssignLoading(true);
    setAssignErr("");

    try {
      const url = new URL(`${API}/assignments`);
      // Our API supports either one; provide both for robustness
      if (user?._id) url.searchParams.set("studentId", user._id);
      if (user?.email) url.searchParams.set("studentEmail", user.email);

      const res = await fetch(url.toString());
      const json = await res.json();

      // Accept multiple common shapes
      const payload =
        (Array.isArray(json) && json) ||
        (Array.isArray(json?.data) && json.data) ||
        (Array.isArray(json?.assignments) && json.assignments) ||
        (Array.isArray(json?.data?.data) && json.data.data) ||
        [];

      setAssignments(payload);
      setRawSample(payload[0] || null); // save one sample for the debug viewer
      if (!res.ok || json?.ok === false) {
        // still show what we got but warn
        setAssignErr(
          json?.message || "Server error while fetching assignments"
        );
      }
    } catch (err) {
      console.error("[Assignments] Error:", err);
      setAssignments([]);
      setRawSample(null);
      setAssignErr("Server error while fetching assignments");
    } finally {
      setAssignLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user?.email || user?._id) fetchAssignments();
  }, [user, fetchAssignments]);

  /** -------- Start/Continue Attempt + Navigate to Paper -------- */

  // Try many common locations for a test id on the row payload
  const getPaperIdFromRow = (a) => {
    const cand =
      a?.test ??
      a?.testId ??
      a?.exam ??
      a?.examId ??
      a?.paper ??
      a?.paperId ??
      a?.meta?.testId ??
      a?.metadata?.testId ??
      null;
    return extractId(cand);
  };

  // If the row didn't have a test id, ask the detail endpoint
  const fetchPaperIdFromDetail = async (assignmentId) => {
    try {
      const r = await fetch(`${API}/assignments/${assignmentId}`);
      const j = await r.json();
      const a = j?.data || j?.assignment || j || {};
      const cand =
        a?.test ??
        a?.testId ??
        a?.exam ??
        a?.examId ??
        a?.paper ??
        a?.paperId ??
        a?.meta?.testId ??
        a?.metadata?.testId ??
        null;
      return extractId(cand);
    } catch {
      return null;
    }
  };

  // const handleStartAssignment = async (a) => {
  //   try {
  //     setStartingId(a._id);

  //     // 1) Resolve testId as aggressively as possible
  //     let paperId = getPaperIdFromRow(a);
  //     if (!paperId) {
  //       paperId = await fetchPaperIdFromDetail(a._id);
  //     }

  //     // 2) Create/reuse attempt (server reuses in_progress attempt)
  //     let attemptId = null;
  //     try {
  //       const res = await fetch(`${API}/assignments/${a._id}/start`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           studentId: user?._id,
  //           studentEmail: user?.email,
  //           testId: paperId || undefined,
  //         }),
  //       });
  //       if (res.ok) {
  //         const data = await res.json();
  //         attemptId =
  //           data?.attemptId || data?.data?._id || data?.attempt?._id || null;
  //         // use testId from server if it comes back (last-resort)
  //         paperId =
  //           paperId ||
  //           extractId(
  //             data?.test ||
  //               data?.testId ||
  //               data?.exam ||
  //               data?.paper ||
  //               data?.data?.test ||
  //               data?.data?.testId
  //           );
  //       }
  //     } catch (e) {
  //       console.warn("Start endpoint failed; proceeding with navigation anyway.", e);
  //     }

  //     // 3) Build query params for the player
  //     const query = new URLSearchParams(
  //       Object.fromEntries(
  //         Object.entries({
  //           testId: paperId || undefined,
  //           attemptId: attemptId || undefined,
  //         }).filter(([, v]) => !!v)
  //       )
  //     ).toString();

  //     if (!paperId) {
  //       alert(
  //         "This assignment does not have a test linked yet. Please ask your mentor to attach a paper."
  //       );
  //     }

  //     // 4) Navigate (even if paperId missing, the player will show a helpful message)
  //     navigate(`/test-player/${a._id}${query ? `?${query}` : ""}`);
  //   } catch (err) {
  //     console.error("Failed to start assignment:", err);
  //     // Fallback: still open player with whatever we have
  //     navigate(`/test-player/${a._id}`);
  //   } finally {
  //     setStartingId(null);
  //   }
  // };

  const handleStartAssignment = async (a) => {
    try {
      setStartingId(a._id);

      // status from your existing helper
      const stat = deriveStatus(a);

      // resolve test id just like before
      let paperId =
        getPaperIdFromRow(a) || (await fetchPaperIdFromDetail(a._id));

      if (stat === "assigned") {
        // route to instructions gate (no alerts)
        const qs = new URLSearchParams(
          Object.fromEntries(
            Object.entries({ testId: paperId || undefined }).filter(
              ([, v]) => !!v
            )
          )
        ).toString();
        navigate(`/test-instructions/${a._id}${qs ? `?${qs}` : ""}`);
        return;
      }

      // for in-progress/completed keep your existing direct open flow
      let attemptId = null;
      try {
        const res = await fetch(`${API}/assignments/${a._id}/start`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ testId: paperId || undefined }),
        });
        if (res.ok) {
          const data = await res.json();
          attemptId =
            data?.attemptId || data?.data?._id || data?.attempt?._id || null;
          paperId =
            paperId ||
            data?.test ||
            data?.testId ||
            data?.exam ||
            data?.paper ||
            data?.data?.test ||
            data?.data?.testId;
        }
      } catch {}

      const qs = new URLSearchParams(
        Object.fromEntries(
          Object.entries({ testId: extractId(paperId), attemptId }).filter(
            ([, v]) => !!v
          )
        )
      ).toString();
      navigate(`/test-player/${a._id}${qs ? `?${qs}` : ""}`);
    } finally {
      setStartingId(null);
    }
  };

  /** -------- referral handler -------- */
  const handleUseReferral = async () => {
    if (!referralInput.trim()) {
      alert("Please enter a referral code.");
      return;
    }
    try {
      const res = await fetch(`${API}/auth/use-referral`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          referralCode: referralInput.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(`✅ ${data.msg}`);
        if (data.updatedCredits) {
          setUser((prev) => ({ ...prev, credits: data.updatedCredits }));
        }
        setReferralInput("");
      } else {
        alert(`❌ ${data.msg}`);
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    }
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser?._id) return;

    fetch("http://127.0.0.1:5000/api/pdf-evaluations/student", {
      credentials: "include",
      headers: {
        "x-user-role": "student",
        "x-user-id": loggedInUser._id,
      },
    })
      .then((r) => r.json())
      .then((d) => setResultCount(d.count || 0))
      .catch(() => {});
  }, []);

  return (
    <div className="themebody-wrap">
      <PageBreadcrumb pagename="Student Dashboard" />
      <div className="theme-body">
        <Container fluid className="cdxuser-profile">
          <Row className="mb-4">
            <Col xl={12}>
              <Card>
                <Card.Header className="d-flex align-items-center justify-content-between">
                  {/* <div>
    <h4 className="mb-0">Your Profile & Referral</h4>
    <small className="text-muted">
      <strong>Credits:</strong> {user?.credits ?? "—"}
    </small>
  </div> */}

                  <button
                    className="btn btn-primary"
                    onClick={() => setShowCreditsModal(true)}
                  >
                    View Credits
                  </button>
                  {/* ///////Adjust code//



  //////////aaa/// */}
                  <div className="d-flex gap-2">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      as={Link}
                      to="/my-assignments"
                    >
                      <FeatherIcon icon="list" className="me-2" />
                      My Assignments
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-success"
                      as={Link}
                      to="/assign-test"
                    >
                      <FeatherIcon icon="send" className="me-2" />
                      Assignments Hub
                    </Button>
                    <Button
                      variant="outline-success"
                      className="position-relative"
                      onClick={() => navigate("/student/results")}
                    >
                      📄 Evaluation Results
                      {resultCount > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {resultCount}
                        </span>
                      )}
                    </Button>
                    <Button
                      variant="outline-primary"
                      onClick={() => navigate("/student/classes")}
                    >
                      📚 Study Materials
                    </Button>
                    {/* New Chat Button for Student */}
                    <Button
                      size="sm"
                      variant="outline-info"
                      as={Link}
                      to="/all-chats"
                    >
                      <FeatherIcon icon="message-square" className="me-2" />
                      Chat
                    </Button>
                  </div>
                </Card.Header>

                {/* <Card.Body>
                  {loadingUser ? (
                    <div className="text-center">
                      <Spinner animation="border" />
                    </div>
                  ) : user ? (
                    <Row>
                  

                     
                    </Row>
                  ) : (
                    <p className="text-danger">User data not found</p>
                  )}
                </Card.Body> */}

                <Modal
                  show={showCreditsModal}
                  onHide={() => setShowCreditsModal(false)}
                  size="lg"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title className="mb-0">
                      Referral & Benefits
                      <span style={{ marginLeft: "420px" }}>
                        Credits: {doctor?.credits}
                      </span>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div
                      className="d-flex justify-content-center gap-3 mb-3"
                      style={{
                        backgroundColor: "rgba(102, 151, 159, 0.2)",
                        padding: "10px",
                        borderRadius: "5px",
                      }}
                    >
                      <h5
                        style={{
                          backgroundColor:
                            activeTab === "avail" ? "#F1FCFE" : "transparent",
                          cursor: "pointer",
                          width: "300px",
                          textAlign: "center",
                          padding: "10px 20px",
                          borderRadius: "5px",
                        }}
                        onClick={() => setActiveTab("avail")}
                      >
                        Avail Benefits
                      </h5>
                      <h5
                        style={{
                          backgroundColor:
                            activeTab === "refer" ? "#F1FCFE" : "transparent",
                          cursor: "pointer",
                          width: "300px",
                          textAlign: "center",
                          padding: "10px 20px",
                          borderRadius: "5px",
                        }}
                        onClick={() => setActiveTab("refer")}
                      >
                        Refer & Earn
                      </h5>
                    </div>

                    {activeTab === "avail" && (
                      <>
                        <div className="d-flex align-items-center gap-2 justify-content-center">
                          <span className="badge bg-primary fs-15">
                            {doctor?.yourReferralCode || doctor?.referralCode}
                          </span>
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                doctor?.yourReferralCode || doctor?.referralCode
                              );
                              alert("Referral code copied!");
                            }}
                          >
                            Copy Code
                          </button>
                        </div>
                        <div className="mt-4 text-center">
                          <p>Enter your friend’s referral code:</p>
                          <div className="d-flex justify-content-center">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Referral Code"
                              value={referralInput}
                              onChange={(e) => setReferralInput(e.target.value)}
                              style={{ width: "350px" }}
                            />
                          </div>
                          <div style={{ marginTop: 15 }}>
                            <button
                              className="btn btn-success"
                              style={{ width: "200px", marginTop: 15 }}
                              onClick={handleUseReferral}
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {activeTab === "refer" && (
                      <div className="mt-3">
                        <div className="d-flex align-items-center gap-3 mt-3">
                          <label style={{ width: "250px" }}>
                            <strong>Name:</strong>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Name"
                            value={referEmail}
                            onChange={(e) => setReferEmail(e.target.value)}
                            style={{ width: "350px" }}
                          />
                        </div>
                        <div className="d-flex align-items-center gap-3 mt-3">
                          <label style={{ width: "250px" }}>
                            <strong>Friend's Email ID:</strong>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Email ID"
                            value={referEmail}
                            onChange={(e) => setReferEmail(e.target.value)}
                            style={{ width: "350px" }}
                          />
                        </div>
                        <div className="d-flex align-items-center gap-3 mt-3">
                          <label style={{ width: "250px" }}>
                            <strong>Friend's Mobile Number:</strong>
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            placeholder="Enter Mobile Number"
                            value={referMobile}
                            onChange={(e) => setReferMobile(e.target.value)}
                            style={{ width: "350px" }}
                          />
                        </div>
                        <div className="d-flex justify-content-center">
                          <button
                            className="btn btn-success"
                            style={{ width: "200px", marginTop: "25px" }}
                            onClick={() =>
                              alert(`Refer to ${referEmail}, ${referMobile}`)
                            }
                          >
                            Refer
                          </button>
                        </div>
                      </div>
                    )}
                  </Modal.Body>
                </Modal>
              </Card>
            </Col>
          </Row>

          <StudentClassesCard />

          {/* ===== Summary counters (deep-link to filtered list) ===== */}
          {/* <Row className="mb-4">
            <Col xl={12}>
              <AssignedTestsSummary />
            </Col>
          </Row> */}

          {/* ========================== ASSIGNED TESTS ========================== */}
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <h4 className="mb-0">Assigned Tests</h4>
                <Badge bg={assignments.length ? "primary" : "secondary"}>
                  {assignments.length}{" "}
                  {assignments.length === 1 ? "Test" : "Tests"}
                </Badge>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={fetchAssignments}
                >
                  <FeatherIcon icon="refresh-cw" className="me-2" />
                  Refresh
                </Button>

                <Button
                  onClick={() => navigate("/my-assignments")}
                  size="sm"
                  variant="outline-primary"
                >
                  View All
                </Button>
              </div>
            </Card.Header>

            <Card.Body>
              {assignErr ? (
                <div className="alert alert-warning py-2">{assignErr}</div>
              ) : assignLoading ? (
                <div className="text-center">
                  <Spinner animation="border" />
                </div>
              ) : assignments.length === 0 ? (
                <div className="text-muted">
                  No tests assigned yet. If a mentor assigns one, it will appear
                  here.
                </div>
              ) : (
                <>
                  <div className="table-responsive">
                    <Table hover className="align-middle">
                      <thead>
                        <tr>
                          <th>Subjects</th>
                          <th>Type</th>
                          <th>Class</th>
                          <th>Assigned By</th>
                          <th>Due</th>
                          <th>Status</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {assignments.slice(0, 3).map((a) => {
                          const t = pickTestObj(a) || {};
                          const due = asLocale(a?.dueAt);
                          const stat = deriveStatus(a); // <-- now using server truth
                          const assignee = pickAssignee(a);
                          const statusVariant =
                            stat === "completed"
                              ? "success"
                              : stat === "in_progress"
                              ? "info"
                              : "warning";

                          return (
                            <tr key={a._id}>
                              <td>{renderSubjects(a, t)}</td>
                              <td>
                                <Badge bg="dark">{renderType(a, t)}</Badge>
                              </td>
                              <td>
                                <Badge bg="secondary">
                                  {renderClass(a, t)}
                                </Badge>
                              </td>
                              <td>
                                <span className="fw-medium">{assignee}</span>
                              </td>
                              <td>{due}</td>
                              <td>
                                <Badge bg={statusVariant}>
                                  {stat === "in_progress"
                                    ? "In Progress"
                                    : stat === "completed"
                                    ? "Completed"
                                    : "Assigned"}
                                </Badge>
                              </td>
                              <td className="text-end">
                                {isPdfSubjective(a) ? (
                                  <Button
                                    size="sm"
                                    variant={
                                      stat === "completed"
                                        ? "outline-secondary"
                                        : stat === "in_progress"
                                        ? "info"
                                        : "primary"
                                    }
                                    onClick={() => {
                                      const stat = deriveStatus(a);
                                      if (stat === "completed") {
                                        // later you can open a "view submitted PDF" modal
                                        return;
                                      }
                                      setActivePdfAssignment(a);
                                      setAnswerPdf(null);
                                      setShowPdfModal(true);
                                    }}
                                  >
                                    {stat === "completed" ? (
                                      "Review"
                                    ) : stat === "in_progress" ? (
                                      <>
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
                                          "Continue"
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        {startingId === a._id ? (
                                          <>
                                            <Spinner
                                              animation="border"
                                              size="sm"
                                              className="me-2"
                                            />
                                            Starting…
                                          </>
                                        ) : (
                                          "Start"
                                        )}
                                      </>
                                    )}
                                  </Button>
                                ) : stat === "completed" ? (
                                  <Link
                                    className="btn btn-sm btn-outline-secondary"
                                    to={`/test-player/${a._id}`}
                                  >
                                    Review
                                  </Link>
                                ) : stat === "in_progress" ? (
                                  <Button
                                    size="sm"
                                    variant="info"
                                    onClick={() => handleStartAssignment(a)}
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
                                      "Continue"
                                    )}
                                  </Button>
                                ) : (
                                  <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={() => handleStartAssignment(a)}
                                    disabled={startingId === a._id}
                                  >
                                    {startingId === a._id ? (
                                      <>
                                        <Spinner
                                          animation="border"
                                          size="sm"
                                          className="me-2"
                                        />
                                        Starting…
                                      </>
                                    ) : (
                                      "Start"
                                    )}
                                  </Button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </>
              )}

              {/* ---- Debug inspector (toggle) ---- */}
              <Collapse in={showDebug}>
                <div className="mt-3">
                  <Card bg="light" body className="border">
                    {/* <div className="d-flex justify-content-between align-items-center">
                      <strong>Assignments Debug Sample</strong>
                      <small className="text-muted">
                        (showing the first item only)
                      </small>
                    </div> */}
                    {/* <pre
                      className="mt-2"
                      style={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        fontSize: 12,
                        maxHeight: 300,
                        overflow: "auto",
                        background: "#f8f9fa",
                        padding: 12,
                        borderRadius: 8,
                        border: "1px solid #e9ecef",
                      }}
                    >
                 {JSON.stringify(rawSample, null, 2)}
                    </pre> */}
                    <div className="mt-2 text-muted" style={{ fontSize: 12 }}>
                      <div>
                        Detected test path:{" "}
                        <code>
                          assignment.test || assignment.testId ||
                          assignment.exam
                        </code>
                      </div>
                      <div>
                        Detected subjects path (fallbacks too):{" "}
                        <code>
                          test.subjects | test.subjectNames | test.tags |
                          assignment.subjects | assignment.subjectNames |
                          assignment.subject | assignment.tags
                        </code>
                      </div>
                      <div>
                        Detected class path (fallbacks too):{" "}
                        <code>
                          test.class | className | klass | grade | standard (and
                          same on assignment)
                        </code>
                      </div>
                      <div>
                        Detected type path (fallbacks too):{" "}
                        <code>
                          test.testType | type | mode | format (and same on
                          assignment)
                        </code>
                      </div>
                      <div>
                        On Start/Continue: resolve <code>testId</code> → POST{" "}
                        <code>/assignments/:id/start</code> → navigate to{" "}
                        <code>
                          /test-player/:assignmentId?testId=&amp;attemptId=
                        </code>
                      </div>
                    </div>
                  </Card>
                </div>
              </Collapse>
            </Card.Body>
          </Card>

          {/* ========================== THE REST OF YOUR EXISTING UI ========================== */}
          <Row>
            <Col xxl={4} xl={12}>
              <Row>
                <Col xxl={12} md={6}>
                  <Card className="doctor-probox">
                    <Card.Body>
                      <div className="img-wrap" />
                      <div className="profile-head">
                        <div className="proimg-wrap">
                          <img
                            src={
                              user?.profileImage
                                ? user.profileImage.startsWith(
                                    "/profilePhotoUploads"
                                  )
                                  ? `http://localhost:5000${user.profileImage}`
                                  : `${
                                      import.meta.env.BASE_URL
                                    }default-avatar.png`
                                : `${
                                    import.meta.env.BASE_URL
                                  }default-avatar.png`
                            }
                            alt="Profile"
                            className="profile-pic"
                          />
                        </div>
                        <h4>{user?.name || "—"}</h4>
                        <span>{user?.role || "—"}</span>
                        <h6 className="mb-0 ms-2">
                          <a href={`mailto:${user?.email || ""}`}>
                            {user?.email || "—"}
                          </a>
                        </h6>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>

            <Col xxl={8} xl={12}>
              <Row>
                <Col xl={12}>
                  <Card>
                    <Card.Header>
                      <h4>Mentor Visits</h4>
                    </Card.Header>
                    <Card.Body>
                      <div className="table-responsive">
                        <Table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Mentor</th>
                              <th>Email</th>
                              <th>Specialization</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loadingMentorVisits ? (
                              <tr>
                                <td colSpan={6} className="text-center">
                                  <Spinner animation="border" size="sm" />
                                </td>
                              </tr>
                            ) : mentorVisits.length === 0 ? (
                              <tr>
                                <td
                                  colSpan={6}
                                  className="text-center text-muted"
                                >
                                  No mentor interactions yet
                                </td>
                              </tr>
                            ) : (
                              mentorVisits.map((mentor, index) => (
                                <tr key={index}>
                                  {/* Mentor */}
                                  <td>{mentor.name}</td>
                                  <td>{mentor.email}</td>

                                  {/* Specialization */}
                                  <td>{mentor.specialization || "—"}</td>

                                  {/* Action */}
                                  <td>
                                    <Button
                                      size="sm"
                                      variant="outline-primary"
                                      onClick={() =>
                                        navigate(`/chat/${mentor.email}`, {
                                          state: {
                                            mentorName: mentor.name, // ✅ PASS NAME
                                          },
                                        })
                                      }
                                    >
                                      Chat
                                    </Button>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Modal
          show={showPdfModal}
          onHide={() => setShowPdfModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Subjective Test (PDF)</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {activePdfAssignment && (
              <>
                {/* Question PDF */}
                <div className="mb-3">
                  <strong>Question Paper</strong>
                  <div className="mt-2">
                    <a
                      href={getQuestionPdfUrl(activePdfAssignment)}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-primary btn-sm"
                    >
                      View PDF
                    </a>
                  </div>
                </div>

                {/* Answer Upload */}
                <Form.Group>
                  <Form.Label>Upload Answer Sheet (PDF)</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setAnswerPdf(e.target.files[0])}
                  />
                </Form.Group>
              </>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowPdfModal(false)}>
              Cancel
            </Button>
            <Button
              variant="success"
              disabled={
                !answerPdf ||
                submittingPdf ||
                deriveStatus(activePdfAssignment) === "completed"
              }
              onClick={async () => {
                try {
                  setSubmittingPdf(true);
                  const fd = new FormData();
                  fd.append("answerPdf", answerPdf);

                  await fetch(
                    `${API}/assignments/${activePdfAssignment._id}/submit-pdf`,
                    { method: "POST", body: fd }
                  );

                  setShowPdfModal(false);
                  fetchAssignments(); // refresh dashboard
                } catch (e) {
                  alert("Submission failed");
                } finally {
                  setSubmittingPdf(false);
                }
              }}
            >
              {submittingPdf ? "Submitting..." : "Submit"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
