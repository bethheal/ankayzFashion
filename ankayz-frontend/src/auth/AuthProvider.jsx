// src/auth/AuthProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);



  // Load user and token from localStorage on first mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  const login = (data) => {
    // Expecting { user, token } or just one object depending on your backend
    const userData = data.user || data;
    const authToken = data.token || data.accessToken || null;

    setUser(userData);
    setToken(authToken);

    localStorage.setItem("user", JSON.stringify(userData));
    if (authToken) localStorage.setItem("token", authToken);
  };

  const logout = () => {
   localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout,setToken, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
