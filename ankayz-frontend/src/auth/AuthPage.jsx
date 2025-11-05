import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../auth/AuthProvider";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import api from "../../config/api";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const { fullname, email, phone, password, confirmPassword } = formData;

    if (isSignUp) {
      if (!fullname || !email || !phone || !password || !confirmPassword)
        return "All fields are required";

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return "Invalid email format";

      if (!/^\d{10}$/.test(phone)) return "Phone number must be 10 digits";

      if (password.length < 6) return "Password must be at least 6 characters";

      if (password !== confirmPassword) return "Passwords do not match";
    } else {
      if (!email || !password) return "Email and password are required";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) return toast.error(error);

    setLoading(true);
    try {
      if (isSignUp) {
        await api.post("/auth/signup", formData);
        toast.success("Signup successful. You can now log in.");
        setIsSignUp(false);
      } else {
        const res = await api.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        // Store token and user info
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        login(res.data);

        toast.success("Login successful!");
        setTimeout(() => {
          if (res.data.role === "admin") {
            navigate("/designer"); // Admin page
          } else {
            navigate("/book"); // Regular user page
          }
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message || "Something went wrong. Try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };


  
  // ✅ Render Page
  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--bg-light)] font-sans">
      <Toaster position="top-right" />

      <div className="relative w-[900px] h-[550px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* LOGIN FORM */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center items-center px-10 transition-all duration-700 ease-in-out ${
            isSignUp
              ? "translate-x-full opacity-0 z-10"
              : "translate-x-0 opacity-100 z-20"
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 text-[var(--text-dark)]">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border border-[var(--border-light)] p-3 rounded-md outline-none focus:ring-2 focus:ring-[var(--ankayz-pink)]"
            />

            {/* Password with Eye Toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="border border-[var(--border-light)] p-3 rounded-md outline-none w-full focus:ring-2 focus:ring-[var(--ankayz-pink)] pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-2 text-gray-500"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--ankayz-pink)] text-white py-3 rounded-md font-semibold hover:bg-[#d81b60] transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        {/* SIGN UP FORM */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center items-center px-10 transition-all duration-700 ease-in-out ${
            isSignUp
              ? "translate-x-full opacity-100 z-20"
              : "translate-x-0 opacity-0 z-10"
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 text-[var(--text-dark)]">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              className="border border-[var(--border-light)] p-3 rounded-md outline-none focus:ring-2 focus:ring-[var(--ankayz-pink)]"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border border-[var(--border-light)] p-3 rounded-md outline-none focus:ring-2 focus:ring-[var(--ankayz-pink)]"
            />
            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="border border-[var(--border-light)] p-3 rounded-md outline-none focus:ring-2 focus:ring-[var(--ankayz-pink)]"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="border border-[var(--border-light)] p-3 rounded-md outline-none w-full focus:ring-2 focus:ring-[var(--ankayz-pink)] pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-2 text-gray-500"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border border-[var(--border-light)] p-3 rounded-md outline-none w-full focus:ring-2 focus:ring-[var(--ankayz-pink)] pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute right-2 top-2 text-gray-500"
              >
                {showConfirm ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--ankayz-pink)] text-white py-3 rounded-md font-semibold hover:bg-[#d81b60] transition disabled:opacity-50"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </div>

        {/* PINK OVERLAY PANEL */}
        <motion.div
          className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-[var(--ankayz-pink)] to-[#f06292] text-white flex flex-col justify-center items-center text-center"
          animate={{
            x: isSignUp ? 0 : 450,
            y: isSignUp ? 0 : -15,
          }}
          initial={false}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 15,
            duration: 0.8,
          }}
        >
          <AnimatePresence mode="wait">
            {isSignUp ? (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: -80, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 80, y: -20 }}
                transition={{ duration: 0.7 }}
                className="p-10"
              >
                <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
                <p className="mb-6">
                  To stay connected, please log in with your personal info.
                </p>
                <button
                  onClick={() => setIsSignUp(false)}
                  className="border-2 border-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:text-[var(--ankayz-pink)] transition"
                >
                  Login
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 80, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -80, y: 20 }}
                transition={{ duration: 0.7 }}
                className="p-10"
              >
                <h2 className="text-4xl font-bold mb-4">Hello, Friend!</h2>
                <p className="mb-6">
                  Enter your personal details and start your journey with us.
                </p>
                <button
                  onClick={() => setIsSignUp(true)}
                  className="border-2 border-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:text-[var(--ankayz-pink)] transition"
                >
                  Sign Up
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
