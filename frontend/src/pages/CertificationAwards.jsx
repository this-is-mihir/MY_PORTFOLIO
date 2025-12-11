import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import Loader from "../components/Loader";

const API_BASE_URL = "https://portfolio-backend-6wpf.onrender.com";

export default function CertificationAwards() {
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [certificates, setCertificates] = useState([]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? certificates.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === certificates.length - 1 ? 0 : prev + 1
    );
  };

  const fetchCertificates = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/certificates/certificate`
      );
      const data = res.data.certificates || res.data;
      setCertificates(data || []);
      setLoading(false);
      setCurrent(0);
    } catch (err) {
      console.error("Failed to fetch certificates:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!loading && certificates.length === 0) {
    return (
      <section className="relative min-h-[60vh] bg-gradient-to-b from-slate-50 via-white to-sky-50 text-slate-900 py-20 flex items-center justify-center">
        <p className="text-slate-500 text-lg">
          No certificates added yet.
        </p>
      </section>
    );
  }

  const currentCert = certificates[current];

  // 👉 Swipe handling
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 60; // px
    const velocityThreshold = 500; // px/s

    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;

    // Left swipe → next
    if (offsetX < -swipeThreshold || velocityX < -velocityThreshold) {
      nextSlide();
    }
    // Right swipe → previous
    else if (offsetX > swipeThreshold || velocityX > velocityThreshold) {
      prevSlide();
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-sky-50 text-slate-900 overflow-hidden">
      {/* 🔵 Soft background blobs (light theme) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{
            x: [0, 25, -20, 0],
            y: [0, -18, 12, 0],
            opacity: [0.18, 0.35, 0.18],
          }}
          transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          className="absolute -left-16 top-10 w-64 h-64 bg-sky-200 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -20, 20, 0],
            y: [0, 20, -15, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          className="absolute -right-20 bottom-0 w-72 h-72 bg-indigo-200 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Heading – same family as Projects/Blogs */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <span className="text-[2.5rem] tracking-[0.2em] uppercase text-slate-500/80">
            Achievement
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold">
            My{" "}
            <span className="text-sky-600">Certifications</span> & Awards
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
            A quick look at the courses, specializations and recognitions
            that shaped my skills and credibility.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative flex items-center justify-center mt-4">
          {/* Left arrow (desktop only) */}
          <motion.button
            onClick={prevSlide}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center justify-center absolute -left-4 md:-left-16 p-2.5 rounded-full bg-white shadow-md border border-slate-200 text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Card – now draggable for swipe */}
          <motion.div
            key={currentCert?._id || current}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={handleDragEnd}
            className="relative w-full md:w-[85%] lg:w-[80%] max-w-4xl mx-auto 
                       rounded-3xl bg-white/95 border border-slate-200 
                       shadow-[0_16px_40px_rgba(15,23,42,0.12)] 
                       backdrop-blur-lg px-5 sm:px-7 py-6 sm:py-7 cursor-grab active:cursor-grabbing"
          >
            {/* 🔁 subtle animated gradient inside card (like other sections) */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              animate={{
                backgroundPosition: [
                  "0% 0%",
                  "100% 0%",
                  "100% 100%",
                  "0% 100%",
                  "0% 0%",
                ],
                opacity: [0.18, 0.32, 0.22, 0.32, 0.18],
              }}
              transition={{
                repeat: Infinity,
                duration: 16,
                ease: "linear",
              }}
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(56,189,248,0.22), rgba(129,140,248,0.18), transparent)",
                backgroundSize: "260% 260%",
                mixBlendMode: "soft-light",
                zIndex: 0,
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 lg:gap-8">
              {/* Certificate Image */}
              {currentCert?.img && (
                <motion.div
                  className="w-full md:w-1/2 rounded-2xl overflow-hidden bg-slate-100 shadow-sm"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <motion.img
                    src={currentCert.img}
                    alt={currentCert.title}
                    className="w-full h-full max-h-64 object-contain md:object-contain"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </motion.div>
              )}

              {/* Certificate Details */}
              <div className="w-full text-left">
                {/* Small pill: slide number */}
                <div className="flex items-center gap-2 mb-2 text-xs text-slate-500">
                  <span className="inline-flex items-center rounded-full bg-sky-50 text-sky-700 border border-sky-100 px-3 py-1">
                    {current + 1} / {certificates.length} &nbsp; • &nbsp;{" "}
                    {currentCert?.issuer || "Certificate"}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2">
                  {currentCert?.title}
                </h3>

                <p className="text-sm sm:text-[0.95rem] text-slate-600 mb-3">
                  <span className="font-medium text-slate-700">
                    Issuer:
                  </span>{" "}
                  {currentCert?.issuer}
                </p>

                <p className="text-sm text-slate-500 mb-5">
                  <span className="font-medium text-slate-700">Date:</span>{" "}
                  {currentCert?.date
                    ? currentCert.date.slice(0, 10)
                    : "N/A"}
                </p>

                {/* small decorative line + CTA-ish text */}
                <div className="flex items-center gap-3">
                  <motion.span
                    animate={{ x: [0, 10, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.3,
                      ease: "easeInOut",
                    }}
                    className="h-[2px] w-14 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                  />
                  <p className="text-xs sm:text-sm text-slate-500">
                    Proof of my consistency in learning & upskilling.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right arrow (desktop only) */}
          <motion.button
            onClick={nextSlide}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center justify-center absolute -right-4 md:-right-16 p-2.5 rounded-full bg-white shadow-md border border-slate-200 text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-7 gap-2.5">
          {certificates.map((cert, index) => (
            <motion.button
              key={cert._id || index}
              onClick={() => setCurrent(index)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === current
                  ? "bg-sky-600"
                  : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
