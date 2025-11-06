import express from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();
const router = express.Router();

// ✅ Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Helper to generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// 📝 SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    const user = await User.create({ fullname, email, password, role: "client" });

    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// 🔐 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// 🔁 FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User with this email not found" });

    // Generate reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const htmlContent = `
      <h3>Password Reset Request</h3>
      <p>Hello ${user.fullname},</p>
      <p>You requested a password reset. Click below to reset it:</p>
      <a href="${resetURL}" target="_blank" style="color:#1D4ED8;">${resetURL}</a>
      <p>This link will expire in 10 minutes.</p>
    `;

    // ✅ Send email via Resend
    await resend.emails.send({
      from: "NectRural Support <onboarding@resend.dev>",
      to: user.email,
      subject: "Password Reset Request",
      html: htmlContent,
    });

    res.status(200).json({ message: "Reset link sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email", error });
  }
});

// 🔒 RESET PASSWORD
router.post("/reset-password/:token", async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Token is invalid or has expired" });

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
