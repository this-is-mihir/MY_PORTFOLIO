import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import DP from "../assets/Images/fomal.png";

const API_BASE_URL = "https://portfolio-backend-6wpf.onrender.com";

export default function Banner() {
  const [profile, setProfile] = useState({
    name: "Mihir Patel",
    title: "FullStack Developer (MERN)",
    bio: "Passionate about building intelligent applications with AI, ML, and modern web technologies. Always exploring the edge of innovation.",
    avatar: DP,
    resumeUrl: "",     // ✅ NEW
  });

  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  // ---- mouse trail effect (as you have) ----
  useEffect(() => {
    const sectionEl = sectionRef.current;
    const canvas = canvasRef.current;
    if (!sectionEl || !canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationId;
    let hue = 200;
    let rect = sectionEl.getBoundingClientRect();

    const resizeCanvas = () => {
      rect = sectionEl.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const addParticles = (x, y) => {
      for (let i = 0; i < 6; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 1.8,
          vy: (Math.random() - 0.5) * 1.8,
          life: 1,
          size: 3 + Math.random() * 4,
          hue: (hue + Math.random() * 40) % 360,
        });
      }
    };

    const handleMouseMove = (e) => {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
      addParticles(x, y);
    };

    const handleMouseLeave = () => {};

    sectionEl.addEventListener("mousemove", handleMouseMove);
    sectionEl.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      ctx.fillStyle = "rgba(248, 250, 252, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      hue = (hue + 0.4) % 360;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.015;

        if (p.life > 0) {
          const alpha = p.life;
          const gradient = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.size * 3
          );
          gradient.addColorStop(
            0,
            `hsla(${p.hue}, 100%, 65%, ${alpha})`
          );
          gradient.addColorStop(
            1,
            `hsla(${p.hue}, 100%, 65%, 0)`
          );

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      particles = particles.filter((p) => p.life > 0);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      sectionEl.removeEventListener("mousemove", handleMouseMove);
      sectionEl.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // ---- Profile API fetch ----
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/profile`);
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();

        setProfile({
          name: data?.name || "Mihir Patel",
          title: data?.title || "FullStack Developer (MERN)",
          bio:
            data?.bio ||
            "Passionate about building intelligent applications with AI, ML, and modern web technologies. Always exploring the edge of innovation.",
          avatar: data?.avatar && data.avatar.trim() !== "" ? data.avatar : DP,
          resumeUrl: data?.resumeUrl || "",   // ✅ load from backend
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  // agar resumeUrl nahi mila to /cv.pdf fallback (agar tu manually rakhna chahe)
  const resumeHref = profile.resumeUrl || "/cv.pdf";

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-sky-50 text-slate-900"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0"
      />

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-24 top-10 w-80 h-80 bg-sky-200/50 rounded-full blur-3xl" />
        <div className="absolute -left-24 bottom-0 w-72 h-72 bg-indigo-200/50 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl w-full px-5 sm:px-6 lg:px-8 py-16 md:py-20 grid md:grid-cols-2 items-center gap-10 lg:gap-16">
        {/* LEFT */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-extrabold leading-tight tracking-tight">
              Hi, I’m{" "}
              <span className="text-sky-600 font-[script]">
                {profile.name || "Mihir Patel"}
              </span>
            </h1>

            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-700">
              {profile.title || "FullStack Developer (MERN)"}
            </h2>

            <p className="text-sm sm:text-base text-slate-500 max-w-md">
              {profile.bio ||
                "Passionate about building intelligent applications with modern web technologies."}
            </p>
          </div>

          {/* CV Button */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={resumeHref}
              download
              className="group relative inline-flex items-center gap-2 bg-sky-600 px-6 py-3 rounded-xl text-white text-sm sm:text-base font-medium shadow-md transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-130%] group-hover:translate-x-[130%] transition-transform duration-700 ease-out" />

              <FaDownload className="text-white relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">Download CV</span>

              <span className="absolute inset-0 rounded-xl border border-transparent group-hover:border-white/40 transition-all duration-300 group-hover:shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
            </a>

            <div className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-[11px] sm:text-xs text-slate-600 backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <a href="/contact">Available for work</a>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-3 py-1 rounded-full text-xs sm:text-sm bg-sky-100 text-sky-700">
              React
            </span>
            <span className="px-3 py-1 rounded-full text-xs sm:text-sm bg-emerald-100 text-emerald-700">
              Node
            </span>
            <span className="px-3 py-1 rounded-full text-xs sm:text-sm bg-purple-100 text-emerald-700">
              Express
            </span>
            <span className="px-3 py-1 rounded-full text-xs sm:text-sm bg-indigo-100 text-indigo-700">
              MongoDB
            </span>
            <span className="px-3 py-1 rounded-full text-xs sm:text-sm bg-amber-100 text-amber-700">
              UI & Animations
            </span>
          </div>
        </motion.div>

        {/* RIGHT – image as you had */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute w-[260px] h-[260px] sm:w-[310px] sm:h-[310px] md:w-[350px] md:h-[350px] rounded-full border-[5px] border-sky-400 border-t-transparent border-b-transparent"
            />

            <motion.img
              src={profile.avatar || DP}
              alt={profile.name || "Mihir Patel"}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative w-52 sm:w-60 md:w-72 rounded-3xl object-cover shadow-[0_15px_45px_rgba(15,23,42,0.35)]"
            />

            <div className="hidden md:flex absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur px-4 py-2 shadow-md">
              <p className="text-[11px] text-slate-600 uppercase font-medium">
                smooth MERN experiences ✨
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
