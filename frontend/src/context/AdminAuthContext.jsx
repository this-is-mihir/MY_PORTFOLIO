// src/context/AdminAuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AdminAuthContext = createContext();

// Auto-select backend: localhost for dev, deployed URL for production
const isLocal = typeof window !== "undefined" && window.location.hostname.includes("localhost");
// If your local backend runs on a different port change the port below
const LOCAL_API = "http://localhost:5000";
const PROD_API = "https://portfolio-backend-6wpf.onrender.com"; // <- keep or change to your backend URL
const API_BASE_URL = isLocal ? LOCAL_API : PROD_API;

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyStoredToken = async () => {
      try {
        const saved = localStorage.getItem("admin");
        if (!saved) {
          setLoading(false);
          return;
        }

        const parsed = JSON.parse(saved);
        if (!parsed || !parsed.token) {
          localStorage.removeItem("admin");
          setLoading(false);
          return;
        }

        // Verify token with backend before trusting it
        const res = await axios.get(`${API_BASE_URL}/api/admin/verify`, {
          headers: { Authorization: `Bearer ${parsed.token}` },
        });

        if (res.data && res.data.valid) {
          setAdmin(parsed);
        } else {
          // Token invalid — clear stale data
          localStorage.removeItem("admin");
          setAdmin(null);
        }
      } catch (e) {
        // Token expired / invalid / network error — clear stale data
        console.warn("Stored admin token is invalid or expired, clearing session.");
        localStorage.removeItem("admin");
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    verifyStoredToken();
  }, []);

  const login = async (usernameOrEmail, password) => {
    try {
      // backend expects { email, password } usually — admin login form uses username field, so map to email
      const payload = { email: usernameOrEmail, password };
      const res = await axios.post(`${API_BASE_URL}/api/admin/login`, payload);

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
