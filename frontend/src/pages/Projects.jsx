import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useProjects } from "../hook/allData";
import { useEffect } from "react";
import Loader from "../components/Loader";

export default function Projects() {
  const { projects, fetchProjects, loading } = useProjects();

  useEffect(() => {
    fetchProjects();
  }, []);

  // Sirf 3 projects dikhane hain
  const displayedProjects = projects.slice(0, 3);

  if (loading) return <Loader />;

  return (
    <section
      id="projects"
      className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-sky-50 text-slate-900 overflow-hidden"
    >
      {/* 🔹 Soft background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-16 top-10 w-64 h-64 bg-sky-200/60 rounded-full blur-3xl" />
        <div className="absolute -left-20 bottom-0 w-72 h-72 bg-indigo-200/50 rounded-full blur-3xl" />
        <div className="absolute inset-x-10 top-1/2 h-px bg-gradient-to-r from-transparent via-sky-100 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative">
        {/* 🔝 Hero-style heading like screenshot */}
        <div className="flex flex-col items-center mb-14">
          <span className="text-[2.5rem] tracking-[0.2em] uppercase text-slate-500 mb-3">
            My Projects
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            Exploring
          </h2>

          {/* 👇 yaha change kiya: leading + thoda padding */}
          <p className="mt-2 pb-1 text-2xl sm:text-3xl md:text-4xl font-semibold italic leading-[1.3] bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            creative projects
          </p>

          <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-500">
            A showcase of my latest work, experiments, and ideas—each crafted
            with care, detail, and a focus on clean, modern user experiences.
          </p>

          <p className="mt-10 text-xl sm:text-2xl font-semibold text-slate-900">
            Featured Projects
          </p>
        </div>

        {/* 🔧 Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 sm:gap-8">
          <AnimatePresence>
            {displayedProjects.map((project, index) => (
              <motion.div
                key={
                  project._id ||
                  project.id ||
                  project.title ||
                  `project-${index}`
                }
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="group relative flex flex-col rounded-2xl bg-white/95 backdrop-blur-lg 
                           shadow-[0_12px_30px_rgba(15,23,42,0.12)] overflow-hidden border border-slate-200"
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 sm:h-48 object-cover"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent" />
                </div>

                <div className="p-5 sm:p-6 flex flex-col gap-3 text-left">
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-sm">
                    {project.description
                      ? `${project.description.slice(0, 110)}...`
                      : ""}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.tech?.map((tech, i) => (
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
                </div>

                <div className="px-5 sm:px-6 pb-5 sm:pb-6 mt-auto">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full rounded-xl bg-sky-600 text-white font-medium text-sm sm:text-base 
                               py-2.5 text-center shadow-[0_10px_25px_rgba(37,99,235,0.35)] 
                               hover:bg-sky-700 transition-colors"
                  >
                    <Link to={`/projects/${project._id}`}>Read More →</Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {projects.length > displayedProjects.length && (
          <div className="mt-10">
            <motion.div
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex px-6 py-3 rounded-2xl bg-sky-600 text-white font-medium 
                         shadow-[0_10px_25px_rgba(37,99,235,0.35)] hover:bg-sky-700 transition-colors"
            >
              <Link to="/projects">See More Projects</Link>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
