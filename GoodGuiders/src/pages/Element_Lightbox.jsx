import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import PageBreadcrumb from '../componets/PageBreadcrumb';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import IMAGE_URLS from "/src/pages/api/Imgconfig.js";

export default function Element_Lightbox() {
    useEffect(() => {
        Fancybox.bind('[data-fancybox="gallery"]', {});
        return () => {
            Fancybox.destroy();
        };
    }, []);
    const Lightbox = [
        {
            "imgsrc": "pages/gallery/1.jpg",
        },
        {
            "imgsrc": "pages/gallery/2.jpg",
        },
        {
            "imgsrc": "pages/gallery/3.jpg",
        },
        {
            "imgsrc": "pages/gallery/4.jpg",
        },
        {
            "imgsrc": "pages/gallery/5.jpg",
        },
        {
            "imgsrc": "pages/gallery/6.jpg",
        },
        {
            "imgsrc": "pages/gallery/7.jpg",
        },
        {
            "imgsrc": "pages/gallery/8.jpg",
        }
    ]

  return (
    <>
            <div className="themebody-wrap">
                {/* breadcrumb start */}
                <PageBreadcrumb pagename="Lightbox" />

                {/* breadcrumb end */}
                {/* theme body start */}
                <div className="theme-body">
                    <Container fluid>
                        <Row>
                            <Col sm={12}>
                                <Card>
                                    <Card.Header>
                                        <h4>light box</h4>
                                    </Card.Header>
                                    <Row className="card-body  gallery-row">
                                        {Lightbox.map((item, index) => {
                                            const imgsrc = IMAGE_URLS[item.imgsrc];
                                            return(
                                            <Col lg={3} md={4} sm={6} key={index}>
                                                <div className="cdxlight-box">
                                                    <a data-fancybox="gallery" data-src={imgsrc} data-caption="">
                                                            <img className="img-fluid" src={imgsrc} alt="gallery" />
                                                        </a>
                                                </div>
                                            </Col>
                                        )
                                        })};
                                    </Row>
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
