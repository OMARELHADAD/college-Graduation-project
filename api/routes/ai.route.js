import express from "express";
import { getAiResponse } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/", getAiResponse);

export default router;
