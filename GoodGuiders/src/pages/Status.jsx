// import { useLocation, Link } from "react-router-dom";
// import { Container, Row, Col } from "react-bootstrap";
// import logo from '/src/assets/images/logo/icon-logo.png';

// export default function Status() {
//   const { state: doctor } = useLocation();

//   return (
//     <section className="py-100">
//       <Container>
//         <Row className="justify-content-center">
//           <Col md={8} lg={6}>
//             <div className="codex-authbox text-center">
//               <div className="auth-header mb-4">
//                 <div className="codex-brand mb-3">
//                   <Link to="/">
//                     <img
//                       className="img-fluid"
//                       src={logo}
//                       alt="Logo"
//                       style={{ width: "150px", height: "auto" }}
//                     />
//                   </Link>
//                 </div>
//                 <h3>Welcome, {doctor.Name}</h3>
//               </div>

//               <p>Your doctor application has been submitted successfully.</p>
//               <h4 className="text-warning my-4">Status: Pending Approval</h4>
//               <p>
//                 Please wait while the admin reviews your application.
//                 You’ll be notified once it’s approved or declined.
//               </p>

//               <Link to="/" className="btn btn-primary mt-4">
//                 Back to Home
//               </Link>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// }






import { useLocation, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import logo from '/src/assets/images/logo/icon-logo.png';

export default function Status() {
  const { state: doctor } = useLocation();

  return (
    <section className="py-100">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="codex-authbox text-center">
              
              <div className="auth-header mb-4">
                <div className="codex-brand mb-3">
                  <Link to="/">
                    <img
                      className="img-fluid"
                      src={logo}
                      alt="Logo"
                      style={{ width: "150px", height: "auto" }}
                    />
                  </Link>
                </div>
                <h3 className="mb-3">
                  Welcome, <span className="text-primary">{doctor.Name}</span>
                </h3>
              </div>

              <p className="fs-14 fw-semibold mb-15">
                Your doctor application has been submitted successfully !!
              </p>

              <h4 className="text-warning fs-30 fw-bold mb-15">
                Status: Pending Approval
              </h4>

              <p className="text-muted mb-4">
                Please wait while the admin reviews your application.<br />
                You’ll be notified once it’s <strong>approved</strong> or <strong>declined</strong>.
              </p>

              <Link to="/" className="btn btn-primary">
                Back to Home
              </Link>

            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
