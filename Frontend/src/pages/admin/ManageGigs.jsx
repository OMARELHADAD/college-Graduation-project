import React, { useEffect, useState } from "react";
import "./ManageGigs.scss";
import newRequest from "../../utils/newRequest";
import { Link } from "react-router-dom";

const ManageGigs = () => {
    const [gigs, setGigs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchGigs();
    }, []);

    const fetchGigs = async () => {
        try {
            const res = await newRequest.get("/api/admin/gigs");
            setGigs(res.data);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to forcibly delete this gig?")) return;
        try {
            await newRequest.delete(`/api/admin/gigs/${id}`);
            setGigs(gigs.filter(g => g._id !== id));
        } catch (err) {
            console.error(err);
            alert("Error deleting gig");
        }
    };

    if (isLoading) return <div className="manageGigs">Loading gigs...</div>;

    return (
        <div className="manageGigs">
            <div className="container">
                <h1>Manage All Gigs</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Sales</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gigs.map(gig => (
                            <tr key={gig._id}>
                                <td>
                                    <img className="gigImg" src={gig.cover} alt="" />
                                </td>
                                <td>
                                    <Link to={`/gig/${gig._id}`} className="gigLink">
                                        {gig.title.length > 50 ? gig.title.substring(0, 50) + "..." : gig.title}
                                    </Link>
                                </td>
                                <td>${gig.price}</td>
                                <td>{gig.sales}</td>
                                <td>
                                    <button className="deleteBtn" onClick={() => handleDelete(gig._id)}>
                                        Delete Gig
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageGigs;
