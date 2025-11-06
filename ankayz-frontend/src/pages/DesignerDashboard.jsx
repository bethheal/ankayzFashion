import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import api, { BASE_URL } from "../../config/api";
import {
  Mail,
  Phone,
  MessageCircle,
  Download,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";

// ✅ Modals
import AddBookingModal from "../components/modals/AddBookingModal";
import EditBookingModal from "../components/modals/EditBookingModal";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";

export default function DesignerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editBooking, setEditBooking] = useState(null);

  const [newBooking, setNewBooking] = useState({
    fullname: "",
    email: "",
    phone: "",
    styleName: "",
    description: "",
    date: "",
    image: null,
    sketch: null,
    voiceNote: null,
  });

  // ✅ Fetch bookings
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/bookings");
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ✅ Pagination
  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentBookings = bookings.slice(startIdx, startIdx + itemsPerPage);
  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrevPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  // ✅ Add booking
  const handleAddBooking = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(newBooking).forEach((key) => {
        if (newBooking[key]) formData.append(key, newBooking[key]);
      });

      await api.post("/admin/bookings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Booking added successfully!");
      setShowAddModal(false);
      setNewBooking({
        fullname: "",
        email: "",
        phone: "",
        styleName: "",
        description: "",
        date: "",
        image: null,
        sketch: null,
        voiceNote: null,
      });
      fetchBookings();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add booking");
    }
  };

  // ✅ Edit booking
  const handleEditBooking = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(editBooking).forEach((key) => {
        if (editBooking[key]) formData.append(key, editBooking[key]);
      });

      await api.patch(`/admin/bookings/${editBooking._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Booking updated successfully!");
      setShowEditModal(false);
      fetchBookings();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update booking");
    }
  };

  // ✅ Delete booking
  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/admin/bookings/${deleteId}`);
      toast.success("Booking deleted successfully!");
      setShowDeleteModal(false);
      fetchBookings();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete booking");
    }
  };

  // ✅ Export Excel
  const handleExportExcel = () => {
    const exportData = bookings.map((b, i) => ({
      "#": i + 1,
      Name: b.userId?.fullname || b.fullname,
      Email: b.userId?.email || b.email,
      Phone: b.userId?.phone || b.phone,
      Style: b.styleName,
      Description: b.description,
      Date: new Date(b.date).toLocaleDateString(),
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Bookings.xlsx");
    toast.success("Excel file downloaded!");
  };

  return (
    <div className="max-w-[90rem] mx-auto px-4 sm:px-8 py-8 sm:py-12">
      <Toaster position="top-right" />
    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 flex items-center gap-3 mb-8">
  <span className="h-8 w-1.5 bg-[var(--ankayz-pink)] rounded-full"></span>
  <span>Admin Dashboard <span className="text-gray-500 font-medium">/ Bookings</span></span>
</h1>


  

      {/* Table */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading bookings...</div>
      ) : (
        <div className="rounded-xl shadow-lg overflow-hidden border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs sm:text-sm min-w-[800px]">
              <thead className="bg-[var(--ankayz-pink)] text-white uppercase">
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Full Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Phone</th>
                  <th className="py-3 px-4 text-left">Style</th>
                  <th className="py-3 px-4 text-left">Description</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-center">Image</th>
                  <th className="py-3 px-4 text-center">Sketch</th>
                  <th className="py-3 px-4 text-center">Voice</th>
                  <th className="py-3 px-4 text-center">Client</th>
                  <th className="py-3 px-4 text-center">Admin</th>
                </tr>
              </thead>
              <tbody>
                {currentBookings.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="py-6 text-center text-gray-500 italic">
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  currentBookings.map((b, idx) => (
                    <tr
                      key={b._id}
                      className={`${
                        idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100 transition-colors`}
                    >
                      <td className="py-3 px-4">{startIdx + idx + 1}</td>
                      <td className="py-3 px-4 font-medium text-gray-800 truncate max-w-[150px]">
                        {b.userId?.fullname || b.fullname}
                      </td>
                      <td className="py-3 px-4 text-gray-700 truncate max-w-[150px]">
                        {b.userId?.email || b.email}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {b.userId?.phone || b.phone}
                      </td>
                      <td className="py-3 px-4">{b.styleName}</td>
                      <td className="py-3 px-4 max-w-[250px] truncate text-gray-700">
                        {b.description}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(b.date).toLocaleDateString()}
                      </td>

                      {/* Files */}
                      <td className="py-3 px-4 text-center">
                        {b.image ? (
                          <a
                            href={`${BASE_URL}/${b.image}`}
                            target="_blank"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            View
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {b.sketch ? (
                          <a
                            href={`${BASE_URL}/${b.sketch}`}
                            target="_blank"
                            className="text-purple-600 hover:text-purple-800"
                          >
                            View
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {b.voiceNote ? (
                          <audio controls className="w-full">
                            <source
                              src={`${BASE_URL}/${b.voiceNote}`}
                              type="audio/mpeg"
                            />
                          </audio>
                        ) : (
                          "—"
                        )}
                      </td>

                      {/* Client Actions */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2 sm:gap-3">
                          <a
                            href={`mailto:${b.userId?.email || b.email}`}
                            className="text-blue-600 hover:text-blue-800"
                            title="Email"
                          >
                            <Mail size={16} />
                          </a>
                          <button
                            onClick={() =>
                              toast(`📞 ${b.userId?.phone || b.phone || "No number"}`)
                            }
                            className="text-green-600 hover:text-green-800"
                            title="Call"
                          >
                            <Phone size={16} />
                          </button>
                          <a
                            href={`https://wa.me/${(
                              b.userId?.phone ||
                              b.phone ||
                              ""
                            ).replace(/\D/g, "")}?text=Hello%20${encodeURIComponent(
                              b.userId?.fullname || b.fullname || ""
                            )},%20this%20is%20Ankayz%20Fashion.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-800"
                            title="WhatsApp"
                          >
                            <MessageCircle size={16} />
                          </a>
                        </div>
                      </td>

                      {/* Admin Actions */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2 sm:gap-3">
                          <button
                            onClick={() => {
                              setEditBooking(b);
                              setShowEditModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteId(b._id);
                              setShowDeleteModal(true);
                            }}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {bookings.length > itemsPerPage && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 py-6 bg-white border-t text-sm sm:text-base">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md transition font-medium ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-[var(--ankayz-pink)] text-white hover:bg-pink-700"
                }`}
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page <strong>{currentPage}</strong> of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md transition font-medium ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-[var(--ankayz-pink)] text-white hover:bg-pink-700"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      {showAddModal && (
        <AddBookingModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddBooking}
          newBooking={newBooking}
          setNewBooking={setNewBooking}
        />
      )}
      {showEditModal && editBooking && (
        <EditBookingModal
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditBooking}
          editBooking={editBooking}
          setEditBooking={setEditBooking}
        />
      )}
      <DeleteConfirmModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />

          {/* Top actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 mt-6">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 bg-[var(--ankayz-pink)] text-white px-4 py-2 rounded-md hover:bg-pink-700 transition text-sm sm:text-base"
        >
          <Plus size={18} /> Add Booking
        </button>

        <button
          onClick={handleExportExcel}
          className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm sm:text-base"
        >
          <Download size={18} /> Export Excel
        </button>
      </div>
    </div>
  );
}
