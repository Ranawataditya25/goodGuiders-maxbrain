
import React, { useState } from 'react';
import {Button, Form} from 'react-bootstrap';

export default function Verify_pin() {
    const [pin, setPin] = useState(Array(6).fill('')); // Adjust size if needed

  const handleChange = (index, event) => {
    const newPin = [...pin];
    newPin[index] = event.target.value.slice(0, 1); // Keep only one character
    setPin(newPin);

    // Move focus to the next input field
    if (event.target.value && index < pin.length - 1) {
      document.getElementById(`pin-${index + 1}`).focus();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('PIN submitted:', pin.join(''));
    // Handle form submission logic here
  };
    return (
        <>
            <div className="auth-main">
                <div className="codex-authbox">
                    <div className="auth-header">
                        <div className="auth-icon">
                            <i className="fa fa-envelope-open"></i>
                        </div>
                        <h3>verify your email</h3>
                        <p>Plase Enter The Verification Code We Sent
                            To Medixo@example.Com
                        </p>
                    </div>
                    <Form onSubmit={handleSubmit} action="#">
      <Form.Group>
        <div className="small-group auth-pin">
          {pin.map((value, index) => (
            <Form.Control
              key={index}
              id={`pin-${index}`}
              className="code-input"
              type="text"
              value={value}
              onChange={(event) => handleChange(index, event)}
              required
              maxLength="1"
            />
          ))}
        </div>
      </Form.Group>
      <Form.Group>
        <Button className="btn btn-primary mt-0" type="submit">
          Confirm
        </Button>
      </Form.Group>
    </Form>
                    <div className="auth-footer text-center">
                        <p>Dont Receive The Email ? <a className="text-primary" href="#"> Resend Email</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}