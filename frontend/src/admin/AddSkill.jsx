import { useState } from "react";
import { motion } from "framer-motion";
import { SkillContext } from "../context/SkillContext";
import { useContext } from "react";
import toast from "react-hot-toast";
export default function AddSkill() {
  const { skills, deleteSkill, addSkill, updateSkill } =
    useContext(SkillContext);

  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    category: "",
  });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddOrEditSkill = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.logo || !formData.category) return;

    if (editId) {
      // ✅ Update existing skill via context
      updateSkill(editId, formData);
      setEditId(null);
      toast.success("Skill updated successfully ✅");
    } else {
      // ✅ Add new skill via context
      addSkill(formData);
      toast.success("Skill added successfully 🎉");
    }

    setFormData({ name: "", logo: "", category: "" });
  };

  const handleEdit = (skill) => {
    setFormData({
      name: skill.name,
      logo: skill.logo,
      category: skill.category,
    });
    setEditId(skill._id);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      // ✅ Call context delete function (this also calls backend API)
      try {
        await deleteSkill(id);
        toast.success("Skill deleted successfully 🗑️");
      } catch {
        toast.error("Failed to delete skill ❌");
      }
    }
  };

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
          {/* <option value="AI/ML">AI/ML</option> */}
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
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Logo
              </th>
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
            {skills.map((skill) => (
              <motion.tr
                key={skill._id}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer transition"
              >
                <td className="px-6 py-4">
                  <img
                    src={skill.logo}
                    alt={skill.logo}
                    className="w-10 h-10 object-contain"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-700">
                  {skill.name}
                </td>
                <td className="px-6 py-4 text-gray-500">{skill.category}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(skill._id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
