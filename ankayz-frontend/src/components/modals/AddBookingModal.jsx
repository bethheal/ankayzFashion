import React from "react";
import FormModal from "../FormModals";

export default function AddBookingModal({ onClose, onSubmit, newBooking, setNewBooking }) {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setNewBooking({ ...newBooking, [name]: files[0] });
    } else {
      setNewBooking({ ...newBooking, [name]: value });
    }
  };

  return (
    <FormModal onClose={onClose} title="Add Booking">
      <form onSubmit={onSubmit} className="space-y-4">
        {["fullname", "email", "phone", "styleName", "description", "date"].map((key) => (
          <input
            key={key}
            type={key === "date" ? "date" : "text"}
            name={key}
            placeholder={key}
            value={newBooking[key]}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        ))}

        {/* File uploads */}
        <div className="space-y-2">
          <label className="block text-gray-700">Image:</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700">Sketch:</label>
          <input type="file" name="sketch" accept="image/*" onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700">Voice Note:</label>
          <input type="file" name="voiceNote" accept="audio/*" onChange={handleChange} />
        </div>

        <button
          type="submit"
          className="w-full bg-[var(--ankayz-pink)] text-white py-2 rounded-md hover:bg-pink-700"
        >
          Save Booking
        </button>
      </form>
    </FormModal>
  );
}
