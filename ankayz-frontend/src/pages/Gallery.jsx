import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { X, Upload } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { motion, AnimatePresence } from "framer-motion";
import {
  cooperateImg,
  gownImg1,
  gownImg2,
  heroImg1,
  heroImg4,
  menWear,
} from "../assets/images";
// import { api } from "../../config/axios";

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [file, setFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [description, setDescription] = useState("");
  const [userGallery, setUserGallery] = useState([]);

  // Modal control states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // ✅ Load saved uploads from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("userGallery");
    if (saved) {
      setUserGallery(JSON.parse(saved));
    }
  }, []);

  // ✅ Save uploads to localStorage whenever userGallery changes
  useEffect(() => {
    localStorage.setItem("userGallery", JSON.stringify(userGallery));
  }, [userGallery]);

  const galleryItems = [
    {
      id: 1,
      ordered: heroImg4,
      got: heroImg1,
      category: "African Wear",
      description:
        "A bold African print masterpiece with a modern twist — where culture meets class.",
    },
    {
      id: 2,
      ordered: gownImg1,
      got: gownImg2,
      category: "Wedding Gown",
      description:
        "Elegant bridal couture — handcrafted lace details and timeless white grace.",
    },
    {
      id: 3,
      ordered: cooperateImg,
      got: menWear,
      category: "Corporate",
      description:
        "Tailored to perfection — sleek lines, confident cuts, and boardroom brilliance.",
    },
  ];

  // Auth check
  const handleUploadClick = () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    setShowUploadModal(true);
  };

  // File handling
  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleAudioChange = (e) => setAudioFile(e.target.files[0]);

  // Convert file to base64 for saving in localStorage
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // Upload handler
  const handleSubmit = async () => {
    if (!file) {
      setErrorModalOpen(true);
      return;
    }

    try {
      const imageBase64 = await convertToBase64(file);

      const newDesign = {
        id: Date.now(),
        ordered: imageBase64,
        got: imageBase64,
        category: "User Upload",
        description: description || "Newly added trending fashion design!",
      };

      // Add to top of gallery
      setUserGallery((prev) => [newDesign, ...prev]);

      // Reset
      setSuccessModalOpen(true);
      setShowUploadModal(false);
      setFile(null);
      setAudioFile(null);
      setDescription("");
    } catch (error) {
      console.error(error);
      setErrorModalOpen(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="text-center mb-12" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3">
          Ankayz Fashion Gallery
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our signature creations — from vibrant African wear to dreamy
          bridal gowns. Each piece tells a story of elegance, passion, and
          precision.
        </p>
      </div>

      {/* Gallery Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        data-aos="fade-up"
      >
        {[...userGallery, ...galleryItems].map((item) => (
          <div
            key={item.id}
            className="relative group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700"
          >
            <div className="grid grid-cols-2 h-72">
              <img
                src={item.ordered}
                alt="Ordered"
                className="object-cover w-full h-full"
              />
              <img
                src={item.got}
                alt="Got"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
              <button
                onClick={() => setSelectedItem(item)}
                className="bg-[var(--ankayz-pink)] text-white px-6 py-2 rounded-full font-medium hover:scale-110 transition-transform shadow-md"
              >
                View Details
              </button>
            </div>

            {/* Category Tag */}
            <div className="absolute bottom-3 left-3 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-gray-800 shadow">
              {item.category}
            </div>
          </div>
        ))}
      </div>

      {/* Upload CTA */}
      <div
        className="mt-20 text-center bg-gradient-to-r from-pink-50 to-pink-100 py-14 rounded-3xl shadow-inner"
        data-aos="zoom-in"
      >
        <h3 className="text-3xl font-bold mb-3 text-gray-800">
          Have a Design in Mind?
        </h3>
        <p className="text-gray-700 mb-8">
          Upload your preferred style, sketch, or inspiration — and let Ankayz
          bring your dream outfit to life.
        </p>
        <button
          onClick={handleUploadClick}
          className="bg-[var(--ankayz-pink)] text-white px-8 py-3 rounded-full font-medium hover:bg-pink-600 transition-transform hover:scale-105"
        >
          Upload Your Style
        </button>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl p-6 relative">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-[var(--ankayz-pink)]"
            >
              <X size={22} />
            </button>

            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Upload Your Style
            </h3>

            {/* Upload Fields */}
            <label className="block mb-3 text-gray-700 font-medium">
              Upload Design Image
            </label>
            <div className="border-2 border-dashed border-pink-300 rounded-xl p-6 text-center hover:bg-pink-50 transition">
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="mx-auto h-40 object-cover rounded-xl"
                />
              ) : (
                <label className="cursor-pointer text-[var(--ankayz-pink)] font-medium flex flex-col items-center">
                  <Upload size={30} />
                  <span>Click to Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>

            <label className="block mt-5 mb-2 text-gray-700 font-medium">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your dream outfit..."
              className="w-full border border-gray-300 rounded-lg p-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
            ></textarea>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-5 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-[var(--ankayz-pink)] text-white rounded-full hover:bg-pink-600 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal with Animation */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white max-w-lg w-full rounded-3xl shadow-2xl p-6 relative"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 text-gray-600 hover:text-[var(--ankayz-pink)]"
              >
                <X size={22} />
              </button>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                {selectedItem.category}
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Ordered:</h4>
                  <img
                    src={selectedItem.ordered}
                    alt="Ordered Style"
                    className="rounded-xl w-full h-48 object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Got:</h4>
                  <img
                    src={selectedItem.got}
                    alt="Final Style"
                    className="rounded-xl w-full h-48 object-cover"
                  />
                </div>
              </div>

              <p className="text-gray-700 text-center mb-5">
                {selectedItem.description}
              </p>

              <div className="text-center">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="bg-[var(--ankayz-pink)] text-white px-8 py-2 rounded-full hover:bg-pink-600 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Other Modals */}
      <Modal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title="Login Required"
        message="Please sign up or log in to upload your design."
        onConfirm={() => navigate("/auth")}
        confirmText="Go to Login"
      />

      <Modal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        title="Upload Successful"
        message="Your design has been submitted successfully!"
      />

      <Modal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        title="Upload Failed"
        message="Please try again or check your file format."
      />
    </div>
  );
}
