import React from "react";
import { X, ShoppingBag } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar({ open, onClose, user }) {
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
    { name: "Book", path: "/book" },
    { name: "About", path: "/about" },
  ];

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/30 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      {/* Sidebar */}
      <aside
        className={`absolute left-0 top-0 h-full w-72 bg-white shadow-xl p-6 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div
            className="flex items-baseline gap-1 cursor-pointer"
            onClick={() => {
              navigate("/");
              onClose();
            }}
          >
            <h1 className="text-2xl font-extrabold text-[var(--ankayz-pink)]">
              ANKAYZ
            </h1>
            <span className="text-sm text-gray-600 tracking-wide">Designs</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-800 hover:text-[var(--ankayz-pink)]"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-4 mb-8 text-gray-800 font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                onClick={onClose}
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

        {/* Divider */}
        <hr className="my-4 border-gray-300" />

        {/* User Section or Auth Buttons */}
        {user ? (
          <div className="flex items-center gap-3 mb-6">
            <img
              src={user.avatar || "/default-avatar.png"}
              alt="Profile Avatar"
              className="w-10 h-10 rounded-full border-2 border-yellow-600"
              onClick={() => {
                navigate("/profile");
                onClose();
              }}
            />
            <span className="font-medium text-gray-800">{user.fullname}</span>
          </div>
        ) : (
          <div className="flex flex-col gap-3 mb-6">
            <button
              className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
              onClick={() => {
                navigate("/auth");
                onClose();
              }}
            >
              Login
            </button>
            <button
              className="w-full px-4 py-2 border border-yellow-600 text-yellow-600 rounded-lg hover:bg-yellow-600 hover:text-white transition"
              onClick={() => {
                navigate("/auth");
                onClose();
              }}
            >
              Signup
            </button>
          </div>
        )}

        {/* Shopping Bag */}
        <button className="relative flex items-center gap-3 hover:scale-105 transition-transform">
          <ShoppingBag
            className="text-gray-800 hover:text-[var(--ankayz-pink)] transition-colors"
            size={24}
          />
          <span className="text-gray-700 font-medium">Cart</span>
          <span className="absolute -top-2 left-5 bg-[var(--ankayz-pink)] text-white rounded-full text-xs px-1">
            3
          </span>
        </button>
      </aside>
    </div>
  );
}
