// import React, { useState } from 'react';
// import { Link } from "react-router-dom";
// import { Row, Col, Card, Form, Container, Button } from 'react-bootstrap';
// import SimpleBar from 'simplebar-react';
// import PageBreadcrumb from '../componets/PageBreadcrumb';

// export default function Edit_patient() {
//     const [formData, setFormData] = useState({
//         profileImage: null,
//         firstName: 'Sarah',
//         lastName: 'Smith',
//         dob: '10/12/1999',
//         age: '25',
//         gender: '',
//         subject: '',
//         maritalStatus: '',
//         weight: '68 kg', // default values
//         height: '5.2',
//         email: 'example@email.com',
//         phone: '+1 50 456XXX',
//         city: 'Barcelona', // default selected
//         state: '',
//         country: '',
//         postalCode: '',
//         status: '',
//         address: '463 Avenida Doutor José Singer,6- Conjunto Residencial Humaitá, São Vicente, SP, Brasil',

//     });

//     // Handle input changes
//     const handleInputChange = (e) => {
//         const { name, value, type, files } = e.target;
//         if (type === 'file') {
//             setFormData({ ...formData, [name]: files[0] });
//         } else {
//             setFormData({ ...formData, [name]: value });
//         }
//     };
//   return (
//     <div className="themebody-wrap">
//     {/* Breadcrumb Start */}
//     <PageBreadcrumb pagename="Edit Student" />
//     {/* Breadcrumb End */}
//     {/* theme body start */}
//     <SimpleBar className="theme-body common-dash">
//         <Container fluid>
//             <Row>
//                 <Col md={12}>
//                     <Card>
//                         <Card.Header>
//                             <h4>Student Information</h4>
//                         </Card.Header>
//                         <Card.Body>
//                             <Form>
//                                 <Row>
//                                     <Col md={4}>
//                                         <Form.Group className="mb-20">
//                                             <Form.Label>Profile Image</Form.Label>
//                                             <Form.Control
//                                                 type="file"
//                                                 name="profileImage"
//                                                 onChange={handleInputChange}
//                                             />
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={4}>
//                                         <Form.Group className="mb-20">
//                                             <Form.Label>First Name</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 name="firstName"
//                                                 value={formData.firstName}
//                                                 placeholder="First Name"
//                                                 onChange={handleInputChange}
//                                             />
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={4}>
//                                         <Form.Group className="mb-20">
//                                             <Form.Label>Last Name</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 name="lastName"
//                                                 value={formData.lastName}
//                                                 placeholder="Last Name"
//                                                 onChange={handleInputChange}
//                                             />
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={4}>
//                                         <Form.Group className="mb-20">
//                                             <Form.Label>Date of Birth</Form.Label>
//                                             <input
//                                                 className="datepicker-here form-control"
//                                                 type="text"
//                                                 name="dob"
//                                                 value={formData.dob}
//                                                 data-date-format="dd/mm/yyyy"
//                                                 onChange={handleInputChange}
//                                             />
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={4}>
//                                         <Form.Group className="mb-20">
//                                             <Form.Label>Age</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 name="age"
//                                                 value={formData.age}
//                                                 placeholder="Enter Student Age"
//                                                 onChange={handleInputChange}
//                                             />
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={4}>
//                                         <Form.Group className="mb-20">
//                                             <Form.Label>Gender</Form.Label>
//                                             <Form.Control
//                                                 as="select"
//                                                 name="gender"
//                                                 value={formData.gender}
//                                                 onChange={handleInputChange}
//                                             >
//                                                 <option value="">Select Gender</option>
//                                                 <option value="Male">Male</option>
//                                                 <option value="Female">Female</option>
//                                             </Form.Control>
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={4}>
//                                         <Form.Group className="mb-20">
//                                             <Form.Label>Blood Group</Form.Label>
//                                             <Form.Control
//                                                 as="select"
//                                                 name="subject"
//                                                 value={formData.subject}
//                                                 onChange={handleInputChange}
//                                             >
//                                                 <option value="">Select Blood Group</option>
//                                                 <option value="A+">A+</option>
//                                                 <option value="A-">A-</option>
//                                                 <option value="B+">B+</option>
//                                                 <option value="B-">B-</option>
//                                                 <option value="O+">O+</option>
//                                                 <option value="O-">O-</option>
//                                                 <option value="AB+">AB+</option>
//                                                 <option value="AB-">AB-</option>
//                                             </Form.Control>
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={4}>
//                                         <Form.Group className="mb-20">
//                                             <Form.Label>Marital Status</Form.Label>
//                                             <Form.Control
//                                                 as="select"
//                                                 name="maritalStatus"
//                                                 value={formData.maritalStatus}
//                                                 onChange={handleInputChange}
//                                             >
//                                                 <option value="">Select Marital Status</option>
//                                                 <option value="Married">Married</option>
//                                                 <option value="Unmarried">Unmarried</option>
//                                             </Form.Control>
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={4}>
//                                         <Form.Group className="mb-20">
//                                             <Form.Label>Student Weight</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 name="weight"
//                                                 value={formData.weight}
//                                                 onChange={handleInputChange}
//                                             />
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={4}>
//                                         <Form.Group className="mb-20">
//                                             <Form.Label>Student Height</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 name="height"
//                                                 value={formData.height}
//                                                 onChange={handleInputChange}
//                                             />
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={4}>
//                                         <Form.Group className="mb-20">
//                                             <Form.Label>Email</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 name="email"
//                                                 value={formData.email}
//                                                 placeholder=""
//                                                 onChange={handleInputChange}
//                                             />
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={4}>
//                                         <Form.Group className="mb-20">
//                                             <Form.Label>Phone</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 name="phone"
//                                                 value={formData.phone}
//                                                 placeholder=""
//                                                 onChange={handleInputChange}
//                                             />
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={4}>
//                                         <Form.Group className="mb-20">
//                                             <Form.Label>City</Form.Label>
//                                             <Form.Control
//                                                 as="select"
//                                                 name="city"
//                                                 value={formData.city}
//                                                 onChange={handleInputChange}
//                                             >
//                                                 <option value="">Select City</option>
//                                                 <option value="Tokyo">Tokyo</option>
//                                                 <option value="Dubai">Dubai</option>
//                                                 <option value="Barcelona">Barcelona</option>
//                                                 <option value="Rome">Rome</option>
//                                                 <option value="Singapore">Singapore</option>
//                                                 <option value="Amsterdam">Amsterdam</option>
//                                                 <option value="NewYork">New York</option>
//                                             </Form.Control>
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={4}>
//                                     <Form.Group className="mb-20">
//                                         <Form.Label>State</Form.Label>
//                                         <Form.Control
//                                                 as="select"
//                                                 name="state"
//                                                 value={formData.state}
//                                                 onChange={handleInputChange}>
//                                             <option value="">Select State</option>
//                                             <option value="Washington">Washington</option>
//                                             <option value="Minnesota">Minnesota</option>
//                                             <option value="Utah">Utah</option>
//                                             <option value="Idaho">Idaho</option>
//                                         </Form.Control>
//                                     </Form.Group>
//                                     </Col>
//                                     <Col md={4}>
//                                     <Form.Group className="mb-20">
//                                         <Form.Label>Country</Form.Label>
//                                         <Form.Control
//                                                 as="select"
//                                                 name="country"
//                                                 value={formData.country}
//                                                 onChange={handleInputChange}>
//                                             <option value="">Select Country</option>
//                                             <option value="japan">japan</option>
//                                             <option value="india">india</option>
//                                             <option value="uk">uk</option>
//                                             <option value="itly">itly</option>
//                                             <option value="usa">usa</option>
//                                         </Form.Control>
//                                     </Form.Group>
//                                     </Col>
//                                     <Col md={4}>
//                                     <Form.Group className="mb-20">
//                                         <Form.Label>Postal/zip Code</Form.Label>
//                                         <Form.Control type="text" placeholder="Enter Postal/zip Code" name="postalCode"
//                                                 value={formData.postalCode}
//                                                 onChange={handleInputChange}/>
//                                     </Form.Group>
//                                     </Col>
//                                     <Col md={4}>
//                                     <Form.Group className="mb-20">
//                                         <Form.Label>Status</Form.Label>
//                                         <Form.Control as="select" name="status"  value={formData.status}  onChange={handleInputChange}>
//                                             <option value="">Select Status</option>
//                                             <option value="active">Active</option>
//                                             <option value="Inctive">Inctive</option>
//                                         </Form.Control>
//                                     </Form.Group>
//                                     </Col>
//                                     <Col md={6}>
//                                     <Form.Group className="mb-20">
//                                         <Form.Label>Address</Form.Label>
//                                         <Form.Control as="textarea" placeholder="Enter Student Address" name="address"
//                                                 value={formData.address}
//                                                 onChange={handleInputChange}></Form.Control>
//                                     </Form.Group>
//                                     </Col>
//                                     <Col md={6} className="mb-20">
//                                     <Form.Group>
//                                         <Form.Label>Student honey honey History</Form.Label>
//                                         <Form.Control as="textarea" placeholder="Student History" name="patientHistory"
//                                                 value={formData.patientHistory}
//                                                 onChange={handleInputChange}></Form.Control>
//                                     </Form.Group>
//                                     </Col>
//                                     {/* Repeat for other fields */}
//                                     <Form.Group className="text-end mb-0">
//                                         <Button type="submit" className="btn btn-sm btn-primary">Submit</Button>
//                                         <Link className="btn btn-sm btn-danger ml-8">Cancel</Link>
//                                     </Form.Group>
//                                 </Row>
//                             </Form>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     </SimpleBar>
//     {/* theme body end */}
// </div>
//   )
// }




// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Row, Col, Card, Form, Container, Button } from "react-bootstrap";
// import SimpleBar from "simplebar-react";
// import PageBreadcrumb from "../componets/PageBreadcrumb";
// import "./css/ProfilePage.css";
// // import '../pages/css/ProfilePage.css';
// export default function Edit_patient() {
//   const [formData, setFormData] = useState({
//     profileImage: null,
//     firstName: "Sarah",
//     lastName: "Smith",
//     dob: "10/12/1999",
//     age: "25",
//     gender: "",
//     subject: "",
//     maritalStatus: "",
//     weight: "68 kg", 
//     height: "5.2",
//     email: "example@email.com",
//     phone: "+1 50 456XXX",
//     city: "Barcelona", 
//     state: "",
//     country: "",
//     postalCode: "",
//     status: "",
//     address:
//       "463 Avenida Doutor José Singer,6- Conjunto Residencial Humaitá, São Vicente, SP, Brasil",
//   });

//     const user = {
//     name: "Select Photo",
//     email: "john@example.com",
//     bio: "Frontend Developer based in India.",
//     profilePic: "https://picsum.photos/id/237/200/300",
//   };
//   const [profileImage, setProfileImage] = useState(null);


//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value, type, files } = e.target;
//     if (type === "file") {
//       setFormData({ ...formData, [name]: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };
//   return (
//     <div className="themebody-wrap">
//       {/* Breadcrumb Start */}
//       <PageBreadcrumb pagename="Edit Mentor" />
//       {/* Breadcrumb End */}
//       {/* theme body start */}
//       <SimpleBar className="theme-body common-dash">
//         <Container fluid>
//           <Row>
//             <Col md={12}>
//               <Card>
//                 <Card.Header>
//                   <h4> Mentor Information</h4>
//                 </Card.Header>
//                 <Card.Body>
//                   <Form>
//                      {/* <Col md={4}>
//                         <Form.Group className="mb-20">
//                           <Form.Label>Profile Image</Form.Label>
//                           <Form.Control
//                             type="file"
//                             name="profileImage"
//                             onChange={handleInputChange}
//                           />
//                         </Form.Group>
//                       </Col> */}
                              
   
      
     
// {/* 

//        <div className="profile-left">
//   <img src={user.profilePic} alt="" className="profile-pic" />
//   <h2>{user.name}</h2>
// </div> */}

//                     <Row>
//                        {/* <Col md={4}>
//                         <Form.Group className="mb-20">
//                           <Form.Label>Profile Image</Form.Label>
//                           <Form.Control
//                             type="file"
//                             name="profileImage"
//                             onChange={handleInputChange}
//                           />
//                         </Form.Group>
//                       </Col>  */}


      

//      <div className="editprofile-pic">
     
//               <img src={user.profilePic} alt="" className="profile-pic" />
//             <button style={{ color: 'white', backgroundColor: 'transparent', border: 'none', fontSize: '1.25rem' }}>
//   {user.name}
// </button>
//             </div>


//                       <Col md={4}>
//                         <Form.Group className="mb-20">
//                           <Form.Label>First Name</Form.Label>
//                           <Form.Control
//                             type="text"
//                             name="firstName"
//                             value={formData.firstName}
//                             placeholder="First Name"
//                             onChange={handleInputChange}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group className="mb-20">
//                           <Form.Label>Last Name</Form.Label>
//                           <Form.Control
//                             type="text"
//                             name="lastName"
//                             value={formData.lastName}
//                             placeholder="Last Name"
//                             onChange={handleInputChange}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group className="mb-20">
//                           <Form.Label>Date of Birth</Form.Label>
//                           <input
//                             className="datepicker-here form-control"
//                             type="text"
//                             name="dob"
//                             value={formData.dob}
//                             data-date-format="dd/mm/yyyy"
//                             onChange={handleInputChange}
//                           />
//                         </Form.Group>
//                       </Col>

//                   <Col md={4} className="p-0 m-0">
//   <Form.Group className="mt-0 mb-3">
//     <Form.Label>Gender</Form.Label>
//     <Form.Control
//       as="select"
//       name="gender"
//       value={formData.gender}
//       onChange={handleInputChange}
//     >
//       <option value="">Select Gender</option>
//       <option value="Male">Male</option>
//       <option value="Female">Female</option>
//       <option value="Other">Others</option> {/* Fixed duplicated value */}
//     </Form.Control>
//   </Form.Group>
// </Col>


//                       <Col md={4}>
//                         <Form.Group className="mb-20">
//                           <Form.Label>Phone</Form.Label>
//                           <Form.Control
//                             type="text"
//                             name="phone"
//                             value={formData.phone}
//                             placeholder=""
//                             onChange={handleInputChange}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group className="mb-20">
//                           <Form.Label>City</Form.Label>
//                           <Form.Control
//                             as="select"
//                             name="city"
//                             value={formData.city}
//                             onChange={handleInputChange}
//                           >
//                             <option value="">Select City</option>
//                             <option value="Tokyo">Tokyo</option>
//                             <option value="Dubai">Dubai</option>
//                             <option value="Barcelona">Barcelona</option>
//                             <option value="Rome">Rome</option>
//                             <option value="Singapore">Singapore</option>
//                             <option value="Amsterdam">Amsterdam</option>
//                             <option value="NewYork">New York</option>
//                           </Form.Control>
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group className="mb-20">
//                           <Form.Label>State</Form.Label>
//                           <Form.Control
//                             as="select"
//                             name="state"
//                             value={formData.state}
//                             onChange={handleInputChange}
//                           >
//                             <option value="">Select State</option>
//                             <option value="Washington">Washington</option>
//                             <option value="Minnesota">Minnesota</option>
//                             <option value="Utah">Utah</option>
//                             <option value="Idaho">Idaho</option>
//                           </Form.Control>
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group className="mb-20">
//                           <Form.Label>Country</Form.Label>
//                           <Form.Control
//                             as="select"
//                             name="country"
//                             value={formData.country}
//                             onChange={handleInputChange}
//                           >
//                             <option value="">Select Country</option>
//                             <option value="japan">japan</option>
//                             <option value="india">india</option>
//                             <option value="uk">uk</option>
//                             <option value="itly">itly</option>
//                             <option value="usa">usa</option>
//                           </Form.Control>
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group className="mb-20">
//                           <Form.Label>Postal/zip Code</Form.Label>
//                           <Form.Control
//                             type="text"
//                             placeholder="Enter Postal/zip Code"
//                             name="postalCode"
//                             value={formData.postalCode}
//                             onChange={handleInputChange}
//                           />
//                         </Form.Group>
//                       </Col>

//                       <Col md={6}>
//                         <Form.Group className="mb-20">
//                           <Form.Label>Address</Form.Label>
//                           <Form.Control
//                             as="textarea"
//                             placeholder="Enter Address"
//                             name="address"
//                             value={formData.address}
//                             onChange={handleInputChange}
//                           ></Form.Control>
//                         </Form.Group>
//                       </Col>

//                       {/* <div className="themebody-wrap">
         
//             <div className="theme-body codex-chat"> */}
//                       {/* <Container fluid> */}
//                       <Row>
//                         <Col>
//                           <Card>
//                             <Card.Body className="cdx-invoice">
//                               <div className="body-invoice">
//                                 <div className="table-responsive">
//                                   <table className="table table-bordered">
//                                     <thead>
//                                       <tr>
//                                         <th>Class</th>
                                        
//                                         <th>Paasout</th>
//                                         <th>University/Board </th>
//                                         <th>Subject</th>

//                                         <th>Per/CGPA </th>
//                                       </tr>
//                                     </thead>
//                                     <tbody>
//                                       <tr>
//                                         <td>10th class</td>
//                                         <td>2015</td>
//                                         <td>Ajmer Board</td>
//                                         <td>
//                                           Hindi ,English, Computer,Science
//                                         </td>
//                                         <td>6.6</td>
//                                       </tr>
//                                       <tr>
//                                         <td>12th</td>
//                                         <td>2017</td>
//                                         <td>Ajmer Board</td>
//                                         <td>Biology</td>
//                                         <td>7.9</td>
//                                       </tr>
                                     

//                                       <tr>
//                                         <td>
//                                       <select className="edittext_wid">
//                                             <option selected disabled>
//                                               Graduation
//                                             </option>
//                                             <option>B.Com</option>
//                                             <option>Enginering</option>
//                                             <option>BBA</option>
//                                               <option>BCA</option>
//                                             <option>BA</option>
//                                             <option>B.Sc</option>
//                                           </select>
//                                         </td>
//                                         <td>2020</td>
//                                         <td>Ajmer Board</td>
//                                         <td>Biology</td>
//                                         <td>5.5</td>
//                                       </tr>

                                    
//                                         <tr>
//                                         <td>
//                                            <select className="edittext_wid">
//                                             <option selected disabled>
//                                              Post Graduation
//                                             </option>
//                                             <option>M.Com</option>
//                                             <option>MCA</option>
//                                             <option>MBA</option>
//                                              <option>M.tech</option>
//                                             <option>M.A</option>
//                                             <option>M.sc</option>
                                           
//                                           </select>
//                                         </td>
//                                         <td>2012</td>
//                                         <td>Ajmer Board</td>
//                                         <td>Biology</td>
//                                         <td>6.6</td>
//                                       </tr>
//                                        <tr>
//                                         <td>
//                                        <select className="edittext_wid">
//                                             <option selected disabled>
//                                             P.H.D
//                                             </option>
//                                             <option>PHD</option>
//                                             <option>PHD</option>
//                                             <option>PHD</option>
//                                           </select>
//                                         </td>
//                                         <td>2012</td>
//                                         <td>Ajmer Board</td>
//                                         <td>Biology</td>
//                                         <td>6.5</td>
//                                       </tr>



//                                       {/* <tr>
//                                                             <td>06</td>
//                                                             <td>Biology </td>
//                                                             <td>$480</td>
//                                                             <td>$50</td>
//                                                             <td>$440</td>
//                                                         </tr>
//                                                         <tr>
//                                                             <td>07</td>
//                                                             <td>Biology </td>
//                                                             <td>$700</td>
//                                                             <td>$250</td>
//                                                             <td>$450</td>
//                                                         </tr>
//                                                         <tr>
//                                                             <td>08</td>
//                                                             <td>Biology </td>
//                                                             <td>$570</td>
//                                                             <td>$170</td>
//                                                             <td>$400</td>
//                                                         </tr> */}
//                                     </tbody>
//                                   </table>
//                                 </div>
//                               </div>
//                             </Card.Body>
//                           </Card>
//                         </Col>
//                       </Row>

//                       {/* </div>
         
//         </div>
//        */}

//                       <Form.Group className="text-end mb-0">
//                         <Button
//                           type="submit"
//                           className="btn btn-sm btn-primary"
//                         >
//                           Submit
//                         </Button>
//                         <Link className="btn btn-sm btn-danger ml-8">
//                           Cancel
//                         </Link>
//                       </Form.Group>
//                     </Row>
//                   </Form>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </SimpleBar>
//       {/* theme body end */}
//     </div>
//   );
// }









import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { Row, Col, Card, Form, Container, Button } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import PageBreadcrumb from "../componets/PageBreadcrumb";
import "./css/ProfilePage.css";
// import '../pages/css/ProfilePage.css';
export default function Edit_patient() {

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    mobileNo: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    address: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedUser, setSavedUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (savedUser) {
      setSavedUser(savedUser);
      setFormData({
        name: savedUser.name || "",
        dob: savedUser.dob || "",
        gender: savedUser.gender || "",
        mobileNo: savedUser.mobileNo || "",
        city: savedUser.city || "",
        state: savedUser.state || "",
        country: savedUser.country || "",
        postalCode: savedUser.postalCode || "",
        address: savedUser.address || ""
      });
    }
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if(!savedUser) {
      alert("No user data found.")
      return;
    }
  
    try {
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, email: savedUser.email }),  // your form state
      });
  
      const result = await res.json();
  
      if (res.ok) {
        alert("Profile updated successfully!");
        // Optional: Update localStorage if needed
        localStorage.setItem("loggedInUser", JSON.stringify(result.user));
      } else {
        alert("Error: " + result.msg);
      }
      setIsSubmitting(false);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  
    const user = {
    name: "Select Photo",
    email: "john@example.com",
    bio: "Frontend Developer based in India.",
    profilePic: "https://picsum.photos/id/237/200/300",
  };
  // const [profileImage, setProfileImage] = useState(null);
  // const [userEmail, setUserEmail] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, files, checked } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file"
        ? files[0]
        : type === "checkbox"
        ? checked
        : value
    }));
  };

  const handleCancel = () => {
    if (!savedUser) return;
  
    setFormData({
      name: savedUser.name || "",
      dob: savedUser.dob || "",
      gender: savedUser.gender || "",
      phone: savedUser.phone || "",
      city: savedUser.city || "",
      state: savedUser.state || "",
      country: savedUser.country || "",
      postalCode: savedUser.postalCode || "",
      address: savedUser.address || "",
    });
  };
  
  

  return (
    <div className="themebody-wrap">
     
      <PageBreadcrumb pagename="Edit Student" />
     
      <SimpleBar className="theme-body common-dash">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card>
                <Card.Header>
                  <h4> Student Information</h4>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                   
                 <Row>
              {/* <div className="editprofile-pic">
     
              <img src={user.profilePic} alt="" className="profile-pic" />
            <button style={{ color: 'white', backgroundColor: 'transparent', border: 'none', fontSize: '1.25rem' }}>
  {user.name}
</button>
            </div> */}


            <div className="editprofile-pic">
     
              <img src={user.profilePic} alt="" className="profile-picedit" />
            <button  style={{ color: 'white', backgroundColor: 'transparent', border: 'none', fontSize: '1.25rem' }}>
  {user.name}
</button>
            </div>


                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder="Name"
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      {/* <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            placeholder="Last Name"
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col> */}
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Date of Birth</Form.Label>
                          <input
                            className="datepicker-here form-control"
                            type="date"
                            name="dob"
                            value={formData.dob}
                            data-date-format="dd/mm/yyyy"
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

   <Col md={4} className="p-0 m-0">
  <Form.Group className="mt-0 mb-3">
    <Form.Label>Gender</Form.Label>
    <Form.Control
      as="select"
      name="gender"
      value={formData.gender}
      onChange={handleInputChange}
    >
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Others</option> {/* Fixed duplicated value */}
    </Form.Control>
  </Form.Group>
</Col>


                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="text"
                            name="mobileNo"
                            value={formData.mobileNo}
                            placeholder="Enter your number"
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Enter your city"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>State</Form.Label>
                          <Form.Control
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="Enter your state"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Country</Form.Label>
                          <Form.Control
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            placeholder="Enter your country"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Postal/zip Code</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Postal/zip Code"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-20">
                          <Form.Label>Address</Form.Label>
                          <Form.Control
                            as="textarea"
                            placeholder="Enter Address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                          ></Form.Control>
                        </Form.Group>
                      </Col>

                      {/* <div className="themebody-wrap">
         
            <div className="theme-body codex-chat"> */}
                      {/* <Container fluid> */}
                      <Row>
                        <Col>
                          <Card>
                            <Card.Body className="cdx-invoice">
                              <div className="body-invoice">
                                <div className="table-responsive">
                                  <table className="table table-bordered">
                                    <thead>
                                      <tr>
                                        <th>Class</th>
                                        
                                        <th>Paasout</th>
                                        <th>University/Board </th>
                                        <th>Subject</th>

                                        <th>Per/CGPA </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>10th class</td>
                                        <td>2015</td>
                                        <td>Ajmer Board</td>
                                        <td>
                                          Hindi ,English, Computer,Science
                                        </td>
                                        <td>6.6</td>
                                      </tr>
                                      <tr>
                                        <td>12th</td>
                                        <td>2017</td>
                                        <td>Ajmer Board</td>
                                        <td>Biology</td>
                                        <td>7.9</td>
                                      </tr>
                                     

                                      <tr>
                                        <td>
                                      <select className="edittext_wid">
                                            <option selected disabled>
                                              Graduation
                                            </option>
                                            <option>B.Com</option>
                                            <option>Enginering</option>
                                            <option>BBA</option>
                                              <option>BCA</option>
                                            <option>BA</option>
                                            <option>B.Sc</option>
                                          </select>
                                        </td>
                                        <td>2020</td>
                                        <td>Ajmer Board</td>
                                        <td>Biology</td>
                                        <td>5.5</td>
                                      </tr>

                                    
                                        {/* <tr>
                                        <td>
                                           <select className="edittext_wid">
                                            <option selected disabled>
                                             Post Graduation
                                            </option>
                                            <option>M.Com</option>
                                            <option>MCA</option>
                                            <option>MBA</option>
                                             <option>M.tech</option>
                                            <option>M.A</option>
                                            <option>M.sc</option>
                                           
                                          </select>
                                        </td>
                                        <td>2012</td>
                                        <td>Ajmer Board</td>
                                        <td>Biology</td>
                                        <td>6.6</td>
                                      </tr>
                                       <tr>
                                        <td>
                                       <select className="edittext_wid">
                                            <option selected disabled>
                                            P.H.D
                                            </option>
                                            <option>PHD</option>
                                            <option>PHD</option>
                                            <option>PHD</option>
                                          </select>
                                        </td>
                                        <td>2012</td>
                                        <td>Ajmer Board</td>
                                        <td>Biology</td>
                                        <td>6.5</td>
                                      </tr> */}



                                      {/* <tr>
                                                            <td>06</td>
                                                            <td>Biology </td>
                                                            <td>$480</td>
                                                            <td>$50</td>
                                                            <td>$440</td>
                                                        </tr>
                                                        <tr>
                                                            <td>07</td>
                                                            <td>Biology </td>
                                                            <td>$700</td>
                                                            <td>$250</td>
                                                            <td>$450</td>
                                                        </tr>
                                                        <tr>
                                                            <td>08</td>
                                                            <td>Biology </td>
                                                            <td>$570</td>
                                                            <td>$170</td>
                                                            <td>$400</td>
                                                        </tr> */}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>

                      {/* </div>
         
        </div>
       */}

                      <Form.Group className="text-end mb-0">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-sm btn-primary"
                        >
                          {isSubmitting ? "Updating..." : "Submit"}
                        </Button>
                        <Button className="btn btn-sm btn-danger ml-8" onClick={handleCancel}>
                          Cancel
                        </Button>
                      </Form.Group>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </SimpleBar>
      {/* theme body end */}
    </div>
  );
}

