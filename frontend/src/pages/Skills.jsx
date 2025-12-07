// src/components/Skills.jsx (ya jaha bhi hai)

import { useContext, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataContext";

/* 🧲 Reusable Magnetic + 3D Wrapper */
function Magnetic3D({
  children,
  translateStrength = 18,
  rotateStrength = 10,
  className = "",
  motionProps = {},
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

  // motionProps se style / whileHover alag nikal liye
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
          scale: 1.03, // subtle rakha jisse jhatka kam lage
          ...motionWhileHover,
        }}
        {...restMotionProps}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  const { state } = useContext(DataContext);
  const { skills } = state;
  const categories = ["All", "Frontend", "Backend", /* "AI/ML" */, "Tools"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSkills =
    selectedCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

  const displayedSkills = filteredSkills.slice(0, 8);

  return (
    <section
      id="skills"
      className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-sky-50 text-slate-900 overflow-hidden"
    >
      {/* 🔹 Soft background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-16 top-10 w-64 h-64 bg-sky-200/60 rounded-full blur-3xl" />
        <div className="absolute -left-20 bottom-0 w-72 h-72 bg-indigo-200/50 rounded-full blur-3xl" />
        <div className="absolute inset-x-10 top-1/2 h-px bg-gradient-to-r from-transparent via-sky-100 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative">
        {/* Heading */}
        <div className="inline-flex flex-col items-center mb-12">
          <span className="text-[1.8rem] tracking-[0.25em] uppercase text-slate-500/80 mb-2">
            Tech Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold">
            My <span className="text-sky-600">Skills</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-xl">
            A blend of frontend, backend, AI and tools I use to ship real-world
            products.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2 rounded-xl text-sm sm:text-base font-medium transition 
                ${
                  selectedCategory === cat
                    ? "bg-sky-600 text-white shadow-[0_10px_25px_rgba(37,99,235,0.35)]"
                    : "bg-white/80 text-slate-600 border border-slate-200 hover:bg-sky-50 hover:text-sky-700"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7 sm:gap-8">
          <AnimatePresence mode="popLayout" initial={false}>
            {displayedSkills.map((skill, index) => (
              <Magnetic3D
                key={skill._id || skill.id || skill.name || `skill-${index}`}
                translateStrength={18}
                rotateStrength={10}
                className="group relative p-6 rounded-2xl bg-white/90 backdrop-blur-lg 
                  shadow-[0_12px_30px_rgba(15,23,42,0.12)] flex flex-col items-center text-center 
                  cursor-pointer overflow-hidden border border-slate-200"
                motionProps={{
                  layout: true, // layout change smooth
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  exit: { opacity: 0, scale: 0.9 },
                  transition: {
                    delay: index * 0.04,
                    duration: 0.35,
                    ease: "easeOut",
                  },
                }}
              >
                {/* Inner rotating layer */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border border-sky-100/50 pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 16,
                    ease: "linear",
                  }}
                  style={{ transformOrigin: "center" }}
                />

                {/* 🔹 Subtle gradient glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 
                  bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),transparent_60%)] 
                  transition-opacity duration-300 pointer-events-none"
                />

                {/* Hover border shine */}
                <motion.span
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{
                    opacity: 1,
                    boxShadow: "0 0 22px rgba(56,189,248,0.45)",
                    borderColor: "rgba(56,189,248,0.65)",
                  }}
                  transition={{ duration: 0.35 }}
                  style={{ border: "2px solid rgba(56,189,248,0)" }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-3 rounded-2xl bg-sky-50/80 px-3 py-2 flex items-center justify-center">
                    <img
                      src={skill.logo}
                      alt={skill.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold">
                    {skill.name}
                  </h3>
                </div>
              </Magnetic3D>
            ))}
          </AnimatePresence>
        </div>

        {/* See More Button with magnetic effect */}
        {filteredSkills.length > displayedSkills.length && (
          <div className="mt-10 flex justify-center">
            <Magnetic3D
              translateStrength={10}
              rotateStrength={6}
              className="inline-block"
            >
              <Link
                to="/skills"
                className="inline-block px-6 py-3 rounded-2xl bg-sky-600 text-white font-medium 
                  shadow-[0_10px_25px_rgba(37,99,235,0.35)] hover:bg-sky-700 transition"
              >
                See More Skills
              </Link>
            </Magnetic3D>
          </div>
        )}
      </div>
    </section>
  );
}
