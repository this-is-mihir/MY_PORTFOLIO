import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-black">
      <motion.div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />
      <motion.span
        className="ml-4 text-xl font-semibold text-blue-400"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        Loading...
      </motion.span>
    </div>
  );
}
