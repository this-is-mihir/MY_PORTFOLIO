import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { SkillContext } from "../context/SkillContext";
import toast from "react-hot-toast";

export default function AddSkill() {
  const { skills, deleteSkill, addSkill, updateSkill } =
    useContext(SkillContext) ?? {};

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
    } catch (err) {
      console.error("Skill add/update failed:", err);
      toast.error("Operation failed ❌");
    }

    setFormData({ name: "", logo: "", category: "" });
  };

  const handleEdit = (skill) => {
    setFormData({
      name: skill?.name || "",
      logo: skill?.logo || "",
      category: skill?.category || "",
    });
    setEditId(skill?._id || skill?.id || null);
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (confirm("Are you sure you want to delete this skill?")) {
      try {
        await deleteSkill(id);
        toast.success("Skill deleted successfully 🗑️");
      } catch (err) {
        console.error("Delete failed:", err);
        toast.error("Failed to delete skill ❌");
      }
    }
  };

  // Defensive: ensure we always map over an array
  const safeSkills = Array.isArray(skills) ? skills : [];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-indigo-800 mb-8">Manage Skills</h2>

      {/* Form */}
      <form
        onSubmit={handleAddOrEditSkill}
        className="flex flex-col md:flex-row gap-4 mb-10 items-center"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Skill Name"
          className="p-3 rounded-lg flex-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="text"
          name="logo"
          value={formData.logo}
          onChange={handleChange}
          placeholder="Skill Logo URL"
          className="p-3 rounded-lg flex-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="p-3 rounded-lg flex-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="">Select Category</option>
          <option value="All">All</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Tools">Tools</option>
        </select>
        <button
          type="submit"
          className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold transition"
        >
          {editId ? "Update Skill" : "Add Skill"}
        </button>
      </form>

      {/* Skills Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Logo</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Skill Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {safeSkills.length > 0 ? (
              safeSkills.map((skill, idx) => {
                const key = skill?._id || skill?.id || `${skill?.name ?? "skill"}-${idx}`;
                return (
                  <motion.tr
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    className="cursor-pointer transition"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={skill?.logo || ""}
                        alt={skill?.name || "logo"}
                        className="w-10 h-10 object-contain"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {skill?.name || "Unnamed Skill"}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {skill?.category || "General"}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(skill?._id || skill?.id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No skills found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
