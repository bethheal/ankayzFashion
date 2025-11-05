import React, { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider"; // ✅ make sure this exports { user, logout }
import { logo } from "../assets/images";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth(); // ✅ include logout here
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
    { name: "Book", path: "/book" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-gray-800 hover:text-[var(--ankayz-pink)] transition-transform hover:scale-110"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>

            <div
              className="flex items-baseline gap-2 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => navigate("/")}
            >
              <img
                src={logo}
                alt="Ankayz Fashion Logo"
                className="w=20 h-20 object-contain"
              />
            </div>
          </div>

          {/* Center Nav Links (Desktop) */}
          <ul className="hidden lg:flex gap-8 text-gray-800 font-medium">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `cursor-pointer transition-all duration-300 ${
                      isActive
                        ? "text-[var(--ankayz-pink)] font-semibold"
                        : "text-gray-800 hover:text-[var(--ankayz-pink)]"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[var(--ankayz-pink)] transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-5">
  {user ? (
    <>
      {/* User Name */}
      <span className="hidden sm:block text-gray-700 font-medium">
        {user.fullname}
      </span>

      {/* Avatar */}
      <div
        onClick={() => navigate("/profile")}
        className="w-10 h-10 rounded-full bg-yellow-600 text-white flex items-center justify-center font-bold cursor-pointer border-2 border-yellow-600"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="Profile Avatar"
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-yellow-600"
          />
        ) : (
          user.fullname?.charAt(0).toUpperCase() || "?"
        )}
      </div>

      {/* Logout Button */}
      <button
        onClick={() => {
          logout(); // clears user data
          navigate("/"); // redirects to home
        }}
        className="ml-2 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <button
        className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
        onClick={() => navigate("/auth")}
      >
        Login
      </button>
      <button
        className="px-4 py-2 border border-yellow-600 text-yellow-600 rounded-lg hover:bg-yellow-600 hover:text-white transition"
        onClick={() => navigate("/auth")}
      >
        Signup
      </button>
    </>
  )}

  {/* Shopping Bag */}
  <button className="relative hover:scale-110 transition-transform">
    <ShoppingBag
      className="text-gray-800 hover:text-[var(--ankayz-pink)] transition-colors"
      size={24}
    />
    <span className="absolute -top-2 -right-2 bg-[var(--ankayz-pink)] text-white rounded-full text-xs px-1">
      3
    </span>
  </button>
</div>

        </div>
      </nav>

      {/* SIDEBAR (Mobile Menu) */}
      <div
        className={`fixed inset-0 z-40 ${
          sidebarOpen ? "" : "pointer-events-none"
        }`}
      >
        <div
          onClick={() => setSidebarOpen(false)}
          className={`absolute inset-0 bg-black/30 transition-opacity ${
            sidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        <aside
          className={`absolute left-0 top-0 h-full w-72 bg-white shadow-xl p-6 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300`}
        >
          <div className="flex justify-between items-center mb-6">
            <div
              className="flex items-baseline gap-1 cursor-pointer"
              onClick={() => {
                navigate("/");
                setSidebarOpen(false);
              }}
            >
              <h1 className="text-2xl font-extrabold text-[var(--ankayz-pink)]">
                ANKAYZ
              </h1>
              <span className="text-sm text-gray-600 tracking-wide">
                Designs
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-800 hover:text-[var(--ankayz-pink)]"
            >
              <X size={24} />
            </button>
          </div>

          {/* Nav Links */}
          <ul className="space-y-4 mb-6 text-gray-800 font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `block w-full py-1 transition-all duration-300 ${
                      isActive
                        ? "text-[var(--ankayz-pink)] font-semibold"
                        : "text-gray-800 hover:text-[var(--ankayz-pink)]"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <hr className="my-4 border-gray-300" />

          {/* ✅ Mobile User Section */}
        {user ? (
  <div className="flex flex-col gap-4 mb-6">
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div
        onClick={() => {
          navigate("/profile");
          setSidebarOpen(false);
        }}
        className="w-10 h-10 rounded-full bg-yellow-600 text-white flex items-center justify-center font-bold cursor-pointer border-2 border-yellow-600"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="Profile Avatar"
            className="w-10 h-10 rounded-full border-2 border-yellow-600"
          />
        ) : (
          user.fullname?.charAt(0).toUpperCase() || "?"
        )}
      </div>

      <span className="font-medium text-gray-800">{user.fullname}</span>
    </div>

              {/* ✅ Logout for Mobile */}
              <button
                onClick={() => {
                  logout();
                  setSidebarOpen(false);
                  navigate("/");
                }}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 mb-6">
              <button
                className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                onClick={() => {
                  navigate("/auth");
                  setSidebarOpen(false);
                }}
              >
                Login
              </button>
              <button
                className="w-full px-4 py-2 border border-yellow-600 text-yellow-600 rounded-lg hover:bg-yellow-600 hover:text-white transition"
                onClick={() => {
                  navigate("/auth");
                  setSidebarOpen(false);
                }}
              >
                Signup
              </button>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
