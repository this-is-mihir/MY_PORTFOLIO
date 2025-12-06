import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useProjects } from "../hook/allData";
import toast from "react-hot-toast";

export default function AddProject() {
  const {
    projects,
    project,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    loading,
    error,
  } = useProjects();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech: "",
    image: "",
    githubLink: "",
    liveDemoLink: "",
  });
  const [editId, setEditId] = useState(null);

  // ✅ Load all projects when component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ Handle Input
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Handle Add or Edit
  const handleAddOrEdit = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.description ||
      !formData.tech ||
      !formData.image ||
      !formData.githubLink ||
      !formData.liveDemoLink
    )
      return;

    const techArray = formData.tech.split(",").map((t) => t.trim());

    if (editId) {
      // 🔹 Update API
      await updateProject(editId, { ...formData, tech: techArray });
      toast.success("Project updated successfully ✅");
      setEditId(null);
    } else {
      // 🔹 Create API
      toast.success("Project added successfully 🎉");
      await createProject({ ...formData, tech: techArray });
    }

    // ✅ Reset form
    setFormData({
      title: "",
      description: "",
      tech: "",
      image: "",
      githubLink: "",
      liveDemoLink: "",
    });
  };

  // ✅ Handle Edit
  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      tech: project.tech.join(", "),
      image: project.image,
      githubLink: project.githubLink,
      liveDemoLink: project.liveDemoLink,
    });
    setEditId(project._id); // 🔹 backend `_id`
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      toast.success("Project deleted successfully 🗑️");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-indigo-800 mb-8">
        Manage Projects
      </h2>

      {/* Form */}
      <form
        onSubmit={handleAddOrEdit}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4 mb-2 w-full"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Project Title"
          className="p-3 rounded-lg flex-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <textarea
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Project Description"
          className="p-3 rounded-lg flex-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="text"
          name="tech"
          value={formData.tech}
          onChange={handleChange}
          placeholder="Tech Stack (comma separated)"
          className="p-3 rounded-lg flex-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Project Image URL"
          className="p-3 rounded-lg flex-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="text"
          name="githubLink"
          value={formData.githubLink}
          onChange={handleChange}
          placeholder="Github Link"
          className="p-3 rounded-lg flex-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="text"
          name="liveDemoLink"
          value={formData.liveDemoLink}
          onChange={handleChange}
          placeholder="Live Link"
          className="p-3 rounded-lg flex-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold transition"
        >
          {editId ? "Update Project" : "Add Project"}
        </button>
      </form>

      {/* Projects Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Image
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Tech Stack
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Github
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                LiveDemo
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((proj) => (
              <motion.tr
                key={proj._id || proj.id}  // ✅ key error fix yahi hai
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer transition"
              >
                <td className="px-6 py-4">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-16 h-16 object-contain"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-700">
                  {proj.title}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {proj.description.slice(0, 100)}...
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {proj.tech.join(", ")}
                </td>
                <td className="px-6 py-4">
                  <a
                    href={proj.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </td>
                <td className="px-6 py-4">
                  <a
                    href={proj.liveDemoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(proj)}
                    className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(proj._id)}
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
