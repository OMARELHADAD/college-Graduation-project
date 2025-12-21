import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './GigMatch.scss';
import newRequest from '../../utils/newRequest';

const GigMatch = () => {
    const canvasRef = useRef(null);
    const [nodes, setNodes] = useState([]);
    const [hoveredNode, setHoveredNode] = useState(null);

    useEffect(() => {
        // 1. Initial Data (Simulated for visualization)
        // Ideally this comes from the "recommend/match" API
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Core User Node
        const userNode = { id: 'user', x: centerX, y: centerY, r: 40, color: '#4e54c8', label: 'You' };

        // Generate Random Gig Nodes around
        const gigNodes = Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const dist = 200;
            return {
                id: `gig-${i}`,
                x: centerX + Math.cos(angle) * dist,
                y: centerY + Math.sin(angle) * dist,
                r: 25,
                color: '#8f94fb',
                label: `Gig ${i + 1}`,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            };
        });

        setNodes([userNode, ...gigNodes]);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const render = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Connections
            const user = nodes.find(n => n.id === 'user');
            if (user) {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.lineWidth = 2;
                nodes.forEach(node => {
                    if (node.id !== 'user') {
                        ctx.beginPath();
                        ctx.moveTo(user.x, user.y);
                        ctx.lineTo(node.x, node.y);
                        ctx.stroke();
                    }
                });
            }

            // Update and Draw Nodes
            nodes.forEach(node => {
                if (node.id !== 'user') {
                    // Floating animation
                    node.x += node.vx;
                    node.y += node.vy;
                    // Bounce bounds (loose)
                    if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                    if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
                }

                // Draw Node Circle
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                ctx.shadowBlur = 15;
                ctx.shadowColor = node.color;
                ctx.fill();
                ctx.shadowBlur = 0; // reset

                // Label
                ctx.fillStyle = "#fff";
                ctx.font = "14px Inter";
                ctx.textAlign = "center";
                ctx.fillText(node.label, node.x, node.y + node.r + 20);
            });

            // Hover Effect tooltip (simple text for now)
            if (hoveredNode) {
                ctx.fillStyle = 'rgba(0,0,0,0.8)';
                ctx.fillRect(hoveredNode.x + 20, hoveredNode.y - 40, 150, 50);
                ctx.fillStyle = '#fff';
                ctx.fillText("Match Score: 98%", hoveredNode.x + 95, hoveredNode.y - 20);
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animationFrameId);
    }, [nodes, hoveredNode]);

    // Interaction handlers
    const handleMouseMove = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        const found = nodes.find(n => {
            const dist = Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2);
            return dist < n.r;
        });
        setHoveredNode(found || null);
    };

    return (
        <div className="gig-match-page">
            <h1 className="title">AI Gig Matcher</h1>
            <p className="subtitle">Visualizing your perfect freelance connections</p>
            <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
            />
        </div>
    );
};

export default GigMatch;
