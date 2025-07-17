import * as React from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import PageBreadcrumb from '../componets/PageBreadcrumb';
import IMAGE_URLS from "/src/pages/api/Imgconfig.js";

export default function Element_Support() {
    return (
        <>
            <div className="themebody-wrap">
                {/* Breadcrumb Start */}
                <PageBreadcrumb pagename="Help Center" />
                {/* Breadcrumb End */}
                {/* theme body start */}
                <div className="theme-body">
                    <Container fluid className="container-fluid codex-faq">
                        <Row>
                            <Col lg={4} md={6}>
                                <div className="card support-box">
                                    <div className="card-body">
                                        <div className="icon-wrap">
                                            <img className="img-fluid" src={IMAGE_URLS['support/1.png']} alt="" />
                                        </div>
                                        <h5>Laboratory</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={6}>
                                <div className="card support-box">
                                    <div className="card-body">
                                        <div className="icon-wrap">
                                            <img className="img-fluid" src={IMAGE_URLS['support/2.png']} alt="" />
                                        </div>
                                        <h5>Heart Surgery</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={6}>
                                <div className="card support-box">
                                    <div className="card-body">
                                        <div className="icon-wrap">
                                            <img className="img-fluid" src={IMAGE_URLS['support/3.png']} alt="" />
                                        </div>
                                        <h5>Dentist issues</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={6}>
                                <div className="card support-box">
                                    <div className="card-body">
                                        <div className="icon-wrap">
                                            <img className="img-fluid" src={IMAGE_URLS['support/4.png']} alt="" />
                                        </div>
                                        <h5>Blood donation</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={6}>
                                <div className="card support-box">
                                    <div className="card-body">
                                        <div className="icon-wrap">
                                            <img className="img-fluid" src={IMAGE_URLS['support/5.png']} alt="" />
                                        </div>
                                        <h5>scientific researches</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={6}>
                                <div className="card support-box">
                                    <div className="card-body">
                                        <div className="icon-wrap">
                                            <img className="img-fluid" src={IMAGE_URLS['support/6.png']} alt="" />
                                        </div>
                                        <h5>Healtcare Query</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col md={12}>
                                <Card>
                                    <Card.Header>
                                        <h4>Frequently asked questions</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <Row className="cdx-row">
                                            <Col md={6}>
                                                <Accordion defaultActiveKey="0" className="codex-accordion">
                                                    <Accordion.Item className="accordion-item" eventKey="0" >
                                                        <Accordion.Header >
                                                            What does LOREM mean?
                                                        </Accordion.Header>
                                                        <Accordion.Body className="accordion-body">
                                                            <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item className="accordion-item" eventKey="1">
                                                        <Accordion.Header >
                                                            Where can I subscribe to your newsletter?
                                                        </Accordion.Header>
                                                        <Accordion.Body className="accordion-body">
                                                            <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item className="accordion-item" eventKey="2">
                                                        <Accordion.Header >
                                                            Where can in edit my address?
                                                        </Accordion.Header>
                                                        <Accordion.Body className="accordion-body">
                                                            <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item className="accordion-item" eventKey="3">
                                                        <Accordion.Header >
                                                            Can I order a free copy of a magazine to sample?
                                                        </Accordion.Header>
                                                        <Accordion.Body className="accordion-body">
                                                            <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item className="accordion-item" eventKey="4">
                                                        <Accordion.Header >
                                                            Do you accept orders via Phone or E-mail?
                                                        </Accordion.Header>
                                                        <Accordion.Body className="accordion-body">
                                                            <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </Col>
                                            <Col md={6}>
                                                <Accordion defaultActiveKey="0" className="codex-accordion">
                                                    <Accordion.Item className="accordion-item" eventKey="0" >
                                                        <Accordion.Header >

                                                            <i className="fa fa-question-circle me-1"></i>What does LOREM mean?

                                                        </Accordion.Header>
                                                        <Accordion.Body className="accordion-body">
                                                            <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item className="accordion-item" eventKey="1">
                                                        <Accordion.Header >

                                                            <i className="fa fa-question-circle me-1"></i>Where can I subscribe to your newsletter?

                                                        </Accordion.Header>
                                                        <Accordion.Body className="accordion-body">
                                                            <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item className="accordion-item" eventKey="2">
                                                        <Accordion.Header >

                                                            <i className="fa fa-question-circle me-1"></i>Where can in edit my address?

                                                        </Accordion.Header>
                                                        <Accordion.Body className="accordion-body">
                                                            <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item className="accordion-item" eventKey="3">
                                                        <Accordion.Header >

                                                            <i className="fa fa-question-circle me-1"></i>Can I order a free copy of a magazine to sample?

                                                        </Accordion.Header>
                                                        <Accordion.Body className="accordion-body">
                                                            <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item className="accordion-item" eventKey="4">
                                                        <Accordion.Header >

                                                            <i className="fa fa-question-circle me-1"></i>Do you accept orders via Phone or E-mail?

                                                        </Accordion.Header>
                                                        <Accordion.Body className="accordion-body">
                                                            <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}
