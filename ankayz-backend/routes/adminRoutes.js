import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";
import Booking from "../models/Booking.js";

const router = express.Router();

// Admin-only route
router.get("/bookings", verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "fullname email phone") // ✅ fix field name
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
