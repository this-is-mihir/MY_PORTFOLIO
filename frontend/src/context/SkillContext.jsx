// src/context/SkillContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AdminAuthContext } from "./AdminAuthContext";

export const SkillContext = createContext();

// Backend Base URL
const API_BASE_URL = "http://localhost:5000";

export const SkillProvider = ({ children }) => {
  const [skills, setSkills] = useState([]);
  const { admin } = useContext(AdminAuthContext);
  const token = admin?.token;

  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // normalize data to array
  const normalizeArray = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.skills)) return data.skills;
    if (Array.isArray(data?.data)) return data.data;
    if (data && typeof data === "object") {
      const vals = Object.values(data).flat().filter(Boolean);
      if (Array.isArray(vals)) return vals;
    }
    return [];
  };

  // Fetch Skills (Admin Protected) -> GET /api/skills
  const fetchSkills = async () => {
    try {
      if (!token) {
        // if no token, avoid calling protected admin endpoint
        console.warn("fetchSkills skipped: no admin token");
        setSkills([]);
        return;
      }

      const res = await axios.get(`${API_BASE_URL}/api/skills`, getAuthHeader());
      const data = normalizeArray(res.data);
      setSkills(data);
      return data;
    } catch (err) {
      console.error("❌ Skill Fetch Error:", err?.response?.data || err?.message);
      setSkills([]);
      return [];
    }
  };

  // Fetch public skills (for public pages) -> GET /api/skills/public
  const fetchPublicSkills = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/skills/public`);
      const data = normalizeArray(res.data);
      return data;
    } catch (err) {
      console.error("❌ Public Skill Fetch Error:", err?.response?.data || err?.message);
      return [];
    }
  };

  // Add Skill -> POST /api/skills (protected)
  const addSkill = async (skillData) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/skills`, skillData, getAuthHeader());
      // optimistic refetch
      await fetchSkills();
      return res.data;
    } catch (err) {
      console.error("Error adding skill:", err?.response?.data || err?.message);
      throw err;
    }
  };

  // Update Skill -> PUT /api/skills/:id (protected)
  const updateSkill = async (id, skillData) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/api/skills/${id}`, skillData, getAuthHeader());
      await fetchSkills();
      return res.data;
    } catch (err) {
      console.error("Error updating skill:", err?.response?.data || err?.message);
      throw err;
    }
  };

  // Delete Skill -> DELETE /api/skills/:id (protected)
  const deleteSkill = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/skills/${id}`, getAuthHeader());
      await fetchSkills();
      return true;
    } catch (err) {
      console.error("Error deleting skill:", err?.response?.data || err?.message);
      throw err;
    }
  };

  // Auto-fetch when admin logs in
  useEffect(() => {
    if (token) {
      fetchSkills();
    } else {
      setSkills([]); // clear when logged out
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <SkillContext.Provider
      value={{
        skills,
        addSkill,
        updateSkill,
        deleteSkill,
        fetchSkills,
        fetchPublicSkills,
      }}
    >
      {children}
    </SkillContext.Provider>
  );
};
