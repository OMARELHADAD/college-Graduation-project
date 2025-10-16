import React, {  useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Navbar.scss";
import { useState } from 'react'; 


function Navbar() {
    const[active,setActive]=useState(false);
    const[open,setOpen]=useState(false);

    const {pathname}=useLocation();

    const isActive=()=>{
        window.scrollY>0 ? setActive(true) : setActive(false);
    }

    useEffect(()=>{
        window.addEventListener("scroll",isActive);
        
        return()=>{
            window.removeEventListener("scroll",isActive);
        };
    },[]);


    const currentUser={
        id:1,
        username:"asmaa ali",
        isSeller:true
    };

    return ( 
        <div className={active || pathname!=="/" ? "navbar active" : "navbar"}>
            <div className="container">
                <div className="logo">
                    <Link to="/" className='link'>
                    <span className='text'>Skillverse</span>
                    </Link>
                    <span className='dot'>.</span>
                </div>
                <div className="links">
                    <span>Skillverse Business</span>
                    <span>Explore</span>
                    <span>English</span>
                    <span>Sign in</span>
                    {!currentUser?.isSeller && <span>Become a seller</span>}
                    {!currentUser && <button>Join</button>}
                    {currentUser && (
                        <div className="user" onClick={()=>setOpen(!open)} >
                            <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="user picture" />
                            <span>{currentUser?.username}</span>
                            {open && <div className="options">
                                {currentUser?.isSeller && (
                                    <>
                                    <Link className='link' to="/mygigs">Gigs</Link >
                                    <Link className='link' to="/add" >Add New Gig</Link >
                                    </>
                                )}
                                <Link className='link' to="/orders">Orders</Link >
                                <Link className='link' to="/messages">Messages</Link >
                                <Link className='link' to="/">Logout</Link >
                            </div>}
                    </div>
                    )}
                </div>
            </div>
                {( active || pathname!=="/") &&(
                <>
                    <hr />
                    <div className="menu">
                        <span>t1</span>
                        <span>t2</span>
                    </div>
                </>
                )}
            </div>
    );
}

export default Navbar;