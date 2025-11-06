import Booking from "../models/Booking.js";
import mongoose from "mongoose";

/**
 * 🟢 Add Booking
 * Method: POST /api/bookings
 */
export const addBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      userId: req.body.userId || req.user?._id, // Support manual or authenticated user
    });
    res.status(201).json({
      message: "Booking added successfully ✅",
      booking,
    });
  } catch (error) {
    console.error("Add Booking Error:", error);
    res.status(400).json({
      message: "Failed to add booking ❌",
      error: error.message,
    });
  }
};

/**
 * 🟢 Get All Bookings
 * Method: GET /api/bookings
 */
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "fullname email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Bookings fetched successfully ✅",
      bookings,
    });
  } catch (error) {
    console.error("Get Bookings Error:", error);
    res.status(500).json({
      message: "Failed to fetch bookings ❌",
      error: error.message,
    });
  }
};

/**
 * 🟢 Edit Booking
 * Method: PATCH /api/bookings/:id
 */
export const editBooking = async (req, res) => {
  try {

    const { id } = req.params;
    const updates = { ...req.body };

    // ✅ Always replace userId with the one from the token (protect middleware)
    if (req.user && req.user._id) {
      updates.userId = req.user._id;
    } else {
      delete updates.userId; // if no user found, just remove it
    }

    const updatedBooking = await Booking.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      success: true,
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Edit Booking Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};


/**
 * 🟢 Delete Booking
 * Method: DELETE /api/bookings/:id
 */
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid booking ID" });

    const booking = await Booking.findByIdAndDelete(id);
    if (!booking)
      return res.status(404).json({ message: "Booking not found ❌" });

    res.status(200).json({ message: "Booking deleted successfully ✅" });
  } catch (error) {
    console.error("Delete Booking Error:", error);
    res.status(400).json({
      message: "Failed to delete booking ❌",
      error: error.message,
    });
  }
};
