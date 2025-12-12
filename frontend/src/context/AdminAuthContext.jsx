// src/context/AdminAuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AdminAuthContext = createContext();

// === set your deployed backend URL here ===
// Replace with your actual backend URL if different.
const API_BASE_URL = "https://portfolio-backend-6wpf.onrender.com";

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore admin from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("admin");
      if (saved) setAdmin(JSON.parse(saved));
    } catch (e) {
      console.warn("Failed to parse saved admin:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // login accepts username (or email) and password
  const login = async (usernameOrEmail, password) => {
    try {
      // backend expects { email, password } — pass username as email if that's what the form sends
      const payload = { email: usernameOrEmail, password };
      const res = await axios.post(`${API_BASE_URL}/api/admin/login`, payload);

      // check common token shapes
      const token = res?.data?.token || res?.data?.admin?.token || res?.data?.data?.token;

      if (!token) {
        const msg = res?.data?.message || res?.data?.error || "Login failed: no token.";
        return { success: false, message: msg };
      }

      const adminObj = { email: usernameOrEmail, token };

      try {
        localStorage.setItem("admin", JSON.stringify(adminObj));
      } catch (e) {
        console.warn("Could not save admin to localStorage", e);
      }

      setAdmin(adminObj);
      return { success: true };
    } catch (err) {
      const serverMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.data ||
        err?.message ||
        "Login failed";
      console.error("Login failed:", serverMessage);
      return { success: false, message: serverMessage };
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("admin");
    } catch (e) {
      console.warn("Failed to remove admin from localStorage", e);
    }
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
