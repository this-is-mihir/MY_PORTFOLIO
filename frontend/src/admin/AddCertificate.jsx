import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { AdminAuthContext } from "../context/AdminAuthContext";
import toast from "react-hot-toast";
import { Edit2, Trash2, Plus, Image as ImageIcon, Calendar, Award } from "lucide-react";

const API_BASE_URL = "https://portfolio-backend-6wpf.onrender.com";

export default function AddCertificate() {
  const { admin } = useContext(AdminAuthContext);
  const [certificates, setCertificates] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    date: "",
    img: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/certificates/certificate/`);
      setCertificates(res.data.certificates || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch certificates ❌");
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddOrEdit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.issuer || !formData.date || !formData.img) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      if (editId) {
        await axios.put(`${API_BASE_URL}/api/certificates/certificate/${editId}`, formData, {
          headers: { Authorization: `Bearer ${admin?.token}` },
        });
        toast.success("Certificate updated successfully ✅");
      } else {
        await axios.post(`${API_BASE_URL}/api/certificates/certificate/`, formData, {
          headers: { Authorization: `Bearer ${admin?.token}` },
        });
        toast.success("Certificate added successfully 🎉");
      }
      fetchCertificates();
      setFormData({ title: "", issuer: "", date: "", img: "" });
      setEditId(null);
    } catch (err) {
      console.error(err);
      toast.error("Operation failed ❌");
    }
  };

  const handleEdit = (cert) => {
    setFormData({
      title: cert.title,
      issuer: cert.issuer,
      date: cert.date,
      img: cert.img,
    });
    setEditId(cert._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this certificate?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/certificates/certificate/${id}`, {
          headers: { Authorization: `Bearer ${admin?.token}` },
        });
        toast.success("Certificate deleted 🗑️");
        fetchCertificates();
      } catch (err) {
        console.error(err);
        toast.error("Delete failed ❌");
      }
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          Certificates Manager
        </h2>
        <p className="text-sm text-slate-500 mt-1">Add, edit, or remove your achievements and certificates.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-8 items-start">
        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 xl:sticky xl:top-24">
          <h3 className="text-[15px] font-bold text-slate-800 mb-6 flex items-center gap-2">
            {editId ? <Edit2 size={18} /> : <Plus size={18} />}
            {editId ? "Edit Certificate" : "Add Certificate"}
          </h3>
          <form onSubmit={handleAddOrEdit} className="space-y-4">
            
            <div>
              <label className="text-[12px] font-semibold text-slate-700 ml-1 mb-1.5 block">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. AWS Certified"
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/20"
              />
            </div>

            <div>
              <label className="text-[12px] font-semibold text-slate-700 ml-1 mb-1.5 block">Issuer</label>
              <div className="relative">
                <Award className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="issuer"
                  value={formData.issuer}
                  onChange={handleChange}
                  placeholder="e.g. Amazon"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/20"
                />
              </div>
            </div>
            
            <div>
              <label className="text-[12px] font-semibold text-slate-700 ml-1 mb-1.5 block">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/20 text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-slate-700 ml-1 mb-1.5 block">Image URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="img"
                  value={formData.img}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/20"
                />
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="submit"
                className="flex-1 py-3 bg-[#111] text-white rounded-xl text-[14px] font-semibold hover:bg-black transition-colors"
              >
                {editId ? "Update" : "Add"}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setFormData({ title: "", issuer: "", date: "", img: "" });
                  }}
                  className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl text-[14px] font-semibold hover:bg-slate-300 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* LIST SECTION */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-bold text-slate-800">Your Certificates ({certificates.length})</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {certificates.map((cert) => (
                <motion.div
                  key={cert._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col bg-white border border-slate-100 rounded-2xl p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:shadow-md transition-all group relative overflow-hidden"
                >
                  <div className="w-full h-32 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex-shrink-0 flex items-center justify-center mb-3">
                    {cert.img ? (
                      <img src={cert.img} alt={cert.title} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={30} className="text-slate-300" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 text-[14px] leading-tight truncate" title={cert.title}>{cert.title}</h4>
                    <p className="text-[12px] font-medium text-slate-500 mt-1">{cert.issuer}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{cert.date}</p>
                  </div>

                  <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(cert)}
                      className="p-2 bg-white/90 backdrop-blur border border-slate-200 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors shadow-sm"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(cert._id)}
                      className="p-2 bg-white/90 backdrop-blur border border-slate-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors shadow-sm"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {certificates.length === 0 && (
              <div className="col-span-1 md:col-span-2 text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
                <p className="text-slate-500 font-medium">No certificates added yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
