import React from "react";
import "./Wishlist.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Wishlist = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ["wishlist"],
        queryFn: () =>
            newRequest.get("/api/users/wishlist").then((res) => {
                return res.data;
            }),
    });

    return (
        <div className="wishlist">
            <div className="container">
                <span className="breadcrumbs">Skillverse {">"} Wishlist</span>
                <h1>My Saved Gigs</h1>
                <p>
                    Keep track of the services you love.
                </p>

                <div className="cards">
                    {isLoading
                        ? "loading"
                        : error
                            ? "Something went wrong!"
                            : data?.length === 0 ? "No saved gigs yet." : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
