import React from 'react'
import './Featured.scss'

const Featured = () => {
  return (
    <div className='featured'>
      <div className="container">
        <div className="left">
          <h1>Find the Perfect <i>freelance</i> services for your business</h1>
          <div className="search">
            <div className="searchInput">
              <img src="/img/search.png" alt="search image" />
              <input type="text" placeholder='Try building mobile app' />
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
        <div className="right">
          <img src="/img/man.png" alt="male human image" />
        </div>
      </div>
    </div>
  )
}

export default Featured
