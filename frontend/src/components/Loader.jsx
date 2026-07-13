import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#050505] relative overflow-hidden">
      
      {/* Background Liquid Blobs */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        
        {/* Purple Blob */}
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-40 h-40 sm:w-56 sm:h-56 bg-purple-600 rounded-full mix-blend-screen filter blur-[40px] sm:blur-[60px] opacity-70"
        />

        {/* Blue Blob */}
        <motion.div
          animate={{
            x: [0, -40, 20, 0],
            y: [0, 30, -20, 0],
            scale: [1, 0.8, 1.1, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-40 h-40 sm:w-56 sm:h-56 bg-blue-600 rounded-full mix-blend-screen filter blur-[40px] sm:blur-[60px] opacity-70"
        />
        
        {/* Pink/Indigo Blob */}
        <motion.div
          animate={{
            x: [0, 20, -30, 0],
            y: [0, 20, -40, 0],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-32 h-32 sm:w-48 sm:h-48 bg-indigo-500 rounded-full mix-blend-screen filter blur-[40px] sm:blur-[60px] opacity-60"
        />
      </div>

      {/* Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center p-8 sm:p-10 rounded-[32px] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-white/20">
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-white font-bold text-3xl sm:text-4xl tracking-tight"
            style={{ fontFamily: "'Dancing Script', 'Great Vibes', cursive", paddingTop: "4px" }}
          >
            M
          </motion.span>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/90 font-medium text-sm sm:text-base tracking-widest uppercase"
          >
            Loading
          </motion.div>
          {/* Custom animated progress dots */}
          <div className="flex gap-1.5 mt-1">
             <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-blue-400" />
             <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-purple-400" />
             <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
