import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';

export default function Errorpage() {
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="codex-error">
              <div className="error-detail">
                <h1>o<span>op</span>s!</h1>
                <h2>This Page Not Found!</h2>
                <p>Sorry, The Page You're Looking For Dose Not Exit. If You Think Something Is Broken, Report A Problem. Go Back To The Homepage.</p>
                <Link className="btn btn-primary" to="/">
                  <FeatherIcon icon="home" /> Go Back Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
