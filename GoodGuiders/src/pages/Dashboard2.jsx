// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import FeatherIcon from "feather-icons-react";
// import { Row, Col, Card, Table, Container, Spinner, Button, Badge } from "react-bootstrap";
// import axios from "axios";
// import PageBreadcrumb from "../componets/PageBreadcrumb";
// import Chart from "react-apexcharts";
// import { doctskill, Gallerydata } from "./js/Dashboard2";

// import IMAGE_URLS from "/src/pages/api/Imgconfig.js";
// import { Fancybox } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";

// const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// export default function Dashboard2() {
//   const [doctor, setDoctor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [referralInput, setReferralInput] = useState("");
//   const [activeTab, setActiveTab] = useState("avail"); // Default tab
// const [referEmail, setReferEmail] = useState(""); // For referral input
// const [referMobile, setReferMobile] = useState("");
// const navigate = useNavigate();

// const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
// const [pendingCount, setPendingCount] = useState(0);

//   useEffect(() => {
//     const doctorData = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (!doctorData?.email) {
//       alert("No mentor logged in");
//       return;
//     }

//     fetch(`http://localhost:5000/api/auth/dashboard?email=${doctorData.email}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setDoctor({ ...doctorData, ...data });
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         alert("Failed to load profile");
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     Fancybox.bind('[data-fancybox="gallery"]', {});
//     return () => {
//       Fancybox.destroy();
//     };
//   }, []);

// useEffect(() => {
//   if (!user?._id || user.role !== "mentor") return;

//   const fetchCount = async () => {
//     try {
//       const res = await axios.get(
//         `${API}/pdf-evaluations/mentor/count`,
//         {
//           headers: {
//             "x-user-id": user._id,
//             "x-user-role": user.role,
//           },
//         }
//       );
//       setPendingCount(res.data.count || 0);
//     } catch (e) {
//       console.error("Failed to fetch evaluation count", e);
//     }
//   };

//   fetchCount();
// }, [user?._id]);

//   const handleUseReferral = async () => {
//     if (!referralInput.trim()) {
//       alert("Please enter a referral code.");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/use-referral", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: doctor.email,
//           referralCode: referralInput.trim(),
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert(`✅ ${data.msg}`);
//         if (data.updatedCredits) {
//           setDoctor((prev) => ({
//             ...prev,
//             credits: data.updatedCredits,
//           }));
//         }
//         setReferralInput("");
//       } else {
//         alert(`❌ ${data.msg}`);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error. Please try again.");
//     }
//   };

//   return (
//     <div className="themebody-wrap">

//       <PageBreadcrumb pagename="Mentor Dashboard" />

//       <div className="theme-body">
//         <Container fluid className="cdxuser-profile">
//           <Row>
//             <Col xl={12} className="mb-4">
//               <Card>
//                  <Card.Header className="d-flex justify-content-between align-items-center">
//   <div>
//     <h4>Your Profile & Referral</h4>
//     <p>
//       <strong>Credits:</strong> {doctor?.credits}
//     </p>
//   </div>
//   <div className="d-flex gap-2">
//     {/* NEW BUTTON 1*/}
//     <button
//       className="btn btn-success"
//       onClick={() => navigate("/mentor/materials")}
//     >
//       Upload Materials
//     </button>

//     {/* NEW BUTTON 2*/}
//     <Button
//   variant="warning"
//   onClick={() => navigate("/mentor/pdf-evaluations")}
//   className="position-relative"
// >
//   PDF Evaluations

//   {pendingCount > 0 && (
//     <Badge
//       bg="danger"
//       pill
//       className="position-absolute top-0 start-100 translate-middle"
//     >
//       {pendingCount}
//     </Badge>
//   )}
// </Button>

//     {/* EXISTING */}
//     <button
//       className="btn btn-primary"
//       onClick={() => navigate("/all-chats")}
//     >
//       Chats
//     </button>
//   </div>
// </Card.Header>

//               <Card.Body>
//                   {loading ? (
//                     <div className="text-center">
//                       <Spinner animation="border" />
//                     </div>
//                   ) : doctor ? (
//                     <Row>

// {/*
//  <Col xxl={4} md={6}>
//                         <Card className="mt-3 shadow">
//                           <div className="card">
//                             <Card.Header>
//                               <h4>Personal Information</h4>
//                          </Card.Header>
//                             <Card.Body>
//                               <ul className="contact-list">
//                                 <li>
//                                   <FeatherIcon icon="user" />
//                                   <h6>{doctor.name}</h6>
//                                 </li>
//                                 <li>
//                                   <FeatherIcon icon="bookmark" />
//                                   <h6>{doctor.specializedIn}</h6>
//                                 </li>
//                                 <li>
//                                   <FeatherIcon icon="phone-call" />
//                                   <h6>
//                                     <a href={`tel:${doctor.mobileNo}`}>
//                                       {doctor.mobileNo}
//                                     </a>
//                                   </h6>
//                                 </li>
//                                 <li>
//                                   <FeatherIcon icon="mail" />
//                                   <h6>
//                                     <a href={`mailto:${doctor.email}`}>
//                                       {doctor.email}
//                                     </a>
//                                   </h6>
//                                 </li>
//                                 <li>
//                                   <FeatherIcon icon="map-pin" />
//                                   <h6>{doctor.address}</h6>
//                                 </li>
//                                 <li>
//                                   <FeatherIcon icon="globe" />
//                                   <h6>https://DK@Dk.components.com</h6>
//                                 </li>
//                               </ul>
//                             </Card.Body>
//                           </div>
//                         </Card>
//                       </Col> */}

//  <Col xxl={4} md={6}>
//               <div className="card">
//                 <Card.Header>
//                   <h4>Personal Information</h4>
//                 </Card.Header>
//                 <Card.Body>
//                   <ul className="contact-list">
//                     <li>
//                       <div className="iocn-item">
//                         <FeatherIcon icon="user" />
//                       </div>
//                       <h6>{doctor?.name}</h6>
//                     </li>
//                     <li>
//                       <div className="iocn-item">
//                         <FeatherIcon icon="bookmark" />
//                       </div>
//                       <h6>{doctor?.specializedIn}</h6>
//                     </li>
//                     <li>
//                       <div className="iocn-item">
//                         <FeatherIcon icon="phone-call" />
//                       </div>
//                       <h6>
//                         {" "}
//                         <Link href="tel:+9588489584">{doctor?.mobileNo}</Link>
//                       </h6>
//                     </li>
//                     <li>
//                       <div className="iocn-item">
//                         <FeatherIcon icon="mail" />
//                       </div>
//                       <h6>
//                         {" "}
//                         <Link href="mailto:test@example.com">
//                           {doctor?.email}
//                         </Link>
//                       </h6>
//                     </li>
//                     <li>
//                       <div className="iocn-item">
//                         <FeatherIcon icon="map-pin" />
//                       </div>
//                       <h6>{doctor?.address}</h6>
//                     </li>
//                     <li>
//                       <div className="iocn-item">
//                         <FeatherIcon icon="globe" />
//                       </div>
//                       <h6> https://DK@Dk.components.com</h6>
//                     </li>
//                   </ul>
//                 </Card.Body>
//               </div>
//             </Col>

//                        <Col xxl={8} md={6}>
//                         <Card
//                           className="mt-3 shadow"
//                           style={{ height: "400px" }}
//                         >
//                           <Card.Body>
//                             <div
//                               className="d-flex justify-content-center gap-3 mb-3"
//                               style={{
//                                 backgroundColor: "rgba(102, 151, 159, 0.2)",
//                                 padding: "10px",
//                                 borderRadius: "5px",
//                               }}
//                             >
//                               <h5
//                                 style={{
//                                   backgroundColor:
//                                     activeTab === "avail"
//                                       ? "#F1FCFE"
//                                       : "transparent",
//                                   cursor: "pointer",
//                                   width: "300px",
//                                   textAlign: "center",
//                                   padding: "10px 20px",
//                                   borderRadius: "5px",

//                                   boxShadow:
//                                     activeTab === "avail"
//                                       ? "0 4px 6px rgba(0, 0, 0, 0.1)"
//                                       : "none",
//                                 }}
//                                 onClick={() => setActiveTab("avail")}
//                               >
//                                 Avail Benefits
//                               </h5>

//                               <h5
//                                 style={{
//                                   backgroundColor:
//                                     activeTab === "refer"
//                                       ? "#F1FCFE"
//                                       : "transparent",
//                                   cursor: "pointer",
//                                   width: "300px",
//                                   textAlign: "center",
//                                   padding: "10px 20px",
//                                   borderRadius: "5px",
//                                   boxShadow:
//                                     activeTab === "refer"
//                                       ? "0 4px 6px rgba(0, 0, 0, 0.1)"
//                                       : "none",
//                                 }}
//                                 onClick={() => setActiveTab("refer")}
//                               >
//                                 Refer & Earn
//                               </h5>
//                             </div>

//                             {activeTab === "avail" && (
//                               <>
//                                 <div
//                                   className="d-flex align-items-center gap-2 justify-content-center"
//                                   style={{ marginTop: "15px" }}
//                                 >
//                                   <span className="badge bg-primary fs-15">
//                                     {doctor.yourReferralCode ||
//                                       doctor.referralCode}
//                                   </span>
//                                   <button
//                                     className="btn btn-outline-primary btn-sm"
//                                     onClick={() => {
//                                       navigator.clipboard.writeText(
//                                         doctor.yourReferralCode ||
//                                           doctor.referralCode
//                                       );
//                                       alert("Referral code copied!");
//                                     }}
//                                   >
//                                     Copy Code
//                                   </button>
//                                 </div>

//                                 <div className="mt-4">
//                                   ,
//                                   <p
//                                     style={{
//                                       textAlign: "center",
//                                       marginBottom: "10px",
//                                     }}
//                                   >
//                                     Enter your friend’s referral code:
//                                   </p>
//                                   <div
//                                     className="d-flex justify-content-center"
//                                     style={{
//                                       marginBottom: "10px",
//                                       marginTop: "12px",
//                                     }}
//                                   >
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       placeholder="Enter Referral Code"
//                                       value={referralInput}
//                                       onChange={(e) =>
//                                         setReferralInput(e.target.value)
//                                       }
//                                       style={{ width: "350px" }}
//                                     />
//                                   </div>
//                                   <div
//                                     style={{ marginTop: 15 }}
//                                     className="d-flex justify-content-center"
//                                   >
//                                     <button
//                                       className="btn btn-success"
//                                       style={{ width: "200px", marginTop: 15 }}
//                                       onClick={handleUseReferral}
//                                     >
//                                       Apply
//                                     </button>
//                                   </div>
//                                 </div>
//                               </>
//                             )}

//                             {activeTab === "refer" && (
//                               <div className="mt-3 ">
//                                 <div
//                                   className="d-flex align-items-center gap-3"
//                                   style={{ marginTop: "22px" }}
//                                 >
//                                   <label style={{ margin: 0, width: "250px" }}>
//                                     <strong>Name:</strong>
//                                   </label>
//                                   <input
//                                     type="text"
//                                     className="form-control"
//                                     placeholder="Enter Name"
//                                     value={referEmail}
//                                     onChange={(e) =>
//                                       setReferEmail(e.target.value)
//                                     }
//                                     style={{ width: "350px" }}
//                                   />
//                                 </div>

//                                 <div
//                                   className="d-flex align-items-center gap-3"
//                                   style={{ marginTop: "15px" }}
//                                 >
//                                   <label style={{ margin: 0, width: "250px" }}>
//                                     <strong>Friend's Email ID:</strong>
//                                   </label>
//                                   <input
//                                     type="email"
//                                     className="form-control mb-2"
//                                     placeholder="Enter Email ID"
//                                     value={referEmail}
//                                     onChange={(e) =>
//                                       setReferEmail(e.target.value)
//                                     }
//                                     style={{ width: "350px" }}
//                                   />
//                                 </div>

//                                 <div
//                                   className="d-flex align-items-center gap-3"
//                                   style={{ marginTop: "15px" }}
//                                 >
//                                   <label style={{ margin: 0, width: "250px" }}>
//                                     <strong>Friend's Mobile Number:</strong>
//                                   </label>
//                                   <input
//                                     type="tel"
//                                     className="form-control mb-3"
//                                     placeholder="Enter Mobile Number"
//                                     value={referMobile}
//                                     onChange={(e) =>
//                                       setReferMobile(e.target.value)
//                                     }
//                                     style={{ width: "350px" }}
//                                   />
//                                 </div>

//                                 <div className="d-flex justify-content-center">
//                                   <button
//                                     className="btn btn-success"
//                                     style={{
//                                       width: "200px",
//                                       marginTop: "25px",
//                                     }}
//                                     onClick={() => {
//                                       alert(
//                                         `Refer to ${referEmail}, ${referMobile}`
//                                       );
//                                     }}
//                                   >
//                                     Refer
//                                   </button>
//                                 </div>
//                               </div>
//                             )}
//                           </Card.Body>
//                         </Card>
//                       </Col>
//                     </Row>
//                   ) : (
//                     <p className="text-danger">Mentor data not found</p>
//                   )}
//                 </Card.Body>
//               </Card>
//             </Col>

//             <Col xxl={4} md={6}>
//               <Card className="doctor-probox">
//                 <div className="img-wrap"></div>
//                 <Card.Body>
//                   <div className="profile-head">
//                     <div className="proimg-wrap">
//                       <img
//                         src={
//                           doctor?.profileImage
//                             ? doctor?.profileImage.startsWith(
//                                 "/profilePhotoUploads"
//                               )
//                               ? `http://localhost:5000${doctor?.profileImage}`
//                               : `${import.meta.env.BASE_URL}default-avatar.png`
//                             : `${import.meta.env.BASE_URL}default-avatar.png`
//                         }
//                         alt="Profile"
//                         className="profile-pic"
//                       />
//                     </div>
//                     <h4>{doctor?.name}</h4>
//                     <span>{doctor?.specializedIn}</span>
//                     <p>{doctor?.bio}</p>
//                     <div className="group-btn">
//                       <Link  to="/edit-doctor"
//                         className="btn btn-primary"
//                         href="javascript:void(0);"
//                       >
//                         Edit Profile
//                       </Link>
//                       <Link to="/chat"
//                         className="btn btn-secondary"
//                         href="javascript:void(0);"
//                       >
//                         Send Message
//                       </Link>
//                     </div>
//                   </div>
//                 </Card.Body>
//                 <ul className="docactivity-list">
//                   <li>
//                     <h4>2000</h4>
//                     <span>Biology</span>
//                   </li>
//                   <li>
//                     <h4>99</h4>
//                     <span>Biology</span>
//                   </li>
//                   <li>
//                     <h4>9999</h4>
//                     <span>Biology</span>
//                   </li>
//                 </ul>
//               </Card>
//             </Col>
//             <Col xxl={4} md={6}>
//               <Card>
//                 <Card.Header>
//                   <h4>Notifications</h4>
//                 </Card.Header>
//                 <Card.Body>
//                   <ul className="docnoti-list">
//                     <li>
//                       <div className="media">
//                         <img
//                           className="rounded-50 w-40"
//                           src={IMAGE_URLS["avtar/1.jpg"]}
//                           alt=""
//                         />
//                         <div className="media-body">
//                           <h6>Anna Send you Photo</h6>
//                           <span className="text-light">10, Feb ,2023</span>
//                         </div>
//                         <div className="badge badge-primary">10:15 Pm</div>
//                       </div>
//                     </li>
//                     <li>
//                       <div className="media">
//                         <img
//                           className="rounded-50 w-40"
//                           src={IMAGE_URLS["avtar/2.jpg"]}
//                           alt=""
//                         />
//                         <div className="media-body">
//                           <h6> Anna Send you Photo</h6>
//                           <span className="text-light">05, March ,2023</span>
//                         </div>
//                         <div className="badge badge-primary">09:20 Pm</div>
//                       </div>
//                     </li>
//                     <li>
//                       <div className="media">
//                         <img
//                           className="rounded-50 w-40"
//                           src={IMAGE_URLS["avtar/3.jpg"]}
//                           alt=""
//                         />
//                         <div className="media-body">
//                           <h6> Anna Send you Photo</h6>
//                           <span className="text-light">01, Jan ,2023</span>
//                         </div>
//                         <div className="badge badge-primary">03:40 Pm</div>
//                       </div>
//                     </li>
//                     <li>
//                       <div className="media">
//                         <img
//                           className="rounded-50 w-40"
//                           src={IMAGE_URLS["avtar/4.jpg"]}
//                           alt=""
//                         />
//                         <div className="media-body">
//                           <h6> Anna Send you Photo</h6>
//                           <span className="text-light">25, Feb ,2023</span>
//                         </div>
//                         <div className="badge badge-primary">05:26 Am </div>
//                       </div>
//                     </li>
//                   </ul>
//                 </Card.Body>
//                 <div className="card-footer">
//                   <Link className="btn btn-primary d-block mx-auto btn-lg">
//                     See All Notification
//                   </Link>
//                 </div>
//               </Card>
//             </Col>
//             <Col xxl={4} md={6}>
//               <div className="card">
//                 <Card.Header>
//                   <h4>Ratings:</h4>
//                 </Card.Header>
//                 <Card.Body>
//                   <Chart
//                     options={doctskill}
//                     series={doctskill.series}
//                     height={410}
//                     type="pie"
//                   />
//                 </Card.Body>
//               </div>
//             </Col>
//             {/* <Col xxl={4} md={6}>
//               <div className="card">
//                 <Card.Header>
//                   <h4>Personal Information</h4>
//                 </Card.Header>
//                 <Card.Body>
//                   <ul className="contact-list">
//                     <li>
//                       <div className="iocn-item">
//                         <FeatherIcon icon="user" />
//                       </div>
//                       <h6>{doctor?.name}</h6>
//                     </li>
//                     <li>
//                       <div className="iocn-item">
//                         <FeatherIcon icon="bookmark" />
//                       </div>
//                       <h6>{doctor?.specializedIn}</h6>
//                     </li>
//                     <li>
//                       <div className="iocn-item">
//                         <FeatherIcon icon="phone-call" />
//                       </div>
//                       <h6>
//                         {" "}
//                         <Link href="tel:+9588489584">{doctor?.mobileNo}</Link>
//                       </h6>
//                     </li>
//                     <li>
//                       <div className="iocn-item">
//                         <FeatherIcon icon="mail" />
//                       </div>
//                       <h6>
//                         {" "}
//                         <Link href="mailto:test@example.com">
//                           {doctor?.email}
//                         </Link>
//                       </h6>
//                     </li>
//                     <li>
//                       <div className="iocn-item">
//                         <FeatherIcon icon="map-pin" />
//                       </div>
//                       <h6>{doctor?.address}</h6>
//                     </li>
//                     <li>
//                       <div className="iocn-item">
//                         <FeatherIcon icon="globe" />
//                       </div>
//                       <h6> https://DK@Dk.components.com</h6>
//                     </li>
//                   </ul>
//                 </Card.Body>
//               </div>
//             </Col> */}
//             <Col xxl={4} md={6}>
//               <div className="card">
//                 <Card.Header>
//                   <h4>Speciality</h4>
//                 </Card.Header>
//                 <Card.Body>
//                   <ul className="speciality-list">
//                     <li>
//                       <div className="media">
//                         <div className="icon-wrap bg-primary">
//                           <i className="fa fa-trophy"></i>
//                         </div>
//                         <div className="media-body">
//                           <h6>Certified</h6>
//                           <span className="text-light">
//                             Cold Laser Operation
//                           </span>
//                         </div>
//                       </div>
//                     </li>
//                     <li>
//                       <div className="media">
//                         <div className="icon-wrap bg-primary">
//                           <i className="fa fa-trophy"></i>
//                         </div>
//                         <div className="media-body">
//                           <h6>professional</h6>
//                           <span className="text-light">
//                             Certified Skin Treatment
//                           </span>
//                         </div>
//                       </div>
//                     </li>
//                     <li>
//                       <div className="media">
//                         <div className="icon-wrap bg-primary">
//                           <i className="fa fa-trophy"></i>
//                         </div>
//                         <div className="media-body">
//                           <h6>Medication Laser</h6>
//                           <span className="text-light">Hair Lose Product </span>
//                         </div>
//                       </div>
//                     </li>
//                   </ul>
//                 </Card.Body>
//               </div>
//             </Col>
//             <Col xxl={4} md={6}>
//               <div className="card doct-skill">
//                 <Card.Header>
//                   <h4>Mentor Abilities</h4>
//                 </Card.Header>
//                 <Card.Body>
//                   <div className="progress-group progressCounter">
//                     <h6>
//                       Biology{" "}
//                       <span>
//                         <span className="count">50</span>%
//                       </span>
//                     </h6>
//                     <div className="progress">
//                       <div
//                         className="progress-bar bg-primary"
//                         style={{ width: "90%" }}
//                       ></div>
//                     </div>
//                   </div>
//                   <div className="progress-group progressCounter">
//                     <h6>
//                       Biology{" "}
//                       <span>
//                         <span className="count">80</span>%
//                       </span>
//                     </h6>
//                     <div className="progress">
//                       <div
//                         className="progress-bar bg-success"
//                         style={{ width: "90%" }}
//                       ></div>
//                     </div>
//                   </div>
//                   <div className="progress-group progressCounter">
//                     <h6>
//                       Biology
//                       <span>
//                         <span className="count">40</span>%
//                       </span>
//                     </h6>
//                     <div className="progress">
//                       <div
//                         className="progress-bar bg-secondary"
//                         style={{ width: "90%" }}
//                       ></div>
//                     </div>
//                   </div>
//                   <div className="progress-group progressCounter">
//                     <h6>
//                       Biology
//                       <span>
//                         <span className="count">60</span>%
//                       </span>
//                     </h6>
//                     <div className="progress">
//                       <div
//                         className="progress-bar bg-info"
//                         style={{ width: "90%" }}
//                       ></div>
//                     </div>
//                   </div>
//                 </Card.Body>
//               </div>
//             </Col>
//             <Col xxl={4} xl={12}>
//               <div className="card">
//                 <Card.Header>
//                   <h4>
//                     {" "}
//                     <i className="fa fa-picture-o"></i>Gallery
//                   </h4>
//                 </Card.Header>
//                 <Card.Body>
//                   <ul className="gallerypost-list">
//                     {Gallerydata.map((galleryitem, index) => {
//                       const imgSrc = IMAGE_URLS[galleryitem.imgsrc];
//                       return (
//                         <li key={index}>
//                           <a
//                             data-fancybox="gallery"
//                             data-src={imgSrc}
//                             data-caption=""
//                           >
//                             <img
//                               className="img-fluid"
//                               src={imgSrc}
//                               alt="gallery"
//                             />
//                           </a>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </Card.Body>
//               </div>
//             </Col>
//             <Col xxl={8} xl={12}>
//               <div className="card">
//                 <Card.Header>
//                   <h4>Appointment</h4>
//                 </Card.Header>
//                 <Card.Body>
//                   <Table className="patients-tbl table">
//                     <thead>
//                       <tr>
//                         <th>Student</th>
//                         <th>Mobile</th>
//                         <th>Email</th>
//                         <th>Date</th>
//                         <th>Time </th>
//                         <th>Status</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>Tiger Nixon</td>
//                         <td>9887123456</td>
//                         <td>example@email.com</td>
//                         <td>05/06/2023</td>
//                         <td>08:00 Am</td>
//                         <td>
//                           {" "}
//                           <span className="badge badge-success">start</span>
//                         </td>
//                         <td>
//                           <Link href="edit-appointment.html">
//                             <FeatherIcon icon="edit" className="w-18" />
//                           </Link>
//                           <Link
//                             className="text-danger ml-8"
//                             href="javascript:void(0);"
//                           >
//                             <FeatherIcon icon="trash-2" className="w-18" />
//                           </Link>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td>Brielle Williamson</td>
//                         <td>9928549279</td>
//                         <td>example@email.com</td>
//                         <td>08/09/2023</td>
//                         <td>09:00 Am </td>
//                         <td>
//                           {" "}
//                           <span className="badge badge-success">start</span>
//                         </td>
//                         <td>
//                           <Link href="edit-appointment.html">
//                             <FeatherIcon icon="edit" className="w-18" />
//                           </Link>
//                           <Link
//                             className="text-danger ml-8"
//                             href="javascript:void(0);"
//                           >
//                             <FeatherIcon icon="trash-2" className="w-18" />
//                           </Link>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td>Cedric Kelly</td>
//                         <td>8764366606</td>
//                         <td>example@email.com</td>
//                         <td>10/11/2023</td>
//                         <td>10:00 Am </td>
//                         <td>
//                           {" "}
//                           <span className="badge badge-danger">Canclled</span>
//                         </td>
//                         <td>
//                           <Link href="edit-appointment.html">
//                             <FeatherIcon icon="edit" className="w-18" />
//                           </Link>
//                           <Link
//                             className="text-danger ml-8"
//                             href="javascript:void(0);"
//                           >
//                             <FeatherIcon icon="trash-2" className="w-18" />
//                           </Link>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td>Charde Marshall</td>
//                         <td>9468844326</td>
//                         <td>example@email.com</td>
//                         <td>12/06/2023</td>
//                         <td>11:00 Am </td>
//                         <td>
//                           {" "}
//                           <span className="badge badge-danger">Canclled</span>
//                         </td>
//                         <td>
//                           <Link href="edit-appointment.html">
//                             <FeatherIcon icon="edit" className="w-18" />
//                           </Link>
//                           <Link
//                             className="text-danger ml-8"
//                             href="javascript:void(0);"
//                           >
//                             <FeatherIcon icon="trash-2" className="w-18" />
//                           </Link>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td>Dai Rios</td>
//                         <td>7878123456</td>
//                         <td>example@email.com</td>
//                         <td>02/02/2023</td>
//                         <td>12:00 Am </td>
//                         <td>
//                           {" "}
//                           <span className="badge badge-info">pending</span>
//                         </td>
//                         <td>
//                           <Link href="edit-appointment.html">
//                             <FeatherIcon icon="edit" className="w-18" />
//                           </Link>
//                           <Link
//                             className="text-danger ml-8"
//                             href="javascript:void(0);"
//                           >
//                             <FeatherIcon icon="trash-2" className="w-18" />
//                           </Link>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td>Garrett Winters</td>
//                         <td>9602302020</td>
//                         <td>example@email.com</td>
//                         <td>08/12/2023</td>
//                         <td>02:00 Pm </td>
//                         <td>
//                           {" "}
//                           <span className="badge badge-info">pending</span>
//                         </td>
//                         <td>
//                           <Link href="edit-appointment.html">
//                             <FeatherIcon icon="edit" className="w-18" />
//                           </Link>
//                           <Link
//                             className="text-danger ml-8"
//                             href="javascript:void(0);"
//                           >
//                             <FeatherIcon icon="trash-2" className="w-18" />
//                           </Link>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td>Gloria Little</td>
//                         <td>9922334455</td>
//                         <td>example@email.com</td>
//                         <td>12/02/2023</td>
//                         <td>03:00 Pm </td>
//                         <td>
//                           {" "}
//                           <span className="badge badge-warning">
//                             re schedule
//                           </span>
//                         </td>
//                         <td>
//                           <Link href="edit-appointment.html">
//                             <FeatherIcon icon="edit" className="w-18" />
//                           </Link>
//                           <Link
//                             className="text-danger ml-8"
//                             href="javascript:void(0);"
//                           >
//                             <FeatherIcon icon="trash-2" className="w-18" />
//                           </Link>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td>Jena Gaines</td>
//                         <td>876454545</td>
//                         <td>example@email.com</td>
//                         <td>10/12/2023</td>
//                         <td>04:00 Pm </td>
//                         <td>
//                           {" "}
//                           <span className="badge badge-warning">
//                             re schedule
//                           </span>
//                         </td>
//                         <td>
//                           <Link href="edit-appointment.html">
//                             <FeatherIcon icon="edit" className="w-18" />
//                           </Link>
//                           <Link
//                             className="text-danger ml-8"
//                             href="javascript:void(0);"
//                           >
//                             <FeatherIcon icon="trash-2" className="w-18" />
//                           </Link>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </Table>
//                 </Card.Body>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//       {/* theme body end */}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import FeatherIcon from "feather-icons-react";
import {
  Row,
  Col,
  Card,
  Table,
  Container,
  Spinner,
  Button,
  Badge,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import PageBreadcrumb from "../componets/PageBreadcrumb";
import Chart from "react-apexcharts";
// import { doctskill, Gallerydata } from "./js/Dashboard2";

// import IMAGE_URLS from "/src/pages/api/Imgconfig.js";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Dashboard2() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [referralInput, setReferralInput] = useState("");
  const [activeTab, setActiveTab] = useState("avail");
  const [referEmail, setReferEmail] = useState("");
  const [referName, setReferName] = useState("");
  const [referMobile, setReferMobile] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const [ratingSeries, setRatingSeries] = useState([0, 0, 0, 0, 0]);
  const [ratingLoading, setRatingLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentsSkip, setCommentsSkip] = useState(0);
  const [commentsTotal, setCommentsTotal] = useState(0);

  const COMMENTS_LIMIT = 5;

  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const doctorData = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!doctorData?.email) {
      alert("No mentor logged in");
      return;
    }

    fetch(`${API}/auth/dashboard?email=${doctorData.email}`)
      .then((res) => res.json())
      .then((data) => {
        setDoctor({ ...doctorData, ...data });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load profile");
        setLoading(false);
      });
  }, []);

  // sanitize + unique chat name (same logic backend uses)
  const sanitize = (s = "") =>
    String(s)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_");

  const makeUniqueName = (a = "", b = "") =>
    [sanitize(a), sanitize(b)].sort().join("_");

  useEffect(() => {
    if (!doctor?.email) return;

    const fetchAppointments = async () => {
      try {
        const res = await fetch(
          `${API}/stats/mentor/${encodeURIComponent(
            doctor.email
          )}/details`
        );
        const data = await res.json();

        if (res.ok) {
          setAppointments(data.students?.items || []);
        }
      } catch (err) {
        console.error("Failed to load appointments", err);
      } finally {
        setAppointmentsLoading(false);
      }
    };

    fetchAppointments();
  }, [doctor?.email]);

  useEffect(() => {
    Fancybox.bind('[data-fancybox="gallery"]', {});
    return () => {
      Fancybox.destroy();
    };
  }, []);

  useEffect(() => {
    if (!user?._id || user.role !== "mentor") return;

    const fetchCount = async () => {
      try {
        const res = await axios.get(`${API}/pdf-evaluations/mentor/count`, {
          headers: {
            "x-user-id": user._id,
            "x-user-role": user.role,
          },
        });
        setPendingCount(res.data.count || 0);
      } catch (e) {
        console.error("Failed to fetch evaluation count", e);
      }
    };

    fetchCount();
  }, [user?._id]);

  useEffect(() => {
    if (!doctor?.email) return;

    const fetchRatings = async () => {
      try {
        const res = await fetch(
          `${API}/stats/mentor/${encodeURIComponent(
            doctor.email
          )}/rating`
        );
        const data = await res.json();

        const b = data.breakdown || {};
        setRatingSeries([
          b["1"] || 0,
          b["2"] || 0,
          b["3"] || 0,
          b["4"] || 0,
          b["5"] || 0,
        ]);
      } catch (e) {
        console.error("Rating fetch failed", e);
      } finally {
        setRatingLoading(false);
      }
    };

    fetchRatings();
  }, [doctor?.email]);

  const fetchComments = async (reset = false) => {
    if (!doctor?.email) return;

    try {
      if (reset) {
        setComments([]);
        setCommentsSkip(0);
      }

      setCommentsLoading(true);

      const res = await fetch(
        `${API}/stats/mentor/${encodeURIComponent(
          doctor.email
        )}/comments?skip=${reset ? 0 : commentsSkip}&limit=${COMMENTS_LIMIT}`
      );

      const data = await res.json();

      setComments((prev) =>
        reset ? data.comments : [...prev, ...data.comments]
      );
      setCommentsTotal(data.total);
    } catch (err) {
      console.error("Failed to load comments", err);
    } finally {
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    if (doctor?.email) {
      fetchComments(true);
    }
  }, [doctor?.email]);

  useEffect(() => {
    if (!doctor?.email) return;
    if (commentsSkip === 0) return;

    fetchComments(false);
  }, [commentsSkip]);

  const handleUseReferral = async () => {
    if (!referralInput.trim()) {
      alert("Please enter a referral code.");
      return;
    }

    try {
      const res = await fetch(`${API}/auth/use-referral`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: doctor.email,
          referralCode: referralInput.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`✅ ${data.msg}`);
        if (data.updatedCredits) {
          setDoctor((prev) => ({
            ...prev,
            credits: data.updatedCredits,
          }));
        }
        setReferralInput("");
      } else {
        alert(`❌ ${data.msg}`);
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    }
  };

  // ⭐ Rating Pie Chart config (dynamic)
  const ratingChartOptions = {
    chart: {
      type: "pie",
    },

    labels: [
      "⭐ 1 Star",
      "⭐ 2 Stars",
      "⭐ 3 Stars",
      "⭐ 4 Stars",
      "⭐ 5 Stars",
    ],

    legend: {
      position: "bottom",
    },

    colors: ["#dc3545", "#fd7e14", "#ffc107", "#20c997", "#198754"],

    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        const count = opts.w.config.series[opts.seriesIndex];
        return count > 0 ? count : "";
      },
    },

    tooltip: {
      y: {
        formatter: function (value) {
          return `${value} student${value !== 1 ? "s" : ""}`;
        },
      },
    },

    plotOptions: {
      pie: {
        donut: {
          size: "0%", // keep as pie (not donut)
        },
      },
    },
  };

  return (
    <div className="themebody-wrap">
      <PageBreadcrumb pagename="Mentor Dashboard" />

      <div className="theme-body">
        <Container fluid className="cdxuser-profile">
          <Row>
            <Col xl={12} className="mb-4">
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  {/* <div>
    <h4>Your Profile & Referral</h4>
    <p>
      <strong>Credits:</strong> {doctor?.credits}
    </p>
  </div> */}

                  <button
                    className="btn btn-primary"
                    onClick={() => setShowCreditsModal(true)}
                  >
                    View Credits
                  </button>

                  <div className="d-flex gap-2">
                    {/* NEW BUTTON 1*/}
                    <button
                      className="btn btn-success"
                      onClick={() => navigate("/mentor/materials")}
                    >
                      Upload Materials
                    </button>

                    {/* NEW BUTTON 2*/}
                    <Button
                      variant="warning"
                      onClick={() => navigate("/mentor/pdf-evaluations")}
                      className="position-relative"
                    >
                      PDF Evaluations
                      {pendingCount > 0 && (
                        <Badge
                          bg="danger"
                          pill
                          className="position-absolute top-0 start-100 translate-middle"
                        >
                          {pendingCount}
                        </Badge>
                      )}
                    </Button>

                    {/* EXISTING */}
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/all-chats")}
                    >
                      Chats
                    </button>
                  </div>
                </Card.Header>

                {/* <Card.Body>
                  {loading ? (
                    <div className="text-center">
                      <Spinner animation="border" />
                    </div>
                  ) : doctor ? (
                    <Row>
                     



                      
                       <Col xxl={8} md={6}>
                        <Card
                          className="mt-3 shadow"
                          style={{ height: "400px" }}
                        >
                          <Card.Body>
                            <div
                              className="d-flex justify-content-center gap-3 mb-3"
                              style={{
                                backgroundColor: "rgba(102, 151, 159, 0.2)",
                                padding: "10px",
                                borderRadius: "5px",
                              }}
                            >
                              <h5
                                style={{
                                  backgroundColor:
                                    activeTab === "avail"
                                      ? "#F1FCFE"
                                      : "transparent",
                                  cursor: "pointer",
                                  width: "300px",
                                  textAlign: "center",
                                  padding: "10px 20px",
                                  borderRadius: "5px",

                                  boxShadow:
                                    activeTab === "avail"
                                      ? "0 4px 6px rgba(0, 0, 0, 0.1)"
                                      : "none",
                                }}
                                onClick={() => setActiveTab("avail")}
                              >
                                Avail Benefits
                              </h5>

                              <h5
                                style={{
                                  backgroundColor:
                                    activeTab === "refer"
                                      ? "#F1FCFE"
                                      : "transparent",
                                  cursor: "pointer",
                                  width: "300px",
                                  textAlign: "center",
                                  padding: "10px 20px",
                                  borderRadius: "5px",
                                  boxShadow:
                                    activeTab === "refer"
                                      ? "0 4px 6px rgba(0, 0, 0, 0.1)"
                                      : "none",
                                }}
                                onClick={() => setActiveTab("refer")}
                              >
                                Refer & Earn
                              </h5>
                            </div>

                            {activeTab === "avail" && (
                              <>
                                <div
                                  className="d-flex align-items-center gap-2 justify-content-center"
                                  style={{ marginTop: "15px" }}
                                >
                                  <span className="badge bg-primary fs-15">
                                    {doctor.yourReferralCode ||
                                      doctor.referralCode}
                                  </span>
                                  <button
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() => {
                                      navigator.clipboard.writeText(
                                        doctor.yourReferralCode ||
                                          doctor.referralCode
                                      );
                                      alert("Referral code copied!");
                                    }}
                                  >
                                    Copy Code
                                  </button>
                                </div>

                                <div className="mt-4">
                                  ,
                                  <p
                                    style={{
                                      textAlign: "center",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    Enter your friend’s referral code:
                                  </p>
                                  <div
                                    className="d-flex justify-content-center"
                                    style={{
                                      marginBottom: "10px",
                                      marginTop: "12px",
                                    }}
                                  >
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter Referral Code"
                                      value={referralInput}
                                      onChange={(e) =>
                                        setReferralInput(e.target.value)
                                      }
                                      style={{ width: "350px" }}
                                    />
                                  </div>
                                  <div
                                    style={{ marginTop: 15 }}
                                    className="d-flex justify-content-center"
                                  >
                                    <button
                                      className="btn btn-success"
                                      style={{ width: "200px", marginTop: 15 }}
                                      onClick={handleUseReferral}
                                    >
                                      Apply
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}

                            {activeTab === "refer" && (
                              <div className="mt-3 ">
                                <div
                                  className="d-flex align-items-center gap-3"
                                  style={{ marginTop: "22px" }}
                                >
                                  <label style={{ margin: 0, width: "250px" }}>
                                    <strong>Name:</strong>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Name"
                                    value={referEmail}
                                    onChange={(e) =>
                                      setReferEmail(e.target.value)
                                    }
                                    style={{ width: "350px" }}
                                  />
                                </div>

                                <div
                                  className="d-flex align-items-center gap-3"
                                  style={{ marginTop: "15px" }}
                                >
                                  <label style={{ margin: 0, width: "250px" }}>
                                    <strong>Friend's Email ID:</strong>
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control mb-2"
                                    placeholder="Enter Email ID"
                                    value={referEmail}
                                    onChange={(e) =>
                                      setReferEmail(e.target.value)
                                    }
                                    style={{ width: "350px" }}
                                  />
                                </div>

                                <div
                                  className="d-flex align-items-center gap-3"
                                  style={{ marginTop: "15px" }}
                                >
                                  <label style={{ margin: 0, width: "250px" }}>
                                    <strong>Friend's Mobile Number:</strong>
                                  </label>
                                  <input
                                    type="tel"
                                    className="form-control mb-3"
                                    placeholder="Enter Mobile Number"
                                    value={referMobile}
                                    onChange={(e) =>
                                      setReferMobile(e.target.value)
                                    }
                                    style={{ width: "350px" }}
                                  />
                                </div>

                                <div className="d-flex justify-content-center">
                                  <button
                                    className="btn btn-success"
                                    style={{
                                      width: "200px",
                                      marginTop: "25px",
                                    }}
                                    onClick={() => {
                                      alert(
                                        `Refer to ${referEmail}, ${referMobile}`
                                      );
                                    }}
                                  >
                                    Refer
                                  </button>
                                </div>
                              </div>
                            )}
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  ) : (
                    <p className="text-danger">Mentor data not found</p>
                  )}
                </Card.Body> */}

                <Card.Body>
                  {loading ? (
                    <div className="text-center">
                      <Spinner animation="border" />
                    </div>
                  ) : doctor ? (
                    <Row>
                      {/* ===== Credits Modal ===== */}
                      <Modal
                        show={showCreditsModal}
                        onHide={() => setShowCreditsModal(false)}
                        size="lg"
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title className="mb-0">
                            Referral & Benefits
                            <span style={{ marginLeft: "420px" }}>
                              Credits: {doctor?.credits}
                            </span>
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div
                            className="d-flex justify-content-center gap-3 mb-3"
                            style={{
                              backgroundColor: "rgba(102, 151, 159, 0.2)",
                              padding: "10px",
                              borderRadius: "5px",
                            }}
                          >
                            <h5
                              style={{
                                backgroundColor:
                                  activeTab === "avail"
                                    ? "#F1FCFE"
                                    : "transparent",
                                cursor: "pointer",
                                width: "300px",
                                textAlign: "center",
                                padding: "10px 20px",
                                borderRadius: "5px",
                              }}
                              onClick={() => setActiveTab("avail")}
                            >
                              Avail Benefits
                            </h5>
                            <h5
                              style={{
                                backgroundColor:
                                  activeTab === "refer"
                                    ? "#F1FCFE"
                                    : "transparent",
                                cursor: "pointer",
                                width: "300px",
                                textAlign: "center",
                                padding: "10px 20px",
                                borderRadius: "5px",
                              }}
                              onClick={() => setActiveTab("refer")}
                            >
                              Refer & Earn
                            </h5>
                          </div>

                          {activeTab === "avail" && (
                            <>
                              <div className="d-flex align-items-center gap-2 justify-content-center">
                                <span className="badge bg-primary fs-15">
                                  {doctor?.yourReferralCode ||
                                    doctor?.referralCode}
                                </span>
                                <button
                                  className="btn btn-outline-primary btn-sm"
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      doctor?.yourReferralCode ||
                                        doctor?.referralCode
                                    );
                                    alert("Referral code copied!");
                                  }}
                                >
                                  Copy Code
                                </button>
                              </div>
                              <div className="mt-4 text-center">
                                <p>Enter your friend’s referral code:</p>
                                <div className="d-flex justify-content-center">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Referral Code"
                                    value={referralInput}
                                    onChange={(e) =>
                                      setReferralInput(e.target.value)
                                    }
                                    style={{ width: "350px" }}
                                  />
                                </div>
                                <div style={{ marginTop: 15 }}>
                                  <button
                                    className="btn btn-success"
                                    style={{ width: "200px", marginTop: 15 }}
                                    onClick={handleUseReferral}
                                  >
                                    Apply
                                  </button>
                                </div>
                              </div>
                            </>
                          )}

                          {activeTab === "refer" && (
                            <div className="mt-3">
                              <div className="d-flex align-items-center gap-3 mt-3">
                                <label style={{ width: "250px" }}>
                                  <strong>Name:</strong>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Name"
                                  value={referName}
                                  onChange={(e) =>
                                    setReferName(e.target.value)
                                  }
                                  style={{ width: "350px" }}
                                />
                              </div>
                              <div className="d-flex align-items-center gap-3 mt-3">
                                <label style={{ width: "250px" }}>
                                  <strong>Friend&apos;s Email ID:</strong>
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="Enter Email ID"
                                  value={referEmail}
                                  onChange={(e) =>
                                    setReferEmail(e.target.value)
                                  }
                                  style={{ width: "350px" }}
                                />
                              </div>
                              <div className="d-flex align-items-center gap-3 mt-3">
                                <label style={{ width: "250px" }}>
                                  <strong>Friend&apos;s Mobile Number:</strong>
                                </label>
                                <input
                                  type="tel"
                                  className="form-control"
                                  placeholder="Enter Mobile Number"
                                  value={referMobile}
                                  onChange={(e) =>
                                    setReferMobile(e.target.value)
                                  }
                                  style={{ width: "350px" }}
                                />
                              </div>
                              <div className="d-flex justify-content-center">
                                <button
                                  className="btn btn-success"
                                  style={{ width: "200px", marginTop: "25px" }}
                                  onClick={() =>
                                    alert(
                                      `Refer to ${referEmail}, ${referMobile}`
                                    )
                                  }
                                >
                                  Refer
                                </button>
                              </div>
                            </div>
                          )}
                        </Modal.Body>
                      </Modal>
                    </Row>
                  ) : (
                    <p className="text-danger">Mentor data not found</p>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col xxl={4} md={6}>
              <Card className="doctor-probox">
                <div className="img-wrap"></div>
                <Card.Body>
                  <div className="profile-head">
                    <div className="proimg-wrap">
                      <img
                        src={
                          doctor?.profileImage
                            ? doctor?.profileImage.startsWith(
                                "/profilePhotoUploads"
                              )
                              ? `http://localhost:5000${doctor?.profileImage}`
                              : `${import.meta.env.BASE_URL}default-avatar.png`
                            : `${import.meta.env.BASE_URL}default-avatar.png`
                        }
                        alt="Profile"
                        className="profile-pic"
                      />
                    </div>
                    <h3>{doctor?.name}</h3>
                    <p>{doctor?.email}</p>
                    <p>{doctor?.mobileNo}</p>
                    <p>{doctor?.specializedIn}</p>
                    {/* <div className="group-btn">
                      <Link  to="/edit-doctor"
                        className="btn btn-primary"
                        href="javascript:void(0);"
                      >
                        Edit Profile
                      </Link>
                      <Link to="/chat"
                        className="btn btn-secondary"
                        href="javascript:void(0);"
                      >
                        Send Message
                      </Link>
                    </div> */}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xxl={4} md={6}>
              <div className="card">
                <Card>
                  <Card.Header>
                    <h4>Ratings Distribution</h4>
                  </Card.Header>

                  <Card.Body>
                    {ratingLoading ? (
                      <Spinner animation="border" />
                    ) : ratingSeries.every((v) => v === 0) ? (
                      <p className="text-muted text-center">No ratings yet</p>
                    ) : (
                      <Chart
                        options={ratingChartOptions}
                        series={ratingSeries}
                        type="pie"
                        height={410}
                      />
                    )}
                  </Card.Body>
                </Card>
              </div>
            </Col>
            <Col xxl={4} md={6}>
              <Card>
                <Card.Header>
                  <h4>Latest Student Reviews</h4>
                </Card.Header>

                <Card.Body style={{ maxHeight: 420, overflowY: "auto" }}>
                  {commentsLoading && comments.length === 0 ? (
                    <div className="text-center">
                      <Spinner animation="border" size="sm" />
                    </div>
                  ) : comments.length === 0 ? (
                    <p className="text-muted text-center">No comments yet</p>
                  ) : (
                    <>
                      {comments.map((c) => (
                        <div key={c._id} className="border-bottom pb-2 mb-2">
                          <strong>{c.studentName}</strong>
                          <p className="mb-1 text-muted">{c.comment}</p>
                        </div>
                      ))}

                      {/* LOAD MORE */}
                      {comments.length < commentsTotal && (
                        <div className="text-center mt-2">
                          <Button
                            size="sm"
                            variant="outline-primary"
                            disabled={commentsLoading}
                            onClick={() => {
                              setCommentsSkip((prev) => prev + COMMENTS_LIMIT);
                            }}
                          >
                            {commentsLoading ? (
                              <Spinner animation="border" size="sm" />
                            ) : (
                              "Load More"
                            )}
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
            {/* <Col xxl={4} md={6}>
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
                      <h6>{doctor?.name}</h6>
                    </li>
                    <li>
                      <div className="iocn-item">
                        <FeatherIcon icon="bookmark" />
                      </div>
                      <h6>{doctor?.specializedIn}</h6>
                    </li>
                    <li>
                      <div className="iocn-item">
                        <FeatherIcon icon="phone-call" />
                      </div>
                      <h6>
                        {" "}
                        <Link href="tel:+9588489584">{doctor?.mobileNo}</Link>
                      </h6>
                    </li>
                    <li>
                      <div className="iocn-item">
                        <FeatherIcon icon="mail" />
                      </div>
                      <h6>
                        {" "}
                        <Link href="mailto:test@example.com">
                          {doctor?.email}
                        </Link>
                      </h6>
                    </li>
                    <li>
                      <div className="iocn-item">
                        <FeatherIcon icon="map-pin" />
                      </div>
                      <h6>{doctor?.address}</h6>
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
            </Col> */}
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

            {/* <Col xxl={8} xl={12}> */}
            <Card>
              <Card.Header>
                <h4>Appointments</h4>
              </Card.Header>

              <Card.Body>
                <Table className="patients-tbl table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Email</th>
                      <th>Class</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {appointmentsLoading ? (
                      <tr>
                        <td colSpan={5} className="text-center">
                          <Spinner animation="border" size="sm" />
                        </td>
                      </tr>
                    ) : appointments.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center text-muted">
                          No students have visited you yet
                        </td>
                      </tr>
                    ) : (
                      appointments.map((s) => (
                        <tr key={s.email}>
                          <td>{s.name}</td>
                          <td>{s.email}</td>
                          <td>{s.class || "-"}</td>
                          <td>
                            {s.lastInteraction
                              ? new Date(s.lastInteraction).toLocaleDateString()
                              : "-"}
                          </td>
                          <td>
                            <Button
                              size="sm"
                              variant="outline-primary"
                              onClick={() => {
                                const mentorEmail = doctor.email; // logged-in mentor
                                const studentEmail = s.email; // row student email

                                const uniqueName = makeUniqueName(
                                  mentorEmail,
                                  studentEmail
                                );

                                navigate(`/chat/${mentorEmail}`, {
                                  state: {
                                    conversationUniqueName: uniqueName,
                                    mentorName: doctor.name,
                                  },
                                });
                              }}
                            >
                              Chat
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* </Col> */}
          </Row>
        </Container>
      </div>
      {/* theme body end */}
    </div>
  );
}
