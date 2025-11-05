import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
// import ClientDashboard from "./pages/ClientDashboard";
import DesignerDashboard from "./pages/DesignerDashboard";
// import ApprenticeDashboard from "./pages/ApprenticeDashboard";
import Gallery from "./pages/Gallery";
import { AuthProvider } from "./auth/AuthProvider";
import "./index.css";
import BookingPage from "./pages/BookingPage";
import ProfilePage from "./pages/ProfilePage";
import About from "./pages/About";
import AuthPage from "./auth/AuthPage";
import ProtectedRoute from "./auth/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      // { path: "client", element: <ClientDashboard /> },
      {
        path: "designer",
        element: (
          <ProtectedRoute requiredRole="admin">
            <DesignerDashboard />
          </ProtectedRoute>
        ),
      },
      // { path: "apprentice", element: <ApprenticeDashboard /> },
      { path: "gallery", element: <Gallery /> },
      { path: "auth", element: <AuthPage /> },
      { path: "book", element: <BookingPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "about", element: <About /> },
    ],
  },
]);
export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
