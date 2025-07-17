import React from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from 'react-bootstrap';
import PageBreadcrumb from '../componets/PageBreadcrumb';

export default function Element_pricing() {
    return (
        <>
            <div className="themebody-wrap">
                {/* theme body start */}
                <PageBreadcrumb pagename="Element Pricing" />
                {/* theme body end */}
                {/* theme body start */}
                <div className="theme-body">
                    <Container fluid>
                        <Row className="pricing-grid">
                            <Col sm={12}>
                                <h4 className="inner-title">pricing   simple</h4>
                            </Col>
                            <Col xxl={3} sm={6} className="cdx-xl-50">
                                <div className="codex-pricingtbl">
                                    <div className="price-header">
                                        <h2>Standard</h2>
                                        <div className="price-value">$10.00<span>/ month</span></div>
                                    </div>
                                    <ul className="cdxprice-list">
                                        <li><span>10GB</span>Disk Space</li>
                                        <li><span>10</span>Email Accounts</li>
                                        <li><span>5</span>subdomailns</li>
                                        <li><span>10</span>domains</li>
                                        <li><span>10GB</span>bandwidth</li>
                                    </ul>
                                    <Link className="btn btn-primary" >Select Plan</Link>
                                </div>
                            </Col>
                            <Col xxl={3} sm={6} className="cdx-xl-50">
                                <div className="codex-pricingtbl">
                                    <div className="price-header">
                                        <h2>business</h2>
                                        <div className="price-value">$20.00<span>/ month</span></div>
                                    </div>
                                    <ul className="cdxprice-list">
                                        <li><span>20GB</span>Disk Space</li>
                                        <li><span>20</span>Email Accounts</li>
                                        <li><span>10</span>subdomailns</li>
                                        <li><span>20</span>domains</li>
                                        <li><span>20GB</span>bandwidth</li>
                                    </ul>
                                    <Link className="btn btn-primary" >Select Plan</Link>
                                </div>
                            </Col>
                            <Col xxl={3} sm={6} className="cdx-xl-50">
                                <div className="codex-pricingtbl">
                                    <div className="price-header">
                                        <h2>priemimum</h2>
                                        <div className="price-value">$30.00<span>/ month</span></div>
                                    </div>
                                    <ul className="cdxprice-list">
                                        <li><span>20GB</span>Disk Space</li>
                                        <li><span>20</span>Email Accounts</li>
                                        <li><span>10</span>subdomailns</li>
                                        <li><span>20</span>domains</li>
                                        <li><span>30GB</span>bandwidth</li>
                                    </ul>
                                    <Link className="btn btn-primary" >Select Plan</Link>
                                </div>
                            </Col>
                            <Col xxl={3} sm={6} className="cdx-xl-50">
                                <div className="codex-pricingtbl">
                                    <div className="price-header">
                                        <h2>extra</h2>
                                        <div className="price-value">$40.00<span>/ month</span></div>
                                    </div>
                                    <ul className="cdxprice-list">
                                        <li><span>20GB</span>Disk Space</li>
                                        <li><span>20</span>Email Accounts</li>
                                        <li><span>10</span>subdomailns</li>
                                        <li><span>20</span>domains</li>
                                        <li><span>40GB</span>bandwidth</li>
                                    </ul>
                                    <Link className="btn btn-primary" >Select Plan</Link>
                                </div>
                            </Col>
                        </Row>
                        <Row className="pricing-grid">
                            <Col sm={12}>
                                <h4 className="inner-title">pricing  primary</h4>
                            </Col>
                            <Col xxl={3} sm={6} className="cdx-xl-50">
                                <div className="codex-pricingadvance">
                                    <div className="price-header">
                                        <h3>Standard</h3>
                                        <div className="price-value">$10.00<span>/ month</span></div>
                                    </div>
                                    <div className="price-icon"><i className=" fa fa-motorcycle"></i></div>
                                    <ul className="cdxprice-list">
                                        <li><span>10GB</span>Disk Space</li>
                                        <li><span>10</span>Email Accounts</li>
                                        <li><span>5</span>subdomailns</li>
                                        <li><span>10</span>domains</li>
                                        <li><span>10GB</span>bandwidth</li>
                                    </ul>
                                    <Link className="btn btn-primary" >Select Plan</Link>
                                </div>
                            </Col>
                            <Col xxl={3} sm={6} className="cdx-xl-50">
                                <div className="codex-pricingadvance">
                                    <div className="price-header">
                                        <h3>business</h3>
                                        <div className="price-value">$20.00<span>/ month</span></div>
                                    </div>
                                    <div className="price-icon"><i className="fa fa-car"></i></div>
                                    <ul className="cdxprice-list">
                                        <li><span>20GB</span>Disk Space</li>
                                        <li><span>20</span>Email Accounts</li>
                                        <li><span>10</span>subdomailns</li>
                                        <li><span>20</span>domains</li>
                                        <li><span>20GB</span>bandwidth</li>
                                    </ul>
                                    <Link className="btn btn-primary" >Select Plan</Link>
                                </div>
                            </Col>
                            <Col xxl={3} sm={6} className="cdx-xl-50">
                                <div className="codex-pricingadvance">
                                    <div className="price-header">
                                        <h3>priemimum</h3>
                                        <div className="price-value">$30.00<span>/ month</span></div>
                                    </div>
                                    <div className="price-icon"><i className="fa fa-train"></i></div>
                                    <ul className="cdxprice-list">
                                        <li><span>20GB</span>Disk Space</li>
                                        <li><span>20</span>Email Accounts</li>
                                        <li><span>10</span>subdomailns</li>
                                        <li><span>20</span>domains</li>
                                        <li><span>30GB</span>bandwidth</li>
                                    </ul>
                                    <Link className="btn btn-primary" >Select Plan</Link>
                                </div>
                            </Col>
                            <Col xxl={3} sm={6} className="cdx-xl-50">
                                <div className="codex-pricingadvance">
                                    <div className="price-header">
                                        <h3>extra</h3>
                                        <div className="price-value">$40.00<span>/ month</span></div>
                                    </div>
                                    <div className="price-icon"><i className="fa fa-rocket"></i></div>
                                    <ul className="cdxprice-list">
                                        <li><span>20GB</span>Disk Space</li>
                                        <li><span>20</span>Email Accounts</li>
                                        <li><span>10</span>subdomailns</li>
                                        <li><span>20</span>domains</li>
                                        <li><span>40GB</span>bandwidth</li>
                                    </ul>
                                    <Link className="btn btn-primary" >Select Plan</Link>
                                </div>
                            </Col>
                        </Row>
                        <Row className="pricing-grid">
                            <Col sm={12}>
                                <h4 className="inner-title">pricing  advance</h4>
                            </Col>
                            <Col xxl={3} sm={6} className="cdx-xl-50">
                                <div className="codex-pricingadvance">
                                    <div className="price-header">
                                        <h3>Standard</h3>
                                        <div className="price-value">$10.00<span>/ month</span></div>
                                    </div>
                                    <div className="price-icon"><i className=" fa fa-motorcycle"></i></div>
                                    <ul className="cdxprice-list">
                                        <li><span>10GB</span>Disk Space</li>
                                        <li><span>10</span>Email Accounts</li>
                                        <li><span>5</span>subdomailns</li>
                                        <li><span>10</span>domains</li>
                                        <li><span>10GB</span>bandwidth</li>
                                    </ul>
                                    <Link className="btn btn-primary" >Select Plan</Link>
                                </div>
                            </Col>
                            <Col xxl={3} sm={6} className="cdx-xl-50">
                                <div className="codex-pricingadvance secondary">
                                    <div className="price-header">
                                        <h3>business</h3>
                                        <div className="price-value">$20.00<span>/ month</span></div>
                                    </div>
                                    <div className="price-icon"><i className="fa fa-car"></i></div>
                                    <ul className="cdxprice-list">
                                        <li><span>20GB</span>Disk Space</li>
                                        <li><span>20</span>Email Accounts</li>
                                        <li><span>10</span>subdomailns</li>
                                        <li><span>20</span>domains</li>
                                        <li><span>20GB</span>bandwidth</li>
                                    </ul>
                                    <Link className="btn btn-secondary" >Select Plan</Link>
                                </div>
                            </Col>
                            <Col xxl={3} sm={6} className="cdx-xl-50">
                                <div className="codex-pricingadvance info">
                                    <div className="price-header">
                                        <h3>priemimum</h3>
                                        <div className="price-value">$30.00<span>/ month</span></div>
                                    </div>
                                    <div className="price-icon"><i className="fa fa-train"></i></div>
                                    <ul className="cdxprice-list">
                                        <li><span>20GB</span>Disk Space</li>
                                        <li><span>20</span>Email Accounts</li>
                                        <li><span>10</span>subdomailns</li>
                                        <li><span>20</span>domains</li>
                                        <li><span>30GB</span>bandwidth</li>
                                    </ul>
                                    <Link className="btn btn-info" >Select Plan</Link>
                                </div>
                            </Col>
                            <Col xxl={3} sm={6} className="cdx-xl-50">
                                <div className="codex-pricingadvance warning">
                                    <div className="price-header">
                                        <h3>extra</h3>
                                        <div className="price-value">$40.00<span>/ month</span></div>
                                    </div>
                                    <div className="price-icon"><i className="fa fa-rocket"></i></div>
                                    <ul className="cdxprice-list">
                                        <li><span>20GB</span>Disk Space</li>
                                        <li><span>20</span>Email Accounts</li>
                                        <li><span>10</span>subdomailns</li>
                                        <li><span>20</span>domains</li>
                                        <li><span>40GB</span>bandwidth</li>
                                    </ul>
                                    <Link className="btn btn-warning" >Select Plan</Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                {/* theme body end */}
            </div>

        </>
    )
}
