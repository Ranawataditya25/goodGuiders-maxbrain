import * as React from 'react';
import { Container, Row, Col, Card, Nav, Tab } from 'react-bootstrap';


import PageBreadcrumb from '../componets/PageBreadcrumb';

export default function Element_Tabs_content() {
  return (
    <>
      <div className="themebody-wrap">
        {/* breadcrumb start */}
        <PageBreadcrumb pagename="Tabs" />
        {/* breadcrumb end */}
        {/* theme body start */}
        <div className="theme-body">
          <Container fluid>
            <Row>
              <Col lg={6}>
                <Card>
                  <Card.Header>
                    <h4>primary tab</h4>
                  </Card.Header>
                  <Card.Body>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                      <Row>
                        <Col sm={12}>
                          <Nav variant="pills tab-primary" className="flex-row mb-3">
                            <Nav.Item>
                              <Nav.Link eventKey="first">Description</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="second">Information</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="Third">Review</Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Col>
                        <Col sm={12}>
                          <Tab.Content>
                            <Tab.Pane eventKey="first">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Third">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6}>
                <Card>
                  <Card.Header>
                    <h4>secondary tab</h4>
                  </Card.Header>
                  <Card.Body>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                      <Row>
                        <Col sm={12}>
                          <Nav variant="pills tab-secondary" className="flex-row mb-3">
                            <Nav.Item>
                              <Nav.Link eventKey="first">Description</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="second">Information</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="Third">Review</Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Col>
                        <Col sm={12}>
                          <Tab.Content>
                            <Tab.Pane eventKey="first">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Third">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6}>
                <Card>
                  <Card.Header>
                    <h4>success tab</h4>
                  </Card.Header>
                  <Card.Body>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                      <Row>
                        <Col sm={12}>
                          <Nav variant="pills tab-success" className="flex-row mb-3">
                            <Nav.Item>
                              <Nav.Link eventKey="first">Description</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="second">Information</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="Third">Review</Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Col>
                        <Col sm={12}>
                          <Tab.Content>
                            <Tab.Pane eventKey="first">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Third">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6}>
                <Card>
                  <Card.Header>
                    <h4>info tab</h4>
                  </Card.Header>
                  <Card.Body>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                      <Row>
                        <Col sm={12}>
                          <Nav variant="pills tab-info" className="flex-row mb-3">
                            <Nav.Item>
                              <Nav.Link eventKey="first">Description</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="second">Information</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="Third">Review</Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Col>
                        <Col sm={12}>
                          <Tab.Content>
                            <Tab.Pane eventKey="first">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Third">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6}>
                <Card>
                  <Card.Header>
                    <h4>warning tab</h4>
                  </Card.Header>
                  <Card.Body>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                      <Row>
                        <Col sm={12}>
                          <Nav variant="pills tab-warning" className="flex-row mb-3">
                            <Nav.Item>
                              <Nav.Link eventKey="first">Description</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="second">Information</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="Third">Review</Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Col>
                        <Col sm={12}>
                          <Tab.Content>
                            <Tab.Pane eventKey="first">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Third">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6}>
                <Card>
                  <Card.Header>
                    <h4>danger tab</h4>
                  </Card.Header>
                  <Card.Body>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                      <Row>
                        <Col sm={12}>
                          <Nav variant="pills tab-danger" className="flex-row mb-3">
                            <Nav.Item>
                              <Nav.Link eventKey="first">Description</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="second">Information</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="Third">Review</Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Col>
                        <Col sm={12}>
                          <Tab.Content>
                            <Tab.Pane eventKey="first">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Third">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6}>
                <Card>
                  <Card.Header>
                    <h4>primary border tab</h4>
                  </Card.Header>
                  <Card.Body>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                      <Row>
                        <Col sm={12}>
                          <Nav variant="pills tab-primary-border" className="flex-row mb-3">
                            <Nav.Item>
                              <Nav.Link eventKey="first">Description</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="second">Information</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="Third">Review</Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Col>
                        <Col sm={12}>
                          <Tab.Content>
                            <Tab.Pane eventKey="first">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Third">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6}>
                <Card>
                  <Card.Header>
                    <h4>secodnary border tab</h4>
                  </Card.Header>
                  <Card.Body>
                    <div className="tabs_content">
                      <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                        <Row>
                          <Col sm={12}>
                            <Nav variant="pills tab-secondary-border" className="flex-row mb-3">
                              <Nav.Item>
                                <Nav.Link eventKey="first">Description</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link eventKey="second">Information</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link eventKey="Third">Review</Nav.Link>
                              </Nav.Item>
                            </Nav>
                          </Col>
                          <Col sm={12}>
                            <Tab.Content>
                              <Tab.Pane eventKey="first">
                                <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                              </Tab.Pane>
                              <Tab.Pane eventKey="second">
                                <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                              </Tab.Pane>
                              <Tab.Pane eventKey="Third">
                                <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                              </Tab.Pane>
                            </Tab.Content>
                          </Col>
                        </Row>
                      </Tab.Container>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6}>
                <Card>
                  <Card.Header>
                    <h4>success border tab</h4>
                  </Card.Header>
                  <Card.Body>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                      <Row>
                        <Col sm={12}>
                          <Nav variant="pills tab-success-border" className="flex-row mb-3">
                            <Nav.Item>
                              <Nav.Link eventKey="first">Description</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="second">Information</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="Third">Review</Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Col>
                        <Col sm={12}>
                          <Tab.Content>
                            <Tab.Pane eventKey="first">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Third">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6}>
                <Card>
                  <Card.Header>
                    <h4>info border tab</h4>
                  </Card.Header>
                  <Card.Body>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                      <Row>
                        <Col sm={12}>
                          <Nav variant="pills tab-info-border" className="flex-row mb-3">
                            <Nav.Item>
                              <Nav.Link eventKey="first">Description</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="second">Information</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="Third">Review</Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Col>
                        <Col sm={12}>
                          <Tab.Content>
                            <Tab.Pane eventKey="first">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Third">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6}>
                <Card>
                  <Card.Header>
                    <h4>warning border tab</h4>
                  </Card.Header>
                  <Card.Body>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                      <Row>
                        <Col sm={12}>
                          <Nav variant="pills tab-warning-border" className="flex-row mb-3">
                            <Nav.Item>
                              <Nav.Link eventKey="first">Description</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="second">Information</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="Third">Review</Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Col>
                        <Col sm={12}>
                          <Tab.Content>
                            <Tab.Pane eventKey="first">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Third">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6}>
                <Card>
                  <Card.Header>
                    <h4>danger border tab</h4>
                  </Card.Header>
                  <Card.Body>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                      <Row>
                        <Col sm={12}>
                          <Nav variant="pills tab-danger-border" className="flex-row mb-3">
                            <Nav.Item>
                              <Nav.Link eventKey="first">Description</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="second">Information</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="Third">Review</Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Col>
                        <Col sm={12}>
                          <Tab.Content>
                            <Tab.Pane eventKey="first">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Third">
                              <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. </p>
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
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
