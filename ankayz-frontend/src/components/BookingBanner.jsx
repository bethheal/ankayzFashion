import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { CalendarDays, ArrowRight } from "lucide-react";
import { NavLink } from "react-router";

const BookingBanner = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      className="relative bg-[url('/assets/booking-bg.jpg')] bg-cover bg-center py-24 text-white"
      id="booking"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div
        className="relative z-10 max-w-4xl mx-auto text-center px-6"
        data-aos="zoom-in"
      >
        <CalendarDays
          size={40}
          className="mx-auto mb-4 text-[var(--ankayz-pink)]"
        />
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Bring Your Dream Outfit to Life?
        </h2>
        <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
          Book a consultation or sewing appointment with Ankayz Designs today.
          Let’s turn your vision into reality elegant, precise, and made with
          love.
        </p>
        <NavLink to={"/auth"}>
          <button className="bg-[var(--ankayz-pink)] hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full flex items-center gap-2 mx-auto transition-all duration-300 hover:scale-105">
            Book Now <ArrowRight size={18} />
          </button>
        </NavLink>
      </div>
    </section>
  );
};

export default BookingBanner;
