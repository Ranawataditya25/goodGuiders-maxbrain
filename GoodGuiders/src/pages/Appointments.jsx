// import { useEffect, useState } from "react";
// import { Button, Badge, Spinner, Table } from "react-bootstrap";

// export default function Appointments() {
//   const user = JSON.parse(localStorage.getItem("loggedInUser"));
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState({
//     id: null,
//     action: null, // "accepted" | "rejected"
//   });

//   useEffect(() => {
//     fetch("http://127.0.0.1:5000/api/appointments/my", {
//       headers: { "x-user-id": user._id },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setAppointments(data.appointments || []);
//         setLoading(false);
//       });
//   }, []);

//   const updateStatus = async (id, status) => {
//     setActionLoading({ id, action: status });

//     try {
//       await fetch(`http://127.0.0.1:5000/api/appointments/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           "x-user-id": user._id,
//         },
//         body: JSON.stringify({ status }),
//       });

//       setAppointments((prev) => {
//         if (user.role === "mentor" && status === "rejected") {
//           return prev.filter((a) => a._id !== id);
//         }

//         return prev.map((a) => (a._id === id ? { ...a, status } : a));
//       });
//     } finally {
//       setActionLoading({ id: null, action: null });
//     }
//   };

//   const badgeVariant = (status) => {
//     if (status === "accepted") return "success";
//     if (status === "rejected") return "danger";
//     return "warning";
//   };

//   if (loading) return <Spinner className="mt-5" />;

//   return (
//     <div className="container mt-100">
//       <h2 className="mb-30">📅 All Appointments</h2>

//       {appointments.length === 0 ? (
//         <p className="text-muted">No appointments found</p>
//       ) : (
//         <Table bordered hover responsive>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>{user.role === "mentor" ? "Student" : "Mentor"}</th>
//               <th>Status</th>
//               {user.role === "mentor" && <th>Action</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.map((a) => (
//               <tr key={a._id}>
//                 <td>{a.date}</td>

//                 <td>
//                   {user.role === "mentor"
//                     ? a.studentId?.name
//                     : a.mentorId?.name}
//                 </td>

//                 <td>
//                   <Badge bg={badgeVariant(a.status)}>{a.status}</Badge>
//                 </td>

//                 {user.role === "mentor" && (
//                   <td>
//                     {a.status === "pending" && (
//                       <>
//                         <Button
//                           size="sm"
//                           variant="success"
//                           disabled={actionLoading.id === a._id}
//                           onClick={() => updateStatus(a._id, "accepted")}
//                         >
//                           {actionLoading.id === a._id &&
//                           actionLoading.action === "accepted" ? (
//                             <>
//                               <Spinner
//                                 animation="border"
//                                 size="sm"
//                                 className="me-1"
//                               />
//                               Accepting...
//                             </>
//                           ) : (
//                             "Accept"
//                           )}
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="danger"
//                           disabled={actionLoading.id === a._id}
//                           onClick={() => updateStatus(a._id, "rejected")}
//                         >
//                           {actionLoading.id === a._id &&
//                           actionLoading.action === "rejected" ? (
//                             <>
//                               <Spinner
//                                 animation="border"
//                                 size="sm"
//                                 className="me-1"
//                               />
//                               Rejecting...
//                             </>
//                           ) : (
//                             "Reject"
//                           )}
//                         </Button>
//                       </>
//                     )}
//                   </td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </div>
//   );
// }


import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Badge,
  Spinner,
  Table,
  Form,
  Card,
  Row,
  Col,
} from "react-bootstrap";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Appointments() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({
    id: null,
    action: null,
  });

  // ✅ Filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API}/appointments/my`, {
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
      await fetch(`${API}/appointments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user._id,
        },
        body: JSON.stringify({ status }),
      });

      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status } : a))
      );
    } finally {
      setActionLoading({ id: null, action: null });
    }
  };

  const badgeVariant = (status) => {
    if (status === "accepted") return "success";
    if (status === "rejected") return "danger";
    return "warning";
  };

  // ✅ STATS
  const stats = useMemo(() => {
    return {
      total: appointments.length,
      pending: appointments.filter((a) => a.status === "pending").length,
      accepted: appointments.filter((a) => a.status === "accepted").length,
      rejected: appointments.filter((a) => a.status === "rejected").length,
    };
  }, [appointments]);

  // ✅ FILTER + SORT (LATEST FIRST)
  const filtered = useMemo(() => {
    let list = appointments.filter((a) => {
      const name =
        user.role === "mentor"
          ? a.studentId?.name || ""
          : a.mentorId?.name || "";

      const matchSearch = name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "all" ? true : a.status === statusFilter;

      return matchSearch && matchStatus;
    });

    // latest date first
    list.sort((a, b) => new Date(b.date) - new Date(a.date));

    return list;
  }, [appointments, search, statusFilter, user.role]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner />
      </div>
    );

  return (
    <div className="themebody-wrap" style={{ marginTop: 120 }}>
      <h2 className="mb-4 text-center">📅 All Appointments</h2>

      {/* ✅ STATS */}
      <div className="d-flex justify-content-center mb-4">
        <div style={{ width: "100%", maxWidth: 900 }}>
          <Row className="g-3">
            <Col md={3}>
              <Card className="text-center shadow-sm">
                <Card.Body>
                  <h6>Total</h6>
                  <h3>{stats.total}</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center shadow-sm border-warning">
                <Card.Body>
                  <h6>Pending</h6>
                  <h3 className="text-warning">{stats.pending}</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center shadow-sm border-success">
                <Card.Body>
                  <h6>Accepted</h6>
                  <h3 className="text-success">{stats.accepted}</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center shadow-sm border-danger">
                <Card.Body>
                  <h6>Rejected</h6>
                  <h3 className="text-danger">{stats.rejected}</h3>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* ✅ FILTER BAR — ONE ROW */}
      <div className="d-flex justify-content-center mb-3">
        <div style={{ width: "100%", maxWidth: 900 }}>
          <Row className="g-2 align-items-center">
            <Col md={7} sm={12}>
              <Form.Control
                placeholder="🔍 Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>

            <Col md={3} sm={6}>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </Form.Select>
            </Col>

            <Col md={2} sm={6} className="d-grid">
              <Button
                variant="secondary"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                }}
              >
                Clear
              </Button>
            </Col>
          </Row>
        </div>
      </div>

      {/* ✅ TABLE LIST */}
      {filtered.length === 0 ? (
        <p className="text-muted text-center">No appointments found</p>
      ) : (
        <div className="d-flex justify-content-center">
          <div style={{ width: "100%", maxWidth: 900 }}>
            <Table bordered hover responsive className="text-center align-middle">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>{user.role === "mentor" ? "Student" : "Mentor"}</th>
                  <th>Status</th>
                  {user.role === "mentor" && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a._id}>
                    <td>{new Date(a.date).toLocaleDateString()}</td>
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
                          <div className="d-flex justify-content-center gap-2">
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() =>
                                updateStatus(a._id, "accepted")
                              }
                            >
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() =>
                                updateStatus(a._id, "rejected")
                              }
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}