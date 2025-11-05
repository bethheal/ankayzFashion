import React from "react";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, message, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md relative animate-[fadeIn_0.3s_ease]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-[var(--ankayz-pink)]"
        >
          <X size={22} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
          {title}
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-center mb-6">{message}</p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            Close
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-6 py-2 bg-[var(--ankayz-pink)] text-white rounded-full hover:bg-pink-600 transition"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
