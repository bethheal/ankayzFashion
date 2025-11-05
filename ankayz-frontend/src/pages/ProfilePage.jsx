import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import ProfileInfo from "../components/ProfileInfo";
import SettingsPanel from "../components/SettingsPanel";
import BookingHistory from "../components/BookingHistory";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
        <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-lg rounded-2xl max-w-4xl mx-auto"
      >
        {/* Tabs */}
        <div className="flex justify-around border-b border-gray-200 p-4">
          {["profile", "bookings", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-semibold transition ${
                activeTab === tab
                  ? "text-yellow-700 border-b-2 border-yellow-700"
                  : "text-gray-500 hover:text-yellow-600"
              }`}
            >
              {tab === "profile"
                ? "Profile Info"
                : tab === "bookings"
                ? "My Bookings"
                : "Settings"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "profile" && <ProfileInfo />}
          {activeTab === "bookings" && <BookingHistory />}
          {activeTab === "settings" && <SettingsPanel />}
        </div>
      </motion.div>
    </div>
  );
}
