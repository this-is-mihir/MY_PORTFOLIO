import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useProjects } from "../hook/allData";
import Loader from "../components/Loader";

const StickyProjectCard = ({ project, index, totalProjects, progress }) => {
  
  // Stacking offset: each card sticks a bit lower than the previous one
  const topOffset = 120 + index * 20; 
  
  // Calculate when this specific card should start shrinking
  // The progress array is mapped so that as the user scrolls further down, older cards shrink more.
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
          <p className="text-slate-500 text-sm sm:text-base mb-8 leading-relaxed font-medium transition-all duration-300">
            {project.description?.length > 120
              ? `${project.description.slice(0, 120)}...`
              : project.description}
            
            {project.description?.length > 120 && (
              <Link
                to={`/projects/${project._id}`}
                className="text-indigo-500 hover:text-indigo-600 font-bold ml-2 text-[13px] focus:outline-none tracking-wide"
              >
                more
              </Link>
            )}
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
  const { projects, fetchProjects, loading } = useProjects();
  const containerRef = useRef(null);

  // Track the scroll progress of the entire container wrapper
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  // Display top 3 for the home page
  const displayedProjects = projects.slice(0, 3);

  if (loading) return <Loader />;

  return (
    <section
      id="projects"
      className="relative pt-8 pb-20 bg-white text-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10 text-center">
          <span className="text-[1.5rem] sm:text-[2rem] tracking-[0.2em] uppercase text-slate-500 mb-1 font-medium">
            My Projects
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-none mb-1">
            Exploring
          </h2>

          <p className="text-3xl sm:text-4xl md:text-5xl font-semibold italic leading-tight bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            creative projects
          </p>

          <p className="mt-5 max-w-2xl text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
            A showcase of my latest work, experiments, and ideas—each crafted
            with care, detail, and a focus on clean, modern user experiences.
          </p>

          <p className="mt-8 text-2xl sm:text-3xl font-semibold text-slate-900">
            Featured Projects
          </p>
        </div>

        {/* 🔧 Stacked Sticky Scroll Container */}
        <div 
          ref={containerRef} 
          className="relative w-full"
        >
          {displayedProjects.map((project, index) => (
            <StickyProjectCard
              key={project._id || index}
              project={project}
              index={index}
              totalProjects={displayedProjects.length}
              progress={scrollYProgress}
            />
          ))}
        </div>

        {/* See More Button */}
        {projects.length > displayedProjects.length && (
          <div className="mt-12 flex justify-center">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-slate-900 text-white font-semibold shadow-lg hover:bg-indigo-600 hover:shadow-indigo-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              Explore All Projects
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
