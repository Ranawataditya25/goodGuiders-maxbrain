import "animate.css";
import {
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Index from "./pages/Index";
import Dashboard2 from "./pages/Dashboard2";
import Dashboard3 from "./pages/Dashboard3";

import All_doctor from "./pages/All_doctor";
// import Add_doctor from "./pages/Add_doctor";
import Edit_doctor from "./pages/Edit_doctor";

import AssignTest from "./pages/AssignTest";
import AssignedTestsPage from "./pages/AssignedTestsPage";
import TestPlayer from "./pages/TestPlayer";

import TestResult from "./pages/TestResult";
import MyAssignments from "./pages/MyAssignments";

import ExamInstructions from "./pages/ExamInstructions";

import All_patient from "./pages/All_patient";
// import Add_patient from "./pages/Add_patient";
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
import MentorRegistrationProfile from "./pages/MentorRegistrationProfile.jsx";
import DoctorProfile from "./pages/DoctorProfile";
import Status from "./pages/Status";

import TestPage from "./pages/TestPage.jsx";
import { TestStart } from "./pages/TestStart";
import TestEnd from "./pages/TestEnd";

import Forgot_password from "./pages/Forgot_password";
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

// 👇 Classes CRUD (keep only these three)
import ClassesList from "./pages/classes/List";
import NewClass from "./pages/classes/New";
import EditClass from "./pages/classes/Edit";
import { useEffect } from "react";
import ChatPage from "./pages/ChatPage.jsx";
import AllChatsPage from "./pages/AllChatsPage.jsx";
import AdminMentorRequests from "./pages/AdminMentorRequests.jsx";
import PurchaseTemp from "./pages/PurchaseTemp.jsx";
import MentorSubmissions from "./pages/MentorSubmissions.jsx";
import MentorMaterials from "./pages/MentorMaterials.jsx";
import AdminPdfSubmissions from "./pages/AdminPdfSubmissions.jsx";
import MentorEvaluations from "./pages/MentorEvaluations.jsx";
import ResetPassword from "./pages/ResetPassword";
import MentorProfileInfo from "./pages/MentorProfileInfo.jsx";
import StudentEvaluationResult from "./pages/StudentEvaluationResult.jsx";
import StudentClasses from "./pages/Classes.jsx";

const routesWithoutExtras = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/verify-email",
  "/verify-pin",
  "/landing",
  "/error-page",
  "/mentor-registration",
];

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  // const isSpecialRoute = hideExtras;

  // 👇 dynamic route check
  const isResetPasswordPage = location.pathname.startsWith("/reset-password");

  const hideExtras =
    routesWithoutExtras.includes(location.pathname) || isResetPasswordPage;

  const customizerEnabled = true;
  // const headerEnabled = true;
  // const sidebarEnabled = true;

  useEffect(() => {
    const handler = (event) => {
      // ✅ Security check — only accept messages from your landing page domain
      // Replace "https://your-landing-domain.com" with your actual deployed domain
      if (
        event.origin !== "http://localhost:5173" &&
        !event.origin.includes("https://landing-page-gg.onrender.com")
      ) {
        return;
      }

      if (event.data && event.data.action === "navigate") {
        navigate(event.data.path);
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [navigate]);

  return (
    <>
      {/* ✅ HEADER & SIDEBAR CONDITION */}
      {!hideExtras && <Header />}
      {!hideExtras && <Sidebar />}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <iframe
              src="https://landing-page-gg.onrender.com" // 👈 put your live landing URL here
              style={{ width: "100%", height: "100vh", border: "none" }}
            />
          }
        />

        <Route exact path="/admin-dashboard" element={<Index />} />
        <Route exact path="/doctor-dashboard" element={<Dashboard2 />} />
        <Route exact path="/chat/:mentorEmail" element={<ChatPage />} />
        <Route exact path="/all-chats" element={<AllChatsPage />} />
        <Route exact path="/mentor/materials" element={<MentorMaterials />} />
        <Route path="/mentor/:email/materials" element={<MentorMaterials />} />
        <Route
          exact
          path="/admin-mentor-requests"
          element={<AdminMentorRequests />}
        />
        <Route exact path="/purchase-temp" element={<PurchaseTemp />} />
        <Route
          exact
          path="/mentor-submissions"
          element={<MentorSubmissions />}
        />
        <Route
          exact
          path="/admin/pdf-submissions"
          element={<AdminPdfSubmissions />}
        />
        <Route
          exact
          path="/mentor/pdf-evaluations"
          element={<MentorEvaluations />}
        />

        <Route exact path="/doctor-dashboard" element={<Dashboard2 />} />
        <Route exact path="/patient-dashboard" element={<Dashboard3 />} />

        <Route exact path="/all-doctors" element={<All_doctor />} />
        <Route exact path="/doctor-info/:email" element={<MentorProfileInfo /> } />
        {/* <Route exact path="/add-doctor" element={<Add_doctor />} /> */}
        <Route exact path="/edit-doctor" element={<Edit_doctor />} />

        {/* Classes CRUD */}
        <Route path="/classes" element={<ClassesList />} />
        <Route path="/classes/new" element={<NewClass />} />
        <Route path="/classes/:id/edit" element={<EditClass />} />
        <Route path="/student/classes" element={<StudentClasses />} />


        {/* Mentor assigning test */}
        <Route exact path="/assign-test" element={<AssignTest />} />
        <Route exact path="/assigned-tests" element={<AssignedTestsPage />} />
        <Route exact path="/student/results" element={<StudentEvaluationResult />} />

        <Route
          path="/test-instructions/:assignmentId"
          element={<ExamInstructions />}
        />

        <Route
          exact
          path="/test-player/:assignmentId"
          element={<TestPlayer />}
        />

        <Route exact path="/test-result/:attemptId" element={<TestResult />} />

        <Route exact path="/my-assignments" element={<MyAssignments />} />

        <Route exact path="/all-patients" element={<All_patient />} />
        {/* <Route exact path="/add-patient" element={<Add_patient />} /> */}
        <Route exact path="/edit-patient" element={<Edit_patient />} />

        <Route exact path="/test-page" element={<TestPage />} />
        <Route exact path="/test-start" element={<TestStart />} />
        <Route exact path="/test-end" element={<TestEnd />} />

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
        <Route
          exact
          path="/mentor-registration"
          element={<MentorRegistrationProfile />}
        />
        <Route exact path="/doctor-profile" element={<DoctorProfile />} />
        <Route exact path="/status" element={<Status />} />
        <Route exact path="/forgot-password" element={<Forgot_password />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route exact path="/verify-email" element={<Verify_email />} />
        <Route exact path="/verify-pin" element={<Verify_pin />} />

        <Route exact path="/faq" element={<Faq />} />
        <Route exact path="/support" element={<Element_Support />} />
        <Route exact path="/basic-table" element={<Table />} />
        <Route exact path="/data-table" element={<Datatable />} />

        <Route exact path="/element-input" element={<Element_Basic_form />} />
        <Route
          exact
          path="/element-checkbox-radio"
          element={<Element_Checkbox_radio />}
        />
        <Route
          exact
          path="/element-datepicker"
          element={<Element_Datetimepicker />}
        />
        <Route exact path="/chart-apex" element={<ApexChart />} />
        <Route exact path="/chart-echarts" element={<Echart />} />
        <Route exact path="/chart-morris" element={<Morrishchart />} />

        <Route exact path="/timeline-one" element={<Element_Timeline />} />
        <Route exact path="/timeline-two" element={<Element_Timeline_Two />} />
        <Route exact path="/pricing" element={<Element_pricing />} />
        <Route exact path="/element-select2" element={<Element_Select2 />} />
        <Route exact path="/element-switch" element={<Element_Switch />} />
        <Route exact path="/element-dropzone" element={<Element_Dropzone />} />
        <Route
          exact
          path="/element-sweetalert2"
          element={<Element_Sweetalert />}
        />
        <Route exact path="/element-lightbox" element={<Element_Lightbox />} />
        <Route
          exact
          path="/element-typography"
          element={<Element_Typography />}
        />
        <Route exact path="/element-color" element={<Element_Colors />} />
        <Route
          exact
          path="/element-themeclass"
          element={<Element_HelperClass />}
        />
        <Route exact path="/element-alert" element={<Element_Alerts />} />
        <Route exact path="/element-avtar" element={<Element_Avtar />} />
        <Route exact path="/element-button" element={<Element_Buttons />} />
        <Route exact path="/element-grid" element={<Element_Grids />} />
        <Route exact path="/element-dropdown" element={<Element_Dropdowns />} />
        <Route
          exact
          path="/element-breadcrumb"
          element={<Element_breadcrumb />}
        />
        <Route
          exact
          path="/element-accordion"
          element={<Element_Accordions />}
        />
        <Route exact path="/element-badge" element={<Element_Badges />} />
        <Route exact path="/element-modal" element={<Element_Modals />} />
        <Route exact path="/element-tab" element={<Element_Tabs_content />} />
        <Route exact path="/element-tooltip" element={<Element_Tooltips />} />
        <Route exact path="/element-card" element={<Element_Cards />} />
        <Route
          exact
          path="/element-progressbar"
          element={<Element_Progressbar />}
        />
        <Route
          exact
          path="/element-pagination"
          element={<Element_Paginations />}
        />
        <Route exact path="/landing" element={<Landing />} />

        <Route path="*" element={<Navigate to="/error-page" replace />} />
        <Route path="/error-page" element={<Errorpage />} />
      </Routes>

      {/* Scroll To Top */}
      <Taptotop />

      {/* Customizer */}
      {!hideExtras && location.pathname !== "/error-page" && customizerEnabled && (
  <Customizer />
)}
    </>
  );
}

export default function App() {
  return (
    <>
      {/* Loader */}
      <Loader />

      <BrowserRouter basename="/bootstrapreact/medixo">
        <SidebarProvider>
          <AppContent />
        </SidebarProvider>
      </BrowserRouter>
      {/* <BrowserRouter>
        <SidebarProvider>
          <AppContent />
        </SidebarProvider>
      </BrowserRouter> */}
    </>
  );
}
