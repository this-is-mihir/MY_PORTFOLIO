import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { AdminAuthContext } from "../context/AdminAuthContext";
import Loader from "../components/Loader";

// ✅ LOCAL BACKEND BASE URL
const API_BASE_URL = "https://my-portfolio-backend-z9b2.onrender.com";

export default function ShowMessages() {
  const { admin } = useContext(AdminAuthContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all messages from API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/contacts/contact`,
          {
            headers: { Authorization: `Bearer ${admin?.token}` },
          }
        );
        setMessages(res.data.totalContacts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching messages:", err);
        toast.error("Failed to load messages");
        setLoading(false);
      }
    };
    fetchMessages();
  }, [admin]);

  // Delete message by ID
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this message?")) {
      try {
        await axios.delete(
          `${API_BASE_URL}/api/contacts/contact/${id}`,
          {
            headers: { Authorization: `Bearer ${admin?.token}` },
          }
        );

        // Update local state after delete
        setMessages((prev) => prev.filter((msg) => msg._id !== id));
        toast.success("Message deleted");
      } catch (err) {
        console.error("Error deleting message:", err);
        toast.error("Failed to delete message");
      }
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="p-6 bg-gray-100 min-h-screen">
          <h2 className="text-3xl font-bold text-indigo-800 mb-8">Messages</h2>

          {/* Messages Table */}
          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-700 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {messages.map((msg) => (
                  <motion.tr
                    key={msg._id}
                    whileHover={{ scale: 1.02 }}
                    className="cursor-pointer transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {msg.name}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{msg.email}</td>
                    <td className="px-6 py-4 text-gray-500">{msg.message}</td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(msg._id)}
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
      )}
    </>
  );
}
