import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthProvider";
import { toast } from "react-toastify";

export default function ProfileInfo() {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    avatar: null,
  });
  const [loading, setLoading] = useState(false);

  // Initialize form data once user is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname || "",
        email: user.email || "",
        phone: user.phone || "",
        avatar: null,
      });
    }
  }, [user]);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Save profile info (mocked API call)
  const handleSave = async () => {
    setLoading(true);
    try {
      setUser((prev) => ({
        ...prev,
        ...formData,
        avatar: formData.avatar || prev?.avatar, // Keep previous avatar if no new one
      }));

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile!");
    } finally {
      setLoading(false);
    }
  };

  // Get initials from fullname
  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Wait for user to load
  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Profile Info</h2>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        {formData.avatar ? (
          <img
            src={URL.createObjectURL(formData.avatar)}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-2 border-yellow-600 object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full border-2 border-yellow-600 bg-yellow-600 text-white flex items-center justify-center text-2xl font-bold">
            {getInitials(formData.fullname || user.fullname)}
          </div>
        )}

        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 rounded-lg"
        />
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Full Name</label>
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-600 outline-none"
        />
      </div>

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
