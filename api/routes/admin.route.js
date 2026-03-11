import express from "express";
import { verifyAdmin } from "../middleware/jwt.js";
import {
  getDashboardStats,
  getUsers,
  deleteUser,
  getGigs,
  deleteGig,
  sendAlert
} from "../controllers/admin.controller.js";

const router = express.Router();

// All admin routes must be protected by verifyAdmin
router.use(verifyAdmin);

// Dashboard stats
router.get("/stats", getDashboardStats);

// Users management
router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);

// Gigs management
router.get("/gigs", getGigs);
router.delete("/gigs/:id", deleteGig);

// Alerts
router.post("/alerts", sendAlert);

export default router;
