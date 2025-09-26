import { useEffect, useState } from "react";
import { Row, Col, Card, Form, Container, Button } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import PageBreadcrumb from "../componets/PageBreadcrumb";
import "./css/ProfilePage.css";
// import '../pages/css/ProfilePage.css';

const DEFAULT_EDUCATION = [
  { className: "10th", passout: "", board: "", subject: "", grade: "" },
  { className: "12th", passout: "", board: "", subject: "", grade: "" },
  {
    className: "Graduation",
    degree: "",
    passout: "",
    board: "",
    subject: "",
    grade: "",
  },
  {
    className: "Post Graduation",
    degree: "",
    passout: "",
    board: "",
    subject: "",
    grade: "",
  },
  {
    className: "PhD",
    degree: "",
    passout: "",
    board: "",
    subject: "",
    grade: "",
  },
];

export default function Edit_doctor() {
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
    profileImage: null,
    education: [
      { className: "10th", passout: "", board: "", subject: "", grade: "" },
      { className: "12th", passout: "", board: "", subject: "", grade: "" },
      {
        className: "Graduation",
        degree: "",
        passout: "",
        board: "",
        subject: "",
        grade: "",
      },
      {
        className: "Post Graduation",
        degree: "",
        passout: "",
        board: "",
        subject: "",
        grade: "",
      },
      {
        className: "PhD",
        degree: "",
        passout: "",
        board: "",
        subject: "",
        grade: "",
      },
    ],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedUser, setSavedUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (savedUser) {
      setSavedUser(savedUser);
      console.log(savedUser.education);
      // Merge saved education with default structure
      const education = DEFAULT_EDUCATION.map((edu) => {
        if (!Array.isArray(savedUser.education)) return edu;
        const savedEdu = savedUser.education.find(
          (e) => e.className === edu.className
        );
        return savedEdu ? { ...edu, ...savedEdu } : edu;
      });

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
        mentorAbilities: Array.isArray(savedUser.mentorAbilities)
          ? savedUser.mentorAbilities
          : [],
        specializedIn: savedUser.specializedIn || "",
        profileImage:
          typeof savedUser.profileImage === "string"
            ? savedUser.profileImage
            : null,
        education,
      });
    }
  }, []);

  const handleEducationChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.education];
      updated[index][field] = value;
      return { ...prev, education: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!savedUser) {
      alert("No user data found.");
      setIsSubmitting(false);
      return;
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value === null || value === undefined) return;
        if (value instanceof File) data.append(key, value);
        else if (Array.isArray(value) || typeof value === "object")
          data.append(key, JSON.stringify(value));
        else data.append(key, value.toString());
      });
      data.append("email", savedUser.email);

      const res = await fetch("http://127.0.0.1:5000/api/profile", {
        method: "PUT",
        body: data,
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
    const { name, type, value, files } = e.target;
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
      bio: savedUser.bio || "",
      experience: savedUser.experience || "",
      mentorAbilities: Array.isArray(savedUser.mentorAbilities)
        ? savedUser.mentorAbilities
        : [],
      specializedIn: savedUser.specializedIn || "",
      profileImage:
        typeof savedUser.profileImage === "string"
          ? savedUser.profileImage
          : null,
      education: DEFAULT_EDUCATION.map((edu) => {
        if (!Array.isArray(savedUser.education)) return edu;
        const savedEdu = savedUser.education.find(
          (e) => e.className === edu.className
        );
        return savedEdu ? { ...edu, ...savedEdu } : edu;
      }),
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

                      {formData.profileImage &&
                        (typeof formData.profileImage === "string" ||
                          formData.profileImage instanceof File) && (
                          <div className="editprofile-pic">
                            <img
                              src={
                                formData.profileImage
                                  ? typeof formData.profileImage === "string" &&
                                    formData.profileImage.startsWith(
                                      "/profilePhotoUploads"
                                    )
                                    ? `http://localhost:5000${formData.profileImage}`
                                    : formData.profileImage instanceof File
                                      ? URL.createObjectURL(formData.profileImage)
                                      : `${import.meta.env.BASE_URL
                                      }default-avatar.png`
                                  : `${import.meta.env.BASE_URL
                                  }default-avatar.png`
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
                            value={formData.mentorAbilities.join(", ")}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                mentorAbilities: e.target.value
                                  .split(",")
                                  .map((s) => s.trim()),
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
                                      {formData.education?.map((edu, index) => (
                                        <tr key={index}>
                                          <td>
                                            {["10th", "12th"].includes(
                                              edu.className
                                            ) ? (
                                              edu.className
                                            ) : (
                                              <Form.Control
                                                as="select"
                                                value={edu.degree || ""}
                                                onChange={(e) =>
                                                  handleEducationChange(
                                                    index,
                                                    "degree",
                                                    e.target.value
                                                  )
                                                }
                                              >
                                                <option value="" disabled>
                                                  {edu.className}
                                                </option>
                                                {edu.className ===
                                                  "Graduation" &&
                                                  [
                                                    "B.Com",
                                                    "BBA",
                                                    "BCA",
                                                    "BA",
                                                    "B.Sc",
                                                    "Engineering",
                                                  ].map((d) => (
                                                    <option key={d} value={d}>
                                                      {d}
                                                    </option>
                                                  ))}
                                                {edu.className ===
                                                  "Post Graduation" &&
                                                  [
                                                    "M.Com",
                                                    "MBA",
                                                    "MCA",
                                                    "M.Sc",
                                                    "M.A",
                                                    "M.Tech",
                                                  ].map((d) => (
                                                    <option key={d} value={d}>
                                                      {d}
                                                    </option>
                                                  ))}
                                                {edu.className === "PhD" &&
                                                  ["PHD"].map((d) => (
                                                    <option key={d} value={d}>
                                                      {d}
                                                    </option>
                                                  ))}
                                              </Form.Control>
                                            )}
                                          </td>
                                          <td>
                                            <Form.Control
                                              type="text"
                                              value={edu.passout || ""}
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
                                              value={edu.board || ""}
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
                                              value={edu.subject || ""}
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
                                              value={edu.grade || ""}
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
