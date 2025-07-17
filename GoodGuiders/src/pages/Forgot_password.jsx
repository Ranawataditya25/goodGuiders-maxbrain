import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';

import logo from '/src/assets/images/logo/icon-logo.png';


export default function Forgot_password() {
    const [email, setEmail] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    return (
        <>
            <div className="auth-main">
                <div className="codex-authbox">
                    <div className="auth-header">
                        <div className="codex-brand">
                            <Link to={'/'}>
                                {/* <img className="img-fluid" src={logo} alt="" /> */}
                                   <img className="img-fluid" src={logo} alt="" style={{ width: '150px', height: 'auto' }} />
                                {/* <span className=" ms-2">Medixo</span> */}
                            </Link>
                        </div>
                        <h3>forgot password ? </h3>
                        <p>Enter Your Email And We'll Send You A Link To Reset
                            Your Password.
                        </p>
                    </div>
                    <Form >
                        <Form.Group className="mb-20">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email"  value={email}  onChange={handleEmailChange}  required/>
                        </Form.Group>
                        <Form.Group>
                            <Button className="btn btn-primary" type="submit">
                                <i className="fa fa-key"></i> Send Reset Link
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </>
    );
}