import 'animate.css';
import { Routes, Route, BrowserRouter, useLocation, Navigate } from "react-router-dom";

import Index from "./pages/Index";
import Dashboard2 from "./pages/Dashboard2";
import Dashboard3 from "./pages/Dashboard3";

import All_doctor from "./pages/All_doctor";
import Add_doctor from "./pages/Add_doctor";
import Edit_doctor from "./pages/Edit_doctor";

import All_patient from "./pages/All_patient";
import Add_patient from "./pages/Add_patient";
import Edit_patient from "./pages/Edit_patient";

import Doctor_schedule from "./pages/Doctor_schedule";
import Add_appointment from "./pages/Add_appointment";
import Edit_appointment from "./pages/Edit_appointment";
import Appointment_list from "./pages/Appointment_list";

import Payment_list from "./pages/Payment_list";
import Add_payment from "./pages/Add_payment";
import Invoice from "./pages/Invoice";
import Event_management from "./pages/Event_management";

import Login from "./pages/Login";
import Register from "./pages/Register";
import DoctorProfile from "./pages/DoctorProfile";
import Status from "./pages/Status";
import { TestPage } from './pages/TestPage';
import { TestStart } from './pages/TestStart';
import Forgot_password from "./pages/Forgot_password";
import New_password from "./pages/New_password";
import Verify_email from "./pages/Verify_email";
import Verify_pin from "./pages/Verify_pin";

import Faq from "./pages/Faq";
import Element_Support from "./pages/Element_Support";
import Table from "./pages/Table";
import Datatable from "./pages/Datatable";
import Element_Basic_form from "./pages/Element_Basic_form";
import Element_Checkbox_radio from "./pages/Element_Checkbox_radio";
import Element_Datetimepicker from "./pages/Element_Datetimepicker";
import ApexChart from "./pages/ApexChart";
import Echart from "./pages/Echart";
import Morrishchart from "./pages/Morrishchart";


import Element_Timeline from "./pages/Element_Timeline";
import Element_Timeline_Two from "./pages/Element_Timeline_Two";
import Element_pricing from "./pages/Element_pricing";
import Element_Select2 from "./pages/Element_Select2";
import Element_Switch from "./pages/Element_Switch";
import Element_Dropzone from "./pages/Element_Dropzone";
import Element_Sweetalert from "./pages/Element_Sweetalert";
import Element_Lightbox from "./pages/Element_Lightbox";
import Element_Typography from "./pages/Element_Typography";
import Element_Colors from "./pages/Element_Colors";
import Element_HelperClass from "./pages/Element_HelperClass";
import Element_Alerts from "./pages/Element_Alerts";
import Element_Avtar from "./pages/Element_Avtar";
import Element_Buttons from "./pages/Element_Buttons";
import Element_Grids from "./pages/Element_Grids";
import Element_Dropdowns from "./pages/Element_Dropdowns";
import Element_breadcrumb from "./pages/Element_breadcrumb";
import Element_Accordions from "./pages/Element_Accordions";
import Element_Badges from "./pages/Element_Badges";
import Element_Modals from "./pages/Element_Modals";
import Element_Tabs_content from "./pages/Element_Tabs_content";
import Element_Tooltips from "./pages/Element_Tooltips";
import Element_Cards from "./pages/Element_Cards";
import Element_Progressbar from "./pages/Element_Progressbar";
import Element_Paginations from "./pages/Element_Paginations";


import Landing from "./pages/Landing";
import Errorpage from "./pages/Errorpage";
import Taptotop from "./componets/Taptotop";
import Loader from "./componets/Loader";
import { SidebarProvider } from "./pages/api/useSidebarContext";
import Header from "./componets/Header";
import Sidebar from "./componets/Sidebar";
import Customizer from "./componets/Customizer";

const routesWithoutExtras = [
    "/login",
    "/register",
    "/forgot-password",
    "/new-password",
    "/verify-email",
    "/verify-pin",
    "/landing",
    "/error-page"
];


function AppContent() {

    const location = useLocation();
    const isSpecialRoute = routesWithoutExtras.includes(location.pathname);

    const customizerEnabled = true;
    const headerEnabled = true;
    const sidebarEnabled = true;

    return (
        <>

            {/* Conditionally render Header */}
            {!isSpecialRoute && location.pathname !== "/error-page" && headerEnabled && <Header />}
            {/* Conditionally render Sidebar */}
            {!isSpecialRoute && location.pathname !== "/error-page" && sidebarEnabled && <Sidebar />}

            <Routes>
             

                 <Route exact path="/" element={<Index />} />
                <Route exact path="/doctor-dashboard" element={<Dashboard2 />} />
                <Route exact path="/patient-dashboard" element={<Dashboard3 />} />

                <Route exact path="/all-doctors" element={<All_doctor />} />
                <Route exact path="/add-doctor" element={<Add_doctor />} />
                <Route exact path="/edit-doctor" element={<Edit_doctor />} />

                <Route exact path="/all-patients" element={<All_patient />} />
                <Route exact path="/add-patient" element={<Add_patient />} />
                <Route exact path="/edit-patient" element={<Edit_patient />} />

                <Route exact path="/test-page" element={<TestPage />} />
                <Route exact path="/test-start" element={<TestStart />} />
                
                <Route exact path="/doctor-schedule" element={<Doctor_schedule />} />
                <Route exact path="/add-appointment" element={<Add_appointment />} />
                <Route exact path="/edit-appointment" element={<Edit_appointment />} />
                <Route exact path="/appointment-list" element={<Appointment_list />} />
                <Route exact path="/payment-list" element={<Payment_list />} />
                <Route exact path="/add-payment" element={<Add_payment />} />
                <Route exact path="/patient-invoice" element={<Invoice />} />
                <Route exact path="/event-management" element={<Event_management />} />

                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/doctor-profile" element={<DoctorProfile />} />
                <Route exact path="/status" element={<Status />} />
                <Route exact path="/forgot-password" element={<Forgot_password />} />
                <Route exact path="/new-password" element={<New_password />} />
                <Route exact path="/verify-email" element={<Verify_email />} />
                <Route exact path="/verify-pin" element={<Verify_pin />} />

                <Route exact path="/faq" element={<Faq />} />
                <Route exact path="/support" element={<Element_Support />} />
                <Route exact path="/basic-table" element={<Table />} />
                <Route exact path="/data-table" element={<Datatable />} />

                <Route exact path="/element-input" element={<Element_Basic_form />} />
                <Route exact path="/element-checkbox-radio" element={<Element_Checkbox_radio />} />
                <Route exact path="/element-datepicker" element={<Element_Datetimepicker />} />
                <Route exact path="/chart-apex" element={<ApexChart />} />
                <Route exact path="/chart-echarts" element={<Echart />} />
                <Route exact path="/chart-morris" element={<Morrishchart />} />



                <Route exact path="/timeline-one" element={<Element_Timeline />} />
                <Route exact path="/timeline-two" element={<Element_Timeline_Two />} />
                <Route exact path="/pricing" element={<Element_pricing />} />
                <Route exact path="/element-select2" element={<Element_Select2 />} />
                <Route exact path="/element-switch" element={<Element_Switch />} />
                <Route exact path="/element-dropzone" element={<Element_Dropzone />} />
                <Route exact path="/element-sweetalert2" element={<Element_Sweetalert />} />
                <Route exact path="/element-lightbox" element={<Element_Lightbox />} />
                <Route exact path="/element-typography" element={<Element_Typography />} />
                <Route exact path="/element-color" element={<Element_Colors />} />
                <Route exact path="/element-themeclass" element={<Element_HelperClass />} />
                <Route exact path="/element-alert" element={<Element_Alerts />} />
                <Route exact path="/element-avtar" element={<Element_Avtar />} />
                <Route exact path="/element-button" element={<Element_Buttons />} />
                <Route exact path="/element-grid" element={<Element_Grids />} />
                <Route exact path="/element-dropdown" element={<Element_Dropdowns />} />
                <Route exact path="/element-breadcrumb" element={<Element_breadcrumb />} />
                <Route exact path="/element-accordion" element={<Element_Accordions />} />
                <Route exact path="/element-badge" element={<Element_Badges />} />
                <Route exact path="/element-modal" element={<Element_Modals />} />
                <Route exact path="/element-tab" element={<Element_Tabs_content />} />
                <Route exact path="/element-tooltip" element={<Element_Tooltips />} />
                <Route exact path="/element-card" element={<Element_Cards />} />
                <Route exact path="/element-progressbar" element={<Element_Progressbar />} />
                <Route exact path="/element-pagination" element={<Element_Paginations />} />
                <Route exact path="/landing" element={<Landing />} />



                <Route path="*" element={<Navigate to="/error-page" replace />} />
                <Route path="/error-page" element={<Errorpage />} />
            </Routes>
            {/* Scroll To Top Start */}
            <Taptotop />
            {/* Scroll To Top End */}
            {!isSpecialRoute && location.pathname !== "/error-page" && customizerEnabled && <Customizer />}

        </>
    );
}

export default function App() {
    return (
        <>

            {/* Loader Start */}
            <Loader />
            {/* Loader End */}
           
            <BrowserRouter basename='/bootstrapreact/medixo/' >
                <SidebarProvider>
                    <AppContent />
                </SidebarProvider>
            </BrowserRouter>


        </>
    );
}