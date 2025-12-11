import { motion } from "framer-motion";
import {
  BookOpen,
  Briefcase,
  PenSquare,
  MessageSquare,
  School,
  Layers3,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AdminAuthContext } from "../context/AdminAuthContext";
import DashboardCharts from "./DashboardChart";

const API_BASE_URL = "https://portfolio-backend-6wpf.onrender.com";

export default function DashboardHome() {
  const { admin } = useContext(AdminAuthContext);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/counts`, {
          headers: {
            Authorization: `Bearer ${admin?.token}`,
          },
        });
        const data = await response.json();
        setCounts(data || {});
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };
    fetchCounts();
  }, [admin]);

  const cards = [
    {
      key: "skills",
      label: "Skills",
      value: counts.skills || 0,
      icon: BookOpen,
      gradient: "from-[#e6f0ff] to-[#f5f7ff]",
      iconBg: "bg-[#d0e0ff]",
    },
    {
      key: "projects",
      label: "Projects",
      value: counts.projects || 0,
      icon: Briefcase,
      gradient: "from-[#e7f7ff] to-[#f5fcff]",
      iconBg: "bg-[#c9ecff]",
    },
    {
      key: "blogs",
      label: "Blogs",
      value: counts.blogs || 0,
      icon: PenSquare,
      gradient: "from-[#f7ecff] to-[#fff7ff]",
      iconBg: "bg-[#e5d2ff]",
    },
    {
      key: "messages",
      label: "Messages",
      value: counts.contacts || 0,
      icon: MessageSquare,
      gradient: "from-[#e6fff9] to-[#f5fffc]",
      iconBg: "bg-[#c7f3e6]",
    },
    // 👇 NEW – Education
    {
      key: "education",
      label: "Education",
      value: counts.education || 0,
      icon: School,
      gradient: "from-[#fff4e6] to-[#fff9f0]",
      iconBg: "bg-[#ffe0b8]",
    },
    // 👇 NEW – Experience
    {
      key: "experience",
      label: "Experience",
      value: counts.experience || 0,
      icon: Layers3,
      gradient: "from-[#eef7ff] to-[#f7fbff]",
      iconBg: "bg-[#d6e7ff]",
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 w-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-900 tracking-tight">
        Dashboard Overview
      </h2>

      {/* KPI CARDS – pastel style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6 mb-10">
        {cards.map(({ key, label, value, icon: Icon, gradient, iconBg }) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.03, y: -2 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} border border-slate-100 shadow-sm hover:shadow-md cursor-pointer`}
          >
            <div className="flex items-center justify-between px-4 py-4 sm:px-5 sm:py-5">
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-500">
                  {label}
                </p>
                <p className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-1">
                  {value}
                </p>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
                  Total {label.toLowerCase()}
                </p>
              </div>

              <div
                className={`h-10 w-10 sm:h-11 sm:w-11 rounded-2xl ${iconBg} flex items-center justify-center shadow-sm`}
              >
                <Icon className="w-5 h-5 text-slate-700" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts block below */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-3xl shadow-sm border border-slate-200 p-4 sm:p-5 md:p-6"
      >
        <DashboardCharts />
      </motion.div>
    </div>
  );
}
