// src/pages/About.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DP from "../assets/Images/fomal.png";

const API_BASE_URL = "http://localhost:5000";

export default function About() {
  const about = [
    {
      id: 1,
      title: "My Programming Journey",
      content:
        "I began my development journey with a solid foundation in HTML, CSS, and JavaScript, successfully building several projects. My specialization is in front-end development using React.js, where I actively incorporate advanced animation libraries like Framer Motion for dynamic interfaces. I possess a strong command of Full-Stack MERN (MongoDB, Express.js, React.js, Node.js), having developed numerous substantial projects in this stack. My college curriculum also provided exposure to foundational languages including C, C++, Java, .NET, PHP, and SQL",
    },
    {
      id: 2,
      title: "The Work I Enjoy",
      content:
        "I love building user-friendly web apps with clean design and interactive features. Problem-solving excites me, and I enjoy working on real-world projects where creativity meets logic.",
    },
    {
      id: 3,
      title: "Hobbies & Interests",
      content:
        "Outside programming, I enjoy reading tech blogs and exploring creative design. These hobbies keep me energized and bring fresh ideas into my coding work.",
    },
    {
      id: 4,
      title: "Future Aspirations",
      content:
        "I am focused on further deepening my expertise in full-stack web development, particularly within the MERN ecosystem. My goal is to build innovative, high-impact solutions that leverage AI/ML for problem-solving—aiming to save valuable development time and deliver exceptional user experiences—while actively exploring technologies like blockchain.",
    },
  ];

  // 🔹 Profile state (same source as Hero/Banner)
  const [profile, setProfile] = useState({
    name: "Mihir Patel",
    title: "Full Stack Web Developer",
    avatar: DP,
    resumeUrl: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/profile`);
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();

        setProfile({
          name: data?.name || "Mihir Patel",
          title: data?.title || "Full Stack Web Developer",
          avatar:
            data?.avatar && data.avatar.trim() !== "" ? data.avatar : DP,
          resumeUrl: data?.resumeUrl || "",
        });
      } catch (err) {
        console.error("Error fetching profile in About:", err);
      }
    };

    fetchProfile();
  }, []);

  const displayName = profile.name || "Mihir Patel";
  const firstName = displayName.split(" ")[0];

  const resumeHref = profile.resumeUrl || "/cv.pdf";
  const resumeTarget = profile.resumeUrl ? "_blank" : "_self";

  return (
    <section
      id="about"
      className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-sky-50 text-slate-900 overflow-hidden"
    >
      {/* Soft BG blobs like other light sections */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 10, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          className="absolute -left-16 top-10 w-64 h-64 bg-sky-200 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -25, 25, 0],
            y: [0, 20, -15, 0],
            opacity: [0.18, 0.35, 0.18],
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          className="absolute -right-24 bottom-0 w-72 h-72 bg-indigo-200 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* ======= TOP ABOUT HERO ======= */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
          {/* Left: text + small avatar + buttons */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }} // mount pe hi animate
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-5"
          >
            {/* mini profile row */}
            <div className="flex items-center gap-3">
              <img
                src={profile.avatar}
                alt={displayName}
                className="w-16 h-16 rounded-full object-cover shadow-md"
              />
              <div className="text-left">
                <p className="text-xl font-semibold text-slate-900">
                  {displayName}
                </p>
                <p className="text-xl text-slate-500">
                  {profile.title || "Full Stack Web Developer"}
                </p>
              </div>
            </div>

            {/* Heading */}
            <div className="mt-2 text-left">
              <p className="text-xl tracking-[0.25em] uppercase text-sky-500/80 mb-3">
                About Me
              </p>
              <h1 className="text-[2.1rem] sm:text-[2.5rem] lg:text-[2.8rem] font-extrabold leading-tight">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-pink-500 bg-clip-text text-transparent">
                  {firstName}
                </span>
                :
                <br />
                <span>Web Designer &amp; Developer</span>
              </h1>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              I create custom websites that blend clean UI, modern animations
              and reliable MERN-stack backends to craft unique digital
              experiences for every client.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Self-taught and constantly experimenting, I love turning ideas
              into real products — from interactive portfolios to full-stack
              applications powered by modern tools & Technologies.
            </p>

            {/* Buttons row */}
            <div className="flex flex-wrap gap-3 mt-4">
              <motion.a
                href={resumeHref}
                target={resumeTarget}
                rel="noopener noreferrer"
                download={!profile.resumeUrl ? true : undefined}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-sky-600 text-white text-sm font-medium shadow-[0_10px_25px_rgba(37,99,235,0.35)] hover:bg-sky-700 transition-colors"
              >
                Download CV
              </motion.a>
              <motion.a
                href="/projects"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-slate-900 border border-slate-200 text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                View Projects →
              </motion.a>
            </div>

            {/* Knowledge strip */}
            <div className="mt-6 border-t border-slate-200 pt-4">
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-3">
                Snapshot of tools & languages I work with
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "JavaScript",
                  "React",
                  "Node.js",
                  "MongoDB",
                  "Express.js",
                  "HTML",
                  "CSS",
                  "Tailwind",
                  "Framer Motion",
                  "VS Code",
                  "npm",
                  "js libraries (animations)",
                ].map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full bg-slate-100 text-[0.7rem] font-medium text-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: big image card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center"
          >
            <motion.div
              className="relative w-full max-w-md rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.22)] overflow-hidden"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            >
              <div className="h-1 w-full bg-gradient-to-r from-sky-500 via-indigo-500 to-pink-500" />
              <img
                src={profile.avatar}
                alt={displayName}
                className="w-full h-[410px] sm:h-[490px] object-cover"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* ======= TIMELINE ======= */}
        <div className="mt-10 relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-sky-400 via-slate-200 to-pink-400" />

          {about.map((item) => {
            const isEven = item.id % 2 === 0;
            return (
              <div
                key={item.id}
                className={`relative flex flex-col lg:flex-row items-stretch mb-10 lg:mb-12 ${
                  isEven ? "lg:justify-end" : "lg:justify-start"
                }`}
              >
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-8 w-5 h-5 rounded-full bg-white border-[3px] border-sky-500 shadow-[0_0_0_6px_rgba(56,189,248,0.25)] z-10" />

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                    boxShadow: "0 18px 40px rgba(15,23,42,0.14)",
                  }}
                  className={`w-full lg:max-w-xl rounded-2xl bg-white/95 border border-slate-200 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur-lg px-6 py-6 sm:px-8 sm:py-8 ${
                    isEven ? "lg:ml-10 lg:text-left" : "lg:mr-10 lg:text-right"
                  }`}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {item.content}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
