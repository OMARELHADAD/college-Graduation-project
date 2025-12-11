import React from 'react';
import "./Dashboard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Dashboard = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Fetch Orders for Earnings & Activity
    const { isLoading: isLoadingOrders, error: errorOrders, data: orders } = useQuery({
        queryKey: ["orders"],
        queryFn: () => newRequest.get("/api/orders").then((res) => res.data),
    });

    // Fetch Conversations for Unread Messages
    const { isLoading: isLoadingConversations, error: errorConversations, data: conversations } = useQuery({
        queryKey: ["conversations"],
        queryFn: () => newRequest.get("/api/conversations").then((res) => res.data),
    });

    // Calculate Stats
    const totalEarnings = orders?.reduce((acc, order) => acc + order.price, 0) || 0;
    const activeOrders = orders?.filter(o => !o.isCompleted).length || 0;
    const unreadMessages = conversations?.filter(c =>
        (currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer)
    ).length || 0;

    // --- CHART LOGIC ---
    // 1. Initialize days map
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const earningsByDay = new Array(7).fill(0);

    // 2. Aggregate earnings (Last 7 days logic could be added, here we map all orders by day of week)
    orders?.forEach(order => {
        const date = new Date(order.createdAt);
        const dayIndex = date.getDay(); // 0-6 (Sun-Sat)
        earningsByDay[dayIndex] += order.price;
    });

    // 3. Find max for scaling
    const maxEarnings = Math.max(...earningsByDay, 1); // Avoid div by 0

    // --- LEVEL LOGIC ---
    // Targets for Level 2
    const targetOrders = 10;
    const targetEarnings = 1000;

    // Calculate progress
    const ordersProgress = Math.min((orders?.length || 0) / targetOrders * 50, 50); // Max 50% contribution
    const earningsProgress = Math.min(totalEarnings / targetEarnings * 50, 50); // Max 50% contribution
    const totalProgress = Math.floor(ordersProgress + earningsProgress);

    const stats = [
        { title: "Earnings (Net)", value: `$${totalEarnings.toLocaleString()}`, change: "+12%", p: "compared to last month" },
        { title: "Active Orders", value: activeOrders, change: orders?.length > 0 ? "+2" : "0", p: "new orders this week" },
        { title: "Unread Messages", value: unreadMessages, change: unreadMessages > 0 ? "New" : "0", p: "respond within 1 hour" },
    ];

    if (isLoadingOrders || isLoadingConversations) return <div className="dashboard loading">Loading dashboard...</div>;

    return (
        <div className="dashboard">
            <div className="container">
                <div className="dashboard_header">
                    <h1>Welcome back, <span className="highlight">{currentUser?.username || "Seller"}!</span></h1>
                    <p>Here's what's happening with your gigs today.</p>
                </div>

                {/* TOP STATS CARDS */}
                <div className="stats_cards">
                    {stats.map((item, index) => (
                        <div className="card" key={index}>
                            <div className="left">
                                <span className="title">{item.title}</span>
                                <span className="value">{item.value}</span>
                                <span className="sub">{item.p}</span>
                            </div>
                            <div className="right">
                                <span className={`badge ${item.change.includes('+') || item.change === 'New' ? 'positive' : 'neutral'}`}>{item.change}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="main_section">
                    {/* EARNINGS CHART REAL */}
                    <div className="earnings_chart">
                        <div className="chart_header">
                            <h2>Earnings Overview</h2>
                            <select>
                                <option>Weekly</option>
                            </select>
                        </div>
                        <div className="chart_visual">
                            <div className="bar_container">
                                {days.map((day, i) => (
                                    <div className="bar_group" key={i}>
                                        <div
                                            className="bar"
                                            style={{ height: `${(earningsByDay[i] / maxEarnings) * 100}%` }}
                                            title={`$${earningsByDay[i]}`}
                                        ></div>
                                        <span>{day}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* SIDEBAR: LEVEL & ACTIVITY */}
                    <div className="side_panel">
                        <div className="level_card">
                            <div className="level_header">
                                <h3>Seller Level</h3>
                                <span className="current_level">Level 1</span>
                            </div>
                            <div className="progress_container">
                                <div className="progress_bar">
                                    <div className="fill" style={{ width: `${totalProgress}%` }}></div>
                                </div>
                                <span>{totalProgress}/100 to Level 2</span>
                            </div>
                            <ul className="checklist">
                                <li className={orders?.length >= targetOrders ? "done" : ""}>
                                    {orders?.length >= targetOrders ? "✓" : "○"} Complete {targetOrders} Orders ({orders?.length || 0}/{targetOrders})
                                </li>
                                <li className={totalEarnings >= targetEarnings ? "done" : ""}>
                                    {totalEarnings >= targetEarnings ? "✓" : "○"} Earn ${targetEarnings} ({totalEarnings}/{targetEarnings})
                                </li>
                            </ul>
                        </div>

                        <div className="activity_feed">
                            <h3>Recent Orders</h3>
                            <div className="feed">
                                {orders?.slice(0, 5).map((order) => (
                                    <div className="feed_item" key={order._id}>
                                        <img src={order.img || "/img/noavatar.jpg"} alt="" />
                                        <div className="info">
                                            <p><b>{order.buyerId}</b> ordered <b>{order.title}</b></p>
                                            <span>${order.price}</span>
                                        </div>
                                    </div>
                                ))}
                                {orders?.length === 0 && <p style={{ color: 'gray' }}>No recent activity.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
