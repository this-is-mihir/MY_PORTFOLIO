// src/context/ProjectContext.jsx
import React, { createContext, useReducer } from "react";
import axios from "axios";

// Initial State
const initialState = {
  projects: [],
  project: null,
  loading: false,
  error: null,
};

// Reducer
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

// Create Context
export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectsReducer, initialState);

  // ⬇️ LOCAL BACKEND BASE URL
  const API_URL = "http://localhost:5000/api/projects/project/";

  // Token header
  const getAuthHeader = () => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    return {
      headers: { Authorization: `Bearer ${admin?.token}` },
    };
  };

  // CRUD — Fetch All
  const fetchProjects = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(API_URL);
      dispatch({ type: "FETCH_PROJECTS_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  // CRUD — Fetch One
  const fetchProjectById = async (id) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(`${API_URL}${id}`);
      dispatch({ type: "FETCH_PROJECT_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  // CRUD — Create
  const createProject = async (projectData) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.post(API_URL, projectData, getAuthHeader());
      dispatch({ type: "ADD_PROJECT_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  // CRUD — Update
  const updateProject = async (id, projectData) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.put(
        `${API_URL}${id}`,
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

  // CRUD — Delete
  const deleteProject = async (id) => {
    dispatch({ type: "SET_LOADING" });
    try {
      await axios.delete(`${API_URL}${id}`, getAuthHeader());
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
