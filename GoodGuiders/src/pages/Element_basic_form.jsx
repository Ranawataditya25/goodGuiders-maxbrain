import React, { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import PageBreadcrumb from '../componets/PageBreadcrumb';

export default function Element_Basic_form() {
    const [simpleInput, setSimpleInput] = useState('');
  const [placeholderInput, setPlaceholderInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [numberInput, setNumberInput] = useState('');
  const [telInput, setTelInput] = useState('+91 99555 99555');
  const [urlInput, setUrlInput] = useState('https://example.com/');
  const [datetimeInput, setDatetimeInput] = useState('2023-03-13T18:45');
  const [dateInput, setDateInput] = useState('2023-03-13');
  const [timeInput, setTimeInput] = useState('18:45');
  const [weekInput, setWeekInput] = useState('2023-W08');
  const [monthInput, setMonthInput] = useState('2023-05');
  const [colorInput, setColorInput] = useState('#0b5ed7');
  const [maxLengthInput, setMaxLengthInput] = useState('');
  const [textareaInput, setTextareaInput] = useState('');
  return (
    <div className="themebody-wrap">
      {/* Breadcrumb Start */}
      <PageBreadcrumb pagename="Basic Form" />
      {/* Breadcrumb End */}
      {/* theme body start */}
      <div className="theme-body codex-calendar">
        <Container fluid>
        <Row>
      <Col md={6}>
        <Card>
          <Card.Header>
            <h4>Basic Input</h4>
          </Card.Header>
          <Card.Body>
            <Form action="#">
              <Form.Group className="mb-20">
                <Form.Label>Simple Input</Form.Label>
                <Form.Control
                  type="text"
                  value={simpleInput}
                  onChange={(e) => setSimpleInput(e.target.value)}
                  placeholder=""
                />
              </Form.Group>
              <Form.Group className="mb-20">
                <Form.Label>Placeholder</Form.Label>
                <Form.Control
                  type="text"
                  value={placeholderInput}
                  onChange={(e) => setPlaceholderInput(e.target.value)}
                  placeholder="Your Placeholder Title"
                />
              </Form.Group>
              <Form.Group className="mb-20">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Password input"
                />
              </Form.Group>
              <Form.Group className="mb-20">
                <Form.Label>Number</Form.Label>
                <Form.Control
                  type="number"
                  value={numberInput}
                  onChange={(e) => setNumberInput(e.target.value)}
                  placeholder="number"
                />
              </Form.Group>
              <Form.Group className="mb-20">
                <Form.Label>Telephone</Form.Label>
                <Form.Control
                  type="tel"
                  value={telInput}
                  onChange={(e) => setTelInput(e.target.value)}
                  placeholder="+91 99555 99555"
                />
              </Form.Group>
              <Form.Group className="mb-20">
                <Form.Label>URL</Form.Label>
                <Form.Control
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/"
                />
              </Form.Group>
              <Form.Group className="mb-20">
                <Form.Label>Date and Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={datetimeInput}
                  onChange={(e) => setDatetimeInput(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card>
          <Card.Header>
            <h4>Basic Input</h4>
          </Card.Header>
          <Card.Body>
            <Form action="#">
              <Form.Group className="mb-20">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-20">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  value={timeInput}
                  onChange={(e) => setTimeInput(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-20">
                <Form.Label>Week</Form.Label>
                <Form.Control
                  type="week"
                  value={weekInput}
                  onChange={(e) => setWeekInput(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-20">
                <Form.Label>Month</Form.Label>
                <Form.Control
                  type="month"
                  value={monthInput}
                  onChange={(e) => setMonthInput(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-20">
                <Form.Label>Color</Form.Label>
                <input
                  className="form-control-color"
                  type="color"
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-20">
                <Form.Label>Maximum Length</Form.Label>
                <Form.Control
                  type="text"
                  value={maxLengthInput}
                  onChange={(e) => setMaxLengthInput(e.target.value)}
                  maxLength="8"
                />
              </Form.Group>
              <Form.Group className="mb-20">
                <Form.Label>Textarea</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="4"
                  value={textareaInput}
                  onChange={(e) => setTextareaInput(e.target.value)}
                  placeholder="Default textarea"
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
        </Container>
      </div>
    </div>
  )
}
