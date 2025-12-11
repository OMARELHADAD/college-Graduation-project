import React, { useRef } from "react";
import "./Business.scss";
import { motion, useScroll, useTransform } from "framer-motion";

const Business = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    const teamMembers = [
        {
            name: "Omar Elhadad",
            role: "Front-End Developer",
            initials: "OE",
            desc: "Crafting immersive user experiences and pixel-perfect interfaces with React."
        },
        {
            name: "Zyad Elhosiny",
            role: "Back-End Developer",
            initials: "ZE",
            desc: "Architecting robust, scalable server solutions and secure API ecosystems."
        },
        {
            name: "Mahmoud Khedr",
            role: "Data Analyst & AI",
            initials: "MK",
            desc: "Powering intelligent features and insights with advanced machine learning models."
        },
        {
            name: "Rahma Ahmed",
            role: "UI & UX Designer",
            initials: "RA",
            desc: "Designing intuitive, user-centric flows and beautiful visual systems."
        },
        {
            name: "Zyad Nagdy",
            role: "UI & UX Designer",
            initials: "ZN",
            desc: "Creating accessible, engaging digital interactions and brand aesthetics."
        },
    ];

    const supervisors = [
        { name: "Dr. Reham Eisaa", role: "Professor", initials: "DR", desc: "Providing academic guidance and strategic project oversight." },
        { name: "Dr. Amira Elattar", role: "Professor", initials: "DA", desc: "Expert mentorship in software engineering principles." },
        { name: "Eng. Sally Abdelrazerk", role: "Co-Professor", initials: "ES", desc: "Technical supervision and development workflow support." },
    ];

    return (
        <div className="business">
            {/* HERO SECTION */}
            <motion.div
                ref={targetRef}
                style={{ opacity, scale }}
                className="hero"
            >
                <div className="particles">
                    <div className="orb orb-1"></div>
                    <div className="orb orb-2"></div>
                    <div className="orb orb-3"></div>
                </div>

                <div className="hero-content">
                    <motion.h1
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        Upgrade your <span className="gradient-text">Workforce</span>
                    </motion.h1>

                    <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        Skillverse Business provides an end-to-end freelancer management platform designed for scale.
                    </motion.p>

                    <motion.div
                        className="hero-btns"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <button className="primary">Get Started</button>
                        <button className="secondary">Book a Demo</button>
                    </motion.div>
                </div>
            </motion.div>

            {/* STATS */}
            <div className="stats">
                <div className="container">
                    {[
                        { label: "Freelancers", value: "2M+" },
                        { label: "Companies", value: "100K+" },
                        { label: "Satisfaction", value: "99.9%" },
                        { label: "Projects Done", value: "50M+" }
                    ].map((stat, i) => (
                        <motion.div
                            className="stat-item"
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="gradient-text">{stat.value}</h3>
                            <p>{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* SOLUTIONS SCROLL */}
            <div className="solutions">
                <div className="container">
                    <div className="section-header">
                        <h2>Enterprise Solutions</h2>
                        <p>Advanced tools to manage your teams, payments, and workflow in one place.</p>
                    </div>

                    {[
                        {
                            title: "Talent Management",
                            desc: "Organize your freelancers into teams. Assign managers, track budgets, and approve work with our advanced dashboard.",
                            badge: "Organization",
                            icon: "👥",
                            color: "#4e54c8"
                        },
                        {
                            title: "Secure Payments",
                            desc: "One Invoice for all your freelancers. We handle the compliance, tax forms, and payouts to over 160 countries.",
                            badge: "Finance",
                            icon: "💳",
                            color: "#2ecc71"
                        },
                        {
                            title: "Vetted Professionals",
                            desc: "Access the top 1% of talent on Skillverse. Our expert recruiters match you with the perfect candidate within 24 hours.",
                            badge: "Quality",
                            icon: "⭐",
                            color: "#ff00cc"
                        }
                    ].map((solution, i) => (
                        <motion.div
                            className="solution-card"
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            <div className="info">
                                <span className="badge">{solution.badge}</span>
                                <h3>{solution.title}</h3>
                                <p>{solution.desc}</p>
                                <ul>
                                    <li><img src="/img/check.png" alt="" /> Enterprise-grade security</li>
                                    <li><img src="/img/check.png" alt="" /> 24/7 Priority Support</li>
                                </ul>
                            </div>
                            <div className="feature-visual" style={{ background: `linear-gradient(135deg, ${solution.color}22 0%, ${solution.color}11 100%)`, borderColor: `${solution.color}44` }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '80px', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.2))' }}>
                                    {solution.icon}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* TEAM SECTION (NEW) */}
            <div className="team">
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Meet the Minds Behind <span className="gradient-text">Skillverse</span>
                    </motion.h2>

                    {/* First Row: 3 Members (Devs & AI) */}
                    <div className="team-grid" style={{ marginBottom: '40px' }}>
                        {teamMembers.slice(0, 3).map((member, i) => (
                            <motion.div
                                className="team-card"
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ y: -10 }}
                                transition={{ delay: i * 0.1, duration: 0.3 }}
                                viewport={{ once: true }}
                            >
                                <div className="avatar">{member.initials}</div>
                                <h3>{member.name}</h3>
                                <p>{member.role}</p>
                                <div className="role-desc">{member.desc}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Second Row: 2 Members (Designers) */}
                    <div className="team-grid" style={{ marginBottom: '60px' }}>
                        {teamMembers.slice(3, 5).map((member, i) => (
                            <motion.div
                                className="team-card"
                                key={i + 3}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ y: -10 }}
                                transition={{ delay: (i + 3) * 0.1, duration: 0.3 }}
                                viewport={{ once: true }}
                            >
                                <div className="avatar">{member.initials}</div>
                                <h3>{member.name}</h3>
                                <p>{member.role}</p>
                                <div className="role-desc">{member.desc}</div>
                            </motion.div>
                        ))}
                    </div>
                    <motion.h3
                        style={{ textAlign: 'center', fontSize: '32px', marginBottom: '40px', fontWeight: '700' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Under the Supervision of
                    </motion.h3>

                    <div className="team-grid" style={{ justifyContent: 'center' }}>
                        {supervisors.map((member, i) => (
                            <motion.div
                                className="team-card"
                                key={`sup-${i}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ y: -10 }}
                                transition={{ delay: i * 0.1, duration: 0.3 }}
                                viewport={{ once: true }}
                                style={{ borderColor: 'rgba(255,215,0,0.3)' }}
                            >
                                <div className="avatar" style={{ background: 'linear-gradient(135deg, #ffd700, #fdb931)' }}>{member.initials}</div>
                                <h3>{member.name}</h3>
                                <p style={{ color: '#ffd700' }}>{member.role}</p>
                                <div className="role-desc">{member.desc}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="cta">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                >
                    <h2>Ready to <span className="gradient-text">scale?</span></h2>
                    <button>Contact Sales</button>
                </motion.div>
            </div>
        </div>
    );
};

export default Business;
