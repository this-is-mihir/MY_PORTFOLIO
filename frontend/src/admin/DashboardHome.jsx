import { motion } from "framer-motion";
import {
  BookOpen,
  Briefcase,
  PenSquare,
  MessageSquare,
  School,
  Layers3,
  TrendingUp
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
    { key: "projects", label: "Projects", value: counts.projects || 0, icon: Briefcase },
    { key: "blogs", label: "Blogs", value: counts.blogs || 0, icon: PenSquare },
    { key: "skills", label: "Skills", value: counts.skills || 0, icon: BookOpen },
    { key: "experience", label: "Experience", value: counts.experience || 0, icon: Layers3 },
    { key: "education", label: "Education", value: counts.education || 0, icon: School },
    { key: "messages", label: "Messages", value: counts.contacts || 0, icon: MessageSquare },
  ];

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-[17px] font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-black" /> Quick Stats
        </h2>
        <p className="text-[13px] text-slate-500 mt-1">Real-time overview of your portfolio data.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
        {cards.map(({ key, label, value, icon: Icon }, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#111] group-hover:border-[#111] transition-colors duration-300 shadow-sm">
                <Icon className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors duration-300" />
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
              <p className="text-[13px] font-medium text-slate-500 mt-1.5">{label}</p>
            </div>

            {/* Decorative background element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-slate-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white rounded-[24px] border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] overflow-hidden"
      >
        <div className="border-b border-slate-50 px-6 py-5 bg-slate-50/30">
           <h2 className="text-[15px] font-bold text-slate-800 tracking-tight">Analytics Overview</h2>
        </div>
        <div className="p-6">
          <DashboardCharts />
        </div>
      </motion.div>
    </div>
  );
}
