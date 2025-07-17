import * as React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';


import PageBreadcrumb from '../componets/PageBreadcrumb';

export default function Element_Typography() {
  return (
    <>
    <div className="themebody-wrap">
        {/* breadcrumb start */}
        <PageBreadcrumb pagename="Typography" />
        {/* breadcrumb end */}
        {/* theme body start */}
        <div className="theme-body">
            <Container fluid>
                <Row>
                    <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <h4>Headings</h4>
                            </Card.Header>
                            <Card.Body className="card-body pt-20">
                                <h1>H1 Theme Heading</h1>
                                <h2>H2 Theme Heading</h2>
                                <h3>H3 Theme Heading</h3>
                                <h4>H4 Theme Heading</h4>
                                <h5>H5 Theme Heading</h5>
                                <h6>H6 Theme Heading</h6>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <h4>Heading with colors</h4>
                            </Card.Header>
                            <Card.Body className="card-body pt-20">
                                <h1 className="text-primary">H1 Theme Heading</h1>
                                <h2 className="text-secondary">H2 Theme Heading</h2>
                                <h3 className="text-success">H3 Theme Heading</h3>
                                <h4 className="text-info">H4 Theme Heading</h4>
                                <h5 className="text-warning">H5 Theme Heading</h5>
                                <h6 className="text-danger">H6 Theme Heading</h6>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <h4>dishplay Headings</h4>
                            </Card.Header>
                            <Card.Body className="card-body pt-20">
                                <h1 className="display-1">Theme Heading</h1>
                                <h2 className="display-2">Theme Heading</h2>
                                <h3 className="display-3">Theme Heading</h3>
                                <h4 className="display-4">Theme Heading</h4>
                                <h5 className="display-5">Theme Heading</h5>
                                <h6 className="display-6">Theme Heading</h6>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <h4>dishplay Heading with colors</h4>
                            </Card.Header>
                            <Card.Body className="card-body pt-20">
                                <h1 className="display-1 text-primary">Theme Heading</h1>
                                <h2 className="display-2 text-secondary">Theme Heading</h2>
                                <h3 className="display-3 text-success">Theme Heading</h3>
                                <h4 className="display-4 text-info">Theme Heading</h4>
                                <h5 className="display-5 text-warning">Theme Heading</h5>
                                <h6 className="display-6 text-danger">Theme Heading</h6>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={12}>
                        <Card>
                            <Card.Header>
                                <h4>Inline text elements</h4>
                            </Card.Header>
                            <Card.Body className="card-body">
                                <p>You can use the mark tag to
                                    <mark>highlight</mark> text.
                                </p>
                                <p>
                                    <del>This line of text is meant to be treated as deleted text.</del>
                                </p>
                                <p>
                                    <s>This line of text is meant to be treated as no longer accurate.</s>
                                </p>
                                <p>
                                    <ins>This line of text is meant to be treated as an addition to the document.</ins>
                                </p>
                                <p>
                                    <u>This line of text will render as underlined.</u>
                                </p>
                                <p>
                                    <small>This line of text is meant to be treated as fine print.</small>
                                </p>
                                <p>
                                    <strong>This line rendered as bold text.</strong>
                                </p>
                                <p>
                                    <em>This line rendered as italicized text. </em>
                                </p>
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
