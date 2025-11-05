import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar at the top */}
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      {/* Sidebar controlled by Navbar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <main className="pt-16">
        <Outlet /> {/* This renders the active page */}
      </main>
      <Footer/>
    </div>
  );
}
