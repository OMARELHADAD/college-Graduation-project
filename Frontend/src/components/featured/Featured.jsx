import React from 'react'
import "./featured.scss"
const Featured = () => {
  return (
    <div className='featured'>
        <div className="containe">
            <div className="left">
                <h1>Find the Perfect freelance services for your business</h1>
                <div className="search">
                    <div className="searchInput">
                        <img src="" alt="" />
                        <input type="text" placeholder='Try bulding mobile app' />
                        <button>Search</button>
                    </div>
                </div>
                <div className="popular">
                    <span>Popular:</span>
                    <button>Web Design</button>
                    <button>WordPress</button>
                    <button>Logo Design</button>
                    <button>AI Services</button>
                </div>
            </div>
            <div className="right"></div>
        </div>
    </div>
  )
}

export default Featured
