import React, { useState } from "react";
import "./Community.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Community = () => {
    const [activeTab, setActiveTab] = useState("discussions");

    const discussions = [
        { id: 1, title: "How to price your first Gig correctly?", author: "Sarah Designs", replies: 45, views: 1200, tag: "Tips", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600" },
        { id: 2, title: "Client asking for free revisions - what to do?", author: "MikeDev", replies: 128, views: 3400, tag: "Help", avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600" },
        { id: 3, title: "Showcase: My latest 3D Animation project", author: "AnimMaster", replies: 34, views: 890, tag: "Showcase", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1600" },
        { id: 4, title: "Best tools for remote collaboration in 2024", author: "TechGuru", replies: 89, views: 2100, tag: "Tools", avatar: "https://images.pexels.com/photos/11293709/pexels-photo-11293709.jpeg?auto=compress&cs=tinysrgb&w=1600" },
    ];

    const badges = [
        { title: "Rising Star", icon: "⭐", desc: "Completed 10 orders" },
        { title: "Community Hero", icon: "🦸", desc: "50+ helpful replies" },
        { title: "Galaxy Brain", icon: "🧠", desc: "Top 1% seller" },
    ];

    return (
        <div className="community">
            {/* HERO SECTION WITH PARALLAX-LIKE FEEL */}
            <div className="hero">
                <motion.div
                    className="floating-shape s1"
                    animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="floating-shape s2"
                    animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Skillverse <span className="highlight">Community</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Connect, learn, and grow with freelancers from across the galaxy.
                    </motion.p>
                </div>
            </div>

            <div className="container main-content">
                {/* SIDEBAR - BADGES */}
                <motion.div
                    className="sidebar"
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3>Earn Badges</h3>
                    <div className="badges-grid">
                        {badges.map((badge, i) => (
                            <motion.div
                                className="badge-card"
                                key={i}
                                whileHover={{ scale: 1.05, rotate: 2 }}
                            >
                                <div className="icon">{badge.icon}</div>
                                <div className="info">
                                    <h4>{badge.title}</h4>
                                    <span>{badge.desc}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* MAIN FORUM FEED */}
                <div className="forum-feed">
                    <div className="tabs">
                        <button className={activeTab === "discussions" ? "active" : ""} onClick={() => setActiveTab("discussions")}>Discussions</button>
                        <button className={activeTab === "events" ? "active" : ""} onClick={() => setActiveTab("events")}>Events</button>
                    </div>

                    <div className="threads">
                        {discussions.map((thread, index) => (
                            <motion.div
                                className="thread-card"
                                key={thread.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                            >
                                <div className="left">
                                    <div className="avatar">
                                        <img src={thread.avatar} alt={thread.author} />
                                    </div>
                                    <div className="content">
                                        <span className={`tag ${thread.tag.toLowerCase()}`}>{thread.tag}</span>
                                        <h3>{thread.title}</h3>
                                        <p>Posted by <b>{thread.author}</b></p>
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="stat">
                                        <span>💬</span> {thread.replies}
                                    </div>
                                    <div className="stat">
                                        <span>👁️</span> {thread.views}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community;
