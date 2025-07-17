import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { Row, Col, Card, Table, Container } from "react-bootstrap";
import PageBreadcrumb from "../componets/PageBreadcrumb";
import Chart from "react-apexcharts";
import { doctskill, Gallerydata } from "./js/Dashboard2";

import IMAGE_URLS from "/src/pages/api/Imgconfig.js";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export default function Dashboard2() {
  useEffect(() => {
    Fancybox.bind('[data-fancybox="gallery"]', {});
    return () => {
      Fancybox.destroy();
    };
  }, []);
  return (
    <div className="themebody-wrap">
      {/* Breadcrumb Start */}
      <PageBreadcrumb pagename="Mentor Dashboard" />
      {/* Breadcrumb End */}
      {/* theme body start */}
      <div className="theme-body">
        <Container fluid className="cdxuser-profile">
          <Row>
            <Col xxl={4} md={6}>
              <Card className="doctor-probox">
                <div className="img-wrap"></div>
                <Card.Body>
                  <div className="profile-head">
                    <div className="proimg-wrap">
                      <img
                        className="img-fluid"
                        src={IMAGE_URLS["avtar/1.jpg"]}
                        alt=""
                      />
                    </div>
                    <h4>Elizabeth Blackwell</h4>
                    <span>Cardiologists</span>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam,{" "}
                    </p>
                    <div className="group-btn">
                      <Link
                        className="btn btn-primary"
                        href="javascript:void(0);"
                      >
                        Send Email
                      </Link>
                      <Link
                        className="btn btn-secondary"
                        href="javascript:void(0);"
                      >
                        Send Message
                      </Link>
                    </div>
                  </div>
                </Card.Body>
                <ul className="docactivity-list">
                  <li>
                    <h4>2000</h4>
                    <span>Biology</span>
                  </li>
                  <li>
                    <h4>99</h4>
                    <span>Biology</span>
                  </li>
                  <li>
                    <h4>9999</h4>
                    <span>Biology</span>
                  </li>
                </ul>
              </Card>
            </Col>
            <Col xxl={4} md={6}>
              <Card>
                <Card.Header>
                  <h4>Notifications</h4>
                </Card.Header>
                <Card.Body>
                  <ul className="docnoti-list">
                    <li>
                      <div className="media">
                        <img
                          className="rounded-50 w-40"
                          src={IMAGE_URLS["avtar/1.jpg"]}
                          alt=""
                        />
                        <div className="media-body">
                          <h6>Anna Send you Photo</h6>
                          <span className="text-light">10, Feb ,2023</span>
                        </div>
                        <div className="badge badge-primary">10:15 Pm</div>
                      </div>
                    </li>
                    <li>
                      <div className="media">
                        <img
                          className="rounded-50 w-40"
                          src={IMAGE_URLS["avtar/2.jpg"]}
                          alt=""
                        />
                        <div className="media-body">
                          <h6> Anna Send you Photo</h6>
                          <span className="text-light">05, March ,2023</span>
                        </div>
                        <div className="badge badge-primary">09:20 Pm</div>
                      </div>
                    </li>
                    <li>
                      <div className="media">
                        <img
                          className="rounded-50 w-40"
                          src={IMAGE_URLS["avtar/3.jpg"]}
                          alt=""
                        />
                        <div className="media-body">
                          <h6> Anna Send you Photo</h6>
                          <span className="text-light">01, Jan ,2023</span>
                        </div>
                        <div className="badge badge-primary">03:40 Pm</div>
                      </div>
                    </li>
                    <li>
                      <div className="media">
                        <img
                          className="rounded-50 w-40"
                          src={IMAGE_URLS["avtar/4.jpg"]}
                          alt=""
                        />
                        <div className="media-body">
                          <h6> Anna Send you Photo</h6>
                          <span className="text-light">25, Feb ,2023</span>
                        </div>
                        <div className="badge badge-primary">05:26 Am </div>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
                <div className="card-footer">
                  <Link className="btn btn-primary d-block mx-auto btn-lg">
                    See All Notification
                  </Link>
                </div>
              </Card>
            </Col>
            <Col xxl={4} md={6}>
              <div className="card">
                <Card.Header>
                  <h4>Skill</h4>
                </Card.Header>
                <Card.Body>
                  <Chart
                    options={doctskill}
                    series={doctskill.series}
                    height={410}
                    type="pie"
                  />
                </Card.Body>
              </div>
            </Col>
            <Col xxl={4} md={6}>
              <div className="card">
                <Card.Header>
                  <h4>Personal Information</h4>
                </Card.Header>
                <Card.Body>
                  <ul className="contact-list">
                    <li>
                      <div className="iocn-item">
                        <FeatherIcon icon="user" />
                      </div>
                      <h6> Alex Spencer</h6>
                    </li>
                    <li>
                      <div className="iocn-item">
                        <FeatherIcon icon="bookmark" />
                      </div>
                      <h6> Senior Mentor</h6>
                    </li>
                    <li>
                      <div className="iocn-item">
                        <FeatherIcon icon="phone-call" />
                      </div>
                      <h6>
                        {" "}
                        <Link href="tel:+9588489584">+9588489584</Link>
                      </h6>
                    </li>
                    <li>
                      <div className="iocn-item">
                        <FeatherIcon icon="mail" />
                      </div>
                      <h6>
                        {" "}
                        <Link href="mailto:test@example.com">
                          test@example.com
                        </Link>
                      </h6>
                    </li>
                    <li>
                      <div className="iocn-item">
                        <FeatherIcon icon="map-pin" />
                      </div>
                      <h6> live in uk</h6>
                    </li>
                    <li>
                      <div className="iocn-item">
                        <FeatherIcon icon="globe" />
                      </div>
                      <h6> https://DK@Dk.components.com</h6>
                    </li>
                  </ul>
                </Card.Body>
              </div>
            </Col>
            <Col xxl={4} md={6}>
              <div className="card">
                <Card.Header>
                  <h4>Speciality</h4>
                </Card.Header>
                <Card.Body>
                  <ul className="speciality-list">
                    <li>
                      <div className="media">
                        <div className="icon-wrap bg-primary">
                          <i className="fa fa-trophy"></i>
                        </div>
                        <div className="media-body">
                          <h6>Certified</h6>
                          <span className="text-light">
                            Cold Laser Operation
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="media">
                        <div className="icon-wrap bg-primary">
                          <i className="fa fa-trophy"></i>
                        </div>
                        <div className="media-body">
                          <h6>professional</h6>
                          <span className="text-light">
                            Certified Skin Treatment
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="media">
                        <div className="icon-wrap bg-primary">
                          <i className="fa fa-trophy"></i>
                        </div>
                        <div className="media-body">
                          <h6>Medication Laser</h6>
                          <span className="text-light">Hair Lose Product </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </div>
            </Col>
            <Col xxl={4} md={6}>
              <div className="card doct-skill">
                <Card.Header>
                  <h4>Mentor Abilities</h4>
                </Card.Header>
                <Card.Body>
                  <div className="progress-group progressCounter">
                    <h6>
                      Biology{" "}
                      <span>
                        <span className="count">50</span>%
                      </span>
                    </h6>
                    <div className="progress">
                      <div
                        className="progress-bar bg-primary"
                        style={{ width: "90%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="progress-group progressCounter">
                    <h6>
                      Biology{" "}
                      <span>
                        <span className="count">80</span>%
                      </span>
                    </h6>
                    <div className="progress">
                      <div
                        className="progress-bar bg-success"
                        style={{ width: "90%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="progress-group progressCounter">
                    <h6>
                      Biology
                      <span>
                        <span className="count">40</span>%
                      </span>
                    </h6>
                    <div className="progress">
                      <div
                        className="progress-bar bg-secondary"
                        style={{ width: "90%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="progress-group progressCounter">
                    <h6>
                      Biology
                      <span>
                        <span className="count">60</span>%
                      </span>
                    </h6>
                    <div className="progress">
                      <div
                        className="progress-bar bg-info"
                        style={{ width: "90%" }}
                      ></div>
                    </div>
                  </div>
                </Card.Body>
              </div>
            </Col>
            <Col xxl={4} xl={12}>
              <div className="card">
                <Card.Header>
                  <h4>
                    {" "}
                    <i className="fa fa-picture-o"></i>Gallery
                  </h4>
                </Card.Header>
                <Card.Body>
                  <ul className="gallerypost-list">
                    {Gallerydata.map((galleryitem, index) => {
                      const imgSrc = IMAGE_URLS[galleryitem.imgsrc];
                      return (
                        <li key={index}>
                          <a
                            data-fancybox="gallery"
                            data-src={imgSrc}
                            data-caption=""
                          >
                            <img
                              className="img-fluid"
                              src={imgSrc}
                              alt="gallery"
                            />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </Card.Body>
              </div>
            </Col>
            <Col xxl={8} xl={12}>
              <div className="card">
                <Card.Header>
                  <h4>Appointment</h4>
                </Card.Header>
                <Card.Body>
                  <Table className="patients-tbl table">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Time </th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Tiger Nixon</td>
                        <td>9887123456</td>
                        <td>example@email.com</td>
                        <td>05/06/2023</td>
                        <td>08:00 Am</td>
                        <td>
                          {" "}
                          <span className="badge badge-success">start</span>
                        </td>
                        <td>
                          <Link href="edit-appointment.html">
                            <FeatherIcon icon="edit" className="w-18" />
                          </Link>
                          <Link
                            className="text-danger ml-8"
                            href="javascript:void(0);"
                          >
                            <FeatherIcon icon="trash-2" className="w-18" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Brielle Williamson</td>
                        <td>9928549279</td>
                        <td>example@email.com</td>
                        <td>08/09/2023</td>
                        <td>09:00 Am </td>
                        <td>
                          {" "}
                          <span className="badge badge-success">start</span>
                        </td>
                        <td>
                          <Link href="edit-appointment.html">
                            <FeatherIcon icon="edit" className="w-18" />
                          </Link>
                          <Link
                            className="text-danger ml-8"
                            href="javascript:void(0);"
                          >
                            <FeatherIcon icon="trash-2" className="w-18" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Cedric Kelly</td>
                        <td>8764366606</td>
                        <td>example@email.com</td>
                        <td>10/11/2023</td>
                        <td>10:00 Am </td>
                        <td>
                          {" "}
                          <span className="badge badge-danger">Canclled</span>
                        </td>
                        <td>
                          <Link href="edit-appointment.html">
                            <FeatherIcon icon="edit" className="w-18" />
                          </Link>
                          <Link
                            className="text-danger ml-8"
                            href="javascript:void(0);"
                          >
                            <FeatherIcon icon="trash-2" className="w-18" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Charde Marshall</td>
                        <td>9468844326</td>
                        <td>example@email.com</td>
                        <td>12/06/2023</td>
                        <td>11:00 Am </td>
                        <td>
                          {" "}
                          <span className="badge badge-danger">Canclled</span>
                        </td>
                        <td>
                          <Link href="edit-appointment.html">
                            <FeatherIcon icon="edit" className="w-18" />
                          </Link>
                          <Link
                            className="text-danger ml-8"
                            href="javascript:void(0);"
                          >
                            <FeatherIcon icon="trash-2" className="w-18" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Dai Rios</td>
                        <td>7878123456</td>
                        <td>example@email.com</td>
                        <td>02/02/2023</td>
                        <td>12:00 Am </td>
                        <td>
                          {" "}
                          <span className="badge badge-info">pending</span>
                        </td>
                        <td>
                          <Link href="edit-appointment.html">
                            <FeatherIcon icon="edit" className="w-18" />
                          </Link>
                          <Link
                            className="text-danger ml-8"
                            href="javascript:void(0);"
                          >
                            <FeatherIcon icon="trash-2" className="w-18" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Garrett Winters</td>
                        <td>9602302020</td>
                        <td>example@email.com</td>
                        <td>08/12/2023</td>
                        <td>02:00 Pm </td>
                        <td>
                          {" "}
                          <span className="badge badge-info">pending</span>
                        </td>
                        <td>
                          <Link href="edit-appointment.html">
                            <FeatherIcon icon="edit" className="w-18" />
                          </Link>
                          <Link
                            className="text-danger ml-8"
                            href="javascript:void(0);"
                          >
                            <FeatherIcon icon="trash-2" className="w-18" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Gloria Little</td>
                        <td>9922334455</td>
                        <td>example@email.com</td>
                        <td>12/02/2023</td>
                        <td>03:00 Pm </td>
                        <td>
                          {" "}
                          <span className="badge badge-warning">
                            re schedule
                          </span>
                        </td>
                        <td>
                          <Link href="edit-appointment.html">
                            <FeatherIcon icon="edit" className="w-18" />
                          </Link>
                          <Link
                            className="text-danger ml-8"
                            href="javascript:void(0);"
                          >
                            <FeatherIcon icon="trash-2" className="w-18" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Jena Gaines</td>
                        <td>876454545</td>
                        <td>example@email.com</td>
                        <td>10/12/2023</td>
                        <td>04:00 Pm </td>
                        <td>
                          {" "}
                          <span className="badge badge-warning">
                            re schedule
                          </span>
                        </td>
                        <td>
                          <Link href="edit-appointment.html">
                            <FeatherIcon icon="edit" className="w-18" />
                          </Link>
                          <Link
                            className="text-danger ml-8"
                            href="javascript:void(0);"
                          >
                            <FeatherIcon icon="trash-2" className="w-18" />
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* theme body end */}
    </div>
  );
}
