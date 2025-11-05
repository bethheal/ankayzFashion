import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "../auth/AuthProvider";

export default function BookingHistory() {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock fetching bookings (replace with API call)
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Example API call:
        const res = await axios.get('/api/bookings', { headers: { Authorization: `Bearer ${token}` }});
        setBookings(res.data);

        // MOCK DATA
        const mockData = [
          {
            id: 1,
            styleName: "Kente Wedding Gown",
            description: "Red and gold Kente gown with lace details",
            date: "2025-11-10",
            status: "Confirmed",
          },
          {
            id: 2,
            styleName: "Casual Summer Dress",
            description: "Light cotton summer dress in pastel colors",
            date: "2025-11-15",
            status: "Pending",
          },
          {
            id: 3,
            styleName: "Men's Traditional Outfit",
            description: "Agbada style with embroidery",
            date: "2025-11-20",
            status: "Completed",
          },
        ];
        setBookings(mockData);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch bookings!");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  if (loading) return <p className="text-center py-10">Loading bookings...</p>;

  if (bookings.length === 0)
    return <p className="text-center py-10 text-gray-500">No bookings found.</p>;

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <motion.div
          key={booking.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">{booking.styleName}</h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                booking.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : booking.status === "Confirmed"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {booking.status}
            </span>
          </div>

          <p className="text-gray-600 mt-2">{booking.description}</p>
          <p className="text-gray-500 mt-1">Appointment Date: {booking.date}</p>

          {/* Optional: Add action buttons here */}
          <div className="mt-4 flex gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              View Details
            </button>
            {booking.status === "Pending" && (
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                Cancel
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
