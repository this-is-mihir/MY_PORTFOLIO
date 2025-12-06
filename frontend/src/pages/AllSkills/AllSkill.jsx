import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DataContext } from "../../context/DataContext";

export default function Skills() {
  const { state } = useContext(DataContext);
  const { skills } = state;

  const categories = ["All", "Frontend", "Backend", /* "AI/ML" */, "Tools"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSkills =
    selectedCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

  return (
    <section
      id="skills"
      className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-sky-50 text-slate-900 overflow-hidden"
    >
      {/* background blobs – light theme */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 10, 0],
            opacity: [0.18, 0.35, 0.18],
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          className="absolute -left-20 top-10 w-64 h-64 bg-sky-200 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -25, 25, 0],
            y: [0, 20, -15, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
          className="absolute -right-24 bottom-0 w-72 h-72 bg-indigo-200 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Heading – blog/contact style */}
        <div className="text-center mb-12">
          <span className="text-[1.6rem] tracking-[0.16em] uppercase text-slate-500">
            Skills Overview
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold leading-tight">
            My{" "}
            <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-700 bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
            A complete view of the technologies I use across{" "}
            <span className="font-semibold">frontend</span>,{" "}
            <span className="font-semibold">backend</span>,{" "}
            <span className="font-semibold">AI/ML</span> and{" "}
            <span className="font-semibold">developer tools</span> to build
            polished, production-ready experiences.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2 rounded-xl text-sm sm:text-base font-medium transition ${
                selectedCategory === cat
                  ? "bg-sky-600 text-white shadow-[0_10px_25px_rgba(37,99,235,0.35)]"
                  : "bg-white/80 text-slate-600 border border-slate-200 hover:bg-sky-50 hover:text-sky-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid with category-change animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory} // 👉 category change pe pura grid re-animate
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill._id || skill.id || skill.name || `skill-${index}`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.04,
                  duration: 0.4,
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
                className="relative p-5 sm:p-6 rounded-2xl bg-white/90 backdrop-blur-lg 
                           shadow-[0_12px_30px_rgba(15,23,42,0.12)] flex flex-col items-center 
                           text-center cursor-pointer overflow-hidden border border-slate-200"
              >
                {/* inner animated layer (same vibe as home skills, but subtle) */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border border-sky-100/60 pointer-events-none"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 18,
                    ease: "linear",
                  }}
                  style={{ zIndex: 0 }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 object-contain mb-2"
                  />
                  <h3 className="text-sm sm:text-base font-semibold">
                    {skill.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
