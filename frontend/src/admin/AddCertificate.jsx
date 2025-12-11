import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { AdminAuthContext } from "../context/AdminAuthContext";
import toast from "react-hot-toast";

// ✅ LOCAL BACKEND BASE URL
const API_BASE_URL = "http://localhost:5000";

export default function AddCertificate() {
  const { admin } = useContext(AdminAuthContext); // token comes from context
  const [certificates, setCertificates] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    date: "",
    img: "",
  });
  const [editId, setEditId] = useState(null);

  // Fetch certificates on mount
  useEffect(() => {
    fetchCertificates();
  }, []);

  // 🔹 Fetch All Certificates
  const fetchCertificates = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/certificates/certificate/`
      );
      setCertificates(res.data.certificates);
    } catch (err) {
      console.error("Failed to fetch certificates:", err);
      toast.error("Failed to fetch certificates ❌");
    }
  };

  // 🔹 Handle form input
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // 🔹 Add / Update certificate
  const handleAddOrEdit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.issuer || !formData.date || !formData.img)
      return;

    try {
      if (editId) {
        // Update
        await axios.put(
          `${API_BASE_URL}/api/certificates/certificate/${editId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${admin?.token}`,
            },
          }
        );
        toast.success("Certificate updated successfully ✅");
      } else {
        // Add
        await axios.post(
          `${API_BASE_URL}/api/certificates/certificate/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${admin?.token}`,
            },
          }
        );
        toast.success("Certificate created successfully 🎉");
      }
      fetchCertificates(); // refresh list
      setFormData({ title: "", issuer: "", date: "", img: "" });
      setEditId(null);
    } catch (err) {
      console.error("Error saving certificate:", err);
      toast.error("Failed to save certificate ❌");
    }
  };

  // 🔹 Edit certificate
  const handleEdit = (cert) => {
    setFormData({
      title: cert.title,
      issuer: cert.issuer,
      date: cert.date,
      img: cert.img,
    });
    setEditId(cert._id); // use backend _id
  };

  // 🔹 Delete certificate
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this certificate?")) {
      try {
        await axios.delete(
          `${API_BASE_URL}/api/certificates/certificate/${id}`,
          {
            headers: {
              Authorization: `Bearer ${admin?.token}`,
            },
          }
        );
        toast.success("Certificate deleted successfully 🗑️");
        fetchCertificates();
      } catch (err) {
        console.error("Error deleting certificate:", err);
        toast.error("Failed to delete certificate ❌");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-indigo-800 mb-8">
        Manage Certificates
      </h2>

      {/* Form */}
      <form
        onSubmit={handleAddOrEdit}
        className="flex flex-col md:flex-row gap-4 mb-10 items-center"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Certificate Title"
          className="p-3 rounded-lg flex-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="text"
          name="issuer"
          value={formData.issuer}
          onChange={handleChange}
          placeholder="Issuer"
          className="p-3 rounded-lg flex-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="p-3 rounded-lg flex-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="text"
          name="img"
          value={formData.img}
          onChange={handleChange}
          placeholder="Certificate Image URL"
          className="p-3 rounded-lg flex-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold transition"
        >
          {editId ? "Update Certificate" : "Add Certificate"}
        </button>
      </form>

      {/* Certificates Table */}
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
                Issuer
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {certificates.map((cert) => (
              <motion.tr
                key={cert._id}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer transition"
              >
                <td className="px-6 py-4">
                  <img
                    src={cert.img}
                    alt={cert.title}
                    className="w-16 h-16 object-contain"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-700">
                  {cert.title}
                </td>
                <td className="px-6 py-4 text-gray-500">{cert.issuer}</td>
                <td className="px-6 py-4 text-gray-500">{cert.date}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(cert)}
                    className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cert._id)}
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
