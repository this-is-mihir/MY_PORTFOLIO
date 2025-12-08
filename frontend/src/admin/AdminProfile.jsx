// src/admin/AdminProfile.jsx
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { AdminAuthContext } from "../context/AdminAuthContext";
import fallbackDP from "../assets/Images/fomal.png";

const API_BASE_URL = "https://my-portfolio-backend-z9b2.onrender.com";

export default function AdminProfile() {
  const { admin } = useContext(AdminAuthContext);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    avatar: "",
    resumeUrl: "", // ✅ NEW
  });

  // ✅ NEW: sirf UI ke liye — konsa file select hua
  const [selectedResumeName, setSelectedResumeName] = useState("");

  // 🔹 Profile load on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/profile`);
        const data = res.data;

        setFormData({
          name: data?.name || "",
          title: data?.title || "",
          bio: data?.bio || "",
          avatar: data?.avatar || "",
          resumeUrl: data?.resumeUrl || "", // ✅ load resume url
        });
      } catch (err) {
        console.error("Failed to load profile:", err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!admin?.token) {
      toast.error("Not authorized");
      return;
    }

    setSaving(true);
    try {
      await axios.put(`${API_BASE_URL}/api/profile`, formData, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Profile updated ✅");
    } catch (err) {
      console.error("Profile update failed:", err);
      toast.error(
        err.response?.data?.message || "Failed to update profile ❌"
      );
    } finally {
      setSaving(false);
    }
  };

  // ✅ Resume upload handler (PDF)
  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file only");
      return;
    }

    if (!admin?.token) {
      toast.error("Not authorized");
      return;
    }

    // ✅ UI me dikhane ke liye file ka naam store
    setSelectedResumeName(file.name);

    const formDataUpload = new FormData();
    formDataUpload.append("resume", file); // field name: "resume"

    setUploadingResume(true);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/profile/resume`,
        formDataUpload,
        {
          headers: {
            Authorization: `Bearer ${admin.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newUrl = res.data?.resumeUrl;
      if (newUrl) {
        setFormData((prev) => ({ ...prev, resumeUrl: newUrl }));
        toast.success("Resume uploaded ✅");
      } else {
        toast.error("Resume upload response invalid");
      }
    } catch (err) {
      console.error("Resume upload failed:", err);
      toast.error(
        err.response?.data?.message || "Failed to upload resume ❌"
      );
      // agar fail ho gaya to naam bhi hata de
      setSelectedResumeName("");
    } finally {
      setUploadingResume(false);
      // reset file input
      e.target.value = "";
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-slate-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen md:min-h-0">
      <h2 className="text-2xl md:text-3xl font-bold text-indigo-800 mb-6">
        Profile Settings
      </h2>

      <div className="grid gap-6 lg:grid-cols-[2fr,1.2fr]">
        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md p-4 md:p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="FullStack Developer (MERN)"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Short Bio
            </label>
            <textarea
              name="bio"
              rows={4}
              placeholder="Short description shown on hero section..."
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Avatar Image URL
            </label>
            <input
              type="text"
              name="avatar"
              placeholder="https://your-cdn.com/your-photo.png"
              value={formData.avatar}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
            />
            <p className="text-xs text-slate-500 mt-1">
              Tip: Upload image to Cloudinary / ImgBB and paste the URL here.
            </p>
          </div>

          {/* ✅ Resume upload block */}
          <div className="pt-2 border-t border-slate-200 mt-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Resume (PDF)
            </label>

            <input
              type="file"
              accept="application/pdf"
              onChange={handleResumeUpload}
              className="block w-full text-sm text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
            />

            {/* ✅ yaha dikhega konsa file select / upload hua */}
            {selectedResumeName && (
              <p className="mt-1 text-xs text-slate-600">
                Selected file:{" "}
                <span className="font-medium">{selectedResumeName}</span>
              </p>
            )}

            {formData.resumeUrl && (
              <p className="text-xs text-slate-500 mt-2">
                Current resume:{" "}
                <a
                  href={formData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline"
                >
                  Open in new tab
                </a>
              </p>
            )}

            {uploadingResume && (
              <p className="mt-1 text-xs text-slate-500">
                Uploading resume...
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-2 inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium text-sm md:text-base hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </motion.form>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md p-4 md:p-6 flex flex-col items-center gap-4"
        >
          <p className="text-sm font-semibold text-slate-600 mb-2">
            Live Preview
          </p>
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-sky-100 blur-2xl" />
            <img
              src={
                formData.avatar && formData.avatar.trim() !== ""
                  ? formData.avatar
                  : fallbackDP
              }
              alt={formData.name || "Profile"}
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-sky-200 shadow-lg"
            />
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-lg font-bold text-slate-800">
              {formData.name || "Your Name"}
            </h3>
            <p className="text-sm text-slate-600">
              {formData.title || "Your Title"}
            </p>
            <p className="text-xs text-slate-500 max-w-xs mx-auto line-clamp-3">
              {formData.bio ||
                "This short bio will be shown below your hero section title."}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
