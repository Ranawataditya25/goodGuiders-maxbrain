import { useLocation, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import logo from '/src/assets/images/logo/icon-logo.png';

export default function Status() {
  const { state } = useLocation();
  const user = state || {};  // fallback if no state is passed

  const { role, name, status } = user;

  let statusMessage = "";
  let statusColor = "";
  let extraMessage = "";

  if (status === "pending") {
    statusMessage = "Pending Approval";
    statusColor = "text-warning";
    extraMessage =
      "Please wait while the admin reviews your application. You’ll be notified once it’s approved or declined.";
  } else if (status === "approved") {
    statusMessage = "Approved ✅";
    statusColor = "text-success";
    extraMessage =
      "Congratulations! Your mentor profile has been approved. You can now log in and start using your account.";
  } else if (status === "rejected") {
    statusMessage = "Rejected ❌";
    statusColor = "text-danger";
    extraMessage =
      "Unfortunately, your mentor application has been declined by the admin. You cannot log in as a mentor.";
  } else {
    statusMessage = "No Status Found";
    statusColor = "text-muted";
    extraMessage =
      "Looks like you landed here directly. Please register or log in to continue.";
  }

  return (
    <section className="py-100">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="codex-authbox text-center">
              
              {/* Logo */}
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

                {/* Welcome text */}
                {name ? (
                  <h3 className="mb-3">
                    Welcome, <span className="text-primary">{name}</span>
                  </h3>
                ) : (
                  <h3 className="mb-3">Status Page</h3>
                )}
              </div>

              {/* Application info */}
              {role === "mentor" && (
                <p className="fs-14 fw-semibold mb-15">
                  Your mentor application has been submitted successfully!
                </p>
              )}

              {/* Status */}
              <h4 className={`${statusColor} fs-30 fw-bold mb-15`}>
                Status: {statusMessage}
              </h4>

              <p className="text-muted mb-4">{extraMessage}</p>

              {/* Back button */}
              <Link to="/login" className="btn btn-primary">
                Back to Login
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
