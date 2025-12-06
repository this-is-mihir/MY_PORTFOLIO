import { motion } from "framer-motion";
import { Code2, Palette, Rocket, Building2 } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Web Development",
      icon: <Code2 className="w-7 h-7 text-sky-600" />,
      desc:
        "Modern, responsive MERN websites with clean code, smooth animations and fast performance – tailored for your business goals.",
      tag: "MERN · APIs ",
    },
    {
      title: "UI / UX Design",
      icon: <Palette className="w-7 h-7 text-indigo-500" />,
      desc:
        "Clean, aesthetic interfaces focused on usability, consistency and brand identity that users actually enjoy using.",
      tag: "MODERN DESIGN ",
    },
    {
      title: "Portfolio / Freelance Sites",
      icon: <Rocket className="w-7 h-7 text-emerald-500" />,
      desc:
        "High-converting personal and portfolio sites for developers, creators or freelancers to showcase work and get more clients.",
      tag: "Personal Brand · Landing pages",
    },
    {
      title: "Brand / Company Websites",
      icon: <Building2 className="w-7 h-7 text-amber-500" />,
      desc:
        "Trust-building company profiles with clear structure, SEO-ready pages and a polished, professional online presence.",
      tag: "Business website · SEO-ready",
    },
  ];

  return (
    <section
      id="services"
      className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-sky-50 text-slate-900 overflow-hidden"
    >
      {/* Soft BG blobs like other light sections */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{
            x: [0, 25, -15, 0],
            y: [0, -20, 10, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          className="absolute -left-16 top-10 w-64 h-64 bg-sky-200 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -20, 20, 0],
            y: [0, 18, -12, 0],
            opacity: [0.12, 0.28, 0.12],
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          className="absolute -right-24 bottom-0 w-72 h-72 bg-indigo-200 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Heading style similar to Projects / Blog / Skills */}
        <div className="text-center mb-14">
          <span className="text-[2.5rem] tracking-[0.2em] uppercase text-slate-500/80">
            Services
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold">
            How I <span className="text-sky-600">Help You</span> Online
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
            From clean UIs to production-ready MERN apps, I build sites that
            look premium, load fast and actually convert visitors into clients.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.04,
                y: -4,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                  mass: 0.5,
                },
              }}
              className="relative overflow-hidden rounded-2xl bg-white/95 border border-slate-200 
                         shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur-lg 
                         p-5 sm:p-6 flex flex-col h-full"
            >
              {/* 🔁 NEW inner animation behind icon (orbit dot + soft pulse) */}
              <div className="relative mb-4 inline-flex items-center">
                {/* Outer orbit ring + moving dot */}
                <motion.div
                  className="absolute flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 18,
                    ease: "linear",
                  }}
                >
                  <div className="relative w-14 h-14 rounded-full border border-sky-100/80">
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sky-400/90" />
                  </div>
                </motion.div>

                {/* Soft breathing glow under icon */}
                <motion.div
                  className="absolute w-12 h-12 rounded-2xl bg-sky-50"
                  animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                />

                {/* Icon bubble (top layer) */}
                <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-sm">
                  {service.icon}
                </div>
              </div>

              {/* Title + tag */}
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">
                {service.title}
              </h3>
              <p className="text-[0.75rem] uppercase tracking-wide text-sky-600 mb-3">
                {service.tag}
              </p>

              {/* Description */}
              <p className="text-sm sm:text-[0.95rem] text-slate-600 flex-1 leading-relaxed">
                {service.desc}
              </p>

              {/* Small animated highlight at bottom of card */}
              <div className="mt-4 flex items-center justify-between">
                <motion.span
                  animate={{ x: [0, 12, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.2,
                    ease: "easeInOut",
                  }}
                  className="h-[2px] w-16 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-xs sm:text-sm font-medium text-sky-700 hover:text-sky-900"
                >
                  <a href="/contact">Let&apos;s build this →</a>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
