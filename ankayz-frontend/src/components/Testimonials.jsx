import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Quote } from "lucide-react";
import { avartar1, avartar2 } from "../assets/images";

const testimonials = [
  {
    id: 1,
    name: "Ama Serwaa",
    role: "Bride",
    image: avartar1,
    message:
      "Ankayz made my dream wedding dress come true! Every stitch screamed perfection — I felt like royalty on my big day.",
  },
  {
    id: 2,
    name: "Esi Nyarko",
    role: "Model & Influencer",
    image: avartar2,
    message:
      "Their attention to detail is unmatched. I sent an inspo picture, and what I got was even better! Totally obsessed 😍.",
  },
  {
    id: 3,
    name: "Nana Adjoa",
    role: "Fashion Enthusiast",
    image: avartar1,
    message:
      "Professional, creative, and kind Ankayz Designs is the go-to for anyone who values elegance and originality.",
  },
];

const Testimonials = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-white" id="testimonials">
      <div className="text-center mb-12 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          What Our Clients Say
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Real stories from clients who trusted <span className="text-[var(--ankayz-pink)] font-semibold">Ankayz Designs</span> 
          to bring their dreams to life.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 px-6">
        {testimonials.map((item, index) => (
          <div
            key={item.id}
            className="relative group bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-pink-100 transition-transform transform hover:-translate-y-3 hover:shadow-2xl"
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            {/* Quote Icon */}
            <div className="absolute -top-5 left-6 bg-[var(--ankayz-pink)] text-white p-2 rounded-full shadow-md">
              <Quote size={20} />
            </div>

            {/* Client Image */}
            <div className="flex justify-center mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-full border-4 border-pink-200 group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Message */}
            <p className="italic text-gray-700 text-sm leading-relaxed mb-4">
              “{item.message}”
            </p>

            {/* Name & Role */}
            <h4 className="font-semibold text-gray-900">{item.name}</h4>
            <p className="text-[var(--ankayz-pink)] text-sm">{item.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
