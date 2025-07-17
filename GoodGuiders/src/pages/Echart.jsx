import { Container, Row, Col, Card } from 'react-bootstrap';
import ReactECharts from 'echarts-for-react';
import PageBreadcrumb from '../componets/PageBreadcrumb';
import { Linechart, Areachart, Barchart, Doughnutchart, Scatterchart, Gaugechart } from './js/Echart';

export default function Echart() {
  return (
    <>
            <div className="themebody-wrap">
                {/* breadcrumb start */}
                <PageBreadcrumb pagename="Echart" />
                {/* breadcrumb end */}
                {/* theme body start */}
                <div className="theme-body">
                    <Container fluid>
                        <Row>
                            <Col md={6}>
                                <Card className="card">
                                    <Card.Header>
                                        <h4>line chart</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <ReactECharts option={Linechart} height={350} />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className="card">
                                    <Card.Header>
                                        <h4>area chart</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <ReactECharts option={Areachart} height={350} />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className="card">
                                    <Card.Header>
                                        <h4>bar chart</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <ReactECharts option={Barchart} height={350} />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className="card">
                                    <Card.Header>
                                        <h4>doughnut chart</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <ReactECharts option={Doughnutchart} height={350} />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className="card">
                                    <Card.Header>
                                        <h4>Scatter chart</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <ReactECharts option={Scatterchart} height={350} />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className="card">
                                    <Card.Header>
                                        <h4>gauge chart</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <ReactECharts option={Gaugechart} height={350} />
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
