import React from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from 'react-bootstrap';
import PageBreadcrumb from '../componets/PageBreadcrumb';
import IMAGE_URLS from "/src/pages/api/Imgconfig.js";

export default function Element_Timeline_Two() {
  return (
    <>
            <div className="themebody-wrap">
                {/* theme body start */}
                <PageBreadcrumb pagename="Timeline"/>
                {/* theme body end */}
                {/* theme body start */}
                <div className="theme-body" data-simplebar>
                    <Container fluid>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <div className="timeline timeline-left">
                                            <div className="timeline-grid">
                                                <div className="icon-wrap">
                                                    <img className="img-fluid" src={IMAGE_URLS['avtar/1.jpg']} />
                                                </div>
                                                <div className="timeline-content">
                                                    <h3>Dr. Anna Mull</h3>
                                                    <div className="timeline-date">
                                                        <i className="fa fa-calendar"></i>10,feb,2023
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
                                                    <Link className="btn btn-md btn-primary" href="#!">Read More</Link>
                                                </div>
                                            </div>
                                            <div className="timeline-grid">
                                                <div className="icon-wrap">
                                                    <img className="img-fluid" src={IMAGE_URLS['avtar/1.jpg']} />
                                                </div>
                                                <div className="timeline-content">
                                                    <h3>Dr. Hal Appeno</h3>
                                                    <div className="timeline-date">
                                                        <i className="fa fa-calendar"></i>05,feb,2023
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
                                                    <Link className="btn btn-md btn-primary" href="#!">Read More</Link>
                                                </div>
                                            </div>
                                            <div className="timeline-grid">
                                                <div className="icon-wrap">
                                                    <img className="img-fluid" src={IMAGE_URLS['avtar/1.jpg']} />
                                                </div>
                                                <div className="timeline-content">
                                                    <h3>Dr. Pat Agonia</h3>
                                                    <div className="timeline-date">
                                                        <i className="fa fa-calendar"></i>01,jan,2023
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
                                                    <Link className="btn btn-md btn-primary" href="#!">Read More</Link>
                                                </div>
                                            </div>
                                            <div className="timeline-grid">
                                                <div className="icon-wrap">
                                                    <img className="img-fluid" src={IMAGE_URLS['avtar/1.jpg']} />
                                                </div>
                                                <div className="timeline-content">
                                                    <h3>Dr. Paul Molive</h3>
                                                    <div className="timeline-date">
                                                        <i className="fa fa-calendar"></i>05,March,2023
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
                                                    <Link className="btn btn-md btn-primary" href="#!">Read More</Link>
                                                </div>
                                            </div>
                                            <div className="timeline-grid">
                                                <div className="icon-wrap">
                                                    <img className="img-fluid" src={IMAGE_URLS['avtar/1.jpg']} />
                                                </div>
                                                <div className="timeline-content">
                                                    <h3>Dr. Polly Tech</h3>
                                                    <div className="timeline-date">
                                                        <i className="fa fa-calendar"></i>28,April,2023
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
                                                    <Link className="btn btn-md btn-primary" href="#!">Read More</Link>
                                                </div>
                                            </div>
                                            <div className="timeline-grid">
                                                <div className="icon-wrap">
                                                    <img className="img-fluid" src={IMAGE_URLS['avtar/1.jpg']} />
                                                </div>
                                                <div className="timeline-content">
                                                    <h3>Dr. Poppa Cherry</h3>
                                                    <div className="timeline-date">
                                                        <i className="fa fa-calendar"></i>10,jun,2023
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
                                                    <Link className="btn btn-md btn-primary" href="#!">Read More</Link>
                                                </div>
                                            </div>
                                        </div>
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
