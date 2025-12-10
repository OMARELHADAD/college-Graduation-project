import express from "express";
import { getConversations,
     createConversations,
     getSingelConversations,
     updateConversations }
from "../controllers/conversation.controller.js";
import { verifyToken } from "../middleware/jwt.js";
const router = express.Router();

router.get("/",verifyToken, getConversations);
router.post("/",verifyToken, createConversations);
router.get("/Singel/:id",verifyToken, getSingelConversations);
router.put("/:id",verifyToken, updateConversations);

export default router;
