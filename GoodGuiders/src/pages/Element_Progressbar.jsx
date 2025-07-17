import * as React from 'react';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';

import PageBreadcrumb from '../componets/PageBreadcrumb';

export default function Element_Progressbar() {
  return (
    <>
            <div className="themebody-wrap">
                {/* breadcrumb start */}
                <PageBreadcrumb pagename="Progressbar" />
                {/* breadcrumb end */}
                {/* theme body start */}
                <div className="theme-body">
                    <Container fluid>
                        <Row>
                            <Col sm={12}>
                                <Card className="card">
                                    <Card.Header>
                                        <h4>normal progress bars</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <ProgressBar variant="primary" className="mb-2" now={25} />
                                        <ProgressBar variant="primary" className="mb-2" now={50} />
                                        <ProgressBar variant="primary" className="mb-2" now={75} />
                                        <ProgressBar variant="primary" className="mb-2" now={100} />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={12}>
                                <Card className="card">
                                    <Card.Header>
                                        <h4>different theme colors progress bars</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <ProgressBar variant="primary" className="mb-2" now={0} />
                                        <ProgressBar variant="secondary" className="mb-2" now={20} />
                                        <ProgressBar variant="success" className="mb-2" now={30} />
                                        <ProgressBar variant="info" className="mb-2" now={40} />
                                        <ProgressBar variant="warning" className="mb-2" now={50} />
                                        <ProgressBar variant="danger" className="mb-2" now={60} />

                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={12}>
                                <Card className="card">
                                    <Card.Header>
                                        <h4>progress bar label</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <ProgressBar variant="primary" className="mb-2" now={0} label={`${'0'}%`} />
                                        <ProgressBar variant="secondary" className="mb-2" now={20} label={`${'20'}%`} />
                                        <ProgressBar variant="success" className="mb-2" now={30} label={`${'30'}%`} />
                                        <ProgressBar variant="info" className="mb-2" now={40} label={`${'40'}%`} />
                                        <ProgressBar variant="warning" className="mb-2" now={50} label={`${'50'}%`} />
                                        <ProgressBar variant="danger" className="mb-2" now={60} label={`${'60'}%`} />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={12}>
                                <Card className="card">
                                    <Card.Header>
                                        <h4>progress bar with hight</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <ProgressBar variant="primary" className="mb-2" now={0} />
                                        <ProgressBar variant="secondary" className="mb-2" now={20} />
                                        <ProgressBar variant="success" className="mb-2" now={30} />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={12}>
                                <Card className="card">
                                    <Card.Header>
                                        <h4>Multiple bars progress</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <ProgressBar className="mb-2">
                                            <ProgressBar striped variant="" now={15} key={1} />
                                            <ProgressBar variant="success" now={30} key={2} />
                                            <ProgressBar striped variant="info" now={20} key={3} />
                                        </ProgressBar>
                                        <ProgressBar className="mb-2">
                                            <ProgressBar striped variant="secondary" now={20} key={1} />
                                            <ProgressBar variant="warning" now={25} key={2} />
                                            <ProgressBar striped variant="danger" now={30} key={3} />
                                        </ProgressBar>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={12}>
                                <Card className="card">
                                    <Card.Header>
                                        <h4>Striped progress bar</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <ProgressBar striped variant="primary" className="mb-2" now={10} />
                                        <ProgressBar striped variant="secondary" className="mb-2" now={20} />
                                        <ProgressBar striped variant="success" className="mb-2" now={30} />
                                        <ProgressBar striped variant="info" className="mb-2" now={40} />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={12}>
                                <Card className="card">
                                    <Card.Header>
                                        <h4>animated Striped progress bar</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <ProgressBar animated variant="primary" className="mb-2" now={10} />
                                        <ProgressBar animated variant="secondary" className="mb-2" now={20} />
                                        <ProgressBar animated variant="success" className="mb-2" now={30} />
                                        <ProgressBar animated variant="info" className="mb-2" now={40} />
                                        <ProgressBar animated variant="warning" className="mb-2" now={50} />
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
