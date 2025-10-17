import React from 'react'
import './Gigcard.scss'

function GigCard({item}) {
    return (
        <link to="/gig/123">
            <div className='gigCard'>
                <img src={item.img} />
                <div className="info">
                    <div className="user">
                        <img src={item.pp} alt="freelancer profile picture" />
                        <span>{item.username}</span>
                    </div>
                    <p>{item.desc}</p>
                    <div className="star">
                        <img src="./../../../public/img/star.png" alt="Stars" />
                        <span>{item.star}</span>
                    </div>
                </div>
                <hr/>
                <div className="details">
                    <img src="../../../public/img/heart.png" alt="heart img" />
                    <div className="price">
                        <span>STARTING AT</span>
                        <h2>${item.price}</h2>
                    </div>
                    
                </div>
                
            </div>
        </link>
    )
}

export default GigCard
