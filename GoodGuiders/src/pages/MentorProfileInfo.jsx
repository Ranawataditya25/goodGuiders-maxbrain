// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Button, Modal, ListGroup, Spinner, Form } from "react-bootstrap";
// import IMAGE_URLS from "/src/pages/api/Imgconfig.js";
// import Calendar from "react-calendar";
// import axios from "axios";

// /* ---------- avatar helper (same pattern as students) ---------- */
// function getMentorAvatar(email = "") {
//   let hash = 0;
//   for (let i = 0; i < email.length; i++) {
//     hash = email.charCodeAt(i) + ((hash << 5) - hash);
//   }
//   const avatarIndex = Math.abs(hash % 10) + 1;
//   return IMAGE_URLS[`avtar/${avatarIndex}.jpg`];
// }

// export default function MentorProfileInfo() {
//   const { email } = useParams();
//   const navigate = useNavigate();

//   const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
//   const role = loggedInUser.role; // admin | student | mentor
//   const canView = role === "admin" || role === "student";

//   const [mentorDetails, setMentorDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [avgRating, setAvgRating] = useState(0);
//   const [ratingCount, setRatingCount] = useState(0);

//   /* ---------- rating modal ---------- */
//   const [showRatingModal, setShowRatingModal] = useState(false);
//   const [selectedRating, setSelectedRating] = useState(0);
//   const [comments, setComments] = useState([]);
//   const [comment, setComment] = useState("");
//   const [skip, setSkip] = useState(0);
//   const [totalComments, setTotalComments] = useState(0);
//   const LIMIT = 5;

//   /* ---------- messages modal (admin) ---------- */
//   const [showMessagesModal, setShowMessagesModal] = useState(false);
//   const [messagesLoading, setMessagesLoading] = useState(false);
//   const [messagesList, setMessagesList] = useState([]);
//   const [activeChatTitle, setActiveChatTitle] = useState("");

//   /* ---------- appointments ---------- */
//   const [appointments, setAppointments] = useState([]);
//   const [calendarLoading, setCalendarLoading] = useState(true);

//   /* ---------- helpers ---------- */
//   const sanitize = (s = "") =>
//     String(s)
//       .trim()
//       .toLowerCase()
//       .replace(/[^a-z0-9]/g, "_");

//   const makeUniqueName = (a = "", b = "") =>
//     [sanitize(a), sanitize(b)].sort().join("_");

//   const reloadRating = async () => {
//     const ratingRes = await fetch(
//       `http://127.0.0.1:5000/api/stats/mentor/${encodeURIComponent(
//         email
//       )}/rating`
//     );
//     const ratingData = await ratingRes.json();

//     setAvgRating(ratingData.avgRating || 0);
//     setRatingCount(ratingData.count || 0);
//   };

//   /* ---------- load mentor ---------- */
//   useEffect(() => {
//     async function loadData() {
//       setLoading(true);

//       const res = await fetch(
//         `http://127.0.0.1:5000/api/stats/mentor/${encodeURIComponent(
//           email
//         )}/details`
//       );
//       const data = await res.json();
//       setMentorDetails(data);

//       const ratingRes = await fetch(
//         `http://127.0.0.1:5000/api/stats/mentor/${encodeURIComponent(
//           email
//         )}/rating`
//       );
//       const ratingData = await ratingRes.json();
//       setAvgRating(ratingData.avgRating || 0);
//       setRatingCount(ratingData.count || 0);

//       setLoading(false);
//     }

//     loadData();
//     setComments([]);
//     setSkip(0);
//   }, [email]);

//   useEffect(() => {
//     loadComments();
//   }, [skip, email]);

//   const loadComments = async () => {
//     try {
//       const res = await fetch(
//         `http://127.0.0.1:5000/api/stats/mentor/${encodeURIComponent(
//           email
//         )}/comments?skip=${skip}&limit=${LIMIT}`
//       );
//       const data = await res.json();

//       setComments((prev) => [...prev, ...data.comments]);
//       setTotalComments(data.total);
//     } catch (err) {
//       console.error("Failed to load comments", err);
//     }
//   };

//   const deleteComment = async (id) => {
//     // 1️⃣ call backend
//     await fetch(`http://127.0.0.1:5000/api/stats/admin/mentor-comment/${id}`, {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         adminEmail: loggedInUser.email,
//       }),
//     });

//     // 2️⃣ optimistic UI update (NO refetch)
//     setComments((prev) => prev.filter((c) => c._id !== id));

//     // 3️⃣ update total count safely
//     setTotalComments((prev) => Math.max(prev - 1, 0));
//   };

//   /* ---------- admin: view messages ---------- */
//   const handleViewMessages = async (studentEmail, studentName) => {
//     const uniqueName = makeUniqueName(email, studentEmail);
//     setActiveChatTitle(`${mentor.name} ↔ ${studentName}`);
//     setShowMessagesModal(true);
//     setMessagesLoading(true);

//     const res = await fetch(
//       `http://127.0.0.1:5000/api/conversation/${encodeURIComponent(
//         uniqueName
//       )}/messages`
//     );
//     const data = await res.json();
//     setMessagesList(data.messages?.reverse() || []);
//     setMessagesLoading(false);
//   };

//   /* ---------- submit rating & comment---------- */
//   const submitRating = async () => {
//     // submit rating
//     await fetch(
//       `http://127.0.0.1:5000/api/stats/mentor/${encodeURIComponent(
//         email
//       )}/rate`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           studentEmail: loggedInUser.email,
//           rating: selectedRating,
//         }),
//       }
//     );

//     // submit comment
//     if (comment.trim()) {
//       await fetch(
//         `http://127.0.0.1:5000/api/stats/mentor/${encodeURIComponent(
//           email
//         )}/comment`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             studentEmail: loggedInUser.email,
//             studentName: loggedInUser.name,
//             comment,
//           }),
//         }
//       );
//     }

//     // reset modal
//     setShowRatingModal(false);
//     setSelectedRating(0);
//     setComment("");

//     // refresh UI immediately
//     await reloadRating(); // ⭐ FIX
//     setComments([]);
//     setSkip(0);
//     loadComments();
//   };

//   useEffect(() => {
//     if (!mentorDetails?.mentor?._id) return;

//     const loadAppointments = async () => {
//       setCalendarLoading(true);
//       try {
//         const res = await fetch(
//           `http://127.0.0.1:5000/api/appointments/mentor/${mentorDetails.mentor._id}`,
//           {
//             headers: {
//               "x-user-id": loggedInUser._id,
//             },
//           }
//         );

//         if (!res.ok) {
//           setAppointments([]);
//           return;
//         }

//         const data = await res.json();
//         setAppointments(data.appointments || []);
//       } catch (err) {
//         setAppointments([]);
//       } finally {
//         setCalendarLoading(false);
//       }
//     };

//     loadAppointments();
//   }, [mentorDetails?.mentor?._id]);

//   /* ---------- calendar helpers ---------- */
//   // const acceptedDates = appointments
//   //   .filter((a) => a.status === "accepted")
//   //   .map((a) => a.date);

//   const myPendingDates = appointments
//     .filter(
//       (a) =>
//         a.status === "pending" &&
//         String(a.studentId) === String(loggedInUser._id)
//     )
//     .map((a) => a.date);

//   const blockedDates = appointments
//     .filter((a) => {
//       if (a.status === "accepted") return true;
//       if (a.status === "pending" && a.studentId !== loggedInUser._id)
//         return true;
//       return false;
//     })
//     .map((a) => a.date);

//   const handleDateClick = async (date) => {
//     if (role !== "student") return;

//     const formatted = date.toLocaleDateString("en-CA");

//     const isAccepted = appointments.some(
//       (a) => a.date === formatted && a.status === "accepted"
//     );

//     if (isAccepted) {
//       alert("This appointment is already accepted and cannot be cancelled.");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:5000/api/appointments/request",
//         {
//           mentorId: mentorDetails?.mentor?._id,
//           date: formatted,
//         },
//         {
//           headers: {
//             "x-user-id": loggedInUser._id,
//           },
//         }
//       );

//       if (res.data.action === "booked") {
//         alert("Appointment requested");
//         setAppointments((prev) => [
//           ...prev,
//           {
//             date: formatted,
//             status: "pending",
//             studentId: loggedInUser._id,
//           },
//         ]);
//       }

//       if (res.data.action === "cancelled") {
//         alert("Appointment cancelled");
//         setAppointments((prev) =>
//           prev.filter(
//             (a) =>
//               !(
//                 a.date === formatted &&
//                 a.studentId === loggedInUser._id &&
//                 a.status === "pending"
//               )
//           )
//         );
//       }
//     } catch (err) {
//       alert(err.response?.data?.msg || "Failed");
//     }
//   };

//   if (loading)
//     return (
//       <div className="text-center mt-5">
//         <Spinner animation="border" />
//       </div>
//     );

//   if (!canView) return <p className="text-center mt-5">Access denied</p>;

//   /* ---------- safe destructuring ---------- */
//   const mentor = mentorDetails?.mentor || {};
//   const students = mentorDetails?.students || { count: 0, items: [] };

//   const calendarStyles = `
//   .react-calendar {
//     width: 100%;
//     background: white;
//     border-radius: 12px;
//     padding: 10px;
//     border: 1px solid #e5e7eb;
//   }

//   .react-calendar__navigation {
//     display: flex;
//     justify-content: space-between;
//     margin-bottom: 10px;
//   }

//   .react-calendar__month-view__days {
//     display: grid;
//     grid-template-columns: repeat(7, 1fr);
//   }

//   .react-calendar__tile {
//     padding: 10px 6px;
//     border-radius: 8px;
//     font-size: 14px;
//     text-align: center;
//   }

//   .react-calendar__tile--now {
//     background: #e7f1ff;
//     font-weight: bold;
//   }

//   .react-calendar__tile:hover {
//     background: #f1f3f5;
//   }

// .booked-date {
//   background: #ffa940 !important;   /* others pending / accepted */
//   color: white !important;
//   font-weight: bold;
// }

// .my-pending {
//   background: #3b82f6 !important;   /* your request */
//   color: white !important;
//   font-weight: bold;
// }
// `;

//   /* ================= UI ================= */
//   return (
//     <>
//       <div
//         className="themebody-wrap"
//         style={{ marginTop: 80, paddingBottom: 80 }}
//       >
//         {/* COVER */}
//         <div
//           style={{
//             height: 220,
//             background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//           }}
//         />

//         <div className="container" style={{ marginTop: -90 }}>
//           <div className="row g-4 align-items-start">
//             {/* ================= LEFT (STICKY) ================= */}
//             <div className="col-md-4">
//               <div
//                 className="card text-center p-15"
//                 style={{
//                   borderRadius: 14,
//                   boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
//                   position: "sticky",
//                   top: 110,
//                 }}
//               >
//                 <img
//                   src={getMentorAvatar(mentor.email)}
//                   className="rounded-circle mx-auto"
//                   style={{
//                     width: 120,
//                     height: 120,
//                     objectFit: "cover",
//                     border: "4px solid white",
//                   }}
//                   alt="mentor"
//                 />

//                 <h5 className="mt-3 mb-0 fw-bold">{mentor.name}</h5>

//                 <div className="text-warning small">
//                   ⭐ {avgRating.toFixed(1)}{" "}
//                   <span className="text-muted">({ratingCount})</span>
//                 </div>

//                 <p className="small text-muted">
//                   {mentor.specialization || "—"}
//                 </p>

//                 <div className="d-grid gap-2 mt-3">
//                   {role === "student" && (
//                     <Button
//                       size="sm"
//                       onClick={() =>
//                         navigate(`/chat/${mentor.email}`, {
//                           state: { mentorName: mentor.name },
//                         })
//                       }
//                     >
//                       💬 Chat
//                     </Button>
//                   )}

//                   {role === "student" && (
//                     <Button
//                       size="sm"
//                       variant="outline-warning"
//                       onClick={() => setShowRatingModal(true)}
//                     >
//                       ⭐ Rate
//                     </Button>
//                   )}

//                   {(role === "admin" || role === "student") && (
//                     <Button
//                       size="sm"
//                       variant="outline-secondary"
//                       onClick={() =>
//                         navigate(`/mentor/${email}/materials`, {
//                           state: { mentorName: mentor.name },
//                         })
//                       }
//                     >
//                       📚 Materials
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* ================= RIGHT (SPLIT CARDS) ================= */}
//             <div className="col-md-8">
//               {/* ABOUT */}
//               <div className="card shadow-sm p-15 mb-10">
//                 <h5 className="fw-bold mb-3">About Mentor</h5>
//                 <p className="text-muted">{mentor.bio || "No bio available"}</p>

//                 <div className="row g-3">
//                   <div className="col-md-6">
//                     <p>
//                       <strong>Email:</strong> {mentor.email}
//                     </p>
//                     <p>
//                       <strong>Experience:</strong> {mentor.experience || "-"}{" "}
//                       yrs
//                     </p>
//                     <p>
//                       <strong>Degree:</strong> {mentor.degree || "-"}
//                     </p>
//                   </div>
//                   <div className="col-md-6">
//                     <p>
//                       <strong>Specialization:</strong>{" "}
//                       {mentor.specialization || "-"}
//                     </p>
//                     <p>
//                       <strong>Status:</strong>{" "}
//                       <span
//                         className={`badge ${
//                           mentor.isDisabled ? "bg-danger" : "bg-success"
//                         }`}
//                       >
//                         {mentor.isDisabled ? "Disabled" : "Active"}
//                       </span>
//                     </p>
//                     {role !== "student" && (
//                       <p>
//                         <strong>Mobile:</strong> {mentor.mobileNo || "-"}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="card shadow-sm p-15 mb-10">
//                 <h5 className="fw-bold mb-15">📅 Book Appointment</h5>

//                 <style>{calendarStyles}</style>

//                 {calendarLoading ? (
//                   <div className="text-center">
//                     <Spinner animation="border" size="sm" />
//                   </div>
//                 ) : (
//                   <Calendar
//                     minDate={new Date()}
//                     onClickDay={handleDateClick}
//                     tileClassName={({ date }) => {
//                       const d = date.toLocaleDateString("en-CA");

//                       if (myPendingDates.includes(d)) return "my-pending";
//                       if (blockedDates.includes(d)) return "booked-date";
//                     }}
//                   />
//                 )}

//                 <div
//                   className="d-flex gap-2 flex-wrap mt-15"
//                   style={{ fontSize: 13 }}
//                 >
//                   <div className="d-flex align-items-center gap-2">
//                     <div
//                       style={{
//                         width: 14,
//                         height: 14,
//                         background: "#3b82f6",
//                         borderRadius: 4,
//                       }}
//                     />
//                     <span>Your requested date (click again to cancel)</span>
//                   </div>

//                   <div className="d-flex align-items-center gap-2">
//                     <div
//                       style={{
//                         width: 14,
//                         height: 14,
//                         background: "#ffa940",
//                         borderRadius: 4,
//                       }}
//                     />
//                     <span>Booked by someone else / Accepted</span>
//                   </div>

//                   <div className="d-flex align-items-center gap-2">
//                     <div
//                       style={{
//                         width: 14,
//                         height: 14,
//                         border: "1px solid #ccc",
//                         background: "#fff",
//                         borderRadius: 4,
//                       }}
//                     />
//                     <span>Available</span>
//                   </div>
//                 </div>

//                 {role !== "student" && (
//                   <p className="text-muted large mt-2">
//                     *Only students can request appointments.
//                   </p>
//                 )}
//               </div>

//               <div className="card shadow-sm p-15 mb-10">
//                 <h5 className="fw-bold mb-3">📝 Student Reviews</h5>

//                 {comments.length === 0 ? (
//                   <p className="text-muted">No comments yet</p>
//                 ) : (
//                   comments.map((c) => (
//                     <div key={c._id} className="border-bottom pb-2 mb-2">
//                       <div className="d-flex justify-content-between align-items-stretch">
//                         {/* LEFT: name + comment */}
//                         <div>
//                           <strong>{c.studentName}</strong>
//                           <p className="mb-1 mt-1">{c.comment}</p>
//                         </div>

//                         {/* RIGHT: delete button (centered vertically) */}
//                         {role === "admin" && (
//                           <div className="d-flex align-items-center">
//                             <Button
//                               size="sm"
//                               variant="danger"
//                               onClick={() => deleteComment(c._id)}
//                             >
//                               🗑
//                             </Button>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))
//                 )}

//                 {comments.length > 0 && comments.length < totalComments && (
//                   <Button
//                     variant="outline-secondary"
//                     onClick={() => setSkip((prev) => prev + LIMIT)}
//                   >
//                     View more
//                   </Button>
//                 )}
//               </div>

//               {/* CONNECTED STUDENTS */}
//               {role === "admin" && (
//                 <div className="card shadow-sm p-15 mb-10">
//                   <h5 className="fw-bold mb-3">👨‍🎓 Connected Students</h5>
//                   {students.count === 0 ? (
//                     <p className="text-muted">No students connected</p>
//                   ) : (
//                     <ListGroup>
//                       {students.items.map((s) => (
//                         <ListGroup.Item
//                           key={s.email}
//                           className="d-flex justify-content-between align-items-center"
//                         >
//                           {/* 👇 CLICKABLE STUDENT PROFILE */}
//                           <div
//                             className="d-flex align-items-center gap-2"
//                             style={{ cursor: "pointer" }}
//                             onClick={() =>
//                               navigate(
//                                 `/patient-info/${encodeURIComponent(s.email)}`
//                               )
//                             }
//                           >
//                             <img
//                               src={getMentorAvatar(s.email)}
//                               alt={s.name}
//                               style={{
//                                 width: 36,
//                                 height: 36,
//                                 borderRadius: "50%",
//                                 objectFit: "cover",
//                               }}
//                             />

//                             <div>
//                               <strong>{s.name}</strong>
//                               <div className="small text-muted">
//                                 {s.class || "-"}
//                               </div>
//                             </div>
//                           </div>

//                           {/* RIGHT: buttons */}
//                           <div className="d-flex gap-2">
//                             {/* ✅ VIEW PROFILE BUTTON */}
//                             <Button
//                               size="sm"
//                               variant="outline-secondary"
//                               onClick={() =>
//                                 navigate(
//                                   `/patient-info/${encodeURIComponent(s.email)}`
//                                 )
//                               }
//                             >
//                               View Profile
//                             </Button>

//                             {/* ADMIN CHAT */}
//                             <Button
//                               size="sm"
//                               variant="outline-primary"
//                               onClick={() =>
//                                 handleViewMessages(s.email, s.name)
//                               }
//                             >
//                               View Chat
//                             </Button>
//                           </div>
//                         </ListGroup.Item>
//                       ))}
//                     </ListGroup>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= RATING MODAL ================= */}
//       <Modal show={showRatingModal} onHide={() => setShowRatingModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Rate Mentor</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="text-center">
//           {[1, 2, 3, 4, 5].map((s) => (
//             <span
//               key={s}
//               style={{
//                 fontSize: 32,
//                 cursor: "pointer",
//                 color: s <= selectedRating ? "#ffc107" : "#ccc",
//               }}
//               onClick={() => setSelectedRating(s)}
//             >
//               ★
//             </span>
//           ))}

//           <Form.Control
//             as="textarea"
//             rows={3}
//             placeholder="Write a short comment (optional)"
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={submitRating} disabled={!selectedRating}>
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* ================= ADMIN CHAT MODAL ================= */}
//       <Modal
//         show={showMessagesModal}
//         onHide={() => setShowMessagesModal(false)}
//         size="lg"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>{activeChatTitle}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {messagesLoading && <Spinner />}
//           {messagesList.map((m, i) => (
//             <div key={i} className="mb-2">
//               <strong>{m.author}</strong>
//               <p className="mb-1">{m.body}</p>
//             </div>
//           ))}
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Modal, ListGroup, Spinner, Form } from "react-bootstrap";
import IMAGE_URLS from "/src/pages/api/Imgconfig.js";
import Calendar from "react-calendar";
import axios from "axios";
import MentorMaterialsInline from "../componets/MentorMaterialsInline.jsx";

/* ---------- avatar helper (same pattern as students) ---------- */
function getMentorAvatar(email = "") {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  const avatarIndex = Math.abs(hash % 10) + 1;
  return IMAGE_URLS[`avtar/${avatarIndex}.jpg`];
}

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function MentorProfileInfo() {
  const { email } = useParams();
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const role = loggedInUser.role; // admin | student | mentor
  const canView = role === "admin" || role === "student";

  const [mentorDetails, setMentorDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const [avgRating, setAvgRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);

  /* ---------- rating modal ---------- */
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [skip, setSkip] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const LIMIT = 5;

  /* ---------- messages modal (admin) ---------- */
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesList, setMessagesList] = useState([]);
  const [activeChatTitle, setActiveChatTitle] = useState("");

  /* ---------- appointments ---------- */
  const [appointments, setAppointments] = useState([]);
  const [calendarLoading, setCalendarLoading] = useState(true);

  /* ---------- helpers ---------- */
  const sanitize = (s = "") =>
    String(s)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_");

  const makeUniqueName = (a = "", b = "") =>
    [sanitize(a), sanitize(b)].sort().join("_");

  const reloadRating = async () => {
    const ratingRes = await fetch(
      `${API}/stats/mentor/${encodeURIComponent(
        email
      )}/rating`
    );
    const ratingData = await ratingRes.json();

    setAvgRating(ratingData.avgRating || 0);
    setRatingCount(ratingData.count || 0);
  };

  /* ---------- load mentor ---------- */
  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const res = await fetch(
        `${API}/stats/mentor/${encodeURIComponent(
          email
        )}/details`
      );
      const data = await res.json();
      setMentorDetails(data);

      const ratingRes = await fetch(
        `${API}/stats/mentor/${encodeURIComponent(
          email
        )}/rating`
      );
      const ratingData = await ratingRes.json();
      setAvgRating(ratingData.avgRating || 0);
      setRatingCount(ratingData.count || 0);

      setLoading(false);
    }

    loadData();
    setComments([]);
    setSkip(0);
  }, [email]);

  useEffect(() => {
    loadComments();
  }, [skip, email]);

  const loadComments = async () => {
    try {
      const res = await fetch(
        `${API}/stats/mentor/${encodeURIComponent(
          email
        )}/comments?skip=${skip}&limit=${LIMIT}`
      );
      const data = await res.json();

      setComments((prev) => [...prev, ...data.comments]);
      setTotalComments(data.total);
    } catch (err) {
      console.error("Failed to load comments", err);
    }
  };

  const deleteComment = async (id) => {
    // 1️⃣ call backend
    await fetch(`${API}/stats/admin/mentor-comment/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        adminEmail: loggedInUser.email,
      }),
    });

    // 2️⃣ optimistic UI update (NO refetch)
    setComments((prev) => prev.filter((c) => c._id !== id));

    // 3️⃣ update total count safely
    setTotalComments((prev) => Math.max(prev - 1, 0));
  };

  /* ---------- admin: view messages ---------- */
  const handleViewMessages = async (studentEmail, studentName) => {
    const uniqueName = makeUniqueName(email, studentEmail);
    setActiveChatTitle(`${mentor.name} ↔ ${studentName}`);
    setShowMessagesModal(true);
    setMessagesLoading(true);

    const res = await fetch(
      `${API}/conversation/${encodeURIComponent(
        uniqueName
      )}/messages`
    );
    const data = await res.json();
    setMessagesList(data.messages?.reverse() || []);
    setMessagesLoading(false);
  };

  /* ---------- submit rating & comment---------- */
  const submitRating = async () => {
    // submit rating
    await fetch(
      `${API}/stats/mentor/${encodeURIComponent(
        email
      )}/rate`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentEmail: loggedInUser.email,
          rating: selectedRating,
        }),
      }
    );

    // submit comment
    if (comment.trim()) {
      await fetch(
        `${API}/stats/mentor/${encodeURIComponent(
          email
        )}/comment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentEmail: loggedInUser.email,
            studentName: loggedInUser.name,
            comment,
          }),
        }
      );
    }

    // reset modal
    setShowRatingModal(false);
    setSelectedRating(0);
    setComment("");

    // refresh UI immediately
    await reloadRating(); // ⭐ FIX
    setComments([]);
    setSkip(0);
    loadComments();
  };

  useEffect(() => {
    if (!mentorDetails?.mentor?._id) return;

    const loadAppointments = async () => {
      setCalendarLoading(true);
      try {
        const res = await fetch(
          `${API}/appointments/mentor/${mentorDetails.mentor._id}`,
          {
            headers: {
              "x-user-id": loggedInUser._id,
            },
          }
        );

        if (!res.ok) {
          setAppointments([]);
          return;
        }

        const data = await res.json();
        setAppointments(data.appointments || []);
      } catch (err) {
        setAppointments([]);
      } finally {
        setCalendarLoading(false);
      }
    };

    loadAppointments();
  }, [mentorDetails?.mentor?._id]);

  /* ---------- calendar helpers ---------- */
  // const acceptedDates = appointments
  //   .filter((a) => a.status === "accepted")
  //   .map((a) => a.date);

  const myPendingDates = appointments
    .filter(
      (a) =>
        a.status === "pending" &&
        String(a.studentId) === String(loggedInUser._id)
    )
    .map((a) => a.date);

  const blockedDates = appointments
    .filter((a) => {
      if (a.status === "accepted") return true;
      if (a.status === "pending" && a.studentId !== loggedInUser._id)
        return true;
      return false;
    })
    .map((a) => a.date);

  const handleDateClick = async (date) => {
    if (role !== "student") return;

    const formatted = date.toLocaleDateString("en-CA");

    const isAccepted = appointments.some(
      (a) => a.date === formatted && a.status === "accepted"
    );

    if (isAccepted) {
      alert("This appointment is already accepted and cannot be cancelled.");
      return;
    }

    try {
      const res = await axios.post(
        `${API}/appointments/request`,
        {
          mentorId: mentorDetails?.mentor?._id,
          date: formatted,
        },
        {
          headers: {
            "x-user-id": loggedInUser._id,
          },
        }
      );

      if (res.data.action === "booked") {
        alert("Appointment requested");
        setAppointments((prev) => [
          ...prev,
          {
            date: formatted,
            status: "pending",
            studentId: loggedInUser._id,
          },
        ]);
      }

      if (res.data.action === "cancelled") {
        alert("Appointment cancelled");
        setAppointments((prev) =>
          prev.filter(
            (a) =>
              !(
                a.date === formatted &&
                a.studentId === loggedInUser._id &&
                a.status === "pending"
              )
          )
        );
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Failed");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  if (!canView) return <p className="text-center mt-5">Access denied</p>;

  /* ---------- safe destructuring ---------- */
  const mentor = mentorDetails?.mentor || {};
  const students = mentorDetails?.students || { count: 0, items: [] };

  const calendarStyles = `
  .react-calendar {
    width: 100%;
    background: white;
    border-radius: 12px;
    padding: 10px;
    border: 1px solid #e5e7eb;
  }

  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .react-calendar__month-view__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .react-calendar__tile {
    padding: 10px 6px;
    border-radius: 8px;
    font-size: 14px;
    text-align: center;
  }

  .react-calendar__tile--now {
    background: #e7f1ff;
    font-weight: bold;
  }

  .react-calendar__tile:hover {
    background: #f1f3f5;
  }

.booked-date {
  background: #ffa940 !important;   /* others pending / accepted */
  color: white !important;
  font-weight: bold;
}

.my-pending {
  background: #3b82f6 !important;   /* your request */
  color: white !important;
  font-weight: bold;
}
`;

  /* ================= UI ================= */
  return (
    <>
      <div
        className="themebody-wrap"
        style={{ marginTop: 80, paddingBottom: 80 }}
      >
        {/* COVER */}
        <div
          style={{
            height: 220,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        />

        <div className="container" style={{ marginTop: -90 }}>
          <div className="row g-4 align-items-start">
            {/* ================= LEFT (STICKY) ================= */}
            <div className="col-md-5">
              {/* <div
                className="card text-center p-15"
                style={{
                  borderRadius: 14,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  position: "sticky",
                  top: 110,
                }}
              > */}
              {/* <div
                      className="card p-15"
                      style={{
                        borderRadius: 14,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                        position: "sticky",
                        top: 110,
                        textAlign: "center",
                      }}
                    >

                <img
                  src={getMentorAvatar(mentor.email)}
                  className="rounded-circle mx-auto"
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: "cover",
                    border: "4px solid white",
                  }}
                  alt="mentor"
                />

                <h5 className="mt-3 mb-0 fw-bold">{mentor.name}</h5>

                <div className="text-warning small">
                  ⭐ {avgRating.toFixed(1)}{" "}
                  <span className="text-muted">({ratingCount})</span>
                </div>

                   <p>
                      <strong>Email:</strong> {mentor.email}
                    </p>

                      <p>
                      <strong>Experience:</strong> {mentor.experience || "-"}{" "}
                      yrs
                    </p>
                         <p>
                      <strong>Degree:</strong> {mentor.degree || "-"}
                    </p>

                       <p>
                      <strong>Specialization:</strong>{" "}
                      {mentor.specialization || "-"}
                    </p>
                        <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`badge ${
                          mentor.isDisabled ? "bg-danger" : "bg-success"
                        }`}
                      >
                        {mentor.isDisabled ? "Disabled" : "Active"}
                      </span>
                         <h5 className="fw-bold mb-3">About Mentor</h5>
                <p className="text-muted">{mentor.bio || "No bio available"}</p>
                    </p>


                <p className="small text-muted">
                  {mentor.specialization || "—"}
                </p>
             
                <div className="d-grid gap-2 mt-3">
                  {role === "student" && (
                    <Button
                      size="sm"
                      onClick={() =>
                        navigate(`/chat/${mentor.email}`, {
                          state: { mentorName: mentor.name },
                        })
                      }
                    >
                      💬 Chat
                    </Button>
                  )}

                  {role === "student" && (
                    <Button
                      size="sm"
                      variant="outline-warning"
                      onClick={() => setShowRatingModal(true)}
                    >
                      ⭐ Rate
                    </Button>
                  )}

                  {(role === "admin" || role === "student") && (
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() =>
                        navigate(`/mentor/${email}/materials`, {
                          state: { mentorName: mentor.name },
                        })
                      }
                    >
                      📚 Materials
                    </Button>
                  )}
                </div>
              </div> */}
              <div
                className="card p-4"
                style={{
                  borderRadius: 14,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  position: "sticky",
                  top: 110,
                  textAlign: "center",
                }}
              >
                <img
                  src={getMentorAvatar(mentor.email)}
                  className="rounded-circle mx-auto"
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: "cover",
                    border: "4px solid white",
                  }}
                  alt="mentor"
                />

                <h5 className="mt-3 mb-1 fw-bold">{mentor.name}</h5>

                <div className="text-warning mb-2">
                  ⭐ {avgRating.toFixed(1)}{" "}
                  <span className="text-muted">({ratingCount})</span>
                </div>

                {/* <div className="text-center mt-3" style={{ fontSize: 14 }}>
    <p className="mb-2"><strong>Email:</strong> {mentor.email}</p>
    <p className="mb-2"><strong>Experience:</strong> {mentor.experience || "-"} yrs</p>
    <p className="mb-2"><strong>Degree:</strong> {mentor.degree || "-"}</p>
    <p className="mb-2"><strong>Specialization:</strong> {mentor.specialization || "-"}</p>

    <p className="mb-2">
      <strong>Status:</strong>{" "}
      <span className={`badge ${mentor.isDisabled ? "bg-danger" : "bg-success"}`}>
        {mentor.isDisabled ? "Disabled" : "Active"}
      </span>
    </p>
  </div> */}
                {/* <div className="mt-3" style={{ fontSize: 14 }}>
  <table className="mx-auto" style={{ tableLayout: "fixed" }}>
    <tbody>
      <tr>
        <td style={{ width: 120, fontWeight: 600, textAlign: "left" }}>Email:</td>
        <td style={{ textAlign: "left" }}>{mentor.email}</td>
      </tr>

      <tr>
        <td style={{ width: 120, fontWeight: 600 }}>Experience:</td>
        <td>{mentor.experience || "-"} yrs</td>
      </tr>

      <tr>
        <td style={{ width: 120, fontWeight: 600 }}>Degree:</td>
        <td>{mentor.degree || "-"}</td>
      </tr>

      <tr>
        <td style={{ width: 120, fontWeight: 600 }}>Specialization:</td>
        <td>{mentor.specialization || "-"}</td>
      </tr>

      <tr>
        <td style={{ width: 120, fontWeight: 600 }}>Status:</td>
        <td>
          <span className={`badge ${mentor.isDisabled ? "bg-danger" : "bg-success"}`}>
            {mentor.isDisabled ? "Disabled" : "Active"}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</div> */}

                <hr />

                {/* <h6 className="fw-bold mb-2">About Mentor</h6>
  <p className="text-muted" style={{ fontSize: 14 }}>
    {mentor.bio || "No bio available"}
  </p> */}

                {/* <div className="d-grid gap-2 mt-3">
    {role === "student" && (
      <Button
        size="sm"
        onClick={() =>
          navigate(`/chat/${mentor.email}`, {
            state: { mentorName: mentor.name },
          })
        }
      >
        💬 Chat
      </Button>
    )}

    {role === "student" && (
      <Button
        size="sm"
        variant="outline-warning"
        onClick={() => setShowRatingModal(true)}
      >
        ⭐ Rate
      </Button>
    )}

    {(role === "admin" || role === "student") && (
      <Button
        size="sm"
        variant="outline-secondary"
        onClick={() =>
          navigate(`/mentor/${email}/materials`, {
            state: { mentorName: mentor.name },
          })
        }
      >
        📚 Materials
      </Button>
    )}
  </div> */}

                {/* <div className="d-flex flex-column align-items-center gap-2 mt-3">
  {role === "student" && (
    <Button
      size="sm"
      style={{ minWidth: 160 }}
      onClick={() =>
        navigate(`/chat/${mentor.email}`, {
          state: { mentorName: mentor.name },
        })
      }
    >
      💬 Chat
    </Button>
  )}

  {role === "student" && (
    <Button
      size="sm"
      variant="outline-warning"
      style={{ minWidth: 160 }}
      onClick={() => setShowRatingModal(true)}
    >
      ⭐ Rate
    </Button>
  )}

  {(role === "admin" || role === "student") && (
    <Button
      size="sm"
      variant="outline-secondary"
      style={{ minWidth: 160 }}
      onClick={() =>
        navigate(`/mentor/${email}/materials`, {
          state: { mentorName: mentor.name },
        })
      }
    >
      📚 Materials
    </Button>
  )}
</div> */}

                <div className="mt-3">
                  {/* Row: Chat + Rate */}
                  <div className="d-flex justify-content-center gap-2 mb-2">
                    {role === "student" && (
                      <Button
                        size="sm"
                        style={{ minWidth: 130 }}
                        onClick={() =>
                          navigate(`/chat/${mentor.email}`, {
                            state: { mentorName: mentor.name },
                          })
                        }
                      >
                        💬 Chat
                      </Button>
                    )}

                    {role === "student" && (
                      <Button
                        size="sm"
                        variant="outline-warning"
                        style={{ minWidth: 130 }}
                        onClick={() => setShowRatingModal(true)}
                      >
                        ⭐ Rate
                      </Button>
                    )}
                  </div>

                  {/* Row: Materials */}
                  {(role === "admin" || role === "student") && (
                    <div className="d-flex justify-content-center mt-12">
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        style={{ minWidth: 250 }}
                        onClick={() =>
                          navigate(`/mentor/${email}/materials`, {
                            state: { mentorName: mentor.name },
                          })
                        }
                      >
                        📚 Materials
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              {" "}
              <div className="card shadow-sm p-15 mb-10">
                <h5 className="fw-bold mb-3">About Mentor</h5>
                <p className="text-muted">{mentor.bio || "No bio available"}</p>

                <div className="row g-3">
                  <div className="col-md-6">
                    <p>
                      <strong>Email:</strong> {mentor.email}
                    </p>
                    <p>
                      <strong>Experience:</strong> {mentor.experience || "-"}{" "}
                      yrs
                    </p>
                    <p>
                      <strong>Degree:</strong> {mentor.degree || "-"}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Specialization:</strong>{" "}
                      {mentor.specialization || "-"}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`badge ${
                          mentor.isDisabled ? "bg-danger" : "bg-success"
                        }`}
                      >
                        {mentor.isDisabled ? "Disabled" : "Active"}
                      </span>
                    </p>
                    {role !== "student" && (
                      <p>
                        <strong>Mobile:</strong> {mentor.mobileNo || "-"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="card shadow-sm p-15 mb-10">
                <h5 className="fw-bold mb-3">📝 Student Reviews</h5>

                {comments.length === 0 ? (
                  <p className="text-muted">No comments yet</p>
                ) : (
                  comments.map((c) => (
                    <div key={c._id} className="border-bottom pb-2 mb-2">
                      <div className="d-flex justify-content-between align-items-stretch">
                        {/* LEFT: name + comment */}
                        <div>
                          <strong>{c.studentName}</strong>
                          <p className="mb-1 mt-1">{c.comment}</p>
                        </div>

                        {/* RIGHT: delete button (centered vertically) */}
                        {role === "admin" && (
                          <div className="d-flex align-items-center">
                            <Button
                              size="sm"
                              variant="outline-primary"
                              onClick={() => deleteComment(c._id)}
                            >
                              🗑
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}

                {comments.length > 0 && comments.length < totalComments && (
                  <Button
                    variant="outline-secondary"
                    onClick={() => setSkip((prev) => prev + LIMIT)}
                  >
                    View more
                  </Button>
                )}
              </div>
              {/* CONNECTED STUDENTS */}
              {role === "admin" && (
                <div className="card shadow-sm p-15 mb-10">
                  <h5 className="fw-bold mb-3">👨‍🎓 Connected Students</h5>
                  {students.count === 0 ? (
                    <p className="text-muted">No students connected</p>
                  ) : (
                    <ListGroup>
                      {students.items.map((s) => (
                        <ListGroup.Item
                          key={s.email}
                          className="d-flex justify-content-between align-items-center"
                        >
                          {/* 👇 CLICKABLE STUDENT PROFILE */}
                          <div
                            className="d-flex align-items-center gap-2"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigate(
                                `/patient-info/${encodeURIComponent(s.email)}`
                              )
                            }
                          >
                            <img
                              src={getMentorAvatar(s.email)}
                              alt={s.name}
                              style={{
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />

                            <div>
                              <strong>{s.name}</strong>
                              <div className="small text-muted">
                                {s.class || "-"}
                              </div>
                            </div>
                          </div>

                          {/* RIGHT: buttons */}
                          <div className="d-flex gap-2">
                            {/* ✅ VIEW PROFILE BUTTON */}
                            <Button
                              size="xs"
                              style={{ padding: "3px 8px", fontSize: 12 }}
                              variant="outline-secondary"
                              onClick={() =>
                                navigate(
                                  `/patient-info/${encodeURIComponent(s.email)}`
                                )
                              }
                            >
                              View Profile
                            </Button>

                            {/* ADMIN CHAT */}
                            <Button
                              size="xs"
                              style={{ padding: "3px 8px", fontSize: 12 }}
                              variant="outline-primary"
                              onClick={() =>
                                handleViewMessages(s.email, s.name)
                              }
                            >
                              View Chat
                            </Button>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </div>
              )}
            </div>

            {/* ================= RIGHT (SPLIT CARDS) ================= */}
            <div className="col-md-7">
              {/* <div className="card shadow-sm p-15 mb-10">
                <h5 className="fw-bold mb-3">About Mentor</h5>
                <p className="text-muted">{mentor.bio || "No bio available"}</p>

                <div className="row g-3">
                  <div className="col-md-6">
                    <p>
                      <strong>Email:</strong> {mentor.email}
                    </p>
                    <p>
                      <strong>Experience:</strong> {mentor.experience || "-"}{" "}
                      yrs
                    </p>
                    <p>
                      <strong>Degree:</strong> {mentor.degree || "-"}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Specialization:</strong>{" "}
                      {mentor.specialization || "-"}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`badge ${
                          mentor.isDisabled ? "bg-danger" : "bg-success"
                        }`}
                      >
                        {mentor.isDisabled ? "Disabled" : "Active"}
                      </span>
                    </p>
                    {role !== "student" && (
                      <p>
                        <strong>Mobile:</strong> {mentor.mobileNo || "-"}
                      </p>
                    )}
                  </div>
                </div>
              </div> */}

              <div className="card shadow-sm p-15 mb-10">
                <h5 className="fw-bold mb-15">📅 Book Appointment</h5>

                <style>{calendarStyles}</style>

                {calendarLoading ? (
                  <div className="text-center">
                    <Spinner animation="border" size="sm" />
                  </div>
                ) : (
                  <Calendar
                    minDate={new Date()}
                    onClickDay={handleDateClick}
                    tileClassName={({ date }) => {
                      const d = date.toLocaleDateString("en-CA");

                      if (myPendingDates.includes(d)) return "my-pending";
                      if (blockedDates.includes(d)) return "booked-date";
                    }}
                  />
                )}

                <div
                  className="d-flex gap-2 flex-wrap mt-15"
                  style={{ fontSize: 13 }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        background: "#3b82f6",
                        borderRadius: 4,
                      }}
                    />
                    <span>Your requested date (click again to cancel)</span>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        background: "#ffa940",
                        borderRadius: 4,
                      }}
                    />
                    <span>Booked by someone else / Accepted</span>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        border: "1px solid #ccc",
                        background: "#fff",
                        borderRadius: 4,
                      }}
                    />
                    <span>Available</span>
                  </div>
                </div>

                {role !== "student" && (
                  <p className="text-muted large mt-2">
                    *Only students can request appointments.
                  </p>
                )}
              </div>
              <div className="card shadow-sm p-15 mb-10">
                {(role === "admin" || role === "student") && (
                  <MentorMaterialsInline
                    mentorEmail={mentor.email}
                    mentorName={mentor.name}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RATING MODAL ================= */}
      <Modal show={showRatingModal} onHide={() => setShowRatingModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rate Mentor</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {[1, 2, 3, 4, 5].map((s) => (
            <span
              key={s}
              style={{
                fontSize: 32,
                cursor: "pointer",
                color: s <= selectedRating ? "#ffc107" : "#ccc",
              }}
              onClick={() => setSelectedRating(s)}
            >
              ★
            </span>
          ))}

          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Write a short comment (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submitRating} disabled={!selectedRating}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ================= ADMIN CHAT MODAL ================= */}
      <Modal
        show={showMessagesModal}
        onHide={() => setShowMessagesModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{activeChatTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {messagesLoading && <Spinner />}
          {messagesList.map((m, i) => (
            <div key={i} className="mb-2">
              <strong>{m.author}</strong>
              <p className="mb-1">{m.body}</p>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
}
