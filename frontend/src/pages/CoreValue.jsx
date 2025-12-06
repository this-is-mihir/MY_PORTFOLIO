import { motion } from "framer-motion";
import {
  GraduationCap,
  Handshake,
  Lightbulb,
  Sparkles,
  Users,
} from "lucide-react";

const coreValues = [
  {
    id: 1,
    title: "Commitment to Integrity",
    description:
      "I uphold honesty and transparency in all my work, ensuring ethical and lawful practices in a remote environment.",
    icon: <GraduationCap className="w-8 h-8 text-sky-600" />,
  },
  {
    id: 2,
    title: "Continuous Learning",
    description:
      "I strive to expand my knowledge and skills consistently, adapting to new technologies and methodologies.",
    icon: <Lightbulb className="w-8 h-8 text-indigo-600" />,
  },
  {
    id: 3,
    title: "Collaboration & Communication",
    description:
      "I value teamwork and effective communication, ensuring smooth coordination across diverse teams and projects.",
    icon: <Users className="w-8 h-8 text-sky-600" />,
  },
  {
    id: 4,
    title: "Innovation & Creativity",
    description:
      "I approach problems with creativity and innovation, delivering unique solutions that add value.",
    icon: <Sparkles className="w-8 h-8 text-indigo-600" />,
  },
];

export default function CoreValues() {
  return (
    <section
      id="values"
      className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-sky-50 text-slate-900 overflow-hidden"
    >
      {/* 🔵 Soft floating background blobs – light theme */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -20, 20, 0],
            opacity: [0.18, 0.35, 0.18],
          }}
          transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
          className="absolute top-6 left-10 w-64 h-64 bg-sky-200 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -20, 20, 0],
            y: [0, 20, -20, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ repeat: Infinity, duration: 17, ease: "easeInOut" }}
          className="absolute bottom-0 right-10 w-72 h-72 bg-indigo-200 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 25, -25, 0],
            y: [0, -15, 15, 0],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/3 w-80 h-80 bg-sky-100 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* 🔻 IMPROVED HEADING (blog-style) */}
        <div className="mb-10">
          <span className="text-[2.5rem] tracking-[0.2em] uppercase text-slate-500">
            What drives my work
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight">
            My{" "}
            <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-700 bg-clip-text text-transparent">
              Core Values
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
            The principles that guide how I design, build and collaborate on
            every project — from first commit to final deployment.
          </p>
        </div>

        {/* Grid – already responsive (1 / 2 / 4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {coreValues.map((value, index) => (
            <motion.div
              key={value.id} // ✅ unique key, no error
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="relative p-6 rounded-2xl bg-white/90 backdrop-blur-lg shadow-[0_12px_30px_rgba(15,23,42,0.12)]
                         flex flex-col items-center text-center cursor-pointer overflow-hidden border border-slate-200"
            >
              {/* ANDAR WALA ANIMATION – untouched */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 shadow-lg border-sky-100/70 pointer-events-none"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
              />

              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="p-4 rounded-full bg-sky-50 flex items-center justify-center shadow-md mb-3 relative z-10"
              >
                {value.icon}
              </motion.div>

              <h3 className="relative text-lg font-semibold mb-2 text-slate-900 z-10">
                {value.title}
              </h3>
              <p className="relative text-sm text-slate-500 z-10">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
