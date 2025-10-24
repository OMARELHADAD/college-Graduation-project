import React from 'react'
import './GigCard.scss'
import { Link } from 'react-router-dom'

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
