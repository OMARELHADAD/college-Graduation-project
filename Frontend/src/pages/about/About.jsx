import React from "react";
import "./About.scss";

const About = () => {
    return (
        <div className="about-container container mt-5 animate__animated animate__fadeIn">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">About Us</h1>
                <p className="lead text-muted">Meet the team behind this project</p>
            </div>

            <div className="row mb-5">
                <div className="col-12">
                    <h2 className="border-bottom pb-2 mb-4">Our Team</h2>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card h-100 shadow-sm hover-effect">
                        <div className="card-body text-center">
                            <h5 className="card-title fw-bold">Omar Elhadad</h5>
                            <p className="card-text text-primary">Front-End Developer</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card h-100 shadow-sm hover-effect">
                        <div className="card-body text-center">
                            <h5 className="card-title fw-bold">Zyad Elhosiny</h5>
                            <p className="card-text text-primary">Back-End Developer</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card h-100 shadow-sm hover-effect">
                        <div className="card-body text-center">
                            <h5 className="card-title fw-bold">Mahmoud Khedr</h5>
                            <p className="card-text text-primary">Data Analyst & AI Model Supervisor</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <div className="card h-100 shadow-sm hover-effect">
                        <div className="card-body text-center">
                            <h5 className="card-title fw-bold">Rahma Ahmed</h5>
                            <p className="card-text text-primary">UI & UX Designer</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <div className="card h-100 shadow-sm hover-effect">
                        <div className="card-body text-center">
                            <h5 className="card-title fw-bold">Zyad Nagdy</h5>
                            <p className="card-text text-primary">UI & UX Designer</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-5">
                <div className="col-12">
                    <h2 className="border-bottom pb-2 mb-4">Supervision</h2>
                </div>

                <div className="col-md-6 mb-4">
                    <div className="card h-100 border-0 bg-light">
                        <div className="card-body">
                            <h4 className="card-title">Professors</h4>
                            <ul className="list-unstyled fs-5">
                                <li>Dr. Reham Eisaa</li>
                                <li>Dr. Amira Elattar</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <div className="card h-100 border-0 bg-light">
                        <div className="card-body">
                            <h4 className="card-title">Co-Professor</h4>
                            <ul className="list-unstyled fs-5">
                                <li>Eng. Sally Abdelrazerk</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
