import React, { useState, useRef } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Modal from "../components/Modal"; 
import Header from "../components/Header";

export default function BookingPage() {
  <div>
    <Header/>
  </div>
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const canvasRef = useRef();

  const [recorder, setRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Modals
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [formData, setFormData] = useState({
    styleName: "",
    description: "",
    date: "",
    image: null,
    sketch: null,
    voiceNote: null,
  });

  // 🔁 Handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // ✏️ Handle Sketch
  const handleSketchSave = async () => {
    try {
      const base64 = await canvasRef.current.exportImage("png");
      const res = await fetch(base64);
      const blob = await res.blob();
      const file = new File([blob], "sketch.png", { type: "image/png" });

      setFormData((prev) => ({ ...prev, sketch: file }));
      toast.success("Sketch saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save sketch!");
    }
  };

  const handleSketchClear = () => {
    canvasRef.current.clearCanvas();
  };

  // 🎙️ Handle Voice Recording
  const handleRecord = async () => {
    if (recording) {
      recorder.stop();
      setRecording(false);
      toast.success("Recording stopped!");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newRecorder = new MediaRecorder(stream);
      const chunks = [];

      newRecorder.ondataavailable = (e) => chunks.push(e.data);
      newRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const file = new File([blob], "voiceNote.webm", { type: "audio/webm" });
        setAudioURL(URL.createObjectURL(blob));
        setFormData((prev) => ({ ...prev, voiceNote: file }));
      };

      newRecorder.start();
      setRecorder(newRecorder);
      setRecording(true);
      toast.info("Recording started... 🎙");
    } catch (error) {
      toast.error("Microphone access denied!");
    }
  };

  // 📤 Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🚫 If not logged in, show login modal instead of navigating
    if (!user || !token) {
      setShowLoginModal(true);
      return;
    }

    if (!formData.styleName || !formData.description || !formData.date) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      setLoading(true);

      const bookingData = new FormData();
      bookingData.append("styleName", formData.styleName);
      bookingData.append("description", formData.description);
      bookingData.append("date", formData.date);
      if (formData.image) bookingData.append("image", formData.image);
      if (formData.sketch) bookingData.append("sketch", formData.sketch);
      if (formData.voiceNote) bookingData.append("voiceNote", formData.voiceNote);

      await axios.post("http://localhost:5000/api/bookings", bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setShowConfirmModal(true);
      toast.success("Booking submitted successfully!");

      // 🧹 Clear form
      setFormData({
        styleName: "",
        description: "",
        date: "",
        image: null,
        sketch: null,
        voiceNote: null,
      });
      setAudioURL(null);
      canvasRef.current.clearCanvas();
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Booking submission failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4 font-sans">
      <ToastContainer position="top-center" autoClose={3000} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white shadow-2xl rounded-3xl w-full max-w-3xl p-10"
      >
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Book Your Style Appointment
        </h2>

        {user ? (
          <p className="text-center text-gray-600 mb-8">
            Hello,{" "}
            <span className="font-semibold">
              {user.fullname || "Fashion Lover"}
            </span>
            ! Fill out the form below to send your style inspo to{" "}
            <strong>Ankayz</strong>.
          </p>
        ) : (
          <p className="text-center text-red-500 mb-8">
            You’re not logged in — you can fill the form, but must log in before
            submitting.
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Style Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Style Name
            </label>
            <input
              type="text"
              name="styleName"
              value={formData.styleName}
              onChange={handleChange}
              placeholder="e.g., Kente Wedding Gown"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-600 outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description / Details
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your desired look..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-600 outline-none"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Preferred Delivery Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-600 outline-none"
              required
            />
          </div>

          {/* Upload Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Style Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-yellow-600 outline-none"
            />
          </div>

          {/* Sketch */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Draw Your Sketch ✏️
            </label>
            <div className="border rounded-lg overflow-hidden shadow-md">
              <ReactSketchCanvas
                ref={canvasRef}
                style={{ border: "1px solid #ccc" }}
                width="100%"
                height="300px"
                strokeWidth={3}
                strokeColor="#b85c38"
                canvasColor="#fff"
              />
            </div>
            <div className="flex gap-3 mt-3">
              <button
                type="button"
                onClick={handleSketchSave}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                💾 Save Sketch
              </button>
              <button
                type="button"
                onClick={handleSketchClear}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
              >
                🧹 Clear
              </button>
            </div>
          </div>

          {/* Voice Note */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Add a Voice Note 🎤
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleRecord}
                className={`px-5 py-2 rounded-lg font-semibold text-white ${
                  recording ? "bg-red-600" : "bg-blue-600"
                }`}
              >
                {recording ? "Stop Recording" : "Start Recording"}
              </button>
              {audioURL && <audio controls src={audioURL} className="mt-2" />}
            </div>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-yellow-700 transition"
          >
            {loading ? "Submitting..." : "Submit Booking"}
          </motion.button>
        </form>
      </motion.div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-8 text-yellow-700 font-semibold hover:underline"
      >
        ← Back to Home
      </button>

      {/* ✅ Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Booking Confirmed"
        message="Your style appointment has been booked successfully. We’ll contact you soon to confirm the details."
      />

      {/* 🚫 Login Modal */}
      <Modal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Login Required"
        message="Please log in or sign up before submitting your booking."
        onConfirm={() => {
          setShowLoginModal(false);
          navigate("/auth");
        }}
      />
    </div>
  );
}
