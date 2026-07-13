import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkillContext } from "../context/SkillContext";
import toast from "react-hot-toast";
import { Edit2, Trash2, Plus, Image as ImageIcon, FolderCode } from "lucide-react";

export default function AddSkill() {
  const { skills, deleteSkill, addSkill, updateSkill } = useContext(SkillContext) ?? {};

  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    category: "",
  });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddOrEditSkill = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.logo || !formData.category) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      if (editId) {
        await updateSkill(editId, formData);
        setEditId(null);
        toast.success("Skill updated successfully ✅");
      } else {
        await addSkill(formData);
        toast.success("Skill added successfully 🎉");
      }
      setFormData({ name: "", logo: "", category: "" });
    } catch (err) {
      console.error("Skill add/update failed:", err);
    }
  };

  const handleEdit = (skill) => {
    setFormData({
      name: skill?.name || "",
      logo: skill?.logo || "",
      category: skill?.category || "",
    });
    setEditId(skill?._id || skill?.id || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (confirm("Are you sure you want to delete this skill?")) {
      try {
        await deleteSkill(id);
        toast.success("Skill deleted 🗑️");
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const safeSkills = Array.isArray(skills) ? skills : [];

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          Skills Manager
        </h2>
        <p className="text-sm text-slate-500 mt-1">Add, edit, or categorize your technical skills.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-8 items-start">
        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 xl:sticky xl:top-24">
          <h3 className="text-[15px] font-bold text-slate-800 mb-6 flex items-center gap-2">
            {editId ? <Edit2 size={18} /> : <Plus size={18} />}
            {editId ? "Edit Skill" : "Add New Skill"}
          </h3>
          <form onSubmit={handleAddOrEditSkill} className="space-y-4">
            
            <div>
              <label className="text-[12px] font-semibold text-slate-700 ml-1 mb-1.5 block">Skill Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. React.js"
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/20"
              />
            </div>

            <div>
              <label className="text-[12px] font-semibold text-slate-700 ml-1 mb-1.5 block">Logo URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/20"
                />
              </div>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-slate-700 ml-1 mb-1.5 block">Category</label>
              <div className="relative">
                <FolderCode className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/20 appearance-none cursor-pointer"
                >
                  <option value="">Select Category...</option>
                  <option value="All">All</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Tools">Tools</option>
                </select>
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
                    setFormData({ name: "", logo: "", category: "" });
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
            <h3 className="text-[15px] font-bold text-slate-800">Your Skills ({safeSkills.length})</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            <AnimatePresence>
              {safeSkills.map((skill, idx) => {
                const key = skill?._id || skill?.id || `${skill?.name ?? "skill"}-${idx}`;
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center bg-white border border-slate-100 rounded-2xl p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:shadow-md transition-all group relative overflow-hidden"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      {skill?.logo ? (
                        <img src={skill.logo} alt={skill.name} className="w-8 h-8 object-contain" />
                      ) : (
                        <ImageIcon size={20} className="text-slate-300" />
                      )}
                    </div>
                    
                    <h4 className="font-bold text-slate-800 text-[13px] text-center w-full truncate">{skill?.name || "Unnamed"}</h4>
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mt-1">{skill?.category}</p>

                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="p-2 bg-white border border-slate-200 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors shadow-sm"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(skill?._id || skill?.id)}
                        className="p-2 bg-white border border-slate-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors shadow-sm"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {safeSkills.length === 0 && (
              <div className="col-span-full text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
                <p className="text-slate-500 font-medium">No skills added yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
