import axios from "axios";
import createError from "../utils/createError.js";

export const getAiResponse = async (req, res, next) => {
    try {
        console.log("DEBUG: AI Controller hit. Body:", req.body);
        const { message } = req.body;

        // Forward request to local Python Flask server
        console.log("DEBUG: Sending to Python at http://127.0.0.1:5000/chat");
        const response = await axios.post("http://127.0.0.1:5000/chat", {
            message
        });
        console.log("DEBUG: Python response received");

        res.status(200).send(response.data);
    } catch (err) {
        console.error("DEBUG: AI Controller Error:", err.message);
        if (err.code) console.error("DEBUG: Error Code:", err.code);
        if (err.code === "ECONNREFUSED") {
            return next(createError(503, "AI Service is offline. Please run the Python app."));
        }
        next(err);
    }
};
