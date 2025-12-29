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


import { useEffect, useState } from "react";

export default function AdminMentorRequests() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch pending mentors
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/mentor/pending")
      .then((res) => res.json())
      .then((data) => {
        setMentors(data);
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
      const res = await fetch(
        `http://127.0.0.1:5000/api/mentor/mentor-status/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mentorStatus: status }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(`❌ ${data.error || "Something went wrong"}`);
        return;
      }

      alert(`Mentor ${status}`);

      if (status === "approved" || status === "rejected") {
        setMentors((prev) => prev.filter((m) => m._id !== id));
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="themebody-wrap" style={{ marginTop: 120 }}>
      <h1>Mentor Requests</h1>

      {/* ✅ ONLY MESSAGE WHEN NO REQUESTS */}
      {mentors.length === 0 ? (
        <div
          style={{
            marginTop: 40,
            textAlign: "center",
            fontSize: 18,
            color: "#777",
          }}
        >
          No pending requests
        </div>
      ) : (
        /* ✅ TABLE SHOW ONLY WHEN DATA EXISTS */
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Postal Code</th>
              <th>Address</th>
              <th>Bio</th>
              <th>Experience</th>
              <th>Abilities</th>
              <th>Specialized In</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {mentors.map((mentor) => (
              <tr key={mentor._id}>
                <td>{mentor?.name || "-"}</td>
                <td>{mentor?.email || "-"}</td>
                <td>{mentor?.mobileNo || "-"}</td>
                <td>
                  {mentor?.dob
                    ? new Date(mentor.dob).toLocaleDateString()
                    : "-"}
                </td>
                <td>{mentor?.gender || "-"}</td>
                <td>{mentor?.city || "-"}</td>
                <td>{mentor?.state || "-"}</td>
                <td>{mentor?.country || "-"}</td>
                <td>{mentor?.postalCode || "-"}</td>
                <td>{mentor?.address || "-"}</td>
                <td>{mentor?.bio || "-"}</td>
                <td>{mentor?.experience || "-"}</td>
                <td>
                  {Array.isArray(mentor?.mentorAbilities)
                    ? mentor.mentorAbilities.join(", ")
                    : mentor?.mentorAbilities || "-"}
                </td>
                <td>
                  {Array.isArray(mentor?.specializedIn)
                    ? mentor.specializedIn.join(", ")
                    : mentor?.specializedIn || "-"}
                </td>

                <td>
                  <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() =>
                        updateStatus(mentor._id, "approved")
                      }
                    >
                      Approve
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        updateStatus(mentor._id, "rejected")
                      }
                    >
                      Reject
                    </button>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() =>
                        updateStatus(mentor._id, "verifyDocs")
                      }
                    >
                      Verify Degree
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
