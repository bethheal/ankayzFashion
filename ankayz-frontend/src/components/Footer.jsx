import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { logo } from "../assets/images";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12 px-6 relative overflow-hidden">
      {/* Overlay shimmer */}
      <div className="absolute inset-0 bg-gradient-to-t from-pink-700/10 to-transparent pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* 1️⃣ Brand */}
        <div>
                    <img
           src={logo}
           alt="Ankayz Fashion Logo"
           className="w=20 h-20 object-contain"
         />
          <p className="text-sm leading-relaxed">
            Custom designs, elegant tailoring, and perfect fittings — all made
            with love and creativity. Where fashion meets confidence.
          </p>
        </div>

        {/* 2️⃣ Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#about" className="hover:text-[var(--ankayz-gold)] transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#gallery" className="hover:text-[var(--ankayz-gold)] transition-colors">
                Gallery
              </a>
            </li>
            <li>
              <a href="#testimonials" className="hover:text-[var(--ankayz-gold)] transition-colors">
                Testimonials
              </a>
            </li>
            <li>
              <a href="#auth" className="hover:text-[var(--ankayz-gold)] transition-colors">
                Book Now
              </a>
            </li>
          </ul>
        </div>

        {/* 3️⃣ Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-[var(--ankayz-gold)]" />
              <span>+233 54 444 6708</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-[var(--ankayz-gold)]" />
              <span>ankayzankayz@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-[var(--ankayz-gold)]" />
              <span>High Tension St, Accra, Ghana</span>
            </li>
          </ul>

          {/* Socials */}
          <div className="flex gap-4 mt-5">
            <a
              href="#"
              className="hover:text-[var(--ankayz-gold)] transition-all duration-300 hover:scale-110"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="hover:text-[var(--ankayz-gold)] transition-all duration-300 hover:scale-110"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="hover:text-[var(--ankayz-gold)] transition-all duration-300 hover:scale-110"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* 4️⃣ Bottom bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Ankayz Fashion. All rights reserved.
      </div>
    </footer>
  );
}
