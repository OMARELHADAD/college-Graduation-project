import React from "react";
import "./Profile.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
    const { id } = useParams();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const navigate = useNavigate();

    const { isLoading: isLoadingUser, error: errorUser, data: userData } = useQuery({
        queryKey: ["user", id],
        queryFn: () =>
            newRequest.get(`/api/users/${id}`).then((res) => {
                return res.data;
            }),
    });

    const { isLoading: isLoadingGigs, error: errorGigs, data: gigsData } = useQuery({
        queryKey: ["gigs", id],
        queryFn: () =>
            newRequest.get(`/api/gigs?userId=${id}`).then((res) => {
                return res.data;
            }),
    });

    const handleContact = async () => {
        if (!currentUser) {
            navigate("/login");
            return;
        }

        const sellerId = userData._id;
        const buyerId = currentUser._id;
        const id = sellerId + buyerId;

        try {
            const res = await newRequest.get(`/api/conversations/single/${id}`);
            navigate(`/message/${res.data.id}`);
        } catch (err) {
            if (err.response.status === 404) {
                const res = await newRequest.post(`/api/conversations/`, {
                    to: currentUser.isSeller ? buyerId : sellerId,
                });
                navigate(`/message/${res.data.id}`);
            }
        }
    };

    return (
        <div className="profile">
            {isLoadingUser ? (
                "Loading..."
            ) : errorUser ? (
                "User not found!"
            ) : (
                <div className="container">
                    <div className="profile-header">
                        <div className="left">
                            <img
                                src={userData.img || "/img/noavatar.jpg"}
                                alt=""
                                className="avatar"
                            />
                            <div className="info">
                                <h1>{userData.username}</h1>
                                <span className="tag">@{userData.username}</span>
                                <div className="stats">
                                    <span>📍 {userData.country}</span>
                                    <span>Member since {new Date(userData.createdAt).getFullYear()}</span>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            {/* Only show Contact button if viewing someone else's profile */}
                            {currentUser?._id !== userData._id && (
                                <button onClick={handleContact}>Contact Me</button>
                            )}
                        </div>
                    </div>

                    <div className="about-section">
                        <h2>About Me</h2>
                        <p>{userData.desc || "No description provided."}</p>

                        <div className="skills">
                            <div className="item">
                                <span className="title">Email</span>
                                <span className="desc">{userData.email}</span>
                            </div>
                            {userData.phone && (
                                <div className="item">
                                    <span className="title">Phone</span>
                                    <span className="desc">{userData.phone}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="user-gigs">
                        <h2>My Gigs</h2>
                        <div className="cards">
                            {isLoadingGigs
                                ? "loading"
                                : errorGigs
                                    ? "Something went wrong!"
                                    : gigsData?.length === 0 ? "No active gigs." : gigsData.map((gig) => <GigCard key={gig._id} item={gig} />)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
