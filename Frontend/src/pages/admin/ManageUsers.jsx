import React, { useEffect, useState } from "react";
import "./ManageUsers.scss";
import newRequest from "../../utils/newRequest";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [alertData, setAlertData] = useState({ visible: false, userId: null, title: "", message: "" });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await newRequest.get("/api/admin/users");
            setUsers(res.data);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await newRequest.delete(`/api/admin/users/${id}`);
            setUsers(users.filter(u => u._id !== id));
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Error deleting user");
        }
    };

    const handleSendAlert = async (e) => {
        e.preventDefault();
        try {
            await newRequest.post("/api/admin/alerts", {
                userId: alertData.userId,
                title: alertData.title,
                message: alertData.message
            });
            alert("Alert sent successfully!");
            setAlertData({ visible: false, userId: null, title: "", message: "" });
        } catch (err) {
            console.error(err);
            alert("Error sending alert");
        }
    };

    if (isLoading) return <div className="manageUsers">Loading users...</div>;

    return (
        <div className="manageUsers">
            <div className="container">
                <h1>Manage Users</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Country</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.isAdmin ? <span className="adminBadge">Admin</span> : ""}
                                    {user.isSeller ? <span className="sellerBadge">Seller</span> : "Buyer"}
                                </td>
                                <td>{user.country}</td>
                                <td>
                                    <button 
                                        className="alertBtn" 
                                        onClick={() => setAlertData({ visible: true, userId: user._id, title: "", message: "" })}
                                    >
                                        Send Alert
                                    </button>
                                    <button className="deleteBtn" onClick={() => handleDelete(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {alertData.visible && (
                    <div className="modal">
                        <div className="modalContent">
                            <h2>Send Alert to User</h2>
                            <form onSubmit={handleSendAlert}>
                                <label>Title</label>
                                <input 
                                    type="text" 
                                    required
                                    value={alertData.title}
                                    onChange={(e) => setAlertData({...alertData, title: e.target.value})}
                                />
                                <label>Message</label>
                                <textarea 
                                    required
                                    rows="4"
                                    value={alertData.message}
                                    onChange={(e) => setAlertData({...alertData, message: e.target.value})}
                                ></textarea>
                                <div className="modalActions">
                                    <button type="submit" className="submitBtn">Send</button>
                                    <button type="button" className="cancelBtn" onClick={() => setAlertData({ visible: false, userId: null, title: "", message: "" })}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
