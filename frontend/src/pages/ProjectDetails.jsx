import { useParams, Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useProjects } from "../hook/allData";
import Loader from "../components/Loader";

export default function ProjectDetails() {
  const { id } = useParams();
  const { project, fetchProjectById, loading, error } = useProjects();

  useEffect(() => {
    fetchProjectById(id);
  }, []);

  if (!project && !loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <p>Project not found.</p>
        <Link to="/projects" className="ml-4 text-pink-400 underline">
          Back to Projects
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
          {/* 🔵 Infinite background animation (same vibe as skills/blog) */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <motion.div
              animate={{
                x: [0, 35, -25, 0],
                y: [0, -25, 15, 0],
                opacity: [0.18, 0.35, 0.18],
              }}
              transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
              className="absolute -left-24 top-8 w-64 h-64 bg-sky-200 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, -30, 30, 0],
                y: [0, 20, -20, 0],
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{ repeat: Infinity, duration: 24, ease: "easeInOut" }}
              className="absolute -right-24 bottom-8 w-72 h-72 bg-indigo-200 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, 20, -20, 0],
                y: [0, -15, 15, 0],
                opacity: [0.1, 0.25, 0.1],
              }}
              transition={{ repeat: Infinity, duration: 26, ease: "easeInOut" }}
              className="absolute left-1/3 top-1/2 w-80 h-80 bg-sky-100 rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-5xl mx-auto px-6 space-y-8 relative z-10">
            {/* 🔹 Improved heading (same style vibe as blog/skills) */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="text-[2rem] tracking-[0.19em] uppercase text-slate-500/80">
                Project Case Study
              </span>
              <h1 className="mt-3 text-3xl sm:text-4xl uppercase font-extrabold leading-tight">
                {project.title}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-2xl">
                A closer look at how this project was designed, built, and
                shipped using my web development skills.
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-slate-700 text-base sm:text-lg leading-relaxed"
            >
              {project.description}
            </motion.p>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap gap-3 mt-4"
            >
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs sm:text-sm 
                             font-medium border border-sky-100"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* Images */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
            >
              <motion.img
                src={project.image}
                alt={project.title}
                className="rounded-2xl shadow-[0_18px_40px_rgba(15,23,42,0.18)] w-full h-auto"
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              />
            </motion.div>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap gap-4 sm:gap-6 mt-8"
            >
              <NavLink
                to={project.liveDemoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2  lg:px-6 lg:py-3 bg-sky-600 text-white rounded-2xl 
                           shadow-[0_10px_25px_rgba(37,99,235,0.35)] hover:bg-sky-700 
                           hover:scale-105 transition"
              >
                Live Demo
              </NavLink>
              <NavLink
                to={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 lg:px-6 lg:py-3 bg-white text-slate-900 rounded-2xl 
                           border border-slate-200 shadow-sm hover:bg-slate-50 
                           hover:scale-105 transition"
              >
                GitHub
              </NavLink>
              <Link
                to="/projects"
                className="px-5 py-2 lg:px-6 lg:py-3 border border-slate-300 text-slate-700 
                           rounded-2xl bg-white/80 hover:bg-slate-50 hover:scale-105 
                           transition"
              >
                Back to Projects
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}
