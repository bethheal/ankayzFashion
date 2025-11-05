import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const FeaturedGallery = () => {
  React.useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const galleryItems = [
    {
      id: 1,
      ordered: "/assets/order1.jpg",
      got: "/assets/got1.jpg",
      title: "Elegant Lace Dress",
    },
    {
      id: 2,
      ordered: "/assets/order2.jpg",
      got: "/assets/got2.jpg",
      title: "African Print Gown",
    },
    {
      id: 3,
      ordered: "/assets/order3.jpg",
      got: "/assets/got3.jpg",
      title: "Bridal Glam Look",
    },
  ];

  return (
    <section className="py-16 bg-white" id="featured">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">What I Ordered vs What I Got</h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          See the magic of transformation  from client inspiration to Ankayz’s creative touch 
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 px-6">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl overflow-hidden shadow-lg"
            data-aos="fade-up"
          >
            {/* Image container with hover switch */}
            <div className="relative w-full h-80">
              <img
                src={item.ordered}
                alt="What I Ordered"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
              />
              <img
                src={item.got}
                alt="What I Got"
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center text-white text-lg font-semibold">
              {item.title}
            </div>

            {/* Label */}
            <div className="flex justify-between bg-gray-100 py-2 px-4 text-sm font-medium text-gray-700">
              <span>Ordered</span>
              <span>Got</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedGallery;
