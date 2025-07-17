import { Container, Row, Col, Card } from 'react-bootstrap';

import { AgCharts } from "ag-charts-react";
import PageBreadcrumb from '../componets/PageBreadcrumb';
import { Linemorris, Areamorris, Barmorris, Stackbarmorris, Donutmorris } from './js/Morrishchart';

export default function Morrishchart() {
  return (
    <>
            <div className="themebody-wrap">
                {/* breadcrumb start */}
                <PageBreadcrumb pagename="Morrish Chart" />
                {/* breadcrumb end */}
                {/* theme body start */}
                <div className="theme-body">
                    <Container fluid>
                        <Row>
                            <Col md={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>line chart</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        {/* <div id="morrisline"></div> */}
                                        <AgCharts options={Linemorris} />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>area chart</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        {/* <div id="morrisarea"></div> */}
                                        <AgCharts options={Areamorris} />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>bar chart</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        {/* <div id="morrisbar"></div> */}
                                        <AgCharts options={Barmorris} />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>Stacked Bar chart</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        {/* <div id="morrisbarstacked"> </div> */}
                                        <AgCharts options={Stackbarmorris} />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>donut chart</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <div id="morrisdonut"></div>
                                        <AgCharts options={Donutmorris} />
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
