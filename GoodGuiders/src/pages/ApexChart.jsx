
import { Container, Row, Col, Card } from 'react-bootstrap';

import Chart from "react-apexcharts";
import PageBreadcrumb from '../componets/PageBreadcrumb';
import { Linesite, Areasite, Columnsite, Barsite, Mixsite, Timelinesite, Candelsticksite, Radialsite, Radarsite } from './js/ApexChart';

export default function ApexChart() {
    return (
        <>

            <div className="themebody-wrap">
                {/* breadcrumb start */}
                <PageBreadcrumb pagename="Apex Chart" />
                {/* breadcrumb end */}
                {/* theme body start */}
                <div className="theme-body">
                    <Container fluid>
                        <Row>
                            <Col xxl={4} md={6} className="col-xxl-4 cdx-xxl-50 col-md-6">
                                <Card className="card">
                                    <Card.Header>
                                        <h4>line chart</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <Chart options={Linesite} series={Linesite.series}  height={350} type='line' />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={4} md={6} className="col-xxl-4 cdx-xxl-50 col-md-6">
                                <Card className="card">
                                    <Card.Header>
                                        <h4>area chart</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                    <Chart options={Areasite} series={Areasite.series}  height={350} type='area' />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={4} md={6} className="col-xxl-4 cdx-xxl-50 col-md-6">
                                <Card className="card">
                                    <Card.Header>
                                        <h4>column chart</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                    <Chart options={Columnsite} series={Columnsite.series}  height={350} type='bar' />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={4} md={6} className="col-xxl-4 cdx-xxl-50 col-md-6">
                                <Card className="card">
                                    <Card.Header>
                                        <h4>bar chart</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <Chart options={Barsite} series={Barsite.series}  height={350} type='bar' />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={4} md={6} className="col-xxl-4 cdx-xxl-50 col-md-6">
                                <Card className="card">
                                    <Card.Header>
                                        <h4>mix chart</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                    <Chart options={Mixsite} series={Mixsite.series}  height={350} type='line' />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={4} md={6} className="col-xxl-4 cdx-xxl-50 col-md-6">
                                <Card className="card">
                                    <Card.Header>
                                        <h4>timeline chart</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                    <Chart options={Timelinesite} series={Timelinesite.series}  height={350} type='rangeBar' />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={4} md={6} className="col-xxl-4 cdx-xxl-50 col-md-6">
                                <Card className="card">
                                    <Card.Header>
                                        <h4>candel stick chart</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <div id="apex-candlechart"></div>
                                        <Chart options={Candelsticksite} series={Candelsticksite.series}  height={350} type='candlestick' />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={4} md={6} className="col-xxl-4 cdx-xxl-50 col-md-6">
                                <Card className="card">
                                    <Card.Header>
                                        <h4>radial chart</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <Chart options={Radialsite} series={Radialsite.series}  height={390} type='radialBar' />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={4} md={6} className="col-xxl-4 cdx-xxl-50 col-md-6">
                                <Card className="card">
                                    <Card.Header>
                                        <h4>radar chart</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                    <Chart options={Radarsite} series={Radarsite.series}  height={350} type='radar' />
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
