import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "./ProjectCard.scss"
import { Link } from 'react-router-dom'

const ProjectCard = ({ item }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Data fallbacks similar to GigCard
    const img = item.cover || item.img || "/img/Novatar.png";
    const userImg = item.pp || item.userImg || item.user?.img || "/img/Novatar.png";
    const username = item.username || item.user?.username || "Freelancer";
    const category = item.cat || item.category || "Service";

    return (
        <Link to={`/gig/${item._id}`} className='link'>
            <motion.div
                className='projectCard'
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
            >
                <div className="top" style={{ transform: "translateZ(30px)", height: "70%", width: "100%" }}>
                    <img src={img} alt="project" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div className="info" style={{ transform: "translateZ(20px)", height: "30%", width: "100%" }}>
                    <img src={userImg} alt="profile picture" />
                    <div className="texts">
                        <h2>{category}</h2>
                        <span>{username}</span>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}

export default ProjectCard
