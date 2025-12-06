import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useBlog } from "../hook/allData";
import Loader from "../components/Loader";
import { useEffect } from "react";

export default function BlogSection() {
  const { blogs, loading, fetchBlogs } = useBlog();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const displayedBlogs = blogs.slice(0, 3);

  if (loading) return <Loader />;

  return (
    <section
      id="blogs"
      className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-sky-50 text-slate-900 overflow-hidden"
    >
      {/* 🔵 Soft background blobs for depth (light theme) */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 25, -25, 0],
            y: [0, -18, 18, 0],
            opacity: [0.18, 0.35, 0.18],
          }}
          transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
          className="absolute top-6 left-10 w-64 h-64 bg-sky-200 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -20, 20, 0],
            y: [0, 20, -20, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ repeat: Infinity, duration: 17, ease: "easeInOut" }}
          className="absolute bottom-0 right-12 w-72 h-72 bg-indigo-200 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        {/* 🔝 Hero-style blog heading (like screenshot) */}
        <div className="flex flex-col items-center mb-12">
          <span className="text-[2.5rem] tracking-[0.16em] uppercase text-slate-500 mb-3">
            The Blog
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            Words remembered,
          </h2>

          <p className="mt-2 pb-1 text-2xl sm:text-3xl md:text-4xl font-semibold italic leading-[1.3] bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            within the pensieve
          </p>

          <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-500">
            A collection of my latest thoughts, tutorials, and stories — crafted
            to inspire, inform, and spark new ideas.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedBlogs.map((blog, index) => (
            <motion.article
              key={blog._id || blog.slug || `blog-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                delay: index * 0.12,
                duration: 0.6,
                ease: "easeOut",
              }}
              whileHover={{
                y: -6,
                scale: 1.02,
                boxShadow: "0 18px 40px rgba(15,23,42,0.15)",
                transition: { duration: 0.2 },
              }}
              className="relative bg-white/95 border border-slate-200 rounded-2xl shadow-[0_10px_25px_rgba(15,23,42,0.08)]
                         backdrop-blur-lg text-left overflow-hidden flex flex-col"
            >
              {/* 🔥 Subtle animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                animate={{
                  background: [
                    "linear-gradient(120deg, rgba(56,189,248,0.4), transparent, rgba(129,140,248,0.4))",
                    "linear-gradient(240deg, rgba(56,189,248,0.4), transparent, rgba(129,140,248,0.4))",
                    "linear-gradient(360deg, rgba(56,189,248,0.4), transparent, rgba(129,140,248,0.4))",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                style={{
                  padding: "1px",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  opacity: 0.45,
                }}
              />

              {/* Image – zoom issue fixed (less height + tiny hover) */}
              {blog.image && (
                <div className="relative overflow-hidden rounded-t-2xl">
                  <motion.img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-40 sm:h-44 object-cover"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-5 sm:p-6 flex flex-col gap-3 flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-500">
                  By{" "}
                  <span className="font-medium text-sky-700">
                    {blog.author}
                  </span>
                  {blog.date && (
                    <>
                      {" "}
                      ·{" "}
                      <span className="text-slate-400">
                        {blog.date.slice(0, 10)}
                      </span>
                    </>
                  )}
                </p>

                <p className="text-sm text-slate-600 line-clamp-3">
                  {blog.description?.slice(0, 130)}...
                </p>

                {/* Read more button */}
                <div className="mt-3">
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex px-4 py-2 rounded-full bg-sky-600 text-white text-sm font-medium shadow-[0_10px_25px_rgba(37,99,235,0.35)] hover:bg-sky-700 transition-colors"
                  >
                    <Link to={`/blog/${blog._id}`}>Read More →</Link>
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* See More Button */}
        {blogs.length > displayedBlogs.length && (
          <div className="mt-10">
            <motion.div
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex px-6 py-3 rounded-2xl bg-sky-600 text-white font-medium shadow-[0_10px_25px_rgba(37,99,235,0.35)] hover:bg-sky-700 transition-colors"
            >
              <Link to="/blog">See More Blogs</Link>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
