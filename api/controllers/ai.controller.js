import axios from "axios";
import createError from "../utils/createError.js";

export const getAiResponse = async (req, res, next) => {
    try {
        const { message } = req.body;

        // Forward request to local Python Flask server
        const response = await axios.post("http://localhost:5000/chat", {
            message
        });

        res.status(200).send(response.data);
    } catch (err) {
        if (err.code === "ECONNREFUSED") {
            return next(createError(503, "AI Service is offline. Please run the Python app."));
        }
        next(err);
    }
};
