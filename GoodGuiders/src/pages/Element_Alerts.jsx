import React from 'react'
import {Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";


import PageBreadcrumb from '../componets/PageBreadcrumb';

export default function Element_Alerts() {
  return (
    <>
            <div className="themebody-wrap">
                {/* breadcrumb start */}
                <PageBreadcrumb pagename="Alert" />
                {/* breadcrumb end */}
                {/* theme body start */}
                <div className="theme-body">
                    <Container fluid>
                        <Row>
                            <Col xl={6}>
                                <Card className="card alerts">
                                    <Card.Header>
                                        <h4>Default Alerts</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body pt-20">
                                        <p className="card-title-desc">Alerts are available for any length of text, as well as an optional dismiss button. For proper styling, use one of the four required contextual classes (e.g., .alert-success). For inline dismissal, use the alerts jQuery plugin.</p>
                                        <Alert variant="primary" >A simple primary alert—check it out!</Alert>
                                        <Alert variant="secondary" >A simple secondary alert—check it out!</Alert>
                                        <Alert variant="success" >A simple success alert—check it out!</Alert>
                                        <Alert variant="danger" >A simple danger alert—check it out!</Alert>
                                        <Alert variant="warning" >A simple warning alert—check it out!</Alert>
                                        <Alert variant="info" >A simple info alert—check it out!</Alert>
                                        <Alert variant="light" >A simple light alert—check it out!</Alert>
                                        <Alert variant="dark" >A simple dark alert—check it out!</Alert>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={6}>
                                <Card className="card alerts">
                                    <Card.Header>
                                        <h4>Link color</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body pt-20">
                                        <p className="card-title-desc">Use the .alert-link utility class to quickly provide matching colored links within any alert.
                                        </p>
                                        <Alert variant="primary" >A simple primary alert with
                                            <Link className="alert-link" href="#">an example link</Link>
                                            . Give it a click if you like.
                                        </Alert>
                                        <Alert variant="secondary" >A simple secondary alert with
                                            <Link className="alert-link" href="#">an example link</Link>
                                            . Give it a click if you like.
                                        </Alert>
                                        <Alert variant="success" >A simple success alert with
                                            <Link className="alert-link" href="#">an example link</Link>
                                            . Give it a click if you like.
                                        </Alert>
                                        <Alert variant="danger" >A simple danger alert with
                                            <Link className="alert-link" href="#">an example link</Link>
                                            . Give it a click if you like.
                                        </Alert>
                                        <Alert variant="warning" >A simple warning alert with
                                            <Link className="alert-link" href="#">an example link</Link>
                                            . Give it a click if you like.
                                        </Alert>
                                        <Alert variant="info" >A simple info alert with
                                            <Link className="alert-link" href="#">an example link</Link>
                                            . Give it a click if you like.
                                        </Alert>
                                        <Alert variant="light" >A simple light alert with
                                            <Link className="alert-link" href="#">an example link</Link>
                                            . Give it a click if you like.
                                        </Alert>
                                        <Alert variant="dark" >A simple dark alert with
                                            <Link className="alert-link" href="#">an example link</Link>
                                            . Give it a click if you like.
                                        </Alert>
                                        
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={6}>
                                <Card className="card alerts">
                                    <Card.Header>
                                        <h4>Dismissing</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body pt-20">
                                        <p className="card-title-desc">Add a dismiss button and the .alert-dismissible class, which adds extra padding to the right of the alert and positions the .btn-close button.</p>
                                        <Alert variant="primary" dismissible>dismissing primary alert—check it out!</Alert>
                                        <Alert variant="secondary" dismissible>dismissing secondary alert—check it out!</Alert>
                                        <Alert variant="success" dismissible>dismissing success alert—check it out!</Alert>
                                        <Alert variant="danger" dismissible>dismissing danger alert—check it out!</Alert>
                                        <Alert variant="warning" dismissible>dismissing warning alert—check it out!</Alert>
                                        <Alert variant="info" dismissible>dismissing info alert—check it out!</Alert>
                                        <Alert variant="light" dismissible>dismissing light alert—check it out!</Alert>
                                        <Alert variant="dark" dismissible>dismissing dark alert—check it out!</Alert>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={6}>
                                <Card className="card alerts">
                                    <Card.Header>
                                        <h4>With Icon</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body pt-20">
                                        <p className="card-title-desc">Depending on your icons and content, you may want to add more utilities or custom styles.alert and positions the .btn-close button. </p>
                                        <Alert variant="primary">
                                            <i className="fa fa-search me-1"></i>A simple primary alert with icon check it out!
                                            </Alert>
                                        <Alert variant="secondary">
                                        <i className="fa fa-search me-1"></i>A simple secondary alert with icon check it out!
                                        </Alert>
                                        <Alert variant="success">
                                        <i className="fa fa-search me-1"></i>A simple success alert with icon check it out!
                                        </Alert>
                                        <Alert variant="danger">
                                        <i className="fa fa-search me-1"></i>A simple danger alert with icon check it out!
                                        </Alert>
                                        <Alert variant="warning">
                                        <i className="fa fa-search me-1"></i>A simple warning alert with icon check it out!
                                        </Alert>
                                        <Alert variant="info">
                                        <i className="fa fa-search me-1"></i>A simple info alert with icon check it out!
                                        </Alert>
                                        <Alert variant="light">
                                        <i className="fa fa-search me-1"></i>A simple light alert with icon check it out!
                                        </Alert>
                                        <Alert variant="dark">
                                        <i className="fa fa-search me-1"></i>A simple dark alert with icon check it out!
                                        </Alert>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={6}>
                                <Card className="card alerts">
                                    <Card.Header>
                                        <h4>outline Alerts</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body pt-20">
                                        <Alert variant="primary-outline">outline primary alert—check it out!</Alert>
                                        <Alert variant="secondary-outline">outline secondary alert—check it out!</Alert>
                                        <Alert variant="success-outline">outline success alert—check it out!</Alert>
                                        <Alert variant="danger-outline">outline danger alert—check it out!</Alert>
                                        <Alert variant="warning-outline">outline warning alert—check it out!</Alert>
                                        <Alert variant="info-outline">outline info alert—check it out!</Alert>
                                        <Alert variant="light-outline">outline light alert—check it out!</Alert>
                                        <Alert variant="dark-outline">outline dark alert—check it out!</Alert>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={6}>
                                <Card className="card alerts">
                                    <Card.Header>
                                        <h4>outline with Dismissing Alerts</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body pt-20">
                                    <Alert variant="primary-outline" dismissible>outline primary alert—check it out!</Alert>
                                        <Alert variant="secondary-outline" dismissible>outline secondary alert—check it out!</Alert>
                                        <Alert variant="success-outline" dismissible>outline success alert—check it out!</Alert>
                                        <Alert variant="danger-outline" dismissible>outline danger alert—check it out!</Alert>
                                        <Alert variant="warning-outline" dismissible>outline warning alert—check it out!</Alert>
                                        <Alert variant="info-outline" dismissible>outline info alert—check it out!</Alert>
                                        <Alert variant="light-outline" dismissible>outline light alert—check it out!</Alert>
                                        <Alert variant="dark-outline" dismissible>outline dark alert—check it out!</Alert>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={6}>
                                <Card className="card alerts">
                                    <Card.Header>
                                        <h4>outline With Icon</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body pt-20">
                                        <p className="card-title-desc">Depending on your icons and content, you may want to add more utilities or custom styles.alert and positions the .btn-close button. </p>
                                        <Alert variant="primary-outline">
                                        <i className="fa fa-search mr-10"></i>outline with icon primary alert with icon check it out!
                                        </Alert>
                                        <Alert variant="secondary-outline">
                                        <i className="fa fa-search mr-10"></i>outline with icon secondary alert with icon check it out!
                                        </Alert>
                                        <Alert variant="success-outline">
                                        <i className="fa fa-search mr-10"></i>outline with icon success alert with icon check it out!
                                        </Alert>
                                        <Alert variant="danger-outline">
                                        <i className="fa fa-search mr-10"></i>outline with icon danger alert with icon check it out!
                                        </Alert>
                                        <Alert variant="warning-outline">
                                        <i className="fa fa-search mr-10"></i>outline with icon warning alert with icon check it out!
                                        </Alert>
                                        <Alert variant="info-outline">
                                        <i className="fa fa-search mr-10"></i>outline with icon info alert with icon check it out!
                                        </Alert>
                                        <Alert variant="light-outline">
                                        <i className="fa fa-search mr-10"></i>outline with icon light alert with icon check it out!
                                        </Alert>
                                        <Alert variant="dark-outline">
                                        <i className="fa fa-search mr-10"></i>outline with icon dark alert with icon check it out!
                                        </Alert>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={6}>
                                <Card className="card alerts">
                                    <Card.Header>
                                        <h4>Additional content</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body pt-20">
                                        <p className="card-title-desc">Alerts can also contain additional HTML elements like headings, paragraphs and dividers.</p>
                                        <Alert className="alert alert-success" role="alert">
                                            <h4 className="alert-heading mb-10">Well done!</h4>
                                            <p className="card-title-desc m-0">
                                                Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
                                            <p className="card-title-desc mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
                                        </Alert>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
                {/* theme body end */}
            </div>

        </>
  )
}
