import { useState, useEffect } from "react";
import { Row, Col, Card, Form, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";   // ✅ import navigate hook
import "./css/ProfilePage.css";

export default function MentorRegistrationProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "mentor",
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
    latestDegree: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();   // ✅ init navigate

  // ✅ Load mentor data from localStorage (step after Register)
  useEffect(() => {
    const mentorData = JSON.parse(localStorage.getItem("mentorPendingData"));
    if (mentorData) {
      setFormData((prev) => ({
        ...prev,
        name: mentorData.name || "",
        email: mentorData.email || "",
        mobileNo: mentorData.mobileNo || "",
        password: mentorData.password || "",
        role: "mentor",
      }));
    } else {
      alert("No mentor data found. Please register first.");
      navigate("/register");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/mentor/profile-setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          mentorStatus: "pending", // ✅ backend will use this
        }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Profile submitted! Your request is pending admin approval.");

        // clear mentor temp storage
        localStorage.removeItem("mentorPendingData");

        // ✅ redirect with state data
        navigate("/status", {
          state: {
            role: "mentor",
            name: formData.name,
            status: "pending",
          },
        });
      } else {
        alert("❌ Error: " + result.error || result.msg);
      }
    } catch (err) {
      console.error("Submit failed:", err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="p-60 py-100">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card>
                <Card.Header>
                  <h4>Mentor Information</h4>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      {/* Name */}
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            disabled   // ✅ cannot edit
                          />
                        </Form.Group>
                      </Col>

                      {/* Email (read-only) */}
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            disabled
                          />
                        </Form.Group>
                      </Col>

                      {/* Phone (read-only) */}
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="text"
                            name="mobileNo"
                            value={formData.mobileNo}
                            disabled
                          />
                        </Form.Group>
                      </Col>

                      {/* DOB */}
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Date of Birth</Form.Label>
                          <Form.Control
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      {/* Gender */}
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Gender</Form.Label>
                          <Form.Select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Others</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      {/* Specialization */}
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Latest Degree</Form.Label>
                          <Form.Control
                            type="text"
                            name="latestDegree"
                            value={formData.latestDegree}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      {/* Specialization */}
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Specialized In</Form.Label>
                          <Form.Control
                            type="text"
                            name="specializedIn"
                            value={formData.specializedIn}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      {/* Abilities */}
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Mentor Abilities</Form.Label>
                          <Form.Control
                            type="text"
                            name="mentorAbilities"
                            value={formData.mentorAbilities.join(", ")}
                            placeholder="Enter abilities (comma separated)"
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

                      {/* Experience */}
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Experience (in years)</Form.Label>
                          <Form.Control
                            type="number"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      {/* City */}
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      {/* State */}
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>State</Form.Label>
                          <Form.Control
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      {/* Country */}
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Country</Form.Label>
                          <Form.Control
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      {/* Postal */}
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Postal/Zip Code</Form.Label>
                          <Form.Control
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      {/* Address */}
                      <Col md={6}>
                        <Form.Group className="mb-20">
                          <Form.Label>Address</Form.Label>
                          <Form.Control
                            as="textarea"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      {/* Bio */}
                      <Col md={6}>
                        <Form.Group className="mb-20">
                          <Form.Label>Bio</Form.Label>
                          <Form.Control
                            as="textarea"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      {/* Submit */}
                      <Form.Group className="text-center mb-0">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-sm btn-primary"
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                      </Form.Group>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
  );
}
