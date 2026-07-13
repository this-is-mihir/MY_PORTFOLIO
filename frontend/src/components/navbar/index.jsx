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
              className="absolute top-[calc(100%+0.75rem)] left-0 w-full bg-white border border-slate-100 shadow-2xl rounded-3xl p-4 md:hidden flex flex-col"
            >
              <ul className="flex flex-col space-y-1.5 text-[15px] font-semibold">
                {menuItems.map((item) => {
                  const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                  const isActive = location.pathname === path || (item !== "Home" && location.pathname.startsWith(path));

                  return (
                    <li key={item}>
                      <Link
                        onClick={() => setIsOpen(false)}
                        to={path}
                        className={`block px-5 py-3.5 rounded-2xl transition-all duration-200 ${
                          isActive 
                            ? "bg-[#111] text-white shadow-md" 
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        {item}
                      </Link>
                    </li>
                  );
                })}
              </ul>

            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
