// import React, { useState } from 'react';
// import { FilterMatchMode, FilterOperator } from 'primereact/api';
// import { DataTable } from 'primereact/datatable';
// import FeatherIcon from 'feather-icons-react';

// import { Link } from "react-router-dom";
// import { Container, Row, Col, Card, Form, InputGroup, Modal, Button } from 'react-bootstrap';

// import IMAGE_URLS from "/src/pages/api/Imgconfig.js";
// import PageBreadcrumb from '../componets/PageBreadcrumb';

// export default function All_Mentor() {
//   const [show, setShow] = useState(false);

//   const Close_btn = () => setShow(false);
//   const emailcreat = () => setShow(true);
//   //  Inuut value start
//   const [formData, setFormData] = useState({
//     name: '',
//     department: '',
//     specialization: '',
//     degree: '',
//     mobile: '',
//     email: '',
//     joiningDate: '',
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
//     { "image": "avtar/2.jpg", "title": " Anna Mull", "Department": "Math", "Specialization": "Prostate", "Degree": "P.H.D", "Mobile": "+1 25 962689", "Email": "example@email.com", "Joining Date": "05/21/23" },
//     { "image": "avtar/7.jpg", "title": " Hal Appeno", "Department": "Science", "Specialization": "Prostate", "Degree": "P.H.D", "Mobile": "+1 25 962689", "Email": "example@email.com", "Joining Date": "05/21/23"},
//     { "image": "avtar/9.jpg", "title": " Pat Agonia", "Department": "Hindi", "Specialization": "Prostate", "Degree": "P.H.D", "Mobile": "+1 25 962689", "Email": "example@email.com", "Joining Date": "05/21/23"},
//     { "image": "avtar/3.jpg", "title": " Paul Molive", "Department": "English", "Specialization": "Prostate", "Degree": "P.H.D", "Mobile": "+1 25 962689", "Email": "example@email.com", "Joining Date": "05/21/23"},
//     { "image": "avtar/8.jpg", "title": " Polly Tech", "Department": "Sanskrit", "Specialization": "Prostate", "Degree": "P.H.D", "Mobile": "+1 25 962689", "Email": "example@email.com", "Joining Date": "05/21/23"},
//     { "image": "avtar/5.jpg", "title": " Poppa Cherry", "Department": "Computer", "Specialization": "Prostate", "Degree": "P.H.D", "Mobile": "+1 25 962689", "Email": "example@email.com", "Joining Date": "05/21/23"},
//     { "image": "avtar/6.jpg", "title": " Saul T. Balls", "Department": "Social Study", "Specialization": "Prostate", "Degree": "P.H.D", "Mobile": "+1 25 962689", "Email": "example@email.com", "Joining Date": "05/21/23"},
//     { "image": "avtar/4.jpg", "title": " Terry Aki", "Department": "Geogrphy", "Specialization": "Prostate", "Degree": "P.H.D", "Mobile": "+1 25 962689", "Email": "example@email.com", "Joining Date": "05/21/23"},
//     { "image": "avtar/1.jpg", "title": " Tiger Nixon", "Department": "Pol.Science", "Specialization": "Prostate", "Degree": "P.H.D", "Mobile": "+1 25 962689", "Email": "example@email.com", "Joining Date": "05/21/23"},
//     { "image": "avtar/2.jpg", "title": " Anna Mull", "Department": "Commerce", "Specialization": "Prostate", "Degree": "P.H.D", "Mobile": "+1 25 962689", "Email": "example@email.com", "Joining Date": "05/21/23"},

//   ];
//   const formatCurrency = (value) => {
//     return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
//   }

//   const imageBodyTemplate = ({ image, title }) => {
//     return (
//       <div className="d-flex align-items-center">
//         <img src={IMAGE_URLS[image]} alt={image.image} className="product-image rounded-50 w-40" />
//         <span className="ml-10">{title}</span>
//       </div>
//     )
//   }

//   //  SearchFilter
//   const [filters1, setFilters1] = useState({
//     'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
//     'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
//     'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
//     'representative': { value: null, matchMode: FilterMatchMode.IN },
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
//           <Link className="edit" to="/edit-Mentor">
//             <FeatherIcon icon="edit" className="w-18" />
//           </Link>
//           <Link className="delete text-danger" to="">
//             <FeatherIcon icon="trash-2" className="w-18" />
//           </Link>
//         </div>
//       </React.Fragment>
//     );
//   }

//   return (
//     <>
//       <div className="themebody-wrap">
//         {/* Breadcrumb Start */}
//         <PageBreadcrumb pagename="All Mentor" />
//         {/* Breadcrumb End */}
//         {/* theme body start */}
//         <div className="theme-body">
//           <Container fluid>

//             <Row>
//               <Col>
//                 <Card>
//                   <Card.Body>
//                     <Row className="Product_list">
//                       <Col md={12}>
//                         <Link className="btn btn-primary float-end mb-15" onClick={emailcreat}>
//                           <i className="fa fa-plus me-2"></i>
//                           Add Mentor
//                         </Link>
//                       </Col>
//                       <DataTable value={sales} rows={10} header={header1} filters={filters1} onFilter={(e) => setFilters1(filters1)}
//                         stateStorage="session" paginator rowsPerPageOptions={[5, 10, 50]}
//                         paginatorTemplate="CurrentPageReport  FirstPageLink  PageLinks LastPageLink  RowsPerPageDropdown"
//                         currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" className="p-datatable-customers" >
//                         <div header="Name" sortable body={imageBodyTemplate} ></div>
//                         <div field="Department" header="Department" sortable></div>
//                         <div field="Specialization" header="Specialization" sortable></div>
//                         <div field="Degree" header="Degree" sortable></div>
//                         <div field="Mobile" header="Mobile" sortable></div>
//                         <div field="Email" header="Email" sortable></div>
//                         <div field="Joining Date" header="Joining Date" sortable></div>
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
//                   <Form.Control  type="text"  name="name"  placeholder="Enter Mentor Name"  value={formData.name}  onChange={handleInputChange} />
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group className="mb-20">
//                   <Form.Label>Department</Form.Label>
//                   <Form.Control  type="text"  name="department"  required   placeholder="Department"  value={formData.department}  onChange={handleInputChange} />
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group className="mb-20">
//                   <Form.Label>Specialization</Form.Label>
//                   <Form.Control  type="text"  name="specialization"  required placeholder="Specialization"  value={formData.specialization} onChange={handleInputChange} />
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group className="mb-20">
//                   <Form.Label>Degree</Form.Label>
//                   <Form.Control  type="text" name="degree" required placeholder="Degree" value={formData.degree} onChange={handleInputChange} />
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group className="mb-20">
//                   <Form.Label>Mobile</Form.Label>
//                   <Form.Control type="text" name="mobile" required placeholder="Mobile Number" value={formData.mobile} onChange={handleInputChange} />
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group className="mb-20">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control  type="email" name="email" required placeholder="Email Id" value={formData.email} onChange={handleInputChange} />
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group className="mb-20">
//                   <Form.Label>Joining Date</Form.Label>
//                   <Form.Control  type="text" name="joiningDate"  placeholder="DD/MM/YYYY" value={formData.joiningDate}  onChange={handleInputChange}  />
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
// import { FilterMatchMode, FilterOperator } from 'primereact/api';
// import { DataTable } from 'primereact/datatable';
// import FeatherIcon from 'feather-icons-react';

// import { Link } from "react-router-dom";
// import { Container, Row, Col, Card, Form, InputGroup, Modal, Button } from 'react-bootstrap';

// import IMAGE_URLS from "/src/pages/api/Imgconfig.js";
// import PageBreadcrumb from '../componets/PageBreadcrumb';

// export default function All_Mentor() {
//   const [show, setShow] = useState(false);

//   const Close_btn = () => setShow(false);
//   const emailcreat = () => setShow(true);

//   // Input form state
//   const [formData, setFormData] = useState({
//     name: '',
//     department: '',
//     specialization: '',
//     degree: '',
//     mobile: '',
//     email: '',
//     joiningDate: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Sample mentor data
//   const sales = [
//     { "image": "avtar/2.jpg", "title": " Anna Mull", "Department": "Math", "Specialization": "Prostate", "Degree": "P.H.D", "Mobile": "+1 25 962689", "Email": "example@email.com", "Joining Date": "05/21/23" },
//     { "image": "avtar/7.jpg", "title": " Hal Appeno", "Department": "Science", "Specialization": "Prostate", "Degree": "P.H.D", "Mobile": "+1 25 962689", "Email": "example@email.com", "Joining Date": "05/21/23"},
//     { "image": "avtar/9.jpg", "title": " Pat Agonia", "Department": "Hindi", "Specialization": "Prostate", "Degree": "P.H.D", "Mobile": "+1 25 962689", "Email": "example@email.com", "Joining Date": "05/21/23"},
//     { "image": "avtar/3.jpg", "title": " Paul Molive", "Department": "English", "Specialization": "Prostate", "Degree": "P.H.D", "Mobile": "+1 25 962689", "Email": "example@email.com", "Joining Date": "05/21/23"},
//     { "image": "avtar/8.jpg", "title": " Polly Tech", "Department": "Sanskrit", "Specialization": "Prostate", "Degree": "P.H.D", "Mobile": "+1 25 962689", "Email": "example@email.com", "Joining Date": "05/21/23"},
//     { "image": "avtar/5.jpg", "title": " Poppa Cherry", "Department": "Computer", "Specialization": "Prostate", "Degree": "P.H.D", "Mobile": "+1 25 962689", "Email": "example@email.com", "Joining Date": "05/21/23"},
//     { "image": "avtar/6.jpg", "title": " Saul T. Balls", "Department": "Social Study", "Specialization": "Prostate", "Degree": "P.H.D", "Mobile": "+1 25 962689", "Email": "example@email.com", "Joining Date": "05/21/23"},
//     { "image": "avtar/4.jpg", "title": " Terry Aki", "Department": "Geogrphy", "Specialization": "Prostate", "Degree": "P.H.D", "Mobile": "+1 25 962689", "Email": "example@email.com", "Joining Date": "05/21/23"},
//     { "image": "avtar/1.jpg", "title": " Tiger Nixon", "Department": "Pol.Science", "Specialization": "Prostate", "Degree": "P.H.D", "Mobile": "+1 25 962689", "Email": "example@email.com", "Joining Date": "05/21/23"},
//     { "image": "avtar/2.jpg", "title": " Anna Mull", "Department": "Commerce", "Specialization": "Prostate", "Degree": "P.H.D", "Mobile": "+1 25 962689", "Email": "example@email.com", "Joining Date": "05/21/23"},
//   ];

//   const imageBodyTemplate = ({ image, title }) => {
//     return (
//       <div className="d-flex align-items-center">
//         <img src={IMAGE_URLS[image]} alt={image} className="product-image rounded-50 w-40" />
//         <span className="ml-10">{title}</span>
//       </div>
//     )
//   }

//   // Filters for DataTable
//   const [filters1, setFilters1] = useState({
//     'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
//     'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
//     'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
//     'representative': { value: null, matchMode: FilterMatchMode.IN },
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
//     const filters = filtersMap[filtersKey].value;
//     const value = filters['global'] ? filters['global'].value : '';

//     return (
//       <div className="d-flex justify-content-end align-align-items-baseline">
//         <Form.Group className="d-flex align-items-center">
//           <Form.Label className="pe-3 mb-0"> Search</Form.Label>
//           <InputGroup className=" px-2">
//             <Form.Control
//               type="search"
//               className="form-control px-2"
//               value={value || ''}
//               onChange={(e) => onGlobalFilterChange(e, filtersKey)}
//               placeholder="Global Search"
//             />
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
//           <Link className="edit" to="/edit-Mentor">
//             <FeatherIcon icon="edit" className="w-18" />
//           </Link>
//           <Link className="delete text-danger" to="">
//             <FeatherIcon icon="trash-2" className="w-18" />
//           </Link>
//         </div>
//       </React.Fragment>
//     );
//   }

//   // === GET logged-in user email from localStorage (adjust if you store it differently) ===
//   const userEmail = localStorage.getItem('userEmail');
// console.log("User Email from localStorage b  by honey:", userEmail);
//   return (
//     <>
//       <div className="themebody-wrap">
//         {/* Breadcrumb Start */}
//         <PageBreadcrumb pagename="All Mentor" />
//         {/* Breadcrumb End */}

//         <div className="theme-body">
//           <Container fluid>
//             <Row>
//               <Col>
//                 <Card>
//                   <Card.Body>
//                     <Row className="Product_list">

//                       {/* Show Add Mentor button only if userEmail === 'admin@gmail.com' */}
//                       {/* {userEmail === 'admin@gmail.com' && ( */}
//                         <Col md={12}>
//                           <Link className="btn btn-primary float-end mb-15" onClick={emailcreat}>
//                             <i className="fa fa-plus me-2"></i>
//                             Add Mentor
//                           </Link>
//                         </Col>
//                       {/* )} */}

//                       <DataTable
//                         value={sales}
//                         rows={10}
//                         header={header1}
//                         filters={filters1}
//                         onFilter={(e) => setFilters1(filters1)}
//                         stateStorage="session"
//                         paginator
//                         rowsPerPageOptions={[5, 10, 50]}
//                         paginatorTemplate="CurrentPageReport  FirstPageLink  PageLinks LastPageLink  RowsPerPageDropdown"
//                         currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
//                         className="p-datatable-customers"
//                       >
//                         <div header="Name" sortable body={imageBodyTemplate} ></div>
//                         <div field="Department" header="Department" sortable></div>
//                         <div field="Specialization" header="Specialization" sortable></div>
//                         <div field="Degree" header="Degree" sortable></div>
//                         <div field="Mobile" header="Mobile" sortable></div>
//                         <div field="Email" header="Email" sortable></div>
//                         <div field="Joining Date" header="Joining Date" sortable></div>
//                         <div field="Action" header="Action" sortable body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></div>
//                       </DataTable>

//                     </Row>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             </Row>
//           </Container>
//         </div>
//       </div>

//       {/* Modal Start */}
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
//                   <Form.Control
//                     type="text"
//                     name="name"
//                     placeholder="Enter Mentor Name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group className="mb-20">
//                   <Form.Label>Department</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="department"
//                     required
//                     placeholder="Department"
//                     value={formData.department}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group className="mb-20">
//                   <Form.Label>Specialization</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="specialization"
//                     required
//                     placeholder="Specialization"
//                     value={formData.specialization}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group className="mb-20">
//                   <Form.Label>Degree</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="degree"
//                     required
//                     placeholder="Degree"
//                     value={formData.degree}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group className="mb-20">
//                   <Form.Label>Mobile</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="mobile"
//                     required
//                     placeholder="Mobile Number"
//                     value={formData.mobile}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group className="mb-20">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     required
//                     placeholder="Email Id"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group className="mb-20">
//                   <Form.Label>Joining Date</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="joiningDate"
//                     placeholder="DD/MM/YYYY"
//                     value={formData.joiningDate}
//                     onChange={handleInputChange}
//                   />
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
//       {/* Modal End */}
//     </>
//   )
// }

// import { useState } from "react";
// import { FilterMatchMode, FilterOperator } from "primereact/api";
// import { DataTable } from "primereact/datatable";
// import FeatherIcon from "feather-icons-react";

// import { Link, useNavigate } from "react-router-dom";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Form,
//   InputGroup,
//   Modal,
//   Button,
// } from "react-bootstrap";

// import IMAGE_URLS from "/src/pages/api/Imgconfig.js";
// import PageBreadcrumb from "../componets/PageBreadcrumb";

// export default function All_Mentor() {
//   const [show, setShow] = useState(false);
//   const Close_btn = () => setShow(false);
//   const emailcreat = () => setShow(true);

//   const navigate = useNavigate();

//   const handleTestClick = () => {
//     navigate("/test-page");
//   };

//   const assignTestClick = () => {
//     navigate("/assign-test");
//   };

//   const [formData, setFormData] = useState({
//     name: "",
//     department: "",
//     specialization: "",
//     degree: "",
//     mobile: "",
//     email: "",
//     joiningDate: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const sales = [
//     {
//       image: "avtar/2.jpg",
//       title: " Anna Mull",
//       Department: "Math",
//       Specialization: "Prostate",
//       Degree: "P.H.D",
//       Mobile: "+1 25 962689",
//       Email: "example@email.com",
//       "Joining Date": "05/21/23",
//     },
//     {
//       image: "avtar/7.jpg",
//       title: " Hal Appeno",
//       Department: "Science",
//       Specialization: "Prostate",
//       Degree: "P.H.D",
//       Mobile: "+1 25 962689",
//       Email: "example@email.com",
//       "Joining Date": "05/21/23",
//     },
//     {
//       image: "avtar/9.jpg",
//       title: " Pat Agonia",
//       Department: "Hindi",
//       Specialization: "Prostate",
//       Degree: "P.H.D",
//       Mobile: "+1 25 962689",
//       Email: "example@email.com",
//       "Joining Date": "05/21/23",
//     },
//     {
//       image: "avtar/3.jpg",
//       title: " Paul Molive",
//       Department: "English",
//       Specialization: "Prostate",
//       Degree: "P.H.D",
//       Mobile: "+1 25 962689",
//       Email: "example@email.com",
//       "Joining Date": "05/21/23",
//     },
//     {
//       image: "avtar/8.jpg",
//       title: " Polly Tech",
//       Department: "Sanskrit",
//       Specialization: "Prostate",
//       Degree: "P.H.D",
//       Mobile: "+1 25 962689",
//       Email: "example@email.com",
//       "Joining Date": "05/21/23",
//     },
//     {
//       image: "avtar/5.jpg",
//       title: " Poppa Cherry",
//       Department: "Computer",
//       Specialization: "Prostate",
//       Degree: "P.H.D",
//       Mobile: "+1 25 962689",
//       Email: "example@email.com",
//       "Joining Date": "05/21/23",
//     },
//     {
//       image: "avtar/6.jpg",
//       title: " Saul T. Balls",
//       Department: "Social Study",
//       Specialization: "Prostate",
//       Degree: "P.H.D",
//       Mobile: "+1 25 962689",
//       Email: "example@email.com",
//       "Joining Date": "05/21/23",
//     },
//     {
//       image: "avtar/4.jpg",
//       title: " Terry Aki",
//       Department: "Geogrphy",
//       Specialization: "Prostate",
//       Degree: "P.H.D",
//       Mobile: "+1 25 962689",
//       Email: "example@email.com",
//       "Joining Date": "05/21/23",
//     },
//     {
//       image: "avtar/1.jpg",
//       title: " Tiger Nixon",
//       Department: "Pol.Science",
//       Specialization: "Prostate",
//       Degree: "P.H.D",
//       Mobile: "+1 25 962689",
//       Email: "example@email.com",
//       "Joining Date": "05/21/23",
//     },
//     {
//       image: "avtar/2.jpg",
//       title: " Anna Mull",
//       Department: "Commerce",
//       Specialization: "Prostate",
//       Degree: "P.H.D",
//       Mobile: "+1 25 962689",
//       Email: "example@email.com",
//       "Joining Date": "05/21/23",
//     },
//   ];

//   const imageBodyTemplate = ({ image, title }) => (
//     <div className="d-flex align-items-center">
//       <img
//         src={IMAGE_URLS[image]}
//         alt={image}
//         className="product-image rounded-50 w-40"
//       />
//       <span className="ml-10">{title}</span>
//     </div>
//   );

//   const [filters1, setFilters1] = useState({
//     global: { value: null, matchMode: FilterMatchMode.CONTAINS },
//     name: {
//       operator: FilterOperator.AND,
//       constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
//     },
//     "country.name": {
//       operator: FilterOperator.AND,
//       constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
//     },
//     representative: { value: null, matchMode: FilterMatchMode.IN },
//   });

//   const filtersMap = {
//     filters1: { value: filters1, callback: setFilters1 },
//   };

//   const onGlobalFilterChange = (event, filtersKey) => {
//     const value = event.target.value;
//     let filters = { ...filtersMap[filtersKey].value };
//     filters["global"].value = value;
//     filtersMap[filtersKey].callback(filters);
//   };

//   const renderHeader = (filtersKey) => {
//     const filters = filtersMap[filtersKey].value;
//     const value = filters["global"] ? filters["global"].value : "";
//     return (
//       <div className="d-flex justify-content-end align-align-items-baseline">
//         <Form.Group className="d-flex align-items-center">
//           <Form.Label className="pe-3 mb-0">Search</Form.Label>
//           <InputGroup className="px-2">
//             <Form.Control
//               type="search"
//               className="form-control px-2"
//               value={value || ""}
//               onChange={(e) => onGlobalFilterChange(e, filtersKey)}
//               placeholder="Global Search"
//             />
//           </InputGroup>
//         </Form.Group>
//       </div>
//     );
//   };

//   const header1 = renderHeader("filters1");

//   const actionBodyTemplate = () => (
//     <div className="cart-action">
//       <Link className="edit" to="/edit-Mentor">
//         <FeatherIcon icon="edit" className="w-18" />
//       </Link>
//       <Link className="delete text-danger" to="#">
//         <FeatherIcon icon="trash-2" className="w-18" />
//       </Link>
//     </div>
//   );

//   const userEmail = localStorage.getItem("loggedInEmail");
//   console.log("User Email from localStorage by honey:", userEmail);
//   const isMentor = userEmail === "mentor@gmail.com";
//   const isStudent = userEmail === "student@gmail.com";
//   const isAdmin = userEmail === "admin@gmail.com";
//   return (
//     <>
//       <div className="themebody-wrap">
//         <PageBreadcrumb pagename="All Mentor" />
//         <div className="theme-body">
//           <Container fluid>
//             <Row>
//               <Col>
//                 <Card>
//                   <Card.Body>
//                     <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
//                       <Button
//                         variant="primary"
//                         size="lg"
//                         className="px-4 rounded-pill shadow-sm"
//                         onClick={handleTestClick}
//                       >
//                         <FeatherIcon icon="plus-circle" className="me-2" />
//                         Create Mock Test
//                       </Button>

//                       <Button
//                         variant="success"
//                         size="lg"
//                         className="px-4 rounded-pill shadow-sm"
//                         onClick={assignTestClick}
//                       >
//                         <FeatherIcon icon="send" className="me-2" />
//                         Assign Test
//                       </Button>
//                     </div>
//                     <Row className="Product_list">
//                       {/* <Col md={12}>

//                           <Link className="btn btn-primary float-end mb-15" onClick={emailcreat}>

//                             <i className="fa fa-plus me-2"></i> Add Mentor
//                           </Link>
//                        </Col> */}

//                       {isAdmin && (
//                         <Col md={12}>
//                           <Link
//                             className="btn btn-primary float-end mb-15"
//                             onClick={emailcreat}
//                           >
//                             <i className="fa fa-plus me-2"></i> Add Mentor
//                           </Link>
//                         </Col>
//                       )}

//                       <DataTable
//                         value={sales}
//                         rows={10}
//                         header={header1}
//                         filters={filters1}
//                         onFilter={(e) => setFilters1(filters1)}
//                         stateStorage="session"
//                         paginator
//                         rowsPerPageOptions={[5, 10, 50]}
//                         paginatorTemplate="CurrentPageReport FirstPageLink PageLinks LastPageLink RowsPerPageDropdown"
//                         currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
//                         className="p-datatable-customers"
//                       >
//                         <div
//                           header="Name"
//                           sortable
//                           body={imageBodyTemplate}
//                         ></div>
//                         <div
//                           field="Department"
//                           header="Department"
//                           sortable
//                         ></div>
//                         <div
//                           field="Specialization"
//                           header="Specialization"
//                           sortable
//                         ></div>
//                         <div field="Degree" header="Degree" sortable></div>
//                         <div field="Mobile" header="Mobile" sortable></div>
//                         <div field="Email" header="Email" sortable></div>
//                         <div
//                           field="Joining Date"
//                           header="Joining Date"
//                           sortable
//                         ></div>
//                         <div
//                           field="Action"
//                           header="Action"
//                           sortable
//                           body={actionBodyTemplate}
//                           exportable={false}
//                           style={{ minWidth: "8rem" }}
//                         ></div>
//                       </DataTable>
//                     </Row>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             </Row>
//           </Container>
//         </div>
//       </div>

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
//               {[
//                 "name",
//                 "department",
//                 "specialization",
//                 "degree",
//                 "mobile",
//                 "email",
//                 "joiningDate",
//               ].map((field, idx) => (
//                 <Col md={6} key={field}>
//                   <Form.Group className="mb-20">
//                     <Form.Label>
//                       {field.charAt(0).toUpperCase() +
//                         field.slice(1).replace(/([A-Z])/g, " $1")}
//                     </Form.Label>
//                     <Form.Control
//                       type={field === "email" ? "email" : "text"}
//                       name={field}
//                       required
//                       placeholder={
//                         field === "joiningDate"
//                           ? "DD/MM/YYYY"
//                           : `Enter ${field}`
//                       }
//                       value={formData[field]}
//                       onChange={handleInputChange}
//                     />
//                   </Form.Group>
//                 </Col>
//               ))}
//             </Row>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer className="modal-footer">
//           <Button className="btn btn-primary">Save</Button>
//           <Button className="btn btn-danger" onClick={Close_btn}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

import { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import FeatherIcon from "feather-icons-react";
import { Column } from "primereact/column"; // ✅ import Column

import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  Modal,
  Button,
} from "react-bootstrap";

import IMAGE_URLS from "/src/pages/api/Imgconfig.js";
import PageBreadcrumb from "../componets/PageBreadcrumb";

// ✅ Degree priority map
const DEGREE_PRIORITY = {
  PhD: 3,
  "Post Graduation": 2,
  Graduation: 1,
};

// ✅ Helper function to pick latest degree
function getLatestDegree(education = []) {
  if (!Array.isArray(education)) return "-";

  const higherStudies = education.filter(
    (e) =>
      ["Graduation", "Post Graduation", "PhD"].includes(e.className) && e.degree
  );

  if (higherStudies.length === 0) return "-";

  higherStudies.sort(
    (a, b) => DEGREE_PRIORITY[b.className] - DEGREE_PRIORITY[a.className]
  );

  return higherStudies[0].degree || "-";
}

export default function All_Mentor() {
  const [show, setShow] = useState(false);
  const Close_btn = () => setShow(false);
  // const emailcreat = () => setShow(true);

  const navigate = useNavigate();

  const handleTestClick = () => navigate("/test-page");
  const assignTestClick = () => navigate("/assign-test");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const role = loggedInUser.role; // "admin" | "mentor" | "student"

  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    specialization: "",
    degree: "",
    mobile: "",
    email: "",
    mentorAbilities: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ NEW: State for dynamic mentor data
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/stats/mentors");
        const data = await res.json();
        if (res.ok) {
          // Map API data to match your table fields
          const mappedMentors = data.mentors.map((m, idx) => ({
            id: idx + 1,
            image: `avtar/${(idx % 10) + 1}.jpg`, // placeholder images
            title: m.name,
            experience: m.experience || "-",
            Specialization: m.specializedIn || "-",
            Degree: getLatestDegree(m.education), // ✅ dynamically get latest degree
            Mobile: m.mobileNo,
            Email: m.email,
            mentorAbilities: m.mentorAbilities || "-",
            isDisabled: m.isDisabled,
          }));
          setMentors(mappedMentors);
        } else {
          console.error("Error fetching mentors:", data.message);
        }
      } catch (err) {
        console.error("Server error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
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

  const renderHeader = (filtersKey) => {
    const filters = filtersMap[filtersKey].value;
    const value = filters.global ? filters.global.value : "";
    return (
      <div className="d-flex justify-content-end align-align-items-baseline">
        <Form.Group className="d-flex align-items-center">
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

  // ✅ Delete Mentor
  const handleDeleteMentor = async (email) => {
    if (!window.confirm("Are you sure you want to delete this mentor?")) return;

    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/stats/mentor/${encodeURIComponent(email)}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("✅ Mentor deleted successfully");
        setMentors((prev) => prev.filter((m) => m.Email !== email));
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error("Error deleting mentor:", err);
    }
  };

  // ✅ Toggle Disable/Enable Mentor
  const handleToggleMentor = async (email) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/stats/mentor/${encodeURIComponent(
          email
        )}/toggle`,
        { method: "PATCH" }
      );
      const data = await res.json();
      if (res.ok) {
        alert(
          `✅ Mentor ${data.isDisabled ? "disabled" : "enabled"} successfully`
        );
        setMentors((prev) =>
          prev.map((m) =>
            m.Email === email ? { ...m, isDisabled: data.isDisabled } : m
          )
        );
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error("Error toggling mentor:", err);
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="cart-action d-flex gap-2">
        {role === "admin" ? (
          <>
            <Button
              size="sm"
              variant="danger"
              onClick={() => handleDeleteMentor(rowData.Email)}
            >
              Delete
            </Button>
            <Button
              size="sm"
              variant={rowData.isDisabled ? "success" : "warning"}
              onClick={() => handleToggleMentor(rowData.Email)}
            >
              {rowData.isDisabled ? "Enable" : "Disable"}
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate(`/chat/${rowData.Email}`)}
          >
            Chat
          </Button>
        )}
      </div>
    );
  };

  // const userEmail = localStorage.getItem("loggedInEmail");
  // const isAdmin = userEmail === "admin@gmail.com";

  return (
    <>
      <div className="themebody-wrap">
        <PageBreadcrumb pagename="All Mentor" />
        <div className="theme-body">
          <Container fluid>
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
                      {(role === "mentor" || role === "admin") && (
                        <>
                          <Button
                            variant="primary"
                            size="lg"
                            className="px-4 rounded-pill shadow-sm"
                            onClick={handleTestClick}
                          >
                            <FeatherIcon icon="plus-circle" className="me-2" />
                            Create Mock Test
                          </Button>

                          <Button
                            variant="success"
                            size="lg"
                            className="px-4 rounded-pill shadow-sm"
                            onClick={assignTestClick}
                          >
                            <FeatherIcon icon="send" className="me-2" />
                            Assign Test
                          </Button>
                        </>
                      )}
                    </div>

                    {role !== "mentor" && (
                      <DataTable
                        value={mentors}
                        rows={10}
                        header={header1}
                        filters={filters1}
                        paginator
                        rowsPerPageOptions={[5, 10, 50]}
                        className="p-datatable-customers"
                        loading={loading}
                        rowClassName={rowClassName} // ✅ blur entire row
                      >
                        <Column
                          header="Name"
                          sortable
                          body={imageBodyTemplate}
                        ></Column>
                        <Column
                          field="experience"
                          header="Experience"
                          sortable
                        ></Column>
                        <Column
                          field="Specialization"
                          header="Specialization"
                          sortable
                        ></Column>
                        <Column
                          field="Degree"
                          header="Degree"
                          sortable
                        ></Column>
                        {role !== "student" && (
                          <Column
                            field="Mobile"
                            header="Mobile"
                            sortable
                          ></Column>
                        )}
                        <Column field="Email" header="Email" sortable></Column>
                        {/* NEW: Abilities Column */}
  <Column
    field="mentorAbilities"
    header="Abilities"
    body={(rowData) => rowData.mentorAbilities.join(", ")}
    sortable
  ></Column>
                        <Column
                          header="Action"
                          body={actionBodyTemplate}
                        ></Column>
                      </DataTable>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {role === "admin" && (
        <Modal show={show} onHide={Close_btn}>
          <Modal.Header>
            <Modal.Title>
              <h5 className="modal-title">Add New Mentor</h5>
            </Modal.Title>
            <span className="close-modal" onClick={Close_btn}>
              <FeatherIcon icon="x" />
            </span>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <Form>
              <Row>
                {[
                  "name",
                  "experience",
                  "specialization",
                  "degree",
                  "mobile",
                  "email",
                ].map((field) => (
                  <Col md={6} key={field}>
                    <Form.Group className="mb-20">
                      <Form.Label>
                        {field.charAt(0).toUpperCase() +
                          field.slice(1).replace(/([A-Z])/g, " $1")}
                      </Form.Label>
                      <Form.Control
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        required
                        placeholder={`Enter ${field}`}
                        value={formData[field]}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                ))}
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <Button className="btn btn-primary">Save</Button>
            <Button className="btn btn-danger" onClick={Close_btn}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

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
