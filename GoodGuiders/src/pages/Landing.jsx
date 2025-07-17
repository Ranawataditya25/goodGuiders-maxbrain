import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as TablerIcons from '@tabler/icons-react';
import { Container, Row, Col, Nav, Navbar} from 'react-bootstrap';
import IMAGE_URLS from "/src/pages/api/Imgconfig.js"; 

export default function Landing() {

    const [isSticky, setIsSticky] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 78) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        // Cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>

            {/* Header Start */}
            <header className={`landing-header ${isSticky ? 'sticky' : ''}`}>
                <Container>
                    <Row>
                        <Col xs={12}>
                            <Navbar collapseOnSelect expand="xl" className='py-0'>
                                <Navbar.Brand href="#home" className="codexbrand-logo d-flex align-items-center me-0">                                   
                                    <img className="img-fluid" src={IMAGE_URLS['logo/icon-logo.png']} alt="logo" />
                                    <span className="ms-2 text-white fs-24">Medixo</span>
                                </Navbar.Brand>
                                <Navbar.Collapse className='justify-content-xl-center' id="responsive-navbar-nav">
                                    <ul className="menu-list">
                                        <li>
                                            <Nav.Link href="#">Home</Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link href="#pages">Pages</Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link href="#application">Application</Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link href="#freamworks">Frameworks</Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link href="#feature">Feature</Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link target="_blank" href="https://codextheme.codexperts.in/bootstrapreact/medixo-documentation/html/index.html">Documentation</Nav.Link>
                                        </li>
                                    </ul>
                                </Navbar.Collapse>
                                <div>
                                    <Link to="#!" className="btn btn-secondary">Buy Now</Link>
                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="align-middle d-xl-none ms-3 p-0 menu-action">
                                        <TablerIcons.IconMenu2 className='text-white fs-2' />
                                    </Navbar.Toggle>
                                </div>
                            </Navbar>
                        </Col>
                    </Row>
                </Container>
            </header>
            {/* Header End */}


            {/* Page Body Start */}
            <main className="landing-wrap">

                {/* Hero Start */}
                <section className="hero-sec">
                    <Container>
                        <Row className="align-items-center justify-content-center">
                            <Col lg={6} md={10}>
                                <div className="hero-contain">
                                    <div>
                                        <h6 className="text-white mb-3">
                                            <div className='icon-wrap'>
                                                <TablerIcons.IconRocket />
                                            </div>
                                            Kick Start Your Project With
                                        </h6>
                                        <h2 className="text-white mb-2">Enhance Developer's Productivity with a Medixo</h2>
                                        <p className="text-white">Medixo comes with light & dark color skins, well designed dashboards, applications and pages.</p>
                                        <Link to="/login" target="_blank" className="btn btn-primary">Login</Link>
                                        <Link to="/" target="_blank" className="btn btn-secondary ms-2">Live Preview</Link>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={6} className="text-lg-end">
                                <img src={IMAGE_URLS['landing/hero-demo.png']} className="img-fluid d-lg-inline-block d-none" alt="" />
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/* Hero End */}

                {/* Dashboard Start */}
                <section className="py-70 bg-white" id="pages">
                    <Container>
                        <Row className="gy-4 justify-content-center">
                            <Col xs={12}>
                                <div className="landing-title">
                                    <h2>Creative Layouts</h2>
                                    <p>We comes up with most creative and useful main general purpose dashboard template</p>
                                </div>
                            </Col>
                            <Col lg={4} md={6}>
                                <div className="demo-grid">
                                    <div className="img-wrap">
                                        <Link to="/" target="_blank">
                                            <img src={IMAGE_URLS['landing/dashboard/1.jpg']} alt="" className="img-fluid" />
                                        </Link>
                                    </div>
                                    <div className="demo-detail">
                                        <Link to="/" target="_blank" className="demo-title">Dashboard 1</Link>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={6}>
                                <div className="demo-grid">
                                    <div className="img-wrap">
                                        <Link to="/doctor-dashboard" target="_blank">
                                            <img src={IMAGE_URLS['landing/dashboard/2.jpg']} alt="" className="img-fluid" />
                                        </Link>
                                    </div>
                                    <div className="demo-detail">
                                        <Link to="/doctor-dashboard" target="_blank" className="demo-title">Dashboard 2</Link>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={6}>
                                <div className="demo-grid">
                                    <div className="img-wrap">
                                        <Link to="/patient-dashboard" target="_blank">
                                            <img src={IMAGE_URLS['landing/dashboard/3.jpg']} alt="" className="img-fluid" />
                                        </Link>
                                    </div>
                                    <div className="demo-detail">
                                        <Link to="/patient-dashboard" target="_blank" className="demo-title">Dashboard 3</Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/* Dashboard End */}

                {/* Freamwork Start */}
                <section className="py-70" id="freamworks">
                    <Container>
                        <Row className="gy-4 justify-content-center">
                            <Col xs={12}>
                                <div className="landing-title">
                                    <h2>Top Frameworks</h2>
                                    <p>Various Editions of the Crocs Admin Template Available in React</p>
                                </div>
                            </Col>
                            <Col xxl={2} lg={3} md={4} xs={6}>
                                <div className="freamwork-grid">
                                    <div className="icon-wrap">
                                        <img src={IMAGE_URLS['landing/feathur/1.png']} alt="" className="img-fluid" />
                                    </div>
                                    <div className="freamwork-detail">
                                        <h6>Sass</h6>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={2} lg={3} md={4} xs={6}>
                                <div className="freamwork-grid">
                                    <div className="icon-wrap">
                                        <img src={IMAGE_URLS['landing/feathur/2.png']} alt="" className="img-fluid" />
                                    </div>
                                    <div className="freamwork-detail">
                                        <h6>Forms</h6>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={2} lg={3} md={4} xs={6}>
                                <div className="freamwork-grid">
                                    <div className="icon-wrap">
                                        <img src={IMAGE_URLS['landing/feathur/3.png']} alt="" className="img-fluid" />
                                    </div>
                                    <div className="freamwork-detail">
                                        <h6>Tables</h6>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={2} lg={3} md={4} xs={6}>
                                <div className="freamwork-grid">
                                    <div className="icon-wrap">
                                        <img src={IMAGE_URLS['landing/feathur/4.png']} alt="" className="img-fluid" />
                                    </div>
                                    <div className="freamwork-detail">
                                        <h6>Bootstrap</h6>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={2} lg={3} md={4} xs={6}>
                                <div className="freamwork-grid">
                                    <div className="icon-wrap">
                                        <img src={IMAGE_URLS['landing/feathur/5.png']} alt="" className="img-fluid" />
                                    </div>
                                    <div className="freamwork-detail">
                                        <h6>Google Font</h6>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={2} lg={3} md={4} xs={6}>
                                <div className="freamwork-grid">
                                    <div className="icon-wrap">
                                        <img src={IMAGE_URLS['landing/feathur/6.png']} alt="" className="img-fluid" />
                                    </div>
                                    <div className="freamwork-detail">
                                        <h6>Dark Mode</h6>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={2} lg={3} md={4} xs={6}>
                                <div className="freamwork-grid">
                                    <div className="icon-wrap">
                                        <img src={IMAGE_URLS['landing/feathur/7.png']} alt="" className="img-fluid" />
                                    </div>
                                    <div className="freamwork-detail">
                                        <h6>Easy To Customize</h6>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={2} lg={3} md={4} xs={6}>
                                <div className="freamwork-grid">
                                    <div className="icon-wrap">
                                        <img src={IMAGE_URLS['landing/feathur/8.png']} alt="" className="img-fluid" />
                                    </div>
                                    <div className="freamwork-detail">
                                        <h6>Fully Responsive</h6>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={2} lg={3} md={4} xs={6}>
                                <div className="freamwork-grid">
                                    <div className="icon-wrap">
                                        <img src={IMAGE_URLS['landing/feathur/9.png']} alt="" className="img-fluid" />
                                    </div>
                                    <div className="freamwork-detail">
                                        <h6>Clean Code</h6>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={2} lg={3} md={4} xs={6}>
                                <div className="freamwork-grid">
                                    <div className="icon-wrap">
                                        <img src={IMAGE_URLS['landing/feathur/10.png']} alt="" className="img-fluid" />
                                    </div>
                                    <div className="freamwork-detail">
                                        <h6>Chart</h6>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={2} lg={3} md={4} xs={6}>
                                <div className="freamwork-grid">
                                    <div className="icon-wrap">
                                        <img src={IMAGE_URLS['landing/feathur/11.png']} alt="" className="img-fluid" />
                                    </div>
                                    <div className="freamwork-detail">
                                        <h6>Documentation</h6>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={2} lg={3} md={4} xs={6}>
                                <div className="freamwork-grid">
                                    <div className="icon-wrap">
                                        <img src={IMAGE_URLS['landing/feathur/12.png']} alt="" className="img-fluid" />
                                    </div>
                                    <div className="freamwork-detail">
                                        <h6>Free Updates</h6>
                                    </div>
                                </div>
                            </Col>                         
                            <Col xxl={2} lg={3} md={4} xs={6}>
                                <div className="freamwork-grid">
                                    <div className="icon-wrap">
                                        <img src={IMAGE_URLS['landing/feathur/14.png']} alt="" className="img-fluid" />
                                    </div>
                                    <div className="freamwork-detail">
                                        <h6>Multiple Demos</h6>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={2} lg={3} md={4} xs={6}>
                                <div className="freamwork-grid">
                                    <div className="icon-wrap">
                                        <img src={IMAGE_URLS['landing/feathur/15.png']} alt="" className="img-fluid" />
                                    </div>
                                    <div className="freamwork-detail">
                                        <h6>Avtar</h6>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={2} lg={3} md={4} xs={6}>
                                <div className="freamwork-grid">
                                    <div className="icon-wrap">
                                        <img src={IMAGE_URLS['landing/feathur/16.png']} alt="" className="img-fluid" />
                                    </div>
                                    <div className="freamwork-detail">
                                        <h6>Breadcrumb</h6>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={2} lg={3} md={4} xs={6}>
                                <div className="freamwork-grid">
                                    <div className="icon-wrap">
                                        <img src={IMAGE_URLS['landing/feathur/17.png']} alt="" className="img-fluid" />
                                    </div>
                                    <div className="freamwork-detail">
                                        <h6>Slick Slider</h6>
                                    </div>
                                </div>
                            </Col>                           
                            <Col xxl={2} lg={3} md={4} xs={6}>
                                <div className="freamwork-grid">
                                    <div className="icon-wrap">
                                        <img src={IMAGE_URLS['landing/feathur/19.png']} alt="" className="img-fluid" />
                                    </div>
                                    <div className="freamwork-detail">
                                        <h6>Tooltip</h6>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={2} lg={3} md={4} xs={6}>
                                <div className="freamwork-grid">
                                    <div className="icon-wrap">
                                        <img src={IMAGE_URLS['landing/feathur/20.png']} alt="" className="img-fluid" />
                                    </div>
                                    <div className="freamwork-detail">
                                        <h6>Dropdown</h6>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={2} lg={3} md={4} xs={6}>
                                <div className="freamwork-grid">
                                    <div className="icon-wrap">
                                        <img src={IMAGE_URLS['landing/feathur/21.png']} alt="" className="img-fluid" />
                                    </div>
                                    <div className="freamwork-detail">
                                        <h6>Accordion</h6>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={2} lg={3} md={4} xs={6}>
                                <div className="freamwork-grid">
                                    <div className="icon-wrap">
                                        <img src={IMAGE_URLS['landing/feathur/22.png']} alt="" className="img-fluid" />
                                    </div>
                                    <div className="freamwork-detail">
                                        <h6>Grid</h6>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={2} lg={3} md={4} xs={6}>
                                <div className="freamwork-grid">
                                    <div className="icon-wrap">
                                        <img src={IMAGE_URLS['landing/feathur/23.png']} alt="" className="img-fluid" />
                                    </div>
                                    <div className="freamwork-detail">
                                        <h6>Typography</h6>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/* Freamwork End */}

                {/* Application Start */}
                <section className="py-70 bg-white" id="application">
                    <Container>
                        <Row className="gy-4 justify-content-center">
                            <Col xs={12}>
                                <div className="landing-title">
                                    <h2>Usefull Application</h2>
                                    <p>Medixo admin template provides 3 workable application and designs of other applications.</p>
                                </div>
                            </Col>
                            <Col lg={4} md={6}>
                                <div className="demo-grid">
                                    <div className="img-wrap">
                                        <Link to="/all-doctors" target="_blank">
                                            <img src={IMAGE_URLS['landing/application/1.jpg']} alt="" className="img-fluid" />
                                        </Link>
                                    </div>
                                    <div className="demo-detail">
                                        <Link to="/all-doctors" target="_blank" className="demo-title">All Mentor</Link>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={6}>
                                <div className="demo-grid">
                                    <div className="img-wrap">
                                        <Link to="/all-patients" target="_blank">
                                            <img src={IMAGE_URLS['landing/application/2.jpg']} alt="" className="img-fluid" />
                                        </Link>
                                    </div>
                                    <div className="demo-detail">
                                        <Link to="/all-patients" target="_blank" className="demo-title">All Patients</Link>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={6}>
                                <div className="demo-grid">
                                    <div className="img-wrap">
                                        <Link to="/doctor-schedule" target="_blank">
                                            <img src={IMAGE_URLS['landing/application/3.jpg']} alt="" className="img-fluid" />
                                        </Link>
                                    </div>
                                    <div className="demo-detail">
                                        <Link to="/doctor-schedule" target="_blank" className="demo-title">Mentor schedule</Link>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={6}>
                                <div className="demo-grid">
                                    <div className="img-wrap">
                                        <Link to="/patient-invoice" target="_blank">
                                            <img src={IMAGE_URLS['landing/application/4.jpg']} alt="" className="img-fluid" />
                                        </Link>
                                    </div>
                                    <div className="demo-detail">
                                        <Link to="/patient-invoice" target="_blank" className="demo-title">Patient Invoice</Link>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={6}>
                                <div className="demo-grid">
                                    <div className="img-wrap">
                                        <Link to="/support" target="_blank">
                                            <img src={IMAGE_URLS['landing/application/5.jpg']} alt="" className="img-fluid" />
                                        </Link>
                                    </div>
                                    <div className="demo-detail">
                                        <Link to="/support" target="_blank" className="demo-title">help center</Link>
                                    </div>
                                </div>
                            </Col>                           
                        </Row>
                    </Container>
                </section>
                {/* Application Etart */}

                {/* Features Start */}
                <section className="features py-70" id="feature">
                    <Container>
                        <Row className="gy-4">
                            <Col xs="12">
                                <div className="landing-title">
                                    <h2>Unique Features</h2>
                                    <p>We are using scss 7-1 tire folder structure for this admin template</p>
                                </div>
                            </Col>
                            <Col xs={3} lg={4} sm={6}>
                                <div className="feature-grid">
                                    <div className="icon-wrap">
                                        <TablerIcons.IconBrandBootstrap />
                                    </div>
                                    <div className="feature-detail">
                                        <h5>Bootstrap 5</h5>
                                        <p>Cloud ui is built with latest version of bootstrap 5</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={3} lg={4} sm={6}>
                                <div className="feature-grid">
                                    <div className="icon-wrap">
                                        <TablerIcons.IconCode />
                                    </div>
                                    <div className="feature-detail">
                                        <h5>Seamless Coding</h5>
                                        <p>Refined templates, W3C code for top quality</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={3} lg={4} sm={6}>
                                <div className="feature-grid">
                                    <div className="icon-wrap">
                                        <TablerIcons.IconSettings />
                                    </div>
                                    <div className="feature-detail">
                                        <h5>Easy to Customize</h5>
                                        <p>Our Template is easy to do any required changes.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={3} lg={4} sm={6}>
                                <div className="feature-grid">
                                    <div className="icon-wrap">
                                        <TablerIcons.IconTable />
                                    </div>
                                    <div className="feature-detail">
                                        <h5>Lots of table example</h5>
                                        <p>Many table options for you to choose.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={3} lg={4} sm={6}>
                                <div className="feature-grid">
                                    <div className="icon-wrap">
                                        <TablerIcons.IconCloudUpload />
                                    </div>
                                    <div className="feature-detail">
                                        <h5>Multiple file uploads</h5>
                                        <p>option to upload more than one file at one time</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={3} lg={4} sm={6}>
                                <div className="feature-grid">
                                    <div className="icon-wrap">
                                        <TablerIcons.IconCalendar />
                                    </div>
                                    <div className="feature-detail">
                                        <h5>Calendar design</h5>
                                        <p>Included calendar app with material design.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={3} lg={4} sm={6}>
                                <div className="feature-grid">
                                    <div className="icon-wrap">
                                        <TablerIcons.IconPhoto />
                                    </div>
                                    <div className="feature-detail">
                                        <h5>Gallery options</h5>
                                        <p>included gallery options for you to showcase products</p>
                                    </div>
                                </div>
                            </Col>                          
                            <Col xs={3} lg={4} sm={6}>
                                <div className="feature-grid">
                                    <div className="icon-wrap">
                                        <TablerIcons.IconDevices2 />
                                    </div>
                                    <div className="feature-detail">
                                        <h5>Fully responsive</h5>
                                        <p>Fully responsive: displays well on any device size.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={3} lg={4} sm={6}>
                                <div className="feature-grid">
                                    <div className="icon-wrap">
                                        <TablerIcons.IconHelpOctagon />
                                    </div>
                                    <div className="feature-detail">
                                        <h5>Premium support</h5>
                                        <p>Reliable support for every query, always available.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={3} lg={4} sm={6}>
                                <div className="feature-grid">
                                    <div className="icon-wrap">
                                        <TablerIcons.IconBrandBootstrap />
                                    </div>
                                    <div className="feature-detail">
                                        <h5>Clean design</h5>
                                        <p>Design that is clear and appealing</p>
                                    </div>
                                </div>
                            </Col>                           
                        </Row>
                    </Container>
                </section>
                {/* Features End */}

                {/* Support Start */}
                <section className="lan-supports py-70 bg-white">
                    <Container>
                        <Row className="gy-4 align-items-center">
                            <Col md={12}>
                                <div className="landing-title">
                                    <h2>Premium Support</h2>
                                    <p>“fast issue resolution, and dedicated experts for a seamless experience”</p>
                                </div>
                            </Col>
                            <Col md={6} className="order-1 order-md-0">
                                <div className="support-detail">
                                    <h3 className="mb-3">Our License</h3>
                                    <h2 className="mb-3 fw-bold">We Give It As We Think That Excellent Support Is Needed</h2>
                                    <p>Check our reviews for fast and accurate support to ensure support. we offer premium assistance around-the-clock for any bugs you encounter. and we’ll do best to help you out with any future updates for free.</p>
                                    <Link to="#!" className="btn btn-primary mt-4">Support</Link>
                                </div>
                            </Col>
                            <Col md={6} className="text-md-end">
                                <img src={IMAGE_URLS['landing/support.png']} alt="" className="img-fluid" />
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/* Support End */}

            </main>
            {/* Page Body End */}

            {/* Footer Start */}
            <footer className="landing-footer py-70">
                <Container>
                    <Row>
                        <Col md={12}>
                            <Link className="codexbrand-logo d-flex align-items-center justify-content-center mb-3" to="#!">
                            <img className="img-fluid" src={IMAGE_URLS['logo/icon-logo.png']} alt="logo" />
                            <span className="ms-2 text-white fs-24">Medixo0000000</span>
                            </Link>
                            <h2 className="text-white">
                                Let's Buy Our Unique & Creative Design
                                <br /> Responsive Admin Template
                            </h2>
                            <ul className="d-flex justify-content-center mt-2 gap-2">
                                <li>
                                    <TablerIcons.IconStarFilled className='text-warning fs-2' />
                                </li>
                                <li>
                                    <TablerIcons.IconStarFilled className='text-warning fs-2' />
                                </li>
                                <li>
                                    <TablerIcons.IconStarFilled className='text-warning fs-2' />
                                </li>
                                <li>
                                    <TablerIcons.IconStarFilled className='text-warning fs-2' />
                                </li>
                                <li>
                                    <TablerIcons.IconStarFilled className='text-warning fs-2' />
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </footer>
            {/* Footer End */}            

        </>
    )
}