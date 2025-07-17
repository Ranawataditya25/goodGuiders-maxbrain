import * as React from 'react';
import { Container, Row, Col, Card, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';

import PageBreadcrumb from '../componets/PageBreadcrumb';

export default function Element_Tooltips() {
  return (
    <>
            <div className="themebody-wrap">
                {/* breadcrumb start */}
                <PageBreadcrumb pagename="Tooltip" />
                {/* breadcrumb end */}
                {/* theme body start */}
                <div className="theme-body">
                    <Container fluid>
                        <Row>
                            <Col xl={4} sm={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>tooltip primary</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        {['top'].map((top) => (
                                            <OverlayTrigger
                                                key={top}
                                                top={top}
                                                overlay={
                                                    <Tooltip id={`tooltip-${top}`}>
                                                        Tooltip on <strong>{top}</strong>.
                                                    </Tooltip>
                                                }
                                            >
                                                <Button variant="primary">Tooltip primary</Button>
                                            </OverlayTrigger>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} sm={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>tooltip secondary</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        {['top'].map((top) => (
                                            <OverlayTrigger
                                                key={top}
                                                top={top}
                                                overlay={
                                                    <Tooltip id={`tooltip-${top}`}>
                                                        Tooltip on <strong>{top}</strong>.
                                                    </Tooltip>
                                                }
                                            >
                                                <Button variant="secondary">Tooltip secondary</Button>
                                            </OverlayTrigger>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} sm={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>tooltip success</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        {['top'].map((top) => (
                                            <OverlayTrigger
                                                key={top}
                                                placement={top}
                                                overlay={
                                                    <Tooltip id={`tooltip-${top}`}>
                                                        Tooltip on <strong>{top}</strong>.
                                                    </Tooltip>
                                                }
                                            >
                                                <Button variant="success">Tooltip success</Button>
                                            </OverlayTrigger>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} sm={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>tooltip info</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        {['top'].map((top) => (
                                            <OverlayTrigger
                                                key={top}
                                                placement={top}
                                                overlay={
                                                    <Tooltip id={`tooltip-${top}`}>
                                                        Tooltip on <strong>{top}</strong>.
                                                    </Tooltip>
                                                }
                                            >
                                                <Button variant="info">Tooltip info</Button>
                                            </OverlayTrigger>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} sm={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>tooltip warning</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        {['top'].map((top) => (
                                            <OverlayTrigger
                                                key={top}
                                                placement={top}
                                                overlay={
                                                    <Tooltip id={`tooltip-${top}`}>
                                                        Tooltip on <strong>{top}</strong>.
                                                    </Tooltip>
                                                }
                                            >
                                                <Button variant="warning">Tooltip warning</Button>
                                            </OverlayTrigger>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} sm={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>tooltip danger</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        {['top'].map((top) => (
                                            <OverlayTrigger
                                                key={top}
                                                placement={top}
                                                overlay={
                                                    <Tooltip id={`tooltip-${top}`}>
                                                        Tooltip on <strong>{top}</strong>.
                                                    </Tooltip>
                                                }
                                            >
                                                <Button variant="danger">Tooltip danger</Button>
                                            </OverlayTrigger>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={4} sm={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>tooltip top</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        {['top'].map((top) => (
                                            <OverlayTrigger
                                                key={top}
                                                placement={top}
                                                overlay={
                                                    <Tooltip id={`tooltip-${top}`}>
                                                        Tooltip on <strong>{top}</strong>.
                                                    </Tooltip>
                                                }
                                            >
                                                <Button variant="primary">Tooltip top</Button>
                                            </OverlayTrigger>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} sm={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>tooltip left</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        {['left'].map((left) => (
                                            <OverlayTrigger
                                                key={left}
                                                placement={left}
                                                overlay={
                                                    <Tooltip id={`tooltip-${left}`}>
                                                        Tooltip on <strong>{left}</strong>.
                                                    </Tooltip>
                                                }
                                            >
                                                <Button variant="secondary">Tooltip left</Button>
                                            </OverlayTrigger>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} sm={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>tooltip right</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        {['right'].map((right) => (
                                            <OverlayTrigger
                                                key={right}
                                                placement={right}
                                                overlay={
                                                    <Tooltip id={`tooltip-${right}`}>
                                                        Tooltip on <strong>{right}</strong>.
                                                    </Tooltip>
                                                }
                                            >
                                                <Button variant="success">Tooltip right</Button>
                                            </OverlayTrigger>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} sm={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>tooltip bottom</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        {['bottom'].map((bottom) => (
                                            <OverlayTrigger
                                                key={bottom}
                                                placement={bottom}
                                                overlay={
                                                    <Tooltip id={`tooltip-${bottom}`}>
                                                        Tooltip on <strong>{bottom}</strong>.
                                                    </Tooltip>
                                                }
                                            >
                                                <Button variant="info">Tooltip bottom</Button>
                                            </OverlayTrigger>
                                        ))}
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
