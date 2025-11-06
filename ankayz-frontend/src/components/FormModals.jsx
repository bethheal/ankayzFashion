import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function FormModal({ show = true, onClose, title, children, maxWidth = "max-w-md" }) {
  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: -30 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-2xl shadow-2xl w-full ${maxWidth} mx-4 p-6 relative`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
          >
            <X size={22} />
          </button>

          {/* Title */}
          {title && (
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              {title}
            </h2>
          )}

          {/* Content */}
          <div>{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
