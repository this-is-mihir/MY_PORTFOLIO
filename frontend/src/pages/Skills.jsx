import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataContext";

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
          <AnimatePresence>
            {displayedSkills.map((skill, index) => (
              <motion.div
                key={skill._id || skill.id || skill.name || `skill-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.07,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.08,
                  rotate: 2,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 18,
                    mass: 0.4,
                  },
                }}
                className="group relative p-6 rounded-2xl bg-white/90 backdrop-blur-lg 
                  shadow-[0_12px_30px_rgba(15,23,42,0.12)] flex flex-col items-center text-center 
                  cursor-pointer overflow-hidden border border-slate-200"
              >
                {/* Inner rotating layer (same as before) */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border border-sky-100/50 pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 16,
                    ease: "linear",
                  }}
                />

                {/* 🔹 Subtle gradient glow on hover (background feel, not box separate) */}
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
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* See More Button */}
        {filteredSkills.length > displayedSkills.length && (
          <div className="mt-10">
            <Link
              to="/skills"
              className="inline-block px-6 py-3 rounded-2xl bg-sky-600 text-white font-medium 
                shadow-[0_10px_25px_rgba(37,99,235,0.35)] hover:bg-sky-700 hover:scale-105 transition"
            >
              See More Skills
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
