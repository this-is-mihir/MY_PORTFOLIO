import { createContext, useContext, useReducer } from "react";
import axios from "axios";

// Create Context
export const BlogContext = createContext();

// Initial State
const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

// ⬇️ BACKEND BASE URL (LOCAL)
const API_BASE_URL = "https://my-portfolio-backend-z9b2.onrender.com";

// Reducer
function blogReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true, error: null };
    case "SET_BLOGS":
      return { ...state, blogs: action.payload, loading: false };
    case "ADD_BLOG":
      return {
        ...state,
        blogs: [action.payload, ...state.blogs],
        loading: false,
      };
    case "UPDATE_BLOG":
      return {
        ...state,
        blogs: state.blogs.map((b) =>
          b._id === action.payload._id ? action.payload : b
        ),
        loading: false,
      };
    case "DELETE_BLOG":
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

// Provider
export function BlogProvider({ children }) {
  const [state, dispatch] = useReducer(blogReducer, initialState);

  // Token from localStorage
  const getAuthHeader = () => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    return {
      headers: { Authorization: `Bearer ${admin?.token}` },
    };
  };

  // Fetch All Blogs
  const fetchBlogs = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(`${API_BASE_URL}/api/blogs/blog/`);
      dispatch({ type: "SET_BLOGS", payload: res.data });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.response?.data?.message || err.message,
      });
    }
  };

  // Fetch Single Blog
  const fetchBlogById = async (id) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/blogs/blog/${id}`);
      return res.data;
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.response?.data?.message || err.message,
      });
    }
  };

  // Create Blog
  const createBlog = async (blogData) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/blogs/blog/`,
        blogData,
        getAuthHeader()
      );
      dispatch({ type: "ADD_BLOG", payload: res.data });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.response?.data?.message || err.message,
      });
    }
  };

  // Update Blog
  const updateBlog = async (id, blogData) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/blogs/blog/${id}`,
        blogData,
        getAuthHeader()
      );
      dispatch({ type: "UPDATE_BLOG", payload: res.data });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.response?.data?.message || err.message,
      });
    }
  };

  // Delete Blog
  const deleteBlog = async (id) => {
    dispatch({ type: "SET_LOADING" });
    try {
      await axios.delete(
        `${API_BASE_URL}/api/blogs/blog/${id}`,
        getAuthHeader()
      );
      dispatch({ type: "DELETE_BLOG", payload: id });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.response?.data?.message || err.message,
      });
    }
  };

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
}
