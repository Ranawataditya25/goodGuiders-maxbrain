// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import FeatherIcon from 'feather-icons-react';
// import { Row, Col, Card, Form, Table, Container, Dropdown } from 'react-bootstrap';
// import PageBreadcrumb from '../componets/PageBreadcrumb';
// import SimpleBar from 'simplebar-react';
// import Chart from "react-apexcharts";
// import { hospitalsurvay, recoverystatistics, diseasesreport } from './js/Dashboard1';

// import Top_doctors from "../componets/Top_doctors";
// import IMAGE_URLS from "/src/pages/api/Imgconfig.js";

// export default function Index() {
//   // Live Chat Data 
//   const [inputValue, setInputValue] = useState('');
//   const [totalMentors, setTotalMentors] = useState(0);
// const [totalStudents, setTotalStudents] = useState(0);

// useEffect(() => {
//   fetch("http://127.0.0.1:5000/api/stats/total-users")  // replace with full URL if needed
//     .then(res => res.json())
//     .then(data => {
//       setTotalMentors(data.totalMentors);
//       setTotalStudents(data.totalStudents);
//     })
//     .catch(err => console.error("Error fetching totals:", err));
// }, []);

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };
//   return (
//     <div className="themebody-wrap">
//       {/* Breadcrumb Start */}
//       <PageBreadcrumb pagename="Dashboard" />
//       {/* Breadcrumb End */}
//       {/* theme body start */}
//       <SimpleBar className="theme-body common-dash" >
//         <Container fluid>
//           <Row>
//             {/* HERO CARD */}
//             <Col lg={6}>
//               <Card className="hos-welcome">
//                 <Card.Body>
//                   <h3>Welcome to<br />Good Guiders</h3>
//                   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
//                   <div className="d-flex flex-wrap gap-2">
//                     <Link className="btn btn-secondary" to="#">Read More</Link>
//                     {/* moved class buttons to a dedicated card below */}
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>

//             {/* COUNTS */}
//             <Col lg={6}>
//               <Row>
//                 <Col sm={6}>
//                   <Card className=" hosinfo-count">
//                     <Card.Body>
//                       <div className="media">
//                         <div className="icon-wrap bg-warning">
//                           <i className="fa fa-handshake-o"></i>
//                         </div>
//                         <div className="count-detail">
//                           <h3><span className="counter mr-5">112</span>Appointment</h3>
//                           <p>Total Appointment </p>
//                         </div>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//                 <Col sm={6}>
//                   <Card className=" hosinfo-count">
//                     <Card.Body>
//                       <div className="media">
//                         <div className="icon-wrap bg-secondary">
//                           <i className="fa fa-user"></i>
//                         </div>
//                         <div className="count-detail">
//                           <h3><span className="counter mr-5">{totalMentors}</span>Mentor</h3>
//                           <p>Available Mentor</p>
//                         </div>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//                 <Col sm={6}>
//                   <Card className=" hosinfo-count">
//                     <Card.Body>
//                       <div className="media">
//                         <div className="icon-wrap bg-success">
//                           <i className="fa fa-smile-o"></i>
//                         </div>
//                         <div className="count-detail">
//                           <h3><span className="counter mr-5">145</span>Bills</h3>
//                           <p>Students Bills</p>
//                         </div>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//                 <Col sm={6}>
//                   <Card className=" hosinfo-count">
//                     <Card.Body>
//                       <div className="media">
//                         <div className="icon-wrap bg-info">
//                           <i className="fa fa-life-ring"></i>
//                         </div>
//                         <div className="count-detail">
//                           <h3><span className="counter mr-5">{totalStudents}</span>Student</h3>
//                           <p>All Student</p>
//                         </div>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               </Row>
//             </Col>

//             {/* NEW: CLASS MANAGEMENT CARD */}
//             <Col lg={12}>
//               <Card className="mb-3">
//                 <Card.Header>
//                   <h4 className="mb-0">Class Management</h4>
//                 </Card.Header>
//                 <Card.Body>
//                   <p className="mb-3">
//                     Create and manage classes, subjects, and chapters. Upload 1-page and full-notes PDFs for each chapter.
//                   </p>
//                   <div className="d-flex flex-wrap gap-2">
//                     <Link className="btn btn-primary" to="/classes/new">+ Create Class</Link>
//                     <Link className="btn btn-outline-primary" to="/classes">All Classes</Link>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>

//             {/* CHART PLACEHOLDER */}
//             <Col xxl={8} lg={7}>
//               <Card className=" earning-chart">
//                 {/* <Card.Body>
//                   <Chart options={hospitalsurvay} series={hospitalsurvay.series} height={380} type='area' />
//                 </Card.Body> */}
//               </Card>
//             </Col>

//             {/* NOTIFICATIONS */}
//             <Col xxl={4} lg={5}>
//               <Card className="">
//                 <Card.Header>
//                   <h4>Notifications</h4>
//                 </Card.Header>
//                 <Card.Body>
//                   <ul className="docnoti-list dashnoti-list" data-simplebar>
//                     <li>
//                       <div className="media">
//                         <img className="rounded-50 w-40" src={IMAGE_URLS['avtar/1.jpg']} alt="" />
//                         <div className="media-body">
//                           <h6> Anna  Send you Photo</h6><span className="text-light">10, Feb ,2023</span>
//                         </div>
//                         <div className="badge badge-primary">10:15 Pm</div>
//                       </div>
//                     </li>
//                     <li>
//                       <div className="media">
//                         <img className="rounded-50 w-40" src={IMAGE_URLS['avtar/2.jpg']} alt="" />
//                         <div className="media-body">
//                           <h6> Anna  Send you Photo</h6><span className="text-light">05, March ,2023</span>
//                         </div>
//                         <div className="badge badge-primary">09:20 Pm</div>
//                       </div>
//                     </li>
//                     <li>
//                       <div className="media">
//                         <img className="rounded-50 w-40" src={IMAGE_URLS['avtar/3.jpg']} alt="" />
//                         <div className="media-body">
//                           <h6> Anna  Send you Photo</h6><span className="text-light">01, Jan ,2023</span>
//                         </div>
//                         <div className="badge badge-primary">03:40 Pm</div>
//                       </div>
//                     </li>
//                     <li>
//                       <div className="media">
//                         <img className="rounded-50 w-40" src={IMAGE_URLS['avtar/4.jpg']} alt="" />
//                         <div className="media-body">
//                           <h6> Anna  Send you Photo</h6><span className="text-light">25, Feb ,2023</span>
//                         </div>
//                         <div className="badge badge-primary">05:26 Am</div>
//                       </div>
//                     </li>
//                   </ul>
//                 </Card.Body>
//                 <div className="card-footer">
//                   <Link className="btn btn-primary d-block mx-auto btn-lg" to="#">See All Notification</Link>
//                 </div>
//               </Card>
//             </Col>

//             {/* TOP RATED MENTOR */}
//             <Col xxl={4} lg={5}>
//               <Card className=" recentpatient-card">
//                 <Card.Header>
//                   <h4>Recent Student</h4>
//                   <div className="setting-card action-menu">
//                     <Dropdown>
//                       <Dropdown.Toggle >
//                         <FeatherIcon className="codeCopy" icon="more-horizontal" />
//                       </Dropdown.Toggle>

//                       <Dropdown.Menu>
//                         <Dropdown.Item href="#">
//                           <i className="fa fa-calendar-o"></i>weekly
//                         </Dropdown.Item>
//                         <Dropdown.Item href="#">
//                           <i className="fa fa-calendar-check-o"></i>monthly
//                         </Dropdown.Item>
//                         <Dropdown.Item href="#">
//                           <i className="fa fa-calendar"></i>yearly
//                         </Dropdown.Item>
//                       </Dropdown.Menu>
//                     </Dropdown>
//                   </div>
//                 </Card.Header>
//                 <Card.Body>
//                   <div className="table-responsive">
//                     <Table className="table">
//                       <tbody>
//                         <tr>
//                           <td className="pt-0">
//                             <div className="media">
//                               <div className="badgeavtar bg-primary">J</div>
//                               <div className="media-body ml-10">
//                                 <h6 className="text-default">Jordan Nt</h6>
//                                 <p className="text-light">41 Years Old</p>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="pt-0"><span className="badge badge-success">Assessment Done</span></td>
//                         </tr>
//                         <tr>
//                           <td>
//                             <div className="media">
//                               <div className="badgeavtar bg-secondary">A</div>
//                               <div className="media-body ml-10">
//                                 <h6 className="text-default">Angela Nurhayati</h6>
//                                 <p className="text-light">41 Years Old</p>
//                               </div>
//                             </div>
//                           </td>
//                           <td> <span className="badge badge-success">New Registration</span></td>
//                         </tr>
//                         <tr>
//                           <td>
//                             <div className="media">
//                               <div className="badgeavtar bg-success">T</div>
//                               <div className="media-body ml-10">
//                                 <h6 className="text-default">Thomas Jaja</h6>
//                                 <p className="text-light">28 Years Old</p>
//                               </div>
//                             </div>
//                           </td>
//                           <td> <span className="badge badge-warning">In Registration</span></td>
//                         </tr>
//                         <tr>
//                           <td>
//                             <div className="media">
//                               <div className="badgeavtar bg-warning">J</div>
//                               <div className="media-body ml-10">
//                                 <h6 className="text-default">Jordan Nt</h6>
//                                 <p className="text-light">20 Years Old</p>
//                               </div>
//                             </div>
//                           </td>
//                           <td> <span className="badge badge-info">Suspended</span></td>
//                         </tr>
//                         <tr>
//                           <td>
//                             <div className="media">
//                               <div className="badgeavtar bg-info">J</div>
//                               <div className="media-body ml-10">
//                                 <h6 className="text-default">Jordan Nt</h6>
//                                 <p className="text-light">30 Years Old</p>
//                               </div>
//                             </div>
//                           </td>
//                           <td> <span className="badge badge-warning">Deleted</span></td>
//                         </tr>
//                       </tbody>
//                     </Table>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>

//             <Col xxl={8} lg={7}>
//               <Card className=" toprated-doctor pb-20">
//                 <Card.Header>
//                   <h4>Top Rated Mentor</h4>
//                 </Card.Header>
//                 <Card.Body>
//                   <Top_doctors />
//                 </Card.Body>
//               </Card>
//             </Col>

//             {/* CHART PLACEHOLDERS */}
//             <Col lg={6}>
//               <Card className=" visitor-performance">
//                 {/* <Card.Body>
//                   <Chart options={recoverystatistics} series={recoverystatistics.series} height={340} type='line' />
//                 </Card.Body> */}
//               </Card>
//             </Col>
//             <Col lg={6}>
//               {/* <Card className=" visitor-ratetbl">
//                 <Card.Header>
//                   <h4>Common Diseases Report</h4>
//                   <div className="setting-card action-menu">
//                     <Dropdown>
//                       <Dropdown.Toggle >
//                         <FeatherIcon className="codeCopy" icon="more-horizontal" />
//                       </Dropdown.Toggle>

//                       <Dropdown.Menu>
//                         <Dropdown.Item href="#">
//                           <i className="fa fa-calendar-o"></i>weekly
//                         </Dropdown.Item>
//                         <Dropdown.Item href="#">
//                           <i className="fa fa-calendar-check-o"></i>monthly
//                         </Dropdown.Item>
//                         <Dropdown.Item href="#">
//                           <i className="fa fa-calendar"></i>yearly
//                         </Dropdown.Item>
//                       </Dropdown.Menu>
//                     </Dropdown>
//                   </div>
//                 </Card.Header>
//                 <Card.Body>
//                   <Chart options={diseasesreport} series={diseasesreport.series} height={365} type='bar' />
//                 </Card.Body>
//               </Card> */}
//             </Col>

//             {/* STUDENT VISITS TABLE */}
//             <Col xxl={8} lg={6}>
//               <Card className=" patientvisits-tbl">
//                 <Card.Header>
//                   <h4>Student Visits</h4>
//                 </Card.Header>
//                 <Card.Body>
//                   <Table bordered responsive className="transaction-tbl" >
//                     <thead>
//                       <tr>
//                         <th>Mentor Name</th>
//                         <th>visit Date</th>
//                         <th>visit Time </th>
//                         <th>Invoice</th>
//                         <th>Charges</th>
//                         <th>Status</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td> Tiger Nixon</td>
//                         <td>10/05/2023</td>
//                         <td>09:30 Am</td>
//                         <td>Operation</td>
//                         <td>$80</td>
//                         <td>Resheduled</td>
//                         <td>
//                           <Link className="text-success" to="#">
//                             <FeatherIcon className="w-18" icon="edit" />
//                           </Link>
//                           <Link className="text-danger ml-8" to="#">
//                             <FeatherIcon className="w-18" icon="trash-2" />
//                           </Link>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td> Hal Appeno</td>
//                         <td>05/06/2023</td>
//                         <td>08:00 Am</td>
//                         <td>Check up</td>
//                         <td>$50</td>
//                         <td>Fever</td>
//                         <td>
//                           <Link className="text-success" to="#">
//                             <FeatherIcon className="w-18" icon="edit" />
//                           </Link>
//                           <Link className="text-danger ml-8" to="#">
//                             <FeatherIcon className="w-18" icon="trash-2" />
//                           </Link>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td> Pat Agonia</td>
//                         <td>20/02/2023</td>
//                         <td>10:30 Am</td>
//                         <td>Admit</td>
//                         <td>$75</td>
//                         <td>Ortho</td>
//                         <td>
//                           <Link className="text-success" to="#">
//                             <FeatherIcon className="w-18" icon="edit" />
//                           </Link>
//                           <Link className="text-danger ml-8" to="#">
//                             <FeatherIcon className="w-18" icon="trash-2" />
//                           </Link>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td> Paul Molive</td>
//                         <td>15/08/2023</td>
//                         <td>03:00 Pm</td>
//                         <td> Blood Test</td>
//                         <td>$60</td>
//                         <td>General Check-up</td>
//                         <td>
//                           <Link className="text-success" to="#">
//                             <FeatherIcon className="w-18" icon="edit" />
//                           </Link>
//                           <Link className="text-danger ml-8" to="#">
//                             <FeatherIcon className="w-18" icon="trash-2" />
//                           </Link>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td> Polly Tech</td>
//                         <td>12/07/2023</td>
//                         <td>12:00 Pm</td>
//                         <td>Discharge</td>
//                         <td>$40</td>
//                         <td>Injury</td>
//                         <td>
//                           <Link className="text-success" to="#">
//                             <FeatherIcon className="w-18" icon="edit" />
//                           </Link>
//                           <Link className="text-danger ml-8" to="#">
//                             <FeatherIcon className="w-18" icon="trash-2" />
//                           </Link>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td> Hal Appeno</td>
//                         <td>05/06/2023</td>
//                         <td>08:00 Am</td>
//                         <td>Check up</td>
//                         <td>$50</td>
//                         <td>Fever</td>
//                         <td>
//                           <Link className="text-success" to="#">
//                             <FeatherIcon className="w-18" icon="edit" />
//                           </Link>
//                           <Link className="text-danger ml-8" to="#">
//                             <FeatherIcon className="w-18" icon="trash-2" />
//                           </Link>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </Table>
//                 </Card.Body>
//               </Card>
//             </Col>

//             {/* LIVE CHAT */}
//             <Col xxl={4} lg={6}>
//               <Card className=" dash-chat">
//                 <Card.Header>
//                   <h4>live caht</h4>
//                 </Card.Header>
//                 <Card.Body>
//                   <div className="dash-chatbox">
//                     <SimpleBar className="chating-list">
//                       <ul >
//                         <li>
//                           <div className="user-msgbox">
//                             <div className="media">
//                               <img className="img-fluid" src={IMAGE_URLS['avtar/1.jpg']} alt="image" />
//                               <div className="media-body">
//                                 <p>Lorem ipsum dolor sit amet</p>
//                               </div>
//                             </div>
//                           </div>
//                         </li>
//                         <li>
//                           <div className="admin-msgbox">
//                             <div className="media">
//                               <div className="media-body">
//                                 <p>Adipisicing elit, sed do eiusmod.</p>
//                               </div>
//                               <img className="img-fluid" src={IMAGE_URLS['avtar/2.jpg']} alt="image" />
//                             </div>
//                           </div>
//                         </li>
//                         <li>
//                           <div className="admin-msgbox">
//                             <div className="media">
//                               <div className="media-body">
//                                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.</p>
//                               </div>
//                               <img className="img-fluid" src={IMAGE_URLS['avtar/2.jpg']} alt="image" />
//                             </div>
//                           </div>
//                         </li>
//                         <li>
//                           <div className="user-msgbox">
//                             <div className="media">
//                               <img className="img-fluid" src={IMAGE_URLS['avtar/1.jpg']} alt="image" />
//                               <div className="media-body">
//                                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.</p>
//                               </div>
//                             </div>
//                           </div>
//                         </li>
//                         <li>
//                           <div className="admin-msgbox">
//                             <div className="media">
//                               <div className="media-body">
//                                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod</p>
//                               </div>
//                               <img className="img-fluid" src={IMAGE_URLS['avtar/2.jpg']} alt="image" />
//                             </div>
//                           </div>
//                         </li>
//                         <li>
//                           <div className="user-msgbox">
//                             <div className="media">
//                               <img className="img-fluid" src={IMAGE_URLS['avtar/1.jpg']} alt="image" />
//                               <div className="media-body">
//                                 <p>Lorem ipsum dolor sit amet</p>
//                               </div>
//                             </div>
//                           </div>
//                         </li>
//                         <li>
//                           <div className="admin-msgbox">
//                             <div className="media">
//                               <div className="media-body">
//                                 <p>Adipisicing elit, sed do eiusmod.</p>
//                               </div>
//                               <img className="img-fluid" src={IMAGE_URLS['avtar/2.jpg']} alt="image" />
//                             </div>
//                           </div>
//                         </li>
//                       </ul>
//                     </SimpleBar>
//                     <div className="userchat-typebox d-flex">
//                       <Link to={''} className="btn btn-primary me-2">
//                         <FeatherIcon icon="smile" />
//                       </Link>
//                       <Form.Control type="text" name="udsfug" placeholder="Type a message" value={inputValue}
//                         onChange={handleInputChange} autoComplete="off" />
//                       <Link to={''} className="btn btn-primary ms-2">
//                         <FeatherIcon icon="send" />
//                       </Link>
//                     </div>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </SimpleBar>
//       {/* theme body end */}
//     </div>
//   )
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom"; // ✅ navigate import
// import FeatherIcon from "feather-icons-react";
// import {
//   Row,
//   Col,
//   Card,
//   Form,
//   Table,
//   Container,
//   Dropdown,
// } from "react-bootstrap";
// import PageBreadcrumb from "../componets/PageBreadcrumb";
// import SimpleBar from "simplebar-react";
// import Chart from "react-apexcharts";
// import {
//   hospitalsurvay,
//   recoverystatistics,
//   diseasesreport,
// } from "./js/Dashboard1";

// import Top_doctors from "../componets/Top_doctors";
// import IMAGE_URLS from "/src/pages/api/Imgconfig.js";

// export default function Index() {
//   // Live Chat Data
//   const [inputValue, setInputValue] = useState("");
//   const [totalMentors, setTotalMentors] = useState(0);
//   const [totalStudents, setTotalStudents] = useState(0);
//   const [pendingMentors, setPendingMentors] = useState(0);

//   const navigate = useNavigate(); // ✅ hook for navigation

//   useEffect(() => {
//     // total mentors + students
//     fetch("http://127.0.0.1:5000/api/stats/total-users")
//       .then((res) => res.json())
//       .then((data) => {
//         setTotalMentors(data.totalMentors || 0);
//         setTotalStudents(data.totalStudents || 0);
//       })
//       .catch((err) => console.error("Error fetching totals:", err));

//     // pending mentor verifications
//     fetch("http://127.0.0.1:5000/api/mentor/pending")
//       .then((res) => res.json())
//       .then((data) => {
//         // if backend returns array
//         const count = Array.isArray(data) ? data.length : 0;
//         setPendingMentors(count);
//       })
//       .catch((err) => console.error("Error fetching pending mentors:", err));
//   }, []);

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   return (
//     <div className="themebody-wrap">
//       {/* Breadcrumb Start */}
//       <PageBreadcrumb pagename="Dashboard" />
//       {/* Breadcrumb End */}

//       <SimpleBar className="theme-body common-dash">
//         <Container fluid>
//           <Row>
//             {/* HERO CARD */}
//             <Col lg={6}>
//               <Card className="hos-welcome">
//                 <Card.Body>
//                   <h3>
//                     Welcome to
//                     <br />
//                     Good Guiders
//                   </h3>
//                   <p>
//                     Lorem ipsum dolor sit amet, consectetur adipisicing elit,
//                     sed do eiusmod tempor.
//                   </p>
//                   <div className="d-flex flex-wrap gap-2">
//                     <Link className="btn btn-secondary" to="#">
//                       Read More
//                     </Link>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>

//             {/* COUNTS */}
//             <Col lg={6}>
//               <Row>
//                 <Col sm={6}>
//                   <Card className="hosinfo-count">
//                     <Card.Body>
//                       <div className="media">
//                         <div className="icon-wrap bg-warning">
//                           <i className="fa fa-handshake-o"></i>
//                         </div>
//                         <div
//                           className="count-detail"
//                           onClick={() => navigate("/admin-mentor-requests")}
//                           style={{ cursor: "pointer" }}
//                         >
//                           <h3>
//                             <span className="counter mr-5">
//                               {pendingMentors}
//                             </span>
//                             Mentor Verification
//                           </h3>
//                           <p>Pending Requests</p>
//                         </div>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Col>

//                 <Col sm={6}>
//                   <Card className=" hosinfo-count">
//                     <Card.Body>
//                       <div className="media">
//                         <div className="icon-wrap bg-secondary">
//                           <i className="fa fa-user"></i>
//                         </div>
//                         <div className="count-detail">
//                           <h3>
//                             <span className="counter mr-5">{totalMentors}</span>
//                             Mentor
//                           </h3>
//                           <p>Available Mentor</p>
//                         </div>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Col>

//                 <Col sm={6}>
//                   <Card className=" hosinfo-count">
//                     <Card.Body>
//                       <div className="media">
//                         <div className="icon-wrap bg-success">
//                           <i className="fa fa-smile-o"></i>
//                         </div>
//                         <div className="count-detail">
//                           <h3>
//                             <span className="counter mr-5">149</span>Bills
//                           </h3>
//                           <p>Students Bills</p>
//                         </div>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Col>

//                 <Col sm={6}>
//                   <Card className=" hosinfo-count">
//                     <Card.Body>
//                       <div className="media">
//                         <div className="icon-wrap bg-info">
//                           <i className="fa fa-life-ring"></i>
//                         </div>
//                         <div className="count-detail">
//                           <h3>
//                             <span className="counter mr-5">
//                               {totalStudents}
//                             </span>
//                             Student
//                           </h3>
//                           <p>All Student</p>
//                         </div>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               </Row>
//             </Col>

//             <Col lg={12}>
//               <Card className="mb-3">
//                 <Card.Header>
//                   <h4 className="mb-0">Class Management</h4>
//                 </Card.Header>
//                 <Card.Body>
//                   <p className="mb-3">
//                     Create and manage classes, subjects, and chapters. Upload
//                     1-page and full-notes PDFs for each chapter.
//                   </p>
//                   <div className="d-flex flex-wrap gap-2">
//                     <Link className="btn btn-primary" to="/classes/new">
//                       + Create Class
//                     </Link>
//                     <Link className="btn btn-outline-primary" to="/classes">
//                       All Classes
//                     </Link>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>

//             {/* CHART PLACEHOLDER */}
//             <Col xxl={8} lg={7}>
//               <Card className=" earning-chart">
//                 {/* <Card.Body>
//                   <Chart options={hospitalsurvay} series={hospitalsurvay.series} height={380} type='area' />
//                 </Card.Body> */}
//               </Card>
//             </Col>

//             {/* NOTIFICATIONS */}
//             <Col xxl={4} lg={5}>
//               <Card className="">
//                 <Card.Header>
//                   <h4>Notifications</h4>
//                 </Card.Header>
//                 <Card.Body>
//                   <ul className="docnoti-list dashnoti-list" data-simplebar>
//                     <li>
//                       <div className="media">
//                         <img
//                           className="rounded-50 w-40"
//                           src={IMAGE_URLS["avtar/1.jpg"]}
//                           alt=""
//                         />
//                         <div className="media-body">
//                           <h6> Anna Send you Photo</h6>
//                           <span className="text-light">10, Feb ,2023</span>
//                         </div>
//                         <div className="badge badge-primary">10:15 Pm</div>
//                       </div>
//                     </li>
//                     <li>
//                       <div className="media">
//                         <img
//                           className="rounded-50 w-40"
//                           src={IMAGE_URLS["avtar/2.jpg"]}
//                           alt=""
//                         />
//                         <div className="media-body">
//                           <h6> Anna Send you Photo</h6>
//                           <span className="text-light">05, March ,2023</span>
//                         </div>
//                         <div className="badge badge-primary">09:20 Pm</div>
//                       </div>
//                     </li>
//                     <li>
//                       <div className="media">
//                         <img
//                           className="rounded-50 w-40"
//                           src={IMAGE_URLS["avtar/3.jpg"]}
//                           alt=""
//                         />
//                         <div className="media-body">
//                           <h6> Anna Send you Photo</h6>
//                           <span className="text-light">01, Jan ,2023</span>
//                         </div>
//                         <div className="badge badge-primary">03:40 Pm</div>
//                       </div>
//                     </li>
//                     <li>
//                       <div className="media">
//                         <img
//                           className="rounded-50 w-40"
//                           src={IMAGE_URLS["avtar/4.jpg"]}
//                           alt=""
//                         />
//                         <div className="media-body">
//                           <h6> Anna Send you Photo</h6>
//                           <span className="text-light">25, Feb ,2023</span>
//                         </div>
//                         <div className="badge badge-primary">05:26 Am</div>
//                       </div>
//                     </li>
//                   </ul>
//                 </Card.Body>
//                 <div className="card-footer">
//                   <Link
//                     className="btn btn-primary d-block mx-auto btn-lg"
//                     to="#"
//                   >
//                     See All Notification
//                   </Link>
//                 </div>
//               </Card>
//             </Col>

//             {/* TOP RATED MENTOR */}
//             <Col xxl={4} lg={5}>
//               <Card className=" recentpatient-card">
//                 <Card.Header>
//                   <h4>Recent Student</h4>
//                   <div className="setting-card action-menu">
//                     <Dropdown>
//                       <Dropdown.Toggle>
//                         <FeatherIcon
//                           className="codeCopy"
//                           icon="more-horizontal"
//                         />
//                       </Dropdown.Toggle>

//                       <Dropdown.Menu>
//                         <Dropdown.Item href="#">
//                           <i className="fa fa-calendar-o"></i>weekly
//                         </Dropdown.Item>
//                         <Dropdown.Item href="#">
//                           <i className="fa fa-calendar-check-o"></i>monthly
//                         </Dropdown.Item>
//                         <Dropdown.Item href="#">
//                           <i className="fa fa-calendar"></i>yearly
//                         </Dropdown.Item>
//                       </Dropdown.Menu>
//                     </Dropdown>
//                   </div>
//                 </Card.Header>
//                 <Card.Body>
//                   <div className="table-responsive">
//                     <Table className="table">
//                       <tbody>
//                         <tr>
//                           <td className="pt-0">
//                             <div className="media">
//                               <div className="badgeavtar bg-primary">J</div>
//                               <div className="media-body ml-10">
//                                 <h6 className="text-default">Jordan Nt</h6>
//                                 <p className="text-light">41 Years Old</p>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="pt-0">
//                             <span className="badge badge-success">
//                               Assessment Done
//                             </span>
//                           </td>
//                         </tr>
//                         <tr>
//                           <td>
//                             <div className="media">
//                               <div className="badgeavtar bg-secondary">A</div>
//                               <div className="media-body ml-10">
//                                 <h6 className="text-default">
//                                   Angela Nurhayati
//                                 </h6>
//                                 <p className="text-light">41 Years Old</p>
//                               </div>
//                             </div>
//                           </td>
//                           <td>
//                             {" "}
//                             <span className="badge badge-success">
//                               New Registration
//                             </span>
//                           </td>
//                         </tr>
//                         <tr>
//                           <td>
//                             <div className="media">
//                               <div className="badgeavtar bg-success">T</div>
//                               <div className="media-body ml-10">
//                                 <h6 className="text-default">Thomas Jaja</h6>
//                                 <p className="text-light">28 Years Old</p>
//                               </div>
//                             </div>
//                           </td>
//                           <td>
//                             {" "}
//                             <span className="badge badge-warning">
//                               In Registration
//                             </span>
//                           </td>
//                         </tr>
//                         <tr>
//                           <td>
//                             <div className="media">
//                               <div className="badgeavtar bg-warning">J</div>
//                               <div className="media-body ml-10">
//                                 <h6 className="text-default">Jordan Nt</h6>
//                                 <p className="text-light">20 Years Old</p>
//                               </div>
//                             </div>
//                           </td>
//                           <td>
//                             {" "}
//                             <span className="badge badge-info">Suspended</span>
//                           </td>
//                         </tr>
//                         <tr>
//                           <td>
//                             <div className="media">
//                               <div className="badgeavtar bg-info">J</div>
//                               <div className="media-body ml-10">
//                                 <h6 className="text-default">Jordan Nt</h6>
//                                 <p className="text-light">30 Years Old</p>
//                               </div>
//                             </div>
//                           </td>
//                           <td>
//                             {" "}
//                             <span className="badge badge-warning">Deleted</span>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </Table>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>

//             <Col xxl={8} lg={7}>
//               <Card className=" toprated-doctor pb-20">
//                 <Card.Header>
//                   <h4>Top Rated Mentor</h4>
//                 </Card.Header>
//                 <Card.Body>
//                   <Top_doctors />
//                 </Card.Body>
//               </Card>
//             </Col>

//             {/* CHART PLACEHOLDERS */}
//             <Col lg={6}>
//               <Card className=" visitor-performance">
//                 {/* <Card.Body>
//                   <Chart options={recoverystatistics} series={recoverystatistics.series} height={340} type='line' />
//                 </Card.Body> */}
//               </Card>
//             </Col>
//             <Col lg={6}></Col>

//             <Col xxl={8} lg={6}>
//               <Card className=" patientvisits-tbl">
//                 <Card.Header>
//                   <h4>Student Visits</h4>
//                 </Card.Header>
//                 <Card.Body>
//                   <Table bordered responsive className="transaction-tbl">
//                     <thead>
//                       <tr>
//                         <th>Mentor Name</th>
//                         <th>visit Date</th>
//                         <th>visit Time </th>
//                         <th>Invoice</th>
//                         <th>Charges</th>
//                         <th>Status</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td> Tiger Nixon</td>
//                         <td>10/05/2023</td>
//                         <td>09:30 Am</td>
//                         <td>Operation</td>
//                         <td>$80</td>
//                         <td>Resheduled</td>
//                         <td>
//                           <Link className="text-success" to="#">
//                             <FeatherIcon className="w-18" icon="edit" />
//                           </Link>
//                           <Link className="text-danger ml-8" to="#">
//                             <FeatherIcon className="w-18" icon="trash-2" />
//                           </Link>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td> Hal Appeno</td>
//                         <td>05/06/2023</td>
//                         <td>08:00 Am</td>
//                         <td>Check up</td>
//                         <td>$50</td>
//                         <td>Fever</td>
//                         <td>
//                           <Link className="text-success" to="#">
//                             <FeatherIcon className="w-18" icon="edit" />
//                           </Link>
//                           <Link className="text-danger ml-8" to="#">
//                             <FeatherIcon className="w-18" icon="trash-2" />
//                           </Link>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td> Pat Agonia</td>
//                         <td>20/02/2023</td>
//                         <td>10:30 Am</td>
//                         <td>Admit</td>
//                         <td>$75</td>
//                         <td>Ortho</td>
//                         <td>
//                           <Link className="text-success" to="#">
//                             <FeatherIcon className="w-18" icon="edit" />
//                           </Link>
//                           <Link className="text-danger ml-8" to="#">
//                             <FeatherIcon className="w-18" icon="trash-2" />
//                           </Link>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td> Paul Molive</td>
//                         <td>15/08/2023</td>
//                         <td>03:00 Pm</td>
//                         <td> Blood Test</td>
//                         <td>$60</td>
//                         <td>General Check-up</td>
//                         <td>
//                           <Link className="text-success" to="#">
//                             <FeatherIcon className="w-18" icon="edit" />
//                           </Link>
//                           <Link className="text-danger ml-8" to="#">
//                             <FeatherIcon className="w-18" icon="trash-2" />
//                           </Link>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td> Polly Tech</td>
//                         <td>12/07/2023</td>
//                         <td>12:00 Pm</td>
//                         <td>Discharge</td>
//                         <td>$40</td>
//                         <td>Injury</td>
//                         <td>
//                           <Link className="text-success" to="#">
//                             <FeatherIcon className="w-18" icon="edit" />
//                           </Link>
//                           <Link className="text-danger ml-8" to="#">
//                             <FeatherIcon className="w-18" icon="trash-2" />
//                           </Link>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td> Hal Appeno</td>
//                         <td>05/06/2023</td>
//                         <td>08:00 Am</td>
//                         <td>Check up</td>
//                         <td>$50</td>
//                         <td>Fever</td>
//                         <td>
//                           <Link className="text-success" to="#">
//                             <FeatherIcon className="w-18" icon="edit" />
//                           </Link>
//                           <Link className="text-danger ml-8" to="#">
//                             <FeatherIcon className="w-18" icon="trash-2" />
//                           </Link>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </Table>
//                 </Card.Body>
//               </Card>
//             </Col>

//             {/* LIVE CHAT */}
//             <Col xxl={4} lg={6}>
//               <Card className=" dash-chat">
//                 <Card.Header>
//                   <h4>live caht</h4>
//                 </Card.Header>
//                 <Card.Body>
//                   <div className="dash-chatbox">
//                     <SimpleBar className="chating-list">
//                       <ul>
//                         <li>
//                           <div className="user-msgbox">
//                             <div className="media">
//                               <img
//                                 className="img-fluid"
//                                 src={IMAGE_URLS["avtar/1.jpg"]}
//                                 alt="image"
//                               />
//                               <div className="media-body">
//                                 <p>Lorem ipsum dolor sit amet</p>
//                               </div>
//                             </div>
//                           </div>
//                         </li>
//                         <li>
//                           <div className="admin-msgbox">
//                             <div className="media">
//                               <div className="media-body">
//                                 <p>Adipisicing elit, sed do eiusmod.</p>
//                               </div>
//                               <img
//                                 className="img-fluid"
//                                 src={IMAGE_URLS["avtar/2.jpg"]}
//                                 alt="image"
//                               />
//                             </div>
//                           </div>
//                         </li>
//                         <li>
//                           <div className="admin-msgbox">
//                             <div className="media">
//                               <div className="media-body">
//                                 <p>
//                                   Lorem ipsum dolor sit amet, consectetur
//                                   adipisicing elit, sed do eiusmod.
//                                 </p>
//                               </div>
//                               <img
//                                 className="img-fluid"
//                                 src={IMAGE_URLS["avtar/2.jpg"]}
//                                 alt="image"
//                               />
//                             </div>
//                           </div>
//                         </li>
//                         <li>
//                           <div className="user-msgbox">
//                             <div className="media">
//                               <img
//                                 className="img-fluid"
//                                 src={IMAGE_URLS["avtar/1.jpg"]}
//                                 alt="image"
//                               />
//                               <div className="media-body">
//                                 <p>
//                                   Lorem ipsum dolor sit amet, consectetur
//                                   adipisicing elit, sed do eiusmod.
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         </li>
//                         <li>
//                           <div className="admin-msgbox">
//                             <div className="media">
//                               <div className="media-body">
//                                 <p>
//                                   Lorem ipsum dolor sit amet, consectetur
//                                   adipisicing elit, sed do eiusmod
//                                 </p>
//                               </div>
//                               <img
//                                 className="img-fluid"
//                                 src={IMAGE_URLS["avtar/2.jpg"]}
//                                 alt="image"
//                               />
//                             </div>
//                           </div>
//                         </li>
//                         <li>
//                           <div className="user-msgbox">
//                             <div className="media">
//                               <img
//                                 className="img-fluid"
//                                 src={IMAGE_URLS["avtar/1.jpg"]}
//                                 alt="image"
//                               />
//                               <div className="media-body">
//                                 <p>Lorem ipsum dolor sit amet</p>
//                               </div>
//                             </div>
//                           </div>
//                         </li>
//                         <li>
//                           <div className="admin-msgbox">
//                             <div className="media">
//                               <div className="media-body">
//                                 <p>Adipisicing elit, sed do eiusmod.</p>
//                               </div>
//                               <img
//                                 className="img-fluid"
//                                 src={IMAGE_URLS["avtar/2.jpg"]}
//                                 alt="image"
//                               />
//                             </div>
//                           </div>
//                         </li>
//                       </ul>
//                     </SimpleBar>
//                     <div className="userchat-typebox d-flex">
//                       <Link to={""} className="btn btn-primary me-2">
//                         <FeatherIcon icon="smile" />
//                       </Link>
//                       <Form.Control
//                         type="text"
//                         name="udsfug"
//                         placeholder="Type a message"
//                         value={inputValue}
//                         onChange={handleInputChange}
//                         autoComplete="off"
//                       />
//                       <Link to={""} className="btn btn-primary ms-2">
//                         <FeatherIcon icon="send" />
//                       </Link>
//                     </div>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </SimpleBar>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import FeatherIcon from "feather-icons-react";
import {
  Row,
  Col,
  Card,
  Form,
  Table,
  Container,
  Dropdown,
} from "react-bootstrap";
import PageBreadcrumb from "../componets/PageBreadcrumb";
import SimpleBar from "simplebar-react";
import Chart from "react-apexcharts";
import {
  hospitalsurvay,
  recoverystatistics,
  diseasesreport,
} from "./js/Dashboard1";

import Top_doctors from "../componets/Top_doctors";
import IMAGE_URLS from "/src/pages/api/Imgconfig.js";

export default function Index() {
  // Live Chat Data
  const [inputValue, setInputValue] = useState("");
  const [totalMentors, setTotalMentors] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [pendingMentors, setPendingMentors] = useState(0);
  const [recentStudents, setRecentStudents] = useState([]);
const [recentLoading, setRecentLoading] = useState(true);

  const navigate = useNavigate(); // ✅ hook for navigation

  useEffect(() => {
    // total mentors + students
    fetch("http://127.0.0.1:5000/api/stats/total-users")
      .then((res) => res.json())
      .then((data) => {
        setTotalMentors(data.totalMentors || 0);
        setTotalStudents(data.totalStudents || 0);
      })
      .catch((err) => console.error("Error fetching totals:", err));

    // pending mentor verifications
    fetch("http://127.0.0.1:5000/api/mentor/pending")
      .then((res) => res.json())
      .then((data) => {
        // if backend returns array
        const count = Array.isArray(data) ? data.length : 0;
        setPendingMentors(count);
      })
      .catch((err) => console.error("Error fetching pending mentors:", err));

    //10 recent students
    fetch("http://127.0.0.1:5000/api/stats/students/recent")
  .then(res => res.json())
  .then(data => {
    setRecentStudents(data.students || []);
  })
  .catch(err => console.error("Recent students error:", err))
  .finally(() => setRecentLoading(false));
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="themebody-wrap">
      {/* Breadcrumb Start */}
      <PageBreadcrumb pagename="Dashboard" />
      {/* Breadcrumb End */}

      <SimpleBar className="theme-body common-dash">
        <Container fluid>
          <Row>
            {/* HERO CARD */}
            <Col lg={6}>
              <Card className="hos-welcome">
                <Card.Body>
                  <h3>
                    Welcome to
                    <br />
                    Good Guiders
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor.
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    <Link className="btn btn-secondary" to="#">
                      Read More
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* COUNTS */}
            <Col lg={6}>
              <Row>
                {/* <Col sm={6}>
                
                  <Card className="hosinfo-count">

                    <Card.Body>
                    
                      <div className="media">

                        <div className="icon-wrap bg-warning">
                          <i className="fa fa-handshake-o"></i>
                        </div>
                        <div
                          className="count-detail"
                          onClick={() => navigate("/admin-mentor-requests")}
                          style={{ cursor: "pointer" }}
                        >
                          <h3>
                           <span className="counter mr-5">
                              {pendingMentors}
                            </span> 
                            Verification
                          </h3>
                          <p>Pending Requests</p>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col> */}


   <Col sm={6}>
  <Card className="hosinfo-count" style={{ position: "relative" }}>
    <span
      style={{
        position: "absolute",
       // top: "-1px",
        right: "-12px",
        // background: "#dc3545",
           background: pendingMentors > 0 ? "#28a745" : "#dc3545", 
        color: "#fff",
        width: "36px",   
        height: "36px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        zIndex: 10,
      }}
    >
      {pendingMentors}
    </span>

    <Card.Body>
      <div className="media">
        <div className="icon-wrap bg-warning">
          <i className="fa fa-handshake-o"></i>
        </div>

        <div
          className="count-detail"
          onClick={() => navigate("/admin-mentor-requests")}
          style={{ cursor: "pointer" }}
        >
          <h3>Verification</h3>
          <p>Pending Requests</p>
        </div>
      </div>
    </Card.Body>
  </Card>
</Col>


                <Col sm={6}>
                  <Card className=" hosinfo-count">
                    <Card.Body>
                      <div className="media">
                        <div className="icon-wrap bg-secondary">
                          <i className="fa fa-user"></i>
                        </div>
                        <div className="count-detail">
                          <h3>
                            <span className="counter mr-5">{totalMentors}</span>
                            Mentor
                          </h3>
                          <p>Available Mentor</p>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col sm={6}>
                  <Card className=" hosinfo-count">
                    <Card.Body>
                      <div className="media">
                        <div className="icon-wrap bg-success">
                          <i className="fa fa-smile-o"></i>
                        </div>
                        <div className="count-detail">
                          <h3>
                            <span className="counter mr-5">149</span>Bills
                          </h3>
                          <p>Students Bills</p>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col sm={6}>
                  <Card className=" hosinfo-count">
                    <Card.Body>
                      <div className="media">
                        <div className="icon-wrap bg-info">
                          <i className="fa fa-life-ring"></i>
                        </div>
                        <div className="count-detail">
                          <h3>
                            <span className="counter mr-5">
                              {totalStudents}
                            </span>
                            Student
                          </h3>
                          <p>All Student</p>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>

            <Col lg={12}>
              <Card className="mb-3">
                <Card.Header>
                  <h4 className="mb-0">Class Management</h4>
                </Card.Header>
                <Card.Body>
                  <p className="mb-3">
                    Create and manage classes, subjects, and chapters. Upload
                    1-page and full-notes PDFs for each chapter.
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    <Link className="btn btn-primary" to="/classes/new">
                      + Create Class
                    </Link>
                    <Link className="btn btn-outline-primary" to="/classes">
                      All Classes
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* CHART PLACEHOLDER */}
            <Col xxl={8} lg={7}>
              <Card className=" earning-chart">
                
              </Card>
            </Col>

           

            {/* <Col xxl={8} lg={7}>  */}
              <Card className=" toprated-doctor pb-20">
                <Card.Header>
                  <h4>Top Rated Mentor</h4>
                </Card.Header>
                <Card.Body>
                  <Top_doctors />
                </Card.Body>
              </Card>
            {/* </Col> */}

           
            <Col lg={6}>
              <Card className=" visitor-performance">
                {/* <Card.Body>
                  <Chart options={recoverystatistics} series={recoverystatistics.series} height={340} type='line' />
                </Card.Body> */}
              </Card>
            </Col>
            <Col lg={6}></Col>

            {/* <Col xxl={8} lg={6}> */}
              <Card className="patientvisits-tbl">
  <Card.Header className="d-flex justify-content-between align-items-center">
  <h4 className="mb-0">Recently Registered Students</h4>

  <Link to="/all-patients" className="btn btn-sm btn-outline-primary">
    View All
  </Link>
</Card.Header>

  <Card.Body>
    <Table bordered responsive className="transaction-tbl">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Class</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {recentLoading ? (
          <tr>
            <td colSpan="5" className="text-center">
              Loading...
            </td>
          </tr>
        ) : recentStudents.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center">
              No students found
            </td>
          </tr>
        ) : (
          recentStudents.map((s, index) => (
            <tr key={s.email}>
              <td>{index + 1}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.className || "-"}</td>
              <td>
                <span
                  className={`badge ${
                    s.isDisabled ? "bg-danger" : "bg-primary"
                  }`}
                >
                  {s.isDisabled ? "Disabled" : "Enabled"}
                </span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  </Card.Body>
</Card>
            {/* </Col> */}

           
          
          </Row>
        </Container>
      </SimpleBar>
    </div>
  );
}