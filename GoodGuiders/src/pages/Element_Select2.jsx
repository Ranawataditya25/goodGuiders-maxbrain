import React from 'react'
import { Container, Row, Col, Card} from 'react-bootstrap';
import Select from 'react-select';

import PageBreadcrumb from '../componets/PageBreadcrumb';

export default function Element_Select2() {
    const options = [
        { value: 'Alabama', label: 'Alabama' },
        { value: 'Wyoming', label: 'Wyoming' },
        { value: 'Alabama', label: 'Alabama' },
        { value: 'Wyoming', label: 'Wyoming' },
        { value: 'Alabama', label: 'Alabama' },
        { value: 'Wyoming', label: 'Wyoming' },
    ]
  return (
    <>
            <div className="themebody-wrap">
                {/* Breadcrumb start */}
                <PageBreadcrumb pagename="select 2" />
                {/* Breadcrumb end */}
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
                                            <Select options={options} />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={4} md={6}>
                                <Card>
                                    <Card.Header>
                                        <h4>Multi select</h4>
                                    </Card.Header>
                                    <Card.Body>
                                             <Select isMulti options={options} />
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
