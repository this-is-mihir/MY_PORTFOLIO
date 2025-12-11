// src/context/ProjectContext.jsx
import React, { createContext, useReducer } from "react";
import axios from "axios";

const initialState = {
  projects: [],
  project: null,
  loading: false,
  error: null,
};

const projectsReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true, error: null };
    case "FETCH_PROJECTS_SUCCESS":
      return { ...state, projects: action.payload, loading: false };
    case "FETCH_PROJECT_SUCCESS":
      return { ...state, project: action.payload, loading: false };
    case "ADD_PROJECT_SUCCESS":
      return {
        ...state,
        projects: [...state.projects, action.payload],
        loading: false,
      };
    case "UPDATE_PROJECT_SUCCESS":
      return {
        ...state,
        projects: state.projects.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
        loading: false,
      };
    case "DELETE_PROJECT_SUCCESS":
      return {
        ...state,
        projects: state.projects.filter((p) => p._id !== action.payload),
        loading: false,
      };
    case "ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectsReducer, initialState);

  // ⚠️ LOCAL BACKEND
  const API_BASE_URL = "http://localhost:5000";
  // deploy pe: "https://my-portfolio-backend-z9b2.onrender.com"

  const getAuthHeader = () => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    return {
      headers: { Authorization: `Bearer ${admin?.token}` },
    };
  };

  // 🔹 GET ALL
  const fetchProjects = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(`${API_BASE_URL}/api/projects`);

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.projects || [];

      dispatch({ type: "FETCH_PROJECTS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  // 🔹 GET ONE
  const fetchProjectById = async (id) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(`${API_BASE_URL}/api/projects/${id}`);
      dispatch({ type: "FETCH_PROJECT_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  // 🔹 CREATE
  const createProject = async (projectData) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/projects`,
        projectData,
        getAuthHeader()
      );
      dispatch({ type: "ADD_PROJECT_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  // 🔹 UPDATE
  const updateProject = async (id, projectData) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/projects/${id}`,
        projectData,
        getAuthHeader()
      );
      dispatch({ type: "UPDATE_PROJECT_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  // 🔹 DELETE
  const deleteProject = async (id) => {
    dispatch({ type: "SET_LOADING" });
    try {
      await axios.delete(
        `${API_BASE_URL}/api/projects/${id}`,
        getAuthHeader()
      );
      dispatch({ type: "DELETE_PROJECT_SUCCESS", payload: id });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        ...state,
        fetchProjects,
        fetchProjectById,
        createProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
