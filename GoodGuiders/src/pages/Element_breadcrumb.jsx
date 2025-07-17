import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

import PageBreadcrumb from '../componets/PageBreadcrumb';

export default function Element_breadcrumb() {
    return (
        <>
            <div className="themebody-wrap">
                {/* breadcrumb start */}
                <PageBreadcrumb pagename="Element Breadcrumb" />
                {/* breadcrumb end */}
                {/* theme body start */}
                <div className="theme-body">
                    <Container fluid>
                        <Row>
                            <Col xl={6}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>Simple Breadcrumbs</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <p className="card-title-desc">Use an ordered or unordered list with linked list items to create a minimally styled breadcrumb. Use our utilities to add additional styles as desired.</p>
                                        <div aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                                            </ol>
                                        </div>
                                        <div aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                                <li className="breadcrumb-item active" aria-current="page">Application</li>
                                            </ol>
                                        </div>
                                        <div aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                                <li className="breadcrumb-item"><a href="#">Application </a></li>
                                                <li className="breadcrumb-item active" aria-current="page">Profile</li>
                                            </ol>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={6}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>Dividers Breadcrumbs </h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <p className="card-title-desc"> Dividers are automatically added in CSS through ::before and content. They can be changed by modifying a local CSS custom property <code>--bs-breadcrumb-divider</code></p>
                                        <div >
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                                <li className="breadcrumb-item active" aria-current="page">Application</li>
                                            </ol>
                                        </div>
                                        <div >
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                                <li className="breadcrumb-item"><a href="#">Application </a></li>
                                                <li className="breadcrumb-item active" aria-current="page">Profile</li>
                                            </ol>
                                        </div>
                                        <div >
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                                <li className="breadcrumb-item"><a href="#">Application </a></li>
                                                <li className="breadcrumb-item active" aria-current="page">Profile          </li>
                                            </ol>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={6}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>SVG Icon set Breadcrumbs </h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <p className="card-title-desc"> It’s also possible to use an embedded SVG icon. Apply it via our CSS through ::before and content or<br /><code>style="--bs-breadcrumb-divider: SVG path"                  </code></p>
                                        <div  aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                                <li className="breadcrumb-item active" aria-current="page">Library            </li>
                                            </ol>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={6}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>Breadcrumbs Align Right</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <div aria-label="breadcrumb">
                                            <ol className="breadcrumb justify-content-end">
                                                <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                                            </ol>
                                        </div>
                                        <div aria-label="breadcrumb">
                                            <ol className="breadcrumb justify-content-end">
                                                <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                                <li className="breadcrumb-item active" aria-current="page">Application</li>
                                            </ol>
                                        </div>
                                        <div aria-label="breadcrumb">
                                            <ol className="breadcrumb justify-content-end">
                                                <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                                <li className="breadcrumb-item"><a href="#">Application </a></li>
                                                <li className="breadcrumb-item active" aria-current="page">Profile</li>
                                            </ol>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={6}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>Breadcrumbs Color Variant</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <div aria-label="breadcrumb">
                                            <ol className="breadcrumb btn-primary p-2">
                                                <li className="breadcrumb-item active text-white" aria-current="page"> <i className="fa fa-star-o mr-5"></i>Dashboard               </li>
                                            </ol>
                                        </div>
                                        <div aria-label="breadcrumb">
                                            <ol className="breadcrumb btn-secondary p-2">
                                                <li className="breadcrumb-item"><a className="text-white" href="#">Dashboard</a></li>
                                                <li className="breadcrumb-item"><a className="text-white" href="#">Application </a></li>
                                                <li className="breadcrumb-item active text-white" aria-current="page">Profile</li>
                                            </ol>
                                        </div>
                                        <div aria-label="breadcrumb">
                                            <ol className="breadcrumb btn-dark p-2">
                                                <li className="breadcrumb-item"><a className="text-white" href="#"> <i className="fa fa-dot-circle-o mr-5"></i>Dashboard</a></li>
                                                <li className="breadcrumb-item"><a className="text-white" href="#"> <i className="fa fa-dot-circle-o mr-5"></i>Application </a></li>
                                                <li className="breadcrumb-item active text-white" aria-current="page">
                                                    Profile</li>
                                            </ol>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={6}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>Breadcrumbs Align Center</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <p>&nbsp;</p>
                                        <div aria-label="breadcrumb">
                                            <ol className="breadcrumb justify-content-center">
                                                <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                                            </ol>
                                        </div>
                                        <div aria-label="breadcrumb">
                                            <ol className="breadcrumb justify-content-center">
                                                <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                                <li className="breadcrumb-item active" aria-current="page">Application</li>
                                            </ol>
                                        </div>
                                        <div aria-label="breadcrumb">
                                            <ol className="breadcrumb justify-content-center">
                                                <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                                <li className="breadcrumb-item"><a href="#">Application </a></li>
                                                <li className="breadcrumb-item active" aria-current="page">Profile</li>
                                            </ol>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={12}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>Breadcrumbs Align Center</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <ul className="breadcrumb-style1">
                                            <li className="bg-primary">test 1</li>
                                            <li className="bg-secondary">test 2</li>
                                            <li className="bg-success">test 3</li>
                                            <li className="bg-warning">test 4</li>
                                            <li className="bg-info">test 5</li>
                                            <li className="bg-danger">test 6                   </li>
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
