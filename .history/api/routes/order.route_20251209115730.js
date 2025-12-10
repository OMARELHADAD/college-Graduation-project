import express from 'express';
import { verifyToken } from "../middleware/jwt.js";
import { createorder, getorders , createPaymentIntent } from '../controllers/order.controller.js';


const router = express.Router();

router.post("/:gigId",verifyToken , createorder);
router.get("/",verifyToken , getorders);
router.post("/create-payment-intent", verifyToken, createPaymentIntent);
export default router;
