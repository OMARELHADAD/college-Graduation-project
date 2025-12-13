import React, { useEffect, useRef } from "react";
import "./Leaderboard.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import confetti from "canvas-confetti";

const Leaderboard = () => {
    const canvasRef = useRef(null);

    const { isLoading, error, data } = useQuery({
        queryKey: ["topSellers"],
        queryFn: () =>
            newRequest.get("/api/users/top").then((res) => res.data),
    });

    useEffect(() => {
        if (!canvasRef.current) return;

        // Create a custom confetti instance bound to this canvas
        const myConfetti = confetti.create(canvasRef.current, {
            resize: true,
            useWorker: true
        });

        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        // Infinite, slower, relaxed loop
        const interval = setInterval(function () {
            const particleCount = 40; // Fixed count, no decay

            // Fire from left and right within the canvas
            myConfetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            myConfetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 800); // 0.8 seconds interval

        return () => {
            clearInterval(interval);
            myConfetti.reset(); // Clean up
        };
    }, []);

    return (
        <div className="leaderboard">
            <canvas ref={canvasRef} className="fireworks-canvas" />
            <div className="container">
                <h1>Top Freelancers of the Month 🏆</h1>
                <p className="subtitle">Celebrating our most talented stars based on real performance</p>

                {isLoading ? (
                    <div className="loading">Loading leaderboard...</div>
                ) : error ? (
                    <div className="error">Error loading leaderboard</div>
                ) : (
                    <div className="podium">
                        {data.map((user) => (
                            <div className={`podium-item rank-${user.rank}`} key={user._id}>
                                <div className="crown">
                                    {user.rank === 1 && "👑"}
                                    {user.rank === 2 && "🥈"}
                                    {user.rank === 3 && "🥉"}
                                </div>
                                <div className="avatar-wrapper">
                                    <img src={user.img || "/img/noavatar.jpg"} alt={user.username} />
                                    <div className="rank-badge">{user.rank}</div>
                                </div>
                                <div className="info">
                                    <h2>{user.username}</h2>
                                    <span>{user.specialty}</span>
                                    <div className="stats">
                                        <span>⭐ {user.rating || 0}</span>
                                        <span>•</span>
                                        <span>{user.sales} Sales</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
