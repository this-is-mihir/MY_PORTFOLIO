import { useParams, Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useProjects } from "../hook/allData";
import Loader from "../components/Loader";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";

export default function ProjectDetails() {
  const { id } = useParams();
  const { project, fetchProjectById, loading, error } = useProjects();

  useEffect(() => {
    fetchProjectById(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!project && !loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-slate-50 to-white text-slate-700 gap-4">
        <p className="text-lg font-medium">Project not found.</p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 text-white
                     text-sm font-medium shadow-lg hover:bg-sky-700 hover:scale-105 transition"
        >
          <ArrowLeft size={16} />
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
          className="relative py-16 sm:py-20 bg-gradient-to-b from-slate-50 via-white to-sky-50
                     text-slate-900 min-h-screen overflow-hidden"
        >
          {/* 🔵 Animated background blobs */}
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

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* ── Back link (top) ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mb-6 sm:mb-8"
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 text-sm text-slate-500
                           hover:text-sky-600 transition-colors group"
              >
                <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
                Back to Projects
              </Link>
            </motion.div>

            {/* ── Title ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <span className="text-xs sm:text-sm tracking-[0.18em] uppercase text-slate-400 font-medium">
                Project Case Study
              </span>
              <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-slate-900">
                {project.title}
              </h1>
            </motion.div>

            {/* ── Hero image ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl overflow-hidden bg-white
                         shadow-[0_20px_50px_rgba(15,23,42,0.14)] border border-slate-200/60"
            >
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full max-h-[280px] sm:max-h-[380px] md:max-h-[440px] object-cover object-top"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </motion.div>

            {/* ── Action buttons ── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
              className="flex flex-wrap gap-3 mt-5 sm:mt-6"
            >
              {project.liveDemoLink && (
                <a
                  href={project.liveDemoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3
                             bg-sky-600 text-white text-sm sm:text-base font-semibold rounded-xl
                             shadow-[0_8px_24px_rgba(14,165,233,0.3)]
                             hover:bg-sky-700 hover:shadow-[0_12px_28px_rgba(14,165,233,0.35)]
                             hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3
                             bg-white text-slate-800 text-sm sm:text-base font-semibold rounded-xl
                             border border-slate-200 shadow-sm
                             hover:bg-slate-50 hover:border-slate-300 hover:shadow-md
                             hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
                >
                  <Github size={16} />
                  GitHub
                </a>
              )}

            </motion.div>

            {/* ── Tech stack ── */}
            {project.tech && project.tech.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
                className="flex flex-wrap gap-2.5 mt-6 sm:mt-8"
              >
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-700
                               text-xs sm:text-sm font-medium border border-sky-100
                               shadow-[0_1px_3px_rgba(14,165,233,0.08)]"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            )}

            {/* ── Divider ── */}
            <div className="mt-8 sm:mt-10 border-t border-slate-200/80" />

            {/* ── Description (preserves line breaks, emojis, spacing) ── */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="mt-6 sm:mt-8"
            >
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4">
                About This Project
              </h2>
              <div
                className="text-slate-700 text-[0.95rem] sm:text-base leading-[1.85]
                           whitespace-pre-line break-words"
              >
                {project.description}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}
