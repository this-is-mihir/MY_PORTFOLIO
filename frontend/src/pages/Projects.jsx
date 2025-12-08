import { useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Link } from "react-router-dom";
import { useProjects } from "../hook/allData";
import Loader from "../components/Loader";

/* 🧲 Reusable Magnetic + 3D Wrapper (subtle version) */
function Magnetic3D({
  children,
  translateStrength = 10,
  rotateStrength = 6,
  className = "",
  motionProps = {},
}) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

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

  const {
    style: motionStyle,
    whileHover: motionWhileHover,
    ...restMotionProps
  } = motionProps;

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        className={className}
        style={{
          x: springX,
          y: springY,
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
          ...motionStyle,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{
          scale: 1.02, // 👈 zoom bhi halka
          ...motionWhileHover,
        }}
        {...restMotionProps}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const { projects, fetchProjects, loading } = useProjects();

  useEffect(() => {
    fetchProjects();
  }, []); // same as original

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 sm:gap-8 items-stretch">
          {/*           👆 yaha items-stretch add kiya */}
          <AnimatePresence>
            {displayedProjects.map((project, index) => (
              <Magnetic3D
                key={
                  project._id ||
                  project.id ||
                  project.title ||
                  `project-${index}`
                }
                translateStrength={12} // 👈 per-card bhi subtle
                rotateStrength={6}
                className="group relative flex flex-col h-full rounded-2xl bg-white/95 backdrop-blur-lg 
                           shadow-[0_12px_30px_rgba(15,23,42,0.12)] overflow-hidden border border-slate-200
                           transition-shadow duration-300"
                //                    👆 yaha h-full add kiya
                motionProps={{
                  initial: { opacity: 0, y: 30, scale: 0.98 },
                  animate: { opacity: 1, y: 0, scale: 1 },
                  exit: { opacity: 0, y: 15, scale: 0.98 },
                  transition: {
                    delay: index * 0.06,
                    duration: 0.4,
                    ease: "easeOut",
                  },
                  whileHover: {
                    boxShadow: "0 18px 45px rgba(15,23,42,0.2)",
                  },
                }}
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 sm:h-48 object-cover will-change-transform"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                  {/* premium overlay */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-slate-950/45 via-slate-900/0 to-transparent" />

                  {/* small chip bottom-left */}
                  <div className="pointer-events-none absolute bottom-3 left-3 translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="inline-flex items-center rounded-full bg-black/55 backdrop-blur px-3 py-1 text-[0.7rem] uppercase tracking-[0.16em] text-slate-100 border border-white/10">
                      featured
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex flex-col gap-3 text-left">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900 group-hover:text-slate-950 transition-colors">
                      {project.title}
                    </h3>
                    <div className="h-[3px] w-10 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <p className="text-slate-500 text-sm group-hover:text-slate-600 transition-colors">
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
                                   bg-sky-50 text-sky-700 border border-sky-100
                                   group-hover:bg-sky-600/10 group-hover:text-sky-800 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-5 sm:px-6 pb-5 sm:pb-6 mt-auto">
                  <motion.div
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.96, y: 0 }}
                    className="w-full rounded-xl bg-sky-600 text-white font-medium text-sm sm:text-base 
                               py-2.5 text-center shadow-[0_10px_25px_rgba(37,99,235,0.35)] 
                               hover:bg-sky-700 transition-colors"
                  >
                    {/* 🔥 yaha change kiya: Link poore button area cover kare */}
                    <Link
                      to={`/projects/${project._id}`}
                      className="flex items-center justify-center w-full h-full"
                    >
                      Read More →
                    </Link>
                  </motion.div>
                </div>
              </Magnetic3D>
            ))}
          </AnimatePresence>
        </div>

        {/* See More Button */}
        {projects.length > displayedProjects.length && (
          <div className="mt-10">
            <Magnetic3D
              translateStrength={8} // 👈 button pe aur kam
              rotateStrength={4}
              className="inline-block"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96, y: 0 }}
                className="inline-flex px-6 py-3 rounded-2xl bg-sky-600 text-white font-medium 
                           shadow-[0_10px_25px_rgba(37,99,235,0.35)] hover:bg-sky-700 transition-colors"
              >
                <Link to="/projects">See More Projects</Link>
              </motion.div>
            </Magnetic3D>
          </div>
        )}
      </div>
    </section>
  );
}
