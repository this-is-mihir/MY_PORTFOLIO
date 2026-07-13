import { useContext, useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Award,
  PenSquare,
  Briefcase,
  MessageSquare,
  Menu,
  X,
  LogOut,
  User2,
  School,
  Layers3,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import DashboardHome from "./DashboardHome";
import AddSkill from "./AddSkill";
import AddCertificate from "./AddCertificate";
import AddProject from "./AddProject";
import AddBlog from "./AddBlog";
import ShowMessages from "./ShowMessages";
import AdminProfile from "./AdminProfile";
import EducationManager from "./EducationManager";
import ExperienceManager from "./ExperienceManager";

import { AdminAuthContext } from "../context/AdminAuthContext";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useContext(AdminAuthContext);

  const handleLogout = () => logout();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "profile", label: "Profile", icon: <User2 size={18} /> },
    { id: "education", label: "Education", icon: <School size={18} /> },
    { id: "experience", label: "Experience", icon: <Layers3 size={18} /> },
    { id: "skills", label: "Skills", icon: <BookOpen size={18} /> },
    { id: "certificate", label: "Certificates", icon: <Award size={18} /> },
    { id: "blog", label: "Blog", icon: <PenSquare size={18} /> },
    { id: "project", label: "Projects", icon: <Briefcase size={18} /> },
    { id: "message", label: "Messages", icon: <MessageSquare size={18} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardHome />;
      case "profile": return <AdminProfile />;
      case "education": return <EducationManager />;
      case "experience": return <ExperienceManager />;
      case "skills": return <AddSkill />;
      case "certificate": return <AddCertificate />;
      case "blog": return <AddBlog />;
      case "project": return <AddProject />;
      case "message": return <ShowMessages />;
      default: return <DashboardHome />;
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      <div className="flex items-center justify-between px-6 py-6 border-b border-slate-100 flex-shrink-0">
        <h2 className="text-xl font-bold flex items-center gap-3 text-slate-800">
          <div className="w-8 h-8 bg-[#111] rounded-[10px] flex items-center justify-center shadow-sm">
             <span className="text-white font-bold text-lg tracking-tight" style={{ fontFamily: "'Dancing Script', 'Great Vibes', cursive", paddingTop: "2px" }}>M</span>
          </div>
          Admin
        </h2>
        <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-500 hover:text-slate-800 transition-colors">
          <X size={22} />
        </button>
      </div>

      <nav className="flex-1 flex flex-col gap-1.5 px-4 py-6 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setSidebarOpen(false);
            }}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all ${
              activeTab === item.id
                ? "bg-slate-100 text-black shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}

        <div className="mt-auto pt-6 pb-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-colors bg-red-50 text-red-600 hover:bg-red-100 text-[14px] font-medium"
          >
            <LogOut size={18} />
            Logout Session
          </button>
        </div>
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] flex font-sans">
      {/* Top bar for mobile */}
      <div className="md:hidden fixed top-0 left-0 w-full z-30 bg-white border-b border-slate-200 text-slate-800 flex items-center justify-between px-4 py-3 shadow-sm">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <div className="w-7 h-7 bg-black rounded-md flex items-center justify-center">
             <span className="text-white font-bold text-sm tracking-tight" style={{ fontFamily: "'Dancing Script', 'Great Vibes', cursive", paddingTop:"2px" }}>M</span>
          </div>
          Admin
        </h2>
        <button onClick={() => setSidebarOpen(true)} className="p-1 text-slate-600">
          <Menu size={24} />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-[260px] fixed inset-y-0 left-0 z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 z-40 md:hidden backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="w-[280px] h-full fixed inset-y-0 left-0 z-50 md:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-[260px] pt-20 md:pt-10 pb-12 px-4 sm:px-8 md:px-10 lg:px-12 w-full max-w-[1600px] mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight capitalize">
              {activeTab}
            </h1>
            <p className="text-sm text-slate-500 mt-1.5">Manage and update your {activeTab} information.</p>
          </div>
        </div>

        {/* Dynamic View Content */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-6 md:p-8">
          <div className="text-slate-800 w-full">
            {renderContent()}
          </div>
        </div>

      </main>
    </div>
  );
}
