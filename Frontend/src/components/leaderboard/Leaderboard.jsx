import React from "react";
import "./Leaderboard.scss";

// Mock data for Top 3 Freelancers (since we don't have a dedicated endpoint yet)
// In a real scenario, this would come from an API key like /users?top=true
const topFreelancers = [
    {
        id: 1,
        username: "Anna Bell",
        img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600",
        sales: 1542,
        rating: 5.0,
        specialty: "AI Artist",
        rank: 1,
    },
    {
        id: 2,
        username: "Lannie Coleman",
        img: "https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=1600",
        sales: 1205,
        rating: 4.9,
        specialty: "Character Design",
        rank: 2,
    },
    {
        id: 3,
        username: "Carol Steve",
        img: "https://images.pexels.com/photos/1062280/pexels-photo-1062280.jpeg?auto=compress&cs=tinysrgb&w=1600",
        sales: 980,
        rating: 4.8,
        specialty: "Motion Graphics",
        rank: 3,
    },
];

const Leaderboard = () => {
    return (
        <div className="leaderboard">
            <div className="container">
                <h1>Top Freelancers of the Month 🏆</h1>
                <p className="subtitle">Celebrating our most talented stars</p>

                <div className="podium">
                    {topFreelancers.map((user) => (
                        <div className={`podium-item rank-${user.rank}`} key={user.id}>
                            <div className="crown">
                                {user.rank === 1 && "👑"}
                                {user.rank === 2 && "🥈"}
                                {user.rank === 3 && "🥉"}
                            </div>
                            <div className="avatar-wrapper">
                                <img src={user.img} alt={user.username} />
                                <div className="rank-badge">{user.rank}</div>
                            </div>
                            <div className="info">
                                <h2>{user.username}</h2>
                                <span>{user.specialty}</span>
                                <div className="stats">
                                    <span>⭐ {user.rating}</span>
                                    <span>•</span>
                                    <span>{user.sales} Sales</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
