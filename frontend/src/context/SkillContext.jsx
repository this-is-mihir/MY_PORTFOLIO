import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AdminAuthContext } from "./AdminAuthContext";

export const SkillContext = createContext();

// Backend Base URL
const API_BASE_URL = "https://my-portfolio-backend-z9b2.onrender.com";

export const SkillProvider = ({ children }) => {
  const [skills, setSkills] = useState([]);
  const { admin } = useContext(AdminAuthContext);
  const token = admin?.token;

  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${token}` },
  });

  // Fetch Skills (Admin Protected)
  const fetchSkills = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}`, getAuthHeader());
      setSkills(res.data);
    } catch (err) {
      console.error("❌ Skill Fetch Error:", err?.response?.data || err?.message);
    }
  };

  // Add Skill
  const addSkill = async (skillData) => {
    try {
      await axios.post(`${API_BASE_URL}`, skillData, getAuthHeader());
      fetchSkills();
    } catch (err) {
      console.error("Error adding skill:", err);
    }
  };

  // Update Skill
  const updateSkill = async (id, skillData) => {
    try {
      await axios.put(`${API_BASE_URL}/${id}`, skillData, getAuthHeader());
      fetchSkills();
    } catch (err) {
      console.error("Error updating skill:", err);
    }
  };

  // Delete Skill
  const deleteSkill = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`, getAuthHeader());
      fetchSkills();
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  };

  // Auto-fetch when admin logs in
  useEffect(() => {
    if (token) fetchSkills();
  }, [token]);

  return (
    <SkillContext.Provider
      value={{
        skills,
        addSkill,
        updateSkill,
        deleteSkill,
        fetchSkills,
      }}
    >
      {children}
    </SkillContext.Provider>
  );
};
