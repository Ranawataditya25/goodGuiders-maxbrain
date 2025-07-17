import * as React from 'react';
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';

import PageBreadcrumb from '../componets/PageBreadcrumb';

export default function Element_Paginations() {
  return (
    <>
            <div className="themebody-wrap">
                {/* breadcrumb start */}
                <PageBreadcrumb pagename="Paginations" />
                {/* breadcrumb end */}
                {/* theme body start */}
                <div className="theme-body">
                    <Container fluid>
                        <Row>
                            <Col xxl={4} md={6}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>normal pagination</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <Pagination>
                                            <Pagination.First> Previous</Pagination.First>

                                            <Pagination.Item>{1}</Pagination.Item>
                                            <Pagination.Item>{2}</Pagination.Item>
                                            <Pagination.Item>{3}</Pagination.Item>

                                            <Pagination.Last> Next </Pagination.Last >
                                        </Pagination>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={4} md={6}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>pagination with icon</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <Pagination>
                                            <Pagination.First />
                                            <Pagination.Item>{1}</Pagination.Item>
                                            <Pagination.Item>{2}</Pagination.Item>
                                            <Pagination.Item>{3}</Pagination.Item>
                                            <Pagination.Last />
                                        </Pagination>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={4} md={6}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>Disabled and active states</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <Pagination>
                                            <Pagination.First disabled> Previous</Pagination.First>

                                            <Pagination.Item>{1}</Pagination.Item>
                                            <Pagination.Item>{2}</Pagination.Item>
                                            <Pagination.Item active>{3}</Pagination.Item>

                                            <Pagination.Last> Next </Pagination.Last >
                                        </Pagination>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={4} md={6}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>primary pagination</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <Pagination className="pagination-primary">
                                            <Pagination.Prev />
                                            <Pagination.Item>{1}</Pagination.Item>
                                            <Pagination.Item active>{2}</Pagination.Item>
                                            <Pagination.Item>{3}</Pagination.Item>
                                            <Pagination.Next />
                                        </Pagination>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={4} md={6}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>secondary pagination</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <Pagination className="pagination-secondary">
                                            <Pagination.Prev />
                                            <Pagination.Item>{1}</Pagination.Item>
                                            <Pagination.Item active>{2}</Pagination.Item>
                                            <Pagination.Item>{3}</Pagination.Item>
                                            <Pagination.Next />
                                        </Pagination>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={4} md={6}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>success pagination</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <Pagination className="pagination-success">
                                            <Pagination.Prev />
                                            <Pagination.Item>{1}</Pagination.Item>
                                            <Pagination.Item active>{2}</Pagination.Item>
                                            <Pagination.Item>{3}</Pagination.Item>
                                            <Pagination.Next />
                                        </Pagination>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={4} md={6}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>info pagination</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <Pagination className="pagination-info">
                                            <Pagination.Prev />
                                            <Pagination.Item>{1}</Pagination.Item>
                                            <Pagination.Item active>{2}</Pagination.Item>
                                            <Pagination.Item>{3}</Pagination.Item>
                                            <Pagination.Next />
                                        </Pagination>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={4} md={6}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>warning pagination</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <Pagination className="pagination-warning">
                                            <Pagination.Prev />
                                            <Pagination.Item>{1}</Pagination.Item>
                                            <Pagination.Item active>{2}</Pagination.Item>
                                            <Pagination.Item>{3}</Pagination.Item>
                                            <Pagination.Next />
                                        </Pagination>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={4}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>danger pagination</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <Pagination className="pagination-danger">
                                            <Pagination.Prev />
                                            <Pagination.Item>{1}</Pagination.Item>
                                            <Pagination.Item active>{2}</Pagination.Item>
                                            <Pagination.Item>{3}</Pagination.Item>
                                            <Pagination.Next />
                                        </Pagination>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={12}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>sizing pagination</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body overflow-hidden">
                                        <Row>
                                            <Col xxl={4} className="my-3" >
                                                <Pagination size="lg">
                                                    <Pagination.First> Previous</Pagination.First>

                                                    <Pagination.Item>{1}</Pagination.Item>
                                                    <Pagination.Item>{2}</Pagination.Item>
                                                    <Pagination.Item>{3}</Pagination.Item>

                                                    <Pagination.Last> Next </Pagination.Last >
                                                </Pagination>
                                            </Col>
                                            <Col xxl={4} className="my-3">
                                                <Pagination size="md">
                                                    <Pagination.First> Previous</Pagination.First>

                                                    <Pagination.Item>{1}</Pagination.Item>
                                                    <Pagination.Item>{2}</Pagination.Item>
                                                    <Pagination.Item>{3}</Pagination.Item>

                                                    <Pagination.Last> Next </Pagination.Last >
                                                </Pagination>
                                            </Col>
                                            <Col xxl={4} className="my-3">
                                                <Pagination size="sm">
                                                    <Pagination.First> Previous</Pagination.First>

                                                    <Pagination.Item>{1}</Pagination.Item>
                                                    <Pagination.Item>{2}</Pagination.Item>
                                                    <Pagination.Item>{3}</Pagination.Item>

                                                    <Pagination.Last> Next </Pagination.Last >
                                                </Pagination>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={12}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>pagination alignment</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <Pagination>
                                            <Pagination.First disabled> Previous</Pagination.First>

                                            <Pagination.Item>{1}</Pagination.Item>
                                            <Pagination.Item>{2}</Pagination.Item>
                                            <Pagination.Item>{3}</Pagination.Item>

                                            <Pagination.Last> Next </Pagination.Last >
                                        </Pagination>
                                        <Pagination className="justify-content-center">
                                            <Pagination.First disabled> Previous</Pagination.First>

                                            <Pagination.Item>{1}</Pagination.Item>
                                            <Pagination.Item>{2}</Pagination.Item>
                                            <Pagination.Item>{3}</Pagination.Item>

                                            <Pagination.Last> Next </Pagination.Last >
                                        </Pagination>
                                        <Pagination className="justify-content-end">
                                            <Pagination.First disabled> Previous</Pagination.First>

                                            <Pagination.Item>{1}</Pagination.Item>
                                            <Pagination.Item>{2}</Pagination.Item>
                                            <Pagination.Item>{3}</Pagination.Item>

                                            <Pagination.Last> Next </Pagination.Last >
                                        </Pagination>

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
