import * as React from 'react';
import {Container,  Row, Col, Card, Accordion } from 'react-bootstrap';
import { Link } from "react-router-dom";


import PageBreadcrumb from '../componets/PageBreadcrumb';

export default function Element_Accordions() {
  return (
    <>
            <div className="themebody-wrap">
                {/* breadcrumb start */}
                <PageBreadcrumb pagename="Accordion" />
                {/* breadcrumb end */}
                {/* theme body start */}
                <div className="theme-body">
                    <Container fluid>
                        <Row>
                            <Col md={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>default accordion</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <Accordion defaultActiveKey="0" className="codex-accordion">
                                            <Accordion.Item className="accordion-item" eventKey="0" >
                                                <Accordion.Header >
                                                    <Link className="cdx-collapse">What does LOREM mean?</Link>
                                                </Accordion.Header>
                                                <Accordion.Body className="accordion-body">
                                                    <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item className="accordion-item" eventKey="1">
                                                <Accordion.Header >
                                                    <Link className="cdx-collapse">Where can I subscribe to your newsletter?</Link>
                                                </Accordion.Header>
                                                <Accordion.Body className="accordion-body">
                                                    <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item className="accordion-item" eventKey="2">
                                                <Accordion.Header >
                                                    <Link className="cdx-collapse">Where can in edit my address?</Link>
                                                </Accordion.Header>
                                                <Accordion.Body className="accordion-body">
                                                    <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item className="accordion-item" eventKey="3">
                                                <Accordion.Header >
                                                    <Link className="cdx-collapse">Can I order a free copy of a magazine to sample?</Link>
                                                </Accordion.Header>
                                                <Accordion.Body className="accordion-body">
                                                    <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item className="accordion-item" eventKey="4">
                                                <Accordion.Header >
                                                    <Link className="cdx-collapse">Do you accept orders via Phone or E-mail?</Link>
                                                </Accordion.Header>
                                                <Accordion.Body className="accordion-body">
                                                    <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>accordion with icon</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <Accordion defaultActiveKey="0" className="codex-accordion">
                                            <Accordion.Item className="accordion-item" eventKey="0" >
                                                <Accordion.Header >
                                                    <Link className="cdx-collapse">
                                                        <i className="fa fa-question-circle me-1"></i>What does LOREM mean?
                                                    </Link>
                                                </Accordion.Header>
                                                <Accordion.Body className="accordion-body">
                                                    <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item className="accordion-item" eventKey="1">
                                                <Accordion.Header >
                                                    <Link className="cdx-collapse">
                                                        <i className="fa fa-question-circle me-1"></i>Where can I subscribe to your newsletter?
                                                    </Link>
                                                </Accordion.Header>
                                                <Accordion.Body className="accordion-body">
                                                    <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item className="accordion-item" eventKey="2">
                                                <Accordion.Header >
                                                    <Link className="cdx-collapse">
                                                        <i className="fa fa-question-circle me-1"></i>Where can in edit my address?
                                                    </Link>
                                                </Accordion.Header>
                                                <Accordion.Body className="accordion-body">
                                                    <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item className="accordion-item" eventKey="3">
                                                <Accordion.Header >
                                                    <Link className="cdx-collapse">
                                                        <i className="fa fa-question-circle me-1"></i>Can I order a free copy of a magazine to sample?
                                                    </Link>
                                                </Accordion.Header>
                                                <Accordion.Body className="accordion-body">
                                                    <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item className="accordion-item" eventKey="4">
                                                <Accordion.Header >
                                                    <Link className="cdx-collapse">
                                                        <i className="fa fa-question-circle me-1"></i>Do you accept orders via Phone or E-mail?
                                                    </Link>
                                                </Accordion.Header>
                                                <Accordion.Body className="accordion-body">
                                                    <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>Bootstrap Default </h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <p className="card-title-desc">Click the accordions below to expand/collapse the accordion content. </p>

                                        <Accordion className="accordion" defaultActiveKey="0">
                                            <Accordion.Item className="accordion-item" eventKey="0">
                                                <Accordion.Header>
                                                    Accordion Item #1
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <strong>This is the third item&apos;s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It&apos;s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item className="accordion-item" eventKey="1">
                                                <Accordion.Header>
                                                    Accordion Item #2
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <strong>This is the third item&apos;s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It&apos;s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item className="accordion-item" eventKey="2">
                                                <Accordion.Header>
                                                    Accordion Item #3
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <strong>This is the third item&apos;s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It&apos;s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>Bootstrap Flush</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <p className="card-title-desc">
                                            Add <code>.accordion-flush </code>&nbsp;to remove the default <code>background-color</code>&nbsp;, some borders, and some rounded corners to render accordions edge-to-edge with their parent container. </p>
                                        <Accordion className="accordion accordion-flush" defaultActiveKey="0">
                                            <Accordion.Item className="accordion-item" eventKey="0">
                                                <Accordion.Header >
                                                    Accordion Item #1
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <strong>This is the first item&apos;s accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It&apos;s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item className="accordion-item" eventKey="1">
                                                <Accordion.Header >
                                                    Accordion Item #2
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <strong>This is the first item&apos;s accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It&apos;s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item className="accordion-item" eventKey="2">
                                                <Accordion.Header >
                                                    Accordion Item #3
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <strong>This is the first item&apos;s accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It&apos;s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
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
