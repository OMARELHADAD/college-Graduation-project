import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  // Try to get token from: 1) cookies, 2) Authorization header, 3) query params
  let token = req.cookies.accessToken;

  // Fallback: Authorization Bearer header (for Postman)
  if (!token && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Fallback: query param (for testing)
  if (!token && req.query.token) {
    token = req.query.token;
  }

  console.log("🔍 DEBUG JWT Middleware:");
  console.log("   Cookies received:", Object.keys(req.cookies));
  console.log("   Auth header:", req.headers.authorization ? "✓ present" : "✗ missing");
  console.log("   Token found:", !!token);

  if (!token) {
    console.log("   ❌ NO TOKEN - returning 401");
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) {
      console.log("   ❌ TOKEN INVALID:", err.message);
      return next(createError(403, "Token is not valid!"));
    }

    console.log("   ✅ TOKEN VALID - User ID:", payload.id);
    req.userId = payload.id;
    req.isSeller = payload.isSeller;

    next();
  });
};
