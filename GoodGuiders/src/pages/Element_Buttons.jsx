import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

import PageBreadcrumb from '../componets/PageBreadcrumb';

export default function Element_Buttons() {
    // Initialize state with default values
    const [checkedState, setCheckedState] = useState({
        btncheck1: false,
        btncheck2: true,
        btncheck3: false
    });

    // Handler function to update state
    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        setCheckedState(prevState => ({
            ...prevState,
            [id]: checked
        }));
    };
    // Initialize state with default value
    const [selectedRadio, setSelectedRadio] = useState('btnradio2');

    // Handler function to update state
    const handleRadioChange = (event) => {
        setSelectedRadio(event.target.id);
    };
  return (
    <>
    <div className="themebody-wrap">
        {/* breadcrumb start */}
        <PageBreadcrumb pagename="Button" />
        {/* breadcrumb end */}
        {/* theme body start */}
        <div className="theme-body">
            <Container fluid className="element-buttons">
                <Row>
                    <Col xxl={6}>
                        <Card>
                            <div className="card-header">
                                <h4>Default Button</h4>
                            </div>
                            <div className="card-body">
                                <p className="card-title-desc mb-2">Use any of the available <code>.btn btn-*</code>&nbsp;classes quickly create a styled button. </p>
                                <Button variant="primary">Primary</Button>{' '}
                                <Button variant="secondary">Secondary</Button>{' '}
                                <Button variant="success">Success</Button>{' '}
                                <Button variant="warning">Warning</Button>{' '}
                                <Button variant="danger">Danger</Button>{' '}
                                <Button variant="info">Info</Button>{' '}
                                <Button variant="light">Light</Button>{' '}
                                <Button variant="dark">Dark</Button>
                            </div>
                        </Card>
                    </Col>
                    <Col xxl={6}>
                        <Card>
                            <div className="card-header">
                                <h4>Default Small Button</h4>
                            </div>
                            <div className="card-body">
                                <p className="card-title-desc mb-2">Add <code>.btn.btn-sm.btn-outline-*</code>&nbsp; for additional sizes. </p>
                                <Button className="btn btn-sm" variant="primary">Primary</Button>{' '}
                                <Button className="btn btn-sm" variant="secondary">Secondary</Button>{' '}
                                <Button className="btn btn-sm" variant="success">Success</Button>{' '}
                                <Button className="btn btn-sm" variant="warning">Warning</Button>{' '}
                                <Button className="btn btn-sm" variant="danger">Danger</Button>{' '}
                                <Button className="btn btn-sm" variant="info">Info</Button>{' '}
                                <Button className="btn btn-sm" variant="light">Light</Button>{' '}
                                <Button className="btn btn-sm" variant="dark">Dark</Button>
                            </div>
                        </Card>
                    </Col>
                    <Col xxl={6}>
                        <Card>
                            <div className="card-header">
                                <h4>Outline Button</h4>
                            </div>
                            <div className="card-body">
                                <p className="card-title-desc mb-2">Use any of the available <code>.btn.btn-outline-*</code>&nbsp;classes quickly create a styled button. </p>
                                <Button variant="outline-primary">Primary</Button>{' '}
                                <Button variant="outline-secondary">Secondary</Button>{' '}
                                <Button variant="outline-success">Success</Button>{' '}
                                <Button variant="outline-warning">Warning</Button>{' '}
                                <Button variant="outline-danger">Danger</Button>{' '}
                                <Button variant="outline-info">Info</Button>{' '}
                                <Button variant="outline-light">Light</Button>{' '}
                                <Button variant="outline-dark">Dark</Button>
                            </div>
                        </Card>
                    </Col>
                    <Col xxl={6}>
                        <Card>
                            <div className="card-header">
                                <h4>Outline Small Button</h4>
                            </div>
                            <div className="card-body">
                                <p className="card-title-desc mb-2">Use any of the available <code>.btn.btn-sm.btn-outline-*</code>&nbsp;classes quickly create a styled button. </p>
                                <Button className="btn btn-sm" variant="outline-primary">Primary</Button>{' '}
                                <Button className="btn btn-sm" variant="outline-secondary">Secondary</Button>{' '}
                                <Button className="btn btn-sm" variant="outline-success">Success</Button>{' '}
                                <Button className="btn btn-sm" variant="outline-warning">Warning</Button>{' '}
                                <Button className="btn btn-sm" variant="outline-danger">Danger</Button>{' '}
                                <Button className="btn btn-sm" variant="outline-info">Info</Button>{' '}
                                <Button className="btn btn-sm" variant="outline-light">Light</Button>{' '}
                                <Button className="btn btn-sm" variant="outline-dark">Dark</Button>
                            </div>
                        </Card>
                    </Col>
                    <Col xxl={6}>
                        <Card>
                            <div className="card-header">
                                <h4>Buttons Group</h4>
                            </div>
                            <div className="card-body overflow-hidden">
                                <p className="card-title-desc mb-2">Add button parent div <code>.btn-group</code>&nbsp;classes quickly create a styled button.</p>
                                <div className="btn-group">
                                    <Button variant="outline-primary">Primary</Button>{' '}
                                    <Button variant="outline-secondary">Secondary</Button>{' '}
                                    <Button variant="outline-success">Success</Button>{' '}
                                    <Button variant="outline-warning">Warning</Button>{' '}
                                    <Button variant="outline-danger">Danger</Button>{' '}
                                    <Button variant="outline-info">Info</Button>{' '}
                                    <Button variant="outline-light">Light</Button>{' '}
                                    <Button variant="outline-dark">Dark</Button>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col xxl={6}>
                        <Card>
                            <div className="card-header">
                                <h4>Default Large Button</h4>
                            </div>
                            <div className="card-body">
                                <p className="card-title-desc mb-2">Add <code>.btn.btn-lg.btn-outline-*</code>&nbsp; for additional sizes.</p>
                                <Button className="btn btn-lg" variant="outline-primary">Primary</Button>{' '}
                                <Button className="btn btn-lg" variant="outline-secondary">Secondary</Button>{' '}
                                <Button className="btn btn-lg" variant="outline-success">Success</Button>{' '}
                                <Button className="btn btn-lg" variant="outline-info">Info</Button>{' '}
                                <Button className="btn btn-lg" variant="outline-light">Light</Button>{' '}
                                <Button className="btn btn-lg" variant="outline-dark">Dark</Button>
                            </div>
                        </Card>
                    </Col>
                    <Col xxl={6}>
                        <Card>
                            <div className="card-header">
                                <h4>Rounded Button</h4>
                            </div>
                            <div className="card-body">
                                <p className="card-title-desc mb-2">Use any of the available <code>.btn.btn-rounded.btn-outline-*</code>&nbsp;classes quickly create a styled button. </p>

                                <Button className="btn-rounded" variant="primary">Primary</Button>{' '}
                                <Button className="btn-rounded" variant="secondary">Secondary</Button>{' '}
                                <Button className="btn-rounded" variant="success">Success</Button>{' '}
                                <Button className="btn-rounded" variant="warning">Warning</Button>{' '}
                                <Button className="btn-rounded" variant="danger">Danger</Button>{' '}
                                <Button className="btn-rounded" variant="info">Info</Button>{' '}
                                <Button className="btn-rounded" variant="light">Light</Button>{' '}
                                <Button className="btn-rounded" variant="dark">Dark</Button>
                            </div>
                        </Card>
                    </Col>
                    <Col xxl={6}>
                        <Card>
                            <div className="card-header">
                                <h4>Button with Icon</h4>
                            </div>
                            <div className="card-body">
                                <p className="card-title-desc mb-2">Add icon in button </p>
                                <Button variant="primary"> <i className="fa fa-smile-o me-1"></i>Primary</Button>{' '}

                                <Button variant="success"><i className="fa fa-check-circle-o me-1"></i>Success</Button>{' '}
                                <Button variant="warning"><i className="fa fa-exclamation-triangle me-1"></i>Warning</Button>{' '}
                                <Button variant="danger"><span className="spinner-border spinner-border-sm me-1"></span>Danger</Button>{' '}
                                <Button variant="light"><span className="spinner-border spinner-border-sm me-1"></span> Loading...</Button>{' '}
                                <Button variant="dark"><span className="spinner-grow spinner-grow-sm me-1"></span> Loading...</Button>
                            </div>
                        </Card>
                    </Col>
                    <Col xxl={6}>
                        <Card>
                            <div className="card-header">
                                <h4>Checkbox button group</h4>
                            </div>
                            <div className="card-body">
                                <p className="card-title-desc mb-2">Add button parent div <code>.btn-group</code>&nbsp;classes quickly create a styled button. </p>
                                <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                                    <Form.Check
                                        className="btn-check"
                                        id="btncheck1"
                                        type="checkbox"
                                        checked={checkedState.btncheck1}
                                        onChange={handleCheckboxChange}
                                    />
                                    <Form.Label className="btn btn-outline-primary" htmlFor="btncheck1">Checkbox 1</Form.Label>

                                    <Form.Check
                                        className="btn-check"
                                        id="btncheck2"
                                        type="checkbox"
                                        checked={checkedState.btncheck2}
                                        onChange={handleCheckboxChange}
                                    />
                                    <Form.Label className="btn btn-outline-primary" htmlFor="btncheck2">Checkbox 2</Form.Label>

                                    <Form.Check
                                        className="btn-check"
                                        id="btncheck3"
                                        type="checkbox"
                                        checked={checkedState.btncheck3}
                                        onChange={handleCheckboxChange}
                                    />
                                    <Form.Label className="btn btn-outline-primary" htmlFor="btncheck3">Checkbox 3</Form.Label>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col xxl={6}>
                        <Card>
                            <div className="card-header">
                                <h4>Radio button group</h4>
                            </div>
                            <div className="card-body">
                                <p className="card-title-desc mb-2">Add button parent div <code>.btn-group</code>&nbsp;classes quickly create a styled button. </p>
                                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                    <Form.Check
                                        className="btn-check"
                                        id="btnradio1"
                                        type="radio"
                                        name="btnradio"
                                        checked={selectedRadio === 'btnradio1'}
                                        onChange={handleRadioChange}
                                    />
                                    <Form.Label className="btn btn-outline-primary" htmlFor="btnradio1">
                                        Radio 1
                                    </Form.Label>

                                    <Form.Check
                                        className="btn-check"
                                        id="btnradio2"
                                        type="radio"
                                        name="btnradio"
                                        checked={selectedRadio === 'btnradio2'}
                                        onChange={handleRadioChange}
                                    />
                                    <Form.Label className="btn btn-outline-primary" htmlFor="btnradio2">
                                        Radio 2
                                    </Form.Label>

                                    <Form.Check
                                        className="btn-check"
                                        id="btnradio3"
                                        type="radio"
                                        name="btnradio"
                                        checked={selectedRadio === 'btnradio3'}
                                        onChange={handleRadioChange}
                                    />
                                    <Form.Label className="btn btn-outline-primary" htmlFor="btnradio3">
                                        Radio 3
                                    </Form.Label>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col xxl={6}>
                        <Card>
                            <div className="card-header">
                                <h4>Sizing button group</h4>
                            </div>
                            <div className="card-body">
                                <p className="card-title-desc mb-2">Add button parent div <code>.btn-group-lg || .btn-group-sm</code>&nbsp;classes quickly create a styled button. </p>
                                <div className="btn-group btn-group-lg me-1">
                                    <Button className="btn btn-primary" type="button">Left</Button>
                                    <Button className="btn btn-success" type="button">Middle</Button>
                                    <Button className="btn btn-primary" type="button">Right</Button>
                                </div>
                                <div className="btn-group btn-group-lg me-1">
                                    <Button className="btn btn-outline-primary" type="button">Left</Button>
                                    <Button className="btn btn-outline-success" type="button">Middle</Button>
                                    <Button className="btn btn-outline-primary" type="button">Right</Button>
                                </div>
                                <div className="btn-group me-1">
                                    <Button className="btn btn-primary" type="button">Left</Button>
                                    <Button className="btn btn-success" type="button">Middle</Button>
                                    <Button className="btn btn-primary" type="button">Right</Button>
                                </div>
                                <div className="btn-group me-1">
                                    <Button className="btn btn-outline-primary" type="button">Left</Button>
                                    <Button className="btn btn-outline-success" type="button">Middle</Button>
                                    <Button className="btn btn-outline-primary" type="button">Right</Button>
                                </div>
                                <div className="btn-group btn-group-sm me-1">
                                    <Button className="btn btn-primary" type="button">Left</Button>
                                    <Button className="btn btn-success" type="button">Middle</Button>
                                    <Button className="btn btn-primary" type="button">Right</Button>
                                </div>
                                <div className="btn-group btn-group-sm me-1">
                                    <Button className="btn btn-outline-primary" type="button">Left</Button>
                                    <Button className="btn btn-outline-success" type="button">Middle</Button>
                                    <Button className="btn btn-outline-primary" type="button">Right</Button>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col xxl={6}>
                        <Card>
                            <div className="card-header">
                                <h4>Vertical button group</h4>
                            </div>
                            <div className="card-body">
                                <p className="card-title-desc mb-2">Add button parent div <code>.btn-group-lg || .btn-group-sm && .btn-group-vertical</code>&nbsp;classes quickly create a styled button. </p>
                                <div className="btn-group-vertical btn-group-lg me-1">
                                    <Button className="btn btn-outline-primary" type="button">Left</Button>
                                    <Button className="btn btn-outline-primary" type="button">Middle</Button>
                                    <Button className="btn btn-outline-primary" type="button">Right</Button>
                                </div>
                                <div className="btn-group-vertical me-1">
                                    <Button className="btn btn-outline-primary" type="button">Left</Button>
                                    <Button className="btn btn-outline-primary" type="button">Middle</Button>
                                    <Button className="btn btn-outline-primary" type="button">Right</Button>
                                </div>
                                <div className="btn-group-vertical btn-group-sm me-1">
                                    <Button className="btn btn-outline-primary" type="button">Left</Button>
                                    <Button className="btn btn-outline-primary" type="button">Middle</Button>
                                    <Button className="btn btn-outline-primary" type="button">Right</Button>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col xxl={6}>
                        <Card>
                            <div className="card-header">
                                <h4>Button toolbar</h4>
                            </div>
                            <div className="card-body">
                                <p className="card-title-desc mb-2">
                                    Combine sets of button groups into button toolbars for more complex components. Use utility classes as needed to space out groups, buttons, and more.</p>
                                <div className="btn-toolbar">
                                    <div className="btn-group me-1" role="group" aria-label="First group">
                                        <Button className="btn btn-primary" type="button">1</Button>
                                        <Button className="btn btn-primary" type="button">2</Button>
                                        <Button className="btn btn-primary" type="button">3</Button>
                                        <Button className="btn btn-primary" type="button">4</Button>
                                    </div>
                                    <div className="btn-group me-1" role="group" aria-label="Second group">
                                        <Button className="btn btn-secondary" type="button">5</Button>
                                        <Button className="btn btn-secondary" type="button">6</Button>
                                        <Button className="btn btn-secondary" type="button">7</Button>
                                    </div>
                                    <div className="btn-group me-1" role="group" aria-label="Third group">
                                        <Button className="btn btn-info" type="button">8</Button>
                                    </div>
                                    <div className="btn-group" role="group" aria-label="Four group">
                                        <Button className="btn btn-primary" type="button">9</Button>
                                        <Button className="btn btn-primary" type="button">10</Button>
                                        <Button className="btn btn-primary" type="button">11</Button>
                                        <Button className="btn btn-primary" type="button">12</Button>
                                    </div>
                                </div>
                                <div className="btn-toolbar">
                                    <div className="btn-group me-1" role="group" aria-label="First group">
                                        <Button className="btn btn-outline-primary" type="button">1</Button>
                                        <Button className="btn btn-outline-primary" type="button">2</Button>
                                        <Button className="btn btn-outline-primary" type="button">3</Button>
                                        <Button className="btn btn-outline-primary" type="button">4</Button>
                                    </div>
                                    <div className="btn-group me-1" role="group" aria-label="Second group">
                                        <Button className="btn btn-outline-secondary" type="button">5</Button>
                                        <Button className="btn btn-outline-secondary" type="button">6</Button>
                                        <Button className="btn btn-outline-secondary" type="button">7</Button>
                                    </div>
                                    <div className="btn-group me-1" role="group" aria-label="Third group">
                                        <Button className="btn btn-outline-info" type="button">8</Button>
                                    </div>
                                    <div className="btn-group" role="group" aria-label="Four group">
                                        <Button className="btn btn-outline-primary" type="button">9</Button>
                                        <Button className="btn btn-outline-primary" type="button">10</Button>
                                        <Button className="btn btn-outline-primary" type="button">11</Button>
                                        <Button className="btn btn-outline-primary" type="button">12</Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col xxl={6}>
                        <Card>
                            <div className="card-header">
                                <h4>Button toolbar</h4>
                            </div>
                            <div className="card-body">
                                <p className="card-title-desc mb-2"> Add two button between one div and apply <code>.or-icon</code>&nbsp;class for default button and small/large button add extra class <code>.or-icon.sm && .or-icon.lg</code>&nbsp;quickly create a styled button. </p>
                                <div className="btn-group me-1">
                                    <Button className="btn btn-primary btn-sm" type="button">Small button</Button>
                                    <div className="or-icon sm"></div>
                                    <Button className="btn btn-success btn-sm" type="button">Small button</Button>
                                </div>
                                <div className="btn-group me-1">
                                    <Button className="btn btn-primary" type="button">Default</Button>
                                    <div className="or-icon"></div>
                                    <Button className="button btn btn-success" type="button">Success</Button>
                                </div>
                                <div className="btn-group me-1">
                                    <Button className="btn btn-primary btn-lg" type="button">Large button</Button>
                                    <div className="or-icon lg"></div>
                                    <Button className="btn btn-success btn-lg" type="button">Large button</Button>
                                </div>
                            </div>
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
