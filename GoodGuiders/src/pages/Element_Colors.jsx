import React from 'react'
import {Container, Row, Col, Card } from 'react-bootstrap';


import PageBreadcrumb from '../componets/PageBreadcrumb';

export default function Element_Colors() {
  return (
    <>
    <div className="themebody-wrap">
        {/* breadcrumb start */}
        <PageBreadcrumb pagename="Colors" />
        {/* breadcrumb end */}
        {/* theme body start */}
        <div className="theme-body">
            <Container fluid>
                <Row>
                    <Col sm={12}>
                        <Card>
                            <Card.Header>
                                <h4>default colors</h4>
                            </Card.Header>
                            <Card.Body>
                                <Row className="row colors-exa">
                                    <Col xxl={2} lg={3} md={4} sm={6}>
                                        <div className="color-option bg-primary"></div>
                                        <span>primary</span>
                                    </Col>
                                    <Col xxl={2} lg={3} md={4} sm={6}>
                                        <div className="color-option bg-secondary"></div>
                                        <span>secondary</span>
                                    </Col>
                                    <Col xxl={2} lg={3} md={4} sm={6}>
                                        <div className="color-option bg-success"></div>
                                        <span>success</span>
                                    </Col>
                                    <Col xxl={2} lg={3} md={4} sm={6}>
                                        <div className="color-option bg-info"></div>
                                        <span>info</span>
                                    </Col>
                                    <Col xxl={2} lg={3} md={4} sm={6}>
                                        <div className="color-option bg-warning"></div>
                                        <span>waning</span>
                                    </Col>
                                    <Col xxl={2} lg={3} md={4} sm={6}>
                                        <div className="color-option bg-danger"></div>
                                        <span>danger</span>
                                    </Col>
                                    <Col xxl={2} lg={3} md={4} sm={6}>
                                        <div className="color-option bg-light"></div>
                                        <span>light</span>
                                    </Col>
                                    <Col xxl={2} lg={3} md={4} sm={6}>
                                        <div className="color-option bg-dark"></div>
                                        <span>dark</span>
                                    </Col>
                                    <Col xxl={2} lg={3} md={4} sm={6}>
                                        <div className="color-option bg-white"></div>
                                        <span>white</span>
                                    </Col>
                                    <Col xxl={2} lg={3} md={4} sm={6}>
                                        <div className="color-option bg-fontlight"></div>
                                        <span>font light</span>
                                    </Col>
                                    <Col xxl={2} lg={3} md={4} sm={6}>
                                        <div className="color-option bg-themebodycolor"></div>
                                        <span>theme body </span>
                                    </Col>
                                    <Col xxl={2} lg={3} md={4} sm={6}>
                                        <div className="color-option bg-themefontcolor"></div>
                                        <span>theme font</span>
                                    </Col>
                                    <Col xxl={2} lg={3} md={4} sm={6}>
                                        <div className="color-option bg-themeborder"></div>
                                        <span>theme border</span>
                                    </Col>
                                    <Col xxl={2} lg={3} md={4} sm={6}>
                                        <div className="color-option bg-fb"></div>
                                        <span>facebook </span>
                                    </Col>
                                    <Col xxl={2} lg={3} md={4} sm={6}>
                                        <div className="color-option bg-twt"></div>
                                        <span>twitter</span>
                                    </Col>
                                    <Col xxl={2} lg={3} md={4} sm={6}>
                                        <div className="color-option bg-insta"></div>
                                        <span>instagram</span>
                                    </Col>
                                    <Col xxl={2} lg={3} md={4} sm={6}>
                                        <div className="color-option bg-whp"></div>
                                        <span>whatsapp</span>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={12}>
                        <Card>
                            <Card.Header>
                                <h4>dark layout colors</h4>
                            </Card.Header>
                            <Card.Body>
                                <Row className="row colors-exa">
                                    <Col xxl={2} lg={3} md={4} sm={6}>
                                        <div className="color-option bg-darkbody"></div>
                                        <span>dark body</span>
                                    </Col>
                                    <Col xxl={2} lg={3} md={4} sm={6}>
                                        <div className="color-option bg-darkcard"></div>
                                        <span>dark card</span>
                                    </Col>
                                    <Col xxl={2} lg={3} md={4} sm={6}>
                                        <div className="color-option bg-extradarkcard"></div>
                                        <span>extra dark</span>
                                    </Col>
                                    <Col xxl={2} lg={3} md={4} sm={6}>
                                        <div className="color-option bg-darkfont"></div>
                                        <span>dark font</span>
                                    </Col>
                                    <Col xxl={2} lg={3} md={4} sm={6}>
                                        <div className="color-option bg-darksmallfont"></div>
                                        <span>dark small font</span>
                                    </Col>
                                    <Col xxl={2} lg={3} md={4} sm={6}>
                                        <div className="color-option bg-darkborder"></div>
                                        <span>dark border</span>
                                    </Col>
                                </Row>
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
