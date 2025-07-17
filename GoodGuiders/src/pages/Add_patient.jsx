import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Card, Form, Container, Button } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import PageBreadcrumb from '../componets/PageBreadcrumb';

export default function Add_patient() {
    const [formData, setFormData] = useState({
        profileImage: null,
        firstName: '',
        lastName: '',
        dob: '',
        age: '',
        gender: '',
        bloodGroup: '',
        maritalStatus: '',
        weight: '68 kg', // default values
        height: '5.2',
        email: '',
        phone: '',
        city: 'Barcelona', // default selected
        state: '',
        country: '',
        postalCode: '',
        status: '',
        address: '',
        patientHistory: ''
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };


    return (
        <div className="themebody-wrap">
            {/* Breadcrumb Start */}
            <PageBreadcrumb pagename="Add Student" />
            {/* Breadcrumb End */}
            {/* theme body start */}
            <SimpleBar className="theme-body common-dash">
                <Container fluid>
                    <Row>
                        <Col md={12}>
                            <Card>
                                <Card.Header>
                                    <h4>Student Information</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Row>
                                            <Col md={4}>
                                                <Form.Group className="mb-20">
                                                    <Form.Label>Profile Image</Form.Label>
                                                    <Form.Control
                                                        type="file"
                                                        name="profileImage"
                                                        onChange={handleInputChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className="mb-20">
                                                    <Form.Label>First Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        placeholder="First Name"
                                                        onChange={handleInputChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
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
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className="mb-20">
                                                    <Form.Label>Date of Birth</Form.Label>
                                                    <input
                                                        className="datepicker-here form-control"
                                                        type="text"
                                                        name="dob"
                                                        value={formData.dob}
                                                        data-date-format="dd/mm/yyyy"
                                                        onChange={handleInputChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className="mb-20">
                                                    <Form.Label>Age</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="age"
                                                        value={formData.age}
                                                        placeholder="Enter StudentAge"
                                                        onChange={handleInputChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className="mb-20">
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
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className="mb-20">
                                                    <Form.Label>Blood Group</Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        name="bloodGroup"
                                                        value={formData.bloodGroup}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Select Blood Group</option>
                                                        <option value="A+">A+</option>
                                                        <option value="A-">A-</option>
                                                        <option value="B+">B+</option>
                                                        <option value="B-">B-</option>
                                                        <option value="O+">O+</option>
                                                        <option value="O-">O-</option>
                                                        <option value="AB+">AB+</option>
                                                        <option value="AB-">AB-</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className="mb-20">
                                                    <Form.Label>Marital Status</Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        name="maritalStatus"
                                                        value={formData.maritalStatus}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Select Marital Status</option>
                                                        <option value="Married">Married</option>
                                                        <option value="Unmarried">Unmarried</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className="mb-20">
                                                    <Form.Label>StudentWeight</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="weight"
                                                        value={formData.weight}
                                                        onChange={handleInputChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className="mb-20">
                                                    <Form.Label>StudentHeight</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="height"
                                                        value={formData.height}
                                                        onChange={handleInputChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className="mb-20">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="email"
                                                        value={formData.email}
                                                        placeholder=""
                                                        onChange={handleInputChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className="mb-20">
                                                    <Form.Label>Phone</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="phone"
                                                        value={formData.phone}
                                                        placeholder=""
                                                        onChange={handleInputChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className="mb-20">
                                                    <Form.Label>City</Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Select City</option>
                                                        <option value="Tokyo">Tokyo</option>
                                                        <option value="Dubai">Dubai</option>
                                                        <option value="Barcelona">Barcelona</option>
                                                        <option value="Rome">Rome</option>
                                                        <option value="Singapore">Singapore</option>
                                                        <option value="Amsterdam">Amsterdam</option>
                                                        <option value="NewYork">New York</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                            <Form.Group className="mb-20">
                                                <Form.Label>State</Form.Label>
                                                <Form.Control
                                                        as="select"
                                                        name="state"
                                                        value={formData.state}
                                                        onChange={handleInputChange}>
                                                    <option value="">Select State</option>
                                                    <option value="Washington">Washington</option>
                                                    <option value="Minnesota">Minnesota</option>
                                                    <option value="Utah">Utah</option>
                                                    <option value="Idaho">Idaho</option>
                                                </Form.Control>
                                            </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                            <Form.Group className="mb-20">
                                                <Form.Label>Country</Form.Label>
                                                <Form.Control
                                                        as="select"
                                                        name="country"
                                                        value={formData.country}
                                                        onChange={handleInputChange}>
                                                    <option value="">Select Country</option>
                                                    <option value="japan">japan</option>
                                                    <option value="india">india</option>
                                                    <option value="uk">uk</option>
                                                    <option value="itly">itly</option>
                                                    <option value="usa">usa</option>
                                                </Form.Control>
                                            </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                            <Form.Group className="mb-20">
                                                <Form.Label>Postal/zip Code</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Postal/zip Code" name="postalCode"
                                                        value={formData.postalCode}
                                                        onChange={handleInputChange}/>
                                            </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                            <Form.Group className="mb-20">
                                                <Form.Label>Status</Form.Label>
                                                <Form.Control as="select" name="status"  value={formData.status}  onChange={handleInputChange}>
                                                    <option value="">Select Status</option>
                                                    <option value="active">Active</option>
                                                    <option value="Inctive">Inctive</option>
                                                </Form.Control>
                                            </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                            <Form.Group className="mb-20">
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control as="textarea" placeholder="Enter Student Address" name="address"
                                                        value={formData.address}
                                                        onChange={handleInputChange}></Form.Control>
                                            </Form.Group>
                                            </Col>
                                             <Col md={6} className="mb-20">
                                            <Form.Group>
                                                <Form.Label>Student History</Form.Label>
                                                <Form.Control as="textarea" placeholder="Student History" name="patientHistory"
                                                        value={formData.patientHistory}
                                                        onChange={handleInputChange}></Form.Control>
                                            </Form.Group>
                                            </Col> 
                                            {/* Repeat for other fields */}
                                            
                                            <Form.Group className="text-end mb-0">
                                                <Button type="submit" className="btn btn-sm btn-primary">Submit</Button>
                                                <Link className="btn btn-sm btn-danger ml-8">Cancel</Link>
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
    )
}
