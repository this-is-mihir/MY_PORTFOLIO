import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = ["Home", "Skills", "Blog", "About", "Projects", "Contact"];

  return (
    <div className="fixed top-2 sm:top-3 left-0 w-full z-50 flex justify-center px-4 sm:px-6 lg:px-8 pointer-events-none">
      <nav className="pointer-events-auto w-full max-w-7xl bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white/80 rounded-[100px] px-5 sm:px-8 py-1 sm:py-1.5 flex items-center justify-between relative transition-all duration-300">
        
        {/* Left Logo */}
        <Link to="/" className="cursor-pointer select-none z-10 flex-shrink-0 flex items-center">
          <span
            className="text-[1.5rem] sm:text-[1.75rem] text-slate-900 drop-shadow-sm font-bold leading-none pb-0.5"
            style={{
              fontFamily: "'Dancing Script', 'Great Vibes', cursive",
              letterSpacing: "0.04em",
            }}
          >
            Mihir
          </span>
        </Link>

        {/* Middle Menu (Desktop) */}
        <ul className="hidden md:flex items-center justify-center space-x-1 lg:space-x-2 text-[14px] lg:text-[15px] font-semibold text-slate-600 absolute left-1/2 -translate-x-1/2">
          {menuItems.map((item) => {
            const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
            const isActive = location.pathname === path || (item !== "Home" && location.pathname.startsWith(path));

            return (
              <li key={item} className="relative">
                <Link
                  to={path}
                  className={`relative px-4 py-1.5 transition-colors duration-300 rounded-[100px] flex items-center justify-center z-10 ${
                    isActive ? "text-white" : "hover:bg-black/5 hover:text-[#111]"
                  }`}
                >
                  {item}
                </Link>
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-[#111] rounded-[100px] shadow-sm z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Right Social Icons (Desktop) */}
        <div className="hidden md:flex items-center space-x-2 text-slate-700 z-10 flex-shrink-0">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="https://x.com/this_is_mihir"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full hover:bg-black/5 hover:text-black transition-colors duration-200"
          >
            <FaXTwitter size={18} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.linkedin.com/in/mihir-patel-a91380289/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full hover:bg-black/5 hover:text-[#0a66c2] transition-colors duration-200"
          >
            <FaLinkedin size={19} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/this-is-mihir"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full hover:bg-black/5 hover:text-black transition-colors duration-200"
          >
            <FaGithub size={19} />
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-800 p-1.5 rounded-full hover:bg-black/5 transition-colors z-10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[calc(100%+0.75rem)] left-0 w-full bg-white/90 backdrop-blur-xl border border-white/60 shadow-[0_16px_40px_rgba(0,0,0,0.1)] rounded-3xl px-6 py-6 md:hidden flex flex-col space-y-4"
            >
              <ul className="flex flex-col space-y-2 text-base font-semibold text-slate-800">
                {menuItems.map((item) => {
                  const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                  const isActive = location.pathname === path || (item !== "Home" && location.pathname.startsWith(path));

                  return (
                    <li key={item} className="relative">
                      <Link
                        onClick={() => setIsOpen(false)}
                        to={path}
                        className={`block px-4 py-3 rounded-2xl transition-colors duration-200 relative z-10 ${
                          isActive 
                            ? "text-white" 
                            : "hover:bg-black/5 hover:text-[#111]"
                        }`}
                      >
                        {item}
                      </Link>
                      {isActive && (
                        <div className="absolute inset-0 bg-[#111] rounded-2xl shadow-sm z-0" />
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center justify-center space-x-6 pt-4 border-t border-slate-200/60">
                <a
                  href="https://x.com/this_is_mihir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-black/5 hover:bg-black/10 text-slate-800 transition-colors"
                >
                  <FaXTwitter size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/mihir-patel-a91380289/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-black/5 hover:bg-black/10 text-[#0a66c2] transition-colors"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://github.com/this-is-mihir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-black/5 hover:bg-black/10 text-slate-800 transition-colors"
                >
                  <FaGithub size={20} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
