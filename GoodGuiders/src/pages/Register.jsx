// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Form, InputGroup, Button, Row, Col, Container  } from 'react-bootstrap';
// import logo from '/src/assets/images/logo/icon-logo.png';
// import facebook from '/src/assets/images/auth/1.png';
// import google from '/src/assets/images/auth/2.png';

// export default function Register() {
//     //  Inuut value start
//     const [formData, setFormData] = useState({
//         Name: '',
//         Email: '',
//         MobileNo: '',
//         IAgree: '',

//     });

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//             [name]: type === 'checkbox' ? checked : value,
//         });

//     };
//     const [showPassword, setShowPassword] = useState(false);

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };
//     return (
//         <section className="py-100">
//             <Container>
//                 <Row>
//                     <Col>
//                         <div className="codex-authbox">
//                             <div className="auth-header">
//                                 <div className="codex-brand">
//                                     <Link to={'/'}>
//                                         {/* <img className="img-fluid" src={logo} alt="" /> */}
//                                         <img className="img-fluid" src={logo} alt="" style={{ width: '150px', height: 'auto' }} />

//                                         {/* <span className="ms-2">Medixo</span> */}
//                                     </Link>
//                                 </div>
//                                 <h3>Create your account</h3>
//                                 <h6>
//                                     Already have an account?
//                                     <Link className="text-primary" to={'/login'}>login in here</Link>
//                                 </h6>
//                             </div>
//                             <Form>
//                                 <Form.Group className="mb-20">
//                                     <Form.Label>Name</Form.Label>
//                                     <Form.Control type="text" placeholder="Enter Your Name" required="" name="Name" value={formData.Name}
//                                         onChange={handleChange} />
//                                 </Form.Group>
//                                 <Form.Group className="mb-20">
//                                     <Form.Label>Email</Form.Label>
//                                     <Form.Control type="email" placeholder="Enter Your Email" required="" name="Email" value={formData.Email}
//                                         onChange={handleChange} />
//                                 </Form.Group>
//                                 <Form.Group className="mb-20">
//                                     <Form.Label>Mobile No.</Form.Label>
//                                     <Form.Control type="text" placeholder="Enter Your Phone Number" required="" name="Mobile" value={formData.Mobile}
//                                         onChange={handleChange} />
//                                 </Form.Group>
//                                 <Form.Group className="mb-20">
//                                     <Form.Label htmlFor="password">Password</Form.Label>
//                                     <InputGroup className="group-input">
//                                         <Form.Control className="showhide-password" type={showPassword ? 'text' : 'password'} placeholder="Enter Your Password" />
//                                         <InputGroup.Text className={`toggle-show d-flex align-items-center fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick={togglePasswordVisibility}
//                                             style={{ cursor: 'pointer' }}  >
//                                         </InputGroup.Text>
//                                     </InputGroup>
//                                 </Form.Group>

//                                 <Form.Group className="">
//                                     <div className="auth-remember">
//                                         <Form.Check className="form-check custom-chek">
//                                             <Form.Check.Input id="IAgree" type="checkbox" required="" name="IAgree" value={formData.IAgree}
//                                                 onChange={handleChange} />
//                                             <Form.Label className="form-check-label" htmlFor="IAgree">I Agree Terms and conditions</Form.Label>
//                                         </Form.Check>
//                                     </div>
//                                 </Form.Group>
//                                 <Form.Group className="mb-20">
//                                     <Button className="btn btn-primary" type="submit">
//                                         <i className="fa fa-paper-plane"></i> Register
//                                     </Button>
//                                 </Form.Group>
//                             </Form>
//                             <div className="auth-footer">
//                                 <h6 className="auth-with">Or login in with </h6>
//                                 <ul className="login-list">
//                                     <li>
//                                         <Link className="bg-fb" href="#!">
//                                             <img className="img-fluid" src={facebook} alt="facebook" />
//                                             facebook
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link className="bg-google" href="#!">
//                                             <img className="img-fluid" src={google} alt="google" />
//                                             google
//                                         </Link>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </Col>
//                 </Row>
//             </Container>
//         </section>
//   )
// }

import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, InputGroup, Button, Row, Col, Container } from "react-bootstrap";
import logo from "/src/assets/images/logo/icon-logo.png";
import facebook from "/src/assets/images/auth/1.png";
import google from "/src/assets/images/auth/2.png";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    password: "",
    role: "student",
    referralCode: "",
    // IAgree: false,
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!formData.IAgree) {
  //     alert("Please agree to the Terms & Conditions.");
  //     return;
  //   }
  //   console.log("Form Data:", formData);
  //   // Submit the form data to your backend or API here
  // };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (formData.role === "student") {
      // Hit API only for students
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`✅ Registered successfully! Your referral code: ${data.referralCode}`);
        navigate("/login");
      } else {
        alert(`❌ Error: ${data.msg}`);
      }
    } else if (formData.role === "mentor") {
      // Save mentor data in localStorage only, no DB hit
      localStorage.setItem("mentorPendingData", JSON.stringify(formData));
      navigate("/mentor-registration");
    }
  } catch (err) {
    console.error(err);
    alert("Server error. Please try again.");
  }
};
  

  return (
    <section className="py-100">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="codex-authbox">
              <div className="auth-header text-center mb-4">
                <div className="codex-brand mb-3">
                  <Link to="/">
                    <img
                      className="img-fluid"
                      src={logo}
                      alt="Logo"
                      style={{ width: "150px", height: "auto" }}
                    />
                  </Link>
                </div>
                <h3>Create your account</h3>
                <h6>
                  Already have an account?{" "}
                  <Link className="text-primary" to="/login">
                    Login here
                  </Link>
                </h6>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Name"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Your Email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mobile No.</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Phone Number"
                    required
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Your Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <InputGroup.Text
                      className={`toggle-show d-flex align-items-center fa ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Select Role</Form.Label>
                  <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="student">Student</option>
                    <option value="mentor">Mentor</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Referral Code (optional)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter referral code if any"
                    name="referredBy"
                    value={formData.referredBy}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* <Form.Group className="mb-3">
                  <Form.Label>Select Mentor/Student</Form.Label>
                  <Form.Select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  >
                    <option value="">Select </option>
                    <option value="Mentor">Mentor</option>
                    <option value="Student">Student</option>
                  
                  </Form.Select>
                </Form.Group> */}

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="I agree to the Terms & Conditions"
                    name="IAgree"
                    checked={formData.IAgree}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-20">
                  <Button className="btn btn-primary" type="submit">
                    <i className="fa fa-paper-plane"></i> Register
                  </Button>
                </Form.Group>

                <div className="auth-footer">
                  <h6 className="auth-with">Or login in with </h6>
                  <ul className="login-list">
                    <li>
                      <Link className="bg-fb" href="#!">
                        <img
                          className="img-fluid"
                          src={facebook}
                          alt="facebook"
                        />
                        facebook
                      </Link>
                    </li>
                    <li>
                      <Link className="bg-google" href="#!">
                        <img className="img-fluid" src={google} alt="google" />
                        google
                      </Link>
                    </li>
                  </ul>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
