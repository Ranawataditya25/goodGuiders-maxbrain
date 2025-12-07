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

import { useState, useEffect } from "react";
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
} from "react-bootstrap";

import IMAGE_URLS from "/src/pages/api/Imgconfig.js";
import PageBreadcrumb from "../componets/PageBreadcrumb";

export default function All_Student() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [classes, setClasses] = useState([]);          // ✅ list of unique classes
  const [selectedClass, setSelectedClass] = useState("All"); // ✅ current filter

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const role = loggedInUser.role; // "admin" | "mentor" | "student"

  // ✅ reusable fetch with optional class filter
  const fetchStudents = async (cls = "All") => {
    try {
      setLoading(true);

      const url =
        cls && cls !== "All"
          ? `http://127.0.0.1:5000/api/stats/students?class=${encodeURIComponent(
              cls
            )}`
          : "http://127.0.0.1:5000/api/stats/students";

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        const mappedStudents = data.students.map((s, idx) => ({
          id: idx + 1,
          image: `avtar/${(idx % 10) + 1}.jpg`,
          title: s.name,
          Email: s.email,
          Mobile: s.mobileNo || "-",
          DOB: s.dob || "-",
          Address: s.address || "-",
          Class: (s.className || "").trim() || "-", // ✅ main class
          isDisabled: s.isDisabled,
        }));

        setStudents(mappedStudents);

        // build unique class list (for dropdown) only from non-empty classes
        const uniqueClasses = [
          ...new Set(
            mappedStudents
              .map((st) => st.Class)
              .filter((c) => c && c !== "-")
          ),
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

  useEffect(() => {
    fetchStudents();
  }, []);

  const imageBodyTemplate = (rowData) => {
    return (
      <div className="d-flex align-items-center">
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
    if (rowData.isDisabled && role !== "admin") {
      return "blurred-row";
    }
    return "";
  };

  const [filters1, setFilters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
  });

  const filtersMap = {
    filters1: { value: filters1, callback: setFilters1 },
  };

  const onGlobalFilterChange = (event, filtersKey) => {
    const value = event.target.value;
    let filters = { ...filtersMap[filtersKey].value };
    filters.global.value = value;
    filtersMap[filtersKey].callback(filters);
  };

    // ✅ handle class dropdown change
  const handleClassChange = (e) => {
    const value = e.target.value;
    setSelectedClass(value);
    fetchStudents(value);
  };

const renderHeader = (filtersKey) => {
  const filters = filtersMap[filtersKey].value;
  const value = filters.global ? filters.global.value : "";

  return (
    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
      {/* 🔽 Left: Class filter (only for admin & mentor) */}
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

      {/* 🔽 Right: Global search (everyone) */}
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

  // ✅ Delete Student
  const handleDeleteStudent = async (email) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/stats/student/${encodeURIComponent(email)}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (res.ok) {
        alert("✅ Student deleted successfully");
        setStudents((prev) => prev.filter((s) => s.Email !== email));
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  // ✅ Toggle Disable/Enable Student
  const handleToggleStudent = async (email) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/stats/student/${encodeURIComponent(
          email
        )}/toggle`,
        { method: "PATCH" }
      );
      const data = await res.json();

      if (res.ok) {
        alert(
          `✅ Student ${data.isDisabled ? "disabled" : "enabled"} successfully`
        );
        setStudents((prev) =>
          prev.map((s) =>
            s.Email === email ? { ...s, isDisabled: data.isDisabled } : s
          )
        );
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error("Error toggling student:", err);
    }
  };

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
                                onClick={() =>
                                  handleDeleteStudent(rowData.Email)
                                }
                              >
                                Delete
                              </button>
                              <button
                                className={`btn btn-sm ${
                                  rowData.isDisabled
                                    ? "btn-success"
                                    : "btn-warning"
                                }`}
                                onClick={() =>
                                  handleToggleStudent(rowData.Email)
                                }
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

      <style>{`
        .blurred-row {
          filter: blur(2px) grayscale(50%);
          pointer-events: none;
          opacity: 0.6;
        }
      `}</style>
    </>
  );
}


