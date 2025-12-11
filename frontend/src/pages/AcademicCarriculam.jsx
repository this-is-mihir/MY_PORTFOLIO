import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const API_BASE_URL = "https://portfolio-backend-6wpf.onrender.com"; // ⚠️ deploy par change karna

export default function Curriculum() {
  const [data, setData] = useState({ education: [], experience: [] });

  // ✅ NEW: per-card expand state
  const [expandedEdu, setExpandedEdu] = useState({});
  const [expandedExp, setExpandedExp] = useState({});

  useEffect(() => {
    const fetchCurriculum = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/curriculum`);
        const result = await res.json();
        setData({
          education: result.education || [],
          experience: result.experience || [],
        });
      } catch (err) {
        console.error("Curriculum fetch failed", err);
      }
    };
    fetchCurriculum();
  }, []);

  const { education, experience } = data;

  // ✅ NEW: helper to create preview text
  const getPreview = (text = "", limit = 140) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  return (
    <section
      id="curriculum"
      className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-sky-50 text-slate-900 overflow-hidden"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 10, 0],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          className="absolute -left-16 top-10 w-64 h-64 bg-sky-200 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -25, 25, 0],
            y: [0, 20, -15, 0],
            opacity: [0.18, 0.3, 0.18],
          }}
          transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
          className="absolute -right-24 bottom-0 w-72 h-72 bg-indigo-200 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* ===== Heading (blog-style) ===== */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <span className="text-[2rem] tracking-[0.1em] uppercase text-slate-500">
            Learning Journey & Experience
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold">
            My{" "}
            <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-700 bg-clip-text text-transparent">
              Curriculum & Experience
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
            From formal education to hands-on projects – a snapshot of how I&apos;ve
            been learning, building and growing as a developer.
          </p>
        </motion.div>

        {/* Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          {/* ===================================== */}
          {/* LEFT SIDE — EDUCATION */}
          {/* ===================================== */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-sky-600 text-left">
              Education
            </h3>

            <div className="relative pl-10 sm:pl-12">
              {/* Vertical line */}
              <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-sky-400 to-sky-200" />

              {education.map((item, index) => {
                const key = item._id || index;
                const fullText = item.details || "";
                const isExpanded = !!expandedEdu[key];
                const showToggle = fullText.length > 140;

                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: index * 0.12 }}
                    whileHover={{
                      y: -4,
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(15,23,42,0.15)",
                      backgroundColor: "rgba(255,255,255,1)",
                      borderColor: "rgba(56,189,248,0.7)",
                    }}
                    className="relative mb-10"
                  >
                    {/* Dot */}
                    <motion.div
                      animate={{ scale: [1, 1.18, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute left-0 sm:left-1 top-7 w-4 h-4 rounded-full bg-white border-[3px] border-sky-500 shadow-[0_0_0_6px_rgba(56,189,248,0.25)]"
                    />

                    {/* Card */}
                    <div className="ml-6 sm:ml-8 bg-white/95 border border-slate-200 backdrop-blur-lg rounded-2xl px-5 py-5 shadow-[0_12px_25px_rgba(15,23,42,0.08)]">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-lg font-semibold">{item.degree}</h4>
                        <span className="text-xs bg-sky-50 text-sky-700 border border-sky-100 rounded-full px-3 py-1">
                          {item.year}
                        </span>
                      </div>
                      <p className="font-medium text-slate-600 mt-1">
                        {item.institution}
                      </p>

                      {/* moving line */}
                      <motion.div
                        className="h-[2px] w-12 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full my-3"
                        animate={{ x: [0, 8, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.6,
                          ease: "easeInOut",
                        }}
                      />

                      {/* ✅ Truncated + Read more */}
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {isExpanded ? fullText : getPreview(fullText)}
                      </p>

                      {showToggle && (
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedEdu((prev) => ({
                              ...prev,
                              [key]: !isExpanded,
                            }))
                          }
                          className="mt-2 text-xs sm:text-sm font-semibold text-sky-600 hover:text-sky-700 hover:underline"
                        >
                          {isExpanded ? "Read less" : "Read more"}
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ===================================== */}
          {/* RIGHT SIDE — EXPERIENCE */}
          {/* ===================================== */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-indigo-600 text-left">
              Experience
            </h3>

            <div className="relative pl-10 sm:pl-12">
              {/* Vertical line */}
              <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-400 to-indigo-200" />

              {experience.map((exp, index) => {
                const key = exp._id || index;
                const fullText = exp.details || "";
                const isExpanded = !!expandedExp[key];
                const showToggle = fullText.length > 140;

                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: index * 0.12 }}
                    whileHover={{
                      y: -4,
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(15,23,42,0.15)",
                      backgroundColor: "rgba(255,255,255,1)",
                      borderColor: "rgba(129,140,248,0.7)",
                    }}
                    className="relative mb-10"
                  >
                    {/* Dot */}
                    <motion.div
                      animate={{ scale: [1, 1.18, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute left-0 sm:left-1 top-7 w-4 h-4 rounded-full bg-white border-[3px] border-indigo-500 shadow-[0_0_0_6px_rgba(129,140,248,0.25)]"
                    />

                    {/* Card */}
                    <div className="ml-6 sm:ml-8 bg-white/95 border border-slate-200 backdrop-blur-lg rounded-2xl px-5 py-5 shadow-[0_12px_25px_rgba(15,23,42,0.08)]">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-lg font-semibold">{exp.title}</h4>
                        <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full px-3 py-1">
                          {exp.years}
                        </span>
                      </div>
                      <p className="font-medium text-slate-600 mt-1">
                        {exp.tech}
                      </p>

                      {/* moving line */}
                      <motion.div
                        className="h-[2px] w-12 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-full my-3"
                        animate={{ x: [0, 8, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.6,
                          ease: "easeInOut",
                        }}
                      />

                      {/* ✅ Truncated + Read more */}
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {isExpanded ? fullText : getPreview(fullText)}
                      </p>

                      {showToggle && (
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedExp((prev) => ({
                              ...prev,
                              [key]: !isExpanded,
                            }))
                          }
                          className="mt-2 text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
                        >
                          {isExpanded ? "Read less" : "Read more"}
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
