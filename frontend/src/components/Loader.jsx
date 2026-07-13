import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Loader() {
  const [text, setText] = useState("");
  const fullText = "> initializing server...\n> fetching projects...\n> establishing connection...\n> loading UI modules...\n> ready!";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 15); // Fast typing speed
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#050505] p-4 font-mono">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg bg-[#0a0a0a] rounded-xl overflow-hidden border border-[#222] shadow-[0_0_50px_-12px_rgba(0,0,0,1)]"
      >
        {/* Terminal Header */}
        <div className="flex items-center px-4 py-3 bg-[#111] border-b border-[#222]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="flex-1 text-center text-[#666] text-[11px] uppercase tracking-widest font-semibold ml-[-40px]">
            mihir — bash
          </div>
        </div>
        
        {/* Terminal Body */}
        <div className="p-5 sm:p-6 text-[13px] sm:text-[14px] leading-relaxed min-h-[220px]">
          <div className="mb-3 text-slate-300">
            <span className="text-blue-400 font-bold">mihir@macbook</span>
            <span className="text-slate-500">:</span>
            <span className="text-pink-400 font-bold">~/portfolio</span>
            <span className="text-slate-500">$ </span> 
            <span className="text-green-400">npm run start</span>
          </div>
          <div className="whitespace-pre-wrap text-slate-400">
            {text}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="inline-block w-2 h-3.5 bg-slate-400 ml-1 mb-[-2px]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
