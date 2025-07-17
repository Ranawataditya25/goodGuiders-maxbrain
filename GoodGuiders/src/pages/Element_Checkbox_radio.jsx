import React, { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import PageBreadcrumb from '../componets/PageBreadcrumb';
export default function Element_Checkbox_radio() {
     //  Inuut value start 
     const [checkboxes, setCheckboxes] = useState({
        Default: false,
        secondarycheck: false,
        successcheck: false,
        infocheck: false,
        warningcheck: false,
        dangercheck: false,
        checkedDefault: true,
        checkedsecondarycheck: true,
        checkedsuccesscheck: true,
        checkedinfocheck: true,
        checkedwarningcheck: true,
        checkeddangercheck: true,
        disabledDefault: false,
        disabledsecondarycheck: false,
        disabledsuccesscheck: false,
        disabledinfocheck: false,
        disabledwarningcheck: false,
        disableddangercheck: false,
        diseabledcheckedDefault: true,
        diseabledcheckedsecondarycheck: true,
        diseabledcheckedsuccesscheck: true,
        diseabledcheckedinfocheck: true,
        diseabledcheckedwarningcheck: true,
        diseabledcheckeddangercheck: true,
        inlineDefault: false,
        inlinesecondarycheck: false,
        inlinesuccesscheck: false,
        inlineinfocheck: false,
        inlinewarningcheck: false,
        inlinedangercheck: false
    });

    // Handler for checkbox changes
    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;
        setCheckboxes(prevState => ({
            ...prevState,
            [id]: checked
        }));
    };
    const [selectedRadio, setSelectedRadio] = useState('Defaultradio');
    const handleRadioChange = (e) => {
        setSelectedRadio(e.target.value);
    };
  return (
    <>
            <div className="themebody-wrap">
                {/* breadcrumb start */}
                <PageBreadcrumb pagename="Element Checkbox radio" />
                {/* breadcrumb end */}
                {/* theme body start */}
                <div className="theme-body codex-calendar">
                    <Container fluid>
                        <Row>
                            <Col md={3}>
                                <Card>
                                    <Card.Header>
                                        <h4>Checkbox</h4>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        <Form>
                                            <Form.Group className="mb-2">
                                                <Form.Check>
                                                    <Form.Check.Input type="checkbox" id="Default" checked={checkboxes.Default}
                                                        onChange={handleCheckboxChange} />
                                                    <Form.Check.Label htmlFor="Default">Default</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-secondary">
                                                    <Form.Check.Input type="checkbox" id="secondarycheck" checked={checkboxes.secondarycheck}
                                                        onChange={handleCheckboxChange} />
                                                    <Form.Check.Label htmlFor="secondarycheck">Secondary Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-success">
                                                    <Form.Check.Input type="checkbox" id="successcheck" checked={checkboxes.successcheck}
                                                        onChange={handleCheckboxChange} />
                                                    <Form.Check.Label htmlFor="successcheck">Success Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-info">
                                                    <Form.Check.Input type="checkbox" id="infocheck" checked={checkboxes.infocheck}
                                                        onChange={handleCheckboxChange} />
                                                    <Form.Check.Label htmlFor="infocheck">Info Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-warning">
                                                    <Form.Check.Input type="checkbox" id="warningcheck" checked={checkboxes.warningcheck} onChange={handleCheckboxChange} />
                                                    <Form.Check.Label htmlFor="warningcheck">Warning Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-danger">
                                                    <Form.Check.Input type="checkbox" id="dangercheck" checked={checkboxes.dangercheck}
                                                        onChange={handleCheckboxChange} />
                                                    <Form.Check.Label htmlFor="dangercheck">Danger Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <Card.Header>
                                        <h4>Checked checkbox</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form>
                                            <Form.Group className="mb-2">
                                                <Form.Check>
                                                    <Form.Check.Input type="checkbox" id="checkedDefault" checked={checkboxes.checkedDefault}
                                                        onChange={handleCheckboxChange} />
                                                    <Form.Check.Label htmlFor="checkedDefault">Default</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-secondary">
                                                    <Form.Check.Input type="checkbox" id="checkedsecondarycheck" checked={checkboxes.checkedsecondarycheck}
                                                        onChange={handleCheckboxChange} />
                                                    <Form.Check.Label htmlFor="checkedsecondarycheck">Secondary Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-success">
                                                    <Form.Check.Input type="checkbox" id="checkedsuccesscheck" checked={checkboxes.checkedsuccesscheck}
                                                        onChange={handleCheckboxChange} />
                                                    <Form.Check.Label htmlFor="checkedsuccesscheck">Success Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-info">
                                                    <Form.Check.Input type="checkbox" id="checkedinfocheck" checked={checkboxes.checkedinfocheck}
                                                        onChange={handleCheckboxChange} />
                                                    <Form.Check.Label htmlFor="checkedinfocheck">Info Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-warning">
                                                    <Form.Check.Input type="checkbox" id="checkedwarningcheck" checked={checkboxes.checkedwarningcheck}
                                                        onChange={handleCheckboxChange} />
                                                    <Form.Check.Label htmlFor="checkedwarningcheck">Warning Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-danger">
                                                    <Form.Check.Input type="checkbox" id="checkeddangercheck" checked={checkboxes.checkeddangercheck}
                                                        onChange={handleCheckboxChange} />
                                                    <Form.Check.Label htmlFor="checkeddangercheck">Danger Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <Card.Header>
                                        <h4>disabled Checkbox</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form>
                                            <Form.Group className="mb-2">
                                                <Form.Check>
                                                    <Form.Check.Input type="checkbox" id="disabledDefault" disabled checked={checkboxes.disabledDefault} />
                                                    <Form.Check.Label htmlFor="disabledDefault">Default</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-secondary">
                                                    <Form.Check.Input type="checkbox" id="disabledsecondarycheck" disabled
                                                        checked={checkboxes.disabledsecondarycheck} />
                                                    <Form.Check.Label htmlFor="disabledsecondarycheck">Secondary Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-success">
                                                    <Form.Check.Input type="checkbox" id="disabledsuccesscheck" disabled
                                                        checked={checkboxes.disabledsuccesscheck} />
                                                    <Form.Check.Label htmlFor="disabledsuccesscheck">Success Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-info">
                                                    <Form.Check.Input type="checkbox" id="disabledinfocheck" disabled
                                                        checked={checkboxes.disabledinfocheck} />
                                                    <Form.Check.Label htmlFor="disabledinfocheck">Info Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-warning">
                                                    <Form.Check.Input type="checkbox" id="disabledwarningcheck" disabled
                                                        checked={checkboxes.disabledwarningcheck} />
                                                    <Form.Check.Label htmlFor="disabledwarningcheck">Warning Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-danger">
                                                    <Form.Check.Input type="checkbox" id="disableddangercheck" disabled
                                                        checked={checkboxes.disableddangercheck} />
                                                    <Form.Check.Label htmlFor="disableddangercheck">Danger Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <Card.Header>
                                        <h4>Checked checkbox</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form>
                                            <Form.Group className="mb-2">
                                                <Form.Check>
                                                    <Form.Check.Input type="checkbox" id="disebledcheckedDefault" checked={checkboxes.diseabledcheckedDefault}
                                                        disabled />
                                                    <Form.Check.Label htmlFor="disebledcheckedDefault">Default</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-secondary">
                                                    <Form.Check.Input type="checkbox" id="disebledcheckedsecondarycheck" checked={checkboxes.diseabledcheckedsecondarycheck}
                                                        disabled />
                                                    <Form.Check.Label htmlFor="disebledcheckedsecondarycheck">Secondary Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-success">
                                                    <Form.Check.Input type="checkbox" id="disebledcheckedsuccesscheck" checked={checkboxes.diseabledcheckedsuccesscheck}
                                                        disabled />
                                                    <Form.Check.Label htmlFor="disebledcheckedsuccesscheck">Success Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-info">
                                                    <Form.Check.Input type="checkbox" id="disebledcheckedinfocheck" checked={checkboxes.diseabledcheckedinfocheck}
                                                        disabled />
                                                    <Form.Check.Label htmlFor="disebledcheckedinfocheck">Info Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-warning">
                                                    <Form.Check.Input type="checkbox" id="disebledcheckedwarningcheck" checked={checkboxes.diseabledcheckedwarningcheck}
                                                        disabled />
                                                    <Form.Check.Label htmlFor="disebledcheckedwarningcheck">Warning Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-danger">
                                                    <Form.Check.Input type="checkbox" id="disebledcheckeddangercheck" checked={checkboxes.diseabledcheckeddangercheck}
                                                        disabled />
                                                    <Form.Check.Label htmlFor="disebledcheckeddangercheck">Danger Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <Card.Header>
                                        <h4>radio</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form>
                                            <Form.Group className="mb-2">
                                                <Form.Check>
                                                    <Form.Check.Input type='radio' value='Defaultradio' id='Defaultradio'
                                                        checked={selectedRadio === 'Defaultradio'} onChange={handleRadioChange} />
                                                    <Form.Check.Label htmlFor='Defaultradio'>Default</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-secondary">
                                                    <Form.Check.Input type='radio' value='secondaryradio' id='secondaryradio'
                                                        checked={selectedRadio === 'secondaryradio'} onChange={handleRadioChange} />
                                                    <Form.Check.Label htmlFor='secondaryradio'>Secondary Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-success">
                                                    <Form.Check.Input type='radio' value='successradio' id='successradio'
                                                        checked={selectedRadio === 'successradio'} onChange={handleRadioChange} />
                                                    <Form.Check.Label htmlFor='successradio'>Success Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-info">
                                                    <Form.Check.Input type='radio' value='inforadio' id='inforadio' checked={selectedRadio === 'inforadio'}
                                                        onChange={handleRadioChange} />
                                                    <Form.Check.Label htmlFor='inforadio'>Info Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-warning">
                                                    <Form.Check.Input type='radio' value='warningradio' id='warningradio'
                                                        checked={selectedRadio === 'warningradio'} onChange={handleRadioChange} />
                                                    <Form.Check.Label htmlFor='warningradio'>Warning Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Check className="check-danger">
                                                    <Form.Check.Input type='radio' value='dangerradio' id='dangerradio'
                                                        checked={selectedRadio === 'dangerradio'} onChange={handleRadioChange} />
                                                    <Form.Check.Label htmlFor='dangerradio'>Danger Checkbox</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={8}>
                                <Row>
                                    <Col md={12}>
                                        <Card>
                                            <Card.Header>
                                                <h4>Inline Checkbox</h4>
                                            </Card.Header>
                                            <Card.Body>
                                                <Form>
                                                    <Form.Check className="form-check-inline">
                                                        <Form.Check.Input type='checkbox' id='inlineDefault' checked={checkboxes.inlineDefault}
                                                            onChange={handleCheckboxChange} />
                                                        <Form.Check.Label htmlFor='inlineDefault'>Default</Form.Check.Label>
                                                    </Form.Check>

                                                    <Form.Check className="form-check-inline check-secondary">
                                                        <Form.Check.Input type='checkbox' id='inlinesecondarycheck'
                                                            checked={checkboxes.inlinesecondarycheck} onChange={handleCheckboxChange} />
                                                        <Form.Check.Label htmlFor='inlinesecondarycheck'>Secondary Checkbox</Form.Check.Label>
                                                    </Form.Check>

                                                    <Form.Check className="form-check-inline check-success">
                                                        <Form.Check.Input type='checkbox' id='inlinesuccesscheck' checked={checkboxes.inlinesuccesscheck}
                                                            onChange={handleCheckboxChange} />
                                                        <Form.Check.Label htmlFor='inlinesuccesscheck'>Success Checkbox</Form.Check.Label>
                                                    </Form.Check>

                                                    <Form.Check className="form-check-inline check-info">
                                                        <Form.Check.Input type='checkbox' id='inlineinfocheck' checked={checkboxes.inlineinfocheck}
                                                            onChange={handleCheckboxChange} />
                                                        <Form.Check.Label htmlFor='inlineinfocheck'>Info Checkbox</Form.Check.Label>
                                                    </Form.Check>

                                                    <Form.Check className="form-check-inline check-warning">
                                                        <Form.Check.Input type='checkbox' id='inlinewarningcheck'
                                                            checked={checkboxes.inlinewarningcheck} onChange={handleCheckboxChange} />
                                                        <Form.Check.Label htmlFor='inlinewarningcheck'>Warning Checkbox</Form.Check.Label>
                                                    </Form.Check>

                                                    <Form.Check className="form-check-inline check-danger">
                                                        <Form.Check.Input type='checkbox' id='inlinedangercheck'
                                                            checked={checkboxes.inlinedangercheck} onChange={handleCheckboxChange} />
                                                        <Form.Check.Label htmlFor='inlinedangercheck'>Danger Checkbox</Form.Check.Label>
                                                    </Form.Check>
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={12}>
                                        <Card>
                                            <Card.Header>
                                                <h4>Inline Radio</h4>
                                            </Card.Header>
                                            <Card.Body>
                                                <Form>
                                                    <Form.Check className="form-check-inline">
                                                        <Form.Check.Input type='radio' value='default'  id='inlineDefaultradio'
                                                            name='radio' checked={selectedRadio === 'default'} onChange={handleRadioChange}  />
                                                        <Form.Check.Label htmlFor='inlineDefaultradio'>Default</Form.Check.Label>
                                                    </Form.Check>

                                                    <Form.Check className="form-check-inline check-secondary">
                                                        <Form.Check.Input  type='radio' value='secondary' id='inlinesecondaryradio'
                                                            name='radio' checked={selectedRadio === 'secondary'} onChange={handleRadioChange} />
                                                        <Form.Check.Label htmlFor='inlinesecondaryradio'>Secondary Radio</Form.Check.Label>
                                                    </Form.Check>

                                                    <Form.Check className="form-check-inline check-success">
                                                        <Form.Check.Input type='radio' value='success' id='inlinesuccessradio'
                                                            name='radio' checked={selectedRadio === 'success'} onChange={handleRadioChange} />
                                                        <Form.Check.Label htmlFor='inlinesuccessradio'>Success Radio</Form.Check.Label>
                                                    </Form.Check>

                                                    <Form.Check className="form-check-inline check-info">
                                                        <Form.Check.Input type='radio' value='info' id='inlineinforadio' name='radio' checked={selectedRadio === 'info'}
                                                            onChange={handleRadioChange} />
                                                        <Form.Check.Label htmlFor='inlineinforadio'>Info Radio</Form.Check.Label>
                                                    </Form.Check>

                                                    <Form.Check className="form-check-inline check-warning">
                                                        <Form.Check.Input  type='radio' value='warning' id='inlinewarningradio'
                                                            name='radio'  checked={selectedRadio === 'warning'} onChange={handleRadioChange} />
                                                        <Form.Check.Label htmlFor='inlinewarningradio'>Warning Radio</Form.Check.Label>
                                                    </Form.Check>

                                                    <Form.Check className="form-check-inline check-danger">
                                                        <Form.Check.Input type='radio' value='danger' id='inlinedangerradio'
                                                            name='radio' checked={selectedRadio === 'danger'}  onChange={handleRadioChange} />
                                                        <Form.Check.Label htmlFor='inlinedangerradio'>Danger Radio</Form.Check.Label>
                                                    </Form.Check>
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
                {/* theme body end */}
            </div>
            
        </>
  )
}
