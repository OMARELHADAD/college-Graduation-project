import express from "express";
import { deleteUser, getUser, getTopSellers } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.get("/top", getTopSellers); // Public route
router.get("/:id", verifyToken, getUser);

export default router;
