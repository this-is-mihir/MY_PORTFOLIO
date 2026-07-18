import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FiBriefcase, FiBookOpen, FiCalendar, FiCode, FiAward } from "react-icons/fi";

const API_BASE_URL = "https://portfolio-backend-6wpf.onrender.com";

export default function Curriculum() {
  const [data, setData] = useState({ education: [], experience: [] });
  const [activeSection, setActiveSection] = useState("experience");

  // State for read more/less
  const [expandedEdu, setExpandedEdu] = useState({});
  const [expandedExp, setExpandedExp] = useState({});

  const eduRef = useRef(null);
  const expRef = useRef(null);

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

  // Scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      if (eduRef.current && expRef.current) {
        const eduRect = eduRef.current.getBoundingClientRect();
        const expRect = expRef.current.getBoundingClientRect();

        // If experience section is closer to top
        if (expRect.top <= 200 && expRect.bottom > 200) {
          setActiveSection("experience");
        } else if (eduRect.top <= 200) {
          setActiveSection("education");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (ref) => {
    if (ref.current) {
      const top = ref.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const { education, experience } = data;

  // Helper for text truncation
  const getPreview = (text = "", limit = 150) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  return (
    <section id="curriculum" className="py-24 bg-white text-slate-900 relative">
      
      {/* Background Glows for subtle premium feel */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 10, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          className="absolute -left-16 top-10 w-96 h-96 bg-sky-100 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* ===================================== */}
        {/* ORIGINAL HEADING RESTORED             */}
        {/* ===================================== */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <span className="text-[1rem] sm:text-[1.2rem] tracking-[0.2em] uppercase text-slate-400 font-semibold">
            Learning Journey & Experience
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-800">
            My{" "}
            <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-700 bg-clip-text text-transparent">
              Curriculum & Experience
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            From formal education to hands-on projects – a snapshot of how I've
            been learning, building and growing as a developer.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-start gap-16 relative">
        
        {/* ===================================== */}
        {/* LEFT SIDEBAR (STICKY INDEX)           */}
        {/* ===================================== */}
        <div className="md:w-1/4 md:sticky md:top-32 hidden md:flex flex-col gap-6">
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-slate-400 mb-4">
            Contents
          </h2>
          <button
            onClick={() => scrollTo(expRef)}
            className={`flex items-center gap-3 text-left text-lg font-medium transition-colors ${
              activeSection === "experience" ? "text-black" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <FiBriefcase className={activeSection === "experience" ? "text-sky-500" : ""} /> Experience
          </button>
          <button
            onClick={() => scrollTo(eduRef)}
            className={`flex items-center gap-3 text-left text-lg font-medium transition-colors ${
              activeSection === "education" ? "text-black" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <FiBookOpen className={activeSection === "education" ? "text-indigo-500" : ""} /> Education
          </button>
        </div>

        {/* ===================================== */}
        {/* RIGHT CONTENT AREA                    */}
        {/* ===================================== */}
        <div className="w-full md:w-3/4">

          {/* EXPERIENCE SECTION */}
          <div ref={expRef} className="mb-24">
            <h3 className="flex items-center gap-3 text-3xl font-black mb-12 pb-4 border-b-2 border-slate-100 text-slate-800 tracking-tight">
              <span className="p-3 bg-sky-50 text-sky-500 rounded-xl"><FiBriefcase /></span> Experience
            </h3>
            <div className="flex flex-col gap-14">
              {experience.map((exp, index) => {
                const key = exp._id || index;
                const fullText = exp.details || "";
                const isExpanded = !!expandedExp[key];
                const showToggle = fullText.length > 150;

                return (
                  <div key={key} className="group">
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-3">
                      <h4 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight group-hover:text-sky-600 transition-colors">
                        {exp.title}
                      </h4>
                      <span className="flex items-center gap-1.5 text-sm font-bold text-sky-500 bg-sky-50 px-3 py-1 rounded-full mt-2 md:mt-0 whitespace-nowrap uppercase tracking-wider">
                        <FiCalendar className="text-sky-400" /> {exp.years}
                      </span>
                    </div>
                    <p className="flex items-center gap-2 text-lg font-bold text-slate-700 mb-4">
                      <FiCode className="text-slate-400" /> {exp.tech}
                    </p>
                    <p className="text-slate-600 leading-relaxed text-base md:text-lg font-medium">
                      {isExpanded ? fullText : getPreview(fullText)}
                      {showToggle && (
                        <button
                          type="button"
                          onClick={() => setExpandedExp(prev => ({ ...prev, [key]: !isExpanded }))}
                          className="ml-2 text-sm font-bold text-sky-500 hover:text-sky-600 hover:underline transition-all"
                        >
                          {isExpanded ? "Show less" : "Read more"}
                        </button>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* EDUCATION SECTION */}
          <div ref={eduRef}>
            <h3 className="flex items-center gap-3 text-3xl font-black mb-12 pb-4 border-b-2 border-slate-100 text-slate-800 tracking-tight">
              <span className="p-3 bg-indigo-50 text-indigo-500 rounded-xl"><FiBookOpen /></span> Education
            </h3>
            <div className="flex flex-col gap-14">
              {education.map((item, index) => {
                const key = item._id || index;
                const fullText = item.details || "";
                const isExpanded = !!expandedEdu[key];
                const showToggle = fullText.length > 150;

                return (
                  <div key={key} className="group">
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-3">
                      <h4 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                        {item.degree}
                      </h4>
                      <span className="flex items-center gap-1.5 text-sm font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full mt-2 md:mt-0 whitespace-nowrap uppercase tracking-wider">
                        <FiCalendar className="text-indigo-400" /> {item.year}
                      </span>
                    </div>
                    <p className="flex items-center gap-2 text-lg font-bold text-slate-700 mb-4">
                      <FiAward className="text-slate-400" /> {item.institution}
                    </p>
                    <p className="text-slate-600 leading-relaxed text-base md:text-lg font-medium">
                      {isExpanded ? fullText : getPreview(fullText)}
                      {showToggle && (
                        <button
                          type="button"
                          onClick={() => setExpandedEdu(prev => ({ ...prev, [key]: !isExpanded }))}
                          className="ml-2 text-sm font-bold text-indigo-500 hover:text-indigo-600 hover:underline transition-all"
                        >
                          {isExpanded ? "Show less" : "Read more"}
                        </button>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
      </div>
    </section>
  );
}
