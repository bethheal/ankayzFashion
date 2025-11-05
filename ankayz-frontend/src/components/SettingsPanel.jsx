import React, { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { toast } from "react-toastify";

export default function SettingsPanel() {
  const { user, setUser } = useAuth(); // assuming context allows updates
  const [formData, setFormData] = useState({
    email: user.email || "",
    phone: user.phone || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save settings
  const handleSave = async () => {
    setLoading(true);

    // Basic password validation
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match!");
      setLoading(false);
      return;
    }

    try {
      // Example API call to update settings
      // await axios.patch('/api/user/settings', formData)

      // Mock update
      setUser((prev) => ({ ...prev, email: formData.email, phone: formData.phone }));

      toast.success("Settings updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update settings!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Settings</h2>

      {/* Email */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-600 outline-none"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-600 outline-none"
        />
      </div>

      {/* Change Password */}
      <div className="border-t border-gray-200 pt-4 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Change Password</h3>

        <div>
          <label className="block text-gray-700 mb-2">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-600 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-600 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-600 outline-none"
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
