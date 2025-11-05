import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./User.js"; // adjust path if needed

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB ✅");

    // Define admin credentials
    const adminData = {
      fullname: "Ankayz",
      email: "ankayzadmin@gmail.com",
      password: "Ankayz@2025", // You can change this
      role: "admin",
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists with that email.");
      process.exit();
    }

    // Create admin
    const admin = await User.create(adminData);
    console.log(" Admin created successfully:");
    console.log({
      fullname: admin.fullname,
      email: admin.email,
      password: adminData.password,
      role: admin.role,
    });

    process.exit();
  } catch (error) {
    console.error(" Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
