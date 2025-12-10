<<<<<<< HEAD
    import React, { useEffect, useState } from "react";
    import { Link, useLocation, useNavigate } from "react-router-dom";
    import newRequest from "../../utils/newRequest";
    import "./Navbar.scss";

    function Navbar() {
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);

=======
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
>>>>>>> a68b8a9493919f638f23b69bc41f1ec47a4e2cae
    const { pathname } = useLocation();

    const isActive = () => {
        window.scrollY > 0 ? setActive(true) : setActive(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", isActive);
<<<<<<< HEAD
        return () => {
        window.removeEventListener("scroll", isActive);
        };
    }, []);

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("currentUser"))
    );

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
=======
        return () => window.removeEventListener("scroll", isActive);
    }, []);

    const currentUser = {
        id: 1,
        username: "asmaa ali",
        isSeller: true,
>>>>>>> a68b8a9493919f638f23b69bc41f1ec47a4e2cae
    };

    return (
        <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
        <div className="container">
            <div className="logo">
<<<<<<< HEAD
            <Link className="link" to="/">
=======
            <Link to="/" className="link">
>>>>>>> a68b8a9493919f638f23b69bc41f1ec47a4e2cae
                <span className="text">Skillverse</span>
            </Link>
            <span className="dot">.</span>
            </div>
<<<<<<< HEAD
            <div className="links">
            <span>Fiverr Business</span>
            <span>Explore</span>
            <span>English</span>
            {!currentUser?.isSeller && <span>Become a Seller</span>}
            {currentUser ? (
                <div className="user" onClick={() => setOpen(!open)}>
                <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
                <span>{currentUser?.username}</span>
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
=======

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

>>>>>>> a68b8a9493919f638f23b69bc41f1ec47a4e2cae
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
<<<<<<< HEAD
            <hr />
=======
>>>>>>> a68b8a9493919f638f23b69bc41f1ec47a4e2cae
            </>
        )}
        </div>
    );
<<<<<<< HEAD
    }

    export default Navbar;
=======
}

export default Navbar;
>>>>>>> a68b8a9493919f638f23b69bc41f1ec47a4e2cae
