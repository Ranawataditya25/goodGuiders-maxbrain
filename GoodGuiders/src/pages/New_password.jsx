import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

export default function New_password() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
  return (
    <>
    <div className="auth-main">
        <div className="codex-authbox">
            <div className="auth-header">
                <div className="auth-icon">
                    <i className="fa fa-unlock-alt"></i>
                </div>
                <h3>reset your password </h3>
                <p>You've Successfully Verified Your Account. Enter
                    New Passeord Below.
                </p>
            </div>
            <Form action="#">
                <Form.Group className="mb-20">
                    <Form.Label htmlFor="password">New Password</Form.Label>
                    <InputGroup className="group-input">
                        <Form.Control
                            className="showhide-password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="Enter Your New Password"
                            required
                        />
                        <InputGroup.Text
                            className={`toggle-show d-flex align-items-center fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                            onClick={togglePasswordVisibility}
                            style={{ cursor: 'pointer' }}
                        >
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-20">
                    <Form.Label htmlFor="newpassword">Confirm Password</Form.Label>
                    <InputGroup className="group-input">
                        <Form.Control
                            className="showhide-password"
                            type={showConfirmPassword ? 'text' : 'newpassword'}
                            id="newpassword"
                            placeholder="Re-enter Your Password"
                            required
                        />
                        <InputGroup.Text className={`toggle-show d-flex align-items-center fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}   onClick={toggleConfirmPasswordVisibility}
                            style={{ cursor: 'pointer' }}
                        >
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Button className="btn btn-primary" type="submit">Update Password</Button>
                </Form.Group>
            </Form>
        </div>
    </div>
</>
  )
}
