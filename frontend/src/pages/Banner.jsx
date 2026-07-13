import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaPhoneAlt, FaLinkedin, FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const API_BASE_URL = "https://portfolio-backend-6wpf.onrender.com";

export default function Banner() {
  const [profile, setProfile] = useState({
    name: "Mihir Patel",
    resumeUrl: ""
  });
  
  // Real-time clock for telemetry display
  const [time, setTime] = useState(new Date());

  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });

  // ---- Fetch Profile ----
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/profile`);
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          setProfile(data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  // ---- Live Clock Tick ----
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });

  // ---- mouse trail effect ----
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

      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";

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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/profile`);
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile({
          resumeUrl: data?.resumeUrl || "",
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const resumeHref = profile.resumeUrl || "/cv.pdf";

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#fafdfa] text-[#111] font-sans selection:bg-black selection:text-white"
    >
      {/* Soft background blobs matching the rest of the website (Sky & Indigo) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[0%] left-[10%] w-[50rem] h-[50rem] bg-sky-200 rounded-full blur-[150px] opacity-40" />
        <div className="absolute top-[10%] right-[10%] w-[45rem] h-[45rem] bg-indigo-200 rounded-full blur-[150px] opacity-30" />
        <div className="absolute bottom-[-10%] left-[30%] w-[55rem] h-[55rem] bg-sky-100 rounded-full blur-[150px] opacity-30" />
      </div>

      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0"
      />

      {/* SVG Filter for the melted joint effect */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex items-stretch px-4 sm:px-6 lg:px-12 py-20 lg:py-0 min-h-[70vh]">
        
        {/* Left Sidebar */}
        <div className="hidden lg:flex flex-col items-center justify-center gap-6 pr-10 xl:pr-14">
          <div className="w-[1.5px] h-32 bg-[#222] mb-2 rounded-full"></div>
          <a href="https://x.com/this_is_mihir" target="_blank" rel="noopener noreferrer" className="text-[1.2rem] text-[#111] hover:scale-110 transition-transform"><FaXTwitter /></a>
          <a href="https://www.linkedin.com/in/mihir-patel-a91380289/" target="_blank" rel="noopener noreferrer" className="text-[1.2rem] text-[#111] hover:scale-110 transition-transform"><FaLinkedin /></a>
          <a href="https://github.com/this-is-mihir" target="_blank" rel="noopener noreferrer" className="text-[1.2rem] text-[#111] hover:scale-110 transition-transform"><FaGithub /></a>
        </div>

        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex flex-col justify-center pl-0"
        >
          
          {/* Mac-style Frosted Terminal Snippet (Unique Developer Aesthetic) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8 lg:mb-12 flex items-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-[100px] border border-[#111]/5 bg-white/60 backdrop-blur-md shadow-sm w-fit group cursor-default"
          >
            <div className="flex gap-1.5 mr-4 opacity-50 group-hover:opacity-100 transition-opacity">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]"></span>
            </div>
            <div className="flex items-center text-[12px] sm:text-[13px] font-mono font-medium text-[#555]">
              <span className="text-[#999] mr-2">~/portfolio %</span>
              <span className="text-[#111] font-bold tracking-tight">npm run build</span>
              <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="w-1.5 h-3.5 sm:h-4 bg-[#111] ml-1.5 rounded-sm"
              ></motion.span>
            </div>
          </motion.div>

          {/* Dual-Layer Heading Container: 
              Background layer uses Gooey filter to perfectly melt the connecting inner corner.
              Foreground layer renders pristine, crisp shapes and anti-aliased text over it!
          */}
          <div className="relative font-black tracking-[-0.035em] leading-[1.05] text-[clamp(1.5rem,6.5vw,4.8rem)] w-full z-10">
            
            {/* --- Gooey Background Layer (Provides ONLY the melted joint) --- */}
            <div className="absolute inset-0 pointer-events-none z-0" style={{ filter: 'url(#goo)' }}>
              <div className="flex flex-col">
                {/* Line 1 */}
                <div className="flex items-center gap-[0.25em] whitespace-nowrap">
                  <span className="inline-block bg-[#111] text-transparent px-[0.4em] pt-[0.1em] pb-[0.15em] rounded-[100px]">
                    Full-Stack
                  </span>
                  <span className="text-transparent">Developer</span>
                </div>
                {/* Line 2 */}
                <div className="flex items-center gap-[0.25em] whitespace-nowrap -mt-[0.14em]">
                  <span className="text-transparent">Creating</span>
                  <span className="inline-block bg-[#111] text-transparent px-[0.4em] pt-[0.1em] pb-[0.15em] rounded-[100px]">
                    Secure
                  </span>
                  <span className="text-transparent">Web Systems</span>
                </div>
              </div>
            </div>

            {/* --- Crisp Foreground Layer (Provides exact outer pill shape and flawless text) --- */}
            <div className="relative z-10 flex flex-col pointer-events-auto">
              {/* Line 1 */}
              <div className="flex items-center gap-[0.25em] whitespace-nowrap">
                <span className="inline-block bg-[#111] text-white px-[0.4em] pt-[0.1em] pb-[0.15em] rounded-[100px]">
                  Full-Stack
                </span>
                <span className="text-[#111]">Developer</span>
              </div>
              {/* Line 2 */}
              <div className="flex items-center gap-[0.25em] whitespace-nowrap -mt-[0.14em]">
                <span className="text-[#111]">Creating</span>
                <span className="inline-block bg-[#111] text-white px-[0.4em] pt-[0.1em] pb-[0.15em] rounded-[100px]">
                  Secure
                </span>
                <span className="text-[#111]">Web Systems</span>
              </div>
            </div>

          </div>

          {/* Paragraph */}
          <div className="mt-12 sm:mt-14 space-y-2 text-[1.1rem] sm:text-[1.15rem] md:text-[1.2rem] font-medium text-[#555] max-w-3xl tracking-tight leading-relaxed">
            <p>Versatile full-stack developer with experience across backend, frontend, and infrastructure.</p>
            <p>Focused on building production-ready, maintainable solutions.</p>
          </div>

          {/* Buttons */}
          <div className="mt-14 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 font-semibold">
            <Link to="/contact" className="flex items-center gap-4 border border-[#111] rounded-full pl-2.5 pr-8 py-2.5 hover:bg-[#111] hover:text-white transition-colors group bg-transparent">
              <span className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#111] group-hover:border-white transition-colors text-[#111] group-hover:text-white bg-transparent">
                <FaPhoneAlt className="w-4 h-4 sm:w-4 sm:h-4" />
              </span>
              <span className="text-[1.1rem] sm:text-[1.15rem]">Contact Us</span>
            </Link>
            
            <div className="flex items-center gap-6 pl-4 sm:pl-0">
              <span className="text-[1.1rem] sm:text-[1.15rem] font-bold text-[#666]">or</span>
              
              <a href={resumeHref} download className="flex items-center gap-2 text-[#111] hover:text-[#555] transition-colors text-[1.1rem] sm:text-[1.15rem] font-bold group">
                View Resume <span className="text-[1.6rem] sm:text-[1.8rem] leading-none font-normal mb-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </a>
            </div>
          </div>
          
        </motion.div>
      </div>

      {/* Scroll Indicator (Fills bottom empty space) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
      >
        <span className="text-[11px] sm:text-[12px] font-black uppercase tracking-[0.3em] text-[#888] writing-vertical">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-[1.5px] h-12 sm:h-16 bg-gradient-to-b from-[#888] to-transparent rounded-full"
        ></motion.div>
      </motion.div>

    </section>
  );
}
