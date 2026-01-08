// import React, { useState, useEffect } from 'react';
// import FeatherIcon from 'feather-icons-react';
// import SimpleBar from 'simplebar-react';
// import { Link } from 'react-router-dom';
// import { Form } from 'react-bootstrap';
// import { useSidebarContext } from '../pages/api/useSidebarContext';
// // For Font Awesome CSS
// import 'font-awesome/css/font-awesome.min.css';
// // Import images
// import adminimg from '/src/assets/images/avtar/admin.jpg';
// import IMAGE_URLS from "/src/pages/api/Imgconfig.js";

// export default function Header() {
//     // Handle theme toggle
//     const [theme, setTheme] = useState('light');
//     const toggleTheme = () => {
//         setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
//     };

//     // Apply theme classes
//     useEffect(() => {
//         document.body.setAttribute('data-bs-theme', theme);

//     }, [theme]);

//     const [navsearchData, setnavsearchData] = useState({
//         navsearch: '',
//     });
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setnavsearchData({ ...navsearchData, [name]: value, });
//     };

//     // Sidebar Action
//     const { toggleSidebar } = useSidebarContext();

//     return (
//         <>
//             {/* Header Start  */}
//             <header className="codex-header">
//                 <div className="flex-between">
//                     <div className="header-left d-flex align-items-center">
//                         {/* <div className="sidebar-action navicon-wrap" onClick={toggleSidebar}>
//                             <FeatherIcon icon="menu" />
//                         </div> */}
//                         <div className="navsearch-bar">
//                             <div className="input-group">
//                                 <Form.Control type="text" placeholder="Search Here" name="navsearch" value={navsearchData.navsearch} onChange={handleChange} />
//                                 <span className="input-group-text">
//                                     <FeatherIcon icon="search" />
//                                 </span>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="header-right">

//                         <ul className="nav-iconlist">
//                             <li>
//                                 <div className="navicon-wrap btn-windowfull">
//                                     <FeatherIcon icon="maximize" />
//                                 </div>
//                             </li>

//                             <li>
//                                 <div className="action-toggle navicon-wrap">
//                                     <FeatherIcon icon="bell" />
//                                     <div className="noti-count"></div>
//                                 </div>
//                                 <div className="hover-dropdown navnotification-drop">
//                                     <div className="drop-header">
//                                         <h6>notification<span>05           </span></h6>
//                                     </div>
//                                     <SimpleBar style={{ maxHeight: 300 }}>
//                                         <ul className="scroll-primary">
//                                             <li>
//                                                 <div className="media">
//                                                     <div className="badgeavtar bg-success">A</div>
//                                                     <div className="media-body ml-10">
//                                                         <h6>Successful Paid Invoice #1579</h6><span className="text-light">20 mins ago</span>
//                                                     </div>
//                                                 </div>
//                                             </li>
//                                             <li>
//                                                 <div className="media">
//                                                     <div className="badgeavtar bg-warning"> <i className="fa fa-clock-o"></i>
//                                                     </div>
//                                                     <div className="media-body ml-10">
//                                                         <h6>Confirmed Dr Aleni Joshep visit</h6><span className="text-light">2 hours ago</span>
//                                                     </div>
//                                                 </div>
//                                             </li>
//                                             <li>
//                                                 <div className="media">
//                                                     <div className="badgeavtar bg-info"> <i className="fa fa-times"></i>
//                                                     </div>
//                                                     <div className="media-body ml-10">
//                                                         <h6>Cancel Appointment at 5:00 PM</h6><span className="text-light">2 hours ago</span>
//                                                     </div>
//                                                 </div>
//                                             </li>
//                                             <li>
//                                                 <div className="media">
//                                                     <div className="badgeavtar bg-success">A</div>
//                                                     <div className="media-body ml-10">
//                                                         <h6>Successful Paid Invoice #1215</h6><span className="text-light">3 hours ago</span>
//                                                     </div>
//                                                 </div>
//                                             </li>
//                                             <li>
//                                                 <div className="media">
//                                                     <div className="badgeavtar bg-secondary"><i className="fa fa-check"></i>
//                                                     </div>
//                                                     <div className="media-body ml-10">
//                                                         <h6>Great Speed Notify of 2.5 LTC</h6><span className="text-light">4 hours ago</span>
//                                                     </div>
//                                                 </div>
//                                             </li>
//                                         </ul>
//                                     </SimpleBar>
//                                     <div className="drop-footer">
//                                         <Link href="javascript:void(0)">See All Notification</Link></div>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className="navicon-wrap">
//                                     <FeatherIcon icon="mail" />
//                                     <div className="noti-count"></div>
//                                 </div>
//                                 <div className="hover-dropdown navmail-drop">
//                                     <div className="drop-header">
//                                         <h6>Mail<span>08           </span></h6>
//                                     </div>
//                                     <SimpleBar style={{ maxHeight: 300 }}>
//                                         <ul className="scroll-primary">
//                                             <li>
//                                                 <div className="media">
//                                                     <div className="avtar-wrap">
//                                                         <img className="img-fluid" src={IMAGE_URLS['avtar/2.jpg']} alt="" />
//                                                     </div>
//                                                     <div className="media-body ml-10">
//                                                         <h6>Anna Mull<span className="text-light ml-10 fs-10">- 20 mins ago</span></h6><span className="text-light">Successful Paid Invoice #1579</span>
//                                                     </div>
//                                                 </div>
//                                             </li>
//                                             <li>
//                                                 <div className="media">
//                                                     <div className="avtar-wrap">
//                                                         <img className="img-fluid" src={IMAGE_URLS['avtar/3.jpg']} alt="" />
//                                                     </div>
//                                                     <div className="media-body ml-10">
//                                                         <h6>Hal Appeno<span className="text-light ml-10 fs-10">- 30 mins ago</span></h6><span className="text-light">Successful Paid Invoice #1579</span>
//                                                     </div>
//                                                 </div>
//                                             </li>
//                                             <li>
//                                                 <div className="media">
//                                                     <div className="avtar-wrap">
//                                                         <img className="img-fluid" src={IMAGE_URLS['avtar/4.jpg']} alt="" />
//                                                     </div>
//                                                     <div className="media-body ml-10">
//                                                         <h6>Paul Molive<span className="text-light ml-10 fs-10">- 45 mins ago</span></h6><span className="text-light">Successful Paid Invoice #1579</span>
//                                                     </div>
//                                                 </div>
//                                             </li>
//                                             <li>
//                                                 <div className="media">
//                                                     <div className="avtar-wrap">
//                                                         <img className="img-fluid" src={IMAGE_URLS['avtar/5.jpg']} alt="" />
//                                                     </div>
//                                                     <div className="media-body ml-10">
//                                                         <h6>Saul T. Balls<span className="text-light ml-10 fs-10">- 50 mins ago</span></h6><span className="text-light">Successful Paid Invoice #1579</span>
//                                                     </div>
//                                                 </div>
//                                             </li>
//                                             <li>
//                                                 <div className="media">
//                                                     <div className="avtar-wrap">
//                                                         <img className="img-fluid" src={IMAGE_URLS['avtar/6.jpg']} alt="" />
//                                                     </div>
//                                                     <div className="media-body ml-10">
//                                                         <h6>Anna Mull<span className="text-light ml-10 fs-10">- 1 hour ago</span></h6><span className="text-light">Successful Paid Invoice #1579</span>
//                                                     </div>
//                                                 </div>
//                                             </li>
//                                             <li>
//                                                 <div className="media">
//                                                     <div className="avtar-wrap">
//                                                         <img className="img-fluid" src={IMAGE_URLS['avtar/7.jpg']} alt="" />
//                                                     </div>
//                                                     <div className="media-body ml-10">
//                                                         <h6>William Stephin<span className="text-light ml-10 fs-10">- 2 hour ago</span></h6><span className="text-light">Successful Paid Invoice #1579</span>
//                                                     </div>
//                                                 </div>
//                                             </li>
//                                         </ul>
//                                     </SimpleBar>
//                                     <div className="drop-footer">
//                                         <Link href="javascript:void(0)">See All Messages</Link></div>
//                                 </div>
//                             </li>
//                             <li className="nav-profile">
//                                 <Link className="action-toggle" href="javascript:void(0)">
//                                     <div className="media">
//                                         <div className="user-icon">
//                                             <img className="img-fluid rounded-50" src={adminimg} alt="logo" />
//                                         </div>
//                                     </div></Link>
//                                 <div className="hover-dropdown navprofile-drop">
//                                     <ul>
//                                         <li>
//                                             <Link to="/support">
//                                             <i className="fa fa-question-circle-o"></i>
//                                              help
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link href="javascript:void(0)">
//                                             <i className="fa fa-cog" aria-hidden="true"></i>
//                                                 setting
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link to="/login"><i className="fa fa-sign-out"></i>log out</Link>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </header>
//      </>
//);
// }

import { useState, useEffect } from "react";
import FeatherIcon from "feather-icons-react";
import SimpleBar from "simplebar-react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useSidebarContext } from "../pages/api/useSidebarContext";
import "font-awesome/css/font-awesome.min.css";
import adminimg from "/src/assets/images/avtar/admin.jpg";
import IMAGE_URLS from "/src/pages/api/Imgconfig.js";

export default function Header() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user.role === "admin") return;

    fetch("http://127.0.0.1:5000/api/appointments/notifications", {
      headers: { "x-user-id": user._id },
    })
      .then((res) => res.json())
      .then((data) => setNotifications(data.notifications || []));
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const [navsearchData, setnavsearchData] = useState({ navsearch: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setnavsearchData({ ...navsearchData, [name]: value });
  };

  const openAppointments = async () => {
    await fetch("http://127.0.0.1:5000/api/appointments/notifications/read", {
      method: "PATCH",
      headers: { "x-user-id": user._id },
    });

    setNotifications([]);
    navigate("/appointments");
  };

  const { toggleSidebar } = useSidebarContext();
  const navigate = useNavigate();

  // ✅ Logout function
  const handleLogout = () => {
    //   localStorage.clear(); ``
    localStorage.removeItem("loggedInUser");
    navigate("/login"); // Navigate to login screen
  };
  return (
    <>
      <header className="codex-header">
        <div className="flex-between">
          <div className="header-left d-flex align-items-center">
            <div className="navsearch-bar">
              <div className="input-group">
                <Form.Control
                  type="text"
                  placeholder="Search Here"
                  name="navsearch"
                  value={navsearchData.navsearch}
                  onChange={handleChange}
                />
                <span className="input-group-text">
                  <FeatherIcon icon="search" />
                </span>
              </div>
            </div>
          </div>

          <div className="header-right">
            <ul className="nav-iconlist">
              <li>
                <div className="navicon-wrap btn-windowfull">
                  <FeatherIcon icon="maximize" />
                </div>
              </li>

              {user.role !== "admin" && (
                <li>
                  <div className="navicon-wrap">
                    <FeatherIcon icon="bell" />
                    {notifications.length > 0 && (
                      <div className="noti-count">{notifications.length}</div>
                    )}
                  </div>

                  <div className="hover-dropdown navmail-drop">
                    <div className="drop-header">
                      <h6>
                        Notifications
                        <span>{notifications.length}</span>
                      </h6>
                    </div>

                    <SimpleBar style={{ maxHeight: 300 }}>
                      <ul className="scroll-primary">
                        {notifications.length === 0 && (
                          <li className="text-center text-muted p-3">
                            No new notifications
                          </li>
                        )}

                        {notifications.map((n) => (
                          <li key={n._id}>
                            <div className="media">
                              {/* Avatar */}
                              <div className="avtar-wrap">
                                <img
                                  className="img-fluid"
                                  src={
                                    user.role === "mentor"
                                      ? IMAGE_URLS["avtar/2.jpg"]
                                      : IMAGE_URLS["avtar/3.jpg"]
                                  }
                                  alt="avatar"
                                />
                              </div>

                              {/* Text */}
                              <div className="media-body ml-10">
                                <h6>
                                  {user.role === "mentor"
                                    ? "New appointment request"
                                    : `Appointment ${n.status}`}
                                  <span className="text-light ml-10 fs-10">
                                    {new Date(n.updatedAt).toLocaleDateString()}
                                  </span>
                                </h6>

                                <span className="text-light">
                                  Appointment on {n.date}
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </SimpleBar>

                    <div className="drop-footer">
                      <Link to="/appointments" onClick={openAppointments}>
                        See All Appointments
                      </Link>
                    </div>
                  </div>
                </li>
              )}

              {/* <li>
                <div className="navicon-wrap">
                  <FeatherIcon icon="mail" />
                  <div className="noti-count"></div>
                </div>
                <div className="hover-dropdown navmail-drop">
                  <div className="drop-header">
                    <h6>
                      Mail<span>08</span>
                    </h6>
                  </div>
                  <SimpleBar style={{ maxHeight: 300 }}>
                    <ul className="scroll-primary">
                      {[2, 3, 4, 5, 6, 7].map((num) => (
                        <li key={num}>
                          <div className="media">
                            <div className="avtar-wrap">
                              <img
                                className="img-fluid"
                                src={IMAGE_URLS[`avtar/${num}.jpg`]}
                                alt=""
                              />
                            </div>
                            <div className="media-body ml-10">
                              <h6>
                                User {num}
                                <span className="text-light ml-10 fs-10">
                                  - {num * 10} mins ago
                                </span>
                              </h6>
                              <span className="text-light">
                                Successful Paid Invoice #{1579 - num}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </SimpleBar>
                  <div className="drop-footer">
                    <Link to="#">See All Messages</Link>
                  </div>
                </div>
              </li> */}

              <li className="nav-profile">
                <Link className="action-toggle" to="#">
                  <div className="media">
                    <div className="user-icon">
                      <img
                        className="img-fluid rounded-50"
                        src={adminimg}
                        alt="logo"
                      />
                    </div>
                  </div>
                </Link>
                <div className="hover-dropdown navprofile-drop">
                  <ul>
                    <li>
                      <Link to="/support">
                        <i className="fa fa-question-circle-o"></i> Help
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa fa-cog" aria-hidden="true"></i>{" "}
                        Settings
                      </Link>
                    </li>
                    <li>
                      <span
                        onClick={handleLogout}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fa fa-sign-out"></i> Log out
                      </span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}
