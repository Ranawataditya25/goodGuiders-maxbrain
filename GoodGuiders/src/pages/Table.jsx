import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

import Footer from '../componets/Footer';

import PageBreadcrumb from '../componets/PageBreadcrumb';

export default function Tabel() {
  return (
    <>           

            {/* Theme Body Start */}
            <main className="themebody-wrap">

                {/* Breadcrumb Start */}
                <PageBreadcrumb pagename="Tabel" />
                {/* Breadcrumb End */}


                <div className="theme-body">
                    <Container fluid>
                        <Row>
                            <Col xs={12}>
                                <Card>
                                    <Card.Header>
                                        <Card.Title>
                                            Basic Table
                                        </Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Username</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td colSpan={2}>Larry the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>

            </main>
            {/* Theme Body End */}

            {/* Footer Start */}
            <Footer />
            {/* Footer End */}

        </>
  )
}
