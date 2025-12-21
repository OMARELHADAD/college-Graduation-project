import axios from "axios";
import createError from "../utils/createError.js";

import Gig from "../models/gig.model.js";

export const getRecommendations = async (req, res, next) => {
    try {
        const userId = req.userId;
        let recommendations = [];

        try {
            // 1. Try AI Service
            const response = await axios.post("http://localhost:5000/recommend", {
                userId: userId
            });
            recommendations = response.data;
        } catch (aiError) {
            console.warn("AI Service unavailable or failed:", aiError.message);
            // Continue to fallback
        }

        // 2. Fallback: If AI returned empty or failed, get top rated gigs
        if (!recommendations || recommendations.length === 0) {
            // Fetch top 5 gigs with highest rating
            recommendations = await Gig.find().sort({ totalStars: -1 }).limit(4);
        }

        res.status(200).send(recommendations);
    } catch (err) {
        next(err);
    }
};
