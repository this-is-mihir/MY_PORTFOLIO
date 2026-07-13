import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#F3F4F6]">
      <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      <span className="mt-4 text-[11px] font-semibold text-slate-400 tracking-[0.2em] uppercase">
        Loading
      </span>
    </div>
  );
}
