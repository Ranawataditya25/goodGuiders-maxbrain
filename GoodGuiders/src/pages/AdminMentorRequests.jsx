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
      .catch((err) => console.error(err));
  }, []);

  // approve or reject mentor
  const updateStatus = (id, status) => {
    fetch(`http://127.0.0.1:5000/api/mentor/mentor-status/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mentorStatus: status }),
    })
      .then((res) => res.json())
      .then(() => {
        // update UI
        setMentors((prev) => prev.filter((m) => m._id !== id));
        alert(`Mentor ${status}`);
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-99">
      <h1>Mentor Requests</h1>
      {mentors.length === 0 && <p>No pending requests</p>}

      <table className="table table-bordered mt-9">
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

              {/* Handle array or string for abilities */}
              <td>
                {Array.isArray(mentor?.mentorAbilities)
                  ? mentor.mentorAbilities.join(", ")
                  : mentor?.mentorAbilities || "-"}
              </td>

              {/* Handle array or string for specializedIn */}
              <td>
                {Array.isArray(mentor?.specializedIn)
                  ? mentor.specializedIn.join(", ")
                  : mentor?.specializedIn || "-"}
              </td>

              
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => updateStatus(mentor._id, "approved")}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => updateStatus(mentor._id, "rejected")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
