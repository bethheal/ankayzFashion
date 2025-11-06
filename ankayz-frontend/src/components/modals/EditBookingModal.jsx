import React from "react";
import FormModal from "../FormModals";

export default function EditBookingModal({ onClose, onSubmit, editBooking, setEditBooking }) {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setEditBooking({ ...editBooking, [name]: files[0] });
    } else {
      setEditBooking({ ...editBooking, [name]: value });
    }
  };

  return (
    <FormModal onClose={onClose} title="Edit Booking">
      <form onSubmit={onSubmit} className="space-y-4">
        {["fullname", "email", "phone", "styleName", "description", "date"].map((key) => (
          <input
            key={key}
            type={key === "date" ? "date" : "text"}
            name={key}
            placeholder={key}
            value={editBooking[key] || ""}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        ))}

        {/* File uploads */}
        <div className="space-y-2">
          <label className="block text-gray-700">Image:</label>
          {editBooking.image && typeof editBooking.image === "string" && (
            <a href={editBooking.image} target="_blank" className="text-blue-600 hover:text-blue-800">View Current</a>
          )}
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700">Sketch:</label>
          {editBooking.sketch && typeof editBooking.sketch === "string" && (
            <a href={editBooking.sketch} target="_blank" className="text-purple-600 hover:text-purple-800">View Current</a>
          )}
          <input type="file" name="sketch" accept="image/*" onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700">Voice Note:</label>
          {editBooking.voiceNote && typeof editBooking.voiceNote === "string" && (
            <audio controls className="w-full">
              <source src={editBooking.voiceNote} type="audio/mpeg" />
            </audio>
          )}
          <input type="file" name="voiceNote" accept="audio/*" onChange={handleChange} />
        </div>

        <button
          type="submit"
          className="w-full bg-[var(--ankayz-pink)] text-white py-2 rounded-md hover:bg-pink-700"
        >
          Update Booking
        </button>
      </form>
    </FormModal>
  );
}
