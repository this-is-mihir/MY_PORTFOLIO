import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useProjects } from "../../hook/allData";
import { useEffect } from "react";
import Loader from "../../components/Loader";

export default function Projects() {
  const { projects, fetchProjects, loading, error } = useProjects();

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-slate-50 via-white to-sky-50 text-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-red-500 font-medium">Failed to load projects.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-sky-50 text-slate-900 overflow-hidden"
    >
      {/* 🔹 Soft background accents (same vibe as skills/blog) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-16 top-10 w-64 h-64 bg-sky-200/60 rounded-full blur-3xl" />
        <div className="absolute -left-20 bottom-0 w-72 h-72 bg-indigo-200/50 rounded-full blur-3xl" />
        <div className="absolute inset-x-10 top-1/2 h-px bg-gradient-to-r from-transparent via-sky-100 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative">
        {/* Heading – same style as home sections */}
        <div className="inline-flex flex-col items-center mb-12">
          <span className="text-xs sm:text-[2.3rem] tracking-[0.2em] uppercase text-slate-500/80 mb-2">
            Projects
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold">
            My <span className="text-sky-600">Work & Builds</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-xl">
            Real-world projects built with MERN, JavaScript and modern web
            tools — focused on clean UX, performance and maintainable code.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={
                  project._id ||
                  project.id ||
                  project.title ||
                  `project-${index}`
                }
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                // exit hata diya – jhatka avoid, smooth re-render
                transition={{
                  delay: index * 0.08,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -4,
                  scale: 1.02,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    mass: 0.6,
                  },
                }}
                className="group relative flex flex-col rounded-2xl bg-white/90 backdrop-blur-lg 
                           shadow-[0_12px_30px_rgba(15,23,42,0.12)] overflow-hidden border border-slate-200"
              >
                {/* Image wrapper */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 sm:h-52 object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                  {/* Dark overlay on hover */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                </div>

                {/* Card content */}
                <div className="p-5 sm:p-6 flex flex-col gap-3 text-left">
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-sm">
                    {project.description
                      ? `${project.description.slice(0, 120)}...`
                      : ""}
                  </p>

                  {/* Tech stack chips */}
                  {project.tech && project.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.tech.map((tech, i) => (
                        <span
                          key={`${
                            project._id || project.title || "proj"
                          }-tech-${i}`}
                          className="px-3 py-1 rounded-full text-[0.7rem] uppercase tracking-wide 
                                     bg-sky-50 text-sky-700 border border-sky-100"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom button */}
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 mt-auto">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full rounded-xl bg-sky-600 text-white font-medium text-sm sm:text-base 
                               py-2.5 text-center shadow-[0_10px_25px_rgba(37,99,235,0.35)] 
                               hover:bg-sky-700 transition-colors"
                  >
                    <Link
                      to={`/projects/${project._id}`}
                      className="flex items-center justify-center w-full h-full"
                    >
                      Read More →
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
