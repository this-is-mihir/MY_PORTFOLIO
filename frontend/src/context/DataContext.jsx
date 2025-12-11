// src/context/DataContext.jsx
import { createContext, useReducer, useEffect } from "react";

// Create context
export const DataContext = createContext();

// Initial state
const initialState = {
  skills: [],
  blogs: [],
};

// ⬇️ BACKEND BASE URL
const API_BASE_URL = "http://localhost:5000";

// Reducer
function dataReducer(state, action) {
  switch (action.type) {
    case "SET_SKILLS":
      return { ...state, skills: action.payload };

    case "SET_BLOGS":
      return { ...state, blogs: action.payload };

    default:
      return state;
  }
}

// small helper to safely parse JSON + normalize to array
async function safeFetchArray(url, name = "resource", opts = {}) {
  try {
    const res = await fetch(url, opts);
    if (!res.ok) {
      console.error(`Failed to fetch ${name}:`, res.status, res.statusText);
      return [];
    }
    const data = await res.json();

    // normalize likely shapes to an array
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.skills)) return data.skills;
    if (Array.isArray(data?.blogs)) return data.blogs;
    if (Array.isArray(data?.data)) return data.data;

    // if object with keys of items, try to flatten values
    if (data && typeof data === "object") {
      const vals = Object.values(data).flat().filter(Boolean);
      if (Array.isArray(vals) && vals.length) return vals;
    }

    return [];
  } catch (err) {
    console.error(`Error fetching ${name}:`, err);
    return [];
  }
}

// Provider component
export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  // Fetch all public skills & blogs (for portfolio UI)
  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      // headers aren't needed for public endpoints, but keep option if needed later
      const opts = {
        headers: { "Content-Type": "application/json" },
      };

      // Use the correct plural routes (index.js mounts these)
      const skillsUrl = `${API_BASE_URL}/api/skills/public`;
      const blogsUrl = `${API_BASE_URL}/api/blogs`;

      const [skillsData, blogsData] = await Promise.all([
        safeFetchArray(skillsUrl, "skills", opts),
        safeFetchArray(blogsUrl, "blogs", opts),
      ]);

      if (!mounted) return;

      dispatch({ type: "SET_SKILLS", payload: skillsData });
      dispatch({ type: "SET_BLOGS", payload: blogsData });
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <DataContext.Provider value={{ state }}>
      {children}
    </DataContext.Provider>
  );
}
