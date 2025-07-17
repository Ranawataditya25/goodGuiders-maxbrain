import * as React from 'react';
import { Button } from 'react-bootstrap';

export default function Verify_email(){
    return (
        <>
            <div className="auth-main">
                <div className="codex-authbox">
                    <div className="auth-header">
                        <div className="auth-icon">
                            <i className="fa fa-envelope"></i>
                        </div>
                        <h3>Verify Your Email Address</h3>
                        <p>you've entered <b>Medixo@Example.Com </b>as the email address for yiur account. please verify this email address by clicking button below.</p>
                    </div>
                    <div className="form-group mb-0">
                        <Button className="btn btn-primary" type="submit">Verify Email</Button>
                    </div>
                </div>
            </div>
        </>
    );
}