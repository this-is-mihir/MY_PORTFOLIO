import { useEffect, useState, useContext } from "react";
import { AdminAuthContext } from "../context/AdminAuthContext";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#9DB2FF", "#A5F3FC", "#FCD34D", "#FCA5A5"];

// ✅ LOCAL BACKEND BASE URL
const API_BASE_URL = "http://localhost:5000";

export default function DashboardCharts() {
  const { admin } = useContext(AdminAuthContext);
  const [blogs, setBlogs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);

      // build headers only if token exists
      const headers = admin?.token
        ? { Authorization: `Bearer ${admin.token}`, "Content-Type": "application/json" }
        : { "Content-Type": "application/json" };

      try {
        // NOTE: call the plural base routes (index.js mounts these at /api/blogs, /api/skills, /api/projects)
        const [blogsRes, skillsRes, projectsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/blogs`, { headers }),
          fetch(`${API_BASE_URL}/api/skills`, { headers }),
          fetch(`${API_BASE_URL}/api/projects`, { headers }),
        ]);

        // parse safely — if a response is not ok, log & use empty fallback
        const safeJson = async (res, name) => {
          if (!res.ok) {
            console.error(`Failed to fetch ${name}:`, res.status, res.statusText);
            return [];
          }
          const data = await res.json();
          // normalize possible shapes:
          // - array (direct)
          // - { items: [...] } or { blogs: [...] } or { data: [...] }
          if (Array.isArray(data)) return data;
          if (Array.isArray(data?.blogs)) return data.blogs;
          if (Array.isArray(data?.skills)) return data.skills;
          if (Array.isArray(data?.projects)) return data.projects;
          if (Array.isArray(data?.data)) return data.data;
          // fallback: if object but single item, return array of that item
          if (data && typeof data === "object") return Object.values(data).flat().filter(Boolean);
          return [];
        };

        const blogsData = await safeJson(blogsRes, "blogs");
        const skillsData = await safeJson(skillsRes, "skills");
        const projectsData = await safeJson(projectsRes, "projects");

        setBlogs(blogsData);
        setSkills(skillsData);
        setProjects(projectsData);
      } catch (err) {
        console.error("Failed to fetch chart data:", err);
        setError(err.message || "Unknown error");
        setBlogs([]);
        setSkills([]);
        setProjects([]);
      }
    };

    fetchData();
  }, [admin]);

  // Defensive reductions — projects/skills/blogs are always arrays now
  const blogsByAuthor = (Array.isArray(blogs) ? blogs : []).reduce((acc, blog) => {
    const key = blog?.author || "Unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const blogsPieData = Object.entries(blogsByAuthor).map(([name, value]) => ({ name, value }));

  const skillsByCategory = (Array.isArray(skills) ? skills : []).reduce((acc, skill) => {
    const cat = skill?.category || "Other";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});
  const skillsBarData = Object.entries(skillsByCategory).map(([category, count]) => ({ category, count }));

  const projectsByTech = (Array.isArray(projects) ? projects : []).reduce((acc, proj) => {
    const techList = Array.isArray(proj?.tech) && proj.tech.length > 0 ? proj.tech : ["Unknown"];
    // count first tech as before, but also allow counting all techs if you prefer:
    const tech = techList[0];
    acc[tech] = (acc[tech] || 0) + 1;
    return acc;
  }, {});
  const projectsBarData = Object.entries(projectsByTech).map(([tech, count]) => ({ tech, count }));

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-5"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.2 } },
      }}
    >
      {error && (
        <div className="col-span-full text-center text-red-500">
          Error loading charts: {error}
        </div>
      )}

      {/* Blogs Pie Chart */}
      <motion.div variants={cardVariants} className="bg-white rounded-3xl shadow-sm border border-slate-200 p-4 sm:p-5">
        <h3 className="text-slate-800 font-semibold mb-3 text-center text-sm sm:text-base">Blogs by Author</h3>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={blogsPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {blogsPieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Skills Bar Chart */}
      <motion.div variants={cardVariants} className="bg-white rounded-3xl shadow-sm border border-slate-200 p-4 sm:p-5">
        <h3 className="text-slate-800 font-semibold mb-3 text-center text-sm sm:text-base">Skills by Category</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={skillsBarData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="category" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Projects Bar Chart */}
      <motion.div variants={cardVariants} className="bg-white rounded-3xl shadow-sm border border-slate-200 p-4 sm:p-5">
        <h3 className="text-slate-800 font-semibold mb-3 text-center text-sm sm:text-base">Projects by Tech</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={projectsBarData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="tech" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
}
