// import React, { useState } from 'react';
// import { Link } from "react-router-dom";
// import { Row, Col, Card, Form, Container } from 'react-bootstrap';
// import SimpleBar from 'simplebar-react';
// import PageBreadcrumb from '../componets/PageBreadcrumb';

// export default function Edit_doctor() {
//     const [formData, setFormData] = useState({
//         firstName: 'Elizabeth',
//         lastName: 'Blackwell',
//         dob: '',
//         gender: '',
//         profileImage: null,
//         education: 'M.B.B.S',
//         designation: 'Physician',
//         department: '',
//         website: 'http://www.example.com',
//         email: 'example@email.com',
//         phone: '+1 50 456XXX',
//         password: 'Example@pass',
//         confirmPassword: 'Example@pass',
//         facebookUrl: 'http://www.facebook.com/',
//         twitterUrl: 'http://www.twitter.com/',
//         instagramUrl: 'http://www.instagram.com/',
//         googlePlusUrl: 'http://www.plus.google.com',
//       });

//       // Handle input change
//       const handleInputChange = (e) => {
//         const { name, value, type, files } = e.target;
//         if (type === 'file') {
//           setFormData({ ...formData, [name]: files[0] });
//         } else {
//           setFormData({ ...formData, [name]: value });
//         }
//       };

//   return (
//     <div className="themebody-wrap">
//     {/* Breadcrumb Start */}
//     <PageBreadcrumb pagename="Edit Mentor" />
//     {/* Breadcrumb End */}
//     {/* theme body start */}
//     <SimpleBar className="theme-body common-dash">
//       <Container fluid >
//         <Row>
//           <Col md={12}>
//             <Card>
//               <Card.Header>
//                 <h4>Personal Information</h4>
//               </Card.Header>
//               <Card.Body>
//                 <Form>
//                   <Row>
//                     <Col md={4}>
//                       <Form.Group className="mb-20">
//                         <Form.Label>First Name</Form.Label>
//                         <Form.Control  type="text" placeholder="First Name" name="firstName"  value={formData.firstName}  onChange={handleInputChange} />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group className="mb-20">
//                         <Form.Label>last name</Form.Label>
//                         <Form.Control  type="text" placeholder="Last Name" name="lastName"  value={formData.lastName}  onChange={handleInputChange} />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group className="mb-20">
//                         <Form.Label>Date of Birth</Form.Label>
//                         <Form.Control  className="datepicker-here form-control" type="text"  placeholder="DD/MM/YYYY" name="dob"  value={formData.dob}  onChange={handleInputChange} />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group className="mb-20">
//                         <Form.Label>Gender</Form.Label>
//                         <select className="form-select" name="gender"  value={formData.gender}  onChange={handleInputChange}>
//                           <option value="Gender">Select Gender</option>
//                           <option value="Male">Male</option>
//                           <option value="Female">Female</option>
//                         </select>
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group className="mb-20">
//                         <Form.Label>Profile Image</Form.Label>
//                         <Form.Control  type="file" name="profileImage" onChange={handleInputChange}/>
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group className="mb-20">
//                         <Form.Label>Education</Form.Label>
//                         <Form.Control  type="text" placeholder="Enter Education" name="education"  value={formData.education}  onChange={handleInputChange}/>
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group className="mb-20">
//                         <Form.Label>Designation</Form.Label>
//                         <Form.Control  type="text" placeholder="Enter Designation" name="designation"  value={formData.designation}  onChange={handleInputChange}/>
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group className="mb-20">
//                         <Form.Label>Department</Form.Label>
//                         <select className="form-select hidesearch" name="department"  value={formData.department}  onChange={handleInputChange}>
//                           <option value="Audiologists">Audiologists</option>
//                           <option value="Cardiologists">Cardiologists</option>
//                           <option value="Endocrinologist">Endocrinologist</option>
//                           <option value="Oncologists">Oncologists</option>
//                           <option value="Neurology">Neurology</option>
//                           <option value="Orthopedics">Orthopedics</option>
//                           <option value="Gynaecology">Gynaecology</option>
//                           <option value="Microbiology">Microbiology</option>
//                         </select>
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group className="mb-20">
//                         <Form.Label>Website URL</Form.Label>
//                         <Form.Control  type="text" placeholder="Speciality" name="website"  value={formData.website}  onChange={handleInputChange} />
//                       </Form.Group>
//                     </Col>
//                     <Form.Group>
//                       <Link className="btn btn-sm btn-primary" href="javascript:void(0);">Save</Link>
//                       <Link className="btn btn-sm btn-danger ml-8" href="javascript:void(0);">Cancle</Link>
//                     </Form.Group>
//                   </Row>
//                 </Form>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col md={6}>
//             <Card>
//               <Card.Header>
//                 <h4>Mentor Account Info</h4>
//               </Card.Header>
//               <Card.Body>
//                 <Form>
//                   <Form.Group className="mb-20">
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control  type="text" placeholder="" name="email"  value={formData.email}  onChange={handleInputChange} />
//                   </Form.Group>
//                   <Form.Group className="mb-20">
//                     <Form.Label>Phone</Form.Label>
//                     <Form.Control  type="text" placeholder="" name="phone"  value={formData.phone}  onChange={handleInputChange}/>
//                   </Form.Group>
//                   <Form.Group className="mb-20">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control  type="password" placeholder="" name="password"  value={formData.password}  onChange={handleInputChange}/>
//                   </Form.Group>
//                   <Form.Group className="mb-20">
//                     <Form.Label>Confirm Password</Form.Label>
//                     <Form.Control  type="password" placeholder="" name="confirmPassword"  value={formData.confirmPassword}  onChange={handleInputChange}/>
//                   </Form.Group>
//                   <Form.Group>
//                     <Link className="btn btn-sm btn-primary" href="javascript:void(0);">Save</Link>
//                     <Link className="btn btn-sm btn-danger ml-8" href="javascript:void(0);">Cancle</Link>
//                   </Form.Group>
//                 </Form>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col md={6}>
//             <Card>
//               <Card.Header>
//                 <h4>Mentor Social Media Info</h4>
//               </Card.Header>
//               <Card.Body>
//                 <Form>
//                   <Form.Group className="mb-20">
//                     <Form.Label>Facebook URL</Form.Label>
//                     <Form.Control  type="url"  value={formData.facebookUrl}  onChange={handleInputChange}/>
//                   </Form.Group>
//                   <Form.Group className="mb-20">
//                     <Form.Label>Twitter URL</Form.Label>
//                     <Form.Control  type="url"  value={formData.twitterUrl}  onChange={handleInputChange}/>
//                   </Form.Group>
//                   <Form.Group className="mb-20">
//                     <Form.Label>Instagram URL</Form.Label>
//                     <Form.Control  type="url" value={formData.instagramUrl}  onChange={handleInputChange}/>
//                   </Form.Group>
//                   <Form.Group className="mb-20">
//                     <Form.Label>Google Plus URL</Form.Label>
//                     <Form.Control  type="url" value={formData.googlePlusUrl}  onChange={handleInputChange}/>
//                   </Form.Group>
//                   <Form.Group>
//                     <Link className="btn btn-sm btn-primary" href="javascript:void(0);">Save</Link>
//                     <Link className="btn btn-sm btn-danger ml-8" href="javascript:void(0);">Cancle</Link>
//                   </Form.Group>
//                 </Form>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </SimpleBar>
//     {/* theme body end */}
//   </div>
//   )
// }

import { useEffect, useState } from "react";
import { Row, Col, Card, Form, Container, Button } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import PageBreadcrumb from "../componets/PageBreadcrumb";
import "./css/ProfilePage.css";
// import { Link } from "react-router-dom";
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
    address: "",
    bio: "",
    experience: "",
    mentorAbilities: [],
    specializedIn: "",

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
        address: savedUser.address || "",
        bio: savedUser.bio || "",
        experience: savedUser.experience || "",
        mentorAbilities: savedUser.mentorAbilities || "",
        specializedIn: savedUser.specializedIn || "",
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!savedUser) {
      alert("No user data found.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, email: savedUser.email }), // your form state
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
      [name]:
        type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };

  const handleCancel = () => {
    if (!savedUser) return;

    setFormData({
      name: savedUser.name || "",
      dob: savedUser.dob || "",
      gender: savedUser.gender || "",
      mobileNo: savedUser.mobileNo || "",
      city: savedUser.city || "",
      state: savedUser.state || "",
      country: savedUser.country || "",
      postalCode: savedUser.postalCode || "",
      address: savedUser.address || "",
      bio: savedUser.bio || "",
      experience: savedUser.experience || "",
      mentorAbilities: savedUser.mentorAbilities || "",
      specializedIn: savedUser.specializedIn || "",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="themebody-wrap">
      <PageBreadcrumb pagename="Edit Mentor" />

      <SimpleBar className="theme-body common-dash">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card>
                <Card.Header>
                  <h4> Mentor Information</h4>
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
                        <img
                          src={user.profilePic}
                          alt=""
                          className="profile-picedit"
                        />
                        <button
                          style={{
                            color: "white",
                            backgroundColor: "transparent",
                            border: "none",
                            fontSize: "1.25rem",
                          }}
                        >
                          {user.name}
                        </button>
                      </div>

                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder="Your Name"
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
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
                            <option value="Other">Others</option>
                            {/* Fixed duplicated value */}
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
                          <Form.Label>specializedIn</Form.Label>
                          <Form.Control
                            type="text"
                            name="specializedIn"
                            value={formData.specializedIn}
                            placeholder="Enter your specialization"
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>mentorAbilities</Form.Label>
                          <Form.Control
                              type="text"
                              name="mentorAbilities"
                              value={formData.mentorAbilities.join(", ")} 
                              placeholder="Enter abilities (comma separated)"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  mentorAbilities: e.target.value.split(",").map((s) => s.trim()),
                                })
                              }
                            />

                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Experience</Form.Label>
                          <Form.Control
                            type="text"
                            name="experience"
                            value={formData.experience}
                            placeholder="Enter your experience"
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
                      <Col md={6}>
                        <Form.Group className="mb-20">
                          <Form.Label>Bio</Form.Label>
                          <Form.Control
                            as="textarea"
                            placeholder="Enter bio"
                            name="bio"
                            value={formData.bio}
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

                                      <tr>
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
                                      </tr>

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
                        <Button
                          className="btn btn-sm btn-danger ml-8"
                          onClick={handleCancel}
                        >
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
