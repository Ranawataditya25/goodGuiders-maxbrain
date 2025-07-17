import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';


export default function PageBreadcrumb(props) {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const today = new Date(); // Get the current date
    const formattedDate = today.toLocaleDateString(); // Format the date
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        // Cleanup timer on component unmount
        return () => clearInterval(timer);
    }, []);

    return (

        <div className="codex-breadcrumb">
            <Container fluid>
                <div className="breadcrumb-contain">
                    <div className="left-breadcrumb">
                        <ul className="breadcrumb mb-0">
                            <li className="breadcrumb-item ">
                                <Link to="/">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item active">
                                <Link to={''}>{props.pagename}</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="right-breadcrumb">
                        <ul>
                            <li>
                                <div className="bread-wrap">
                                    <i className="fa fa-clock-o"></i>
                                </div>
                                     {time}
                            </li>
                            <li>
                                <div className="bread-wrap">
                                    <i className="fa fa-calendar"></i>
                                </div>
                                {formattedDate}
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
    );
}