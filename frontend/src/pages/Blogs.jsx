import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useBlog } from "../hook/allData";
import Loader from "../components/Loader";
import { useEffect, useRef, useState } from "react";

/* =========================================
   ULTIMATE HOVER-REVEAL LIST (Desktop + Mobile)
   ========================================= */
const UltimateHoverReveal = ({ blogs }) => {
  const [hoveredBlog, setHoveredBlog] = useState(null);
  const containerRef = useRef(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.5 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div className="relative w-full" ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={() => setHoveredBlog(null)}>
      
      {/* DESKTOP VIEW (Hidden on Mobile) */}
      <div className="hidden md:flex flex-col border-t border-slate-200 mt-10">
        {blogs.map((blog, idx) => (
          <Link 
            to={`/blog/${blog._id}`} 
            key={blog._id} 
            onMouseEnter={() => setHoveredBlog(blog)} 
            className="group border-b border-slate-200 py-6 flex items-center justify-between relative z-10 transition-all duration-500 px-6 -mx-6 hover:bg-slate-50/80 rounded-2xl overflow-hidden"
          >
            {/* Hover highlight bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-sky-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-center" />

            <div className="flex items-center gap-6 lg:gap-10 transform group-hover:translate-x-3 transition-transform duration-500">
              <span className="text-base font-medium text-slate-300 w-8 shrink-0">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col">
                <span className="text-sky-500 font-bold tracking-widest uppercase text-[10px] mb-1">
                  {blog.date ? blog.date.slice(0, 10) : "Recent"}
                </span>
                <h4 className="text-xl lg:text-3xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors duration-500 leading-snug">
                  {blog.title}
                </h4>
              </div>
            </div>
            
            {/* Animated Circular Arrow */}
            <div className="w-10 h-10 shrink-0 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600 transition-all duration-500 transform group-hover:scale-110 shadow-sm mr-2 group-hover:-translate-y-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Floating Image (Desktop Only) */}
      <motion.div
        className="pointer-events-none absolute top-0 left-0 w-[280px] h-[180px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-50 hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: hoveredBlog ? 1 : 0,
          scale: hoveredBlog ? 1 : 0.8,
          rotate: hoveredBlog ? 3 : -3,
        }}
      >
        {hoveredBlog && (
           <>
             <div className="absolute inset-0 bg-slate-900/10 z-10" />
             <img src={hoveredBlog.image} className="w-full h-full object-cover" alt="" />
           </>
        )}
      </motion.div>

      {/* MOBILE VIEW (Hidden on Desktop) */}
      <div className="md:hidden flex flex-col gap-12 mt-10">
        {blogs.map((blog) => (
          <Link to={`/blog/${blog._id}`} key={blog._id} className="group flex flex-col gap-5">
            {/* Mobile Image */}
            <div className="w-full h-64 sm:h-80 rounded-3xl overflow-hidden relative shadow-md">
              <img src={blog.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" />
              <div className="absolute top-4 left-4 z-10">
                 <span className="px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest bg-white/90 backdrop-blur-md text-slate-900 rounded-full shadow-sm">
                   {blog.date ? blog.date.slice(0, 10) : "Recent"}
                 </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
            </div>
            
            {/* Mobile Content */}
            <div>
              <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 leading-tight group-hover:text-sky-600 transition-colors">
                {blog.title}
              </h4>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                {blog.description?.length > 120
                  ? `${blog.description.slice(0, 120)}...`
                  : blog.description}
                {blog.description?.length > 120 && (
                  <span className="text-indigo-500 font-bold ml-2 text-[13px] tracking-wide inline-flex items-center">
                    more
                  </span>
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};


/* =========================================
   MAIN COMPONENT
   ========================================= */
export default function BlogSection() {
  const { blogs, loading, fetchBlogs } = useBlog();

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Display top 3 for the home page
  const displayedBlogs = blogs.slice(0, 3);

  if (loading) return <Loader />;

  return (
    <section id="blogs" className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-sky-50 text-slate-900 overflow-hidden">
      {/* 🔵 Soft background blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-8 left-6 w-60 h-60 bg-sky-200/70 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-indigo-200/60 rounded-full blur-3xl" />
        <div className="absolute inset-x-10 top-1/2 h-px bg-gradient-to-r from-transparent via-sky-100 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 🔝 Hero-style blog heading */}
        <div className="flex flex-col items-center mb-10 text-center">
          <span className="text-[2.5rem] tracking-[0.16em] uppercase text-slate-500 mb-3">
            The Blog
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            Words remembered,
          </h2>
          <p className="mt-2 pb-1 text-2xl sm:text-3xl md:text-4xl font-semibold italic leading-[1.3] bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            within the pensieve
          </p>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-500 mx-auto">
            A collection of my latest thoughts, tutorials, and stories — crafted
            to inspire, inform, and spark new ideas.
          </p>
        </div>

        {/* =======================================
            FINAL LAYOUT SHOWCASE
            ======================================= */}
        <UltimateHoverReveal blogs={displayedBlogs} />
        
        {/* See More Button */}
        {blogs.length > displayedBlogs.length && (
          <div className="mt-16 flex justify-center">
            <Link
              to="/blog"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-slate-900 text-white font-semibold shadow-lg hover:bg-sky-600 hover:shadow-sky-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              See All Articles
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
