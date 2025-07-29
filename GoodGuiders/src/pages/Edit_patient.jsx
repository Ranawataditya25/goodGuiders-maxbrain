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
    address: "",
    profileImage: null,
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
        profileImage: typeof savedUser.profileImage === "string" ? savedUser.profileImage : null,
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
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          data.append(key, value);
        }
      });
      data.append("email", savedUser.email);
  
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        body: data, // FormData doesn't need content-type header
      });
  
      const result = await res.json();
      if (res.ok) {
        alert("Profile updated successfully!");
        localStorage.setItem("loggedInUser", JSON.stringify(result.user));
      } else {
        alert("Error: " + result.msg);
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, type, files, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
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
      profileImage: typeof savedUser.profileImage === "string" ? savedUser.profileImage : null,
    });
    setIsSubmitting(false);
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
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Upload Profile Image</Form.Label>
                          <Form.Control
                            type="file"
                            name="profileImage"
                            accept="image/*"
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      {formData.profileImage && (
                        <div className="editprofile-pic">
                          <img
                            src={
                              typeof formData.profileImage === "string" && formData.profileImage.startsWith("/profilePhotoUploads")
                                ? `http://localhost:5000${formData.profileImage}`
                                : formData.profileImage instanceof File
                                  ? URL.createObjectURL(formData.profileImage)
                                  : `${import.meta.env.BASE_URL}default-avatar.png`
                            }
                            alt="Profile"
                            className="profile-picedit"
                          />
                        </div>
                      )}


                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder="Enter your name"
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
                            placeholder="Enter address"
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

