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
  ListGroup,
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

  const navigate = useNavigate();

  const handleTestClick = () => navigate("/test-page");
  const assignTestClick = () => navigate("/assign-test");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const role = loggedInUser.role; // "admin" | "mentor" | "student"
  // allow opening details for admin and student view (keeps existing behaviour)
  const canViewMentorDetails = role === "admin" || role === "student";

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
  const [allMentors, setAllMentors] = useState([]);

  const [specializations, setSpecializations] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showMentorDetails, setShowMentorDetails] = useState(false);

  // --- NEW: mentor details state (fetched from backend)
  const [mentorDetails, setMentorDetails] = useState(null);
  const [mentorDetailsLoading, setMentorDetailsLoading] = useState(false);
  const [mentorDetailsError, setMentorDetailsError] = useState(null);

  // --- messages modal state (for chat view) - admin only
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [messagesList, setMessagesList] = useState([]);
  const [activeChatTitle, setActiveChatTitle] = useState("");

  // rating state
  const [avgRating, setAvgRating] = useState(null);
  const [ratingCount, setRatingCount] = useState(0);

  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingSubmitting, setRatingSubmitting] = useState(false);

  // helper sanitize + uniqueName (same as your twilio route)
  const sanitize = (s = "") =>
    String(s || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_");

  const makeUniqueName = (a = "", b = "") =>
    [sanitize(a), sanitize(b)].sort().join("_");

  const fetchMentors = async (spec = "All") => {
    try {
      setLoading(true);

      const url =
        spec && spec !== "All"
          ? `http://127.0.0.1:5000/api/stats/mentors?specialization=${encodeURIComponent(
              spec
            )}`
          : "http://127.0.0.1:5000/api/stats/mentors";

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        const mappedMentors = data.mentors.map((m, idx) => ({
          id: idx + 1,
          image: `avtar/${(idx % 10) + 1}.jpg`,
          title: m.name,
          experience: m.experience || "-",
          Specialization: (m.specializedIn || "").trim() || "-",
          Degree: getLatestDegree(m.education),
          Mobile: m.mobileNo,
          Email: m.email,
          mentorAbilities: m.mentorAbilities || [],
          isDisabled: m.isDisabled,
        }));

        setAllMentors(mappedMentors);
        setMentors(mappedMentors);

        const uniqueSpecs = [
          ...new Set(
            mappedMentors
              .map((m) => m.Specialization)
              .filter((s) => s && s !== "-")
          ),
        ];
        setSpecializations(uniqueSpecs);
      } else {
        console.error("Error fetching mentors:", data.message);
      }
    } catch (err) {
      console.error("Server error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

const handleSpecializationChange = (e) => {
  const value = e.target.value;
  setSelectedSpecialization(value);

  if (value === "All") {
    setMentors(allMentors); // ✅ restore full list
  } else {
    const filtered = allMentors.filter(
      (m) => m.Specialization === value
    );
    setMentors(filtered); // ✅ ONLY matching mentors
  }
};

  // --- NEW: open mentor details and fetch connected students + optional related exams
  const openMentorDetails = async (rowData) => {
    if (!canViewMentorDetails) return;
    setSelectedMentor(rowData);
    setShowMentorDetails(true);

    // Clear previous
    setMentorDetails(null);
    setMentorDetailsError(null);
    setMentorDetailsLoading(true);

    // reset rating
    setAvgRating(null);
    setRatingCount(0);

    // 🔹 FETCH AVG RATING (independent call)
    fetch(
      `http://127.0.0.1:5000/api/stats/mentor/${encodeURIComponent(
        rowData.Email
      )}/rating`
    )
      .then((r) => r.json())
      .then((d) => {
        setAvgRating(d.avgRating);
        setRatingCount(d.count);
      })
      .catch(() => {
        setAvgRating(null);
        setRatingCount(0);
      });

    try {
      // call your API implemented earlier
      const res = await fetch(
        `http://127.0.0.1:5000/api/stats/mentor/${encodeURIComponent(
          rowData.Email
        )}/details`
      );
      const data = await res.json();
      if (!res.ok) {
        setMentorDetailsError(data.message || "Failed to load mentor details");
        setMentorDetails(null);
      } else {
        // expected shape: { mentor: {...}, students: { count, items }, relatedExams: [...] }
        setMentorDetails(data);
      }
    } catch (err) {
      console.error("Error fetching mentor details:", err);
      setMentorDetailsError("Server error while loading mentor details");
      setMentorDetails(null);
    } finally {
      setMentorDetailsLoading(false);
    }
  };

  const closeMentorDetails = () => {
    setShowMentorDetails(false);
    setSelectedMentor(null);
    setMentorDetails(null);
    setMentorDetailsError(null);
    setAvgRating(null);
    setRatingCount(0);
  };

const imageBodyTemplate = (rowData) => {
  return (
    <button
      type="button"
      className="btn btn-link p-0 d-flex align-items-center"
      style={{ textDecoration: "none", color: "inherit" }}
      onClick={() =>
        navigate(`/doctor-info/${encodeURIComponent(rowData.Email)}`)
      }
    >
      <img
        src={IMAGE_URLS[rowData.image]}
        className="product-image rounded-50 w-40"
      />
      <span className="ms-2">{rowData.title}</span>
    </button>
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

  // --- messages fetch for admin (mentor <-> student)
  const handleViewMessages = async (studentEmail, studentName) => {
    // admin-only per your request
    if (role !== "admin") return;
    if (!selectedMentor) return alert("Open a mentor first.");

    const mentorEmail = selectedMentor.Email;
    const uniqueName = makeUniqueName(mentorEmail, studentEmail);

    setActiveChatTitle(
      `${selectedMentor.title} ↔ ${studentName || studentEmail}`
    );
    setShowMessagesModal(true);
    setMessagesLoading(true);
    setMessagesError(null);
    setMessagesList([]);

    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/conversation/${encodeURIComponent(
          uniqueName
        )}/messages`
      );
      const data = await res.json();
      if (!res.ok) {
        setMessagesError(data.error || "Failed to fetch messages");
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

  const renderHeader = (filtersKey) => {
    const filters = filtersMap[filtersKey].value;
    const value = filters.global ? filters.global.value : "";

    return (
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
        {/* 🔽 Left: Filter by specialization (admin + student only) */}
        {(role === "admin" || role === "student") && (
          <Form.Group className="d-flex align-items-center mb-0">
            <Form.Label className="pe-2 mb-0">
              Filter by Specialization
            </Form.Label>
            <Form.Select
              size="sm"
              value={selectedSpecialization}
              onChange={handleSpecializationChange}
              style={{ minWidth: "220px" }}
            >
              <option value="All">All Specializations</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}

        {/* 🔽 Right: Global search */}
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
            onClick={() =>
              navigate(`/chat/${rowData.Email}`, {
                state: {
                  mentorName: rowData.title, // ✅ mentor name
                },
              })
            }
          >
            Chat
          </Button>
        )}
      </div>
    );
  };

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
                          body={(rowData) =>
                            Array.isArray(rowData.mentorAbilities)
                              ? rowData.mentorAbilities.join(", ")
                              : rowData.mentorAbilities || "-"
                          }
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

      {/* {role === "admin" && (
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
      )} */}

      {/* Mentor Details Modal (shows connected students + chat for admin) */}
      {canViewMentorDetails && (
        <Modal
          show={showMentorDetails}
          onHide={closeMentorDetails}
          centered
          backdrop
        >
          <Modal.Header closeButton>
            <Modal.Title>Mentor Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedMentor && (
              <>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={IMAGE_URLS[selectedMentor.image]}
                    alt={selectedMentor.image}
                    className="product-image rounded-50 w-60 me-3"
                    style={{ width: 60, height: 60, objectFit: "cover" }}
                  />
                  <div>
                    <h5 className="mb-0">{selectedMentor.title}</h5>
                    <small className="text-muted">
                      {selectedMentor.Specialization || "No specialization"}
                    </small>
                  </div>
                </div>

                <p>
                  <strong>Email:</strong> {selectedMentor.Email}
                </p>
                <p>
                  <strong>Rating:</strong>{" "}
                  {avgRating !== null ? (
                    <>
                      ⭐ {avgRating.toFixed(1)} / 5{" "}
                      <small className="text-muted">
                        ({ratingCount} ratings)
                      </small>
                    </>
                  ) : (
                    <span className="text-muted">No ratings yet</span>
                  )}
                </p>
                {role !== "student" && (
                  <p>
                    <strong>Mobile:</strong> {selectedMentor.Mobile || "-"}
                  </p>
                )}
                <p>
                  <strong>Experience:</strong>{" "}
                  {selectedMentor.experience || "-"}
                </p>
                <p>
                  <strong>Degree:</strong> {selectedMentor.Degree || "-"}
                </p>
                <p>
                  <strong>Abilities:</strong>{" "}
                  {Array.isArray(selectedMentor.mentorAbilities) &&
                  selectedMentor.mentorAbilities.length > 0
                    ? selectedMentor.mentorAbilities.join(", ")
                    : "-"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {selectedMentor.isDisabled ? "Disabled" : "Active"}
                </p>
              </>
            )}

            {/* mentor details fetched from API */}
            {mentorDetailsLoading && <p>Loading connected students...</p>}
            {mentorDetailsError && (
              <p className="text-danger">{mentorDetailsError}</p>
            )}

            {mentorDetails && !mentorDetailsLoading && (
              <>
                <div className="mb-3">
                  <h5>Connected Students</h5>
                  {!mentorDetails.students ||
                  mentorDetails.students.count === 0 ? (
                    <p className="text-muted">
                      No students connected to this mentor.
                    </p>
                  ) : (
                    <ListGroup>
                      {mentorDetails.students.items.map((s) => (
                        <ListGroup.Item
                          key={s.email}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <strong>{s.name}</strong> — {s.email}{" "}
                            {s.class && (
                              <span className="text-muted">({s.class})</span>
                            )}
                            <div>
                              <small className="text-muted">
                                Last interaction:{" "}
                                {s.lastInteraction
                                  ? new Date(s.lastInteraction).toLocaleString()
                                  : "N/A"}
                              </small>
                            </div>
                          </div>

                          {/* admin-only view chat button */}
                          {role === "admin" && (
                            <div>
                              <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() =>
                                  handleViewMessages(s.email, s.name)
                                }
                              >
                                View Chat
                              </Button>
                            </div>
                          )}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </div>

                {/* optional relatedExams (if your API returned any) */}
                {Array.isArray(mentorDetails.relatedExams) &&
                  mentorDetails.relatedExams.length > 0 && (
                    <div className="mb-2">
                      <h5>Related Exams</h5>
                      <ListGroup>
                        {mentorDetails.relatedExams.slice(0, 6).map((ex) => (
                          <ListGroup.Item key={ex.id}>
                            <div className="d-flex justify-content-between">
                              <div>
                                <strong>{ex.studentEmail}</strong> — {ex.class}{" "}
                                / {ex.type}
                              </div>
                              <div>
                                <small>
                                  {ex.submittedAt
                                    ? new Date(ex.submittedAt).toLocaleString()
                                    : ""}
                                </small>
                              </div>
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </div>
                  )}
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            {role === "student" && (
              <div className="mt-3 text-center">
                <Button
                  variant="warning"
                  onClick={() => setShowRatingModal(true)}
                >
                  ⭐ Rate this Mentor
                </Button>
              </div>
            )}
            {(role === "admin" || role === "student") && selectedMentor && (
              <Button
                variant="info"
                onClick={() =>
                  navigate(
                    `/mentor/${encodeURIComponent(
                      selectedMentor.Email
                    )}/materials`,
                    {
                      state: {
                        mentorName: selectedMentor.title, // name
                      },
                    }
                  )
                }
              >
                📚 Study Materials
              </Button>
            )}

            <Button variant="secondary" onClick={closeMentorDetails}>
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
                const isFromMentor =
                  selectedMentor &&
                  String(m.author).toLowerCase() ===
                    String(selectedMentor.Email).toLowerCase();
                const align = isFromMentor ? "flex-end" : "flex-start";
                const bg = isFromMentor ? "#d9edf7" : "#f1f3f5";
                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: isFromMentor ? "flex-end" : "flex-start",
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

      <Modal
        show={showRatingModal}
        onHide={() => setShowRatingModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Rate Mentor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  fontSize: 30,
                  cursor: "pointer",
                  color: star <= selectedRating ? "#ffc107" : "#ccc",
                }}
                onClick={() => setSelectedRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRatingModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={!selectedRating || ratingSubmitting}
            onClick={async () => {
              try {
                setRatingSubmitting(true);
                await fetch(
                  `http://127.0.0.1:5000/api/stats/mentor/${selectedMentor.Email}/rate`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      studentEmail: loggedInUser.email,
                      rating: selectedRating,
                    }),
                  }
                );

                setShowRatingModal(false);
                setSelectedRating(0);

                // refresh avg rating
                const r = await fetch(
                  `http://127.0.0.1:5000/api/stats/mentor/${selectedMentor.Email}/rating`
                );
                const d = await r.json();
                setAvgRating(d.avgRating);
                setRatingCount(d.count);
              } finally {
                setRatingSubmitting(false);
              }
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

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