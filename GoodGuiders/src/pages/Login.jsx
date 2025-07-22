// // import React, { useState } from "react";
// // import { Link } from "react-router-dom";
// // import { Button, Form, InputGroup } from 'react-bootstrap';

// // import logo from '/src/assets/images/logo/icon-logo.png';
// // import facebook from '/src/assets/images/auth/1.png';
// // import google from '/src/assets/images/auth/2.png';

// // export default function Login() {
// //      //  Inuut value start
// //      const [formData, setFormData] = useState({
// //         email: '',
// //         Remember: '',

// //     });

// //     const handleChange = (e) => {
// //         const { name, value, type, checked } = e.target;
// //         setFormData({
// //             ...formData,
// //             [name]: value,
// //             [name]: type === 'checkbox' ? checked : value,
// //         });

// //     };
// //     const [showPassword, setShowPassword] = useState(false);

// //     const togglePasswordVisibility = () => {
// //         setShowPassword(!showPassword);
// //     };
// //     return (
// //         <>
// //             <div className="auth-main">
// //                 <div className="codex-authbox">
// //                     <div className="auth-header">
// //                         <div className="codex-brand">
// //                             <Link to={'/'}>
// //                                 {/* <img className="img-fluid" src={logo} alt="" /> */}
// //                                    <img className="img-fluid" src={logo} alt="" style={{ width: '150px', height: 'auto' }} />
// //                                 {/* <span className="ms-2">Medixo</span> */}
// //                             </Link>
// //                         </div>
// //                         <h3>welcome to Good Guiders</h3>
// //                         <h6>
// //                             don't have an account?
// //                             <Link className="text-primary" to={'/register'}> creat an account</Link>
// //                         </h6>
// //                     </div>
// //                     <Form>
// //                         <Form.Group className="mb-20">
// //                             <Form.Label>Email</Form.Label>
// //                             <Form.Control type="text" placeholder="Enter Your Email" name="email" value={formData.email}
// //                                 onChange={handleChange} />
// //                         </Form.Group>
// //                         <Form.Group className="mb-20">
// //                             <Form.Label htmlFor="password">Password</Form.Label>
// //                             <InputGroup className="group-input ">
// //                                 <Form.Control className="showhide-password"  type={showPassword ? 'text' : 'password'}  placeholder="Enter Your Password"  />
// //                                 <InputGroup.Text  className={`toggle-show d-flex align-items-center fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick={togglePasswordVisibility}
// //                                     style={{ cursor: 'pointer' }}  >
// //                                 </InputGroup.Text>
// //                             </InputGroup>
// //                         </Form.Group>
// //                         <Form.Group className="mb-20">
// //                             <div className="auth-remember">
// //                                 <Form.Check className="custom-chek">
// //                                     <Form.Check.Input id="agree" type="checkbox" checked={formData.Remember}
// //                                         onChange={handleChange} />
// //                                     <Form.Check.Label htmlFor="agree">Remember me</Form.Check.Label>
// //                                 </Form.Check>
// //                                 <Link className="text-primary f-pwd" to={'/forgot-password'}>Forgot your password?</Link>
// //                             </div>
// //                         </Form.Group>
// //                         <Form.Group className="mb-20">
// <Button className="btn btn-primary" type="submit">
//     <i className="fa fa-sign-in"></i> Login
// </Button>
// //                         </Form.Group>
// //                     </Form>
// //                     <div className="auth-footer">
// //                         <h6 className="auth-with">Or login in with </h6>
// //                         <ul className="login-list">
// //                             <li>
// //                                 <Link className="bg-fb">
// //                                     <img className="img-fluid" src={facebook} alt="facebook" />
// //                                     facebook
// //                                 </Link>
// //                             </li>
// //                             <li>
// //                                 <Link className="bg-google">
// //                                     <img className="img-fluid" src={google} alt="google" />
// //                                     google
// //                                 </Link>
// //                             </li>
// //                         </ul>
// //                     </div>
// //                 </div>
// //             </div>
// //         </>
// //     )
// // }

// // import React, { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { Button, Form, InputGroup } from 'react-bootstrap';

// // import logo from '/src/assets/images/logo/icon-logo.png';
// // import facebook from '/src/assets/images/auth/1.png'; f
// // import google from '/src/assets/images/auth/2.png';

// // export default function Login() {
// //     const navigate = useNavigate();

// //     const [formData, setFormData] = useState({
// //         email: '',
// //         password: '',
// //         Remember: false,
// //     });

// //     const [showPassword, setShowPassword] = useState(false);
// //     const togglePasswordVisibility = () => setShowPassword(!showPassword);

// //     const handleChange = (e) => {
// //         const { name, value, type, checked } = e.target;
// //         setFormData({
// //             ...formData,
// //             [name]: type === 'checkbox' ? checked : value,
// //         });
// //     };

// //     const handleSubmit = (e) => {
// //         e.preventDefault();

// //         const { email, password } = formData;

// //         if (!email || !password) {
// //             alert("Please fill in both email and password.");
// //             return;
// //         }

// //         // Example: Basic role check by email
// //         if (email === "student@gmail.com") {
// //             navigate("/patient-dashboard");
// //         } else if (email === "mentor@gmail.com") {
// //             navigate("/doctor-dashboard");
// //         } else {
// //             alert("Invalid credentials.");
// //         }
// //     };

// //     return (
// //         <div className="auth-main">
// //             <div className="codex-authbox">
// //                 <div className="auth-header">
// //                     <div className="codex-brand">
// //                         <Link to={'/'}>
// //                             <img className="img-fluid" src={logo} alt="" style={{ width: '150px', height: 'auto' }} />
// //                         </Link>
// //                     </div>
// //                     <h3>welcome to Good Guiders</h3>
// //                     <h6>
// //                         don't have an account?
// //                         <Link className="text-primary" to={'/register'}> create an account</Link>
// //                     </h6>
// //                 </div>

// //                 <Form onSubmit={handleSubmit}>
// //                     <Form.Group className="mb-20">
// //                         <Form.Label>Email</Form.Label>
// //                         <Form.Control
// //                             type="email"
// //                             placeholder="Enter Your Email"
// //                             name="email"
// //                             value={formData.email}
// //                             onChange={handleChange}
// //                             required
// //                         />
// //                     </Form.Group>

// //                     <Form.Group className="mb-20">
// //                         <Form.Label htmlFor="password">Password</Form.Label>
// //                         <InputGroup className="group-input">
// //                             <Form.Control
// //                                 className="showhide-password"
// //                                 type={showPassword ? 'text' : 'password'}
// //                                 placeholder="Enter Your Password"
// //                                 name="password"
// //                                 value={formData.password}
// //                                 onChange={handleChange}
// //                                 required
// //                             />
// //                             <InputGroup.Text
// //                                 className={`toggle-show d-flex align-items-center fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
// //                                 onClick={togglePasswordVisibility}
// //                                 style={{ cursor: 'pointer' }}
// //                             />
// //                         </InputGroup>
// //                     </Form.Group>

// //                     <Form.Group className="mb-20">
// //                         <div className="auth-remember">
// //                             <Form.Check className="custom-chek">
// //                                 <Form.Check.Input
// //                                     id="agree"
// //                                     type="checkbox"
// //                                     name="Remember"
// //                                     checked={formData.Remember}
// //                                     onChange={handleChange}
// //                                 />
// //                                 <Form.Check.Label htmlFor="agree">Remember me</Form.Check.Label>
// //                             </Form.Check>
// //                             <Link className="text-primary f-pwd" to={'/forgot-password'}>Forgot your password?</Link>
// //                         </div>
// //                     </Form.Group>

// //                     <Form.Group className="mb-20">
// //                         <Button className="btn btn-primary" type="submit">
// //                             <i className="fa fa-sign-in"></i> Login
// //                         </Button>
// //                     </Form.Group>
// //                 </Form>

// //                 <div className="auth-footer">
// //                     <h6 className="auth-with">Or login with</h6>
// //                     <ul className="login-list">
// //                         <li>
// //                             <Link className="bg-fb">
// //                                 <img className="img-fluid" src={facebook} alt="facebook" /> facebook
// //                             </Link>
// //                         </li>
// //                         <li>
// //                             <Link className="bg-google">
// //                                 <img className="img-fluid" src={google} alt="google" /> google
// //                             </Link>
// //                         </li>
// //                     </ul>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button, Form, InputGroup } from 'react-bootstrap';

// import logo from '/src/assets/images/logo/icon-logo.png';
// import facebook from '/src/assets/images/auth/1.png';
// import google from '/src/assets/images/auth/2.png';

// export default function Login() {
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//         Remember: false,
//     });

//     const [showPassword, setShowPassword] = useState(false);

//     const togglePasswordVisibility = () => setShowPassword(!showPassword);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value,
//         });
//     };

//     return (
//         <div className="auth-main">
//             <div className="codex-authbox">
//                 {/* Header Section */}
//                 <div className="auth-header">
//                     <div className="codex-brand">
//                         <Link to={'/'}>
//                             <img className="img-fluid" src={logo} alt="logo" style={{ width: '150px', height: 'auto' }} />
//                         </Link>
//                     </div>
//                     <h3>Welcome to Good Guiders</h3>
//                     <h6>
//                         Don't have an account?
//                         <Link className="text-primary" to={'/register'}> Create an account</Link>
//                     </h6>
//                 </div>

//                 {/* Login Form */}
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group className="mb-20">
//                         <Form.Label>Email</Form.Label>
//                         <Form.Control
//                             type="email"
//                             placeholder="Enter Your Email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-20">
//                         <Form.Label htmlFor="password">Password</Form.Label>
//                         <InputGroup className="group-input">
//                             <Form.Control
//                                 className="showhide-password"
//                                 type={showPassword ? 'text' : 'password'}
//                                 placeholder="Enter Your Password"
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 required
//                             />
//                             <InputGroup.Text
//                                 className={`toggle-show d-flex align-items-center fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
//                                 onClick={togglePasswordVisibility}
//                                 style={{ cursor: 'pointer' }}
//                             />
//                         </InputGroup>
//                     </Form.Group>

//                     <Form.Group className="mb-20">
//                         <div className="auth-remember d-flex justify-content-between align-items-center">
//                             <Form.Check className="custom-chek">
//                                 <Form.Check.Input
//                                     id="agree"
//                                     type="checkbox"
//                                     name="Remember"
//                                     checked={formData.Remember}
//                                     onChange={handleChange}
//                                 />
//                                 <Form.Check.Label htmlFor="agree">Remember me</Form.Check.Label>
//                             </Form.Check>
//                             <Link className="text-primary f-pwd" to={'/forgot-password'}>Forgot your password?</Link>
//                         </div>
//                     </Form.Group>

//                        <Form.Group className="mb-20">
//                          <Button className="btn btn-primary" type="submit">
//                              <Link className="fa fa-sign-in"to={'/patient-dashboard'}>Login</Link>
//                          </Button>
//                     </Form.Group>
//                 </Form>

//                 {/* Footer Section with Social Login */}
//                 <div className="auth-footer">
//                     <h6 className="auth-with">Or login with</h6>
//                     <ul className="login-list d-flex gap-3 justify-content-center">
//                         <li>
//                             <Link to="#" className="bg-fb d-flex align-items-center gap-2 px-3 py-2 rounded text-white">
//                                 <img className="img-fluid" src={facebook} alt="facebook" style={{ width: 20 }} />
//                                 Facebook
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="#" className="bg-google d-flex align-items-center gap-2 px-3 py-2 rounded text-white">
//                                 <img className="img-fluid" src={google} alt="google" style={{ width: 20 }} />
//                                 Google
//                             </Link>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// }

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button, Form, InputGroup } from 'react-bootstrap';

// import logo from '/src/assets/images/logo/icon-logo.png';
// import facebook from '/src/assets/images/auth/1.png';
// import google from '/src/assets/images/auth/2.png';

// export default function Login() {
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//         Remember: false,
//     });

//     const [showPassword, setShowPassword] = useState(false);

//     const togglePasswordVisibility = () => setShowPassword(!showPassword);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value,
//         });
//     };

//     // ✅ Handle login based on email
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const { email } = formData;

//         if (email === "student@gmail.com") {
//             navigate("/patient-dashboard");
//         } else if (email === "mentor@gmail.com") {
//             navigate("/doctor-dashboard");
//         } else {
//             alert("Invalid email or role. Please try again.");
//         }
//     };

//     return (
//         <div className="auth-main">
//             <div className="codex-authbox">
//                 {/* Header Section */}
//                 <div className="auth-header">
//                     <div className="codex-brand">
//                         <Link to={'/'}>
//                             <img className="img-fluid" src={logo} alt="logo" style={{ width: '150px', height: 'auto' }} />
//                         </Link>
//                     </div>
//                     <h3>Welcome to Good Guiders</h3>
//                     <h6>
//                         Don't have an account?
//                         <Link className="text-primary" to={'/register'}> Create an account</Link>
//                     </h6>
//                 </div>

//                 {/* Login Form */}
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group className="mb-20">
//                         <Form.Label>Email</Form.Label>
//                         <Form.Control
//                             type="email"
//                             placeholder="Enter Your Email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-20">
//                         <Form.Label htmlFor="password">Password</Form.Label>
//                         <InputGroup className="group-input">
//                             <Form.Control
//                                 className="showhide-password"
//                                 type={showPassword ? 'text' : 'password'}
//                                 placeholder="Enter Your Password"
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 required
//                             />
//                             <InputGroup.Text
//                                 className={`toggle-show d-flex align-items-center fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
//                                 onClick={togglePasswordVisibility}
//                                 style={{ cursor: 'pointer' }}
//                             />
//                         </InputGroup>
//                     </Form.Group>

//                     <Form.Group className="mb-20">
//                         <div className="auth-remember d-flex justify-content-between align-items-center">
//                             <Form.Check className="custom-chek">
//                                 <Form.Check.Input
//                                     id="agree"
//                                     type="checkbox"
//                                     name="Remember"
//                                     checked={formData.Remember}
//                                     onChange={handleChange}
//                                 />
//                                 <Form.Check.Label htmlFor="agree">Remember me</Form.Check.Label>
//                             </Form.Check>
//                             <Link className="text-primary f-pwd" to={'/forgot-password'}>Forgot your password?</Link>
//                         </div>
//                     </Form.Group>

//                     <Form.Group className="mb-20">
//                         <Button className="btn btn-primary" type="submit">
//                             <i className="fa fa-sign-in me-2" />
//                             Login
//                         </Button>
//                     </Form.Group>
//                 </Form>

//                 {/* Footer Section with Social Login */}
//                 <div className="auth-footer">
//                     <h6 className="auth-with">Or login with</h6>
//                     <ul className="login-list d-flex gap-3 justify-content-center">
//                         <li>
//                             <Link to="#" className="bg-fb d-flex align-items-center gap-2 px-3 py-2 rounded text-white">
//                                 <img className="img-fluid" src={facebook} alt="facebook" style={{ width: 20 }} />
//                                 Facebook
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="#" className="bg-google d-flex align-items-center gap-2 px-3 py-2 rounded text-white">
//                                 <img className="img-fluid" src={google} alt="google" style={{ width: 20 }} />
//                                 Google
//                             </Link>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// }

// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Button, Form, InputGroup } from "react-bootstrap";
// import logo from '/src/assets/images/logo/icon-logo.png';
// import facebook from '/src/assets/images/auth/1.png';
// import google from '/src/assets/images/auth/2.png';

// export default function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     Remember: false,
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   const { email } = formData;

//   localStorage.setItem("loggedInEmail", email);

//   if (email === "admin@gmail.com") {
//     navigate("/");
//   } else if (email === "mentor@gmail.com") {
//     navigate("/doctor-dashboard");
//   } else if (email === "student@gmail.com") {
//     navigate("/patient-dashboard");
//   } else {
//     alert("Invalid email. Please try again.");
//   }
// };

//   return (
//     <div className="auth-main" style={{ padding: 30 }}>
//       <div className="codex-authbox">
//         {/* Header */}
//         <div className="auth-header">
//           <div className="codex-brand">
//             <Link to={"/"}>
//               <img
//                 className="img-fluid"
//                 src={logo}
//                 alt="logo"
//                 style={{ width: "150px" }}
//               />
//             </Link>
//           </div>
//           <h3>Welcome to Good Guiders</h3>
//           <h6>
//             Don't have an account?
//             <Link className="text-primary" to={"/register"}>
//               {" "}
//               Create an account
//             </Link>
//           </h6>
//         </div>

//         {/* Login Form */}
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="Enter Your Email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Password</Form.Label>
//             <InputGroup>
//               <Form.Control
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter Your Password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//               <InputGroup.Text
//                 onClick={togglePasswordVisibility}
//                 style={{ cursor: "pointer" }}
//               >
//                 <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
//               </InputGroup.Text>
//             </InputGroup>
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Check
//               type="checkbox"
//               label="Remember me"
//               name="Remember"
//               checked={formData.Remember}
//               onChange={handleChange}
//             />
//             <Link className="text-primary float-end" to={"/forgot-password"}>
//               Forgot your password?
//             </Link>
//           </Form.Group>

//           <Button variant="btn btn-primary" type="submit" className="w-100">
//             <i className="fa fa-sign-in" />
//             Login
//           </Button>
//         </Form>

//         {/* Footer */}
//         <div className="auth-footer mt-4 text-center">
//           <h6 className="auth-with">Or login with</h6>
//           <div className="d-flex gap-3 justify-content-center mt-2">
//             <Link className="bg-primary px-3 py-2 text-white rounded">
//               <img src={facebook} alt="facebook" width={20} className="me-2" />
//               Facebook
//             </Link>
//             <Link className="bg-danger px-3 py-2 text-white rounded">
//               <img src={google} alt="google" width={20} className="me-2" />
//               Google
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Button, Form, InputGroup } from "react-bootstrap";
// import logo from "/src/assets/images/logo/icon-logo.png";
// import facebook from "/src/assets/images/auth/1.png";
// import google from "/src/assets/images/auth/2.png";

// export default function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     Remember: false,
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   const { email } = formData;

//   //   console.log("Logging in with email:", email); // Debugging log
//   //   localStorage.setItem("loggedInEmail", email);

//   //   if (email === "admin@gmail.com") {
//   //     navigate("/");
//   //   } else if (email === "mentor@gmail.com") {
//   //     navigate("/doctor-dashboard");
//   //   } else if (email === "student@gmail.com") {
//   //     navigate("/patient-dashboard");
//   //   } else {
//   //     alert("Invalid email. Please try again.");
//   //   }
//   // };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { email, password } = formData;

//     // Try to get registered doctor info
//     const storedDoctor = JSON.parse(localStorage.getItem("doctorProfile"));

//     if (!storedDoctor) {
//       alert("No doctor account found. Please register first.");
//       return;
//     }

//     if (email === storedDoctor.Email && password === storedDoctor.Password) {
//       localStorage.setItem("loggedInDoctor", JSON.stringify(storedDoctor));
//       navigate("/doctor-dashboard");
//     } else if (email === "admin@gmail.com") {
//       navigate("/");
//     } else if (email === "student@gmail.com") {
//       navigate("/patient-dashboard");
//     } else if (email === "mentor@gmail.com") {
//       navigate("/doctor-dashboard");
//     } else {
//       alert("Invalid email or password. Please try again.");
//     }
//   };

//   return (
//     <div className="auth-main" style={{ padding: 30 }}>
//       <div className="codex-authbox">
//         {/* Header */}
//         <div className="auth-header text-center">
//           <div className="codex-brand mb-3">
//             <Link to={"/"}>
//               <img
//                 className="img-fluid"
//                 src={logo}
//                 alt="logo"
//                 style={{ width: "150px" }}
//               />
//             </Link>
//           </div>
//           <h3>Welcome to Good Guiders</h3>
//           <h6>
//             Don't have an account?{" "}
//             <Link className="text-primary" to={"/register"}>
//               Create an account
//             </Link>
//           </h6>
//         </div>

//         {/* Login Form */}
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="Enter Your Email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Password</Form.Label>
//             <InputGroup>
//               <Form.Control
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter Your Password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//               <InputGroup.Text
//                 onClick={togglePasswordVisibility}
//                 style={{ cursor: "pointer" }}
//               >
//                 <i
//                   className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
//                 />
//               </InputGroup.Text>
//             </InputGroup>
//           </Form.Group>

//           <Form.Group className="mb-3 d-flex justify-content-between align-items-center">
//             <Form.Check
//               type="checkbox"
//               label="Remember me"
//               name="Remember"
//               checked={formData.Remember}
//               onChange={handleChange}
//             />
//             <Link className="text-primary" to={"/forgot-password"}>
//               Forgot your password?
//             </Link>
//           </Form.Group>

//           {/* <Button variant="btn btn-primary" type="submit" className="w-100">
//             <i className="fa fa-sign-in" />
//             Login
//           </Button> */}

//           <Form.Group className="mb-20">
//             <Button className="btn btn-primary" type="submit">
//               <i className="fa fa-sign-in"></i> Login
//             </Button>
//           </Form.Group>
//         </Form>

//         {/* Footer */}
//         {/* <div className="auth-footer mt-4 text-center">
//           <h6 className="auth-with">Or login with</h6>
//           <div className="d-flex gap-3 justify-content-center mt-2">
//             <Link className="bg-primary px-3 py-2 text-white rounded">
//               <img src={facebook} alt="facebook" width={20} className="me-2" />
//               Facebook
//             </Link>
//             <Link className="bg-google">
//               <img src={google} alt="google" width={20} className="me-2" />
//               Google
//             </Link>
//           </div>
//         </div> */}

//         <div className="auth-footer">
//           <h6 className="auth-with">Or login in with </h6>
//           <ul className="login-list">
//             <li>
//               <Link className="bg-fb" href="#!">
//                 <img className="img-fluid" src={facebook} alt="facebook" />
//                 facebook
//               </Link>
//             </li>
//             <li>
//               <Link className="bg-google" href="#!">
//                 <img className="img-fluid" src={google} alt="google" />
//                 google
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";
import logo from "/src/assets/images/logo/icon-logo.png";
import facebook from "/src/assets/images/auth/1.png";
import google from "/src/assets/images/auth/2.png";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    Remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      

      if (res.ok) {
        alert("✅ Login successful!");


        // Save user data locally if needed
        localStorage.setItem("loggedInUser", JSON.stringify(data));

        // const role = data.user?.role?.toLowerCase();

        // Navigate based on role
        if (data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else if (data.user.role === "student") {
          navigate("/patient-dashboard");
        } else if (data.user.role === "mentor") {
          navigate("/doctor-dashboard");
        } else {
          navigate("/");
          console.log(data)
        }
      } else {
        alert(`❌ ${data.msg}`);
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="auth-main" style={{ padding: 30 }}>
      <div className="codex-authbox">
        {/* Header */}
        <div className="auth-header text-center">
          <div className="codex-brand mb-3">
            <Link to={"/"}>
              <img
                className="img-fluid"
                src={logo}
                alt="logo"
                style={{ width: "150px" }}
              />
            </Link>
          </div>
          <h3>Welcome to Good Guiders</h3>
          <h6>
            Don't have an account?{" "}
            <Link className="text-primary" to={"/register"}>
              Create an account
            </Link>
          </h6>
        </div>

        {/* Login Form */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
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
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              >
                <i
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3 d-flex justify-content-between align-items-center">
            <Form.Check
              type="checkbox"
              label="Remember me"
              name="Remember"
              checked={formData.Remember}
              onChange={handleChange}
            />
            <Link className="text-primary" to={"/forgot-password"}>
              Forgot your password?
            </Link>
          </Form.Group>

          <Form.Group className="mb-20">
            <Button className="btn btn-primary" type="submit">
              <i className="fa fa-sign-in"></i> Login
            </Button>
          </Form.Group>
        </Form>

        {/* Footer */}
        <div className="auth-footer">
          <h6 className="auth-with">Or login with</h6>
          <ul className="login-list">
            <li>
              <Link className="bg-fb" href="#!">
                <img className="img-fluid" src={facebook} alt="facebook" />
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
      </div>
    </div>
  );
}


