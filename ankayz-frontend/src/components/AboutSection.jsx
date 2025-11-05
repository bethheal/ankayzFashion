import React from "react";
import designerImg from "../assets/designerImg.jpg"; // replace with your actual image path
import { NavLink } from "react-router";

const AboutSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
        {/* Designer Image */}
        <div
          data-aos="fade-right"
          className="w-full md:w-1/2 flex justify-center"
        >
          <div className="relative group">
            <img
              src={designerImg}
              alt="Designer"
              className="rounded-2xl shadow-xl w-80 sm:w-96 object-cover transform group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
          </div>
        </div>

        {/* Text Section */}
        <div
          data-aos="fade-left"
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-4xl font-extrabold mb-4 text-gray-800">
            Meet the Designer
          </h2>
          <p className="max-w-lg text-gray-600 leading-relaxed mb-6">
            With a passion for creativity and precision, <span className="font-semibold text-[var(--ankayz-pink)]">Ankayz</span> brings your
            fashion dreams to life  from sketches and inspirations to the final
            runway masterpiece.
          </p>
          <NavLink to={"/about"}>
          <button className="bg-[var(--ankayz-pink)] hover:bg-[var(--ankayz-pink)] text-white px-8 py-3 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
            Learn More
          </button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
