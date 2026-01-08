import { useEffect, useState } from "react";
import { Button, Badge, Spinner, Table } from "react-bootstrap";

export default function Appointments() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({
    id: null,
    action: null, // "accepted" | "rejected"
  });

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/appointments/my", {
      headers: { "x-user-id": user._id },
    })
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data.appointments || []);
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id, status) => {
    setActionLoading({ id, action: status });

    try {
      await fetch(`http://127.0.0.1:5000/api/appointments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user._id,
        },
        body: JSON.stringify({ status }),
      });

      setAppointments((prev) => {
        if (user.role === "mentor" && status === "rejected") {
          return prev.filter((a) => a._id !== id);
        }

        return prev.map((a) => (a._id === id ? { ...a, status } : a));
      });
    } finally {
      setActionLoading({ id: null, action: null });
    }
  };

  const badgeVariant = (status) => {
    if (status === "accepted") return "success";
    if (status === "rejected") return "danger";
    return "warning";
  };

  if (loading) return <Spinner className="mt-5" />;

  return (
    <div className="container mt-100">
      <h2 className="mb-30">📅 All Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-muted">No appointments found</p>
      ) : (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>{user.role === "mentor" ? "Student" : "Mentor"}</th>
              <th>Status</th>
              {user.role === "mentor" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a._id}>
                <td>{a.date}</td>

                <td>
                  {user.role === "mentor"
                    ? a.studentId?.name
                    : a.mentorId?.name}
                </td>

                <td>
                  <Badge bg={badgeVariant(a.status)}>{a.status}</Badge>
                </td>

                {user.role === "mentor" && (
                  <td>
                    {a.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="success"
                          disabled={actionLoading.id === a._id}
                          onClick={() => updateStatus(a._id, "accepted")}
                        >
                          {actionLoading.id === a._id &&
                          actionLoading.action === "accepted" ? (
                            <>
                              <Spinner
                                animation="border"
                                size="sm"
                                className="me-1"
                              />
                              Accepting...
                            </>
                          ) : (
                            "Accept"
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          disabled={actionLoading.id === a._id}
                          onClick={() => updateStatus(a._id, "rejected")}
                        >
                          {actionLoading.id === a._id &&
                          actionLoading.action === "rejected" ? (
                            <>
                              <Spinner
                                animation="border"
                                size="sm"
                                className="me-1"
                              />
                              Rejecting...
                            </>
                          ) : (
                            "Reject"
                          )}
                        </Button>
                      </>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
