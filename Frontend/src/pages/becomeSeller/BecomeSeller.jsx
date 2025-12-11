import React from "react";
import "./BecomeSeller.scss";
import { Link } from "react-router-dom";

const BecomeSeller = () => {
    return (
        <div className="become-seller">
            {/* HERO SECTION */}
            <div className="hero">
                <div className="container">
                    <div className="left">
                        <h1>Work Your Way,<br /> <span className="highlight">Rule the Galaxy.</span></h1>
                        <p>Join our growing community of freelancers. Share your skills, earn money, and help businesses scale across the universe.</p>
                        <Link to="/register">
                            <button className="cta-btn">Become a Seller</button>
                        </Link>
                    </div>
                    <div className="right">
                        {/* 3D-like floating elements mockup */}
                        <div className="floating-card c1">
                            <img src="/img/check.png" alt="" />
                            <span>Verified</span>
                        </div>
                        <div className="floating-card c2">
                            <span>$500+</span>
                            <small>Earned</small>
                        </div>
                        <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600" className="hero-img" alt="Freelancer" />
                    </div>
                </div>
            </div>

            {/* BENEFITS GRID */}
            <div className="benefits">
                <div className="container">
                    <h2>Why Join Skillverse?</h2>
                    <div className="grid">
                        <div className="item">
                            <img src="/img/create.png" alt="icon" onError={(e) => e.target.src = "https://cdn-icons-png.flaticon.com/512/1160/1160358.png"} />
                            <h3>Create Gigs</h3>
                            <p>Sign up for free, set up your Gig, and offer your work to our global audience.</p>
                        </div>
                        <div className="item">
                            <img src="/img/delivery.png" alt="icon" onError={(e) => e.target.src = "https://cdn-icons-png.flaticon.com/512/2936/2936756.png"} />
                            <h3>Deliver Work</h3>
                            <p>Get notified when you get an order and use our system to discuss details with customers.</p>
                        </div>
                        <div className="item">
                            <img src="/img/coin.png" alt="icon" onError={(e) => e.target.src = "https://cdn-icons-png.flaticon.com/512/2454/2454282.png"} />
                            <h3>Get Paid</h3>
                            <p>Get paid on time, every time. Payment is transferred to you upon order completion.</p>
                        </div>
                        <div className="item">
                            <img src="/img/support.png" alt="icon" onError={(e) => e.target.src = "https://cdn-icons-png.flaticon.com/512/4233/4233830.png"} />
                            <h3>24/7 Support</h3>
                            <p>Our round-the-clock support team is available to convert your questions into answers.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* COMMUNITY TEASER */}
            <div className="community-teaser">
                <div className="container">
                    <div className="text-content">
                        <h2>Join the Community</h2>
                        <p>Connect with other sellers, share tips, and grow together in our exclusive forums.</p>
                        <Link to="/community">
                            <button className="white-btn">Explore Community</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BecomeSeller;
