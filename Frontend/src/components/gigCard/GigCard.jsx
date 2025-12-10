import React from 'react'
import './GigCard.scss'
import { Link } from 'react-router-dom'

<<<<<<< HEAD
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
                    <img src="/img/heart.png" alt="heart" />
=======
function GigCard({item}) {
    return (
        <Link to={`/gig/123`} className='link'>
            <div className='gigCard'>
                <img src={item.img} alt={item.title || 'gig image'} />
                <div className="info">
                    <div className="user">
                        <img src={item.pp} alt={`${item.username} profile`} />
                        <span>{item.username}</span>
                    </div>
                    <p>{item.desc}</p>
                    <div className="star">
                        <img src="../../../public/img/star.png" alt="Stars" />
                        <span>{item.star}</span>
                    </div>
                </div>
                <hr/>
                <div className="details">
                    <img src="../../../public/img/heart.png" alt="heart" />
>>>>>>> a68b8a9493919f638f23b69bc41f1ec47a4e2cae
                    <div className="price">
                        <span>STARTING AT</span>
                        <h2>${item.price}</h2>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default GigCard
