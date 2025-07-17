import React from 'react';
import FullCalendar from 'fullcalendar-reactwrapper';
import { Row, Col, Card, Container } from 'react-bootstrap';
import PageBreadcrumb from '../componets/PageBreadcrumb';

export default function Event_management() {
    const  events = [
        {
            title: 'All Day Event',
            start: '2024-08-01'
        },
        {
            title: 'Long Event',
            start: '2024-08-07',
            end: '2024-08-10'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: '2024-08-09T16:00:00'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: '2024-08-16T16:00:00'
        },
        {
            title: 'Conference',
            start: '2024-08-11',
            end: '2024-08-13'
        },
        {
            title: 'Meeting',
            start: '2024-08-12T10:30:00',
            end: '2024-08-12T12:30:00'
        },
        {
            title: 'Birthday Party',
            start: '2024-08-13T07:00:00'
        },
        {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2024-08-28'
        }
    ]
  return (
    <div className="themebody-wrap">
    {/* Breadcrumb Start */}
    <PageBreadcrumb pagename="Event management" />
    {/* Breadcrumb End */}
    {/* theme body start */}
    <div className="theme-body codex-calendar">
        <Container fluid>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col xxl={3}>
                                    <ul className="events-list" id="codex-events-list">
                                        <li className="fc-event bg-primary"><i className="fa fa-birthday-cake"></i>Birthday Party</li>
                                        <li className="fc-event bg-secondary"><i className="fa fa-handshake-o"></i>Metting</li>
                                        <li className="fc-event bg-success"><i className="fa fa-graduation-cap"></i>Holidays</li>
                                        <li className="fc-event bg-warning"><i className="fa fa-bus"></i>Travel</li>
                                        <li className="fc-event bg-info"><i className="fa fa-building-o"></i>Company</li>
                                    </ul>
                                </Col>
                                <Col xxl={9}>
                                    {/* <div id="codex-calendar"></div> */}
                                    <div id="example-component" className="codex-calendar">
                                            <FullCalendar
                                                id="your-custom-ID"
                                                header={{
                                                    left: 'prev,next today myCustomButton',
                                                    center: 'title',
                                                    right: 'month,basicWeek,basicDay,list '
                                                }}
                                                defaultDate={'2024-08-12'}
                                                navLinks={true} 
                                                editable={true}
                                                eventLimit={true}
                                                events={events}
                                            />
                                        </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        {/* theme body end */}
    </div>
</div>
  )
}
