import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useBlog } from "../hook/allData";
import toast from "react-hot-toast";

export default function AddBlog() {
  const {
    blogs,
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    loading,
    error,
  } = useBlog();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    author: "",
    date: "",
    description: "",
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddOrEdit = async (e) => {
    e.preventDefault();

    if (
      !formData.image ||
      !formData.title ||
      !formData.author ||
      !formData.date ||
      !formData.description
    )
      return;

    try {
      if (editId) {
        await updateBlog(editId, formData);
        toast.success("Blog updated successfully ✅");
        setEditId(null);
      } else {
        await createBlog(formData);
        toast.success("Blog created successfully 🎉");
      }
    } catch (err) {
      toast.error("Something went wrong ❌");
    }

    setFormData({
      image: "",
      title: "",
      author: "",
      date: "",
      description: "",
    });
  };

  const handleEdit = (blog) => {
    setFormData({
      image: blog.image,
      title: blog.title,
      author: blog.author,
      date: blog.date,
      description: blog.description,
    });
    setEditId(blog._id);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(id);
        toast.success("Blog deleted successfully 🗑️");
      } catch {
        toast.error("Failed to delete blog ❌");
      }
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold text-indigo-800 mb-6 md:mb-8 text-center">
        Manage Blogs
      </h2>

      {/* Form */}
      <form
        onSubmit={handleAddOrEdit}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4 w-full"
      >
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Blog Image URL"
          className="p-3 rounded-lg w-full border border-gray-300 focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Blog Title"
          className="p-3 rounded-lg border w-full border-gray-300 focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          className="p-3 rounded-lg w-full border border-gray-300 focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="p-3 rounded-lg border w-full border-gray-300 focus:ring-2 focus:ring-pink-500"
        />
        <textarea
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Short Description"
          className="p-3 rounded-lg border w-full border-gray-300 focus:ring-2 focus:ring-pink-500"
        />

        <button
          type="submit"
          className="w-full col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold transition"
        >
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* Blogs Table */}
      <div className="mt-10 overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="min-w-full text-xs sm:text-sm md:text-base divide-y divide-gray-200">
          <thead className="bg-indigo-700 text-white">
            <tr>
              <th className="px-2 sm:px-4 py-3 text-left font-semibold">Image</th>
              <th className="px-2 sm:px-4 py-3 text-left font-semibold">Title</th>
              <th className="px-2 sm:px-4 py-3 text-left font-semibold">Author</th>
              <th className="px-2 sm:px-4 py-3 text-left font-semibold">Date</th>
              <th className="px-2 sm:px-4 py-3 text-left font-semibold hidden md:table-cell">
                Description
              </th>
              <th className="px-2 sm:px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {blogs.map((blog) => (
              <motion.tr
                key={blog._id}
                whileHover={{ scale: 1.02 }}
                className="transition"
              >
                <td className="px-2 sm:px-4 py-2">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                  />
                </td>
                <td className="px-2 sm:px-4 py-2">{blog.title}</td>
                <td className="px-2 sm:px-4 py-2">{blog.author}</td>
                <td className="px-2 sm:px-4 py-2">{blog.date}</td>
                <td className="px-2 sm:px-4 py-2 hidden md:table-cell">
                  {blog.description.slice(0, 50)}...
                </td>
                <td className="px-2 sm:px-4 py-2 flex gap-1 sm:gap-2 flex-wrap">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg text-xs sm:text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs sm:text-sm"
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
