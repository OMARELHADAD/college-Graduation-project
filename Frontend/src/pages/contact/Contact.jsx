import React from "react";
import "./Contact.scss";

const Contact = () => {
    return (
        <div className="contact-container container mt-5 animate__animated animate__fadeIn">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center mb-5">
                    <h1 className="display-4 fw-bold">Contact Us</h1>
                    <p className="lead text-muted">Get in touch with us</p>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg border-0 rounded-3 overflow-hidden">
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <i className="bi bi-building fs-1 text-primary mb-3"></i>
                                <h3 className="fw-bold">Higher Institute of Management and Information Technology</h3>
                                <h5 className="text-muted">(HIMIT)</h5>
                            </div>

                            <div className="d-flex align-items-center justify-content-center mb-3">
                                <i className="bi bi-geo-alt-fill text-danger me-2 fs-4"></i>
                                <span className="fs-5">Kafr Elsheikh, Egypt</span>
                            </div>

                            <hr className="my-4" />

                            <div className="text-center">
                                <p className="mb-2">For inquiries regarding the project or institution:</p>
                                <a href="https://himit-kfs.edu.eg/" target="_blank" rel="noopener noreferrer">
                                    <button className="btn btn-primary btn-lg px-5 mt-3 hover-scale">
                                        <i className="bi bi-envelope-fill me-2"></i> Send Message
                                    </button>
                                </a>
                            </div>
                        </div>
                        <div className="bg-light p-4 text-center">
                            <small className="text-muted">We typically reply within 24 hours.</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
