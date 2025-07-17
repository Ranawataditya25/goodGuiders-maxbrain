import React, { useState } from "react";
import { Container, Row, Col, Card, Form } from 'react-bootstrap';

import PageBreadcrumb from '../componets/PageBreadcrumb';

export default function Element_Switch() {
    const [checkedState, setCheckedState] = useState({});
    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;
        setCheckedState(prevState => ({
            ...prevState, [id]: checked
        }));
    };
  return (
    <>
    <div className="themebody-wrap">
        {/* breadcrumb start */}
        <PageBreadcrumb pagename="Switch" />
        {/* breadcrumb end */}
        {/* theme body start */}
        <div className="theme-body codex-calendar">
            <Container fluid>
                <Row>
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <h4>square switch</h4>
                            </Card.Header>
                            <Card.Body className="card-body">
                                <div className="d-flex flex-wrap gap-3">
                                    <Form.Check className='switch switch-primary' type="checkbox" id="squareswitchprimary" label="" checked={!!checkedState.squareswitchprimary} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch switch-secondary' type="checkbox" id="squareswitchsecondary" label="" checked={!!checkedState.squareswitchsecondary} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch switch-success' type="checkbox" id="squareswitchsuccess" label="" checked={!!checkedState.squareswitchsuccess} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch switch-info' type="checkbox" id="squareswitchinfo" label="" checked={!!checkedState.squareswitchinfo} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch switch-warning' type="checkbox" id="squareswitchwarning" label="" checked={!!checkedState.squareswitchwarning} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch switch-danger' type="checkbox" id="squareswitchdanger" label="" checked={!!checkedState.squareswitchdanger} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch switch-light' type="checkbox" id="squareswitchlight" label="" checked={!!checkedState.squareswitchlight} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch switch-dark' type="checkbox" id="squareswitchdark" label="" checked={!!checkedState.squareswitchdark} onChange={handleCheckboxChange} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <h4>rounded switch</h4>
                            </Card.Header>
                            <Card.Body className="card-body">
                                <div className="d-flex flex-wrap gap-3">
                                    <Form.Check className='switch round switch-primary' type="checkbox" id="roundswitchprimary" label="" checked={!!checkedState.roundswitchprimary} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round switch-secondary' type="checkbox" id="roundswitchsecondary" label="" checked={!!checkedState.roundswitchsecondary} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round switch-success' type="checkbox" id="roundswitchsuccess" label="" checked={!!checkedState.roundswitchsuccess} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round switch-info' type="checkbox" id="roundswitchinfo" label="" checked={!!checkedState.roundswitchinfo} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round switch-warning' type="checkbox" id="roundswitchwarning" label="" checked={!!checkedState.roundswitchwarning} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round switch-danger' type="checkbox" id="roundswitchdanger" label="" checked={!!checkedState.roundswitchdanger} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round switch-light' type="checkbox" id="roundswitchlight" label="" checked={!!checkedState.roundswitchlight} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round switch-dark' type="checkbox" id="roundswitchdark" label="" checked={!!checkedState.roundswitchdark} onChange={handleCheckboxChange} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <h4>cheked square switch</h4>
                            </Card.Header>
                            <Card.Body className="card-body">
                                <div className="d-flex flex-wrap gap-3">
                                    <div className="d-flex flex-wrap gap-3">
                                        <Form.Check className='switch switch-primary' type="checkbox" id="squareswitchprimary1" label="" checked={checkedState.squareswitchprimary1 ?? true} onChange={handleCheckboxChange} />
                                        <Form.Check className='switch switch-secondary' type="checkbox" id="squareswitchsecondary1" label="" checked={checkedState.squareswitchsecondary1 ?? true} onChange={handleCheckboxChange} />
                                        <Form.Check className='switch switch-success' type="checkbox" id="squareswitchsuccess1" label="" checked={checkedState.squareswitchsuccess1 ?? true} onChange={handleCheckboxChange} />
                                        <Form.Check className='switch switch-info' type="checkbox" id="squareswitchinfo1" label="" checked={checkedState.squareswitchinfo1 ?? true} onChange={handleCheckboxChange} />
                                        <Form.Check className='switch switch-warning' type="checkbox" id="squareswitchwarning1" label="" checked={checkedState.squareswitchwarning1 ?? true} onChange={handleCheckboxChange} />
                                        <Form.Check className='switch switch-danger' type="checkbox" id="squareswitchdanger1" label="" checked={checkedState.squareswitchdanger1 ?? true} onChange={handleCheckboxChange} />
                                        <Form.Check className='switch switch-light' type="checkbox" id="squareswitchlight1" label="" checked={checkedState.squareswitchlight1 ?? true} onChange={handleCheckboxChange} />
                                        <Form.Check className='switch switch-dark' type="checkbox" id="squareswitchdark1" label="" checked={checkedState.squareswitchdark1 ?? true} onChange={handleCheckboxChange} />
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <h4>cheked rounded switch</h4>
                            </Card.Header>
                            <Card.Body className="card-body">
                                <div className="d-flex flex-wrap gap-3">
                                    <Form.Check className='switch round switch-primary' type="checkbox" id="roundswitchprimary1" label="" checked={checkedState.roundswitchprimary1 ?? true} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round switch-secondary' type="checkbox" id="roundswitchsecondary1" label="" checked={checkedState.roundswitchsecondary1 ?? true} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round switch-success' type="checkbox" id="roundswitchsuccess1" label="" checked={checkedState.roundswitchsuccess1 ?? true} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round switch-info' type="checkbox" id="roundswitchinfo1" label="" checked={checkedState.roundswitchinfo1 ?? true} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round switch-warning' type="checkbox" id="roundswitchwarning1" label="" checked={checkedState.roundswitchwarning1 ?? true} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round switch-danger' type="checkbox" id="roundswitchdanger1" label="" checked={checkedState.roundswitchdanger1 ?? true} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round switch-light' type="checkbox" id="roundswitchlight1" label="" checked={checkedState.roundswitchlight1 ?? true} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round switch-dark' type="checkbox" id="roundswitchdark1" label="" checked={checkedState.roundswitchdark1 ?? true} onChange={handleCheckboxChange} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <h4>disabled square switch</h4>
                            </Card.Header>
                            <Card.Body className="card-body">
                                <div className="d-flex flex-wrap gap-3">
                                    <Form.Check className='switch switch-primary' disabled type="checkbox" id="disabledswitchprimary" label="" checked={!!checkedState.disabledswitchprimary} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch switch-secondary' disabled type="checkbox" id="disabledswitchsecondary" label="" checked={!!checkedState.disabledswitchsecondary} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch switch-success' disabled type="checkbox" id="disabledswitchsuccess" label="" checked={!!checkedState.disabledswitchsuccess} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch switch-info' disabled type="checkbox" id="disabledswitchinfo" label="" checked={!!checkedState.disabledswitchinfo} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch switch-warning' disabled type="checkbox" id="disabledswitchwarning" label="" checked={!!checkedState.disabledswitchwarning} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch switch-danger' disabled type="checkbox" id="disabledswitchdanger" label="" checked={!!checkedState.disabledswitchdanger} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch switch-light' disabled type="checkbox" id="disabledswitchlight" label="" checked={!!checkedState.disabledswitchlight} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch switch-dark' disabled type="checkbox" id="disabledswitchdark" label="" checked={!!checkedState.disabledswitchdark} onChange={handleCheckboxChange} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <h4>disabled rounded switch</h4>
                            </Card.Header>
                            <Card.Body className="card-body">
                                <div className="d-flex flex-wrap gap-3">
                                    <Form.Check className='switch round switch-primary' disabled type="checkbox" id="disabledswitchprimary" label="" checked={!!checkedState.disabledswitchprimary} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round switch-secondary' disabled type="checkbox" id="disabledswitchsecondary" label="" checked={!!checkedState.disabledswitchsecondary} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round switch-success' disabled type="checkbox" id="disabledswitchsuccess" label="" checked={!!checkedState.disabledswitchsuccess} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round switch-info' disabled type="checkbox" id="disabledswitchinfo" label="" checked={!!checkedState.disabledswitchinfo} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round switch-warning' disabled type="checkbox" id="disabledswitchwarning" label="" checked={!!checkedState.disabledswitchwarning} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round switch-danger' disabled type="checkbox" id="disabledswitchdanger" label="" checked={!!checkedState.disabledswitchdanger} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round switch-light' disabled type="checkbox" id="disabledswitchlight" label="" checked={!!checkedState.disabledswitchlight} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round switch-dark' disabled type="checkbox" id="disabledswitchdark" label="" checked={!!checkedState.disabledswitchdark} onChange={handleCheckboxChange} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <h4>square switch</h4>
                            </Card.Header>
                            <Card.Body className="card-body">
                                <div className="d-flex flex-wrap gap-3">
                                    <Form.Check className='switch outline-primary' type="checkbox" id="outlineswitchprimary" label="" checked={!!checkedState.outlineswitchprimary} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch outline-secondary' type="checkbox" id="outlineswitchsecondary" label="" checked={!!checkedState.outlineswitchsecondary} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch outline-success' type="checkbox" id="outlineswitchsuccess" label="" checked={!!checkedState.outlineswitchsuccess} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch outline-info' type="checkbox" id="outlineswitchinfo" label="" checked={!!checkedState.outlineswitchinfo} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch outline-warning' type="checkbox" id="outlineswitchwarning" label="" checked={!!checkedState.outlineswitchwarning} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch outline-danger' type="checkbox" id="outlineswitchdanger" label="" checked={!!checkedState.outlineswitchdanger} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch outline-light' type="checkbox" id="outlineswitchlight" label="" checked={!!checkedState.outlineswitchlight} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch outline-dark' type="checkbox" id="outlineswitchdark" label="" checked={!!checkedState.outlineswitchdark} onChange={handleCheckboxChange} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <h4>rounded switch</h4>
                            </Card.Header>
                            <Card.Body className="card-body">
                                <div className="d-flex flex-wrap gap-3">
                                    <Form.Check className='switch round outline-primary' type="checkbox" id="outlineprimary" label="" checked={!!checkedState.outlineprimary} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round outline-secondary' type="checkbox" id="outlinesecondary" label="" checked={!!checkedState.outlinesecondary} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round outline-success' type="checkbox" id="outlinesuccess" label="" checked={!!checkedState.outlinesuccess} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round outline-info' type="checkbox" id="outlineinfo" label="" checked={!!checkedState.outlineinfo} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round outline-warning' type="checkbox" id="outlinewarning" label="" checked={!!checkedState.outlinewarning} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round outline-danger' type="checkbox" id="outlinedanger" label="" checked={!!checkedState.outlinedanger} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round outline-light' type="checkbox" id="outlinelight" label="" checked={!!checkedState.outlinelight} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch round outline-dark' type="checkbox" id="outlinedark" label="" checked={!!checkedState.outlinedark} onChange={handleCheckboxChange} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <h4>square switch</h4>
                            </Card.Header>
                            <Card.Body className="card-body">
                                <div className="d-flex flex-wrap gap-3">
                                    <Form.Check className='switch with-icon switch-primary' type="checkbox" id="iconprimary" label="" checked={!!checkedState.iconprimary} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch with-icon switch-secondary' type="checkbox" id="iconsecondary" label="" checked={!!checkedState.iconsecondary} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch with-icon switch-success' type="checkbox" id="iconsuccess" label="" checked={!!checkedState.iconsuccess} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch with-icon switch-info' type="checkbox" id="iconinfo" label="" checked={!!checkedState.iconinfo} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch with-icon switch-warning' type="checkbox" id="iconwarning" label="" checked={!!checkedState.iconwarning} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch with-icon switch-danger' type="checkbox" id="icondanger" label="" checked={!!checkedState.icondanger} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch with-icon switch-light' type="checkbox" id="iconlight" label="" checked={!!checkedState.iconlight} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch with-icon switch-dark' type="checkbox" id="icondark" label="" checked={!!checkedState.icondark} onChange={handleCheckboxChange} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <h4>square switch</h4>
                            </Card.Header>
                            <Card.Body className="card-body">
                                <div className="d-flex flex-wrap gap-3">
                                    <Form.Check className='switch with-icon round switch-primary' type="checkbox" id="roundiconprimary" label="" checked={!!checkedState.roundiconprimary} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch with-icon round switch-secondary' type="checkbox" id="roundiconsecondary" label="" checked={!!checkedState.roundiconsecondary} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch with-icon round switch-success' type="checkbox" id="roundiconsuccess" label="" checked={!!checkedState.roundiconsuccess} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch with-icon round switch-info' type="checkbox" id="roundiconinfo" label="" checked={!!checkedState.roundiconinfo} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch with-icon round switch-warning' type="checkbox" id="roundiconwarning" label="" checked={!!checkedState.roundiconwarning} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch with-icon round switch-danger' type="checkbox" id="roundicondanger" label="" checked={!!checkedState.roundicondanger} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch with-icon round switch-light' type="checkbox" id="roundiconlight" label="" checked={!!checkedState.roundiconlight} onChange={handleCheckboxChange} />
                                    <Form.Check className='switch with-icon round switch-dark' type="checkbox" id="roundicondark" label="" checked={!!checkedState.roundicondark} onChange={handleCheckboxChange} />
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
