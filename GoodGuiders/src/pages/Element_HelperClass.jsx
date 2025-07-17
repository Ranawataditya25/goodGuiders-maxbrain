import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';


import PageBreadcrumb from '../componets/PageBreadcrumb';

export default function Element_HelperClass() {
  return (
    <>
            <div className="themebody-wrap">
                {/* breadcrumb start */}
                <PageBreadcrumb pagename="Helper Class" />
                {/* breadcrumb end */}
                {/* theme body start */}
                <div className="theme-body">
                    <Container fluid>
                        <Row>
                            <Col md={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>background color</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <ul className="cdxclass-exa">
                                            <li>.bg-primary</li>
                                            <li>.bg-secondary</li>
                                            <li>.bg-success</li>
                                            <li>.bg-info</li>
                                            <li>.bg-warning</li>
                                            <li>.bg-info</li>
                                            <li>.bg-danger</li>
                                            <li>.bg-light</li>
                                            <li>.bg-dark</li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>text color</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <ul className="cdxclass-exa">
                                            <li>.text-primary</li>
                                            <li>.text-secondary</li>
                                            <li>.text-success</li>
                                            <li>.text-info</li>
                                            <li>.text-warning</li>
                                            <li>.text-info</li>
                                            <li>.text-danger</li>
                                            <li>.text-light</li>
                                            <li>.text-dark</li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>button</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <ul className="cdxclass-exa">
                                            <li>.btn.btn-primary</li>
                                            <li>.btn.btn-secondary</li>
                                            <li>.btn.btn-success</li>
                                            <li>.btn.btn-info</li>
                                            <li>.btn.btn-warning</li>
                                            <li>.btn.btn-info</li>
                                            <li>.btn.btn-danger</li>
                                            <li>.btn.btn-light</li>
                                            <li>.btn.btn-dark</li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>button outline</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <ul className="cdxclass-exa">
                                            <li>.btn.btn-outline-primary</li>
                                            <li>.btn.btn-outline-secondary</li>
                                            <li>.btn.btn-outline-success</li>
                                            <li>.btn.btn-outline-info</li>
                                            <li>.btn.btn-outline-warning</li>
                                            <li>.btn.btn-outline-info</li>
                                            <li>.btn.btn-outline-danger</li>
                                            <li>.btn.btn-outline-light</li>
                                            <li>.btn.btn-outline-dark</li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>alert</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <ul className="cdxclass-exa">
                                            <li>.alert.alert-primary</li>
                                            <li>.alert.alert-secondary</li>
                                            <li>.alert.alert-success</li>
                                            <li>.alert.alert-info</li>
                                            <li>.alert.alert-warning</li>
                                            <li>.alert.alert-info</li>
                                            <li>.alert.alert-danger</li>
                                            <li>.alert.alert-light</li>
                                            <li>.alert.alert-dark</li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>alert outline</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <ul className="cdxclass-exa">
                                            <li>.alert.alert-outline-primary</li>
                                            <li>.alert.alert-outline-secondary</li>
                                            <li>.alert.alert-outline-success</li>
                                            <li>.alert.alert-outline-info</li>
                                            <li>.alert.alert-outline-warning</li>
                                            <li>.alert.alert-outline-info</li>
                                            <li>.alert.alert-outline-danger</li>
                                            <li>.alert.alert-outline-light</li>
                                            <li>.alert.alert-outline-dark</li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>badge</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <ul className="cdxclass-exa">
                                            <li>.badge.badge-primary</li>
                                            <li>.badge.badge-secondary</li>
                                            <li>.badge.badge-success</li>
                                            <li>.badge.badge-info</li>
                                            <li>.badge.badge-warning</li>
                                            <li>.badge.badge-info</li>
                                            <li>.badge.badge-danger</li>
                                            <li>.badge.badge-light</li>
                                            <li>.badge.badge-dark</li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>badge rounded</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <ul className="cdxclass-exa">
                                            <li>.badge.badge-primary.rounded-pill</li>
                                            <li>.badge.badge-secondary.rounded-pill</li>
                                            <li>.badge.badge-success.rounded-pill</li>
                                            <li>.badge.badge-info.rounded-pill</li>
                                            <li>.badge.badge-warning.rounded-pill</li>
                                            <li>.badge.badge-info.rounded-pill</li>
                                            <li>.badge.badge-danger.rounded-pill</li>
                                            <li>.badge.badge-light.rounded-pill</li>
                                            <li>.badge.badge-dark.rounded-pill</li>
                                        </ul>
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
