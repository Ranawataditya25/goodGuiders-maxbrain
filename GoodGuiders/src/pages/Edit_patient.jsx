// src/pages/Edit_patient.jsx
import { useEffect, useState } from "react";
import { Row, Col, Card, Form, Container, Button } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import PageBreadcrumb from "../componets/PageBreadcrumb";
import "./css/ProfilePage.css";

// ✅ Allowed classes (excluding 10 & 12)
const SELECTABLE_CLASSES = ["6th", "7th", "8th", "9th", "11th"];

// ✅ Default structure: 10th and 12th only
const DEFAULT_EDUCATION = [
  { className: "10th", passout: "", board: "", subject: "", grade: "" },
  { className: "12th", passout: "", board: "", subject: "", grade: "" },
];

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
    education: DEFAULT_EDUCATION,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedUser, setSavedUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("loggedInUser");
    if (saved) {
      try {
        const u = JSON.parse(saved);
        setSavedUser(u);

        setFormData((prev) => ({
          ...prev,
          name: u.name || "",
          dob: u.dob || "",
          gender: u.gender || "",
          mobileNo: u.mobileNo || "",
          city: u.city || "",
          state: u.state || "",
          country: u.country || "",
          postalCode: u.postalCode || "",
          address: u.address || "",
          profileImage:
            typeof u.profileImage === "string" ? u.profileImage : null,
          education:
            Array.isArray(u.education) && u.education.length
              ? u.education
              : DEFAULT_EDUCATION,
        }));
      } catch (err) {
        console.error("Failed to parse loggedInUser:", err);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!savedUser) {
      setIsSubmitting(false);
      alert("No user data found.");
      return;
    }

    try {
      const data = new FormData();

      // Append fields correctly. Files as files, arrays/objects as JSON strings.
      Object.entries(formData).forEach(([key, value]) => {
        if (value === null || value === undefined) return;
        if (value instanceof File) {
          data.append(key, value);
        } else if (Array.isArray(value) || typeof value === "object") {
          data.append(key, JSON.stringify(value));
        } else {
          data.append(key, value.toString());
        }
      });

      data.append("email", savedUser.email);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"}/profile`,
        {
          method: "PUT",
          body: data,
        }
      );

      const result = await res.json();
      if (res.ok) {
        alert("Profile updated successfully!");
        // update localStorage with server response user object (without password)
        if (result.user) {
          localStorage.setItem("loggedInUser", JSON.stringify(result.user));
          setSavedUser(result.user);
          // reflect updated user in form (keep file object as null)
          setFormData((prev) => ({
            ...prev,
            profileImage: result.user.profileImage || prev.profileImage,
          }));
        }
      } else {
        alert("Error: " + (result.msg || result.error || "Update failed"));
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEducationChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = prev.education.map((r, i) =>
        i === index ? { ...r, [field]: value } : r
      );
      return { ...prev, education: updated };
    });
  };

  const handleInputChange = (e) => {
    const { name, type, files, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleCancel = () => {
    if (!savedUser) return;
    setFormData((prev) => ({
      ...prev,
      name: savedUser.name || "",
      dob: savedUser.dob || "",
      gender: savedUser.gender || "",
      mobileNo: savedUser.mobileNo || "",
      city: savedUser.city || "",
      state: savedUser.state || "",
      country: savedUser.country || "",
      postalCode: savedUser.postalCode || "",
      address: savedUser.address || "",
      profileImage:
        typeof savedUser.profileImage === "string"
          ? savedUser.profileImage
          : null,
      education:
        Array.isArray(savedUser.education) && savedUser.education.length
          ? savedUser.education
          : DEFAULT_EDUCATION,
    }));
    setIsSubmitting(false);
  };

  // const profileImageSrc = (() => {
  //   const pi = formData.profileImage;
  //   if (!pi) return `${import.meta.env.BASE_URL || "/"}default-avatar.png`;
  //   if (typeof pi === "string" && pi.startsWith("/profilePhotoUploads")) {
  //     return `${
  //       import.meta.env.VITE_API_URL?.replace("/api", "") ||
  //       "http://127.0.0.1:5000"
  //     }${pi}`;
  //   }
  //   if (pi instanceof File) {
  //     return URL.createObjectURL(pi);
  //   }
  //   if (typeof pi === "string") return pi;
  //   return `${import.meta.env.BASE_URL || "/"}default-avatar.png`;
  // })();

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
                    <Row className="mb-24">
                      <Col md={12} className="text-center">
                        <Form.Group className="mb-3">
                          <Form.Label>Upload Profile Image</Form.Label>
                          <Form.Control
                            type="file"
                            name="profileImage"
                            accept="image/*"
                            onChange={handleInputChange}
                          />
                        </Form.Group>

                        {/* ✅ Profile Image Preview */}
                        {formData.profileImage && (
                          <div className="editprofile-pic">
                            <img
                              src={
                                typeof formData.profileImage === "string" &&
                                formData.profileImage.startsWith(
                                  "/profilePhotoUploads"
                                )
                                  ? `http://localhost:5000${formData.profileImage}`
                                  : formData.profileImage instanceof File
                                  ? URL.createObjectURL(formData.profileImage)
                                  : `${
                                      import.meta.env.BASE_URL
                                    }default-avatar.png`
                              }
                              alt="Profile"
                              className="profile-picedit"
                            />
                          </div>
                        )}
                      </Col>
                    </Row>
                    <Row>
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
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
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
                                        <th>Passout</th>
                                        <th>University/Board</th>
                                        <th>Subject</th>
                                        <th>Per/CGPA</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {formData.education.map((edu, index) => (
                                        <tr key={index}>
                                          <td>
                                            {edu.className === "10th" ||
                                            edu.className === "12th" ? (
                                              // Hardcoded 10th and 12th
                                              edu.className
                                            ) : (
                                              // Other selectable classes (6–9, 11th)
                                              <Form.Control
                                                as="select"
                                                value={edu.className}
                                                onChange={(e) =>
                                                  handleEducationChange(
                                                    index,
                                                    "className",
                                                    e.target.value
                                                  )
                                                }
                                              >
                                                <option value="">
                                                  Other Class
                                                </option>
                                                {SELECTABLE_CLASSES.map(
                                                  (cls) => (
                                                    <option
                                                      key={cls}
                                                      value={cls}
                                                    >
                                                      {cls}
                                                    </option>
                                                  )
                                                )}
                                              </Form.Control>
                                            )}
                                          </td>
                                          <td>
                                            <Form.Control
                                              type="text"
                                              value={edu.passout}
                                              onChange={(e) =>
                                                handleEducationChange(
                                                  index,
                                                  "passout",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </td>
                                          <td>
                                            <Form.Control
                                              type="text"
                                              value={edu.board}
                                              onChange={(e) =>
                                                handleEducationChange(
                                                  index,
                                                  "board",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </td>
                                          <td>
                                            <Form.Control
                                              type="text"
                                              value={edu.subject}
                                              onChange={(e) =>
                                                handleEducationChange(
                                                  index,
                                                  "subject",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </td>
                                          <td>
                                            <Form.Control
                                              type="text"
                                              value={edu.grade}
                                              onChange={(e) =>
                                                handleEducationChange(
                                                  index,
                                                  "grade",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>

                      <Form.Group className="text-end mb-0">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-sm btn-primary"
                        >
                          {isSubmitting ? "Updating..." : "Submit"}
                        </Button>
                        <Button
                          className="btn btn-sm btn-danger ms-2"
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
    </div>
  );
}
