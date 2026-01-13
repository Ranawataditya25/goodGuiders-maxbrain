// import * as React from 'react';
// import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
// import PageBreadcrumb from '../componets/PageBreadcrumb';
// import IMAGE_URLS from "/src/pages/api/Imgconfig.js";

// export default function Element_Support() {
//     return (
//         <>
//             <div className="themebody-wrap">
//                 {/* Breadcrumb Start */}
//                 <PageBreadcrumb pagename="Help Center" />
//                 {/* Breadcrumb End */}
//                 {/* theme body start */}
//                 <div className="theme-body">
//                     <Container fluid className="container-fluid codex-faq">
//                         <Row>
//                             <Col lg={4} md={6}>
//                                 <div className="card support-box">
//                                     <div className="card-body">
//                                         <div className="icon-wrap">
//                                             <img className="img-fluid" src={IMAGE_URLS['support/1.png']} alt="" />
//                                         </div>
//                                         <h5>Laboratory</h5>
//                                         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
//                                     </div>
//                                 </div>
//                             </Col>
//                             <Col lg={4} md={6}>
//                                 <div className="card support-box">
//                                     <div className="card-body">
//                                         <div className="icon-wrap">
//                                             <img className="img-fluid" src={IMAGE_URLS['support/2.png']} alt="" />
//                                         </div>
//                                         <h5>Heart Surgery</h5>
//                                         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
//                                     </div>
//                                 </div>
//                             </Col>
//                             <Col lg={4} md={6}>
//                                 <div className="card support-box">
//                                     <div className="card-body">
//                                         <div className="icon-wrap">
//                                             <img className="img-fluid" src={IMAGE_URLS['support/3.png']} alt="" />
//                                         </div>
//                                         <h5>Dentist issues</h5>
//                                         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
//                                     </div>
//                                 </div>
//                             </Col>
//                             <Col lg={4} md={6}>
//                                 <div className="card support-box">
//                                     <div className="card-body">
//                                         <div className="icon-wrap">
//                                             <img className="img-fluid" src={IMAGE_URLS['support/4.png']} alt="" />
//                                         </div>
//                                         <h5>Blood donation</h5>
//                                         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
//                                     </div>
//                                 </div>
//                             </Col>
//                             <Col lg={4} md={6}>
//                                 <div className="card support-box">
//                                     <div className="card-body">
//                                         <div className="icon-wrap">
//                                             <img className="img-fluid" src={IMAGE_URLS['support/5.png']} alt="" />
//                                         </div>
//                                         <h5>scientific researches</h5>
//                                         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
//                                     </div>
//                                 </div>
//                             </Col>
//                             <Col lg={4} md={6}>
//                                 <div className="card support-box">
//                                     <div className="card-body">
//                                         <div className="icon-wrap">
//                                             <img className="img-fluid" src={IMAGE_URLS['support/6.png']} alt="" />
//                                         </div>
//                                         <h5>Healtcare Query</h5>
//                                         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
//                                     </div>
//                                 </div>
//                             </Col>
//                             <Col md={12}>
//                                 <Card>
//                                     <Card.Header>
//                                         <h4>Frequently asked questions</h4>
//                                     </Card.Header>
//                                     <Card.Body className="card-body">
//                                         <Row className="cdx-row">
//                                             <Col md={6}>
//                                                 <Accordion defaultActiveKey="0" className="codex-accordion">
//                                                     <Accordion.Item className="accordion-item" eventKey="0" >
//                                                         <Accordion.Header >
//                                                             What does LOREM mean?
//                                                         </Accordion.Header>
//                                                         <Accordion.Body className="accordion-body">
//                                                             <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
//                                                         </Accordion.Body>
//                                                     </Accordion.Item>
//                                                     <Accordion.Item className="accordion-item" eventKey="1">
//                                                         <Accordion.Header >
//                                                             Where can I subscribe to your newsletter?
//                                                         </Accordion.Header>
//                                                         <Accordion.Body className="accordion-body">
//                                                             <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
//                                                         </Accordion.Body>
//                                                     </Accordion.Item>
//                                                     <Accordion.Item className="accordion-item" eventKey="2">
//                                                         <Accordion.Header >
//                                                             Where can in edit my address?
//                                                         </Accordion.Header>
//                                                         <Accordion.Body className="accordion-body">
//                                                             <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
//                                                         </Accordion.Body>
//                                                     </Accordion.Item>
//                                                     <Accordion.Item className="accordion-item" eventKey="3">
//                                                         <Accordion.Header >
//                                                             Can I order a free copy of a magazine to sample?
//                                                         </Accordion.Header>
//                                                         <Accordion.Body className="accordion-body">
//                                                             <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
//                                                         </Accordion.Body>
//                                                     </Accordion.Item>
//                                                     <Accordion.Item className="accordion-item" eventKey="4">
//                                                         <Accordion.Header >
//                                                             Do you accept orders via Phone or E-mail?
//                                                         </Accordion.Header>
//                                                         <Accordion.Body className="accordion-body">
//                                                             <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
//                                                         </Accordion.Body>
//                                                     </Accordion.Item>
//                                                 </Accordion>
//                                             </Col>
//                                             <Col md={6}>
//                                                 <Accordion defaultActiveKey="0" className="codex-accordion">
//                                                     <Accordion.Item className="accordion-item" eventKey="0" >
//                                                         <Accordion.Header >

//                                                             <i className="fa fa-question-circle me-1"></i>What does LOREM mean?

//                                                         </Accordion.Header>
//                                                         <Accordion.Body className="accordion-body">
//                                                             <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
//                                                         </Accordion.Body>
//                                                     </Accordion.Item>
//                                                     <Accordion.Item className="accordion-item" eventKey="1">
//                                                         <Accordion.Header >

//                                                             <i className="fa fa-question-circle me-1"></i>Where can I subscribe to your newsletter?

//                                                         </Accordion.Header>
//                                                         <Accordion.Body className="accordion-body">
//                                                             <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
//                                                         </Accordion.Body>
//                                                     </Accordion.Item>
//                                                     <Accordion.Item className="accordion-item" eventKey="2">
//                                                         <Accordion.Header >

//                                                             <i className="fa fa-question-circle me-1"></i>Where can in edit my address?

//                                                         </Accordion.Header>
//                                                         <Accordion.Body className="accordion-body">
//                                                             <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
//                                                         </Accordion.Body>
//                                                     </Accordion.Item>
//                                                     <Accordion.Item className="accordion-item" eventKey="3">
//                                                         <Accordion.Header >

//                                                             <i className="fa fa-question-circle me-1"></i>Can I order a free copy of a magazine to sample?

//                                                         </Accordion.Header>
//                                                         <Accordion.Body className="accordion-body">
//                                                             <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
//                                                         </Accordion.Body>
//                                                     </Accordion.Item>
//                                                     <Accordion.Item className="accordion-item" eventKey="4">
//                                                         <Accordion.Header >

//                                                             <i className="fa fa-question-circle me-1"></i>Do you accept orders via Phone or E-mail?

//                                                         </Accordion.Header>
//                                                         <Accordion.Body className="accordion-body">
//                                                             <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
//                                                         </Accordion.Body>
//                                                     </Accordion.Item>
//                                                 </Accordion>
//                                             </Col>
//                                         </Row>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         </Row>
//                     </Container>
//                 </div>
//             </div>
//         </>
//     )
// }

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
                                        <h5>Find a Mentor</h5>
                                        <p>Connect with experienced mentors from different fields who guide you with real-world knowledge, career advice, and practical learning.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={6}>
                                <div className="card support-box">
                                    <div className="card-body">
                                        <div className="icon-wrap">
                                            <img className="img-fluid" src={IMAGE_URLS['support/2.png']} alt="" />
                                        </div>
                                        <h5>Book 1-on-1 Session</h5>
                                        <p>Schedule personal video or chat sessions with mentors and get direct solutions to your doubts and career questions.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={6}>
                                <div className="card support-box">
                                    <div className="card-body">
                                        <div className="icon-wrap">
                                            <img className="img-fluid" src={IMAGE_URLS['support/3.png']} alt="" />
                                        </div>
                                        <h5>Student Doubt Support</h5>
                                        <p>Ask questions anytime and get answers from verified mentors and experts in your subject or skill area.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={6}>
                                <div className="card support-box">
                                    <div className="card-body">
                                        <div className="icon-wrap">
                                            <img className="img-fluid" src={IMAGE_URLS['support/4.png']} alt="" />
                                        </div>
                                        <h5>Career Guidance</h5>
                                        <p>Get proper career direction, roadmap, and planning support from industry professionals and senior mentors.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={6}>
                                <div className="card support-box">
                                    <div className="card-body">
                                        <div className="icon-wrap">
                                            <img className="img-fluid" src={IMAGE_URLS['support/5.png']} alt="" />
                                        </div>
                                        <h5>Skill Based Learning</h5>
                                        <p>Learn practical skills like coding, business, design, communication, and more with mentor-guided learning.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={6}>
                                <div className="card support-box">
                                    <div className="card-body">
                                        <div className="icon-wrap">
                                            <img className="img-fluid" src={IMAGE_URLS['support/6.png']} alt="" />
                                        </div>
                                        <h5>Mentor & Student Community</h5>
                                        <p>Join a growing community where students and mentors interact, share knowledge, and grow together.</p>
                                    </div>
                                </div>
                            </Col>
                            {/* <Col md={12}>
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
                                                           How does the mentorship program work?
                                                        </Accordion.Header>
                                                        <Accordion.Body className="accordion-body">
                                                            <p className="text-light">Students can choose a mentor based on their interest and book 1-on-1 sessions. Mentors guide them through video calls, chat, and shared learning resources.</p>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item className="accordion-item" eventKey="1">
                                                        <Accordion.Header >
                                                         How can I find the right mentor for me?
                                                        </Accordion.Header>
                                                        <Accordion.Body className="accordion-body">
                                                            <p className="text-light">You can browse mentors by category, skills, experience, and ratings. You can also view their profiles before booking a session.</p>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item className="accordion-item" eventKey="2">
                                                        <Accordion.Header >
                                                         Can I book a trial or demo session with a mentor?
                                                        </Accordion.Header>
                                                        <Accordion.Body className="accordion-body">
                                                            <p className="text-light">Yes, some mentors offer a free or low-cost trial session so you can understand their teaching style before continuing.</p>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item className="accordion-item" eventKey="3">
                                                        <Accordion.Header >
                                                           How do I ask doubts or questions to a mentor?
                                                        </Accordion.Header>
                                                        <Accordion.Body className="accordion-body">
                                                            <p className="text-light">You can ask questions through chat, live sessions, or by posting doubts in the student dashboard.</p>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item className="accordion-item" eventKey="4">
                                                        <Accordion.Header >
                                                          Is this platform for students only?
                                                        </Accordion.Header>
                                                        <Accordion.Body className="accordion-body">
                                                            <p className="text-light">No, this platform is for both students and mentors. Anyone with expertise can apply to become a mentor.</p>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </Col>
                                            <Col md={6}>
                                                <Accordion defaultActiveKey="0" className="codex-accordion">
                                                    <Accordion.Item className="accordion-item" eventKey="0" >
                                                        <Accordion.Header >

                                            How can I become a mentor on this platform?

                                                        </Accordion.Header>
                                                        <Accordion.Body className="accordion-body">
                                                            <p className="text-light">You can apply from the “Become a Mentor” section. After verification, your profile will be visible to students.</p>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item className="accordion-item" eventKey="1">
                                                        <Accordion.Header >

                                                        Are sessions paid or free?

                                                        </Accordion.Header>
                                                        <Accordion.Body className="accordion-body">
                                                            <p className="text-light">Some sessions are free, and some are paid depending on the mentor. The price is shown clearly before booking.</p>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item className="accordion-item" eventKey="2">
                                                        <Accordion.Header >

                                                          Can I learn multiple skills from different mentors?

                                                        </Accordion.Header>
                                                        <Accordion.Body className="accordion-body">
                                                            <p className="text-light">Yes, you can book sessions with multiple mentors and learn different skills at the same time.</p>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item className="accordion-item" eventKey="3">
                                                        <Accordion.Header >

                                                       Will I get recordings of my sessions?

                                                        </Accordion.Header>
                                                        <Accordion.Body className="accordion-body">
                                                            <p className="text-light">Yes, if the mentor allows, session recordings will be available in your dashboard.</p>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item className="accordion-item" eventKey="4">
                                                        <Accordion.Header >

                                                          How do I contact support?

                                                        </Accordion.Header>
                                                        <Accordion.Body className="accordion-body">
                                                            <p className="text-light">You can contact support from the “Help & Support” section inside the app or website.</p>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col> */}
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}
