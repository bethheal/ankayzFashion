import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addBooking,
  getBookings,
  editBooking,
  deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

// 🟢 Public/User routes
router.post("/", protect, addBooking);
router.get("/", protect, getBookings);
router.patch("/:id", protect, editBooking);
router.delete("/:id", protect, deleteBooking);

export default router;
