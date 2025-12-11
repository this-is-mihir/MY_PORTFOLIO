// src/context/BlogContext.jsx
import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const BlogContext = createContext();

const initialState = {
  blogs: [],
  blog: null,
  loading: false,
  error: null,
};

function blogReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true, error: null };
    case "FETCH_BLOGS_SUCCESS":
      return { ...state, blogs: action.payload, loading: false };
    case "FETCH_BLOG_SUCCESS":
      return { ...state, blog: action.payload, loading: false };
    case "ADD_BLOG_SUCCESS":
      return { ...state, blogs: [action.payload, ...state.blogs], loading: false };
    case "UPDATE_BLOG_SUCCESS":
      return {
        ...state,
        blogs: state.blogs.map((b) => (b._id === action.payload._id ? action.payload : b)),
        loading: false,
      };
    case "DELETE_BLOG_SUCCESS":
      return {
        ...state,
        blogs: state.blogs.filter((b) => b._id !== action.payload),
        loading: false,
      };
    case "ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

// LOCAL / DEV base
const API_BASE_URL = "http://localhost:5000";

// header helper (for protected actions)
const getAuthHeader = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  return { headers: { Authorization: `Bearer ${admin?.token}` } };
};

// normalize different API shapes to an array
const normalizeArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.blogs)) return data.blogs;
  if (Array.isArray(data?.data)) return data.data;
  if (data && typeof data === "object") {
    // flatten values (safe fallback)
    const vals = Object.values(data).flat().filter(Boolean);
    if (Array.isArray(vals)) return vals;
  }
  return [];
};

export const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState);

  // Fetch all blogs (public)
  const fetchBlogs = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      // ✅ Correct plural route — index.js mounts router at /api/blogs
      const res = await axios.get(`${API_BASE_URL}/api/blogs`);
      const data = normalizeArray(res.data);
      dispatch({ type: "FETCH_BLOGS_SUCCESS", payload: data });
    } catch (err) {
      console.error("fetchBlogs error:", err);
      dispatch({ type: "ERROR", payload: err.response?.data?.message || err.message });
    }
  };

  // Fetch a single blog by id
  const fetchBlogById = async (id) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(`${API_BASE_URL}/api/blogs/${id}`);
      dispatch({ type: "FETCH_BLOG_SUCCESS", payload: res.data });
      return res.data;
    } catch (err) {
      console.error("fetchBlogById error:", err);
      dispatch({ type: "ERROR", payload: err.response?.data?.message || err.message });
      return null;
    }
  };

  // Create blog (protected)
  const createBlog = async (blogData) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.post(`${API_BASE_URL}/api/blogs`, blogData, getAuthHeader());
      dispatch({ type: "ADD_BLOG_SUCCESS", payload: res.data });
      return res.data;
    } catch (err) {
      console.error("createBlog error:", err);
      dispatch({ type: "ERROR", payload: err.response?.data?.message || err.message });
      throw err;
    }
  };

  // Update blog (protected)
  const updateBlog = async (id, blogData) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.put(`${API_BASE_URL}/api/blogs/${id}`, blogData, getAuthHeader());
      dispatch({ type: "UPDATE_BLOG_SUCCESS", payload: res.data });
      return res.data;
    } catch (err) {
      console.error("updateBlog error:", err);
      dispatch({ type: "ERROR", payload: err.response?.data?.message || err.message });
      throw err;
    }
  };

  // Delete blog (protected)
  const deleteBlog = async (id) => {
    dispatch({ type: "SET_LOADING" });
    try {
      await axios.delete(`${API_BASE_URL}/api/blogs/${id}`, getAuthHeader());
      dispatch({ type: "DELETE_BLOG_SUCCESS", payload: id });
      return true;
    } catch (err) {
      console.error("deleteBlog error:", err);
      dispatch({ type: "ERROR", payload: err.response?.data?.message || err.message });
      throw err;
    }
  };

  // load blogs once
  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BlogContext.Provider
      value={{
        ...state,
        fetchBlogs,
        fetchBlogById,
        createBlog,
        updateBlog,
        deleteBlog,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
