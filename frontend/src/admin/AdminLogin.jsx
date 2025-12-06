import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuthContext";
import toast from "react-hot-toast";
import { User, Lock } from "lucide-react";

export default function AdminLogin() {
  
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AdminAuthContext);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(formData.username, formData.password);

    if (res.success) {
      toast.success("Login successful 🎉");
      navigate("/admin");
    } else {
      setError(res.message);
      toast.error(res.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 px-4 py-10">
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 w-full max-w-md rounded-[40px] shadow-[0_15px_50px_rgba(0,0,0,0.25)] px-8 py-10 border border-slate-300 backdrop-blur-md"
      >
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <div className="h-20 w-20 rounded-full shadow-md shadow-slate-400 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-3xl">
            MP
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-slate-800">
          Admin Login
        </h2>
        <p className="text-sm text-center text-slate-500 mb-6">
          Access panel – authorized admins only
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-center text-sm font-semibold mb-4">
            {error}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="relative">
            <User className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="username"
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-100 border border-slate-300 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-400 placeholder:text-slate-500"
            />
          </div>

          <div className="relative">
            <Lock className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="password"
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-100 border border-slate-300 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-400 placeholder:text-slate-500"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold tracking-wide shadow-md hover:brightness-110 transition-all"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
