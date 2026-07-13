import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBlogs } from "../hook/allData";
import toast from "react-hot-toast";
import { GripVertical, Edit2, Trash2, Plus, Image as ImageIcon, Save, User as UserIcon } from "lucide-react";

export default function AddBlog() {
  const {
    blogs,
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    reorderBlogs,
  } = useBlogs();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);

  // Drag and Drop State
  const [localList, setLocalList] = useState([]);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    setLocalList(blogs || []);
  }, [blogs]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddOrEdit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.description || !formData.image) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (editId) {
        await updateBlog(editId, formData);
        toast.success("Blog updated successfully ✅");
        setEditId(null);
      } else {
        await createBlog(formData);
        toast.success("Blog added successfully 🎉");
      }
      setFormData({ title: "", author: "", description: "", image: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      author: blog.author,
      description: blog.description,
      image: blog.image,
    });
    setEditId(blog._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      await deleteBlog(id);
      toast.success("Blog deleted successfully 🗑️");
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e, index) => {
    dragItem.current = index;
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnter = (e, index) => {
    dragOverItem.current = index;
    if (dragItem.current !== null && dragItem.current !== dragOverItem.current) {
      const newList = [...localList];
      const draggedItemContent = newList[dragItem.current];
      newList.splice(dragItem.current, 1);
      newList.splice(dragOverItem.current, 0, draggedItemContent);
      dragItem.current = index;
      setLocalList(newList);
    }
  };

  const handleDragEnd = (e) => {
    dragItem.current = null;
    dragOverItem.current = null;
    e.currentTarget.style.opacity = '1';
  };

  const hasReordered = JSON.stringify(localList.map(p => p._id)) !== JSON.stringify(blogs.map(p => p._id));

  const saveOrder = async () => {
    const orderedIds = localList.map(p => p._id);
    await reorderBlogs(orderedIds, localList);
    toast.success("Order saved successfully!");
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          Blogs Manager
        </h2>
        <p className="text-sm text-slate-500 mt-1">Add, edit, or drag to reorder your blog posts.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-8 items-start">
        {/* FORM SECTION */}
        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 sticky top-24">
          <h3 className="text-[15px] font-bold text-slate-800 mb-6 flex items-center gap-2">
            {editId ? <Edit2 size={18} /> : <Plus size={18} />}
            {editId ? "Edit Blog" : "Add New Blog"}
          </h3>
          <form onSubmit={handleAddOrEdit} className="space-y-4">
            
            <div>
              <label className="text-[12px] font-semibold text-slate-700 ml-1 mb-1.5 block">Blog Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Master React in 2024"
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/20"
              />
            </div>

            <div>
              <label className="text-[12px] font-semibold text-slate-700 ml-1 mb-1.5 block">Author</label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Mihir Patel"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/20"
                />
              </div>
            </div>
            
            <div>
              <label className="text-[12px] font-semibold text-slate-700 ml-1 mb-1.5 block">Description / Content</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Blog summary or full content..."
                rows={4}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/20 resize-none"
              />
            </div>

            <div>
              <label className="text-[12px] font-semibold text-slate-700 ml-1 mb-1.5 block">Cover Image URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="image"
                  value={formData.image}
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
                {editId ? "Update Blog" : "Add Blog"}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setFormData({ title: "", author: "", description: "", image: "" });
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
            <h3 className="text-[15px] font-bold text-slate-800">Published Blogs ({localList.length})</h3>
            <AnimatePresence>
              {hasReordered && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={saveOrder}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  <Save size={16} /> Save Order
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-3">
            {localList.map((blog, index) => (
              <div
                key={blog._id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                className="flex items-center gap-4 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="cursor-grab active:cursor-grabbing p-2 text-slate-300 hover:text-slate-500 transition-colors">
                  <GripVertical size={20} />
                </div>
                
                <div className="w-20 h-16 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {blog.image ? (
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon size={24} className="text-slate-300" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 text-[15px] truncate">{blog.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[12px] font-medium text-slate-500">By {blog.author}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {localList.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
                <p className="text-slate-500 font-medium">No blogs published yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
