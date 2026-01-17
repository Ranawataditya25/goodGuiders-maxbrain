import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Spinner } from "react-bootstrap";
import logo from "/src/assets/images/logo/icon-logo.png";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Forgot_password() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${API}/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      alert(data.message);
      setEmail("");
    } catch (err) {
      alert("Server error",err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-main">
      <div className="codex-authbox">
        <div className="auth-header">
          <Link to="/">
            <img src={logo} alt="logo" style={{ width: 150 }} />
          </Link>
          <h3>Forgot password?</h3>
          <p>Enter your email to receive a reset link.</p>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </Form.Group>

          <Button
            className="btn btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Sending...
              </>
            ) : (
              <>
                <i className="fa fa-key me-2"></i> Send Reset Link
              </>
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
}