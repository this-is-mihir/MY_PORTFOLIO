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
const API_BASE_URL = "https://my-portfolio-backend-z9b2.onrender.com";

export default function DashboardCharts() {
  const { admin } = useContext(AdminAuthContext);
  const [blogs, setBlogs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);

  // 🔹 SAME FETCH LOGIC AS BEFORE
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, skillsRes, projectsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/blogs/blog/`, {
            headers: { Authorization: `Bearer ${admin?.token}` },
          }),
          fetch(`${API_BASE_URL}/api/skills/skill/`, {
            headers: { Authorization: `Bearer ${admin?.token}` },
          }),
          fetch(`${API_BASE_URL}/api/projects/project/`, {
            headers: { Authorization: `Bearer ${admin?.token}` },
          }),
        ]);

        const blogsData = await blogsRes.json();
        const skillsData = await skillsRes.json();
        const projectsData = await projectsRes.json();

        setBlogs(blogsData);
        setSkills(skillsData);
        setProjects(projectsData);
      } catch (err) {
        console.error("Failed to fetch chart data:", err);
      }
    };
    fetchData();
  }, [admin]);

  // 🔹 SAME DATA TRANSFORM AS BEFORE
  const blogsByAuthor = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }, {});
  const blogsPieData = Object.entries(blogsByAuthor).map(([name, value]) => ({
    name,
    value,
  }));

  const skillsByCategory = skills.reduce((acc, skill) => {
    acc[skill.category] = (acc[skill.category] || 0) + 1;
    return acc;
  }, {});
  const skillsBarData = Object.entries(skillsByCategory).map(
    ([category, count]) => ({ category, count })
  );

  const projectsByTech = projects.reduce((acc, proj) => {
    if (proj.tech && proj.tech.length > 0) {
      const tech = proj.tech[0];
      acc[tech] = (acc[tech] || 0) + 1;
    }
    return acc;
  }, {});
  const projectsBarData = Object.entries(projectsByTech).map(
    ([tech, count]) => ({ tech, count })
  );

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
      {/* Blogs Pie Chart */}
      <motion.div
        variants={cardVariants}
        className="bg-white rounded-3xl shadow-sm border border-slate-200 p-4 sm:p-5"
      >
        <h3 className="text-slate-800 font-semibold mb-3 text-center text-sm sm:text-base">
          Blogs by Author
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={blogsPieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {blogsPieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Skills Bar Chart */}
      <motion.div
        variants={cardVariants}
        className="bg-white rounded-3xl shadow-sm border border-slate-200 p-4 sm:p-5"
      >
        <h3 className="text-slate-800 font-semibold mb-3 text-center text-sm sm:text-base">
          Skills by Category
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={skillsBarData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="category" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip />
            <Bar dataKey="count" fill="#60A5FA" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Projects Bar Chart */}
      <motion.div
        variants={cardVariants}
        className="bg-white rounded-3xl shadow-sm border border-slate-200 p-4 sm:p-5"
      >
        <h3 className="text-slate-800 font-semibold mb-3 text-center text-sm sm:text-base">
          Projects by Tech
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={projectsBarData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="tech" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip />
            <Bar dataKey="count" fill="#A78BFA" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
}
