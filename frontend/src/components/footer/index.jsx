import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-sky-50 text-slate-600 pt-12 pb-6 border-t border-slate-200">
      {/* Background Soft Lights */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 24, -24, 0],
            y: [0, -16, 16, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
          className="absolute top-0 left-10 w-52 h-52 bg-sky-200 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -20, 20, 0],
            y: [0, 18, -18, 0],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          className="absolute bottom-0 right-10 w-60 h-60 bg-indigo-200 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 grid gap-8 md:grid-cols-3 text-center md:text-left relative z-10">
        {/* Left - Logo / Name */}
        <div className="space-y-3">
          <h2 className="logo-script text-[2.4rem] sm:text-[2.7rem] text-slate-900 leading-none">
            Mihir
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Building intelligent products with MERN & modern web technologies.
            Always learning, always shipping.
          </p>
        </div>

        {/* Middle - Links */}
        <div>
          <h3 className="text-base font-semibold text-slate-900 mb-3 tracking-wide">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Home", to: "/" },
              { label: "About", to: "/about" },
              { label: "Projects", to: "/projects" },
              { label: "Blog", to: "/blog" },
              { label: "Contact", to: "/contact" },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="group inline-flex items-center gap-2 text-slate-600 hover:text-sky-700 transition-colors duration-150"
                >
                  <span className="h-[2px] w-0 group-hover:w-4 bg-sky-500 rounded-full transition-all duration-200" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right - Social Icons */}
        <div>
          <h3 className="text-base font-semibold text-slate-900 mb-3 tracking-wide">
            Connect
          </h3>
          <p className="text-sm text-slate-500 mb-3">
            Let&apos;s connect and build something meaningful.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <motion.a
              whileHover={{ scale: 1.12, y: -1 }}
              transition={{ duration: 0.15 }}
              href="https://www.linkedin.com/in/mihir-patel-a91380289/"
              target="_blank"
              className="p-2 rounded-full bg-sky-50 text-slate-700 hover:bg-sky-100 hover:text-sky-700 shadow-sm transition-colors"
            >
              <FaLinkedin size={20} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.12, y: -1 }}
              transition={{ duration: 0.15 }}
              href="https://github.com/this-is-mihir"
              target="_blank"
              className="p-2 rounded-full bg-sky-50 text-slate-700 hover:bg-sky-100 hover:text-slate-900 shadow-sm transition-colors"
            >
              <FaGithub size={20} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.12, y: -1 }}
              transition={{ duration: 0.15 }}
              href="https://x.com/this_is_mihir"
              target="_blank"
              className="p-2 rounded-full bg-sky-50 text-slate-700 hover:bg-sky-100 hover:text-slate-900 shadow-sm transition-colors"
            >
              <FaXTwitter size={20} />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-10 border-t border-slate-200 pt-4 text-center text-xs sm:text-sm text-slate-500 relative z-10">
        © 2025 Mihir Patel. All Rights Reserved , Privacy Policy , Terms & Conditions
      </div>

      {/* Back to Top Button */}
      {showTopBtn && (
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 p-3 rounded-full bg-sky-600 text-white shadow-[0_10px_25px_rgba(37,99,235,0.45)] hover:bg-sky-700 transition-colors"
          aria-label="Back to top"
        >
          <FaArrowUp size={18} />
        </motion.button>
      )}
    </footer>
  );
}
