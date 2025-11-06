import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../auth/AuthProvider";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail } from "lucide-react";
import api from "../../config/api";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        login(res.data);
        toast.success("Login successful!");
        setTimeout(() => {
          navigate(res.data.role === "admin" ? "/designer" : "/book");
        }, 1000);
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Something went wrong. Try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) return toast.error("Please enter your email.");
    try {
      setLoading(true);
      await api.post("/auth/forgot-password", { email: resetEmail });
      toast.success("Password reset link sent! Check your email.");
      setShowForgot(false);
      setResetEmail("");
    } catch (err) {
      const message =
        err.response?.data?.message || "Error sending reset link.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[var(--bg-light)] via-[#fff5f6] to-[#ffeaea] font-sans">
      <Toaster position="top-right" />
      <div className="relative w-[900px] h-[550px] bg-white rounded-3xl shadow-xl overflow-hidden border border-[var(--border-light)]">
        {/* LOGIN FORM */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center items-center px-10 transition-all duration-700 ease-in-out ${
            isSignUp
              ? "translate-x-full opacity-0 z-10"
              : "translate-x-0 opacity-100 z-20"
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 text-[var(--ankayz-dark)]">
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
                className="absolute right-3 top-3 text-gray-500 hover:text-[var(--ankayz-pink)] transition"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* Forgot Password */}
            <button
              type="button"
              onClick={() => setShowForgot(true)}
              className="text-sm text-[var(--ankayz-pink)] hover:underline text-right"
            >
              Forgot Password?
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--ankayz-pink)] text-white py-3 rounded-md font-semibold hover:bg-[var(--ankayz-pink-dark)] transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        {/* SIGNUP FORM */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center items-center px-10 transition-all duration-700 ease-in-out ${
            isSignUp
              ? "translate-x-full opacity-100 z-20"
              : "translate-x-0 opacity-0 z-10"
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 text-[var(--ankayz-dark)]">
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
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-[var(--border-light)] p-3 rounded-md outline-none focus:ring-2 focus:ring-[var(--ankayz-pink)]"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="border border-[var(--border-light)] p-3 rounded-md outline-none w-full focus:ring-2 focus:ring-[var(--ankayz-pink)] pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute right-3 top-3 text-gray-500 hover:text-[var(--ankayz-pink)] transition"
              >
                {showConfirm ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border border-[var(--border-light)] p-3 rounded-md outline-none focus:ring-2 focus:ring-[var(--ankayz-pink)]"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--ankayz-pink)] text-white py-3 rounded-md font-semibold hover:bg-[var(--ankayz-pink-dark)] transition disabled:opacity-50"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </div>

        {/* OVERLAY */}
        <motion.div
          className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-[var(--ankayz-pink)] via-[#a3121d] to-[var(--ankayz-gold)] text-white flex flex-col justify-center items-center text-center"
          animate={{
            x: isSignUp ? 0 : 450,
          }}
          transition={{ type: "spring", stiffness: 80, damping: 15, duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            {isSignUp ? (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 80 }}
                transition={{ duration: 0.6 }}
                className="p-10"
              >
                <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
                <p className="mb-6 text-sm text-pink-100">
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
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.6 }}
                className="p-10"
              >
                <h2 className="text-4xl font-bold mb-4">Hello, Friend!</h2>
                <p className="mb-6 text-sm text-pink-100">
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

      {/* FORGOT PASSWORD MODAL */}
      <AnimatePresence>
        {showForgot && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-8 rounded-2xl w-[400px] shadow-lg text-center"
            >
              <h2 className="text-2xl font-bold mb-3 text-[var(--ankayz-dark)]">
                Forgot Password?
              </h2>
              <p className="text-gray-600 mb-5 text-sm">
                Enter your registered email and we’ll send you a reset link.
              </p>

              <div className="relative mb-5">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="border border-gray-300 rounded-md w-full p-3 pl-10 outline-none focus:ring-2 focus:ring-[var(--ankayz-pink)]"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowForgot(false)}
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleForgotPassword}
                  disabled={loading}
                  className="px-5 py-2 bg-[var(--ankayz-pink)] text-white rounded-md font-semibold hover:bg-[var(--ankayz-pink-dark)] transition disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
