import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CosmicCursor = () => {
    const [trails, setTrails] = useState([]);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 700 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Add a new trail particle
            const newTrail = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
            };

            setTrails((prev) => [...prev.slice(-15), newTrail]); // Keep last 15 particles
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    useEffect(() => {
        // Cleanup old trails
        const interval = setInterval(() => {
            setTrails((prev) => prev.filter((t) => Date.now() - t.id < 500));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <motion.div
                className="cursor-main"
                style={{
                    translateX: springX,
                    translateY: springY,
                }}
            />
            {trails.map((trail, index) => (
                <motion.div
                    key={trail.id}
                    className="cursor-trail"
                    initial={{ opacity: 0.8, scale: 0.5 }}
                    animate={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        left: trail.x,
                        top: trail.y,
                    }}
                />
            ))}
            <style>{`
        .cursor-main {
          position: fixed;
          top: -8px; 
          left: -8px;
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          box-shadow: 0 0 10px var(--accent-color), 0 0 20px var(--accent-hover);
        }
        .cursor-trail {
          position: fixed;
          width: 8px;
          height: 8px;
          background: var(--accent-color);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 5px var(--accent-hover);
        }
      `}</style>
        </>
    );
};

export default CosmicCursor;
