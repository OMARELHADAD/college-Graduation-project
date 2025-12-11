import React from 'react';
import { Link } from "react-router-dom";
import "./Footer.scss"

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="top">
                    <div className="item">
                        <h2>Categories</h2>
                        <Link to="/gigs?cat=design" className="link"><span>Graphics & Design</span></Link>
                        <Link to="/gigs?cat=marketing" className="link"><span>Digital Marketing</span></Link>
                        <Link to="/gigs?cat=writing" className="link"><span>Writing & Translation</span></Link>
                        <Link to="/gigs?cat=video" className="link"><span>Video & Animation</span></Link>
                        <Link to="/gigs?cat=music" className="link"><span>Music & Audio</span></Link>
                        <Link to="/gigs?cat=programming" className="link"><span>Programming & Tech</span></Link>
                        <Link to="/gigs?cat=business" className="link"><span>Business</span></Link>
                        <Link to="/gigs?cat=lifestyle" className="link"><span>Lifestyle</span></Link>
                    </div>
                    <div className="item">
                        <h2>About</h2>
                        <Link to="/about" className="link"><span>About Us</span></Link>
                        <Link to="/contact" className="link"><span>Contact Us</span></Link>
                        <Link to="/privacy" className="link"><span>Privacy Policy</span></Link>
                        <Link to="/terms" className="link"><span>Terms of Service</span></Link>
                    </div>
                    <div className="item">
                        <h2>Support</h2>
                        <Link to="/contact" className="link"><span>Help & Support</span></Link>
                        <Link to="/trust" className="link"><span>Trust & Safety</span></Link>
                        <Link to="/selling" className="link"><span>Selling on Skillverse</span></Link>
                        <Link to="/buying" className="link"><span>Buying on Skillverse</span></Link>
                    </div>
                    <div className="item">
                        <h2>Community</h2>
                        <Link to="/community" className="link"><span>Community Hub</span></Link>
                        <Link to="/forum" className="link"><span>Forum</span></Link>
                        <Link to="/events" className="link"><span>Events</span></Link>
                        <Link to="/blog" className="link"><span>Blog</span></Link>
                        <Link to="/become-seller" className="link"><span>Become a Seller</span></Link>
                    </div>
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <h2>Skillverse</h2>
                        <span>© Skillverse HIMIT graduation project 2025-2026</span>
                    </div>
                    <div className="right">
                        <div className="social">
                            <img src="/img/twitter.png" alt="" />
                            <img src="/img/facebook.png" alt="" />
                            <img src="/img/linkedin.png" alt="" />
                            <img src="/img/pinterest.png" alt="" />
                            <img src="/img/instagram.png" alt="" />
                        </div>
                        <div className="link">
                            <img src="/img/language.png" alt="" />
                            <span>English</span>
                        </div>
                        <div className="link">
                            <img src="/img/coin.png" alt="" />
                            <span>USD</span>
                        </div>
                        <img src="/img/accessibility.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;