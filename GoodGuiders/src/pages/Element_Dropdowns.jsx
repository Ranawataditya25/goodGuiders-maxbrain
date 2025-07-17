import * as React from 'react';
import { Container, Row, Col, Card, Dropdown, ButtonGroup, SplitButton, Form } from 'react-bootstrap';

import PageBreadcrumb from '../componets/PageBreadcrumb';

export default function Element_Dropdowns() {
    return (
        <>
            <div className="themebody-wrap">
                {/* breadcrumb start */}
                <PageBreadcrumb pagename="Dropdowns" />
                {/* breadcrumb end */}
                {/* theme body start */}
                <div className="theme-body cdxshopping-cart">
                    <Container fluid className="element-buttons">
                        <Row>
                            <Col sm={12}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>Single Button Dropdown</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <p className="card-title-desc">Any single .btn can be turned into a dropdown toggle with some markup changes. Here’s how you can put them to work with either <code>button</code> elements: </p>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                                Dropdown Button
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={12}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>Sizing</h4>
                                    </Card.Header>
                                    <div className="card-body">
                                        <p className="card-title-desc mb-35">Add&nbsp;<code>.btn.btn-sm &amp;&amp; .btn.btn-lg</code>&nbsp;for additional sizes. </p>
                                        <Row>
                                            <Col sm={4} className="mb-5">
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="info" size="sm" id="dropdown-basic">
                                                        Dropdown Button
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Col>
                                            <Col sm={4} className="mb-5">
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="info" size="sm" id="dropdown-basic">
                                                        Dropdown Button
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Col>
                                            <Col sm={4} className="mb-5">
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="info" size="lg" id="dropdown-basic">
                                                        Dropdown Button
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </Col>
                            <Col xxl={6}>
                                <Card className="card buttons">
                                    <div className="card-header">
                                        <h4>Color Variant</h4>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-title-desc">The best part is you can do this with any button variant, too: </p>

                                        <Dropdown as={ButtonGroup} className="d-inline mx-1">
                                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                                Primary
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown as={ButtonGroup} className="d-inline mx-1">
                                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                                Secondary
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown as={ButtonGroup} className="d-inline mx-1">
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                Success
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown as={ButtonGroup} className="d-inline mx-1">
                                            <Dropdown.Toggle variant="info" id="dropdown-basic">
                                                Info
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown as={ButtonGroup} className="d-inline mx-1">
                                            <Dropdown.Toggle variant="warning" id="dropdown-basic">
                                                Warning
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown as={ButtonGroup} className="d-inline mx-1">
                                            <Dropdown.Toggle variant="danger" id="dropdown-basic">
                                                Danger
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown as={ButtonGroup} className="d-inline mx-1">
                                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                                Dark
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </Card>
                            </Col>
                            <Col xxl={6}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>Roundend Button Drowndown</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <p className="card-title-desc">Use any of the available <code>.btn-rounded</code>&nbsp;classes quickly create a styled button. </p>
                                        <Dropdown as={ButtonGroup} >
                                            <Dropdown.Toggle variant="primary" id="dropdown-basic" className="me-1 btn-rounded">
                                                Primary
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown as={ButtonGroup} >
                                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="me-1 btn-rounded">
                                                Secondary
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown as={ButtonGroup} >
                                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="me-1 btn-rounded">
                                                Success
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>

                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={6}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>Split button</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <p className="card-title-desc">
                                            Similarly, create split button dropdowns with virtually the same markup as single button dropdowns, but with the code addition of <code>.dropdown-toggle-split</code>&nbsp;for proper spacing around the dropdown caret.
                                        </p>
                                        <SplitButton variant="info" id="{`dropdown-split-variants-${variant}`}" title='Info' className="me-1">
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </SplitButton>
                                        <SplitButton variant="danger" id="{`dropdown-split-variants-${variant}`}" title='Danger' className="me-1">
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </SplitButton>
                                        <SplitButton variant="dark" id="{`dropdown-split-variants-${variant}`}" title='Dark' className="me-1">
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </SplitButton>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={6}>
                                <div className="card buttons">
                                    <div className="card-header">
                                        <h4>Split Roundend Button Drowndown </h4>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-title-desc">Use any of the available <code>.btn-rounded</code>&nbsp;classes quickly create a styled button.
                                            <br />
                                        </p>
                                        <SplitButton variant="secondary" id="{`dropdown-split-variants-${variant}`}" title='Secondary' className="me-1">
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </SplitButton>
                                        <SplitButton variant="success" id="{`dropdown-split-variants-${variant}`}" title='Success' className="me-1">
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </SplitButton>
                                        <SplitButton variant="info" id="{`dropdown-split-variants-${variant}`}" title='Info' className="me-1">
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </SplitButton>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={6}>
                                <div className="card buttons">
                                    <div className="card-header">
                                        <h4>Outline Button Dropdown</h4>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-title-desc">Use any of the available <code>.btn-outline-*</code>&nbsp;classes quickly create a styled button. </p>

                                        <Dropdown as={ButtonGroup} className="d-inline mx-1">
                                            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                                                Primary
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown as={ButtonGroup} className="d-inline mx-1">
                                            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                                                Secondary
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown as={ButtonGroup} className="d-inline mx-1">
                                            <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                                                Success
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown as={ButtonGroup} className="d-inline mx-1">
                                            <Dropdown.Toggle variant="outline-info" id="dropdown-basic">
                                                Info
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>

                                    </div>
                                </div>
                            </Col>
                            <Col xxl={6}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>Outline Split Button Dropdown</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <p className="card-title-desc">Use any of the available <code>.btn-outline-*</code>&nbsp;classes quickly create a styled button. </p>
                                        <SplitButton variant="outline-success" id="{`dropdown-split-variants-${variant}`}" title='success' className="me-1">
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </SplitButton>
                                        <SplitButton variant="outline-info" id="{`dropdown-split-variants-${variant}`}" title='info' className="me-1">
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </SplitButton>
                                        <SplitButton variant="outline-danger" id="{`dropdown-split-variants-${variant}`}" title='Danger' className="me-1">
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </SplitButton>
                                        <SplitButton variant="outline-dark" id="{`dropdown-split-variants-${variant}`}" title='Dark' className="me-1">
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </SplitButton>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={6}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>Dropdown Alignment options</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <p className="card-title-desc">Taking most of the options shown above, here’s a small kitchen sink demo of various dropdown alignment options in one place. Add <code>.btn-group</code>&nbsp;with&nbsp;<code>.dropstart</code> , <code>.dropup</code> , <code>.dropend </code>. </p>
                                        <Dropdown as={ButtonGroup} drop={'start'} className="d-inline mx-1">
                                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                                Primary
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown as={ButtonGroup} drop={'up'} className="d-inline mx-1">
                                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                                Secondary
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown as={ButtonGroup} drop={'down-centered'} className="d-inline mx-1">
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                Success
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown as={ButtonGroup} drop={'end'} className="d-inline mx-1">
                                            <Dropdown.Toggle variant="info" id="dropdown-basic">
                                                Info
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={6}>
                                <Card className="card buttons">
                                    <Card.Header>
                                        <h4>Dropdown Content</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <p className="card-title-desc">Dropdown menu ex:- Header, Divider, Form, Text.
                                            <br />
                                        </p>
                                        <Dropdown as={ButtonGroup} className="d-inline mx-1">
                                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                                Dropdown Header
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Dropdown header</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Another action</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown as={ButtonGroup} className="d-inline mx-1">
                                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                                Dropdown Divider
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else here</Dropdown.Item>
                                                <Dropdown.Item href="#/action-4"><hr className="dropdown-divider" /></Dropdown.Item>
                                                <Dropdown.Item href="#/action-5">Separated link</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown as={ButtonGroup} className="d-inline mx-1">
                                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                                Dropdown Text
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="p-2">

                                                <p className="fs-14">Some example text that's free-flowing within the dropdown menu.</p>
                                                <p className="fs-14 mb-0">And this is more example text.</p>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown as={ButtonGroup} className="d-inline mx-1">
                                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                                Dropdown Form
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">
                                                    <form className="p-2">
                                                        <div className="mb-3">
                                                            <Form.Label for="email">Email address</Form.Label>
                                                            <Form.Control id="email" type="email" placeholder="email@example.com" />
                                                        </div>
                                                        <div className="mb-3">
                                                            <Form.Label for="password">Password</Form.Label>
                                                            <Form.Control id="password" type="password" placeholder="Password" />
                                                        </div>
                                                        <div className="mb-3">
                                                            <Form.Check className="custom-check-input custom-chek">
                                                                <Form.Check.Input type="checkbox" id="form" name="form1" />
                                                            </Form.Check>
                                                            <Form.Label>Remember me</Form.Label>
                                                        </div>
                                                        <button className="btn btn-primary w-100" type="submit">Sign in</button>
                                                    </form>
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">New around here? Sign up</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Forgot password?</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
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
