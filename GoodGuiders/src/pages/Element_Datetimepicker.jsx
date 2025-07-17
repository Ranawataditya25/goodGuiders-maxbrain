import React, { useState } from "react";
import { Container, Row, Col, Card, InputGroup } from 'react-bootstrap';
import DatePicker from "react-multi-date-picker";

import PageBreadcrumb from '../componets/PageBreadcrumb';

export default function Element_Datetimepicker() {
    const [startDate, setStartDate] = useState(new Date());
    const today = new Date()
    const tomorrow = new Date()


    const [values, setValues] = useState([today, tomorrow]);
    const [date, setDate] = useState("2020/12/04")
    return (
        <>
            <div className="themebody-wrap">
                {/* breadcrumb start */}
                <PageBreadcrumb pagename="Element_Datetimepicker" />
                {/* breadcrumb end */}
                {/* theme body start */}
                <div className="theme-body codex-calendar">
                    <Container fluid>
                        <Row>
                            <Col xxl={4} md={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>default</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <InputGroup>
                                            <DatePicker inputClass="form-control" placeholder="Default Datepicker" type="text" selected={startDate} onChange={(date) => setStartDate(date)} />
                                        </InputGroup >
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={4} md={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>multiple dates</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <InputGroup>
                                            <DatePicker inputClass="form-control" type="text" placeholder="Multiple Dates Select" multiple value={values} onChange={setValues} />
                                        </InputGroup >
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={4} md={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>Month selection</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <InputGroup>
                                            <DatePicker inputClass="form-control" placeholder="Month selection" onlyMonthPicker format="MMMM YYYY" />
                                        </InputGroup >

                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={4} md={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>Minimum and maximum dates</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <InputGroup>
                                            <DatePicker inputClass="form-control" placeholder="min &amp; max date" value={date} onChange={setDate} minDate="2020/11/20" maxDate="2021/01/20" />
                                        </InputGroup >
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={4} md={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>Range of dates</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <InputGroup>
                                            <DatePicker inputClass="form-control" placeholder="Range of dates" range dateSeparator=" to " />
                                        </InputGroup >
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
