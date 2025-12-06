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
import { motion } from "framer-motion";

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
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { id: "profile", label: "Profile", icon: <User2 size={20} /> },
    { id: "education", label: "Education", icon: <School size={20} /> },
    { id: "experience", label: "Experience", icon: <Layers3 size={20} /> },
    { id: "skills", label: "Skills", icon: <BookOpen size={20} /> },
    { id: "certificate", label: "Certificates", icon: <Award size={20} /> },
    { id: "blog", label: "Blog", icon: <PenSquare size={20} /> },
    { id: "project", label: "Projects", icon: <Briefcase size={20} /> },
    { id: "message", label: "Messages", icon: <MessageSquare size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardHome />;
      case "profile":
        return <AdminProfile />;
      case "education":
        return <EducationManager />;
      case "experience":
        return <ExperienceManager />;
      case "skills":
        return <AddSkill />;
      case "certificate":
        return <AddCertificate />;
      case "blog":
        return <AddBlog />;
      case "project":
        return <AddProject />;
      case "message":
        return <ShowMessages />;
      default:
        return <DashboardHome />;
    }
  };

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between px-4 py-4 border-b border-indigo-700 flex-shrink-0">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <LayoutDashboard size={22} /> Admin Panel
        </h2>
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden text-white"
        >
          <X size={22} />
        </button>
      </div>

      {/* nav ko scrollable banaya, taki chhote height par bhi Logout dikhe */}
      <nav className="mt-4 flex-1 flex flex-col gap-2 px-3 pb-6 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setSidebarOpen(false);
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm md:text-[0.95rem] transition ${
              activeTab === item.id
                ? "bg-pink-500 text-white shadow-lg"
                : "hover:bg-white/10"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="mt-3 flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-white/10 text-sm md:text-[0.95rem] flex-shrink-0"
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🔹 Top bar – sirf mobile / very small width */}
      <div className="md:hidden fixed top-0 left-0 w-full z-30 bg-indigo-900 text-white flex items-center justify-between px-4 py-3">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <LayoutDashboard size={22} /> Admin
        </h2>
        <button onClick={() => setSidebarOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      <div className="flex">
        {/* 🔹 Desktop sidebar – ab full height + scrollable */}
        <aside
          className="hidden md:flex md:flex-col bg-gradient-to-b from-indigo-900 to-purple-900 
                     text-white w-64 h-screen shadow-xl fixed left-0 top-0 overflow-y-auto"
        >
          <SidebarContent />
        </aside>

        {/* 🔹 Mobile overlay sidebar – bhi scrollable */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.25 }}
              className="bg-gradient-to-b from-indigo-900 to-purple-900 text-white 
                         w-64 h-full max-h-screen fixed left-0 top-0 z-50 shadow-2xl md:hidden
                         flex flex-col overflow-y-auto"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}

        {/* 🔹 Main content area */}
        <main
          className="
            flex-1 
            w-full
            pt-20              /* mobile: topbar ke neeche thoda space */
            md:pt-8           /* tablet / small laptop pe bhi breathing room */
            lg:pt-10
            pb-8
            px-3 sm:px-5 md:px-8 
            md:ml-64          /* desktop: sidebar width jitna shift */
          "
        >
          <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-800 mb-4 capitalize">
              {activeTab}
            </h1>
            <div className="text-gray-700 overflow-x-auto">{renderContent()}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
