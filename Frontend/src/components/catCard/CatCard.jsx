import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "./CatCard.scss"
import { Link } from 'react-router-dom'

const CatCard = ({ item }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

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

    return (
        <Link to={`/gigs?cat=${item.cat}`}>
            <motion.div
                className='catCard'
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
            >
                <div style={{ transform: "translateZ(50px)" }}>
                    <img src={item.img} alt="" />
                    <span className='desc'>{item.desc}</span>
                    <span className="title">{item.title}</span>
                </div>
            </motion.div>
        </Link>
    )
}

export default CatCard
