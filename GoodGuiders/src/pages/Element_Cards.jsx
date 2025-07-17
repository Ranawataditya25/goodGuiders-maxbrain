import * as React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import PageBreadcrumb from '../componets/PageBreadcrumb';
import IMAGE_URLS from "/src/pages/api/Imgconfig.js";

export default function Element_Cards() {
    const Carddata = [
        {
            "imgsrc": "pages/gallery/1.jpg",
            "title": "Card title",
            "deception": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
            "btn_text": "Read more"
        },
        {
            "imgsrc": "pages/gallery/2.jpg",
            "title": "Card title",
            "deception": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
            "btn_text": "Read more"
        },
        {
            "imgsrc": "pages/gallery/3.jpg",
            "title": "Card title",
            "deception": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
            "btn_text": "Read more"
        },
        {
            "imgsrc": "pages/gallery/4.jpg",
            "title": "Card title",
            "deception": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
            "btn_text": "Read more"
        },
        {
            "imgsrc": "pages/gallery/5.jpg",
            "title": "Card title",
            "deception": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
            "btn_text": "Read more"
        },
        {
            "imgsrc": "pages/gallery/6.jpg",
            "title": "Card title",
            "deception": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
            "btn_text": "Read more"
        }
    ]
    const Cardlist = [
        {
            "imgsrc": "pages/gallery/1.jpg",
            "title": "Card title",
            "list_text1": "An item",
            "list_text2": "A second item",
            "list_text3": "A third item"
        },
        {
            "imgsrc": "pages/gallery/2.jpg",
            "title": "Card title",
            "list_text1": "An item",
            "list_text2": "A second item",
            "list_text3": "A third item"
        },
        {
            "imgsrc": "pages/gallery/3.jpg",
            "title": "Card title",
            "list_text1": "An item",
            "list_text2": "A second item",
            "list_text3": "A third item"
        }

    ];
    const CardText = [
        {
            "headtitle": "Featured",
            "title": "Special title treatment",
            "title_text": "With supporting text below as a natural lead-in to additional content.",
            "btn": "Go somewhere",
            "days": "2 days ago"
        },
        {
            "headtitle": "Featured",
            "title": "Special title treatment",
            "title_text": "With supporting text below as a natural lead-in to additional content.",
            "btn": "Go somewhere",
            "days": "2 days ago"
        },
        {
            "headtitle": "Featured",
            "title": "Special title treatment",
            "title_text": "With supporting text below as a natural lead-in to additional content.",
            "btn": "Go somewhere",
            "days": "2 days ago"
        },
        {
            "headtitle": "Featured",
            "title": "Special title treatment",
            "title_text": "With supporting text below as a natural lead-in to additional content.",
            "btn": "Go somewhere",
            "days": "2 days ago"
        },
        {
            "headtitle": "Featured",
            "title": "Special title treatment",
            "title_text": "With supporting text below as a natural lead-in to additional content.",
            "btn": "Go somewhere",
            "days": "2 days ago"
        },
        {
            "headtitle": "Featured",
            "title": "Special title treatment",
            "title_text": "With supporting text below as a natural lead-in to additional content.",
            "btn": "Go somewhere",
            "days": "2 days ago"
        }
    ];
    const ColoredCard = [
        {
            "headtitle": "Header",
            "title": " card title ",
            "title_text": "Some quick example text to build on the card title and make up the bulk of the card's content."
        }
    ]
  return (
    <>
    <div className="themebody-wrap">
        {/* breadcrumb start */}
        <PageBreadcrumb pagename="Cards" />
        {/* breadcrumb end */}
        {/* theme body start */}
        <div className="theme-body">
            <Container fluid>
                <Row className="cdxcard-exa">
                    <h4 className="mb-20">card with image</h4>
                    {Carddata.map((item, index) => {
                        const imgsrc = IMAGE_URLS[item.imgsrc];
                        return(
                        <Col key={index} xl={4} sm={6}>
                            <Card>
                                <img className="img-fluid" src={imgsrc} alt="1.jpg" />
                                <Card.Body>
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text text-light">{item.deception}</p>
                                    <a className="btn btn-primary mt-3" href="#!">{item.btn_text}</a>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                    })}
                </Row>
                <Row className="cdxcard-exa">
                    <h4 className="mb-20">listing card</h4>
                    {Cardlist.map((item, index) => {
                        const imgsrc = IMAGE_URLS[item.imgsrc];
                        return(
                        <Col key={index} xl={4} sm={6}>
                            <Card>
                                <img className="img-fluid" src={imgsrc} alt="1.jpg" />
                                <Card.Body>
                                    <h5 className="card-title">{item.title}</h5>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">{item.list_text1}</li>
                                        <li className="list-group-item">{item.list_text2}</li>
                                        <li className="list-group-item">{item.list_text3} </li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                    })}
                </Row>
                <Row className="cdxcard-exa">
                    <h4 className="mb-20">card with text</h4>
                    {CardText.map((item, index) => (
                        <Col key={index} xl={4} sm={6}>
                            <Card className="card text-center">
                                <Card.Header>
                                    <h4>{item.headtitle}</h4>
                                </Card.Header>
                                <Card.Body>
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text"> {item.title_text}</p>
                                    <a className="btn btn-primary mt-3" href="#">{item.btn}</a>
                                </Card.Body>
                                <div className="card-footer text-muted">{item.days}</div>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Row className="cdxcard-exa">
                    <h4 className="mb-20">colored card</h4>
                    <>
                        {ColoredCard.map((items, index) => (
                            [
                                'Primary',
                                'Secondary',
                                'Success',
                                'Danger',
                                'Warning',
                                'Info',
                            ].map((variant,index) => (
                                < Col key={index} xl={4} sm={6} >
                                    <Card bg={variant.toLowerCase()} key={variant} text={variant.toLowerCase() === 'light' ? 'dark' : 'white'} className="card text-white mb-3" >
                                        <Card.Header>
                                            <h4 className="text-white"> {items.headtitle}</h4>
                                        </Card.Header>
                                        <Card.Body>
                                            <h5 className="card-title"> {variant} {items.title}</h5>
                                            <p className="card-text">{items.title_text}</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ))};

                    </>

                </Row>
            </Container>
        </div>
        {/* theme body end */}
    </div >
    
</>
  )
}
