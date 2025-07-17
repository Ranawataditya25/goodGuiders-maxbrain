import { useState } from 'react';
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';


import PageBreadcrumb from '../componets/PageBreadcrumb';

export default function Element_Modals() {
    
    const [activeModal, setActiveModal] = useState(null);
    const handleShowModal = (modal) => () => setActiveModal(modal);
    const handleCloseModal = () => setActiveModal(null);


    const values = [true, 'sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down'];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }
  return (
    <>
            <div className="themebody-wrap">
                {/* breadcrumb start */}
                <PageBreadcrumb pagename="Modal" />
                {/* breadcrumb end */}
                {/* theme body start */}
                <div className="theme-body">
                    <Container fluid className="element-buttons">
                        <Row>
                            <Col xl={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>theme modal</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <button className="btn btn-primary me-2" type="button" onClick={handleShowModal('modal1')}>Normal modal</button>
                                        <Modal show={activeModal === 'modal1'} onHide={handleCloseModal} >
                                            <Modal.Header closeButton>
                                                <Modal.Title>Modal title</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseModal}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={handleCloseModal}>
                                                    Save Changes
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>

                                        <button className="btn btn-primary me-2" type="button" onClick={handleShowModal('modal2')}>static backdrop modal </button>
                                        <Modal show={activeModal === 'modal2'} onHide={handleCloseModal} backdrop="static" keyboard={false} >
                                            <Modal.Header closeButton>
                                                <Modal.Title>Modal title</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseModal}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={handleCloseModal}>
                                                    Save Changes
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        <button className="btn btn-primary me-2" type="button" onClick={handleShowModal('modal3')}>Scrolling long content</button>
                                        <Modal show={activeModal === 'modal3'} onHide={handleCloseModal} scrollable >
                                            <Modal.Header closeButton>
                                                <Modal.Title id="contained-modal-title-vcenter">
                                                    Modal title
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body >
                                                <h4>Centered Modal</h4>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                </p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                </p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                </p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                </p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                </p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                </p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                </p>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button onClick={handleCloseModal}>Close</Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>advance modals</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <button className="btn btn-primary me-2" type="button" onClick={handleShowModal('modal4')} >
                                            Vertically centered
                                        </button>
                                        <Modal show={activeModal === 'modal4'} onHide={handleCloseModal} size="md" aria-labelledby="contained-modal-title-vcenter" centered >
                                            <Modal.Header closeButton>
                                                <Modal.Title id="contained-modal-title-vcenter">
                                                    vertically center
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <h4>Centered Modal</h4>
                                                <p>
                                                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                                                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                                                    consectetur ac, vestibulum at eros.
                                                </p>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button onClick={handleCloseModal}>Close</Button>
                                            </Modal.Footer>
                                        </Modal>

                                        <button className="btn btn-primary me-2" type="button" onClick={handleShowModal('modal5')}>Vertically centered scrollable</button>
                                        <Modal show={activeModal === 'modal5'} onHide={handleCloseModal} size="md" aria-labelledby="contained-modal-title-vcenter" centered scrollable  >
                                            <Modal.Header closeButton>
                                                <Modal.Title id="contained-modal-title-vcenter">
                                                    Vertically centered scrollable
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body >
                                                <h4>Centered Modal</h4>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                </p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                </p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                </p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                </p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                </p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                </p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                </p>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button onClick={handleCloseModal}>Close</Button>
                                            </Modal.Footer>
                                        </Modal>

                                        <button className="btn btn-primary" type="button" onClick={handleShowModal('modal6')}>tool tip & popover</button>
                                        <Modal show={activeModal === 'modal6'} onHide={handleCloseModal} size="md"
                                            aria-labelledby="contained-modal-title-vcenter" centered scrollable >
                                            <Modal.Header closeButton>
                                                <Modal.Title id="contained-modal-title-vcenter">
                                                    vertically center
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <h5>Popover in a modal</h5>
                                                <p>This <a className="btn btn-secondary popover-test" href="#" role="button" title="Popover title" data-bs-content="Popover body content is set in this attribute.">button</a> triggers a popover on click.</p>
                                                <h5>Tooltips in a modal</h5>
                                                <p>
                                                    <a className="tooltip-test" href="#" title="Tooltip">This link</a> and <a className="tooltip-test" href="#" title="Tooltip">that link</a> have tooltips on hover.
                                                </p>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button onClick={handleCloseModal}>Close</Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={12}>
                                <Card>
                                    <Card.Header>
                                        <h4>sizing modal </h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <Button onClick={handleShowModal('modal7')} className="me-2"> Small modal</Button>


                                        <Modal size="sm" show={activeModal === 'modal7'} onHide={handleCloseModal}
                                            aria-labelledby="example-modal-sizes-title-sm">
                                            <Modal.Header closeButton>
                                                <Modal.Title id="example-modal-sizes-title-sm">
                                                    Small Modal
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>...</Modal.Body>
                                        </Modal>
                                        <Button onClick={handleShowModal('modal8')} className="me-2">Large modal</Button>
                                        <Modal size="lg" show={activeModal === 'modal8'} onHide={handleCloseModal} aria-labelledby="example-modal-sizes-title-lg">
                                            <Modal.Header closeButton>
                                                <Modal.Title id="example-modal-sizes-title-lg">
                                                    Large Modal
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>...</Modal.Body>
                                        </Modal>
                                        <Button onClick={handleShowModal('modal9')} className="me-2"> extra larg modal</Button>
                                        <Modal size="xl" show={activeModal === 'modal9'} onHide={handleCloseModal} aria-labelledby="example-modal-sizes-title-xl"  >
                                            <Modal.Header closeButton>
                                                <Modal.Title id="example-modal-sizes-title-md">
                                                    Small Modal
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>...</Modal.Body>
                                        </Modal>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={12}>
                                <Card>
                                    <Card.Header>
                                        <h4>Fullscreen Modal</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        {values.map((v, idx) => (
                                            <Button key={idx} className="me-2 mb-2" onClick={() => handleShow(v)}>
                                                Full screen
                                                {typeof v === 'string' && `below ${v.split('-')[0]}`}
                                            </Button>
                                        ))}
                                        <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Modal</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Modal body content</Modal.Body>
                                        </Modal>
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
