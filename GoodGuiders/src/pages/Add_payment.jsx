import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Card, Form, Container } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import PageBreadcrumb from '../componets/PageBreadcrumb';


export default function Add_payment() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        billNo: '',
        billDate: '',
        doctorName: '',
        admitDate: '',
        dischargeDate: '',
        paymentMethod: '',
        paymentStatus: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    return (
        <>
            <div className="themebody-wrap">
                {/* Breadcrumb Start */}
                <PageBreadcrumb pagename="Add Payment" />
                {/* Breadcrumb End */}
                {/* theme body start */}
                <SimpleBar className="theme-body common-dash">
                    <Container fluid >
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Header>
                                        <h4>Student Information</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group className="mb-20">
                                                        <Form.Label>First name</Form.Label>
                                                        <Form.Control type="text" name="firstName" placeholder="First Name" value={formData.firstName}  onChange={handleInputChange} />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-20">
                                                        <Form.Label>Last name</Form.Label>
                                                        <Form.Control type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-20">
                                                        <Form.Label>Bill No</Form.Label>
                                                        <Form.Control type="text" name="billNo" placeholder="Enter Bill Number"  value={formData.billNo} onChange={handleInputChange} />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-20">
                                                        <Form.Label>Bill Date</Form.Label>
                                                        <Form.Control  type="text" name="billDate" placeholder="Bill Date" value={formData.billDate} onChange={handleInputChange} />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-20">
                                                        <Form.Label>Mentor Name</Form.Label>
                                                        <Form.Control type="text"  name="doctorName"  placeholder="Enter Mentor Name"
                                                            value={formData.doctorName} onChange={handleInputChange} />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-20">
                                                        <Form.Label>Admit Date</Form.Label>
                                                        <Form.Control  type="text" name="admitDate" placeholder="Enter Admit Date" value={formData.admitDate} onChange={handleInputChange} />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-20">
                                                        <Form.Label>Discharge Date</Form.Label>
                                                        <Form.Control  type="text"  name="dischargeDate" placeholder="Enter Discharge Date"  value={formData.dischargeDate}  onChange={handleInputChange} />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-20">
                                                        <Form.Label>Payment Method</Form.Label>
                                                        <Form.Select name="paymentMethod"  value={formData.paymentMethod}  onChange={handleInputChange} >
                                                            <option value="">Select Payment Method</option>
                                                            <option value="Cash">Cash</option>
                                                            <option value="Cheque">Cheque</option>
                                                            <option value="CreditCard">Credit Card</option>
                                                            <option value="DebitCard">Debit Card</option>
                                                            <option value="NetBancking">Net Banking</option>
                                                            <option value="Insurence">Insurance</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-20">
                                                        <Form.Label>Payment Status</Form.Label>
                                                        <Form.Select name="paymentStatus" value={formData.paymentStatus}  onChange={handleInputChange} >
                                                            <option value="">Select Payment Status</option>
                                                            <option value="Paid">Paid</option>
                                                            <option value="Unpaid">Unpaid</option>
                                                            <option value="Partial">Partial</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>

                                                <Form.Group className="text-end mb-0">
                                                    <Link to="#" className="btn btn-sm btn-primary">Add</Link>
                                                    <Link to="#" className="btn btn-sm btn-danger ml-8">Cancel</Link>
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
        </>
    )
}
