import express from "express";
import multer from "multer";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  addBooking,
  getBookings,
  editBooking,
  deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();
const upload = multer(); 

router.get("/bookings", protect, adminOnly, getBookings);
router.delete("/bookings/:id", protect, adminOnly, deleteBooking);
router.post("/bookings", upload.any(), protect, adminOnly, addBooking);
router.patch("/bookings/:id", upload.any(), protect, adminOnly, editBooking);

export default router;
