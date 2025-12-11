import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";
import { useDarkMode } from "../../context/DarkModeContext";
import { motion, useScroll, useTransform } from "framer-motion";

function Navbar() {
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);

    const { pathname } = useLocation();

    const isActive = () => {
        window.scrollY > 0 ? setActive(true) : setActive(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", isActive);
        return () => {
            window.removeEventListener("scroll", isActive);
        };
    }, []);

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("currentUser"))
    );

    const { darkMode, toggleDarkMode } = useDarkMode();

    // Listen for changes to currentUser from other parts of the app (login/logout)
    useEffect(() => {
        const handleStorage = () => {
            try {
                setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
            } catch (err) {
                setCurrentUser(null);
            }
        };

        const handleUserChange = () => {
            handleStorage();
        };

        window.addEventListener("storage", handleStorage);
        window.addEventListener("userChange", handleUserChange);

        return () => {
            window.removeEventListener("storage", handleStorage);
            window.removeEventListener("userChange", handleUserChange);
        };
    }, []);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // call backend logout; backend mounts auth under /api/auth
            await newRequest.post("/api/auth/logout");
        } catch (err) {
            console.log("Logout API error:", err);
        } finally {
            // Always clear client-side auth state so UI updates
            localStorage.removeItem("currentUser");
            // notify other components in same window
            window.dispatchEvent(new Event("userChange"));
            setCurrentUser(null);
            navigate("/");
        }
    };

    return (
        <motion.div
            className={active || pathname !== "/" ? "navbar active" : "navbar"}
            initial={{ y: pathname === "/" ? -100 : 0 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                position: pathname === "/" ? (active ? "fixed" : "fixed") : "sticky",
                background: "transparent"
            }}
        >
            <div className="container">
                <div className="logo">
                    <Link className="link" to="/">
                        <span className="text">Skillverse</span>
                    </Link>
                    <span className="dot">.</span>
                </div>
                <div className="links">
                    <Link className="link" to="/business">Skillverse Business</Link>
                    <Link to="/gigs" className="link"><span>Explore</span></Link>
                    <span>English</span>
                    <button
                        onClick={toggleDarkMode}
                        className="dark-mode-toggle"
                        aria-label="Toggle dark mode"
                        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {darkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                            </svg>
                        )}
                    </button>
                    {!currentUser?.isSeller && <Link to="/register" className="link"><span>Become a Seller</span></Link>}
                    {currentUser ? (
                        <div className="user" onClick={() => setOpen(!open)}>
                            <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
                            <span>{currentUser?.username}</span>
                            {open && (
                                <div className="options">
                                    {currentUser.isSeller && (
                                        <>
                                            <Link className="link" to="/dashboard">
                                                Dashboard
                                            </Link>
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
                                    <span className="link" role="button" onClick={handleLogout}>
                                        Logout
                                    </span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="link">Sign in</Link>
                            <Link className="link" to="/register">
                                <button>Join</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
            {(active || pathname !== "/") && (
                <>
                    <hr />
                    <div className="menu">
                        <Link className="link menuLink" to="/gigs?cat=graphics design">
                            Graphics & Design
                        </Link>
                        <Link className="link menuLink" to="/gigs?cat=video animation">
                            Video & Animation
                        </Link>
                        <Link className="link menuLink" to="/gigs?cat=writing translation">
                            Writing & Translation
                        </Link>
                        <Link className="link menuLink" to="/gigs?cat=ai services">
                            AI Services
                        </Link>
                        <Link className="link menuLink" to="/gigs?cat=digital marketing">
                            Digital Marketing
                        </Link>
                        <Link className="link menuLink" to="/gigs?cat=music audio">
                            Music & Audio
                        </Link>
                        <Link className="link menuLink" to="/gigs?cat=programming">
                            Programming & Tech
                        </Link>
                        <Link className="link menuLink" to="/gigs?cat=business">
                            Business
                        </Link>
                        <Link className="link menuLink" to="/gigs?cat=lifestyle">
                            Lifestyle
                        </Link>
                        <Link className="link menuLink" to="/about">
                            About Us
                        </Link>
                        <Link className="link menuLink" to="/contact">
                            Contact
                        </Link>
                    </div>
                    <hr />
                </>
            )}
        </motion.div>
    );
}

export default Navbar;