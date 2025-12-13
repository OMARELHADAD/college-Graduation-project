import axios from "axios";
import createError from "../utils/createError.js";

export const getRecommendations = async (req, res, next) => {
    try {
        // Assuming req.userId comes from verifyToken middleware
        const userId = req.userId;

        const response = await axios.post("http://localhost:5000/recommend", {
            userId: userId
        });

        res.status(200).send(response.data);
    } catch (err) {
        // If Python service is down or errors
        if (err.code === "ECONNREFUSED") {
            // Return empty list gracefully instead of crashing UI
            return res.status(200).send([]);
        }
        next(err);
    }
};
