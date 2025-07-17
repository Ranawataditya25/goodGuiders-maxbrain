import * as React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import PageBreadcrumb from '../componets/PageBreadcrumb';
import IMAGE_URLS from "/src/pages/api/Imgconfig.js";

export default function Element_Avtar() {
  return (
    <>
            <div className="themebody-wrap">
                {/* breadcrumb start */}
                <PageBreadcrumb pagename="Avtar" />
                {/* breadcrumb end */}
                {/* theme body start */}
                <div className="theme-body cdxshopping-cart">
                    <Container fluid>
                        <Row>
                            <Col sm={12}>
                                <Card>
                                    <Card.Header>
                                        <h4>default avtar</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <ul className="avtar-list">
                                            <li>
                                                <img className="img-fluid" src={IMAGE_URLS['avtar/1.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid" src={IMAGE_URLS['avtar/2.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid" src={IMAGE_URLS['avtar/3.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid" src={IMAGE_URLS['avtar/4.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid" src={IMAGE_URLS['avtar/5.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid" src={IMAGE_URLS['avtar/6.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid" src={IMAGE_URLS['avtar/7.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid" src={IMAGE_URLS['avtar/8.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid" src={IMAGE_URLS['avtar/9.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid" src={IMAGE_URLS['avtar/10.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid" src={IMAGE_URLS['avtar/11.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid" src={IMAGE_URLS['avtar/12.jpg']} alt="" />
                                            </li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={12}>
                                <Card>
                                    <Card.Header>
                                        <h4>rounded avtar</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <ul className="avtar-list">
                                            <li>
                                                <img className="img-fluid rounded-50" src={IMAGE_URLS['avtar/1.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid rounded-50" src={IMAGE_URLS['avtar/2.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid rounded-50" src={IMAGE_URLS['avtar/3.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid rounded-50" src={IMAGE_URLS['avtar/4.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid rounded-50" src={IMAGE_URLS['avtar/5.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid rounded-50" src={IMAGE_URLS['avtar/6.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid rounded-50" src={IMAGE_URLS['avtar/7.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid rounded-50" src={IMAGE_URLS['avtar/8.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid rounded-50" src={IMAGE_URLS['avtar/9.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid rounded-50" src={IMAGE_URLS['avtar/10.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid rounded-50" src={IMAGE_URLS['avtar/11.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid rounded-50" src={IMAGE_URLS['avtar/12.jpg']} alt="" />
                                            </li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={12}>
                                <Card>
                                    <Card.Header>
                                        <h4>sizing avtar</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <ul className="avtar-list">
                                            <li>
                                                <img className="img-fluid" src={IMAGE_URLS['avtar/1.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid w-90" src={IMAGE_URLS['avtar/2.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid w-85" src={IMAGE_URLS['avtar/3.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid w-80" src={IMAGE_URLS['avtar/4.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid w-75" src={IMAGE_URLS['avtar/5.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid w-70" src={IMAGE_URLS['avtar/6.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid w-65" src={IMAGE_URLS['avtar/7.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid w-60" src={IMAGE_URLS['avtar/8.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid w-55" src={IMAGE_URLS['avtar/9.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid w-50" src={IMAGE_URLS['avtar/10.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid w-45" src={IMAGE_URLS['avtar/11.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid w-40" src={IMAGE_URLS['avtar/12.jpg']} alt="" />
                                            </li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={12}>
                                <Card>
                                    <Card.Header>
                                        <h4>group avtar</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <ul className="avtar-list group-avtar">
                                            <li>
                                                <img className="img-fluid rounded-50" src={IMAGE_URLS['avtar/1.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid rounded-50" src={IMAGE_URLS['avtar/2.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid rounded-50" src={IMAGE_URLS['avtar/3.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid rounded-50" src={IMAGE_URLS['avtar/4.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid rounded-50" src={IMAGE_URLS['avtar/5.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid rounded-50" src={IMAGE_URLS['avtar/6.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid rounded-50" src={IMAGE_URLS['avtar/7.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid rounded-50" src={IMAGE_URLS['avtar/8.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid rounded-50" src={IMAGE_URLS['avtar/9.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid rounded-50" src={IMAGE_URLS['avtar/10.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid rounded-50" src={IMAGE_URLS['avtar/11.jpg']} alt="" />
                                            </li>
                                            <li>
                                                <img className="img-fluid rounded-50" src={IMAGE_URLS['avtar/12.jpg']} alt="" />
                                            </li>
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
