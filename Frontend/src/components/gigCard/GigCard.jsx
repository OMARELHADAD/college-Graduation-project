import React from 'react'
import './GigCard.scss'
import { Link } from 'react-router-dom'

function GigCard({ item }) {

    // Fallbacks for images (backend + mock data)
    const imageSrc =
        item.cover ||
        item.img ||
        item.images?.[0] ||
        "/img/Novatar.png";

    const profileSrc =
        item.pp ||
        item.userImg ||
        item.user?.img ||
        "/img/Novatar.png";

    const username =
        item.username ||
        item.user?.username ||
        "Unknown";

    // 🔥 Calculate average stars correctly (backend + mock)
    const avgStar = item?.totalStars && item?.starNumber
        ? (item.totalStars / (item.starNumber || 1))
        : (item.star || 0);

    const avgStarRounded = Number.isFinite(avgStar)
        ? Math.round(avgStar)
        : 0;

    return (
        <Link to={`/gig/${item._id}`} className="link">
            <div className="gigCard">
                <img src={imageSrc} alt={item.title || "Gig image"} />

                <div className="info">
                    <div className="user">
                        <img src={profileSrc} alt={`${username} profile`} />
                        <span>{username}</span>
                    </div>

                    <p>{item.desc || item.shortDesc || item.description}</p>

                    <div className="star">
                        <img src="/img/star.png" alt="Stars" />
                        <span>{avgStarRounded}</span>
                    </div>
                </div>

                <hr />

                <div className="details">
                    <div
                        className="heart-icon"
                        onClick={(e) => {
                            e.preventDefault();
                            // Toggle favorite logic here (local state or context)
                            e.target.closest('.heart-icon').classList.toggle('active');
                        }}
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
        </Link>
    )
}

export default GigCard
