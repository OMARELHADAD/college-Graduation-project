import React from 'react'
import './GigCard.scss'
import { Link, useNavigate } from 'react-router-dom'
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {
    const [currentUser, setCurrentUser] = React.useState(
        JSON.parse(localStorage.getItem("currentUser"))
    );

    // Reactively update user state when login happens
    React.useEffect(() => {
        const handleUserChange = () => {
            setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
        };

        window.addEventListener("userChange", handleUserChange);
        return () => window.removeEventListener("userChange", handleUserChange);
    }, []);

    // Turn "undefined" into false for safer logic
    const isSavedInitial = currentUser?.savedGigs?.includes(item._id) || false;
    const [isSaved, setIsSaved] = React.useState(isSavedInitial);

    // Update isSaved when currentUser changes (e.g. after login/re-fetch)
    React.useEffect(() => {
        setIsSaved(currentUser?.savedGigs?.includes(item._id) || false);
    }, [currentUser, item._id]);

    const navigate = useNavigate();

    // Fallbacks for images
    const imageSrc = item.cover || item.img || item.images?.[0] || "/img/Novatar.png";
    const profileSrc = item.pp || item.userImg || item.user?.img || "/img/Novatar.png";
    const username = item.username || item.user?.username || "Unknown";

    // Star calculation
    const avgStar = item?.totalStars && item?.starNumber
        ? (item.totalStars / (item.starNumber || 1))
        : (item.star || 0);
    const avgStarRounded = Number.isFinite(avgStar) ? Math.round(avgStar) : 0;

    const handleSave = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!currentUser) {
            navigate("/login");
            return;
        }

        // Optimistic Update: Update UI immediately
        const previousState = isSaved;
        setIsSaved(!isSaved);

        try {
            await newRequest.put("/api/users/save", { gigId: item._id });

            // Sync with localStorage
            const newIsSaved = !previousState;
            let saved = currentUser.savedGigs || [];

            if (newIsSaved) {
                if (!saved.includes(item._id)) saved.push(item._id);
            } else {
                saved = saved.filter(id => id !== item._id);
            }

            const updatedUser = { ...currentUser, savedGigs: saved };
            localStorage.setItem("currentUser", JSON.stringify(updatedUser));
            setCurrentUser(updatedUser);

        } catch (err) {
            console.log(err);
            // Revert on error
            setIsSaved(previousState);
            alert("Error saving gig: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="gigCard">
            {/* Gig Image Link */}
            <Link to={`/gig/${item._id}`} className="link">
                <img src={imageSrc} alt={item.title || "Gig image"} />
            </Link>

            <div className="info">
                {/* User Profile Link */}
                <div className="user">
                    <Link to={`/profile/${item.userId}`} className="link" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={profileSrc} alt={`${username} profile`} />
                        <span>{username}</span>
                    </Link>
                </div>

                {/* Gig Description Link */}
                <Link to={`/gig/${item._id}`} className="link">
                    <p>{item.desc || item.shortDesc || item.description}</p>
                </Link>

                <div className="star">
                    <img src="/img/star.png" alt="Stars" />
                    <span>{avgStarRounded}</span>
                </div>
            </div>

            <hr />

            <div className="details">
                <div
                    className={`heart-icon ${isSaved ? "active" : ""}`}
                    onClick={handleSave}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </div>
                <div className="price">
                    <span>STARTING AT</span>
                    <h2>${item.price} / hr</h2>
                </div>
            </div>
        </div>
    )
}

export default GigCard
