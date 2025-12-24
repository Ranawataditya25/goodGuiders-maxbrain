import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Reset failed");
        return;
      }

      alert("✅ Password reset successful");
      navigate("/login");
    } catch (err) {
      alert("Server error",err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-main">
      <div className="codex-authbox">
        <h3>Reset Password</h3>

        <Form onSubmit={handleSubmit}>
          {/* New Password */}
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <InputGroup.Text
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          {/* Confirm Password */}
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <InputGroup.Text
                style={{ cursor: "pointer" }}
                onClick={() => setShowConfirm(!showConfirm)}
              >
                <i
                  className={`fa ${showConfirm ? "fa-eye-slash" : "fa-eye"}`}
                />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </Form>
      </div>
    </div>
  );
}