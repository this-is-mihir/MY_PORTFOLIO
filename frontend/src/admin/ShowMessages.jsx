import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { AdminAuthContext } from "../context/AdminAuthContext";
import Loader from "../components/Loader";
import { Trash2, Mail, User, Clock } from "lucide-react";

const API_BASE_URL = "https://portfolio-backend-6wpf.onrender.com";

export default function ShowMessages() {
  const { admin } = useContext(AdminAuthContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/contacts/contact`, {
          headers: { Authorization: `Bearer ${admin?.token}` },
        });
        // Assuming API returns { totalContacts: [...] }
        setMessages(res.data.totalContacts || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setLoading(false);
      }
    };
    fetchMessages();
  }, [admin]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this message?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/contacts/contact/${id}`, {
          headers: { Authorization: `Bearer ${admin?.token}` },
        });
        setMessages((prev) => prev.filter((msg) => msg._id !== id));
        toast.success("Message deleted");
      } catch (err) {
        console.error("Error deleting message:", err);
        toast.error("Failed to delete message");
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          Inbox Messages
        </h2>
        <p className="text-sm text-slate-500 mt-1">Read and manage messages received from your portfolio contact form.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={msg._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_2px_15px_-3px_rgba(6,81,237,0.05)] hover:shadow-md transition-shadow relative group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 text-slate-500">
                    <User size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-[15px]">{msg.name}</h4>
                    <a href={`mailto:${msg.email}`} className="text-[12px] font-medium text-blue-500 hover:underline flex items-center gap-1 mt-0.5">
                      <Mail size={12} /> {msg.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(msg._id)}
                  className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
                  title="Delete Message"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-50">
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
              </div>

              <div className="mt-4 flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                 {/* Assuming there is a createdAt date, if not just show static text or placeholder */}
                 <Clock size={12} /> Received 
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {messages.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-200 rounded-3xl">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Mail size={24} className="text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">Your inbox is empty.</p>
            <p className="text-slate-400 text-sm mt-1">No new messages from the contact form.</p>
          </div>
        )}
      </div>
    </div>
  );
}
