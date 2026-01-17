// import { useEffect, useState } from "react";

// export default function AdminMentorRequests() {
//   const [mentors, setMentors] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // fetch pending mentors
//   useEffect(() => {
//     fetch("http://127.0.0.1:5000/api/mentor/pending")
//       .then((res) => res.json())
//       .then((data) => {
//         setMentors(data);
//         setLoading(false);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   // approve or reject mentor
// const updateStatus = async (id, status) => {
//   try {
//     const res = await fetch(`http://127.0.0.1:5000/api/mentor/mentor-status/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ mentorStatus: status }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(`❌ ${data.error || "Something went wrong"}`);
//       return;
//     }

//     alert(`Mentor ${status}`);

//     // Only remove from list if approved or rejected
//     if (status === "approved" || status === "rejected") {
//       setMentors((prev) => prev.filter((m) => m._id !== id));
//     }
//     // If status is verifyDocs, keep in the list
//   } catch (err) {
//     console.error(err);
//     alert("Server error. Please try again.");
//   }
// };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="container mt-99">
//       <h1>Mentor Requests</h1>
//       {mentors.length === 0 && <p>No pending requests</p>}

//       <table className="table table-bordered mt-3">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Mobile No</th>
//             <th>DOB</th>
//             <th>Gender</th>
//             <th>City</th>
//             <th>State</th>
//             <th>Country</th>
//             <th>Postal Code</th>
//             <th>Address</th>
//             <th>Bio</th>
//             <th>Experience</th>
//             <th>Abilities</th>
//             <th>Specialized In</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {mentors.map((mentor) => (
//             <tr key={mentor._id}>
//               <td>{mentor?.name || "-"}</td>
//               <td>{mentor?.email || "-"}</td>
//               <td>{mentor?.mobileNo || "-"}</td>
//               <td>
//                 {mentor?.dob ? new Date(mentor.dob).toLocaleDateString() : "-"}
//               </td>
//               <td>{mentor?.gender || "-"}</td>
//               <td>{mentor?.city || "-"}</td>
//               <td>{mentor?.state || "-"}</td>
//               <td>{mentor?.country || "-"}</td>
//               <td>{mentor?.postalCode || "-"}</td>
//               <td>{mentor?.address || "-"}</td>
//               <td>{mentor?.bio || "-"}</td>
//               <td>{mentor?.experience || "-"}</td>
//               <td>
//                 {Array.isArray(mentor?.mentorAbilities)
//                   ? mentor.mentorAbilities.join(", ")
//                   : mentor?.mentorAbilities || "-"}
//               </td>
//               <td>
//                 {Array.isArray(mentor?.specializedIn)
//                   ? mentor.specializedIn.join(", ")
//                   : mentor?.specializedIn || "-"}
//               </td>
//               <td>
//                 <button
//                   className="btn btn-success btn-sm me-2"
//                   onClick={() => updateStatus(mentor._id, "approved")}
//                 >
//                   Approve
//                 </button>
//                 <button
//                   className="btn btn-danger btn-sm me-2"
//                   onClick={() => updateStatus(mentor._id, "rejected")}
//                 >
//                   Reject
//                 </button>
//                 <button
//                   className="btn btn-warning btn-sm"
//                   onClick={() => updateStatus(mentor._id, "verifyDocs")}
//                 >
//                   Verify Degree
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";

// export default function AdminMentorRequests() {
//   const [mentors, setMentors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState({
//     id: null, // mentor id
//     type: null, // approved | rejected | verifyDocs
//   });

//   // fetch pending mentors
//   useEffect(() => {
//     fetch("http://127.0.0.1:5000/api/mentor/pending")
//       .then((res) => res.json())
//       .then((data) => {
//         setMentors(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   // approve / reject / verify
//   const updateStatus = async (id, status) => {
//     try {
//       setActionLoading({ id, type: status });

//       const res = await fetch(
//         `http://127.0.0.1:5000/api/mentor/mentor-status/${id}`,
//         {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ mentorStatus: status }),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         alert(`❌ ${data.error || "Something went wrong"}`);
//         return;
//       }

//       alert(`Mentor ${status}`);

//       // ✅ APPROVE / REJECT → remove row
//       if (status === "approved" || status === "rejected") {
//         setMentors((prev) => prev.filter((m) => m._id !== id));
//       }

//       // ✅ VERIFY DOCS → update status locally
//       if (status === "verifyDocs") {
//         setMentors((prev) =>
//           prev.map((m) =>
//             m._id === id ? { ...m, mentorStatus: "verifyDocs" } : m
//           )
//         );
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error. Please try again.");
//     } finally {
//       setActionLoading({ id: null, type: null });
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="themebody-wrap" style={{ marginTop: 120 }}>
//       <h1>Mentor Requests</h1>

//       {/* ✅ ONLY MESSAGE WHEN NO REQUESTS */}
//       {mentors.length === 0 ? (
//         <div
//           style={{
//             marginTop: 40,
//             textAlign: "center",
//             fontSize: 18,
//             color: "#777",
//           }}
//         >
//           No pending requests
//         </div>
//       ) : (
//         /* ✅ TABLE SHOW ONLY WHEN DATA EXISTS */
//         <table className="table table-bordered mt-3">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Mobile No</th>
//               <th>DOB</th>
//               <th>Gender</th>
//               <th>City</th>
//               <th>State</th>
//               <th>Country</th>
//               <th>Postal Code</th>
//               <th>Address</th>
//               <th>Bio</th>
//               <th>Experience</th>
//               <th>Abilities</th>
//               <th>Specialized In</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {mentors.map((mentor) => (
//               <tr key={mentor._id}>
//                 <td>{mentor?.name || "-"}</td>
//                 <td>{mentor?.email || "-"}</td>
//                 <td>{mentor?.mobileNo || "-"}</td>
//                 <td>
//                   {mentor?.dob
//                     ? new Date(mentor.dob).toLocaleDateString()
//                     : "-"}
//                 </td>
//                 <td>{mentor?.gender || "-"}</td>
//                 <td>{mentor?.city || "-"}</td>
//                 <td>{mentor?.state || "-"}</td>
//                 <td>{mentor?.country || "-"}</td>
//                 <td>{mentor?.postalCode || "-"}</td>
//                 <td>{mentor?.address || "-"}</td>
//                 <td>{mentor?.bio || "-"}</td>
//                 <td>{mentor?.experience || "-"}</td>
//                 <td>
//                   {Array.isArray(mentor?.mentorAbilities)
//                     ? mentor.mentorAbilities.join(", ")
//                     : mentor?.mentorAbilities || "-"}
//                 </td>
//                 <td>
//                   {Array.isArray(mentor?.specializedIn)
//                     ? mentor.specializedIn.join(", ")
//                     : mentor?.specializedIn || "-"}
//                 </td>
//                 <td>
//                   {mentor.mentorStatus === "verifyDocs" ? (
//                     <span className="badge bg-warning text-dark">
//                       Docs Requested
//                     </span>
//                   ) : (
//                     <span className="badge bg-secondary">Pending</span>
//                   )}
//                 </td>

//                 <td>
//                   <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
//                     <button
//                       className="btn btn-success btn-sm"
//                       disabled={actionLoading.id === mentor._id}
//                       onClick={() => updateStatus(mentor._id, "approved")}
//                     >
//                       {actionLoading.id === mentor._id &&
//                       actionLoading.type === "approved" ? (
//                         <span className="spinner-border spinner-border-sm"></span>
//                       ) : (
//                         "Approve"
//                       )}
//                     </button>

//                     <button
//                       className="btn btn-danger btn-sm"
//                       disabled={actionLoading.id === mentor._id}
//                       onClick={() => updateStatus(mentor._id, "rejected")}
//                     >
//                       {actionLoading.id === mentor._id &&
//                       actionLoading.type === "rejected" ? (
//                         <span className="spinner-border spinner-border-sm"></span>
//                       ) : (
//                         "Reject"
//                       )}
//                     </button>
//                   </div>

//                   <div style={{ display: "flex", justifyContent: "center" }}>
//                     <button
//                       className="btn btn-warning btn-sm"
//                       disabled={
//                         actionLoading.id === mentor._id ||
//                         mentor.mentorStatus === "verifyDocs"
//                       }
//                       onClick={() => updateStatus(mentor._id, "verifyDocs")}
//                     >
//                       {actionLoading.id === mentor._id &&
//                       actionLoading.type === "verifyDocs" ? (
//                         <span className="spinner-border spinner-border-sm"></span>
//                       ) : mentor.mentorStatus === "verifyDocs" ? (
//                         "Docs Requested"
//                       ) : (
//                         "Verify Degree"
//                       )}
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


import { useEffect, useMemo, useState } from "react";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function AdminMentorRequests() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({
    id: null,
    type: null,
  });

  // 🔎 search & filter
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all | pending | verifyDocs

  // fetch pending mentors
  useEffect(() => {
    fetch(`${API}/mentor/pending`)
      .then((res) => res.json())
      .then((data) => {
        setMentors(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // approve / reject / verify
  const updateStatus = async (id, status) => {
    try {
      setActionLoading({ id, type: status });

      const res = await fetch(
        `${API}/mentor/mentor-status/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mentorStatus: status }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      if (status === "approved" || status === "rejected") {
        setMentors((prev) => prev.filter((m) => m._id !== id));
      }

      if (status === "verifyDocs") {
        setMentors((prev) =>
          prev.map((m) =>
            m._id === id ? { ...m, mentorStatus: "verifyDocs" } : m
          )
        );
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setActionLoading({ id: null, type: null });
    }
  };

  // 🔥 SEARCH + FILTER LOGIC
  const filteredMentors = useMemo(() => {
    return mentors.filter((m) => {
      const text = `${m.name} ${m.email} ${m.city}`.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "pending"
          ? m.mentorStatus !== "verifyDocs"
          : m.mentorStatus === "verifyDocs";

      return matchesSearch && matchesStatus;
    });
  }, [mentors, search, statusFilter]);

  if (loading) return <p style={{ marginTop: 120 }}>Loading...</p>;

  return (
    <div className="themebody-wrap" style={{ marginTop: 120 }}>
      <h2 style={{ textAlign: "center" }}>Mentor Requests</h2>

      {/* 🔎 SEARCH + FILTER BAR */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 20,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search by name, email, city..."
          className="form-control"
          style={{ maxWidth: 300 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="form-select"
          style={{ maxWidth: 200 }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="verifyDocs">Docs Requested</option>
        </select>
      </div>

      {/* EMPTY STATE */}
      {filteredMentors.length === 0 ? (
        <div style={{ marginTop: 40, textAlign: "center", color: "#777" }}>
          No mentor requests found
        </div>
      ) : (
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            marginTop: 30,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(450px, 1fr))",
              gap: 20,
              justifyContent: "center",
            }}
          >
            {filteredMentors.map((mentor) => (
              <div
                key={mentor._id}
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: 16,
                  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                  border: "1px solid #eee",
                }}
              >
                {/* HEADER */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <div>
                    <h5 style={{ margin: 0 }}>{mentor.name || "No Name"}</h5>
                    <div style={{ fontSize: 13, color: "#666" }}>
                      {mentor.email}
                    </div>
                  </div>

                  <div>
                    {mentor.mentorStatus === "verifyDocs" ? (
                      <span className="badge bg-warning text-dark">
                        Docs Requested
                      </span>
                    ) : (
                      <span className="badge bg-secondary">Pending</span>
                    )}
                  </div>
                </div>

                {/* BODY GRID */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    rowGap: 8,
                    columnGap: 12,
                    fontSize: 14,
                  }}
                >
                  <div><b>Mobile:</b> {mentor.mobileNo || "-"}</div>
                  <div><b>Gender:</b> {mentor.gender || "-"}</div>

                  <div><b>DOB:</b> {mentor.dob ? new Date(mentor.dob).toLocaleDateString() : "-"}</div>
                  <div><b>Experience:</b> {mentor.experience || "-"} yrs</div>

                  <div><b>City:</b> {mentor.city || "-"}</div>
                  <div><b>State:</b> {mentor.state || "-"}</div>

                  <div style={{ gridColumn: "1 / -1" }}>
                    <b>Abilities:</b>{" "}
                    {Array.isArray(mentor.mentorAbilities)
                      ? mentor.mentorAbilities.join(", ")
                      : mentor.mentorAbilities || "-"}
                  </div>

                  <div style={{ gridColumn: "1 / -1" }}>
                    <b>Specialized In:</b>{" "}
                    {Array.isArray(mentor.specializedIn)
                      ? mentor.specializedIn.join(", ")
                      : mentor.specializedIn || "-"}
                  </div>
                </div>

                {/* ACTIONS */}
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    justifyContent: "flex-end",
                    marginTop: 14,
                  }}
                >
                  <button
                    className="btn btn-success btn-sm"
                    disabled={actionLoading.id === mentor._id}
                    onClick={() => updateStatus(mentor._id, "approved")}
                  >
                    {actionLoading.id === mentor._id &&
                    actionLoading.type === "approved" ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      "Approve"
                    )}
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    disabled={actionLoading.id === mentor._id}
                    onClick={() => updateStatus(mentor._id, "rejected")}
                  >
                    {actionLoading.id === mentor._id &&
                    actionLoading.type === "rejected" ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      "Reject"
                    )}
                  </button>

                  <button
                    className="btn btn-warning btn-sm"
                    disabled={
                      actionLoading.id === mentor._id ||
                      mentor.mentorStatus === "verifyDocs"
                    }
                    onClick={() => updateStatus(mentor._id, "verifyDocs")}
                  >
                    {actionLoading.id === mentor._id &&
                    actionLoading.type === "verifyDocs" ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : mentor.mentorStatus === "verifyDocs" ? (
                      "Docs Requested"
                    ) : (
                      "Verify Degree"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}