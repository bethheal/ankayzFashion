import React, { useEffect } from "react";
import { Upload, Tag, Scissors, Truck } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const steps = [
  {
    id: 1,
    icon: <Upload size={40} className="text-[var(--ankayz-pink)]" />,
    title: "Upload Your Style",
    description: "Send your preferred design, sketch, or inspiration photo — we’ll bring it to life.",
    animation: "fade-up",
  },
  {
    id: 2,
    icon: <Tag size={40} className="text-[var(--ankayz-pink)]" />,
    title: "Get a Quote",
    description: "We confirm price, fabric type, and delivery timeline based on your chosen style.",
    animation: "fade-up",
  },
  {
    id: 3,
    icon: <Scissors size={40} className="text-[var(--ankayz-pink)]" />,
    title: "We Sew with Love",
    description: "Our skilled team begins crafting your custom outfit with precision and passion.",
    animation: "fade-up",
  },
  {
    id: 4,
    icon: <Truck size={40} className="text-[var(--ankayz-pink)]" />,
    title: "Delivery",
    description: "Receive your custom outfit anywhere — locally or abroad — right on time.",
    animation: "fade-up",
  },
];

const HowItWorks = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          How We Bring Your Dream Outfit to Life
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          From the first idea to your final fitting, here’s how Ankayz Designs makes your fashion dreams a reality.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition-transform transform hover:-translate-y-2"
            data-aos={step.animation}
            data-aos-delay={index * 150}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="bg-pink-100 p-4 rounded-full">{step.icon}</div>
            </div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
