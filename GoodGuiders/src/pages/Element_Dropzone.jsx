import React, { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone'
import PageBreadcrumb from '../componets/PageBreadcrumb';

export default function Element_Dropzone() {
    // DropZon Start 
    const [searchInpval, setsearchInpval] = useState({
        uploadfiles: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setsearchInpval({ ...searchInpval, [name]: value, });

    };
    // File Upload    
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            // Handle files
        },
    });
  return (
    <>
    <div className="themebody-wrap">
        {/* breadcrumb start */}
        <PageBreadcrumb pagename="dropzone" />
        {/* breadcrumb end */}
        {/* theme body start */}
        <div className="theme-body cdxshopping-cart">
            <Container fluid>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>

                                <div className="dropzone" {...getRootProps()}>
                                    <Form.Control {...getInputProps()} name='uploadfiles' value={searchInpval.uploadfiles} onChange={handleChange} />
                                    <div className="dz-default dz-message">
                                        <div className="upload-icon">
                                            <i className="fa fa-cloud-upload"></i>
                                        </div>
                                        <h3>Drop files here or click to upload.</h3>
                                    </div>
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
