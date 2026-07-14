import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useProjects } from "../../hook/allData";
import Loader from "../../components/Loader";

const StickyProjectCard = ({ project, index, totalProjects, progress }) => {
  // Stacking offset: each card sticks a bit lower than the previous one
  const topOffset = 120 + index * 20; 
  
  // Calculate when this specific card should start shrinking
  const targetScale = 1 - (totalProjects - index) * 0.04; 
  const scale = useTransform(
    progress,
    [index * (1 / totalProjects), 1], 
    [1, targetScale]
  );

  return (
    <div
      className="sticky flex flex-col items-center justify-center w-full"
      style={{ 
        top: `${topOffset}px`, 
        marginBottom: index === totalProjects - 1 ? '0' : '20vh' 
      }}
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-5xl mx-auto flex flex-col md:flex-row bg-[#ffffff] border border-slate-200 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] rounded-[28px] overflow-hidden"
      >
        {/* Left Content (Text) */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-center order-2 md:order-1">
          {/* Index badge */}
          <div className="mb-6">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-slate-200 text-indigo-500 font-medium text-lg shadow-sm bg-slate-50">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Tech Stack string */}
          <div className="text-[12px] sm:text-xs font-bold tracking-[0.2em] text-indigo-500 uppercase mb-3 leading-relaxed">
            {project.tech?.join(" • ")}
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-slate-500 text-sm sm:text-base mb-8 leading-relaxed font-medium">
            {project.description
              ? `${project.description.slice(0, 120)}...`
              : ""}
          </p>

          {/* Button */}
          <div>
            <Link
              to={`/projects/${project._id}`}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-slate-900 text-slate-900 font-bold text-sm hover:bg-slate-900 hover:text-white transition-all duration-300 group"
            >
              VIEW CASE STUDY
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Right Content (Image) */}
        <div className="w-full md:w-1/2 p-4 sm:p-5 flex items-center justify-center bg-slate-50 order-1 md:order-2">
          <div className="w-full h-56 sm:h-72 md:h-[350px] rounded-[20px] overflow-hidden relative shadow-md">
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Projects() {
  const { projects, fetchProjects, loading, error } = useProjects();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return (
      <section className="py-20 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-red-500 font-medium">Failed to load projects.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="relative pt-20 pb-20 bg-white text-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-12 text-center">
          <span className="text-[1.3rem] sm:text-[1.8rem] tracking-[0.2em] uppercase text-slate-400 mb-1 font-medium">
            Projects
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight leading-none">
            My <span className="text-sky-500">Work & Builds</span>
          </h2>
          <p className="max-w-3xl text-base sm:text-lg text-slate-500 font-medium leading-relaxed">
            Real-world projects built with MERN, JavaScript and modern web
            tools — focused on clean UX, performance and maintainable code.
          </p>
        </div>

        {/* 🔧 Stacked Sticky Scroll Container */}
        <div 
          ref={containerRef} 
          className="relative w-full"
        >
          {projects.map((project, index) => (
            <StickyProjectCard
              key={project._id || index}
              project={project}
              index={index}
              totalProjects={projects.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
