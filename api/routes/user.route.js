import express from "express";
import { deleteUser, getUser, getTopSellers, updateUser, saveGig, getWishlist } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.put("/save", verifyToken, saveGig);
router.get("/wishlist", verifyToken, getWishlist);
router.get("/top", getTopSellers); // Public route

router.delete("/:id", verifyToken, deleteUser);
router.put("/:id", verifyToken, updateUser);
router.get("/:id", verifyToken, getUser);

export default router;
