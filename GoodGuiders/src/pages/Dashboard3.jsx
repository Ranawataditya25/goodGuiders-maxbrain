// import React from "react";
// import { Link } from "react-router-dom";
// import { Row, Col, Card, Table, Container } from "react-bootstrap";
// import PageBreadcrumb from "../componets/PageBreadcrumb";

// import Chart from "react-apexcharts";
// import {
//   bloodpreport,
//   heartrate,
//   glucoserate,
//   clolesterol,
//   bloodlevel,
// } from "./js/Dashboard3";
// import IMAGE_URLS from "/src/pages/api/Imgconfig.js";

// export default function Dashboard3() {

//   const status = document.getElementById("status");
//   if (status.innerText.trim() === "Active") {
//     status.classList.add("status-active");
//   } else {
//     status.classList.add("status-inactive");
//   }

//   return (
//     <div className="themebody-wrap">
//       {/* Breadcrumb Start */}
//       <PageBreadcrumb pagename="Student Dashboard" />
//       {/* Breadcrumb End */}
//       {/* theme body start */}
//       <div className="theme-body">
//         <Container fluid className="cdxuser-profile">
//           <Row>
//             <Col xxl={4} xl={12}>
//               <Row>
//                 <Col xxl={12} md={6}>
//                   <Card>
//                     <Card.Header>
//                       <h4>Personal Information</h4>
//                     </Card.Header>
//                     <Card.Body>
//                       <div className="table-responsive">
//                         <ul className="contact-list">
//                           <li>
//                             {" "}
//                             <span>name:</span>Daniel Smith
//                           </li>
//                           <li>
//                             {" "}
//                             <span>date of birth:</span>18-09-2015
//                           </li>
//                           <li>
//                             {" "}
//                             <span>Gender:</span>Male
//                           </li>
//                           <li>
//                             {" "}
//                             <span>Address:</span>Live In Uk
//                           </li>
//                           <li>
//                             {" "}
//                             <span>Phone:</span>+1 80 606590
//                           </li>
//                           <li>
//                             {" "}
//                             <span>Email:</span>daniel@example.com
//                           </li>
//                         </ul>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//                 <Col xxl={12} md={6}>
//                   <Card className="doctor-probox">
//                     <div className="img-wrap"></div>
//                     <Card.Body>
//                       <div className="profile-head">
//                         <div className="proimg-wrap">
//                           <img
//                             className="img-fluid"
//                             src={IMAGE_URLS["avtar/1.jpg"]}
//                             alt=""
//                           />
//                         </div>
//                         <h4>Cedric Kelly</h4>
//                         <span>25 years, California</span>
//                         <p>
//                           Lorem ipsum dolor sit amet, consectetur adipisicing
//                           elit, sed do eiusmod tempor incididunt ut labore et
//                           dolore magna aliqua. Ut enim ad minim veniam,
//                         </p>
//                       </div>
//                     </Card.Body>
//                     <ul className="docactivity-list">
//                       <li>
//                         <h4>50kg</h4>
//                         <span>Weight</span>
//                       </li>
//                       <li>
//                         <h4>170cm</h4>
//                         <span>Height</span>
//                       </li>
//                       <li>
//                         <h4>55kg</h4>
//                         <span>Goal</span>
//                       </li>
//                     </ul>
//                   </Card>
//                 </Col>
//                 <Col xxl={12} lg={6}>
//                   <Card>
//                     <Card.Header>
//                       <h4>Notifications</h4>
//                     </Card.Header>
//                     <Card.Body>
//                       <ul className="docnoti-list">
//                         <li>
//                           <div className="media">
//                             <img
//                               className="rounded-50 w-40"
//                               src={IMAGE_URLS["avtar/1.jpg"]}
//                               alt=""
//                             />
//                             <div className="media-body">
//                               <h6> Anna Send you Photo</h6>
//                               <span className="text-light">10, Feb ,2023</span>
//                             </div>
//                             <div className="badge badge-primary">10:15 Pm</div>
//                           </div>
//                         </li>
//                         <li>
//                           <div className="media">
//                             <img
//                               className="rounded-50 w-40"
//                               src={IMAGE_URLS["avtar/2.jpg"]}
//                               alt=""
//                             />
//                             <div className="media-body">
//                               <h6> Anna Send you Photo</h6>
//                               <span className="text-light">
//                                 05, March ,2023
//                               </span>
//                             </div>
//                             <div className="badge badge-primary">09:20 Pm</div>
//                           </div>
//                         </li>
//                         <li>
//                           <div className="media">
//                             <img
//                               className="rounded-50 w-40"
//                               src={IMAGE_URLS["avtar/3.jpg"]}
//                               alt=""
//                             />
//                             <div className="media-body">
//                               <h6> Anna Send you Photo</h6>
//                               <span className="text-light">01, Jan ,2023</span>
//                             </div>
//                             <div className="badge badge-primary">03:40 Pm</div>
//                           </div>
//                         </li>
//                         <li>
//                           <div className="media">
//                             <img
//                               className="rounded-50 w-40"
//                               src={IMAGE_URLS["avtar/4.jpg"]}
//                               alt=""
//                             />
//                             <div className="media-body">
//                               <h6> Anna Send you Photo</h6>
//                               <span className="text-light">25, Feb ,2023</span>
//                             </div>
//                             <div className="badge badge-primary">05:26 Am </div>
//                           </div>
//                         </li>
//                       </ul>
//                     </Card.Body>
//                     <Card.Footer>
//                       <Link className="btn btn-primary d-block mx-auto btn-lg">
//                         See All Notification{" "}
//                       </Link>
//                     </Card.Footer>
//                   </Card>
//                 </Col>
//               </Row>
//             </Col>
//             <Col xxl={8} xl={12}>
//               <Row>
//                 <Col sm={6}>
//                   <div className="card patientreport-card">
//                     <div className="card-header border-0">
//                       <div>
//                         <h4>student pressure</h4>
//                         <span>In the normal</span>
//                       </div>
//                       <div className="report-count">
//                         <h3 className="text-primary">120/80</h3>
//                         <span>mmHG</span>
//                       </div>
//                     </div>
//                     <div className="card-body p-0">
//                       <Chart
//                         options={bloodpreport}
//                         series={bloodpreport.series}
//                         height={200}
//                         type="area"
//                       />
//                     </div>
//                   </div>
//                 </Col>
//                 <Col sm={6}>
//                   <div className="card patientreport-card">
//                     <div className="card-header border-0">
//                       <div>
//                         <h4>Student Rate</h4>
//                         <span>Above the normal</span>
//                       </div>
//                       <div className="report-count">
//                         <h3 className="text-secondary">99</h3>
//                         <span>Per min</span>
//                       </div>
//                     </div>
//                     <div className="card-body p-0">
//                       <Chart
//                         options={heartrate}
//                         series={heartrate.series}
//                         height={200}
//                         type="area"
//                       />
//                     </div>
//                   </div>
//                 </Col>
//                 <Col sm={6}>
//                   <div className="card patientreport-card">
//                     <div className="card-header border-0">
//                       <div>
//                         <h4>Sucess Rate</h4>
//                         <span>In the normal</span>
//                       </div>
//                       <div className="report-count">
//                         <h3 className="text-success">97</h3>
//                         <span>mg/dl</span>
//                       </div>
//                     </div>
//                     <div className="card-body p-0">
//                       <Chart
//                         options={glucoserate}
//                         series={glucoserate.series}
//                         height={200}
//                         type="area"
//                       />
//                     </div>
//                   </div>
//                 </Col>
//                 <Col sm={6}>
//                   <div className="card patientreport-card">
//                     <div className="card-header border-0">
//                       <div>
//                         <h4>Guide</h4>
//                         <span>In the normal</span>
//                       </div>
//                       <div className="report-count">
//                         <h3 className="text-warning">124</h3>
//                         <span>mg/dl</span>
//                       </div>
//                     </div>
//                     <div className="card-body p-0">
//                       <Chart
//                         options={clolesterol}
//                         series={clolesterol.series}
//                         height={200}
//                         type="area"
//                       />
//                     </div>
//                   </div>
//                 </Col>
//                 <Col xl={12}>
//                   <div className="card">
//                     <div className="card-header">
//                       <h4>Student Visits</h4>
//                     </div>
//                     <div className="card-body">
//                       <div className="table-responsive">
//                         <Table className="table table-bordered">
//                           <thead>
//                             <tr>
//                               <th>Mentor Name</th>
//                               <th>visit Date</th>
//                               <th>visit Time </th>
//                               <th>Treatment</th>
//                               <th>Charges</th>
//                               <th>Status </th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             <tr>
//                               <td> Tiger Nixon</td>
//                               <td>10/05/2023</td>
//                               <td>09:30 Am</td>
//                               <td>Hindi</td>
//                               <td>$80</td>
//                               <td>Active</td>
//                             </tr>
//                             <tr>
//                               <td> Hal Appeno</td>
//                               <td>05/06/2023</td>
//                               <td>08:00 Am</td>
//                               <td>Engineering</td>
//                               <td>$50</td>
//                               <td>Active</td>
//                             </tr>
//                             <tr>
//                               <td> Pat Agonia</td>
//                               <td>20/02/2023</td>
//                               <td>10:30 Am</td>
//                               <td>Science</td>
//                               <td>$75</td>
//                               <td>Active</td>
//                             </tr>
//                             <tr>
//                               <td> Paul Molive</td>
//                               <td>15/08/2023</td>
//                               <td>03:00 Pm</td>
//                               <td>Sports</td>
//                               <td>$60</td>
//                               <td>InActive</td>
//                             </tr>
//                             <tr>
//                               <td>Polly Tech</td>
//                               <td>12/07/2023</td>
//                               <td>12:00 Pm</td>
//                               <td>Socal Science</td>
//                               <td>$40</td>
//                               <td
//                                 style={{
//                                   color: status === "Active" ? "green" : "red",
//                                 }}
//                               >
//                                 {status}
//                               </td>
//                             </tr>
//                           </tbody>
//                         </Table>
//                       </div>
//                     </div>
//                   </div>
//                 </Col>
//                 <Col xl={12}>
//                   <div className="card">
//                     <div className="card-header">
//                       <h4>Student Activities</h4>
//                     </div>
//                     <div className="card-body">
//                       {/* <div id="bloodlevel"></div> */}
//                       <Chart
//                         options={bloodlevel}
//                         series={bloodlevel.series}
//                         height={375}
//                         type="line"
//                       />
//                     </div>
//                   </div>
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//       {/* theme body end */}
//     </div>
//   );
// }







import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Table, Container, Spinner } from "react-bootstrap";
import PageBreadcrumb from "../componets/PageBreadcrumb";
import Chart from "react-apexcharts";
import {
  bloodpreport,
  heartrate,
  glucoserate,
  clolesterol,
  bloodlevel,
} from "./js/Dashboard3";
import IMAGE_URLS from "/src/pages/api/Imgconfig.js";

export default function Dashboard3() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [referralInput, setReferralInput] = useState("");

  const visitData = [
    { name: "Tiger Nixon", date: "10/05/2023", time: "09:30 Am", treatment: "Hindi", charge: "$80", status: "Active" },
    { name: "Hal Appeno", date: "05/06/2023", time: "08:00 Am", treatment: "Engineering", charge: "$50", status: "Active" },
  ];

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedIn?.user?.email) {
      alert("No user logged in");
      return;
    }

    fetch(`http://localhost:5000/api/auth/dashboard?email=${loggedIn.user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUser({ ...loggedIn.user, ...data });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load profile");
        setLoading(false);
      });
  }, []);

  const handleUseReferral = async () => {
    if (!referralInput.trim()) {
      alert("Please enter a referral code.");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:5000/api/auth/use-referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          referralCode: referralInput.trim(),
        }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert(`✅ ${data.msg}`);
  
        // assume your backend returns updated credits
        if (data.updatedCredits) {
          setUser((prev) => ({
            ...prev,
            credits: data.updatedCredits,
          }));
        }
  
        setReferralInput(""); // clear input
  
      } else {
        alert(`❌ ${data.msg}`);
      }
  
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    }
  };
  
  return (
    <div className="themebody-wrap">
      <PageBreadcrumb pagename="Student Dashboard" />
      <div className="theme-body">
        <Container fluid className="cdxuser-profile">

          {/* 👇 New Top Section */}
          <Row className="mb-4">
            <Col xl={12}>
              <Card>
                <Card.Header>
                  <h4>Your Profile & Referral</h4>
                </Card.Header>
                <Card.Body>
                  {loading ? (
                    <div className="text-center"><Spinner animation="border" /></div>
                  ) : user ? (
                    <Row>
                      <Col md={6} className="mb-3">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Mobile No:</strong> {user.mobileNo}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <p><strong>Credits:</strong> {user.credits}</p>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <h5>Refer & Earn</h5>
                          <p>Your Referral Code:</p>
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-primary fs-15">
                              {user.yourReferralCode || user.referralCode}
                            </span>
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => {
                                navigator.clipboard.writeText(user.yourReferralCode || user.referralCode);
                                alert("Referral code copied!");
                              }}
                            >
                              Copy Code
                            </button>
                          </div>
                        </div>

                        <div className="mt-4">
                          <h5>Avail Benefits</h5>
                          <p>Enter your friend’s referral code:</p>
                          <div className="d-flex gap-2">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Referral Code"
                              value={referralInput}
                              onChange={(e) => setReferralInput(e.target.value)}
                            />
                            <button
                              className="btn btn-success"
                              onClick={handleUseReferral}
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    <p className="text-danger">User data not found</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* 👇 Existing UI */}
          <Row>
            <Col xxl={4} xl={12}>
              <Row>
                <Col xxl={12} md={6}>
                  <Card>
                    <Card.Header>
                      <h4>Personal Information</h4>
                    </Card.Header>
                    <Card.Body>
                      <ul className="contact-list">
                        <li><span>Name:</span> Daniel Smith</li>
                        <li><span>Date of Birth:</span> 18-09-2015</li>
                        <li><span>Gender:</span> Male</li>
                        <li><span>Address:</span> Live In UK</li>
                        <li><span>Phone:</span> +1 80 606590</li>
                        <li><span>Email:</span> daniel@example.com</li>
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xxl={12} md={6}>
                  <Card className="doctor-probox">
                    <Card.Body>
                      <div className="profile-head">
                        <div className="proimg-wrap">
                          <img
                            className="img-fluid"
                            src={IMAGE_URLS["avtar/1.jpg"]}
                            alt=""
                          />
                        </div>
                        <h4>Cedric Kelly</h4>
                        <span>25 years, California</span>
                        <p>Lorem ipsum dolor sit amet...</p>
                      </div>
                    </Card.Body>
                    <ul className="docactivity-list">
                      <li><h4>50kg</h4><span>Weight</span></li>
                      <li><h4>170cm</h4><span>Height</span></li>
                      <li><h4>55kg</h4><span>Goal</span></li>
                    </ul>
                  </Card>
                </Col>
                <Col xxl={12} lg={6}>
                  <Card>
                    <Card.Header><h4>Notifications</h4></Card.Header>
                    <Card.Body>
                      <ul className="docnoti-list">
                        {[1, 2, 3, 4].map((num, i) => (
                          <li key={i}>
                            <div className="media">
                              <img
                                className="rounded-50 w-40"
                                src={IMAGE_URLS[`avtar/${num}.jpg`]}
                                alt=""
                              />
                              <div className="media-body">
                                <h6>Anna sent you a photo</h6>
                                <span className="text-light">Date Here</span>
                              </div>
                              <div className="badge badge-primary">10:00 Pm</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </Card.Body>
                    <Card.Footer>
                      <Link className="btn btn-primary d-block mx-auto btn-lg">
                        See All Notification
                      </Link>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            </Col>

            <Col xxl={8} xl={12}>
              <Row>
                {/* Existing cards … */}
                <Col xl={12}>
                  <Card>
                    <Card.Header><h4>Student Visits</h4></Card.Header>
                    <Card.Body>
                      <div className="table-responsive">
                        <Table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Mentor Name</th>
                              <th>Visit Date</th>
                              <th>Visit Time</th>
                              <th>Treatment</th>
                              <th>Charges</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {visitData.map((item, index) => (
                              <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.date}</td>
                                <td>{item.time}</td>
                                <td>{item.treatment}</td>
                                <td>{item.charge}</td>
                                <td style={{ color: item.status === "Active" ? "green" : "red" }}>
                                  {item.status}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
