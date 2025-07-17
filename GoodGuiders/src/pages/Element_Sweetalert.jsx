import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import PageBreadcrumb from '../componets/PageBreadcrumb';

import Swal from 'sweetalert2';

export default function Element_Sweetalert() {
  return (
    <>
      <div className="themebody-wrap">
        {/* breadcrumb start */}
        <PageBreadcrumb pagename="Sweetalert" />
        {/* breadcrumb end */}
        {/* theme body start */}
        <div className="theme-body codex-calendar">
          <Container fluid>
            <Row>
              <Col md={4} sm={6}>
                <Card>
                  <Card.Header>
                    <h4>A basic message</h4>
                  </Card.Header>
                  <Card.Body>
                    <button className="btn btn-primary" onClick={() => {
                      Swal.fire("Any fool can use a computer");
                    }}>
                      basic message
                    </button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} sm={6}>
                <Card>
                  <Card.Header>
                    <h4>A title with a text under</h4>
                  </Card.Header>
                  <Card.Body>
                    <button className="btn btn-primary" onClick={() => {
                      Swal.fire({
                        title: "The Internet?",
                        text: "That thing is still around?",
                        icon: "question"
                      });
                    }}>
                      title & text
                    </button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} sm={6}>
                <Card>
                  <Card.Header>
                    <h4>error modal</h4>
                  </Card.Header>
                  <Card.Body>
                    <button className="btn btn-primary" onClick={() => {
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        footer: '<a href="#">Why do I have this issue?</a>'
                      });
                    }}>
                      error
                    </button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} sm={6}>
                <Card>
                  <Card.Header>
                    <h4>long content inside</h4>
                  </Card.Header>
                  <Card.Body>
                    <button className="btn btn-primary" onClick={() => {
                      Swal.fire({
                        imageUrl: "https://placeholder.pics/svg/300x1500",
                        imageHeight: 1500,
                        imageAlt: "A tall image"
                      });
                    }}>
                      long content
                    </button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} sm={6}>
                <Card>
                  <Card.Header>
                    <h4>Custom HTML description</h4>
                  </Card.Header>
                  <Card.Body>
                    <button className="btn btn-primary" onClick={() => {
                      Swal.fire({
                        title: "<strong>HTML <u>example</u></strong>",
                        icon: "info",
                        html: `
                                              You can use <b>bold text</b>,
                                              <a href="#" autofocus>links</a>,
                                              and other HTML tags
                                            `,
                        showCloseButton: true,
                        showCancelButton: true,
                        focusConfirm: false,
                        confirmButtonText: `
                                              <i className="fa fa-thumbs-up"></i> Great!
                                            `,
                        confirmButtonAriaLabel: "Thumbs up, great!",
                        cancelButtonText: `
                                              <i className="fa fa-thumbs-down"></i>
                                            `,
                        cancelButtonAriaLabel: "Thumbs down"
                      });
                    }}>
                      Custom description
                    </button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} sm={6}>
                <Card>
                  <Card.Header>
                    <h4>A dialog with three buttons</h4>
                  </Card.Header>
                  <Card.Body>
                    <button className="btn btn-primary" onClick={() => {
                      Swal.fire({
                        title: "Do you want to save the changes?",
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: "Save",
                        denyButtonText: `Don't save`
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire("Saved!", "", "success");
                        } else if (result.isDenied) {
                          Swal.fire("Changes are not saved", "", "info");
                        }
                      });
                    }}>
                      dialog
                    </button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} sm={6}>
                <Card>
                  <Card.Header>
                    <h4>A custom positioned dialog</h4>
                  </Card.Header>
                  <Card.Body>
                    {/* <button className="btn btn-primary" id="swt7">custom dialog</button> */}
                    <button className="btn btn-primary" onClick={() => {
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    }}>
                      custom dialog
                    </button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} sm={6}>
                <Card>
                  <Card.Header>
                    <h4>Custom animation with</h4>
                  </Card.Header>
                  <Card.Body>
                    {/* <button className="btn btn-primary" id="swt8">Custom animation</button> */}
                    <button className="btn btn-primary" onClick={() => {
                      Swal.fire({
                        title: "Custom animation with Animate.css",
                        showClass: {
                          popup: `
                                                animate__animated
                                                animate__fadeInUp
                                                animate__faster
                                              `
                        },
                        hideClass: {
                          popup: `
                                                animate__animated
                                                animate__fadeOutDown
                                                animate__faster
                                              `
                        }
                      });
                    }}>
                      Custom animation
                    </button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} sm={6}>
                <Card>
                  <Card.Header>
                    <h4>confirm dialog</h4>
                  </Card.Header>
                  <Card.Body>
                    {/* <button className="btn btn-primary" id="swt9">confirm dialog</button> */}
                    <button className="btn btn-primary" onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                        }
                      });
                    }}>
                      confirm dialog
                    </button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} sm={6}>
                <Card>
                  <Card.Header>
                    <h4>something else for "Cancel".</h4>
                  </Card.Header>
                  <Card.Body>
                    {/* <button className="btn btn-primary" id="swt10">something else for "Cancel".</button> */}
                    <button className="btn btn-primary" onClick={() => {
                      const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                          confirmButton: "btn btn-success",
                          cancelButton: "btn btn-danger"
                        },
                        buttonsStyling: false
                      });
                      swalWithBootstrapButtons.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Yes, delete it!",
                        cancelButtonText: "No, cancel!",
                        reverseButtons: true
                      }).then((result) => {
                        if (result.isConfirmed) {
                          swalWithBootstrapButtons.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                        } else if (
                          /* Read more about handling dismissals below */
                          result.dismiss === Swal.DismissReason.cancel
                        ) {
                          swalWithBootstrapButtons.fire({
                            title: "Cancelled",
                            text: "Your imaginary file is safe :)",
                            icon: "error"
                          });
                        }
                      });
                    }}>
                      something else for "Cancel".
                    </button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} sm={6}>
                <Card>
                  <Card.Header>
                    <h4>message with a custom image</h4>
                  </Card.Header>
                  <Card.Body>
                    {/* <button className="btn btn-primary" id="swt11">message with image </button> */}
                    <button className="btn btn-primary" onClick={() => {
                      Swal.fire({
                        title: "Sweet!",
                        text: "Modal with a custom image.",
                        imageUrl: "https://unsplash.it/400/200",
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: "Custom image"
                      });
                    }}>
                      message with imag
                    </button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} sm={6}>
                <Card>
                  <Card.Header>
                    <h4>custom dialog</h4>
                  </Card.Header>
                  <Card.Body>
                    {/* <button className="btn btn-primary" id="swt12">custom dialog</button> */}
                    <button className="btn btn-primary" onClick={() => {
                      Swal.fire({
                        title: "Custom width, padding, color, background.",
                        width: 600,
                        padding: "3em",
                        color: "#716add",
                        background: "#fff url(/images/trees.png)",
                        backdrop: `
                                                  rgba(0,0,123,0.4)
                                                  url("/images/nyan-cat.gif")
                                                  left top
                                                  no-repeat
                                                `
                      });
                    }}>
                      custom dialog
                    </button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} sm={6}>
                <Card>
                  <Card.Header>
                    <h4>auto close timer</h4>
                  </Card.Header>
                  <Card.Body>
                    {/* <button className="btn btn-primary" id="swt13">auto close timer</button> */}
                    <button className="btn btn-primary" onClick={() => {
                      let timerInterval;
                      Swal.fire({
                        title: "Auto close alert!",
                        html: "I will close in <b></b> milliseconds.",
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                          Swal.showLoading();
                          const timer = Swal.getPopup().querySelector("b");
                          timerInterval = setInterval(() => {
                            timer.textContent = `${Swal.getTimerLeft()}`;
                          }, 100);
                        },
                        willClose: () => {
                          clearInterval(timerInterval);
                        }
                      }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                          console.log("I was closed by the timer");
                        }
                      });
                    }}>
                      auto close timer
                    </button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} sm={6}>
                <Card>
                  <Card.Header>
                    <h4>RTL languages dialog</h4>
                  </Card.Header>
                  <Card.Body>
                    {/* <button className="btn btn-primary" id="swt14">RTL dialog </button> */}
                    <button className="btn btn-primary" onClick={() => {
                      Swal.fire({
                        title: "هل تريد الاستمرار؟",
                        icon: "question",
                        iconHtml: "؟",
                        confirmButtonText: "نعم",
                        cancelButtonText: "لا",
                        showCancelButton: true,
                        showCloseButton: true
                      });
                    }}>
                      RTL dialog
                    </button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} sm={6}>
                <Card>
                  <Card.Header>
                    <h4>AJAX request example</h4>
                  </Card.Header>
                  <Card.Body>
                    {/* <button className="btn btn-primary" id="swt15">AJAX dialog</button> */}
                    <button className="btn btn-primary" onClick={() => {
                      Swal.fire({
                        title: 'Submit your Github username',
                        input: 'text',
                        inputAttributes: {
                          autocapitalize: 'off'
                        },
                        showCancelButton: true,
                        confirmButtonText: 'Look up',
                        showLoaderOnConfirm: true,
                        preConfirm: (login) => {
                          return fetch(`//api.github.com/users/${login}`)
                            .then(response => {
                              if (!response.ok) {
                                throw new Error(response.statusText)
                              }
                              return response.json()
                            })
                            .catch(error => {
                              Swal.showValidationMessage(
                                `Request failed: ${error}`
                              )
                            })
                        },
                        allowOutsideClick: () => !Swal.isLoading()
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            title: `${result.value.login}'s avatar`,
                            imageUrl: result.value.avatar_url
                          })
                        }
                      });
                    }}>
                      AJAX dialog
                    </button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        {/* theme body end */}
      </div>
      
    </>
  )
}
