import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";


export const createPaymentIntent = async (req, res, next) => {
}
// Create a new order
export const createorder = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.gigId);
    if (!gig) return next(createError(404, "Gig not found"));

    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: "temporary", // Replace with actual payment intent from payment gateway
    });

    await newOrder.save();
    res.status(201).send("Order has been created.");
  } catch (err) {
    next(err);
  }
};

export const getorders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      $or: [
        { buyerId: req.userId },
        { sellerId: req.userId }
      ]
    });
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};
