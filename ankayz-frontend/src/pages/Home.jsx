import React from "react";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import AboutSection from "../components/AboutSection";
import FeaturedGallery from "../components/FeaturedGallery";
import HowItWorks from "../components/HowItWorks"
import Testimonials from "../components/Testimonials"
import BookingBanner from "../components/BookingBanner";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="pt-16 space-y-16 bg-gradient-to-b from-white via-pink-50 to-white">
      <HeroSection />
      <CategorySection />
      <AboutSection/>
      <FeaturedGallery/>
      <HowItWorks/>
      <Testimonials/>
      <BookingBanner/>
    </div>
  );
}
