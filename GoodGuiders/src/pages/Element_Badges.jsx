import * as React from 'react';
import { Container, Row, Col, Card, Stack, Badge } from 'react-bootstrap';

import PageBreadcrumb from '../componets/PageBreadcrumb';

export default function Element_Badges() {
  return (
    <>
    <div className="themebody-wrap">
        {/* breadcrumb start */}
        <PageBreadcrumb pagename="Badge" />
        {/* breadcrumb end */}
        {/* theme body start */}
        <div className="theme-body">
            <Container fluid>
                <Row>
                    <Col lg={6}>
                        <Card className="card">
                            <Card.Header>
                                <h4>default badge</h4>
                            </Card.Header>
                            <Card.Body className="card-body">
                                <Stack direction="horizontal" gap={2}>
                                    <Badge bg="primary">Primary</Badge>
                                    <Badge bg="secondary">Secondary</Badge>
                                    <Badge bg="success">Success</Badge>
                                    <Badge bg="danger">Danger</Badge>
                                    <Badge bg="warning" text="dark">
                                        Warning
                                    </Badge>
                                    <Badge bg="info">Info</Badge>
                                    <Badge bg="light" text="dark">
                                        Light
                                    </Badge>
                                    <Badge bg="dark">Dark</Badge>
                                </Stack>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={6}>
                        <Card className="card">
                            <Card.Header>
                                <h4>rounded badge</h4>
                            </Card.Header>
                            <Card.Body className="card-body">
                                <Stack direction="horizontal" gap={2}>
                                    <Badge pill bg="primary">
                                        Primary
                                    </Badge>
                                    <Badge pill bg="secondary">
                                        Secondary
                                    </Badge>
                                    <Badge pill bg="success">
                                        Success
                                    </Badge>
                                    <Badge pill bg="danger">
                                        Danger
                                    </Badge>
                                    <Badge pill bg="warning" text="dark">
                                        Warning
                                    </Badge>
                                    <Badge pill bg="info">
                                        Info
                                    </Badge>
                                    <Badge pill bg="light" text="dark">
                                        Light
                                    </Badge>
                                    <Badge pill bg="dark">
                                        Dark
                                    </Badge>
                                </Stack>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={6}>
                        <Card className="card">
                            <Card.Header>
                                <h4>default badge</h4>
                            </Card.Header>
                            <Card.Body className="card-body">

                                <h1 className="mb-5">
                                    Example heading <Badge bg="primary">New</Badge>
                                </h1>
                                <h2 className="mb-5">
                                    Example heading <Badge bg="primary">New</Badge>
                                </h2>
                                <h3 className="mb-5">
                                    Example heading <Badge bg="primary">New</Badge>
                                </h3>
                                <h4 className="mb-5">
                                    Example heading <Badge bg="primary">New</Badge>
                                </h4>
                                <h5 className="mb-5">
                                    Example heading <Badge bg="primary">New</Badge>
                                </h5>
                                <h6 className="mb-5">
                                    Example heading <Badge bg="primary">New</Badge>
                                </h6>
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
