import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import aiRoute from "./routes/ai.route.js"; // New Import
import adminRoute from "./routes/admin.route.js"; // New Admin Route
import cookieParser from "cookie-parser";
import cors from "cors";
import recommendationRoute from "./routes/recommendation.route.js";





dotenv.config();

const app = express();
app.use(express.json());
mongoose.set("strictQuery", true);


const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongoDB");
  } catch (error) {
    console.log(error);
  }
};
// Allow dev servers on common Vite ports (5173/5174). Use array so both origins work.
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5175"], credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/ai", aiRoute); // New Route
app.use("/api/recommendations", recommendationRoute); // New Route
app.use("/api/admin", adminRoute); // New Admin Route

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack, // ده اللي يظهر تفاصيل الغلط
  });
});


import { Server } from "socket.io";
import http from "http";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5175"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  // console.log("A user connected: " + socket.id);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  socket.on("send_message", (data) => {
    // Broadcast to everyone in the room INCLUDING sender (for simplicity in this app's logic)
    // or typically to others. existing app might assume optimistic update.
    // Let's broadcast to the room.
    const { conversationId } = data;
    io.to(conversationId).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    // console.log("User disconnected");
  });
});

server.listen(8800, () => {
  connect();
  console.log("Backend server is running with Socket.io!");
});


