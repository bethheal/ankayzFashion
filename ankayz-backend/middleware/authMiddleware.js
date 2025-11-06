import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Fetch user from DB (optional but safer)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ Attach user to request
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
// ✅ Allow only admins to proceed
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // proceed
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied — Admins only",
    });
  }
};
