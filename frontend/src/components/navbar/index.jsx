import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = ["Home", "Skills", "Blog", "About", "Projects", "Contact"];

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Left Logo – more cursive, no circle icon */}
        <Link to="/" className="cursor-pointer select-none">
          <span
            className="text-2xl sm:text-[1.8rem] text-slate-900"
            style={{
              fontFamily:
                "'Great Vibes', 'Playball', 'Pacifico', 'Dancing Script', cursive",
              letterSpacing: "0.06em",
            }}
          >
            Mihir
          </span>
        </Link>

        {/* Middle Menu (Desktop) */}
        <ul className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-700">
          {menuItems.map((item) => (
            <li key={item}>
              {item === "Home" ? (
                <Link
                  to="/"
                  className="relative px-1 py-1 hover:text-sky-600 transition-colors duration-150
                             after:content-[''] after:absolute after:left-0 after:-bottom-1
                             after:w-0 after:h-[2px] after:bg-sky-500
                             hover:after:w-full after:transition-all after:duration-150"
                >
                  {item}
                </Link>
              ) : (
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="relative px-1 py-1 hover:text-sky-600 transition-colors duration-150
                             after:content-[''] after:absolute after:left-0 after:-bottom-1
                             after:w-0 after:h-[2px] after:bg-sky-500
                             hover:after:w-full after:transition-all after:duration-150"
                >
                  {item}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Right Social Icons (Desktop) */}
        <div className="hidden md:flex items-center space-x-3 text-slate-600">
          <motion.a
            whileHover={{ scale: 1.18 }}
            transition={{ duration: 0.15 }}
            href="https://www.linkedin.com/in/mihir-patel-a91380289/"
            target="_blank"
            className="p-2 rounded-full hover:bg-sky-50 transition-colors duration-150"
          >
            <FaLinkedin size={20} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.18 }}
            transition={{ duration: 0.15 }}
            href="https://github.com/this-is-mihir"
            target="_blank"
            className="p-2 rounded-full hover:bg-sky-50 transition-colors duration-150"
          >
            <FaGithub size={20} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.18 }}
            transition={{ duration: 0.15 }}
            href="https://x.com/this_is_mihir"
            target="_blank"
            className="p-2 rounded-full hover:bg-sky-50 transition-colors duration-150"
          >
            <FaXTwitter size={20} />
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 text-slate-800 px-4 py-4 space-y-4 shadow-md">
          <ul className="space-y-3 text-base font-medium">
            {menuItems.map((item) => (
              <li key={item}>
                {item === "Home" ? (
                  <Link
                    onClick={() => setIsOpen(false)}
                    to="/"
                    className="block py-1 hover:text-sky-600 transition-colors duration-150"
                  >
                    {item}
                  </Link>
                ) : (
                  <Link
                    onClick={() => setIsOpen(false)}
                    to={`/${item.toLowerCase()}`}
                    className="block py-1 hover:text-sky-600 transition-colors duration-150"
                  >
                    {item}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="flex space-x-4 pt-3 border-t border-slate-200">
            <motion.a
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.15 }}
              href="https://www.linkedin.com/in/mihir-patel-a91380289/"
              target="_blank"
              className="p-2 rounded-full bg-sky-50 text-slate-700"
            >
              <FaLinkedin size={22} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.15 }}
              href="https://github.com/this-is-mihir"
              target="_blank"
              className="p-2 rounded-full bg-sky-50 text-slate-700"
            >
              <FaGithub size={22} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.15 }}
              href="https://x.com/this_is_mihir"
              target="_blank"
              className="p-2 rounded-full bg-sky-50 text-slate-700"
            >
              <FaXTwitter size={22} />
            </motion.a>
          </div>
        </div>
      )}
    </nav>
  );
}
