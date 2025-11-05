import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { heroImg1, heroImg2, heroImg3, heroImg4, heroImg5, heroImg6 } from "../assets/images";

export default function HeroSection() {
 const allImages = [
  heroImg1,heroImg2,heroImg3,heroImg4,heroImg5,heroImg6

]

  // pick 4 images at a time
  const [currentImages, setCurrentImages] = useState(allImages.slice(0, 4));

  useEffect(() => {
    const interval = setInterval(() => {
      // randomly choose 4 images
      const shuffled = [...allImages].sort(() => 0.5 - Math.random());
      setCurrentImages(shuffled.slice(0, 4));
    }, 8000); // change every 8 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[80vh] overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
        {currentImages.map((img, i) => (
          <div
            key={i}
            className="bg-cover bg-center transition-all duration-1000 opacity-90 hover:opacity-100"
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-6">
        <div className="animate-fadeIn text-[var(--ankayz-gold)]">
          <p className="text-sm uppercase  tracking-widest mb-2">
            Custom made • Ships worldwide
          </p>
          <h2 className="text-5xl font-extrabold mb-4">
            ANKAYZ  FASHION
          </h2>
          <div className="flex gap-3 justify-center">
            <Link
              to="/gallery"
              className="px-6 py-3 rounded-full bg-[var(--ankayz-pink)] text-white font-semibold hover:scale-105 transition"
            >
              View Gallery
            </Link>
            <Link
              to="/book"
              className="px-6 py-3 rounded-full bg-white text-[var(--ankayz-dark)] font-semibold hover:shadow-lg transition"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
