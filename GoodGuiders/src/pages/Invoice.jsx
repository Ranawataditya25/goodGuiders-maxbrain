import React from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Card, Container } from 'react-bootstrap';
import PageBreadcrumb from '../componets/PageBreadcrumb';
import logo from '/src/assets/images/logo/icon-logo.png';

export default function Invoice() {
    return (
        <>
        <div className="themebody-wrap">
            {/* Breadcrumb Start */}
            <PageBreadcrumb pagename="Invoice" />
            {/* Breadcrumb End */}
            {/* theme body start */}
            <div className="theme-body codex-chat">
                <Container fluid>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body className="cdx-invoice">
                                    <div id="cdx-invoice">
                                        <div className="head-invoice">
                                            <div className="invoice-brand">
                                                <div className="codex-brand">
                                                    <Link className="codexbrand-logo">
                                                        <img className="img-fluid" src={logo} alt="invoice-logo" />
                                                        <span className="ms-2">Good Guiders</span>
                                                    </Link>
                                                </div>
                                                <ul className="contact-list">
                                                    <li>
                                                        <p>Email : ABCER@gmail.com,<br /> CA 54656<br /><b>P:</b> +12345647859</p>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="invoice-user">
                                                <h5>Billed to:</h5>
                                                <ul className="detail-list">
                                                    <li>
                                                        name :<span>Mark Wongar</span></li>
                                                    <li>
                                                        Phone :<span>+123585844859</span></li>
                                                    <li>Address : <span>368 mega get , medixo store</span></li>
                                                    <li>invoice date : <span> 21/3/2022</span></li>
                                                    <li>invoice no : <span>21/3/2022 </span></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="body-invoice">
                                            <div className="table-responsive">
                                                <table className="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>No</th>
                                                            <th>Particulars</th>
                                                            <th>Charges</th>
                                                            <th>Discount</th>
                                                            <th>Amout </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>01</td>
                                                            <td>Biology</td>
                                                            <td>$90</td>
                                                            <td>$10</td>
                                                            <td>$80</td>
                                                        </tr>
                                                        <tr>
                                                            <td>02</td>
                                                            <td>Nursign</td>
                                                            <td>$150</td>
                                                            <td>$15</td>
                                                            <td>$135</td>
                                                        </tr>
                                                        <tr>
                                                            <td>03</td>
                                                            <td>Biology</td>
                                                            <td>$90</td>
                                                            <td>1</td>
                                                            <td>$180</td>
                                                        </tr>
                                                        <tr>
                                                            <td>04</td>
                                                            <td>Biology</td>
                                                            <td>$200</td>
                                                            <td>$20</td>
                                                            <td>$180</td>
                                                        </tr>
                                                        <tr>
                                                            <td>05</td>
                                                            <td>Biology </td>
                                                            <td>$535</td>
                                                            <td>$35</td>
                                                            <td>$500</td>
                                                        </tr>
                                                        <tr>
                                                            <td>06</td>
                                                            <td>Biology </td>
                                                            <td>$480</td>
                                                            <td>$50</td>
                                                            <td>$440</td>
                                                        </tr>
                                                        <tr>
                                                            <td>07</td>
                                                            <td>Biology </td>
                                                            <td>$700</td>
                                                            <td>$250</td>
                                                            <td>$450</td>
                                                        </tr>
                                                        <tr>
                                                            <td>08</td>
                                                            <td>Biology </td>
                                                            <td>$570</td>
                                                            <td>$170</td>
                                                            <td>$400</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>


                                        
                                        <div className="footer-invoice">
                                            <table className="table">
                                                <tr>
                                                    <td>Sub Total</td>
                                                    <td>$1400</td>
                                                </tr>
                                                <tr>
                                                    <td>tax</td>
                                                    <td>$250</td>
                                                </tr>
                                                <tr>
                                                    <td>Discount</td>
                                                    <td>$250</td>
                                                </tr>
                                                <tr>
                                                    <td>total Bill amout</td>
                                                    <td>$1550                 </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="invoice-action">
                                        <Link className="btn btn-primary">print invoice</Link>
                                        <Link className="btn btn-secondary ml-15">download invoice</Link>
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
