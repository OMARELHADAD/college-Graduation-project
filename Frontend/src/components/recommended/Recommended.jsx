import React from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Slide from "../Slide/Slide"; // Ensure casing matches your filesystem (Slide/Slide.jsx)
import ProjectCard from "../projectCard/ProjectCard"; // Or a specific card for recommendations
import "./Recommended.scss";

const Recommended = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ["recommendations"],
        queryFn: () => newRequest.get("/api/recommendations").then((res) => res.data),
        retry: false, // Don't retry if it fails (e.g. 500 error from python)
        refetchOnWindowFocus: false, // Prevent "moving" or refreshing on focus
    });

    if (isLoading || error || !data || data.length === 0) {
        return null; // Render nothing if loading, error, or no recommendations
    }

    return (
        <div className="recommended">
            <div className="container">
                <h1>Recommended for You</h1>
                <Slide slidesToShow={3} arrows={false}>
                    {data.map((card) => (
                        <ProjectCard key={card._id} item={card} />
                    ))}
                </Slide>
            </div>
        </div>
    );
};

export default Recommended;
