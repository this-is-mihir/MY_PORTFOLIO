import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AllSkills from "../pages/AllSkills/AllSkill";
import AllBlog from "../pages/AllBlog/AllBlog";
import AllProject from "../pages/AllProjects/AllProject";
import About from "../pages/About";
import Contact from "../pages/Contacts";
import ProjectDetails from "../pages/ProjectDetails";
import BlogDetails from "../pages/BlogDetails";
import Curriculum from "../pages/AcademicCarriculam";
import AdminDashboard from "../admin/AdminDashboard";
import AdminLogin from "../admin/AdminLogin";
import ProtectedRoute from "./ProtectedRoute";
import Services from "../pages/Services";
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/skills" element={<AllSkills />} />
      <Route path="/blog" element={<AllBlog />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<AllProject />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/curriculum" element={<Curriculum />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route path="/blog/:id" element={<BlogDetails />} />
      {/* Admin Routes */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
