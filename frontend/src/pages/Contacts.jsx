import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";

export default function Contact() {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const API_BASE_URL = "http://localhost:5000"; // 🔥 Backend URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/contacts/contact`,
        contactData
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Message sent successfully!");
        setContactData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-sky-50 text-slate-900 overflow-hidden"
    >
      {/* 🔵 Soft background blobs (same family as skills/projects) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{
            x: [0, 25, -20, 0],
            y: [0, -18, 12, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          className="absolute -left-16 top-10 w-64 h-64 bg-sky-200 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -20, 20, 0],
            y: [0, 20, -15, 0],
            opacity: [0.12, 0.28, 0.12],
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          className="absolute -right-24 bottom-0 w-72 h-72 bg-indigo-200 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Top heading like screenshot */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <span className="text-[2.5rem] tracking-[0.2em] uppercase text-slate-500/80">
            Get in touch
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            Let&apos;s create something
          </h2>
          <motion.p
            className="mt-1 pb-3 text-3xl sm:text-4xl md:text-5xl font-extrabold 
                       bg-gradient-to-r from-sky-500 via-indigo-500 to-rose-500 
                       bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            amazing together
          </motion.p>
          <p className="mt-4 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
            Have an idea, project, or just want to say hi? Drop a message and
            I&apos;ll get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Bottom grid: left info, right form */}
        <div className="grid lg:grid-cols-[1.1fr_1.3fr] gap-10 items-start">
          {/* LEFT – Quick contact */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold">Quick Contact</h3>
            <p className="text-sm sm:text-base text-slate-600 max-w-md">
              I&apos;d love to hear from you. Whether you have a question,
              collaboration idea or just want to say hello, feel free to reach
              out.
            </p>

            <div className="space-y-4 text-sm sm:text-base">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 rounded-full bg-sky-50 text-sky-600 items-center justify-center">
                  <Mail className="w-4 h-4" />
                </span>
                <a
                  href="mailto:patelmihir0367@gmail.com.com"
                  className="text-slate-700 hover:text-sky-600 transition"
                >
                  patelmihir0367@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 rounded-full bg-emerald-50 text-emerald-600 items-center justify-center">
                  <Phone className="w-4 h-4" />
                </span>
                <a
                  href="tel:+916354689922"
                  className="text-slate-700 hover:text-sky-600 transition"
                >
                  +91 63546 89922
                </a>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 rounded-full bg-rose-50 text-rose-500 items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </span>
                <p className="text-slate-700">Idar Gujarat, India</p>
              </div>
            </div>

            {/* Socials */}
            <div className="pt-4">
              <p className="text-sm font-medium text-slate-600 mb-3">
                Let&apos;s connect
              </p>
              <div className="flex gap-3">
                <motion.a
                  href="https://www.linkedin.com/in/mihir-patel-a91380289/"
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:bg-sky-50"
                >
                  <Linkedin className="w-4 h-4 text-slate-700" />
                </motion.a>
                <motion.a
                  href="https://github.com/this-is-mihir"
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:bg-slate-50"
                >
                  <Github className="w-4 h-4 text-slate-700" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT – Form card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            {/* subtle animated border glow around card */}
            <motion.div
              className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-sky-300/40 via-indigo-300/40 to-sky-200/40"
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
              style={{ filter: "blur(10px)" }}
            />

            <div className="relative bg-white rounded-3xl shadow-[0_18px_45px_rgba(15,23,42,0.12)] border border-slate-100 px-6 py-6 sm:px-8 sm:py-8">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-slate-900">
                Send a Message
              </h3>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Name */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={contactData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-900 border border-slate-200 text-sm
                               focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={contactData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-900 border border-slate-200 text-sm
                               focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    name="message"
                    value={contactData.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-900 border border-slate-200 text-sm
                               focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 resize-none"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full bg-sky-600 text-white py-3 rounded-xl font-semibold text-sm sm:text-base
                             shadow-[0_14px_30px_rgba(37,99,235,0.4)] hover:bg-sky-700 transition-colors"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
