import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { useBlog } from "../hook/allData";
import Loader from "../components/Loader";
import { useEffect, useRef } from "react";

/* 🧲 Subtle Magnetic + 3D Wrapper */
function Magnetic3D({
  children,
  className = "",
  translateStrength = 12,
  rotateStrength = 6,
}) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });
  const springRotateX = useSpring(rotateX, { stiffness: 220, damping: 18 });
  const springRotateY = useSpring(rotateY, { stiffness: 220, damping: 18 });

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const percentX = (relX - midX) / midX; // -1 to 1
    const percentY = (relY - midY) / midY; // -1 to 1

    x.set(percentX * translateStrength);
    y.set(percentY * translateStrength);

    rotateX.set(-percentY * rotateStrength);
    rotateY.set(percentX * rotateStrength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className={className}>
      <motion.div
        ref={ref}
        style={{
          x: springX,
          y: springY,
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </motion.div>
    </div>
  );
}

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
      {/* 🔵 Soft, STABLE background blobs (no animation now) */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-8 left-6 w-60 h-60 bg-sky-200/70 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-indigo-200/60 rounded-full blur-3xl" />
        <div className="absolute inset-x-10 top-1/2 h-px bg-gradient-to-r from-transparent via-sky-100 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        {/* 🔝 Hero-style blog heading */}
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
            <Magnetic3D
              key={blog._id || blog.slug || `blog-${index}`}
              translateStrength={12}
              rotateStrength={6}
              className="h-full"
            >
              <motion.article
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.45,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  boxShadow: "0 18px 40px rgba(15,23,42,0.16)",
                  transition: { duration: 0.18, ease: "easeOut" },
                }}
                className="relative bg-white/95 border border-slate-200 rounded-2xl shadow-[0_10px_25px_rgba(15,23,42,0.08)]
                           backdrop-blur-lg text-left overflow-hidden flex flex-col"
              >
                {/* 🔹 Subtle gradient ring on hover (no crazy glow) */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl">
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-sky-400/0 via-indigo-400/0 to-pink-400/0 group-hover:from-sky-400/30 group-hover:via-indigo-400/25 group-hover:to-pink-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Image */}
                {blog.image && (
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <motion.img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-40 sm:h-44 object-cover"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    />
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-slate-950/40 via-slate-900/0 to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col gap-3 flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 line-clamp-2 group-hover:text-slate-950 transition-colors duration-200">
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

                  <p className="text-sm text-slate-600 line-clamp-3 group-hover:text-slate-700 transition-colors duration-200">
                    {blog.description?.slice(0, 130)}...
                  </p>

                  {/* Read more button */}
                  <div className="mt-3">
                    <motion.div
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.96, y: 0 }}
                      className="inline-flex px-4 py-2 rounded-full bg-sky-600 text-white text-sm font-medium shadow-[0_10px_25px_rgba(37,99,235,0.35)] hover:bg-sky-700 transition-colors"
                    >
                      <Link
                        to={`/blog/${blog._id}`}
                        className="inline-flex items-center gap-1"
                      >
                        <span>Read More</span>
                        <motion.span
                          initial={{ x: 0 }}
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                        >
                          →
                        </motion.span>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            </Magnetic3D>
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
