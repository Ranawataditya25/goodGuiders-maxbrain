// import React, { useState } from 'react';
// import { FilterMatchMode, FilterOperator } from 'primereact/api';
// import { DataTable } from 'primereact/datatable';
// import FeatherIcon from 'feather-icons-react';

// import { Link } from "react-router-dom";
// import { Container, Row, Col, Card, Form, InputGroup, Modal, Button } from 'react-bootstrap';

// import IMAGE_URLS from "/src/pages/api/Imgconfig.js";
// import PageBreadcrumb from '../componets/PageBreadcrumb';

// export default function All_patient() {
//   const [show, setShow] = useState(false);

//   const Close_btn = () => setShow(false);
//   const emailcreat = () => setShow(true);
//   //  Inuut value start
//   const [formData, setFormData] = useState({
//     name: '',
//     Age: '',
//     Gender: '',
//     BloodGroup: '',
//     Phone: '',
//     email: '',
//     Birthdate: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
//   // Data Table
//   const sales = [
//     { "image": "avtar/3.jpg", "title": "Ashton Cox", "Birth Date": "05/21/23", "Age": "33", "Gender": "Male", "Blood Group": "B+", "Phone No": "+1 25 962689", "Email": "example@email.com","inventoryStatus": "In Treatment" },
//     { "image": "avtar/5.jpg", "title": "Brielle Williamson", "Birth Date": "05/21/23", "Age": "20", "Gender": "Male", "Blood Group": "B+", "Phone No": "+1 25 962689", "Email": "example@email.com", "inventoryStatus": "In Treatment" },
//     { "image": "avtar/4.jpg", "title": "Cedric Kelly", "Birth Date": "05/21/23", "Age": "35", "Gender": "Female", "Blood Group": "B+", "Phone No": "+1 25 962689", "Email": "example@email.com","inventoryStatus": "In Treatment" },
//     { "image": "avtar/8.jpg", "title": "Charde Marshall", "Birth Date": "05/21/23", "Age": "8", "Gender": "Male", "Blood Group": "B+", "Phone No": "+1 25 962689", "Email": "example@email.com", "inventoryStatus": "New Patient" },
//     { "image": "avtar/11.jpg", "title": "Dai Rios", "Birth Date": "05/21/23", "Age": "25", "Gender": "Male", "Blood Group": "B+", "Phone No": "+1 25 962689", "Email": "example@email.com","inventoryStatus": "New Patient" },
//     { "image": "avtar/2.jpg", "title": "Garrett Winters", "Birth Date": "05/21/23", "Age": "28", "Gender": "Female", "Blood Group": "B+", "Phone No": "+1 25 962689", "Email": "example@email.com","inventoryStatus": "New Patient" },
//     { "image": "avtar/10.jpg", "title": "Gloria Little", "Birth Date": "05/21/23", "Age": "35", "Gender": "Female", "Blood Group": "B+", "Phone No": "+1 25 962689", "Email": "example@email.com","inventoryStatus": "New Patient" },
//     { "image": "avtar/7.jpg", "title": "Jena Gaines", "Birth Date": "05/21/23", "Age": "23", "Gender": "Male", "Blood Group": "B+", "Phone No": "+1 25 962689", "Email": "example@email.com","inventoryStatus": "New Patient" },
//     { "image": "avtar/9.jpg", "title": "Paul Byrd", "Birth Date": "05/21/23", "Age": "25", "Gender": "Male", "Blood Group": "B+", "Phone No": "+1 25 962689", "Email": "example@email.com","inventoryStatus": "New Patient" },
//     { "image": "avtar/6.jpg", "title": "Rhona Davidson", "Birth Date": "05/21/23", "Age": "8", "Gender": "Female", "Blood Group": "B+", "Phone No": "+1 25 962689", "Email": "example@email.com","inventoryStatus": "Recovered" },

//   ];
//   const imageBodyTemplate = ({ image, title }) => {
//     return (
//       <div className="d-flex align-items-center">
//         <img src={IMAGE_URLS[image]} alt={image.image} className="product-image rounded-50 w-40" />
//         <span className="ml-10">{title}</span>
//       </div>
//     )
//   }
//   const statusBodyTemplate = (rowData) => {
//     return <span className={`badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
//   }
//   //  SearchFilter
//   const [filters1, setFilters1] = useState({
//     'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
//     'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
//     'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
//     'representative': { value: null, matchMode: FilterMatchMode.IN },
//     'status': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
//   });
//   const filtersMap = {
//     'filters1': { value: filters1, callback: setFilters1 },
//   };
//   const onGlobalFilterChange = (event, filtersKey) => {
//     const value = event.target.value;
//     let filters = { ...filtersMap[filtersKey].value };
//     filters['global'].value = value;

//     filtersMap[filtersKey].callback(filters);
//   }

//   const renderHeader = (filtersKey) => {
//     const filters = filtersMap[`${filtersKey}`].value;
//     const value = filters['global'] ? filters['global'].value : '';

//     return (
//       <div className="d-flex justify-content-end align-align-items-baseline">
//         <Form.Group className="d-flex align-items-center">
//           <Form.Label className="pe-3 mb-0"> Search</Form.Label>
//           <InputGroup className=" px-2">
//             <Form.Control type="search" className="form-control px-2" value={value || ''} onChange={(e) => onGlobalFilterChange(e, filtersKey)} placeholder="Global Search" />
//           </InputGroup>
//         </Form.Group>
//       </div>
//     );
//   }
//   const header1 = renderHeader('filters1');

//   const actionBodyTemplate = () => {
//     return (
//       <React.Fragment>
//         <div className="cart-action">
//           <Link className="edit" to="/edit-patient">
//             <FeatherIcon icon="edit" className="w-18" />
//           </Link>
//           <Link className="delete text-danger" to="">
//             <FeatherIcon icon="trash-2" className="w-18" />
//           </Link>
//         </div>
//       </React.Fragment>
//     );
//   }

//     const userEmail = localStorage.getItem('loggedInEmail');
//   console.log("User Email from localStorage by honey:", userEmail);
//   const isMentor = userEmail === "mentor@gmail.com";
//   const isStudent = userEmail === "student@gmail.com";
//   const isAdmin = userEmail === "admin@gmail.com";

//   return (
//     <>
//       <div className="themebody-wrap">
//         {/* Breadcrumb Start */}
//         <PageBreadcrumb pagename="All Student" />
//         {/* Breadcrumb End */}
//         {/* theme body start */}
//         <div className="theme-body">
//           <Container fluid>
//             <Row>
//               <Col>
//                 <Card>
//                   <Card.Body>

//                     <Row className="Product_list">
//                        {isAdmin && (
//                       <Col md={12}>
//                         <Link className="btn btn-primary float-end mb-15" onClick={emailcreat}>
//                           Add Mentor
//                         </Link>
//                       </Col>
// )}
//                       <DataTable value={sales} rows={10} header={header1} filters={filters1} onFilter={(e) => setFilters1(filters1)}
//                         stateStorage="session" paginator rowsPerPageOptions={[5, 10, 50]}
//                         paginatorTemplate="CurrentPageReport  FirstPageLink  PageLinks LastPageLink  RowsPerPageDropdown"
//                         currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" className="p-datatable-customers" >
//                         <div header="Name" sortable body={imageBodyTemplate} ></div>
//                         <div field="Birth Date" header="Birth Date" sortable></div>
//                         <div field="Age" header="Age" sortable></div>
//                         <div field="Gender" header="Gender" sortable></div>
//                         <div field="Blood Group" header="Blood Group" sortable></div>
//                         <div field="Phone No" header="Phone No" sortable></div>
//                         <div field="Email" header="Email" sortable></div>
//                         <div header="Status" body={statusBodyTemplate} sortable></div>
//                         <div field="Action" header="Action" sortable body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></div>
//                       </DataTable>
//                     </Row>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             </Row>
//           </Container>
//         </div>
//         {/* theme body end */}
//       </div>
//       {/* Modal Start  */}
//       <Modal show={show} onHide={Close_btn}>
//         <Modal.Header>
//           <Modal.Title>
//             <h5 className="modal-title">Add New Mentor</h5>
//           </Modal.Title>
//           <span className="close-modal" onClick={Close_btn}>
//             <FeatherIcon icon="x" />
//           </span>
//         </Modal.Header>
//         <Modal.Body className="modal-body">
//           <Form>
//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-20">
//                   <Form.Label>Name</Form.Label>
//                   <Form.Control type="text" name="name" placeholder="Enter Mentor Name" value={formData.name} onChange={handleInputChange} />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-20">
//                   <Form.Label>Date Of Birth</Form.Label>
//                   <Form.Control type="text" name="Birthdate" placeholder="DD/MM/YYYY" value={formData.Birthdate} onChange={handleInputChange} />
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group className="mb-20">
//                   <Form.Label>Age</Form.Label>
//                   <Form.Control type="text" name="Age" required placeholder="Age" value={formData.Age} onChange={handleInputChange} />
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group className="mb-20">
//                   <Form.Label>Gender</Form.Label>
//                   <select className="form-control" name="Gender"  value={formData.Gender} onChange={handleInputChange}>
//                     <option value="Gender">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                   </select>
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group className="mb-20">
//                   <Form.Label>Blood Group</Form.Label>
//                   <select className="form-control" name="BloodGroup" value={formData.BloodGroup} onChange={handleInputChange}>
//                     <option value="">Select Blood Group</option>
//                     <option value="A+">A+</option>
//                     <option value="A-">A-</option>
//                     <option value="B+">B+</option>
//                     <option value="B-">B-</option>
//                     <option value="O+">O+</option>
//                     <option value="O-">O-</option>
//                     <option value="AB+">AB+</option>
//                     <option value="AB-">AB-</option>
//                   </select>
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group className="mb-20">
//                   <Form.Label>Phone No</Form.Label>
//                   <Form.Control type="text" name="Phone" required placeholder="Phone No Number" value={formData.Phone} onChange={handleInputChange} />
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group className="mb-20">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control type="email" name="email" required placeholder="Email Id" value={formData.email} onChange={handleInputChange} />
//                 </Form.Group>
//               </Col>

//             </Row>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer className="modal-footer">
//           <Button className="btn btn-primary">Save</Button>
//           <Button className="btn btn-danger" onClick={Close_btn}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//       {/* Modal End  */}
//     </>
//   )
// }

// import React, { useState } from 'react';
// import './css/ProfilePage.css';

// const ProfilePage = () => {
//   const [profileImage, setProfileImage] = useState(null);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     dob: '',
//     gender: '',
//     phone: '',
//     marksheet10: null,
//     marksheet12: null,
//     graduation: null,
//     masters: null,
//     phd: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setFormData({ ...formData, [name]: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setProfileImage(URL.createObjectURL(file));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form Data:', formData);
//     alert('Profile Submitted!');
//   };

//   return (
//     <div className="container">
//       <h2>Profile Page</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="profile-pic">
//           {profileImage && <img src={profileImage} alt="Profile" />}
//           <input type="file" accept="image/*" onChange={handleImageChange} />
//         </div>

//         <div className="form-row">
//           <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
//           <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
//         </div>

//         <div className="form-row">
//           <input type="date" name="dob" onChange={handleChange} required />
//           <select name="gender" onChange={handleChange} required>
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         <div className="form-row">
//           <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
//         </div>

//         <div className="upload-section">
//           <label>Upload 10th Marksheet</label>
//           <input type="file" name="marksheet10" onChange={handleChange} accept=".pdf,.jpg,.png" required />

//           <label>Upload 12th Marksheet</label>
//           <input type="file" name="marksheet12" onChange={handleChange} accept=".pdf,.jpg,.png" required />

//           <label>Upload Graduation Degree</label>
//           <input type="file" name="graduation" onChange={handleChange} accept=".pdf,.jpg,.png" required />

//           <label>Upload Master’s Degree</label>
//           <input type="file" name="masters" onChange={handleChange} accept=".pdf,.jpg,.png" />

//           <label>Upload PhD Degree</label>
//           <input type="file" name="phd" onChange={handleChange} accept=".pdf,.jpg,.png" />
//         </div>

//         <button type="submit">Submit Profile</button>
//       </form>
//     </div>
//   );
// };

// export default ProfilePage;

// src/components/ProfilePage.js

// src/components/All_Student.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  Modal,
  Button,
  ListGroup,
} from "react-bootstrap";

import IMAGE_URLS from "/src/pages/api/Imgconfig.js";
import PageBreadcrumb from "../componets/PageBreadcrumb";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function All_Student() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allStudents, setAllStudents] = useState([]);

  const [classes, setClasses] = useState([]); // unique classes
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedStudentRow, setSelectedStudentRow] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  // messages modal state
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [messagesList, setMessagesList] = useState([]);
  const [activeChatTitle, setActiveChatTitle] = useState("");

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const role = loggedInUser.role; // "admin" | "mentor" | "student"
  const navigate = useNavigate();

  // Helper: same sanitize logic as your server's twilio route
  const sanitize = (s = "") =>
    String(s || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_");

  const makeUniqueName = (a = "", b = "") =>
    [sanitize(a), sanitize(b)].sort().join("_");

  // fetch students (optional class filter)
  const fetchStudents = async (cls = "All") => {
    try {
      setLoading(true);
      const url =
        cls && cls !== "All"
          ? `${API}/stats/students?class=${encodeURIComponent(
              cls
            )}`
          : `${API}/stats/students`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        const mapped = data.students.map((s, idx) => ({
          id: idx + 1,
          image: `avtar/${(idx % 10) + 1}.jpg`,
          title: s.name,
          Email: s.email,
          Mobile: s.mobileNo || "-",
          DOB: s.dob || "-",
          Address: s.address || "-",
          Class: (s.className || "").trim() || "-",
          isDisabled: s.isDisabled,
        }));
        setAllStudents(mapped);
        setStudents(mapped);
        const uniqueClasses = [
          ...new Set(mapped.map((m) => m.Class).filter((c) => c && c !== "-")),
        ];
        setClasses(uniqueClasses);
      } else {
        console.error("Error fetching students:", data.message);
      }
    } catch (err) {
      console.error("Server error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMentorStudents = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API}/stats/mentor/${encodeURIComponent(
          loggedInUser.email
        )}/details`
      );
      const data = await res.json();

      const connected = data?.students?.items || [];

      if (connected.length === 0) {
        setStudents([]);
        setAllStudents([]);
        setClasses([]);
        return;
      }

      const mapped = connected.map((s, idx) => ({
        id: idx + 1,
        image: `avtar/${(idx % 10) + 1}.jpg`,
        title: s.name,
        Email: s.email,
        Mobile: s.mobileNo || "-",
        DOB: s.dob || "-",
        Address: s.address || "-",
        Class: (s.class || "").trim() || "-",
        isDisabled: s.isDisabled,
      }));

      setAllStudents(mapped);
      setStudents(mapped);

      const uniqueClasses = [
        ...new Set(mapped.map((m) => m.Class).filter((c) => c && c !== "-")),
      ];
      setClasses(uniqueClasses);
    } catch (err) {
      console.error("Error fetching mentor students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role === "admin") {
      fetchStudents();
    } else if (role === "mentor") {
      fetchMentorStudents();
    }
  }, [role]);

  // open student details modal and fetch details
  const openStudentDetails = async (rowData) => {
    if (role !== "admin" && role !== "mentor") return;
    setSelectedStudentRow(rowData);
    setShowDetails(true);
    setDetailsLoading(true);
    setDetailsError(null);
    setStudentDetails(null);
    try {
      const res = await fetch(
        `${API}/stats/student/${encodeURIComponent(
          rowData.Email
        )}/details`
      );
      const data = await res.json();
      if (!res.ok) {
        setDetailsError(data.message || "Failed to load student details");
      } else {
        setStudentDetails(data);
      }
    } catch (err) {
      console.error("Error fetching student details:", err);
      setDetailsError("Server error while loading details");
    } finally {
      setDetailsLoading(false);
    }
  };

  // Admin-only: fetch messages for a student<->mentor pair using uniqueName
  const handleViewMessages = async (mentorEmail, mentorName) => {
    if (role !== "admin") return; // only admin allowed per your request
    if (!selectedStudentRow) {
      return alert("Open a student first.");
    }
    const studentEmail = selectedStudentRow.Email;
    const uniqueName = makeUniqueName(studentEmail, mentorEmail);
    setActiveChatTitle(
      `${selectedStudentRow.title} ↔ ${mentorName || mentorEmail}`
    );
    setShowMessagesModal(true);
    setMessagesLoading(true);
    setMessagesError(null);
    setMessagesList([]);

    try {
      const res = await fetch(
        `${API}/conversation/${encodeURIComponent(
          uniqueName
        )}/messages`
      );
      const data = await res.json();
      if (!res.ok) {
        setMessagesError(data.error || "Failed to fetch messages");
        setMessagesList([]);
      } else {
        // Twilio returns newest first — reverse to show oldest → newest
        const msgs = Array.isArray(data.messages)
          ? data.messages.slice().reverse()
          : [];
        setMessagesList(msgs);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
      setMessagesError("Server error while fetching messages");
    } finally {
      setMessagesLoading(false);
    }
  };

  const imageBodyTemplate = (rowData) => {
    const clickable = role === "admin" || role === "mentor";
    return (
      <div
        className="d-flex align-items-center"
        style={clickable ? { cursor: "pointer" } : {}}
        onClick={
          clickable
            ? () =>
                navigate(`/patient-info/${encodeURIComponent(rowData.Email)}`)
            : undefined
        }
      >
        <img
          src={IMAGE_URLS[rowData.image]}
          alt={rowData.image}
          className="product-image rounded-50 w-40"
        />
        <span className="ml-10">{rowData.title}</span>
      </div>
    );
  };

  const rowClassName = (rowData) => {
    if (rowData.isDisabled && role !== "admin") return "blurred-row";
    return "";
  };

  const [filters1, setFilters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
  });
  const filtersMap = { filters1: { value: filters1, callback: setFilters1 } };
  const onGlobalFilterChange = (event, filtersKey) => {
    const value = event.target.value;
    let filters = { ...filtersMap[filtersKey].value };
    filters.global.value = value;
    filtersMap[filtersKey].callback(filters);
  };
  const handleClassChange = (e) => {
    const value = e.target.value;
    setSelectedClass(value);

    if (value === "All") {
      setStudents(allStudents); // ✅ restore all
    } else {
      const filtered = allStudents.filter((s) => s.Class === value);
      setStudents(filtered); // ✅ ONLY selected class
    }
  };

  const renderHeader = (filtersKey) => {
    const filters = filtersMap[filtersKey].value;
    const value = filters.global ? filters.global.value : "";
    return (
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
        {(role === "admin" || role === "mentor") && (
          <Form.Group className="d-flex align-items-center mb-0">
            <Form.Label className="pe-2 mb-0">Filter by Class</Form.Label>
            <Form.Select
              size="sm"
              value={selectedClass}
              onChange={handleClassChange}
              style={{ minWidth: "200px" }}
            >
              <option value="All">All Classes</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}
        <Form.Group className="d-flex align-items-center mb-0">
          <Form.Label className="pe-3 mb-0">Search</Form.Label>
          <InputGroup className="px-2">
            <Form.Control
              type="search"
              className="form-control px-2"
              value={value || ""}
              onChange={(e) => onGlobalFilterChange(e, filtersKey)}
              placeholder="Global Search"
            />
          </InputGroup>
        </Form.Group>
      </div>
    );
  };

  const header1 = renderHeader("filters1");

  // delete & toggle functions omitted for brevity (keep your versions)

  return (
    <>
      <div className="themebody-wrap">
        <PageBreadcrumb pagename="All Student" />
        <div className="theme-body">
          <Container fluid>
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    {!loading && role === "mentor" && students.length === 0 && (
                      <div className="text-center text-muted py-4">
                        <h6>No students connected</h6>
                      </div>
                    )}
                    <DataTable
                      value={students}
                      rows={10}
                      header={header1}
                      filters={filters1}
                      paginator
                      rowsPerPageOptions={[5, 10, 50]}
                      className="p-datatable-customers"
                      loading={loading}
                      rowClassName={rowClassName}
                    >
                      <Column
                        header="Name"
                        sortable
                        body={imageBodyTemplate}
                      ></Column>
                      <Column field="Class" header="Class" sortable></Column>
                      <Column field="Email" header="Email" sortable></Column>
                      <Column field="Mobile" header="Mobile" sortable></Column>
                      <Column field="DOB" header="DOB" sortable></Column>
                      <Column
                        field="Address"
                        header="Address"
                        sortable
                      ></Column>
                      {role === "admin" && (
                        <Column
                          header="Actions"
                          body={(rowData) => (
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                  if (
                                    !window.confirm(
                                      "Are you sure you want to delete this student?"
                                    )
                                  )
                                    return;
                                  fetch(
                                    `${API}/stats/student/${encodeURIComponent(
                                      rowData.Email
                                    )}`,
                                    { method: "DELETE" }
                                  )
                                    .then((r) => r.json())
                                    .then((d) => {
                                      if (d)
                                        setStudents((prev) =>
                                          prev.filter(
                                            (s) => s.Email !== rowData.Email
                                          )
                                        );
                                    })
                                    .catch((e) => console.error(e));
                                }}
                              >
                                Delete
                              </button>
                              <button
                                className={`btn btn-sm ${
                                  rowData.isDisabled
                                    ? "btn-success"
                                    : "btn-warning"
                                }`}
                                onClick={() => {
                                  fetch(
                                    `${API}/stats/student/${encodeURIComponent(
                                      rowData.Email
                                    )}/toggle`,
                                    { method: "PATCH" }
                                  )
                                    .then((r) => r.json())
                                    .then((d) => {
                                      setStudents((prev) =>
                                        prev.map((s) =>
                                          s.Email === rowData.Email
                                            ? { ...s, isDisabled: d.isDisabled }
                                            : s
                                        )
                                      );
                                    })
                                    .catch((e) => console.error(e));
                                }}
                              >
                                {rowData.isDisabled ? "Enable" : "Disable"}
                              </button>
                            </div>
                          )}
                        ></Column>
                      )}
                    </DataTable>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {/* Student Details Modal */}
      {(role === "admin" || role === "mentor") && (
        <Modal
          show={showDetails}
          onHide={() => setShowDetails(false)}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Student Details{" "}
              {selectedStudentRow ? `- ${selectedStudentRow.title}` : ""}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedStudentRow && (
              <div className="mb-3">
                <h5 className="mb-2">Basic Information</h5>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <strong>Name:</strong> {selectedStudentRow.title}
                  </div>
                  <div className="col-md-6 mb-2">
                    <strong>Email:</strong> {selectedStudentRow.Email}
                  </div>
                  <div className="col-md-6 mb-2">
                    <strong>Class:</strong> {selectedStudentRow.Class}
                  </div>
                  <div className="col-md-6 mb-2">
                    <strong>Mobile:</strong> {selectedStudentRow.Mobile}
                  </div>
                  <div className="col-md-6 mb-2">
                    <strong>DOB:</strong> {selectedStudentRow.DOB}
                  </div>
                  <div className="col-md-6 mb-2">
                    <strong>Address:</strong> {selectedStudentRow.Address}
                  </div>
                </div>
              </div>
            )}

            {detailsLoading && <p>Loading exam & interaction details...</p>}
            {detailsError && <p className="text-danger">{detailsError}</p>}

            {studentDetails && !detailsLoading && (
              <>
                <div className="d-flex flex-wrap gap-3 mb-3">
                  <div className="badge bg-primary text-wrap p-2">
                    Exams given:{" "}
                    <strong>{studentDetails.performance.examsCount}</strong>
                  </div>
                  <div className="badge bg-info text-wrap p-2">
                    Performance:{" "}
                    <strong>{studentDetails.performance.category}</strong>
                    {studentDetails.performance.averageScore !== null &&
                      ` (${studentDetails.performance.averageScore}%)`}
                  </div>
                  {role === "admin" && (
                    <div className="badge bg-success text-wrap p-2">
                      Mentors connected:{" "}
                      <strong>{studentDetails.mentors.count}</strong>
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <h5>Recent Exams</h5>
                  {studentDetails.exams.length === 0 ? (
                    <p className="text-muted">
                      No exams found for this student.
                    </p>
                  ) : (
                    <ul className="list-group">
                      {studentDetails.exams.slice(0, 5).map((exam) => (
                        <li key={exam.id} className="list-group-item">
                          <div className="d-flex justify-content-between">
                            <div>
                              <strong>
                                Class {exam.class} – {exam.type?.toUpperCase()}
                              </strong>
                              <br />
                              <small>
                                Subjects:{" "}
                                {Array.isArray(exam.subjects)
                                  ? exam.subjects.join(", ")
                                  : "-"}
                              </small>
                            </div>
                            <div className="text-end">
                              {exam.percentage !== null ? (
                                <>
                                  <span>{exam.percentage}%</span>
                                  <br />
                                  <small>
                                    {exam.score}/{exam.totalMarks}
                                  </small>
                                </>
                              ) : (
                                <small className="text-muted">
                                  Not evaluated yet
                                </small>
                              )}
                              <br />
                              <small className="text-muted">
                                {exam.submittedAt
                                  ? new Date(exam.submittedAt).toLocaleString()
                                  : ""}
                              </small>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Mentors list – only admin sees chat button */}
                {role === "admin" && (
                  <div className="mb-2">
                    <h5>Mentors Connected</h5>
                    {studentDetails.mentors.count === 0 ? (
                      <p className="text-muted">
                        No mentor interactions found for this student.
                      </p>
                    ) : (
                      <ListGroup>
                        {studentDetails.mentors.items.map((m) => (
                          <ListGroup.Item
                            key={m.email}
                            className="d-flex justify-content-between align-items-center"
                          >
                            <div>
                              <strong>{m.name}</strong> – {m.email}{" "}
                              {m.specialization && (
                                <span className="text-muted">
                                  ({m.specialization})
                                </span>
                              )}
                            </div>
                            <div>
                              <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() =>
                                  handleViewMessages(m.email, m.name)
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
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDetails(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Messages Modal (admin-only) */}
      <Modal
        show={showMessagesModal}
        onHide={() => setShowMessagesModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Chat — {activeChatTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {messagesLoading && <p>Loading messages...</p>}
          {messagesError && <p className="text-danger">{messagesError}</p>}
          {!messagesLoading && !messagesError && messagesList.length === 0 && (
            <p className="text-muted">
              No messages found in this conversation.
            </p>
          )}

          {!messagesLoading && messagesList.length > 0 && (
            <div
              style={{ maxHeight: "60vh", overflowY: "auto", padding: "8px" }}
            >
              {messagesList.map((m, idx) => {
                // Twilio message fields: author, body, dateCreated
                const isFromStudent =
                  selectedStudentRow &&
                  String(m.author).toLowerCase() ===
                    String(selectedStudentRow.Email).toLowerCase();
                const align = isFromStudent ? "flex-start" : "flex-end";
                const bg = isFromStudent ? "#f1f3f5" : "#d9edf7";
                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: isFromStudent ? "flex-start" : "flex-end",
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "78%",
                        background: bg,
                        padding: "8px 12px",
                        borderRadius: 8,
                      }}
                    >
                      <div
                        style={{ fontSize: 13, marginBottom: 6, color: "#333" }}
                      >
                        <strong>{m.author}</strong>
                        <span
                          style={{ marginLeft: 8, fontSize: 11, color: "#666" }}
                        >
                          {m.dateCreated
                            ? new Date(m.dateCreated).toLocaleString()
                            : ""}
                        </span>
                      </div>
                      <div style={{ whiteSpace: "pre-wrap", fontSize: 15 }}>
                        {m.body}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowMessagesModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <style>{`
        .blurred-row { filter: blur(2px) grayscale(50%); pointer-events: none; opacity: 0.6; }
      `}</style>
    </>
  );
}