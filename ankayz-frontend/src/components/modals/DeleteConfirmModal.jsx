import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormModal from "../FormModals";

export default function DeleteConfirmModal({ show, onClose, onConfirm }) {
  return (
    <AnimatePresence>
      {show && (
        <FormModal onClose={onClose} title="Confirm Delete">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-center space-y-4"
          >
            <p className="text-gray-700">
              Are you sure you want to delete this booking? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </motion.div>
        </FormModal>
      )}
    </AnimatePresence>
  );
}
