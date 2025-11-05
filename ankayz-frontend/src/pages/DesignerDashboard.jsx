import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Modal from "../components/Modal";
import api from "../../config/api"; // Axios instance with token header

export default function DesignerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch bookings from backend
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Send message to user
  const handleSendMessage = async () => {
    if (!message) return toast.error("Message cannot be empty!");

    try {
      await api.post(`/admin/message/${selectedBooking._id}`, { message });
      toast.success("Message sent successfully!");
      setShowMessageModal(false);
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to send message.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Bookings</h1>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading bookings...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-[var(--ankayz-pink)] text-white">
              <tr>
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Full Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Style Name</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Image</th>
                <th className="py-3 px-6 text-left">Sketch</th>
                <th className="py-3 px-6 text-left">Voice Note</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="11" className="py-4 text-center text-gray-500">
                    No bookings found
                  </td>
                </tr>
              ) : (
                bookings.map((b, idx) => (
                  <tr key={b._id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="py-3 px-6">{idx + 1}</td>
                    <td className="py-3 px-6">{b.userId?.fullname}</td>
                    <td className="py-3 px-6">{b.userId?.email}</td>
                    <td className="py-3 px-6">{b.userId?.phone}</td>
                    <td className="py-3 px-6">{b.styleName}</td>
                    <td className="py-3 px-6">{b.description}</td>
                    <td className="py-3 px-6">{new Date(b.date).toLocaleDateString()}</td>

                    {/* Image Column */}
                    <td className="py-3 px-6">
                      {b.image && (
                        <div className="flex flex-col gap-1">
                          <a
                            href={b.image}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            View
                          </a>
                          <a
                            href={b.image}
                            download={`${b.userId?.fullname || "user"}-booking-${b._id}-image`}
                            className="text-green-600 hover:underline text-sm"
                          >
                            Download
                          </a>
                        </div>
                      )}
                    </td>

                    {/* Sketch Column */}
                    <td className="py-3 px-6">
                      {b.sketch && (
                        <div className="flex flex-col gap-1">
                          <a
                            href={b.sketch}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            View
                          </a>
                          <a
                            href={b.sketch}
                            download={`${b.userId?.fullname || "user"}-booking-${b._id}-sketch`}
                            className="text-green-600 hover:underline text-sm"
                          >
                            Download
                          </a>
                        </div>
                      )}
                    </td>

                    {/* Voice Note Column */}
                    <td className="py-3 px-6">
                      {b.voiceNote && (
                        <div className="flex flex-col gap-1">
                          <audio controls src={b.voiceNote} className="w-full" />
                          <a
                            href={b.voiceNote}
                            download={`${b.userId?.fullname || "user"}-booking-${b._id}-voice`}
                            className="text-green-600 hover:underline text-sm"
                          >
                            Download
                          </a>
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-6 flex flex-col gap-2">
                      <a
                        href={`mailto:${b.userId?.email}`}
                        className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 text-sm text-center"
                      >
                        Email
                      </a>
                      <a
                        href={`tel:${b.userId?.phone}`}
                        className="text-white bg-green-600 px-3 py-1 rounded hover:bg-green-700 text-sm text-center"
                      >
                        Call
                      </a>
                      <button
                        onClick={() => {
                          setSelectedBooking(b);
                          setShowMessageModal(true);
                        }}
                        className="text-white bg-purple-600 px-3 py-1 rounded hover:bg-purple-700 text-sm"
                      >
                        Message
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Message Modal */}
      {selectedBooking && (
        <Modal
          isOpen={showMessageModal}
          onClose={() => setShowMessageModal(false)}
          title={`Message ${selectedBooking.userId?.fullname}`}
          onConfirm={handleSendMessage}
        >
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-purple-600"
            rows={5}
          />
        </Modal>
      )}
    </div>
  );
}
