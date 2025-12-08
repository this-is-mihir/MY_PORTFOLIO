import { createContext, useReducer, useEffect } from "react";

// Create context
export const DataContext = createContext();

// Initial state
const initialState = {
  skills: [],
  blogs: [],
};

// ⬇️ BACKEND BASE URL
const API_BASE_URL = "https://my-portfolio-backend-z9b2.onrender.com";

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

// Provider component
export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  // Fetch all public skills & blogs (for portfolio UI)
  useEffect(() => {
    async function fetchData() {
      try {
        // ⭐ Fetch Skills
        const skillsRes = await fetch(
          `${API_BASE_URL}/api/skills/skill/public`
        );
        const skillsData = await skillsRes.json();
        dispatch({ type: "SET_SKILLS", payload: skillsData });

        // ⭐ Fetch Blogs
        const blogsRes = await fetch(
          `${API_BASE_URL}/api/blogs/blog/`
        );
        const blogsData = await blogsRes.json();
        dispatch({ type: "SET_BLOGS", payload: blogsData });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ state }}>
      {children}
    </DataContext.Provider>
  );
}
