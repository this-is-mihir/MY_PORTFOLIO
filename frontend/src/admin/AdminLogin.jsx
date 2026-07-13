import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuthContext";
import toast from "react-hot-toast";
import { User, Lock, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AdminAuthContext);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(formData.username, formData.password);
    setLoading(false);

    if (res.success) {
      toast.success("Welcome back, Mihir.");
      navigate("/admin");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fafafa] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[400px] px-6 relative z-10"
      >
        <div className="bg-white rounded-[28px] p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-[#111] rounded-[18px] flex items-center justify-center mb-5 shadow-lg shadow-black/10">
              <span className="text-white font-bold text-2xl tracking-tight" style={{ fontFamily: "'Dancing Script', 'Great Vibes', cursive" }}>M</span>
            </div>
            <h2 className="text-[1.5rem] font-bold text-slate-900 tracking-tight">Admin Portal</h2>
            <p className="text-[13px] text-slate-500 mt-1.5 text-center font-medium">Enter your credentials to access the dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-slate-700 ml-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-[14px] focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-300 transition-all placeholder:text-slate-400 text-slate-800 font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-[13px] font-semibold text-slate-700 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-[14px] focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-300 transition-all placeholder:text-slate-400 text-slate-800 font-medium"
                  required
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={loading}
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 mt-6 bg-[#111] text-white rounded-2xl text-[14px] font-semibold hover:bg-black transition-colors disabled:opacity-70 shadow-md shadow-black/10"
            >
              {loading ? "Authenticating..." : "Sign In"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </motion.button>
          </form>

        </div>
      </motion.div>
    </div>
  );
}
