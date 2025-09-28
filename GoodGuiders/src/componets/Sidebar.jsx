// // import React, { useEffect, useState } from 'react';
// // import { Link, useLocation } from "react-router-dom";
// // import SimpleBar from 'simplebar-react';
// // import FeatherIcon from 'feather-icons-react';
// // import { useSidebarContext } from '../pages/api/useSidebarContext';
// // import logo from '/src/assets/images/logo/icon-logo.png';
// // import logo1 from '/src/assets/images/logo/icon-logo.png';
// // import sidebarvactor from '/src/assets/images/pro-sec.png';
// // // For Font Awesome CSS
// // import 'font-awesome/css/font-awesome.min.css';

// // const menuPaths = {
// //     Dashboards: ["/index", "/doctor-dashboard", "/patient-dashboard"],
// //     Mentor: ["/all-doctors", "/add-doctor", "/edit-doctor"],
// //     Student: ["/all-patients", "/add-patient", "/edit-patient"],
// //     Appointments: ["/doctor-schedule", "/add-appointment", "/edit-appointment", "/appointment-list"],
// //     Billing: ["/payment-list", "/add-payment", "/patient-invoice"],
// //     EventManagement: ["/event-management"],
// //     AccessPages: ["/login", "/register", "/forgot-password", "/new-password", "/verify-email", "/verify-pin", "/error-page"],
// //     Support: ["/faq", "/support"],
// //     Table: ["/basic-table", "/data-table"],
// //     Forms: ["/element-input", "/element-checkbox-radio", "/element-datepicker"],
// //     Charts: ["/chart-apex", "/chart-echarts", "/chart-morris"],
// //     AdvanceElement: ["/timeline-one", "/timeline-two", "/pricing", "/element-select2", "/element-switch", "/element-dropzone", "/element-sweetalert2", "/element-lightbox"],
// //     Component: ["/element-typography", "/element-color", "/element-themeclass", "/element-alert", "/element-avtar", "/element-button", "/element-grid", "/element-dropdown", "/element-breadcrumb", "/element-accordion", "/element-badge", "/element-modal", "/element-tab", "/element-tooltip", "/element-card", "/element-progressbar", "/element-pagination"],
// // };
// // export default function Sidebar() {

// //  // Sidebar Menu
// //     const location = useLocation();
// //     const [activeIndex, setActiveIndex] = useState(null);

// //     useEffect(() => {
// //         const currentPath = location.pathname;
// //         const category = Object.keys(menuPaths).find(key => menuPaths[key].includes(currentPath));
// //         const index = category ? Object.keys(menuPaths).indexOf(category) : null;
// //         setActiveIndex(index);
// //     }, [location.pathname]);

// //     const handleMenuClick = (index) => {
// //         setActiveIndex(prevIndex => (prevIndex === index ? null : index));
// //     };

// //     // Sidebar Action
// //     const { toggleSidebar } = useSidebarContext();
// //     return (
// //         <div className="codex-sidebar">
// //             <div className="logo-gridwrap">
// //                 <Link className="lightlogo" to="/">
// //                     <img className="img-fluid" src={logo} alt="sidebar-lightlogo" />
// //                     {/* <span className="ms-2">Medixo</span> */}
// //                 </Link>
// //                 <div className="sidebar-action" onClick={toggleSidebar}>
// //                     <FeatherIcon icon="menu" />
// //                 </div>
// //             </div>
// //             <div className="icon-logo">
// //             <Link className="lightlogo" to="/">
// //                 <img className="img-fluid" src={logo1}  alt="sidebar-lightlogo"/>
// //             </Link>
// //             </div>

// //             <SimpleBar className="codex-menu custom-scroll">
// //                 <ul className="">
// //                     <li className="cdxmenu-title">
// //                         <h5>main</h5>
// //                     </li>
// //                     <li onClick={() => handleMenuClick(0)} className={`menu-item ${activeIndex === 0 ? 'active' : ''}`}>
// //                         <Link >
// //                             <div className="icon-item">
// //                                 <FeatherIcon icon="home" />
// //                             </div>
// //                             <span>dashboard   </span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li>
// //                                 <Link to="/">Super Admin Dashboard</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/doctor-dashboard">Mantor Dashboard</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/patient-dashboard">Student Dashboard</Link>
// //                             </li>
// //                         </ul>
// //                     </li>
// //                     <li onClick={() => handleMenuClick(1)} className={`menu-item ${activeIndex === 1 ? 'active' : ''}`}>
// //                         <Link >
// //                             <div className="icon-item">
// //                             <i className="fa fa-user-md"></i>
// //                             </div>
// //                             <span>Mentor</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li>
// //                                 <Link to="/all-doctors">all Mentor</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/add-doctor">add Mentor</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/edit-doctor">edit Mentor</Link>
// //                             </li>
// //                         </ul>
// //                     </li>
// //                     <li onClick={() => handleMenuClick(2)} className={`menu-item ${activeIndex === 2 ? 'active' : ''}`}>
// //                         <Link >
// //                             <div className="icon-item">
// //                                 <i className="fa fa-wheelchair" aria-hidden="true"></i>
// //                             </div>
// //                             <span>Student</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li>
// //                                 <Link to="/all-patients">all Student</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/add-patient">add Student</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/edit-patient">edit Student</Link>
// //                             </li>
// //                         </ul>
// //                     </li>
// //                     <li onClick={() => handleMenuClick(3)} className={`menu-item ${activeIndex === 3 ? 'active' : ''}`}>
// //                         <Link >
// //                             <div className="icon-item">
// //                                 <i className="fa fa-calendar"></i>
// //                             </div>
// //                             <span>Appointments</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li>
// //                                 <Link to="/doctor-schedule">Mentor schedule</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/add-appointment">add appointment</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/edit-appointment">edit appointment</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/appointment-list">view all appointment</Link>
// //                             </li>
// //                         </ul>
// //                     </li>
// //                     <li onClick={() => handleMenuClick(4)} className={`menu-item ${activeIndex === 4 ? 'active' : ''}`}>
// //                         <Link >
// //                             <div className="icon-item">
// //                                 <FeatherIcon icon="file" />
// //                             </div>
// //                             <span>billing</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li>
// //                                 <Link to="/payment-list">payment</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/add-payment">add payment</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/patient-invoice">Student invoice</Link>
// //                             </li>
// //                         </ul>
// //                     </li>
// //                     <li onClick={() => handleMenuClick(5)} className={`menu-item ${activeIndex === 5 ? 'active' : ''}`}>
// //                         <Link to="/event-management">
// //                             <div className="icon-item">
// //                             <FeatherIcon icon="list" />
// //                             </div>
// //                             <span>Event Management</span>
// //                         </Link>
// //                     </li>
// //                     <li onClick={() => handleMenuClick(6)} className={`menu-item ${activeIndex === 6 ? 'active' : ''}`}>
// //                         <Link >
// //                             <div className="icon-item">
// //                                 <FeatherIcon icon="key" />
// //                             </div>
// //                             <span>Access Pages</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li>
// //                                 <Link to="/login">login</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/register">register</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/forgot-password">forgot password</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/new-password">reset password</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/verify-email">verify email</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/verify-pin">verify pin</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/error-page">404</Link>
// //                             </li>
// //                         </ul>
// //                     </li>
// //                     <li onClick={() => handleMenuClick(7)} className={`menu-item ${activeIndex === 7 ? 'active' : ''}`}>
// //                         <Link >
// //                             <div className="icon-item">
// //                             <i className="fa fa-life-ring"></i>
// //                             </div>
// //                             <span>support</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li>
// //                                 <Link to="/faq">faq</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/support">help center</Link>
// //                             </li>
// //                         </ul>
// //                     </li>
// //                     {/* <li className="cdxmenu-title">
// //                         <h5>user interface</h5>
// //                     </li> */}
// //                     {/* <li onClick={() => handleMenuClick(8)} className={`menu-item ${activeIndex === 8 ? 'active' : ''}`}>
// //                         <Link >
// //                             <div className="icon-item">
// //                             <FeatherIcon icon="layers" />
// //                             </div>
// //                             <span>Table</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li>
// //                                 <Link to="/basic-table">table</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/data-table">data table</Link>
// //                             </li>
// //                         </ul>
// //                     </li>
// //                     <li onClick={() => handleMenuClick(9)} className={`menu-item ${activeIndex === 9 ? 'active' : ''}`}>
// //                         <Link >
// //                             <div className="icon-item">

// //                             <i className="fa fa-sitemap"></i>
// //                             </div>
// //                             <span>Forms</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li>
// //                                 <Link to="/element-input">form element</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/element-checkbox-radio">checkbox & radio</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/element-datepicker">datepicker</Link>
// //                             </li>
// //                         </ul>
// //                     </li>
// //                     <li onClick={() => handleMenuClick(10)} className={`menu-item ${activeIndex === 10 ? 'active' : ''}`}>
// //                         <Link >
// //                             <div className="icon-item">
// //                             <FeatherIcon icon="pie-chart" />
// //                             </div>
// //                             <span>Charts</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li>
// //                                 <Link to="/chart-apex">apex chart</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/chart-echarts">echarts</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/chart-morris">morris charts</Link>
// //                             </li>
// //                         </ul>
// //                     </li>
// //                     <li onClick={() => handleMenuClick(11)} className={`menu-item ${activeIndex === 11 ? 'active' : ''}`}>
// //                         <Link >
// //                             <div className="icon-item">
// //                             <FeatherIcon icon="database" />
// //                             </div>
// //                             <span>Advance element</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li>
// //                                 <Link to="/timeline-one">timeline one</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/timeline-two">timeline two</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/pricing">pricing tables</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/element-select2">select 2</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/element-switch">switch</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/element-dropzone">dropzone</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/element-sweetalert2">sweetalert2</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/element-lightbox">light box</Link>
// //                             </li>
// //                         </ul>
// //                     </li>
// //                     <li onClick={() => handleMenuClick(12)} className={`menu-item ${activeIndex === 12 ? 'active' : ''}`}>
// //                         <Link >
// //                             <div className="icon-item">
// //                             <FeatherIcon icon="layout" />
// //                             </div>
// //                             <span>Componet</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li>
// //                                 <Link to="/element-typography">typography</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/element-color">color</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/element-themeclass">helper class</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/element-alert">Alert </Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/element-avtar">Avtar</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/element-button">Button </Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/element-grid">grid</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/element-dropdown">Dropdown</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/element-breadcrumb">Breadcrumb</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/element-accordion">Accordion</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/element-badge">badge</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/element-modal">modal</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/element-tab">tabs</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/element-tooltip">tooltip</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/element-card">card</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/element-progressbar">progress bar</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/element-pagination">pagination</Link>
// //                             </li>
// //                         </ul>
// //                     </li>
// //                 </ul> */}
// //                 </ul>
// //             </SimpleBar>
// //             {/* <div className="sidebarpro-sec">
// //                 <img className="img-fluid" src={sidebarvactor} alt="" />
// //                 <h6>Your Journey,<br />Guided by the Best Mentor</h6><Link className="btn btn-primary btn-sm" >Chek Now</Link>
// //             </div> */}
// //         </div>

// //     )
// // }

// // import React, { useEffect, useState } from 'react';
// // import { Link, useLocation } from "react-router-dom";
// // import SimpleBar from 'simplebar-react';
// // import FeatherIcon from 'feather-icons-react';
// // import { useSidebarContext } from '../pages/api/useSidebarContext';
// // import logo from '/src/assets/images/logo/icon-logo.png';
// // import logo1 from '/src/assets/images/logo/icon-logo.png';
// // import sidebarvactor from '/src/assets/images/pro-sec.png';
// // // For Font Awesome CSS
// // import 'font-awesome/css/font-awesome.min.css';

// // const menuPaths = {
// //     Dashboards: ["/index", "/doctor-dashboard", "/patient-dashboard"],
// //     Mentor: ["/all-doctors", "/add-doctor", "/edit-doctor"],
// //     Student: ["/all-patients", "/add-patient", "/edit-patient"],
// //     Appointments: ["/doctor-schedule", "/add-appointment", "/edit-appointment", "/appointment-list"],
// //     Billing: ["/payment-list", "/add-payment", "/patient-invoice"],
// //     EventManagement: ["/event-management"],
// //     AccessPages: ["/login", "/register", "/forgot-password", "/new-password", "/verify-email", "/verify-pin", "/error-page"],
// //     Support: ["/faq", "/support"],
// //     Table: ["/basic-table", "/data-table"],
// //     Forms: ["/element-input", "/element-checkbox-radio", "/element-datepicker"],
// //     Charts: ["/chart-apex", "/chart-echarts", "/chart-morris"],
// //     AdvanceElement: ["/timeline-one", "/timeline-two", "/pricing", "/element-select2", "/element-switch", "/element-dropzone", "/element-sweetalert2", "/element-lightbox"],
// //     Component: ["/element-typography", "/element-color", "/element-themeclass", "/element-alert", "/element-avtar", "/element-button", "/element-grid", "/element-dropdown", "/element-breadcrumb", "/element-accordion", "/element-badge", "/element-modal", "/element-tab", "/element-tooltip", "/element-card", "/element-progressbar", "/element-pagination"],
// // };
// // export default function Sidebar() {

// //  // Sidebar Menu
// //     const location = useLocation();
// //     const [activeIndex, setActiveIndex] = useState(null);

// //     useEffect(() => {
// //         const currentPath = location.pathname;
// //         const category = Object.keys(menuPaths).find(key => menuPaths[key].includes(currentPath));
// //         const index = category ? Object.keys(menuPaths).indexOf(category) : null;
// //         setActiveIndex(index);
// //     }, [location.pathname]);

// //     const handleMenuClick = (index) => {
// //         setActiveIndex(prevIndex => (prevIndex === index ? null : index));
// //     };

// //     // Sidebar Action
// //     const { toggleSidebar } = useSidebarContext();
// //     return (
// //         <div className="codex-sidebar">
// //             <div className="logo-gridwrap">
// //                 <Link className="lightlogo" to="/">
// //                     <img className="img-fluid" src={logo} alt="sidebar-lightlogo" />
// //                     {/* <span className="ms-2">Medixo</span> */}
// //                 </Link>
// //                 <div className="sidebar-action" onClick={toggleSidebar}>
// //                     <FeatherIcon icon="menu" />
// //                 </div>
// //             </div>
// //             <div className="icon-logo">
// //             <Link className="lightlogo" to="/">
// //                 <img className="img-fluid" src={logo1}  alt="sidebar-lightlogo"/>
// //             </Link>
// //             </div>

// //             <SimpleBar className="codex-menu custom-scroll">
// //                 <ul className="">
// //                     <li className="cdxmenu-title">
// //                         <h5>main</h5>
// //                     </li>
// //                     <li onClick={() => handleMenuClick(0)} className={`menu-item ${activeIndex === 0 ? 'active' : ''}`}>
// //                         <Link >
// //                             <div className="icon-item">
// //                                 <FeatherIcon icon="home" />
// //                             </div>
// //                             <span>dashboard   </span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li>
// //                                 <Link to="/">Super Admin Dashboard</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/doctor-dashboard">Mantor Dashboard</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/patient-dashboard">Student Dashboard</Link>
// //                             </li>
// //                         </ul>
// //                     </li>
// //                     <li onClick={() => handleMenuClick(1)} className={`menu-item ${activeIndex === 1 ? 'active' : ''}`}>
// //                         <Link >
// //                             <div className="icon-item">
// //                             <i className="fa fa-user-md"></i>
// //                             </div>
// //                             <span>Mentor</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li>
// //                                 <Link to="/all-doctors">all Mentor</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/add-doctor">add Mentor</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/edit-doctor">edit Mentor</Link>
// //                             </li>
// //                         </ul>
// //                     </li>
// //                     <li onClick={() => handleMenuClick(2)} className={`menu-item ${activeIndex === 2 ? 'active' : ''}`}>
// //                         <Link >
// //                             <div className="icon-item">
// //                                 <i className="fa fa-wheelchair" aria-hidden="true"></i>
// //                             </div>
// //                             <span>Student</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li>
// //                                 <Link to="/all-patients">all Student</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/add-patient">add Student</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/edit-patient">edit Student</Link>
// //                             </li>
// //                         </ul>
// //                     </li>
// //                     <li onClick={() => handleMenuClick(3)} className={`menu-item ${activeIndex === 3 ? 'active' : ''}`}>
// //                         <Link >
// //                             <div className="icon-item">
// //                                 <i className="fa fa-calendar"></i>
// //                             </div>
// //                             <span>Appointments</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li>
// //                                 <Link to="/doctor-schedule">Mentor schedule</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/add-appointment">add appointment</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/edit-appointment">edit appointment</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/appointment-list">view all appointment</Link>
// //                             </li>
// //                         </ul>
// //                     </li>
// //                     <li onClick={() => handleMenuClick(4)} className={`menu-item ${activeIndex === 4 ? 'active' : ''}`}>
// //                         <Link >
// //                             <div className="icon-item">
// //                                 <FeatherIcon icon="file" />
// //                             </div>
// //                             <span>billing</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li>
// //                                 <Link to="/payment-list">payment</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/add-payment">add payment</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/patient-invoice">Student invoice</Link>
// //                             </li>
// //                         </ul>
// //                     </li>
// //                     <li onClick={() => handleMenuClick(5)} className={`menu-item ${activeIndex === 5 ? 'active' : ''}`}>
// //                         <Link to="/event-management">
// //                             <div className="icon-item">
// //                             <FeatherIcon icon="list" />
// //                             </div>
// //                             <span>Event Management</span>
// //                         </Link>
// //                     </li>
// //                     <li onClick={() => handleMenuClick(6)} className={`menu-item ${activeIndex === 6 ? 'active' : ''}`}>
// //                         <Link >
// //                             <div className="icon-item">
// //                                 <FeatherIcon icon="key" />
// //                             </div>
// //                             <span>Access Pages</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li>
// //                                 <Link to="/login">login</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/register">register</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/forgot-password">forgot password</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/new-password">reset password</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/verify-email">verify email</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/verify-pin">verify pin</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/error-page">404</Link>
// //                             </li>
// //                         </ul>
// //                     </li>
// //                     <li onClick={() => handleMenuClick(7)} className={`menu-item ${activeIndex === 7 ? 'active' : ''}`}>
// //                         <Link >
// //                             <div className="icon-item">
// //                             <i className="fa fa-life-ring"></i>
// //                             </div>
// //                             <span>support</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li>
// //                                 <Link to="/faq">faq</Link>
// //                             </li>
// //                             <li>
// //                                 <Link to="/support">help center</Link>
// //                             </li>
// //                         </ul>
// //                     </li>

// //                 </ul>
// //             </SimpleBar>
// //             {/* <div className="sidebarpro-sec">
// //                 <img className="img-fluid" src={sidebarvactor} alt="" />
// //                 <h6>Your Journey,<br />Guided by the Best Mentor</h6><Link className="btn btn-primary btn-sm" >Chek Now</Link>
// //             </div> */}
// //         </div>

// //     )
// // }

// // import React, { useEffect, useState } from 'react';
// // import { Link, useLocation } from "react-router-dom";
// // import SimpleBar from 'simplebar-react';
// // import FeatherIcon from 'feather-icons-react';
// // import { useSidebarContext } from '../pages/api/useSidebarContext';
// // import logo from '/src/assets/images/logo/icon-logo.png';
// // import logo1 from '/src/assets/images/logo/icon-logo.png';
// // import 'font-awesome/css/font-awesome.min.css';

// // const menuPaths = {
// //     Dashboards: ["/index", "/doctor-dashboard", "/patient-dashboard"],
// //     Mentor: ["/all-doctors", "/add-doctor", "/edit-doctor"],
// //     Student: ["/all-patients", "/add-patient", "/edit-patient"],
// //     Appointments: ["/doctor-schedule", "/add-appointment", "/edit-appointment", "/appointment-list"],
// //     Billing: ["/payment-list", "/add-payment", "/patient-invoice"],
// //     EventManagement: ["/event-management"],
// //     AccessPages: ["/login", "/register", "/forgot-password", "/new-password", "/verify-email", "/verify-pin", "/error-page"],
// //     Support: ["/faq", "/support"]
// // };

// // export default function Sidebar() {
// //     const location = useLocation();
// //     const [activeIndex, setActiveIndex] = useState(null);
// //     const [userEmail, setUserEmail] = useState(null);

// //     // Track logged-in user
// //     useEffect(() => {
// //         const auth = getAuth();
// //         const unsubscribe = onAuthStateChanged(auth, (user) => {
// //             if (user) {
// //                 setUserEmail(user.email);
// //             } else {
// //                 setUserEmail(null);
// //             }
// //         });
// //         return () => unsubscribe();
// //     }, []);

// //     // Determine active menu
// //     useEffect(() => {
// //         const currentPath = location.pathname;
// //         const category = Object.keys(menuPaths).find(key =>
// //             menuPaths[key].includes(currentPath)
// //         );
// //         const index = category ? Object.keys(menuPaths).indexOf(category) : null;
// //         setActiveIndex(index);
// //     }, [location.pathname]);

// //     const handleMenuClick = (index) => {
// //         setActiveIndex(prevIndex => (prevIndex === index ? null : index));
// //     };

// //     const { toggleSidebar } = useSidebarContext();

// //     const isMentor = userEmail === "mentor@gmail.com";

// //     return (
// //         <div className="codex-sidebar">
// //             <div className="logo-gridwrap">
// //                 <Link className="lightlogo" to="/">
// //                     <img className="img-fluid" src={logo} alt="sidebar-lightlogo" />
// //                 </Link>
// //                 <div className="sidebar-action" onClick={toggleSidebar}>
// //                     <FeatherIcon icon="menu" />
// //                 </div>
// //             </div>

// //             <div className="icon-logo">
// //                 <Link className="lightlogo" to="/">
// //                     <img className="img-fluid" src={logo1} alt="sidebar-lightlogo" />
// //                 </Link>
// //             </div>

// //             <SimpleBar className="codex-menu custom-scroll">
// //                 <ul>
// //                     <li className="cdxmenu-title">
// //                         <h5>main</h5>
// //                     </li>

// //                     <li onClick={() => handleMenuClick(0)} className={`menu-item ${activeIndex === 0 ? 'active' : ''}`}>
// //                         <Link>
// //                             <div className="icon-item">
// //                                 <FeatherIcon icon="home" />
// //                             </div>
// //                             <span>dashboard</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>

// //                         <ul className="submenu-list">
// //                             {!isMentor && (
// //                                 <li>
// //                                     <Link to="/">Super Admin Dashboard</Link>
// //                                 </li>
// //                             )}
// //                             {isMentor && (
// //                                 <li>
// //                                     <Link to="/doctor-dashboard">Mentor Dashboard</Link>
// //                                 </li>
// //                             )}
// //                             {!isMentor && (
// //                                 <li>
// //                                     <Link to="/patient-dashboard">Student Dashboard</Link>
// //                                 </li>
// //                             )}
// //                         </ul>
// //                     </li>

// //                     <li onClick={() => handleMenuClick(1)} className={`menu-item ${activeIndex === 1 ? 'active' : ''}`}>
// //                         <Link>
// //                             <div className="icon-item">
// //                                 <i className="fa fa-user-md"></i>
// //                             </div>
// //                             <span>Mentor</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li><Link to="/all-doctors">All Mentor</Link></li>
// //                             <li><Link to="/add-doctor">Add Mentor</Link></li>
// //                             <li><Link to="/edit-doctor">Edit Mentor</Link></li>
// //                         </ul>
// //                     </li>

// //                     <li onClick={() => handleMenuClick(2)} className={`menu-item ${activeIndex === 2 ? 'active' : ''}`}>
// //                         <Link>
// //                             <div className="icon-item">
// //                                 <i className="fa fa-wheelchair" aria-hidden="true"></i>
// //                             </div>
// //                             <span>Student</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li><Link to="/all-patients">All Student</Link></li>
// //                             <li><Link to="/add-patient">Add Student</Link></li>
// //                             <li><Link to="/edit-patient">Edit Student</Link></li>
// //                         </ul>
// //                     </li>

// //                     <li onClick={() => handleMenuClick(3)} className={`menu-item ${activeIndex === 3 ? 'active' : ''}`}>
// //                         <Link>
// //                             <div className="icon-item">
// //                                 <i className="fa fa-calendar"></i>
// //                             </div>
// //                             <span>Appointments</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li><Link to="/doctor-schedule">Mentor Schedule</Link></li>
// //                             <li><Link to="/add-appointment">Add Appointment</Link></li>
// //                             <li><Link to="/edit-appointment">Edit Appointment</Link></li>
// //                             <li><Link to="/appointment-list">View All Appointments</Link></li>
// //                         </ul>
// //                     </li>

// //                     <li onClick={() => handleMenuClick(4)} className={`menu-item ${activeIndex === 4 ? 'active' : ''}`}>
// //                         <Link>
// //                             <div className="icon-item">
// //                                 <FeatherIcon icon="file" />
// //                             </div>
// //                             <span>Billing</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li><Link to="/payment-list">Payment</Link></li>
// //                             <li><Link to="/add-payment">Add Payment</Link></li>
// //                             <li><Link to="/patient-invoice">Student Invoice</Link></li>
// //                         </ul>
// //                     </li>

// //                     <li onClick={() => handleMenuClick(5)} className={`menu-item ${activeIndex === 5 ? 'active' : ''}`}>
// //                         <Link to="/event-management">
// //                             <div className="icon-item">
// //                                 <FeatherIcon icon="list" />
// //                             </div>
// //                             <span>Event Management</span>
// //                         </Link>
// //                     </li>

// //                     <li onClick={() => handleMenuClick(6)} className={`menu-item ${activeIndex === 6 ? 'active' : ''}`}>
// //                         <Link>
// //                             <div className="icon-item">
// //                                 <FeatherIcon icon="key" />
// //                             </div>
// //                             <span>Access Pages</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li><Link to="/login">Login</Link></li>
// //                             <li><Link to="/register">Register</Link></li>
// //                             <li><Link to="/forgot-password">Forgot Password</Link></li>
// //                             <li><Link to="/new-password">Reset Password</Link></li>
// //                             <li><Link to="/verify-email">Verify Email</Link></li>
// //                             <li><Link to="/verify-pin">Verify Pin</Link></li>
// //                             <li><Link to="/error-page">404</Link></li>
// //                         </ul>
// //                     </li>

// //                     <li onClick={() => handleMenuClick(7)} className={`menu-item ${activeIndex === 7 ? 'active' : ''}`}>
// //                         <Link>
// //                             <div className="icon-item">
// //                                 <i className="fa fa-life-ring"></i>
// //                             </div>
// //                             <span>Support</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li><Link to="/faq">FAQ</Link></li>
// //                             <li><Link to="/support">Help Center</Link></li>
// //                         </ul>
// //                     </li>
// //                 </ul>
// //             </SimpleBar>
// //         </div>
// //     );
// // }

// // import React, { useEffect, useState } from 'react';
// // import { Link, useLocation } from "react-router-dom";
// // import SimpleBar from 'simplebar-react';
// // import FeatherIcon from 'feather-icons-react';
// // import { useSidebarContext } from '../pages/api/useSidebarContext';
// // import logo from '/src/assets/images/logo/icon-logo.png';
// // import logo1 from '/src/assets/images/logo/icon-logo.png';
// // import 'font-awesome/css/font-awesome.min.css';

// // const menuPaths = {
// //     Dashboards: ["/index", "/doctor-dashboard", "/patient-dashboard"],
// //     Mentor: ["/all-doctors", "/add-doctor", "/edit-doctor"],
// //     Student: ["/all-patients", "/add-patient", "/edit-patient"],
// //     Appointments: ["/doctor-schedule", "/add-appointment", "/edit-appointment", "/appointment-list"],
// //     Billing: ["/payment-list", "/add-payment", "/patient-invoice"],
// //     EventManagement: ["/event-management"],
// //     AccessPages: ["/login", "/register", "/forgot-password", "/new-password", "/verify-email", "/verify-pin", "/error-page"],
// //     Support: ["/faq", "/support"]
// // };

// // export default function Sidebar() {
// //     const location = useLocation();
// //     const [activeIndex, setActiveIndex] = useState(null);
// //     const [userEmail, setUserEmail] = useState(null);

// //     // Use localStorage instead of Firebase to get logged-in user email
// //     useEffect(() => {
// //         const email = localStorage.getItem("userEmail");
// //         setUserEmail(email);
// //     }, []);

// //     // Determine active menu based on current path
// //     useEffect(() => {
// //         const currentPath = location.pathname;
// //         const category = Object.keys(menuPaths).find(key =>
// //             menuPaths[key].includes(currentPath)
// //         );
// //         const index = category ? Object.keys(menuPaths).indexOf(category) : null;
// //         setActiveIndex(index);
// //     }, [location.pathname]);

// //     const handleMenuClick = (index) => {
// //         setActiveIndex(prevIndex => (prevIndex === index ? null : index));
// //     };

// //     const { toggleSidebar } = useSidebarContext();

// //     const isMentor = userEmail === "mentor@gmail.com";

// //     return (
// //         <div className="codex-sidebar">
// //             <div className="logo-gridwrap">
// //                 <Link className="lightlogo" to="/">
// //                     <img className="img-fluid" src={logo} alt="sidebar-lightlogo" />
// //                 </Link>
// //                 <div className="sidebar-action" onClick={toggleSidebar}>
// //                     <FeatherIcon icon="menu" />
// //                 </div>
// //             </div>

// //             <div className="icon-logo">
// //                 <Link className="lightlogo" to="/">
// //                     <img className="img-fluid" src={logo1} alt="sidebar-lightlogo" />
// //                 </Link>
// //             </div>

// //             <SimpleBar className="codex-menu custom-scroll">
// //                 <ul>
// //                     <li className="cdxmenu-title">
// //                         <h5>main</h5>
// //                     </li>

// //                     <li onClick={() => handleMenuClick(0)} className={`menu-item ${activeIndex === 0 ? 'active' : ''}`}>
// //                         <Link>
// //                             <div className="icon-item">
// //                                 <FeatherIcon icon="home" />
// //                             </div>
// //                             <span>dashboard</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>

// //                         <ul className="submenu-list">
// //                             {isMentor && (
// //                                 <li>
// //                                     <Link to="/">Super Admin Dashboard</Link>
// //                                 </li>
// //                             )}
// //                             {isMentor && (
// //                                 <li>
// //                                     <Link to="/doctor-dashboard">Mentor Dashboard</Link>
// //                                 </li>
// //                             )}
// //                             {!isMentor && (
// //                                 <li>
// //                                     <Link to="/patient-dashboard">Student Dashboard</Link>
// //                                 </li>
// //                             )}
// //                         </ul>
// //                     </li>

// //                     <li onClick={() => handleMenuClick(1)} className={`menu-item ${activeIndex === 1 ? 'active' : ''}`}>
// //                         <Link>
// //                             <div className="icon-item">
// //                                 <i className="fa fa-user-md"></i>
// //                             </div>
// //                             <span>Mentor</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li><Link to="/all-doctors">All Mentor</Link></li>
// //                             <li><Link to="/add-doctor">Add Mentor</Link></li>
// //                             <li><Link to="/edit-doctor">Edit Mentor</Link></li>
// //                         </ul>
// //                     </li>

// //                     <li onClick={() => handleMenuClick(2)} className={`menu-item ${activeIndex === 2 ? 'active' : ''}`}>
// //                         <Link>
// //                             <div className="icon-item">
// //                                 <i className="fa fa-wheelchair" aria-hidden="true"></i>
// //                             </div>
// //                             <span>Student</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li><Link to="/all-patients">All Student</Link></li>
// //                             <li><Link to="/add-patient">Add Student</Link></li>
// //                             <li><Link to="/edit-patient">Edit Student</Link></li>
// //                         </ul>
// //                     </li>

// //                     <li onClick={() => handleMenuClick(3)} className={`menu-item ${activeIndex === 3 ? 'active' : ''}`}>
// //                         <Link>
// //                             <div className="icon-item">
// //                                 <i className="fa fa-calendar"></i>
// //                             </div>
// //                             <span>Appointments</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li><Link to="/doctor-schedule">Mentor Schedule</Link></li>
// //                             <li><Link to="/add-appointment">Add Appointment</Link></li>

// //                             <li><Link to="/edit-appointment">Edit Appointment</Link></li>
// //                             <li><Link to="/appointment-list">View All Appointments</Link></li>
// //                         </ul>
// //                     </li>

// //                     <li onClick={() => handleMenuClick(4)} className={`menu-item ${activeIndex === 4 ? 'active' : ''}`}>
// //                         <Link>
// //                             <div className="icon-item">
// //                                 <FeatherIcon icon="file" />
// //                             </div>
// //                             <span>Billing</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li><Link to="/payment-list">Payment</Link></li>
// //                             <li><Link to="/add-payment">Add Payment</Link></li>
// //                             <li><Link to="/patient-invoice">Student Invoice</Link></li>
// //                         </ul>
// //                     </li>

// //                     <li onClick={() => handleMenuClick(5)} className={`menu-item ${activeIndex === 5 ? 'active' : ''}`}>
// //                         <Link to="/event-management">
// //                             <div className="icon-item">
// //                                 <FeatherIcon icon="list" />
// //                             </div>
// //                             <span>Event Management</span>
// //                         </Link>
// //                     </li>

// //                     {/* <li onClick={() => handleMenuClick(6)} className={`menu-item ${activeIndex === 6 ? 'active' : ''}`}>
// //                         <Link>
// //                             <div className="icon-item">
// //                                 <FeatherIcon icon="key" />
// //                             </div>
// //                             <span>Access Pages</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li><Link to="/login">Login</Link></li>
// //                             <li><Link to="/register">Register</Link></li>
// //                             <li><Link to="/forgot-password">Forgot Password</Link></li>
// //                             <li><Link to="/new-password">Reset Password</Link></li>
// //                             <li><Link to="/verify-email">Verify Email</Link></li>
// //                             <li><Link to="/verify-pin">Verify Pin</Link></li>
// //                             <li><Link to="/error-page">404</Link></li>
// //                         </ul>
// //                     </li> */}

// //                     <li onClick={() => handleMenuClick(7)} className={`menu-item ${activeIndex === 7 ? 'active' : ''}`}>
// //                         <Link>
// //                             <div className="icon-item">
// //                                 <i className="fa fa-life-ring"></i>
// //                             </div>
// //                             <span>Support</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li><Link to="/faq">FAQ</Link></li>
// //                             <li><Link to="/support">Help Center</Link></li>
// //                         </ul>
// //                     </li>
// //                 </ul>
// //             </SimpleBar>
// //         </div>
// //     );
// // }

// // import React, { useEffect, useState } from 'react';
// // import { Link, useLocation } from "react-router-dom";
// // import SimpleBar from 'simplebar-react';
// // import FeatherIcon from 'feather-icons-react';
// // import { useSidebarContext } from '../pages/api/useSidebarContext';
// // import logo from '/src/assets/images/logo/icon-logo.png';
// // import logo1 from '/src/assets/images/logo/icon-logo.png';
// // import 'font-awesome/css/font-awesome.min.css';

// // const menuPaths = {
// //     Dashboards: ["/index", "/doctor-dashboard", "/patient-dashboard"],
// //     Mentor: ["/all-doctors", "/add-doctor", "/edit-doctor"],
// //     Student: ["/all-patients", "/add-patient", "/edit-patient"],
// //     Appointments: ["/doctor-schedule", "/add-appointment", "/edit-appointment", "/appointment-list"],
// //     Billing: ["/payment-list", "/add-payment", "/patient-invoice"],
// //     EventManagement: ["/event-management"],
// //     AccessPages: ["/login", "/register", "/forgot-password", "/new-password", "/verify-email", "/verify-pin", "/error-page"],
// //     Support: ["/faq", "/support"]
// // };

// // export default function Sidebar() {
// //     const location = useLocation();
// //     const [activeIndex, setActiveIndex] = useState(null);
// //     const [userEmail, setUserEmail] = useState(null);

// //     useEffect(() => {
// //         const email = localStorage.getItem("userEmail");
// //         setUserEmail(email);
// //     }, []);

// //     useEffect(() => {
// //         const currentPath = location.pathname;
// //         const category = Object.keys(menuPaths).find(key =>
// //             menuPaths[key].includes(currentPath)
// //         );
// //         const index = category ? Object.keys(menuPaths).indexOf(category) : null;
// //         setActiveIndex(index);
// //     }, [location.pathname]);

// //     const handleMenuClick = (index) => {
// //         setActiveIndex(prevIndex => (prevIndex === index ? null : index));
// //     };

// //     const { toggleSidebar } = useSidebarContext();

// //     const isMentor = userEmail === "mentor@gmail.com";

// //     return (
// //       <div className="codex-sidebar">
// //         <div className="logo-gridwrap">
// //           <Link className="lightlogo" to="/">
// //             <img className="img-fluid" src={logo} alt="sidebar-lightlogo" />
// //           </Link>
// //           <div className="sidebar-action" onClick={toggleSidebar}>
// //             <FeatherIcon icon="menu" />
// //           </div>
// //         </div>

// //         <div className="icon-logo">
// //           <Link className="lightlogo" to="/">
// //             <img className="img-fluid" src={logo1} alt="sidebar-lightlogo" />
// //           </Link>
// //         </div>

// //         <SimpleBar className="codex-menu custom-scroll">
// //           <ul>
// //             <li className="cdxmenu-title">
// //               <h5>main</h5>
// //             </li>

// //             <li
// //               onClick={() => handleMenuClick(0)}
// //               className={`menu-item ${activeIndex === 0 ? "active" : ""}`}
// //             >
// //               <Link>
// //                 <div className="icon-item">
// //                   <FeatherIcon icon="home" />
// //                 </div>
// //                 <span>dashboard</span>
// //                 <i className="fa fa-angle-down"></i>
// //               </Link>

// //               <ul className="submenu-list">
// //                 {isMentor && (
// //                   <li>
// //                     <Link to="/">Super Admin Dashboard</Link>
// //                   </li>
// //                 )}
// //                 {isMentor && (
// //                   <li>
// //                     <Link to="/doctor-dashboard">Mentor Dashboard</Link>
// //                   </li>
// //                 )}
// //                 {!isMentor && (
// //                   <li>
// //                     <Link to="/patient-dashboard">Student Dashboard</Link>
// //                   </li>
// //                 )}
// //               </ul>
// //             </li>

// //             <li
// //               onClick={() => handleMenuClick(1)}
// //               className={`menu-item ${activeIndex === 1 ? "active" : ""}`}
// //             >
// //               <Link>
// //                 <div className="icon-item">
// //                   <i className="fa fa-user-md"></i>
// //                 </div>
// //                 <span>Mentor</span>
// //                 <i className="fa fa-angle-down"></i>
// //               </Link>
// //               <ul className="submenu-list">
// //                 <li>
// //                   <Link to="/all-doctors">All Mentor</Link>
// //                 </li>
// //                 <li>
// //                   <Link to="/add-doctor">Add Mentor</Link>
// //                 </li>
// //                 <li>
// //                   <Link to="/edit-doctor">Edit Mentor</Link>
// //                 </li>
// //               </ul>
// //             </li>

// //             <li
// //               onClick={() => handleMenuClick(2)}
// //               className={`menu-item ${activeIndex === 2 ? "active" : ""}`}
// //             >
// //               <Link>
// //                 <div className="icon-item">
// //                   <i className="fa fa-wheelchair" aria-hidden="true"></i>
// //                 </div>
// //                 <span>Student</span>
// //                 <i className="fa fa-angle-down"></i>
// //               </Link>
// //               <ul className="submenu-list">
// //                 <li>
// //                   <Link to="/all-patients">All Student</Link>
// //                 </li>
// //                 {userEmail !== "student@gmail.com" &&
// //                   userEmail !== "mentor@gmail.com" && (
// //                     <>
// //                       <li>
// //                         <Link to="/add-patient">Add Student</Link>
// //                       </li>
// //                       <li>
// //                         <Link to="/edit-patient">Edit Student</Link>
// //                       </li>
// //                     </>
// //                   )}
// //                 {/* <li><Link to="/add-patient">Add Student</Link></li>
// //                             <li><Link to="/edit-patient">Edit Student</Link></li> */}
// //               </ul>
// //             </li>

// //             <li
// //               onClick={() => handleMenuClick(3)}
// //               className={`menu-item ${activeIndex === 3 ? "active" : ""}`}
// //             >
// //               <Link>
// //                 <div className="icon-item">
// //                   <i className="fa fa-calendar"></i>
// //                 </div>
// //                 <span>Appointments</span>
// //                 <i className="fa fa-angle-down"></i>
// //               </Link>
// //               <ul className="submenu-list">
// //                 <li>
// //                   <Link to="/doctor-schedule">Mentor Schedule</Link>
// //                 </li>
// //                 <li>
// //                   <Link to="/add-appointment">Add Appointment</Link>
// //                 </li>

// //                 <li>
// //                   <Link to="/edit-appointment">Edit Appointment</Link>
// //                 </li>
// //                 <li>
// //                   <Link to="/appointment-list">View All Appointments</Link>
// //                 </li>
// //               </ul>
// //             </li>

// //             <li
// //               onClick={() => handleMenuClick(4)}
// //               className={`menu-item ${activeIndex === 4 ? "active" : ""}`}
// //             >
// //               <Link>
// //                 <div className="icon-item">
// //                   <FeatherIcon icon="file" />
// //                 </div>
// //                 <span>Billing</span>
// //                 <i className="fa fa-angle-down"></i>
// //               </Link>
// //               <ul className="submenu-list">
// //                 <li>
// //                   <Link to="/payment-list">Payment</Link>
// //                 </li>
// //                 <li>
// //                   <Link to="/add-payment">Add Payment</Link>
// //                 </li>
// //                 <li>
// //                   <Link to="/patient-invoice">Student Invoice</Link>
// //                 </li>
// //               </ul>
// //             </li>

// //             <li
// //               onClick={() => handleMenuClick(5)}
// //               className={`menu-item ${activeIndex === 5 ? "active" : ""}`}
// //             >
// //               <Link to="/event-management">
// //                 <div className="icon-item">
// //                   <FeatherIcon icon="list" />
// //                 </div>
// //                 <span>Event Management</span>
// //               </Link>
// //             </li>

// //             {/* <li onClick={() => handleMenuClick(6)} className={`menu-item ${activeIndex === 6 ? 'active' : ''}`}>
// //                         <Link>
// //                             <div className="icon-item">
// //                                 <FeatherIcon icon="key" />
// //                             </div>
// //                             <span>Access Pages</span>
// //                             <i className="fa fa-angle-down"></i>
// //                         </Link>
// //                         <ul className="submenu-list">
// //                             <li><Link to="/login">Login</Link></li>
// //                             <li><Link to="/register">Register</Link></li>
// //                             <li><Link to="/forgot-password">Forgot Password</Link></li>
// //                             <li><Link to="/new-password">Reset Password</Link></li>
// //                             <li><Link to="/verify-email">Verify Email</Link></li>
// //                             <li><Link to="/verify-pin">Verify Pin</Link></li>
// //                             <li><Link to="/error-page">404</Link></li>
// //                         </ul>
// //                     </li> */}

// //             <li
// //               onClick={() => handleMenuClick(7)}
// //               className={`menu-item ${activeIndex === 7 ? "active" : ""}`}
// //             >
// //               <Link>
// //                 <div className="icon-item">
// //                   <i className="fa fa-life-ring"></i>
// //                 </div>
// //                 <span>Support</span>
// //                 <i className="fa fa-angle-down"></i>
// //               </Link>
// //               <ul className="submenu-list">
// //                 <li>
// //                   <Link to="/faq">FAQ</Link>
// //                 </li>
// //                 <li>
// //                   <Link to="/support">Help Center</Link>
// //                 </li>
// //               </ul>
// //             </li>
// //           </ul>
// //         </SimpleBar>
// //       </div>
// //     );
// // }

// // import React, { useEffect, useState } from 'react';
// // import { Link, useLocation } from "react-router-dom";
// // import SimpleBar from 'simplebar-react';
// // import FeatherIcon from 'feather-icons-react';
// // import { useSidebarContext } from '../pages/api/useSidebarContext';
// // import logo from '/src/assets/images/logo/icon-logo.png';
// // import logo1 from '/src/assets/images/logo/icon-logo.png';
// // import 'font-awesome/css/font-awesome.min.css';

// // const menuPaths = {
// //   Dashboards: ["/index", "/doctor-dashboard", "/patient-dashboard"],
// //   Mentor: ["/all-doctors", "/add-doctor", "/edit-doctor"],
// //   Student: ["/all-patients", "/add-patient", "/edit-patient"],
// //   Appointments: ["/doctor-schedule", "/add-appointment", "/edit-appointment", "/appointment-list"],
// //   Billing: ["/payment-list", "/add-payment", "/patient-invoice"],
// //   EventManagement: ["/event-management"],
// //   AccessPages: ["/login", "/register", "/forgot-password", "/new-password", "/verify-email", "/verify-pin", "/error-page"],
// //   Support: ["/faq", "/support"]
// // };

// // export default function Sidebar() {
// //   const location = useLocation();
// //   const [activeIndex, setActiveIndex] = useState(null);
// //   const [userEmail, setUserEmail] = useState(null);

// //   const accessPages = [
// //     "/login",
// //     "/register",
// //     "/forgot-password",
// //     "/new-password",
// //     "/verify-email",
// //     "/verify-pin",
// //     "/error-page"
// //   ];

// //   useEffect(() => {
// //     const email = localStorage.getItem("userEmail");
// //     setUserEmail(email);
// //   }, []);

// //   useEffect(() => {
// //     const currentPath = location.pathname;
// //     const category = Object.keys(menuPaths).find(key =>
// //       menuPaths[key].includes(currentPath)
// //     );
// //     const index = category ? Object.keys(menuPaths).indexOf(category) : null;
// //     setActiveIndex(index);
// //   }, [location.pathname]);

// //   const handleMenuClick = (index) => {
// //     setActiveIndex(prevIndex => (prevIndex === index ? null : index));
// //   };

// //   const { toggleSidebar } = useSidebarContext();
// //   const isMentor = userEmail === "mentor@gmail.com";

// //   // ❌ Don't render sidebar on login/register/forgot-password/etc. pages
// //   if (accessPages.includes(location.pathname)) {
// //     return null;
// //   }

// //   return (
// //     <div className="codex-sidebar">
// //       <div className="logo-gridwrap">
// //         <Link className="lightlogo" to="/">
// //           <img className="img-fluid" src={logo} alt="sidebar-lightlogo" />
// //         </Link>
// //         <div className="sidebar-action" onClick={toggleSidebar}>
// //           <FeatherIcon icon="menu" />
// //         </div>
// //       </div>

// //       <div className="icon-logo">
// //         <Link className="lightlogo" to="/">
// //           <img className="img-fluid" src={logo1} alt="sidebar-lightlogo" />
// //         </Link>
// //       </div>

// //       <SimpleBar className="codex-menu custom-scroll">
// //         <ul>
// //           <li className="cdxmenu-title">
// //             <h5>main</h5>
// //           </li>

// //           <li onClick={() => handleMenuClick(0)} className={`menu-item ${activeIndex === 0 ? "active" : ""}`}>
// //             <Link>
// //               <div className="icon-item"><FeatherIcon icon="home" /></div>
// //               <span>dashboard</span>
// //               <i className="fa fa-angle-down"></i>
// //             </Link>
// //             <ul className="submenu-list">
// //               {isMentor && (
// //                 <>
// //                   <li><Link to="/">Super Admin Dashboard</Link></li>
// //                   <li><Link to="/doctor-dashboard">Mentor Dashboard</Link></li>
// //                 </>
// //               )}
// //               {!isMentor && (
// //                 <li><Link to="/patient-dashboard">Student Dashboard</Link></li>
// //               )}
// //             </ul>
// //           </li>

// //           <li onClick={() => handleMenuClick(1)} className={`menu-item ${activeIndex === 1 ? "active" : ""}`}>
// //             <Link>
// //               <div className="icon-item"><i className="fa fa-user-md"></i></div>
// //               <span>Mentor</span>
// //               <i className="fa fa-angle-down"></i>
// //             </Link>
// //             <ul className="submenu-list">
// //               <li><Link to="/all-doctors">All Mentor</Link></li>
// //               <li><Link to="/add-doctor">Add Mentor</Link></li>
// //               <li><Link to="/edit-doctor">Edit Mentor</Link></li>
// //             </ul>
// //           </li>

// //           <li onClick={() => handleMenuClick(2)} className={`menu-item ${activeIndex === 2 ? "active" : ""}`}>
// //             <Link>
// //               <div className="icon-item"><i className="fa fa-wheelchair" aria-hidden="true"></i></div>
// //               <span>Student</span>
// //               <i className="fa fa-angle-down"></i>
// //             </Link>
// //             <ul className="submenu-list">
// //               <li><Link to="/all-patients">All Student</Link></li>
// //               {userEmail !== "student@gmail.com" && userEmail !== "mentor@gmail.com" && (
// //                 <>
// //                   <li><Link to="/add-patient">Add Student</Link></li>
// //                   <li><Link to="/edit-patient">Edit Student</Link></li>
// //                 </>
// //               )}
// //             </ul>
// //           </li>

// //           <li onClick={() => handleMenuClick(3)} className={`menu-item ${activeIndex === 3 ? "active" : ""}`}>
// //             <Link>
// //               <div className="icon-item"><i className="fa fa-calendar"></i></div>
// //               <span>Appointments</span>
// //               <i className="fa fa-angle-down"></i>
// //             </Link>
// //             <ul className="submenu-list">
// //               <li><Link to="/doctor-schedule">Mentor Schedule</Link></li>
// //               <li><Link to="/add-appointment">Add Appointment</Link></li>
// //               <li><Link to="/edit-appointment">Edit Appointment</Link></li>
// //               <li><Link to="/appointment-list">View All Appointments</Link></li>
// //             </ul>
// //           </li>

// //           <li onClick={() => handleMenuClick(4)} className={`menu-item ${activeIndex === 4 ? "active" : ""}`}>
// //             <Link>
// //               <div className="icon-item"><FeatherIcon icon="file" /></div>
// //               <span>Billing</span>
// //               <i className="fa fa-angle-down"></i>
// //             </Link>
// //             <ul className="submenu-list">
// //               <li><Link to="/payment-list">Payment</Link></li>
// //               <li><Link to="/add-payment">Add Payment</Link></li>
// //               <li><Link to="/patient-invoice">Student Invoice</Link></li>
// //             </ul>
// //           </li>

// //           <li onClick={() => handleMenuClick(5)} className={`menu-item ${activeIndex === 5 ? "active" : ""}`}>
// //             <Link to="/event-management">
// //               <div className="icon-item"><FeatherIcon icon="list" /></div>
// //               <span>Event Management</span>
// //             </Link>
// //           </li>

// //           <li onClick={() => handleMenuClick(7)} className={`menu-item ${activeIndex === 7 ? "active" : ""}`}>
// //             <Link>
// //               <div className="icon-item"><i className="fa fa-life-ring"></i></div>
// //               <span>Support</span>
// //               <i className="fa fa-angle-down"></i>
// //             </Link>
// //             <ul className="submenu-list">
// //               <li><Link to="/faq">FAQ</Link></li>
// //               <li><Link to="/support">Help Center</Link></li>
// //             </ul>
// //           </li>
// //         </ul>
// //       </SimpleBar>
// //     </div>
// //   );
// // }

// // import React, { useEffect, useState } from 'react';
// // import { Link, useLocation } from "react-router-dom";
// // import SimpleBar from 'simplebar-react';
// // import FeatherIcon from 'feather-icons-react';
// // import { useSidebarContext } from '../pages/api/useSidebarContext';
// // import logo from '/src/assets/images/logo/icon-logo.png';
// // import logo1 from '/src/assets/images/logo/icon-logo.png';
// // import 'font-awesome/css/font-awesome.min.css';

// // const menuPaths = {
// //   Dashboards: ["/index", "/doctor-dashboard", "/patient-dashboard"],
// //   Mentor: ["/all-doctors", "/add-doctor", "/edit-doctor"],
// //   Student: ["/all-patients", "/add-patient", "/edit-patient"],
// //   Appointments: ["/doctor-schedule", "/add-appointment", "/edit-appointment", "/appointment-list"],
// //   Billing: ["/payment-list", "/add-payment", "/patient-invoice"],
// //   EventManagement: ["/event-management"],
// //   AccessPages: ["/login", "/register", "/forgot-password", "/new-password", "/verify-email", "/verify-pin", "/error-page"],
// //   Support: ["/faq", "/support"]
// // };

// // export default function Sidebar() {
// //   const location = useLocation();
// //   const [activeIndex, setActiveIndex] = useState(null);
// //   const [userEmail, setUserEmail] = useState(null);

// //   const accessPages = [
// //     "/login",
// //     "/register",
// //     "/forgot-password",
// //     "/new-password",
// //     "/verify-email",
// //     "/verify-pin",
// //     "/error-page"
// //   ];

// //   useEffect(() => {
// //     const email = localStorage.getItem("userEmail");
// //     setUserEmail(email);
// //   }, []);

// //   useEffect(() => {
// //     const currentPath = location.pathname;
// //     const category = Object.keys(menuPaths).find(key =>
// //       menuPaths[key].includes(currentPath)
// //     );
// //     const index = category ? Object.keys(menuPaths).indexOf(category) : null;
// //     setActiveIndex(index);
// //   }, [location.pathname]);

// //   const handleMenuClick = (index) => {
// //     setActiveIndex(prevIndex => (prevIndex === index ? null : index));
// //   };

// //   const { toggleSidebar } = useSidebarContext();
// //   const isMentor = userEmail === "mentor@gmail.com";

// //   if (accessPages.includes(location.pathname)) {
// //     return null;
// //   }

// //   return (
// //     <div className="codex-sidebar">
// //       <div className="logo-gridwrap">
// //         <Link className="lightlogo" to="/">
// //           <img className="img-fluid" src={logo} alt="sidebar-lightlogo" />
// //         </Link>
// //         <div className="sidebar-action" onClick={toggleSidebar}>
// //           <FeatherIcon icon="menu" />
// //         </div>
// //       </div>

// //       <div className="icon-logo">
// //         <Link className="lightlogo" to="/">
// //           <img className="img-fluid" src={logo1} alt="sidebar-lightlogo" />
// //         </Link>
// //       </div>

// //       <SimpleBar className="codex-menu custom-scroll">
// //         <ul>
// //           <li className="cdxmenu-title"><h5>main</h5></li>

// //           {/* Dashboard */}
// //           <li onClick={() => handleMenuClick(0)} className={`menu-item ${activeIndex === 0 ? "active" : ""}`}>
// //             <Link>
// //               <div className="icon-item"><FeatherIcon icon="home" /></div>
// //               <span>dashboard</span>
// //               <i className="fa fa-angle-down"></i>
// //             </Link>
// //             <ul className="submenu-list">
// //               {isMentor && (
// //                 <>
// //                   <li><Link to="/">Super Admin Dashboard</Link></li>
// //                   <li><Link to="/doctor-dashboard">Mentor Dashboard</Link></li>
// //                 </>
// //               )}
// //               {!isMentor && (
// //                 <li><Link to="/patient-dashboard">Student Dashboard</Link></li>
// //               )}
// //             </ul>
// //           </li>

// //           {/* Mentor */}
// //           <li onClick={() => handleMenuClick(1)} className={`menu-item ${activeIndex === 1 ? "active" : ""}`}>
// //             <Link>
// //               <div className="icon-item"><i className="fa fa-user-md"></i></div>
// //               <span>Mentor</span>
// //               <i className="fa fa-angle-down"></i>
// //             </Link>
// //             <ul className="submenu-list">
// //               <li><Link to="/all-doctors">All Mentor</Link></li>

// //                 <>
// //                   <li><Link to="/add-doctor">Add Mentor</Link></li>
// //                   <li><Link to="/edit-doctor">Edit Mentor</Link></li>
// //                 </>

// //             </ul>
// //           </li>

// //           {/* Student */}
// //           <li onClick={() => handleMenuClick(2)} className={`menu-item ${activeIndex === 2 ? "active" : ""}`}>
// //             <Link>
// //               <div className="icon-item"><i className="fa fa-wheelchair" aria-hidden="true"></i></div>
// //               <span>Student</span>
// //               <i className="fa fa-angle-down"></i>
// //             </Link>
// //             <ul className="submenu-list">
// //               <li><Link to="/all-patients">All Student</Link></li>
// //               {userEmail !== "student@gmail.com" && userEmail !== "mentor@gmail.com" && (
// //                 <>
// //                   <li><Link to="/add-patient">Add Student</Link></li>
// //                   <li><Link to="/edit-patient">Edit Student</Link></li>
// //                 </>
// //               )}
// //             </ul>
// //           </li>

// //           {/* Appointments */}
// //           <li onClick={() => handleMenuClick(3)} className={`menu-item ${activeIndex === 3 ? "active" : ""}`}>
// //             <Link>
// //               <div className="icon-item"><i className="fa fa-calendar"></i></div>
// //               <span>Appointments</span>
// //               <i className="fa fa-angle-down"></i>
// //             </Link>
// //             <ul className="submenu-list">
// //               <li><Link to="/doctor-schedule">Mentor Schedule</Link></li>
// //               <li><Link to="/add-appointment">Add Appointment</Link></li>
// //               <li><Link to="/edit-appointment">Edit Appointment</Link></li>
// //               <li><Link to="/appointment-list">View All Appointments</Link></li>
// //             </ul>
// //           </li>

// //           {/* Billing */}
// //           <li onClick={() => handleMenuClick(4)} className={`menu-item ${activeIndex === 4 ? "active" : ""}`}>
// //             <Link>
// //               <div className="icon-item"><FeatherIcon icon="file" /></div>
// //               <span>Billing</span>
// //               <i className="fa fa-angle-down"></i>
// //             </Link>
// //             <ul className="submenu-list">
// //               <li><Link to="/payment-list">Payment</Link></li>
// //               <li><Link to="/add-payment">Add Payment</Link></li>
// //               <li><Link to="/patient-invoice">Student Invoice</Link></li>
// //             </ul>
// //           </li>

// //           {/* Event Management */}
// //           <li onClick={() => handleMenuClick(5)} className={`menu-item ${activeIndex === 5 ? "active" : ""}`}>
// //             <Link to="/event-management">
// //               <div className="icon-item"><FeatherIcon icon="list" /></div>
// //               <span>Event Management</span>
// //             </Link>
// //           </li>

// //           {/* Support */}
// //           <li onClick={() => handleMenuClick(7)} className={`menu-item ${activeIndex === 7 ? "active" : ""}`}>
// //             <Link>
// //               <div className="icon-item"><i className="fa fa-life-ring"></i></div>
// //               <span>Support</span>
// //               <i className="fa fa-angle-down"></i>
// //             </Link>
// //             <ul className="submenu-list">
// //               <li><Link to="/faq">FAQ</Link></li>
// //               <li><Link to="/support">Help Center</Link></li>
// //             </ul>
// //           </li>
// //         </ul>
// //       </SimpleBar>
// //     </div>
// //   );
// // }

// // import React, { useEffect, useState } from 'react';
// // import { Link, useLocation } from "react-router-dom";
// // import SimpleBar from 'simplebar-react';
// // import FeatherIcon from 'feather-icons-react';
// // import { useSidebarContext } from '../pages/api/useSidebarContext';
// // import logo from '/src/assets/images/logo/icon-logo.png';
// // import logo1 from '/src/assets/images/logo/icon-logo.png';
// // import 'font-awesome/css/font-awesome.min.css';

// // const menuPaths = {
// //   Dashboards: ["/index", "/doctor-dashboard", "/patient-dashboard"],
// //   Mentor: ["/all-doctors", "/add-doctor", "/edit-doctor"],
// //   Student: ["/all-patients", "/add-patient", "/edit-patient"],
// //   Appointments: ["/doctor-schedule", "/add-appointment", "/edit-appointment", "/appointment-list"],
// //   Billing: ["/payment-list", "/add-payment", "/patient-invoice"],
// //   EventManagement: ["/event-management"],
// //   AccessPages: ["/login", "/register", "/forgot-password", "/new-password", "/verify-email", "/verify-pin", "/error-page"],
// //   Support: ["/faq", "/support"]
// // };

// // export default function Sidebar() {
// //   const location = useLocation();
// //   const [activeIndex, setActiveIndex] = useState(null);
// //   const [userEmail, setUserEmail] = useState(null);

// //   const accessPages = [
// //     "/login",
// //     "/register",
// //     "/forgot-password",
// //     "/new-password",
// //     "/verify-email",
// //     "/verify-pin",
// //     "/error-page"
// //   ];

// //   useEffect(() => {
// //     const email = localStorage.getItem("userEmail");
// //     setUserEmail(email);
// //   }, []);

// //   useEffect(() => {
// //     const currentPath = location.pathname;
// //     const category = Object.keys(menuPaths).find(key =>
// //       menuPaths[key].includes(currentPath)
// //     );
// //     const index = category ? Object.keys(menuPaths).indexOf(category) : null;
// //     setActiveIndex(index);
// //   }, [location.pathname]);

// //   const handleMenuClick = (index) => {
// //     setActiveIndex(prevIndex => (prevIndex === index ? null : index));
// //   };

// //   const { toggleSidebar } = useSidebarContext();
// //   const isMentor = userEmail === "mentor@gmail.com";
// //   const isStudent = userEmail === "student@gmail.com";

// //   // ✅ Hide sidebar on login/register/etc. and for student
// //   if (accessPages.includes(location.pathname) || isStudent) {
// //     return null;
// //   }

// //   return (
// //     <div className="codex-sidebar">
// //       <div className="logo-gridwrap">
// //         <Link className="lightlogo" to="/">
// //           <img className="img-fluid" src={logo} alt="sidebar-lightlogo" />
// //         </Link>
// //         <div className="sidebar-action" onClick={toggleSidebar}>
// //           <FeatherIcon icon="menu" />
// //         </div>
// //       </div>

// //       <div className="icon-logo">
// //         <Link className="lightlogo" to="/">
// //           <img className="img-fluid" src={logo1} alt="sidebar-lightlogo" />
// //         </Link>
// //       </div>

// //       <SimpleBar className="codex-menu custom-scroll">
// //         <ul>
// //           <li className="cdxmenu-title"><h5>main</h5></li>

// //           {/* Dashboard */}
// //           <li onClick={() => handleMenuClick(0)} className={`menu-item ${activeIndex === 0 ? "active" : ""}`}>
// //             <Link>
// //               <div className="icon-item"><FeatherIcon icon="home" /></div>
// //               <span>dashboard</span>
// //               <i className="fa fa-angle-down"></i>
// //             </Link>
// //             <ul className="submenu-list">
// //               {isMentor && (
// //                 <>
// //                   <li><Link to="/">Super Admin Dashboard</Link></li>
// //                   <li><Link to="/doctor-dashboard">Mentor Dashboard</Link></li>
// //                 </>
// //               )}
// //               {!isMentor && (
// //                 <li><Link to="/patient-dashboard">Student Dashboard</Link></li>
// //               )}
// //             </ul>
// //           </li>

// //           {/* Mentor */}
// //           <li onClick={() => handleMenuClick(1)} className={`menu-item ${activeIndex === 1 ? "active" : ""}`}>
// //             <Link>
// //               <div className="icon-item"><i className="fa fa-user-md"></i></div>
// //               <span>Mentor</span>
// //               <i className="fa fa-angle-down"></i>
// //             </Link>
// //             <ul className="submenu-list">
// //               <li><Link to="/all-doctors">All Mentor</Link></li>
// //               {userEmail !== "student@gmail.com" && (
// //                 <>
// //                   <li><Link to="/add-doctor">Add Mentor</Link></li>
// //                   <li><Link to="/edit-doctor">Edit Mentor</Link></li>
// //                 </>
// //               )}
// //             </ul>
// //           </li>

// //           {/* Student */}
// //           <li onClick={() => handleMenuClick(2)} className={`menu-item ${activeIndex === 2 ? "active" : ""}`}>
// //             <Link>
// //               <div className="icon-item"><i className="fa fa-wheelchair" aria-hidden="true"></i></div>
// //               <span>Student</span>
// //               <i className="fa fa-angle-down"></i>
// //             </Link>
// //             <ul className="submenu-list">
// //               <li><Link to="/all-patients">All Student</Link></li>
// //               {userEmail !== "student@gmail.com" && userEmail !== "mentor@gmail.com" && (
// //                 <>
// //                   <li><Link to="/add-patient">Add Student</Link></li>
// //                   <li><Link to="/edit-patient">Edit Student</Link></li>
// //                 </>
// //               )}
// //             </ul>
// //           </li>

// //           {/* Appointments */}
// //           <li onClick={() => handleMenuClick(3)} className={`menu-item ${activeIndex === 3 ? "active" : ""}`}>
// //             <Link>
// //               <div className="icon-item"><i className="fa fa-calendar"></i></div>
// //               <span>Appointments</span>
// //               <i className="fa fa-angle-down"></i>
// //             </Link>
// //             <ul className="submenu-list">
// //               <li><Link to="/doctor-schedule">Mentor Schedule</Link></li>
// //               <li><Link to="/add-appointment">Add Appointment</Link></li>
// //               <li><Link to="/edit-appointment">Edit Appointment</Link></li>
// //               <li><Link to="/appointment-list">View All Appointments</Link></li>
// //             </ul>
// //           </li>

// //           {/* Billing */}
// //           <li onClick={() => handleMenuClick(4)} className={`menu-item ${activeIndex === 4 ? "active" : ""}`}>
// //             <Link>
// //               <div className="icon-item"><FeatherIcon icon="file" /></div>
// //               <span>Billing</span>
// //               <i className="fa fa-angle-down"></i>
// //             </Link>
// //             <ul className="submenu-list">
// //               <li><Link to="/payment-list">Payment</Link></li>
// //               <li><Link to="/add-payment">Add Payment</Link></li>
// //               <li><Link to="/patient-invoice">Student Invoice</Link></li>
// //             </ul>
// //           </li>

// //           {/* Event Management */}
// //           <li onClick={() => handleMenuClick(5)} className={`menu-item ${activeIndex === 5 ? "active" : ""}`}>
// //             <Link to="/event-management">
// //               <div className="icon-item"><FeatherIcon icon="list" /></div>
// //               <span>Event Management</span>
// //             </Link>
// //           </li>

// //           {/* Support */}
// //           <li onClick={() => handleMenuClick(7)} className={`menu-item ${activeIndex === 7 ? "active" : ""}`}>
// //             <Link>
// //               <div className="icon-item"><i className="fa fa-life-ring"></i></div>
// //               <span>Support</span>
// //               <i className="fa fa-angle-down"></i>
// //             </Link>
// //             <ul className="submenu-list">
// //               <li><Link to="/faq">FAQ</Link></li>
// //               <li><Link to="/support">Help Center</Link></li>
// //             </ul>
// //           </li>
// //         </ul>
// //       </SimpleBar>
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from "react-router-dom";
// import SimpleBar from 'simplebar-react';
// import FeatherIcon from 'feather-icons-react';
// import { useSidebarContext } from '../pages/api/useSidebarContext';
// import logo from '/src/assets/images/logo/icon-logo.png';
// import logo1 from '/src/assets/images/logo/icon-logo.png';
// import 'font-awesome/css/font-awesome.min.css';

// const menuPaths = {
//   Dashboards: ["/index", "/doctor-dashboard", "/patient-dashboard"],
//   Mentor: ["/all-doctors", "/add-doctor", "/edit-doctor"],
//   Student: ["/all-patients", "/add-patient", "/edit-patient"],
//   Appointments: ["/doctor-schedule", "/add-appointment", "/edit-appointment", "/appointment-list"],
//   Billing: ["/payment-list", "/add-payment", "/patient-invoice"],
//   EventManagement: ["/event-management"],
//   AccessPages: ["/login", "/register", "/forgot-password", "/new-password", "/verify-email", "/verify-pin", "/error-page"],
//   Support: ["/faq", "/support"]
// };

// export default function Sidebar() {
//   const location = useLocation();
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [userEmail, setUserEmail] = useState(null);

//   const accessPages = [
//     "/login",
//     "/register",
//     "/forgot-password",
//     "/new-password",
//     "/verify-email",
//     "/verify-pin",
//     "/error-page"
//   ];

//   useEffect(() => {
//     const email = localStorage.getItem("userEmail");
//     setUserEmail(email);
//   }, []);

//   useEffect(() => {
//     const currentPath = location.pathname;
//     const category = Object.keys(menuPaths).find(key =>
//       menuPaths[key].includes(currentPath)
//     );
//     const index = category ? Object.keys(menuPaths).indexOf(category) : null;
//     setActiveIndex(index);
//   }, [location.pathname]);

//   const handleMenuClick = (index) => {
//     setActiveIndex(prevIndex => (prevIndex === index ? null : index));
//   };

//   const { toggleSidebar } = useSidebarContext();
//   const isMentor = userEmail === "mentor@gmail.com";
//   const isStudent = userEmail === "student@gmail.com";
//   const isAdmin = userEmail === "admin@gmail.com";

//   // ✅ Hide sidebar on login/register/etc. and for student
//   if (accessPages.includes(location.pathname) || isStudent) {
//     return null;
//   }

//   return (
//     <div className="codex-sidebar">
//       <div className="logo-gridwrap">
//         <Link className="lightlogo" to="/">
//           <img className="img-fluid" src={logo} alt="sidebar-lightlogo" />
//         </Link>
//         <div className="sidebar-action" onClick={toggleSidebar}>
//           <FeatherIcon icon="menu" />
//         </div>
//       </div>

//       <div className="icon-logo">
//         <Link className="lightlogo" to="/">
//           <img className="img-fluid" src={logo1} alt="sidebar-lightlogo" />
//         </Link>
//       </div>

//       <SimpleBar className="codex-menu custom-scroll">
//         <ul>
//           <li className="cdxmenu-title"><h5>main</h5></li>

//           {/* Dashboard */}
//           <li onClick={() => handleMenuClick(0)} className={`menu-item ${activeIndex === 0 ? "active" : ""}`}>
//             <Link>
//               <div className="icon-item"><FeatherIcon icon="home" /></div>
//               <span>dashboard</span>
//               <i className="fa fa-angle-down"></i>
//             </Link>
//             <ul className="submenu-list">
//               {isMentor && (
//                 <>
//                   <li><Link to="/">Super Admin Dashboard</Link></li>
//                   <li><Link to="/doctor-dashboard">Mentor Dashboard</Link></li>
//                 </>
//               )}
//               {!isMentor && (
//                 <li><Link to="/patient-dashboard">Student Dashboard</Link></li>
//               )}
//             </ul>
//           </li>

//           {/* Mentor */}
//           <li onClick={() => handleMenuClick(1)} className={`menu-item ${activeIndex === 1 ? "active" : ""}`}>
//             <Link>
//               <div className="icon-item"><i className="fa fa-user-md"></i></div>
//               <span>Mentor</span>
//               <i className="fa fa-angle-down"></i>
//             </Link>
//             <ul className="submenu-list">
//               <li><Link to="/all-doctors">All Mentor</Link></li>

//               {isAdmin && (
//                 <>
//                   <li><Link to="/add-doctor">Add Mentor</Link></li>
//                   <li><Link to="/edit-doctor">Edit Mentor</Link></li>
//                 </>
//               )}
//             </ul>
//           </li>

//           {/* Student */}
//           <li onClick={() => handleMenuClick(2)} className={`menu-item ${activeIndex === 2 ? "active" : ""}`}>
//             <Link>
//               <div className="icon-item"><i className="fa fa-wheelchair" aria-hidden="true"></i></div>
//               <span>Student</span>
//               <i className="fa fa-angle-down"></i>
//             </Link>
//             <ul className="submenu-list">
//               <li><Link to="/all-patients">All Student</Link></li>

//               {isAdmin && (
//                 <>
//                   <li><Link to="/add-patient">Add Student</Link></li>
//                   <li><Link to="/edit-patient">Edit Student</Link></li>
//                 </>
//               )}
//             </ul>
//           </li>

//           {/* Appointments */}
//           <li onClick={() => handleMenuClick(3)} className={`menu-item ${activeIndex === 3 ? "active" : ""}`}>
//             <Link>
//               <div className="icon-item"><i className="fa fa-calendar"></i></div>
//               <span>Appointments</span>
//               <i className="fa fa-angle-down"></i>
//             </Link>
//             <ul className="submenu-list">
//               <li><Link to="/doctor-schedule">Mentor Schedule</Link></li>
//               <li><Link to="/add-appointment">Add Appointment</Link></li>
//               <li><Link to="/edit-appointment">Edit Appointment</Link></li>
//               <li><Link to="/appointment-list">View All Appointments</Link></li>
//             </ul>
//           </li>

//           {/* Billing */}
//           <li onClick={() => handleMenuClick(4)} className={`menu-item ${activeIndex === 4 ? "active" : ""}`}>
//             <Link>
//               <div className="icon-item"><FeatherIcon icon="file" /></div>
//               <span>Billing</span>
//               <i className="fa fa-angle-down"></i>
//             </Link>
//             <ul className="submenu-list">
//               <li><Link to="/payment-list">Payment</Link></li>
//               <li><Link to="/add-payment">Add Payment</Link></li>
//               <li><Link to="/patient-invoice">Student Invoice</Link></li>
//             </ul>
//           </li>

//           {/* Event Management */}
//           <li onClick={() => handleMenuClick(5)} className={`menu-item ${activeIndex === 5 ? "active" : ""}`}>
//             <Link to="/event-management">
//               <div className="icon-item"><FeatherIcon icon="list" /></div>
//               <span>Event Management</span>
//             </Link>
//           </li>

//           {/* Support */}
//           <li onClick={() => handleMenuClick(7)} className={`menu-item ${activeIndex === 7 ? "active" : ""}`}>
//             <Link>
//               <div className="icon-item"><i className="fa fa-life-ring"></i></div>
//               <span>Support</span>
//               <i className="fa fa-angle-down"></i>
//             </Link>
//             <ul className="submenu-list">
//               <li><Link to="/faq">FAQ</Link></li>
//               <li><Link to="/support">Help Center</Link></li>
//             </ul>
//           </li>
//         </ul>
//       </SimpleBar>
//     </div>
//   );
// }

// // import React, { useEffect, useState } from 'react';
// // import { Link, useLocation } from "react-router-dom";
// // import SimpleBar from 'simplebar-react';
// // import FeatherIcon from 'feather-icons-react';
// // import { useSidebarContext } from '../pages/api/useSidebarContext';
// // import logo from '/src/assets/images/logo/icon-logo.png';
// // import logo1 from '/src/assets/images/logo/icon-logo.png';
// // import 'font-awesome/css/font-awesome.min.css';

// // const menuPaths = {
// //   Dashboards: ["/index", "/doctor-dashboard", "/patient-dashboard"],
// //   Mentor: ["/all-doctors", "/add-doctor", "/edit-doctor"],
// //   Student: ["/all-patients", "/add-patient", "/edit-patient"],
// //   Appointments: ["/doctor-schedule", "/add-appointment", "/edit-appointment", "/appointment-list"],
// //   Billing: ["/payment-list", "/add-payment", "/patient-invoice"],
// //   EventManagement: ["/event-management"],
// //   AccessPages: ["/login", "/register", "/forgot-password", "/new-password", "/verify-email", "/verify-pin", "/error-page"],
// //   Support: ["/faq", "/support"]
// // };

// // export default function Sidebar() {
// //   const location = useLocation();
// //   const [activeIndex, setActiveIndex] = useState(null);
// //   const [userEmail, setUserEmail] = useState(null);

// //   const accessPages = [
// //     "/login",
// //     "/register",
// //     "/forgot-password",
// //     "/new-password",
// //     "/verify-email",
// //     "/verify-pin",
// //     "/error-page"
// //   ];

// //   useEffect(() => {
// //     const email = localStorage.getItem("userEmail");
// //     setUserEmail(email);
// //   }, []);

// //   useEffect(() => {
// //     const currentPath = location.pathname;
// //     const category = Object.keys(menuPaths).find(key =>
// //       menuPaths[key].includes(currentPath)
// //     );
// //     const index = category ? Object.keys(menuPaths).indexOf(category) : null;
// //     setActiveIndex(index);
// //   }, [location.pathname]);

// //   const handleMenuClick = (index) => {
// //     setActiveIndex(prevIndex => (prevIndex === index ? null : index));
// //   };

// //   const { toggleSidebar } = useSidebarContext();
// //   const isMentor = userEmail === "mentor@gmail.com";
// //   const isStudent = userEmail === "student@gmail.com";
// //   const isAdmin = userEmail === "admin@gmail.com";

// //   // ✅ Hide sidebar on login/register/etc. and for student
// //   if (accessPages.includes(location.pathname) || isStudent) {
// //     return null;
// //   }

// //   return (
// //     <div className="codex-sidebar">
// //       <div className="logo-gridwrap">
// //         <Link className="lightlogo" to="/">
// //           <img className="img-fluid" src={logo} alt="sidebar-lightlogo" />
// //         </Link>
// //         <div className="sidebar-action" onClick={toggleSidebar}>
// //           <FeatherIcon icon="menu" />
// //         </div>
// //       </div>

// //       <div className="icon-logo">
// //         <Link className="lightlogo" to="/">
// //           <img className="img-fluid" src={logo1} alt="sidebar-lightlogo" />
// //         </Link>
// //       </div>

// //       <SimpleBar className="codex-menu custom-scroll">
// //         <ul>
// //           <li className="cdxmenu-title"><h5>main</h5></li>

// //           {/* Dashboard */}
// //           <li onClick={() => handleMenuClick(0)} className={`menu-item ${activeIndex === 0 ? "active" : ""}`}>
// //             <Link>
// //               <div className="icon-item"><FeatherIcon icon="home" /></div>
// //               <span>dashboard</span>
// //               <i className="fa fa-angle-down"></i>
// //             </Link>
// //             <ul className="submenu-list">
// //               {isMentor && (
// //                 <>
// //                   <li><Link to="/">Super Admin Dashboard</Link></li>
// //                   <li><Link to="/doctor-dashboard">Mentor Dashboard</Link></li>
// //                 </>
// //               )}
// //               {!isMentor && (
// //                 <li><Link to="/patient-dashboard">Student Dashboard</Link></li>
// //               )}
// //             </ul>
// //           </li>

// //           {/* Mentor */}
// //           <li onClick={() => handleMenuClick(1)} className={`menu-item ${activeIndex === 1 ? "active" : ""}`}>
// //             <Link>
// //               <div className="icon-item"><i className="fa fa-user-md"></i></div>
// //               <span>Mentor</span>
// //               <i className="fa fa-angle-down"></i>
// //             </Link>
// //             <ul className="submenu-list">
// //               <li><Link to="/all-doctors">All Mentor</Link></li>

// //               <li><Link to="/add-doctor">Add Mentor</Link></li>
// //                   <li><Link to="/edit-doctor">Edit Mentor</Link></li>

// //             </ul>
// //           </li>

// //           {/* Student */}
// //           <li onClick={() => handleMenuClick(2)} className={`menu-item ${activeIndex === 2 ? "active" : ""}`}>
// //             <Link>
// //               <div className="icon-item"><i className="fa fa-wheelchair" aria-hidden="true"></i></div>
// //               <span>Student</span>
// //               <i className="fa fa-angle-down"></i>
// //             </Link>
// //             <ul className="submenu-list">
// //               <li><Link to="/all-patients">All Student</Link></li>

// //                   <li><Link to="/add-patient">Add Student</Link></li>
// //                   <li><Link to="/edit-patient">Edit Student</Link></li>

// //             </ul>
// //           </li>

// //           {/* Appointments */}
// //           <li onClick={() => handleMenuClick(3)} className={`menu-item ${activeIndex === 3 ? "active" : ""}`}>
// //             <Link>
// //               <div className="icon-item"><i className="fa fa-calendar"></i></div>
// //               <span>Appointments</span>
// //               <i className="fa fa-angle-down"></i>
// //             </Link>
// //             <ul className="submenu-list">
// //               <li><Link to="/doctor-schedule">Mentor Schedule</Link></li>
// //               <li><Link to="/add-appointment">Add Appointment</Link></li>
// //               <li><Link to="/edit-appointment">Edit Appointment</Link></li>
// //               <li><Link to="/appointment-list">View All Appointments</Link></li>
// //             </ul>
// //           </li>

// //           {/* Billing */}
// //           <li onClick={() => handleMenuClick(4)} className={`menu-item ${activeIndex === 4 ? "active" : ""}`}>
// //             <Link>
// //               <div className="icon-item"><FeatherIcon icon="file" /></div>
// //               <span>Billing</span>
// //               <i className="fa fa-angle-down"></i>
// //             </Link>
// //             <ul className="submenu-list">
// //               <li><Link to="/payment-list">Payment</Link></li>
// //               <li><Link to="/add-payment">Add Payment</Link></li>
// //               <li><Link to="/patient-invoice">Student Invoice</Link></li>
// //             </ul>
// //           </li>

// //           {/* Event Management */}
// //           <li onClick={() => handleMenuClick(5)} className={`menu-item ${activeIndex === 5 ? "active" : ""}`}>
// //             <Link to="/event-management">
// //               <div className="icon-item"><FeatherIcon icon="list" /></div>
// //               <span>Event Management</span>
// //             </Link>
// //           </li>

// //           {/* Support */}
// //           <li onClick={() => handleMenuClick(7)} className={`menu-item ${activeIndex === 7 ? "active" : ""}`}>
// //             <Link>
// //               <div className="icon-item"><i className="fa fa-life-ring"></i></div>
// //               <span>Support</span>
// //               <i className="fa fa-angle-down"></i>
// //             </Link>
// //             <ul className="submenu-list">
// //               <li><Link to="/faq">FAQ</Link></li>
// //               <li><Link to="/support">Help Center</Link></li>
// //             </ul>
// //           </li>
// //         </ul>
// //       </SimpleBar>
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from "react-router-dom";
// import SimpleBar from 'simplebar-react';
// import FeatherIcon from 'feather-icons-react';
// import { useSidebarContext } from '../pages/api/useSidebarContext';
// import logo from '/src/assets/images/logo/icon-logo.png';
// import logo1 from '/src/assets/images/logo/icon-logo.png';
// import 'font-awesome/css/font-awesome.min.css';

// const menuPaths = {
//   Dashboards: ["/index", "/doctor-dashboard", "/patient-dashboard"],
//   Mentor: ["/all-doctors", "/add-doctor", "/edit-doctor"],
//   Student: ["/all-patients", "/add-patient", "/edit-patient"],
//   Appointments: ["/doctor-schedule", "/add-appointment", "/edit-appointment", "/appointment-list"],
//   Billing: ["/payment-list", "/add-payment", "/patient-invoice"],
//   EventManagement: ["/event-management"],
//   AccessPages: ["/login", "/register", "/forgot-password", "/new-password", "/verify-email", "/verify-pin", "/error-page"],
//   Support: ["/faq", "/support"]
// };

// export default function Sidebar() {
//   const location = useLocation();
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [userEmail, setUserEmail] = useState(null);

//   const accessPages = menuPaths.AccessPages;

//   useEffect(() => {
//     const email = localStorage.getItem("userEmail");
//     setUserEmail(email);
//   }, []);

//   useEffect(() => {
//     const currentPath = location.pathname;
//     const category = Object.keys(menuPaths).find(key =>
//       menuPaths[key].includes(currentPath)
//     );
//     const index = category ? Object.keys(menuPaths).indexOf(category) : null;
//     setActiveIndex(index);
//   }, [location.pathname]);

//   const handleMenuClick = (index) => {
//     setActiveIndex(prevIndex => (prevIndex === index ? null : index));
//   };

//   const { toggleSidebar } = useSidebarContext();
//   const isMentor = userEmail === "mentor@gmail.com";
//   const isStudent = userEmail === "student@gmail.com";
//   const isAdmin = userEmail === "admin@gmail.com";

//   // ✅ Hide sidebar on login/register/etc. and for student
//   if (accessPages.includes(location.pathname) || isStudent || isMentor || isAdmin  ) {
//     return null;
//   }

//   return (
//     <div className="codex-sidebar">
//       <div className="logo-gridwrap">
//         <Link className="lightlogo" to="/">
//           <img className="img-fluid" src={logo} alt="sidebar-lightlogo" />
//         </Link>
//         <div className="sidebar-action" onClick={toggleSidebar}>
//           <FeatherIcon icon="menu" />
//         </div>
//       </div>

//       <div className="icon-logo">
//         <Link className="lightlogo" to="/">
//           <img className="img-fluid" src={logo1} alt="sidebar-lightlogo" />
//         </Link>
//       </div>

//       <SimpleBar className="codex-menu custom-scroll">
//         <ul>
//           <li className="cdxmenu-title"><h5>main</h5></li>

//           {/* Dashboard */}
//           <li onClick={() => handleMenuClick(0)} className={`menu-item ${activeIndex === 0 ? "active" : ""}`}>
//             <Link>
//               <div className="icon-item"><FeatherIcon icon="home" /></div>
//               <span>dashboard</span>
//               <i className="fa fa-angle-down"></i>
//             </Link>
//             <ul className="submenu-list">
//               {isMentor && (
//                 <>
//                   <li><Link to="/">Super Admin Dashboard</Link></li>
//                   <li><Link to="/doctor-dashboard">Mentor Dashboard</Link></li>
//                 </>
//               )}
//               {!isMentor && (
//                 <li><Link to="/patient-dashboard">Student Dashboard</Link></li>
//               )}
//             </ul>
//           </li>

//           {/* Mentor */}
//           <li onClick={() => handleMenuClick(1)} className={`menu-item ${activeIndex === 1 ? "active" : ""}`}>
//             <Link>
//               <div className="icon-item"><i className="fa fa-user-md"></i></div>
//               <span>Mentor</span>
//               <i className="fa fa-angle-down"></i>
//             </Link>
//             <ul className="submenu-list">
//               <li><Link to="/all-doctors">All Mentor</Link></li>
//                {isAdmin && (
//                 <>
//               <li><Link to="/add-doctor">Add Mentor</Link></li>
//               <li><Link to="/edit-doctor">Edit Mentor</Link></li>

//                  </>
//               )}
//             </ul>
//           </li>

//           {/* Student */}
//           <li onClick={() => handleMenuClick(2)} className={`menu-item ${activeIndex === 2 ? "active" : ""}`}>
//             <Link>
//               <div className="icon-item"><i className="fa fa-wheelchair" aria-hidden="true"></i></div>
//               <span>Student</span>
//               <i className="fa fa-angle-down"></i>
//             </Link>
//             <ul className="submenu-list">
//               <li><Link to="/all-patients">All Student</Link></li>

//               {/* ✅ Show only if user is admin */}
//               {isAdmin && (
//                 <>
//                   <li><Link to="/add-patient">Add Student</Link></li>
//                   <li><Link to="/edit-patient">Edit Student</Link></li>
//                 </>
//               )}
//             </ul>
//           </li>

//           {/* Appointments */}
//           <li onClick={() => handleMenuClick(3)} className={`menu-item ${activeIndex === 3 ? "active" : ""}`}>
//             <Link>
//               <div className="icon-item"><i className="fa fa-calendar"></i></div>
//               <span>Appointments</span>
//               <i className="fa fa-angle-down"></i>
//             </Link>
//             <ul className="submenu-list">
//               <li><Link to="/doctor-schedule">Mentor Schedule</Link></li>
//               <li><Link to="/add-appointment">Add Appointment</Link></li>
//               <li><Link to="/edit-appointment">Edit Appointment</Link></li>
//               <li><Link to="/appointment-list">View All Appointments</Link></li>
//             </ul>
//           </li>

//           {/* Billing */}
//           <li onClick={() => handleMenuClick(4)} className={`menu-item ${activeIndex === 4 ? "active" : ""}`}>
//             <Link>
//               <div className="icon-item"><FeatherIcon icon="file" /></div>
//               <span>Billing</span>
//               <i className="fa fa-angle-down"></i>
//             </Link>
//             <ul className="submenu-list">
//               <li><Link to="/payment-list">Payment</Link></li>
//               <li><Link to="/add-payment">Add Payment</Link></li>
//               <li><Link to="/patient-invoice">Student Invoice</Link></li>
//             </ul>
//           </li>

//           {/* Event Management */}
//           <li onClick={() => handleMenuClick(5)} className={`menu-item ${activeIndex === 5 ? "active" : ""}`}>
//             <Link to="/event-management">
//               <div className="icon-item"><FeatherIcon icon="list" /></div>
//               <span>Event Management</span>
//             </Link>
//           </li>

//           {/* Support */}
//           <li onClick={() => handleMenuClick(7)} className={`menu-item ${activeIndex === 7 ? "active" : ""}`}>
//             <Link>
//               <div className="icon-item"><i className="fa fa-life-ring"></i></div>
//               <span>Support</span>
//               <i className="fa fa-angle-down"></i>
//             </Link>
//             <ul className="submenu-list">
//               <li><Link to="/faq">FAQ</Link></li>
//               <li><Link to="/support">Help Center</Link></li>
//             </ul>
//           </li>
//         </ul>
//       </SimpleBar>
//     </div>
//   );
// }

// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from "react-router-dom";
// import SimpleBar from 'simplebar-react';
// import FeatherIcon from 'feather-icons-react';
// import { useSidebarContext } from '../pages/api/useSidebarContext';
// import logo from '/src/assets/images/logo/icon-logo.png';
// import logo1 from '/src/assets/images/logo/icon-logo.png';
// import sidebarvactor from '/src/assets/images/pro-sec.png';

// import 'font-awesome/css/font-awesome.min.css';

// const menuPaths = {
//     Dashboards: ["/index", "/doctor-dashboard", "/patient-dashboard"],
// };

// export default function Sidebar() {
//     const location = useLocation();
//     const [activeIndex, setActiveIndex] = useState(null);
//     const { toggleSidebar } = useSidebarContext();

//     // Get user email from localStorage
//     const userEmail = localStorage.getItem('email'); // Adjust key name as per your storage

//     useEffect(() => {
//         const currentPath = location.pathname;
//         const category = Object.keys(menuPaths).find(key => menuPaths[key].includes(currentPath));
//         const index = category ? Object.keys(menuPaths).indexOf(category) : null;
//         setActiveIndex(index);
//     }, [location.pathname]);

//     const handleMenuClick = (index) => {
//         setActiveIndex(prevIndex => (prevIndex === index ? null : index));
//     };

//     return (
//         <div className="codex-sidebar">
//             <div className="logo-gridwrap">
//                 <Link className="lightlogo" to="/">
//                     <img className="img-fluid" src={logo} alt="sidebar-lightlogo" />
//                 </Link>
//                 <div className="sidebar-action" onClick={toggleSidebar}>
//                     <FeatherIcon icon="menu" />
//                 </div>
//             </div>

//             <div className="icon-logo">
//                 <Link className="lightlogo" to="/">
//                     <img className="img-fluid" src={logo1} alt="sidebar-lightlogo" />
//                 </Link>
//             </div>

//             <SimpleBar className="codex-menu custom-scroll">
//                 <ul className="">
//                     <li className="cdxmenu-title">
//                         <h5>Main</h5>
//                     </li>

//                     <li onClick={() => handleMenuClick(0)} className={`menu-item ${activeIndex === 0 ? 'active' : ''}`}>
//                         <Link>
//                             <div className="icon-item">
//                                 <FeatherIcon icon="home" />
//                             </div>
//                             <span>Dashboard</span>
//                             <i className="fa fa-angle-down"></i>
//                         </Link>
//                         <ul className="submenu-list">
//                             <li>
//                                 <Link to="/">Super Admin Dashboard</Link>
//                             </li>

//                             {/* Show only for mentor */}
//                             {userEmail === 'mentor@gmail.com' && (
//                                 <li>
//                                     <Link to="/doctor-dashboard">Mentor Dashboard</Link>
//                                 </li>
//                             )}

//                             {/* Show only for student */}
//                             {userEmail === 'student@gmail.com' && (
//                                 <li>
//                                     <Link to="/patient-dashboard">Student Dashboard</Link>
//                                 </li>
//                             )}
//                         </ul>
//                     </li>
//                 </ul>
//             </SimpleBar>
//         </div>
//     );
// }

// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from "react-router-dom";
// import SimpleBar from 'simplebar-react';
// import FeatherIcon from 'feather-icons-react';
// import { useSidebarContext } from '../pages/api/useSidebarContext';
// import logo from '/src/assets/images/logo/icon-logo.png';
// import logo1 from '/src/assets/images/logo/icon-logo.png';
// import 'font-awesome/css/font-awesome.min.css';

// const menuPaths = {
//   Dashboards: ["/index", "/doctor-dashboard", "/patient-dashboard"],
//   Mentor: ["/all-doctors", "/add-doctor", "/edit-doctor"],
//   Student: ["/all-patients", "/add-patient", "/edit-patient"],
//   Appointments: ["/doctor-schedule", "/add-appointment", "/edit-appointment", "/appointment-list"],
//   Billing: ["/payment-list", "/add-payment", "/patient-invoice"],
//   EventManagement: ["/event-management"],
//   AccessPages: ["/login", "/register", "/forgot-password", "/new-password", "/verify-email", "/verify-pin", "/error-page"],
//   Support: ["/faq", "/support"]
// };

// export default function Sidebar() {
//   const location = useLocation();
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [userEmail, setUserEmail] = useState(null);

//   const accessPages = menuPaths.AccessPages;

//   const { toggleSidebar } = useSidebarContext();

//   useEffect(() => {

//       const email = localStorage.getItem('loggedInEmail');
//     console.log("Logged-in Email:", email);
//     setUserEmail(email);
//   }, []);

//   useEffect(() => {
//     const currentPath = location.pathname;
//     const category = Object.keys(menuPaths).find(key =>
//       menuPaths[key].includes(currentPath)
//     );
//     const index = category ? Object.keys(menuPaths).indexOf(category) : null;
//     setActiveIndex(index);
//   }, [location.pathname]);

//   const handleMenuClick = (index) => {
//     setActiveIndex(prevIndex => (prevIndex === index ? null : index));
//   };

//   const isMentor = userEmail === "mentor@gmail.com";
//   const isStudent = userEmail === "student@gmail.com";
//   const isAdmin = userEmail === "admin@gmail.com";

//   if (userEmail === null) {
//     return null;
//   }

//   return (
//     <div className="codex-sidebar">
//       <div className="logo-gridwrap">
//         <Link className="lightlogo" to="/">
//           <img className="img-fluid" src={logo} alt="sidebar-lightlogo" />
//         </Link>
//         <div className="sidebar-action" onClick={toggleSidebar}>
//           <FeatherIcon icon="menu" />
//         </div>
//       </div>

//       <div className="icon-logo">
//         <Link className="lightlogo" to="/">
//           <img className="img-fluid" src={logo1} alt="sidebar-lightlogo" />
//         </Link>
//       </div>

//       <SimpleBar className="codex-menu custom-scroll">
//         <ul>
//           <li className="cdxmenu-title"><h5>main</h5></li>

//           <li onClick={() => handleMenuClick(0)} className={`menu-item ${activeIndex === 0 ? "active" : ""}`}>
//             <Link>
//               <div className="icon-item"><FeatherIcon icon="home" /></div>
//               <span>dashboard</span>
//               <i className="fa fa-angle-down"></i>
//             </Link>
//             <ul className="submenu-list">

//      {isAdmin && (
//     <>
//       <li><Link to="/">Super Admin Dashboard</Link></li>
//       <li><Link to="/doctor-dashboard">Mentor Dashboard</Link></li>
//       <li><Link to="/patient-dashboard">Student Dashboard</Link></li>
//     </>
//   )}

//   {isMentor && !isAdmin && (
//     <li><Link to="/doctor-dashboard">Mentor Dashboard</Link></li>
//   )}

//   {isStudent && !isAdmin && (
//     <li><Link to="/patient-dashboard">Student Dashboard</Link></li>
//   )}
//             </ul>
//           </li>

//           {/* Mentor */}
//           <li onClick={() => handleMenuClick(1)} className={`menu-item ${activeIndex === 1 ? "active" : ""}`}>
//             <Link>
//               <div className="icon-item"><i className="fa fa-user-md"></i></div>
//               <span>Mentor</span>
//               <i className="fa fa-angle-down"></i>
//             </Link>
//             <ul className="submenu-list">
//               <li><Link to="/all-doctors">All Mentor</Link></li>
//               {isAdmin && (
//                 <>
//                   <li><Link to="/add-doctor">Add Mentor</Link></li>
//                   <li><Link to="/edit-doctor">Edit Mentor</Link></li>
//                 </>
//               )}
//             </ul>
//           </li>

//           {/* Student */}
//           <li onClick={() => handleMenuClick(2)} className={`menu-item ${activeIndex === 2 ? "active" : ""}`}>
//             <Link>
//               <div className="icon-item"><i className="fa fa-wheelchair" aria-hidden="true"></i></div>
//               {/* <span>Student</span> */}
//               {isAdmin && <span>Student</span>  }
//                 {isMentor && <span>My Profile</span>  }
//                   {isStudent && <span>My Profile</span>  }

//               <i className="fa fa-angle-down"></i>
//             </Link>
//             <ul className="submenu-list">

//                 {isAdmin && <li><Link to="/all-patients">All Student</Link></li>}
//                 {isMentor && <li><Link to="/all-patients">Profile</Link></li>}
//                 {isStudent && <li><Link to="/all-patients">Profile</Link></li> }

//         {isStudent &&  <li><Link to="/edit-patient">Edit Profile</Link></li>}
//             {isMentor &&  <li><Link to="/edit-patient">Edit Profile</Link></li>}
//               {isAdmin && (
//                 <>
//                   <li><Link to="/add-patient">Add Student</Link></li>

//                   <li><Link to="/edit-patient">Edit Student</Link></li>
//                 </>
//               )}
//             </ul>
//           </li>

//           {/* Appointments */}
//           <li onClick={() => handleMenuClick(3)} className={`menu-item ${activeIndex === 3 ? "active" : ""}`}>
//             <Link>
//               <div className="icon-item"><i className="fa fa-calendar"></i></div>
//               <span>Appointments</span>
//               <i className="fa fa-angle-down"></i>
//             </Link>
//             <ul className="submenu-list">
//               <li><Link to="/doctor-schedule">Mentor Schedule</Link></li>
//               <li><Link to="/add-appointment">Add Appointment</Link></li>
//               <li><Link to="/edit-appointment">Edit Appointment</Link></li>

//             {isAdmin && <li><Link to="/appointment-list">View All Appointments</Link></li>}

//             {isMentor &&   <li><Link to="/appointment-list">My Appointments</Link></li>}
//             {isStudent &&   <li><Link to="/appointment-list">My Appointments</Link></li>}

//             </ul>
//           </li>

//           {/* Billing */}
//           <li onClick={() => handleMenuClick(4)} className={`menu-item ${activeIndex === 4 ? "active" : ""}`}>
//             <Link>
//               <div className="icon-item"><FeatherIcon icon="file" /></div>
//               <span>Billing</span>
//               <i className="fa fa-angle-down"></i>
//             </Link>
//             <ul className="submenu-list">
//               <li><Link to="/payment-list">Payment</Link></li>
//               <li><Link to="/add-payment">Add Payment</Link></li>

//             {isAdmin &&  <li><Link to="/patient-invoice">Student Invoice</Link></li>}
//             {isStudent &&  <li><Link to="/patient-invoice">My Invoice</Link></li>}
//             {isMentor &&  <li><Link to="/patient-invoice">My Invoice</Link></li>}

//             </ul>
//           </li>

//           {/* Event Management */}
//           <li onClick={() => handleMenuClick(5)} className={`menu-item ${activeIndex === 5 ? "active" : ""}`}>
//             <Link to="/event-management">
//               <div className="icon-item"><FeatherIcon icon="list" /></div>
//               <span>Event Management</span>
//             </Link>
//           </li>

//           {/* Support */}
//           <li onClick={() => handleMenuClick(7)} className={`menu-item ${activeIndex === 7 ? "active" : ""}`}>
//             <Link>
//               <div className="icon-item"><i className="fa fa-life-ring"></i></div>
//               <span>Support</span>
//               <i className="fa fa-angle-down"></i>
//             </Link>
//             <ul className="submenu-list">
//               <li><Link to="/faq">FAQ</Link></li>
//               <li><Link to="/support">Help Center</Link></li>
//             </ul>
//           </li>
//         </ul>
//       </SimpleBar>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SimpleBar from "simplebar-react";
import FeatherIcon from "feather-icons-react";
import { useSidebarContext } from "../pages/api/useSidebarContext";
import logo from "/src/assets/images/logo/icon-logo.png";
import logo1 from "/src/assets/images/logo/icon-logo.png";
import "font-awesome/css/font-awesome.min.css";

const menuPaths = {
  Dashboards: ["/index", "/doctor-dashboard", "/patient-dashboard"],
  Mentor: ["/all-doctors", "/add-doctor", "/edit-doctor"],
  Student: ["/all-patients", "/add-patient", "/edit-patient"],
  Classes: ["/classes"],
  Appointments: [
    "/doctor-schedule",
    "/add-appointment",
    "/edit-appointment",
    "/appointment-list",
  ],
  Billing: ["/payment-list", "/add-payment", "/patient-invoice"],
  EventManagement: ["/event-management"],
  AccessPages: [
    "/login",
    "/register",
    "/forgot-password",
    "/new-password",
    "/verify-email",
    "/verify-pin",
    "/error-page",
  ],
  Support: ["/faq", "/support"],
};

export default function Sidebar() {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const accessPages = menuPaths.AccessPages;

  const { toggleSidebar } = useSidebarContext();

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const email = parsedUser.email;
      console.log("Logged-in Email:", email);
      setUserEmail(email);
      setUserRole(parsedUser.role);
    }
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    const category = Object.keys(menuPaths).find((key) =>
      menuPaths[key].includes(currentPath)
    );
    const index = category ? Object.keys(menuPaths).indexOf(category) : null;
    setActiveIndex(index);
  }, [location.pathname]);

  const handleMenuClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // const isMentor = userEmail === "mentor@gmail.com";
  // const isStudent = userEmail === "student@gmail.com";
  // const isAdmin = userEmail === "admin@gmail.com";

  const isMentor = userRole === "mentor";
  const isStudent = userRole === "student";
  const isAdmin = userRole === "admin";

  if (userEmail === null) {
    return null;
  }

  if (!userRole) return null;

  return (
    <div className="codex-sidebar">
      <div className="logo-gridwrap">
        <Link className="lightlogo" to="/">
          <img className="img-fluid" src={logo} alt="sidebar-lightlogo" />
        </Link>
        <div className="sidebar-action" onClick={toggleSidebar}>
          <FeatherIcon icon="menu" />
        </div>
      </div>

      <div className="icon-logo">
        <Link className="lightlogo" to="/">
          <img className="img-fluid" src={logo1} alt="sidebar-lightlogo" />
        </Link>
      </div>

      <SimpleBar className="codex-menu custom-scroll">
        <ul>
          <li className="cdxmenu-title">
            <h5>main</h5>
          </li>

          {/* Dashboard */}
          <li
            onClick={() => handleMenuClick(0)}
            className={`menu-item ${activeIndex === 0 ? "active" : ""}`}
          >
            <Link>
              <div className="icon-item">
                <FeatherIcon icon="home" />
              </div>
              <span>Dashboard</span>
              <i className="fa fa-angle-down"></i>
            </Link>
            <ul className="submenu-list">
              {isAdmin && (
                <>
                  <li>
                    <Link to="/admin-dashboard">Admin Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/classes">Class Management</Link>
                  </li>
                </>
              )}

              {isMentor && !isAdmin && (
                <li>
                  <Link to="/doctor-dashboard">Mentor Dashboard</Link>
                </li>
              )}

              {isStudent && !isAdmin && (
                <li>
                  <Link to="/patient-dashboard">Student Dashboard</Link>
                </li>
              )}
            </ul>
          </li>

          {/* Mentor */}
          <li
            onClick={() => handleMenuClick(1)}
            className={`menu-item ${activeIndex === 1 ? "active" : ""}`}
          >
            <Link>
              <div className="icon-item">
                <i className="fa fa-user-md"></i>
              </div>
              <span>Mentor</span>
              <i className="fa fa-angle-down"></i>
            </Link>
            <ul className="submenu-list">
              {/* All mentors visible to all */}
              <li>
                <Link to="/all-doctors">
                  {isMentor ? "Assign Test" : "All Mentor"}
                </Link>
              </li>
            </ul>
          </li>

          {/* Student */}
          <li
            onClick={() => handleMenuClick(2)}
            className={`menu-item ${activeIndex === 2 ? "active" : ""}`}
          >
            <Link>
              <div className="icon-item">
                <i className="fa fa-wheelchair" aria-hidden="true"></i>
              </div>
              {/* Role-based label */}
              {isAdmin && <span>Student</span>}
              {isMentor && <span>My Profile</span>}
              {isStudent && <span>My Profile</span>}
              <i className="fa fa-angle-down"></i>
            </Link>
            <ul className="submenu-list">
              {/* All student page visible only to Admin and Mentor */}
              {(isAdmin || isMentor) && (
                <li>
                  <Link to="/all-patients">All Student</Link>
                </li>
              )}

              {/* Edit Profile links */}
              {isStudent && (
                <li>
                  <Link to="/edit-patient">Edit Profile</Link>
                </li>
              )}
              {isMentor && (
                <li>
                  <Link to="/edit-doctor">Edit Profile</Link>
                </li>
              )}
            </ul>
          </li>

          {/* Student */}
          <li
            onClick={() => handleMenuClick(8)}
            className={`menu-item ${activeIndex === 8 ? "active" : ""}`}
          >
            <Link>
              <div className="icon-item">
                <i className="fa fa-wheelchair" aria-hidden="true"></i>
              </div>
              {/* <span>Student</span> */}
              {isAdmin && <span>Assigned Test</span>}
              {isMentor && <span>Test Assigned To Students</span>}
              {isStudent && <span>My Tests</span>}

              <i className="fa fa-angle-down"></i>
            </Link>
            <ul className="submenu-list">
              {isAdmin && (
                <li>
                  <Link to="/all-patients">All Student</Link>
                </li>
              )}
              {isMentor && (
                <li>
                  <Link to="/all-patients">Profile</Link>
                </li>
              )}
              {isStudent && (
                <li>
                  <Link to="/my-assignments">Tests</Link>
                </li>
              )}

              {isStudent && (
                <li>
                  <Link to="/edit-patient">Edit Profile</Link>
                </li>
              )}
              {isMentor && (
                <li>
                  <Link to="/edit-doctor">Edit Profile</Link>
                </li>
              )}
              {isAdmin && (
                <>
                  <li>
                    <Link to="/add-patient">Add Student</Link>
                  </li>

                  <li>
                    <Link to="/edit-patient">Edit Student</Link>
                  </li>
                </>
              )}
            </ul>
          </li>

          {/* Appointments */}
          <li
            onClick={() => handleMenuClick(3)}
            className={`menu-item ${activeIndex === 3 ? "active" : ""}`}
          >
            <Link>
              <div className="icon-item">
                <i className="fa fa-calendar"></i>
              </div>
              <span>Appointments</span>
              <i className="fa fa-angle-down"></i>
            </Link>
            <ul className="submenu-list">
              <li>
                <Link to="/doctor-schedule">Mentor Schedule</Link>
              </li>
              <li>
                <Link to="/add-appointment">Add Appointment</Link>
              </li>
              <li>
                <Link to="/edit-appointment">Edit Appointment</Link>
              </li>

              {isAdmin && (
                <li>
                  <Link to="/appointment-list">View All Appointments</Link>
                </li>
              )}

              {isMentor && (
                <li>
                  <Link to="/appointment-list">My Appointments</Link>
                </li>
              )}
              {isStudent && (
                <li>
                  <Link to="/appointment-list">My Appointments</Link>
                </li>
              )}
            </ul>
          </li>

          {/* Billing */}
          <li
            onClick={() => handleMenuClick(4)}
            className={`menu-item ${activeIndex === 4 ? "active" : ""}`}
          >
            <Link>
              <div className="icon-item">
                <FeatherIcon icon="file" />
              </div>
              <span>Billing</span>
              <i className="fa fa-angle-down"></i>
            </Link>
            <ul className="submenu-list">
              <li>
                <Link to="/payment-list">Payment</Link>
              </li>
              <li>
                <Link to="/add-payment">Add Payment</Link>
              </li>

              {isAdmin && (
                <li>
                  <Link to="/patient-invoice">Student Invoice</Link>
                </li>
              )}
              {isStudent && (
                <li>
                  <Link to="/patient-invoice">My Invoice</Link>
                </li>
              )}
              {isMentor && (
                <li>
                  <Link to="/patient-invoice">My Invoice</Link>
                </li>
              )}
            </ul>
          </li>

          {/* Event Management */}
          <li
            onClick={() => handleMenuClick(5)}
            className={`menu-item ${activeIndex === 5 ? "active" : ""}`}
          >
            <Link to="/event-management">
              <div className="icon-item">
                <FeatherIcon icon="list" />
              </div>
              <span>Event Management</span>
            </Link>
          </li>

          {/* Support */}
          <li
            onClick={() => handleMenuClick(7)}
            className={`menu-item ${activeIndex === 7 ? "active" : ""}`}
          >
            <Link>
              <div className="icon-item">
                <i className="fa fa-life-ring"></i>
              </div>
              <span>Support</span>
              <i className="fa fa-angle-down"></i>
            </Link>
            <ul className="submenu-list">
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/support">Help Center</Link>
              </li>
            </ul>
          </li>
        </ul>
      </SimpleBar>
    </div>
  );
}
