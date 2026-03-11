import User from "../models/user.model.js";
import Gig from "../models/gig.model.js";
import Alert from "../models/alert.model.js";
import Order from "../models/order.model.js";
import createError from "../utils/createError.js";

// GET basic metrics for dashboard
export const getDashboardStats = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments();
    const gigCount = await Gig.countDocuments();
    const orderCount = await Order.countDocuments();
    
    // Calculate total sales from completed orders
    const completedOrders = await Order.find({ isCompleted: true });
    const totalSales = completedOrders.reduce((sum, order) => sum + (order.price || 0), 0);

    // Prepare chart data (e.g. users joined in the last 6 months)
    const users = await User.find().select("createdAt").sort({ createdAt: 1 });
    
    // Group users by month
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const userRegistrations = {};

    users.forEach(user => {
      const date = new Date(user.createdAt);
      const monthYear = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      if (!userRegistrations[monthYear]) {
        userRegistrations[monthYear] = 0;
      }
      userRegistrations[monthYear]++;
    });

    // Convert to array format required by Recharts
    const chartData = Object.keys(userRegistrations).map(key => ({
      name: key,
      users: userRegistrations[key]
    }));

    res.status(200).json({
      users: userCount,
      gigs: gigCount,
      orders: orderCount,
      totalSales: totalSales,
      chartData: chartData
    });
  } catch (err) {
    next(err);
  }
};

// GET all users
export const getUsers = async (req, res, next) => {
  try {
    // Excluding passwords for safety
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// DELETE a user
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Prevent deleting oneself
    if (id === req.userId) {
      return next(createError(403, "Admins cannot delete their own account from the dashboard."));
    }
    
    await User.findByIdAndDelete(id);
    
    // Optionally: also delete user's gigs, alerts, orders, etc.
    await Gig.deleteMany({ userId: id });
    await Alert.deleteMany({ userId: id });

    res.status(200).send("User has been deleted.");
  } catch (err) {
    next(err);
  }
};

// GET all gigs
export const getGigs = async (req, res, next) => {
  try {
    const gigs = await Gig.find().sort({ createdAt: -1 });
    res.status(200).json(gigs);
  } catch (err) {
    next(err);
  }
};

// DELETE a gig
export const deleteGig = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Gig.findByIdAndDelete(id);
    res.status(200).send("Gig has been deleted.");
  } catch (err) {
    next(err);
  }
};

// POST send an alert to a user
export const sendAlert = async (req, res, next) => {
  try {
    const { userId, title, message } = req.body;
    
    if (!userId || !title || !message) {
      return next(createError(400, "userId, title, and message are required."));
    }

    const newAlert = new Alert({
      userId,
      title,
      message
    });

    await newAlert.save();
    res.status(201).json(newAlert);
  } catch (err) {
    next(err);
  }
};
