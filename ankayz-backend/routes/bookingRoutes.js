import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { protect } from "../middleware/authMiddleware.js"; // ✅ import here
import Booking from "../models/Booking.js";

const router = express.Router();

// ✅ Ensure upload directories exist
const uploadDirs = ["uploads/images", "uploads/sketches", "uploads/voices"];
uploadDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created missing directory: ${dir}`);
  }
});

// ✅ File Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") cb(null, "uploads/images/");
    else if (file.fieldname === "sketch") cb(null, "uploads/sketches/");
    else if (file.fieldname === "voiceNote") cb(null, "uploads/voices/");
    else cb(new Error("Invalid file field"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${unique}${ext}`);
  },
});

const upload = multer({ storage });

// ✅ Create Booking (requires login)
router.post(
  "/",
  protect, // 🧠 automatically adds req.user
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "sketch", maxCount: 1 },
    { name: "voiceNote", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { styleName, description, date } = req.body;

      const userId = req.user._id; // ✅ automatically taken from JWT

      const image = req.files["image"] ? req.files["image"][0].path : null;
      const sketch = req.files["sketch"] ? req.files["sketch"][0].path : null;
      const voiceNote = req.files["voiceNote"]
        ? req.files["voiceNote"][0].path
        : null;

      const booking = await Booking.create({
        userId,
        styleName,
        description,
        date,
        image,
        sketch,
        voiceNote,
      });

      res.status(201).json({ success: true, booking });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
);

// ✅ Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userId", "name email");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
