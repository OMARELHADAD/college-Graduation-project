import express from 'express';
import { verifyToken } from "../middleware/jwt.js";
import { createorder, getorders } from '../controllers/order.controller.js';


const router = express.Router();

router.post("/:gigId",verifyToken , createorder);
router.get("/",verifyToken , getorders);
export default router;
