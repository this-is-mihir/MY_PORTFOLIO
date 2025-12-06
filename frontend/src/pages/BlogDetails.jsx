import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useBlog } from "../hook/allData";
import { useEffect } from "react";
import Loader from "../components/Loader";

export default function BlogDetails() {
  const { blogs, loading, fetchBlogs } = useBlog();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const { id } = useParams();
  const blog = blogs.find((b) => b._id === id);

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <p>Blog not found.</p>
        <Link to="/blog" className="ml-4 text-pink-400 underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section
          className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-sky-50 
                     text-slate-900 min-h-screen overflow-hidden"
        >
          {/* 🔵 Soft animated background blobs (same vibe as skills/projects) */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <motion.div
              animate={{
                x: [0, 30, -20, 0],
                y: [0, -20, 10, 0],
                opacity: [0.18, 0.35, 0.18],
              }}
              transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
              className="absolute -left-16 top-10 w-64 h-64 bg-sky-200 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, -25, 25, 0],
                y: [0, 20, -15, 0],
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
              className="absolute -right-24 bottom-0 w-72 h-72 bg-indigo-200 rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-5xl mx-auto px-6 space-y-8 relative z-10">
            {/* Heading – blog theme style */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="text-[2rem] tracking-[0.19em] uppercase text-slate-500/80">
                Blog Article
              </span>
              <h1 className="mt-3 text-3xl sm:text-4xl uppercase font-extrabold leading-tight">
                {blog.title}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-500">
                By{" "}
                <span className="font-semibold text-sky-700">
                  {blog.author}
                </span>{" "}
                ·{" "}
                <span className="text-slate-400">
                  {blog.date.slice(0, 10)}
                </span>
              </p>
            </motion.div>

            {/* Image – smaller, card style */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-4"
            >
              <div className="rounded-3xl overflow-hidden bg-white shadow-[0_18px_40px_rgba(15,23,42,0.16)] border border-slate-200">
                <motion.img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full max-h-80 sm:max-h-96 object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-slate-700 text-base sm:text-lg leading-relaxed mt-6"
            >
              {blog.description}
            </motion.p>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <Link
                to="/blog"
                className="inline-flex items-center px-5 py-2.5 rounded-2xl bg-sky-600 text-white 
                           text-sm sm:text-base font-medium shadow-[0_10px_25px_rgba(37,99,235,0.35)] 
                           hover:bg-sky-700 hover:scale-105 transition"
              >
                ← Back to Blog
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}
