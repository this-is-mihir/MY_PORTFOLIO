// frontend/src/admin/ExperienceManager.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API_BASE_URL = "https://portfolio-backend-6wpf.onrender.com";

export default function ExperienceManager() {
  const [experience, setExperience] = useState([]);
  const [form, setForm] = useState({
    title: "",
    years: "",
    tech: "",
    details: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCurriculum = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/curriculum`);
      setExperience(res.data.experience || []);
    } catch (err) {
      console.error("Failed to fetch experience:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurriculum();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      years: "",
      tech: "",
      details: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // 🔁 UPDATE
        await axios.put(
          `${API_BASE_URL}/api/curriculum/experience/${editingId}`,
          form
        );
      } else {
        // ➕ ADD
        await axios.post(`${API_BASE_URL}/api/curriculum/experience`, form);
      }
      await fetchCurriculum();
      resetForm();
    } catch (err) {
      console.error("Failed to save experience:", err);
    }
  };

  const handleEditClick = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title || "",
      years: item.years || "",
      tech: item.tech || "",
      details: item.details || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this experience?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/curriculum/experience/${id}`);
      await fetchCurriculum();
      if (editingId === id) resetForm();
    } catch (err) {
      console.error("Failed to delete experience:", err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6"
      >
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          {editingId ? "Edit Experience" : "Add Experience"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Title / Role
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. MERN Stack Projects"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Experience (years, months)
            </label>
            <input
              type="text"
              name="years"
              value={form.years}
              onChange={handleChange}
              placeholder="e.g. 1.5 years"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Technologies Used
            </label>
            <input
              type="text"
              name="tech"
              value={form.tech}
              onChange={handleChange}
              placeholder="e.g. MERN, Tailwind, JWT, Stripe..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Details
            </label>
            <textarea
              name="details"
              rows={3}
              value={form.details}
              onChange={handleChange}
              placeholder="Describe what kind of projects you built, responsibilities, impact, etc."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div className="md:col-span-2 flex gap-3 justify-end">
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded-lg border text-sm border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 shadow-sm"
            >
              {editingId ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </motion.div>

      {/* List */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6"
      >
        <h3 className="text-base font-semibold text-slate-900 mb-4">
          Experience List
        </h3>

        {loading ? (
          <p className="text-sm text-slate-500">Loading...</p>
        ) : experience.length === 0 ? (
          <p className="text-sm text-slate-500">
            No experience records added yet.
          </p>
        ) : (
          <div className="space-y-3">
            {experience.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-slate-200 px-3 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    {item.years} · {item.tech}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {item.details}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="px-3 py-1.5 rounded-lg text-xs bg-sky-50 text-sky-700 border border-sky-100 hover:bg-sky-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1.5 rounded-lg text-xs bg-rose-50 text-rose-700 border border-rose-100 hover:bg-rose-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
