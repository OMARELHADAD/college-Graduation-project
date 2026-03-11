import React, { useEffect, useState } from "react";
import "./AdminDashboard.scss";
import newRequest from "../../utils/newRequest";
import { Link, useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ users: 0, gigs: 0, orders: 0, totalSales: 0, chartData: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await newRequest.get("/api/admin/stats");
                setStats(res.data);
                setIsLoading(false);
            } catch (err) {
                if (err.response?.status === 403) {
                    navigate("/"); // Prevent non-admins from staying on this view
                }
                setError(err.response?.data?.message || "Something went wrong fetching stats");
                setIsLoading(false);
            }
        };
        fetchStats();
    }, [navigate]);

    if (isLoading) return <div className="adminDashboard">Loading dashboard...</div>;
    if (error) return <div className="adminDashboard error">{error}</div>;

    return (
        <div className="adminDashboard">
            <div className="container">
                <h1>Admin Dashboard</h1>
                <div className="statsCards">
                    <div className="card">
                        <h2>Total Users</h2>
                        <span className="count">{stats.users}</span>
                        <Link to="/admin/users" className="cardLink">Manage Users &gt;</Link>
                    </div>
                    <div className="card">
                        <h2>Total Gigs</h2>
                        <span className="count">{stats.gigs}</span>
                        <Link to="/admin/gigs" className="cardLink">Manage Gigs &gt;</Link>
                    </div>
                    <div className="card">
                        <h2>Total Orders</h2>
                        <span className="count">{stats.orders}</span>
                    </div>
                    <div className="card salesCard">
                        <h2>Total Sales</h2>
                        <span className="count">${stats.totalSales?.toFixed(2) || "0.00"}</span>
                    </div>
                </div>

                <div className="chartContainer">
                    <h2>Platform User Growth</h2>
                    {stats.chartData && stats.chartData.length > 0 ? (
                        <div className="chartWrapper">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats.chartData}
                                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#1dbf73" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#1dbf73" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="users" stroke="#1dbf73" fillOpacity={1} fill="url(#colorUsers)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <p className="noData">No chart data available yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
