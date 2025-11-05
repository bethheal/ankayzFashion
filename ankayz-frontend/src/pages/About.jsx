// src/pages/About.jsx
import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-16 px-6 md:px-20">
      {/* HEADER SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          About <span className="text-pink-600">Ankayz</span>
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Fashion isn’t just clothing — it’s expression, art, and confidence. At
          <span className="font-semibold text-gray-800"> Ankayz</span>, we bring
          creativity, culture, and class together to make you stand out in every
          moment.
        </p>
      </motion.div>

      {/* IMAGE & STORY */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-5xl mx-auto mt-12 grid md:grid-cols-2 gap-8 items-center"
      >
        <img
        //   src={aboutImage}
          alt="Ankayz Fashion"
          className="rounded-2xl shadow-lg object-cover w-full h-[400px]"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Who is Ankayz?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Ankayz is a passionate fashion designer who believes every outfit
            tells a story. Her journey began with a deep love for African
            textures and modern elegance. From bold Kente gowns to soft lace
            designs, she brings dreams to life — stitch by stitch.
          </p>
        </div>
      </motion.div>

      {/* WHAT SHE DOES */}
      <div className="max-w-6xl mx-auto mt-20">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
          What She Does
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Wedding Gowns",
              desc: "Elegant and timeless gowns crafted for your perfect day.",
            },
            {
              title: "Church & Traditional Wear",
              desc: "Graceful and modest designs fit for every special occasion.",
            },
            {
              title: "Beach & Casual Wear",
              desc: "Relaxed, stylish, and breathable outfits for your leisure moments.",
            },
            {
              title: "Decor & Table Setting",
              desc: "Creative event decoration and aesthetic table setups for weddings, parties, and ceremonies.",
            },
            {
              title: "Fashion Apprenticeship",
              desc: "Upcoming programs designed to train young talents in tailoring, design, and creativity.",
            },
            {
              title: "Custom Designs",
              desc: "Personalized creations made to your unique style and fit.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-pink-600 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CLOSING MESSAGE */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center mt-20"
      >
        <p className="text-gray-700 text-lg italic">
          “At Ankayz, we don’t just design clothes — we design confidence. Every
          piece is crafted with love, detail, and your story in mind.”
        </p>
        <p className="text-gray-500 mt-4">— Ankayz Fashion Studio</p>
      </motion.div>
    </div>
  );
};

export default About;
