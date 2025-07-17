// import * as React from 'react';
// import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
// import PageBreadcrumb from '../componets/PageBreadcrumb';

// export default function Faq() {
//     return (
//         <>
//             <div className="themebody-wrap">
//                 {/* Breadcrumb Start */}
//                 <PageBreadcrumb pagename="Faq" />
//                 {/* Breadcrumb End */}
//                 {/* theme body start */}
//                 <div className="theme-body">
//                     <Container fluid className="codex-faq">
//                         <Row>
//                             <Col md={12}>
//                                 <Card className="card faq-searchwrap">
//                                     <Card.Body className="card-body">
//                                         <div>
//                                             <h1>how can we help you?</h1>
//                                             <div className="input-group">
//                                                 <input className="form-control" type="text" placeholder="find your question" />
//                                                 <div className="input-group-text bg-primary border-0">
//                                                     <i className="fa fa-search"></i>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                             <Col md={6}>
//                                 <Card>
//                                     <Card.Body>
//                                         <Accordion defaultActiveKey="0" className="codex-accordion">
//                                             <Accordion.Item className="accordion-item" eventKey="0" >
//                                                 <Accordion.Header >
//                                                     What does LOREM mean?
//                                                 </Accordion.Header>
//                                                 <Accordion.Body className="accordion-body">
//                                                     <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
//                                                 </Accordion.Body>
//                                             </Accordion.Item>
//                                             <Accordion.Item className="accordion-item" eventKey="1">
//                                                 <Accordion.Header >
//                                                     Where can I subscribe to your newsletter?
//                                                 </Accordion.Header>
//                                                 <Accordion.Body className="accordion-body">
//                                                     <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
//                                                 </Accordion.Body>
//                                             </Accordion.Item>
//                                             <Accordion.Item className="accordion-item" eventKey="2">
//                                                 <Accordion.Header >
//                                                     Where can in edit my address?
//                                                 </Accordion.Header>
//                                                 <Accordion.Body className="accordion-body">
//                                                     <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
//                                                 </Accordion.Body>
//                                             </Accordion.Item>
//                                             <Accordion.Item className="accordion-item" eventKey="3">
//                                                 <Accordion.Header >
//                                                     Can I order a free copy of a magazine to sample?
//                                                 </Accordion.Header>
//                                                 <Accordion.Body className="accordion-body">
//                                                     <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
//                                                 </Accordion.Body>
//                                             </Accordion.Item>
//                                             <Accordion.Item className="accordion-item" eventKey="4">
//                                                 <Accordion.Header >
//                                                     Do you accept orders via Phone or E-mail?
//                                                 </Accordion.Header>
//                                                 <Accordion.Body className="accordion-body">
//                                                     <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
//                                                 </Accordion.Body>
//                                             </Accordion.Item>
//                                         </Accordion>

//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                             <Col md={6}>
//                                 <Card>
//                                     <Card.Body>
//                                         <Accordion defaultActiveKey="0" className="codex-accordion">
//                                             <Accordion.Item className="accordion-item" eventKey="0" >
//                                                 <Accordion.Header >

//                                                     <i className="fa fa-question-circle me-1"></i>What does LOREM mean?

//                                                 </Accordion.Header>
//                                                 <Accordion.Body className="accordion-body">
//                                                     <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
//                                                 </Accordion.Body>
//                                             </Accordion.Item>
//                                             <Accordion.Item className="accordion-item" eventKey="1">
//                                                 <Accordion.Header >

//                                                     <i className="fa fa-question-circle me-1"></i>Where can I subscribe to your newsletter?

//                                                 </Accordion.Header>
//                                                 <Accordion.Body className="accordion-body">
//                                                     <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
//                                                 </Accordion.Body>
//                                             </Accordion.Item>
//                                             <Accordion.Item className="accordion-item" eventKey="2">
//                                                 <Accordion.Header >

//                                                     <i className="fa fa-question-circle me-1"></i>Where can in edit my address?

//                                                 </Accordion.Header>
//                                                 <Accordion.Body className="accordion-body">
//                                                     <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
//                                                 </Accordion.Body>
//                                             </Accordion.Item>
//                                             <Accordion.Item className="accordion-item" eventKey="3">
//                                                 <Accordion.Header >

//                                                     <i className="fa fa-question-circle me-1"></i>Can I order a free copy of a magazine to sample?

//                                                 </Accordion.Header>
//                                                 <Accordion.Body className="accordion-body">
//                                                     <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
//                                                 </Accordion.Body>
//                                             </Accordion.Item>
//                                             <Accordion.Item className="accordion-item" eventKey="4">
//                                                 <Accordion.Header >

//                                                     <i className="fa fa-question-circle me-1"></i>Do you accept orders via Phone or E-mail?

//                                                 </Accordion.Header>
//                                                 <Accordion.Body className="accordion-body">
//                                                     <p className="text-light">‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word ‘Lorem’ does not exist. It is said that the lorem ipsum.</p>
//                                                 </Accordion.Body>
//                                             </Accordion.Item>
//                                         </Accordion>
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




import React from 'react';

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '919999999999'; // Replace with your WhatsApp number (with country code, no + or spaces)
    const message = 'Hello, I want to connect with you via WhatsApp!';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank'); // Open in new tab
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={handleWhatsAppClick} style={{ padding: '10px 20px', fontSize: 16 }}>
        Send WhatsApp Message
      </button>
    </div>
  );
};

export default WhatsAppButton;
