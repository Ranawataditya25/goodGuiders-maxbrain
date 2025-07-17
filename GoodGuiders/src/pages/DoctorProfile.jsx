// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// export default function DoctorProfile() {
//   const { state: basicInfo } = useLocation();
//   const navigate = useNavigate();

//   const [doctorData, setDoctorData] = useState({
//     graduation: "",
//     postGraduation: "",
//     experience: "",
//     specializedIn: "",
//     address: "",
//     gender: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDoctorData({ ...doctorData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const fullData = { ...basicInfo, ...doctorData, status: "pending" };
//     console.log("Full Doctor Data:", fullData);

//     // Pass data to status page
//     navigate("/status", { state: fullData });
//   };

//   return (
//     <div className="container py-5">
//       <h2>Doctor Profile Information</h2>
//       <form onSubmit={handleSubmit} className="mt-3">
//         {Object.keys(doctorData).map((field) => (
//           <div className="mb-3" key={field}>
//             <label className="form-label">{field}</label>
//             <input
//               type="text"
//               name={field}
//               value={doctorData[field]}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>
//         ))}
//         <button type="submit" className="btn btn-primary">Submit</button>
//       </form>
//     </div>
//   );
// }









import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import logo from '/src/assets/images/logo/icon-logo.png';

export default function DoctorProfile() {
  const { state: basicInfo } = useLocation();
  const navigate = useNavigate();

  const [doctorData, setDoctorData] = useState({
    graduation: "",
    postGraduation: "",
    experience: "",
    specializedIn: "",
    address: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({ ...doctorData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullData = { ...basicInfo, ...doctorData, status: "pending" };
    console.log("Full Doctor Data:", fullData);

    // Navigate to status page
    navigate("/status", { state: fullData });
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
                <h3>Complete Doctor Profile</h3>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Graduation</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your graduation"
                    required
                    name="graduation"
                    value={doctorData.graduation}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Post Graduation</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your post graduation"
                    name="postGraduation"
                    value={doctorData.postGraduation}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Experience</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Years of experience"
                    name="experience"
                    value={doctorData.experience}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Specialized In</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your specialization"
                    name="specializedIn"
                    value={doctorData.specializedIn}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your address"
                    name="address"
                    value={doctorData.address}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    name="gender"
                    value={doctorData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-20">
                  <Button className="btn btn-primary" type="submit">
                    <i className="fa fa-paper-plane"></i> Submit Profile
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

