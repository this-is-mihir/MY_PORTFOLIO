import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AdminAuthContext = createContext();

// ⬇️ LOCAL BACKEND BASE URL
const API_BASE_URL = "https://portfolio-backend-6wpf.onrender.com";

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore admin on page reload
  useEffect(() => {
    const savedAdmin = localStorage.getItem("admin");
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    }
    setLoading(false);
  }, []);

  // LOGIN
  const login = async (email, password) => {
    try {
      // ⚠️ Backend expects { email, password }
      const res = await axios.post(`${API_BASE_URL}/api/admin/login`, {
        email,
        password,
      });

      const { token } = res.data;

      if (!token) {
        return { success: false, message: "No token received from server" };
      }

      const adminObj = { email, token };

      // save in localStorage
      localStorage.setItem("admin", JSON.stringify(adminObj));
      setAdmin(adminObj);

      return { success: true };
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("admin");
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
