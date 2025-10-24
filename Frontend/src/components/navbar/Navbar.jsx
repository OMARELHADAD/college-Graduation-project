import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    const isActive = () => {
        window.scrollY > 0 ? setActive(true) : setActive(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", isActive);
        return () => window.removeEventListener("scroll", isActive);
    }, []);

    const currentUser = {
        id: 1,
        username: "asmaa ali",
        isSeller: true,
    };

    return (
        <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
        <div className="container">
            <div className="logo">
            <Link to="/" className="link">
                <span className="text">Skillverse</span>
            </Link>
            <span className="dot">.</span>
            </div>

            <div className="links">
            <span>Skillverse Business</span>
            <span>Explore</span>
            <span>English</span>

            {/* If there's no user show Sign in / Join */}
            {!currentUser ? (
                <>
                <span>Sign in</span>
                <Link to="/register" className="link">
                    <button>Join</button>
                </Link>
                </>
            ) : (
                <>
                {!currentUser?.isSeller && <span>Become a seller</span>}
                {/* user dropdown */}
                <div
                    className="user"
                    onClick={() => setOpen((prev) => !prev)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter") setOpen((p) => !p); }}
                >
                    <img
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="user picture"
                    />
                    <span>{currentUser.username}</span>

                    {open && (
                    <div className="options">
                        {currentUser.isSeller && (
                        <>
                            <Link className="link" to="/mygigs">
                            Gigs
                            </Link>
                            <Link className="link" to="/add">
                            Add New Gig
                            </Link>
                        </>
                        )}
                        <Link className="link" to="/orders">
                        Orders
                        </Link>
                        <Link className="link" to="/messages">
                        Messages
                        </Link>
                        <Link className="link" to="/">
                        Logout
                        </Link>
                    </div>
                    )}
                </div>
                </>
            )}
            </div>
        </div>

        {(active || pathname !== "/") && (
            <>
            <hr />
            <div className="menu">
                <Link className="link menuLink" to="/">
                Graphics & Design
                </Link>
                <Link className="link menuLink" to="/">
                Video & Animation
                </Link>
                <Link className="link menuLink" to="/">
                Writing & Translation
                </Link>
                <Link className="link menuLink" to="/">
                AI Services
                </Link>
                <Link className="link menuLink" to="/">
                Digital Marketing
                </Link>
                <Link className="link menuLink" to="/">
                Music & Audio
                </Link>
                <Link className="link menuLink" to="/">
                Programming & Tech
                </Link>
                <Link className="link menuLink" to="/">
                Business
                </Link>
                <Link className="link menuLink" to="/">
                Lifestyle
                </Link>
            </div>
            </>
        )}
        </div>
    );
}

export default Navbar;