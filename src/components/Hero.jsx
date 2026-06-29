import React from "react";
import { ArrowUpRight, Zap, Play, Shield, Users, Trophy } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full bg-slate-950 overflow-hidden flex items-center justify-center pt-8 pb-16">
      {/* ১. Background Premium Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-violet-600/15 blur-[80px] sm:blur-[120px] pointer-events-none animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] rounded-full bg-cyan-500/10 blur-[80px] sm:blur-[120px] pointer-events-none" />

      {/* ২. Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* ৩. Top Floating Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 backdrop-blur-md animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
            <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
              Next-Gen Platform
            </span>
            <div className="h-3 w-px bg-white/10 mx-1" />
            <span className="text-slate-400 flex items-center gap-0.5">
              StartupForge v2.0{" "}
              <Zap size={12} className="text-amber-400 fill-current" />
            </span>
          </div>

          {/* ৪. Main Aggressive Typography Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15] sm:leading-[1.1]">
            Forge Your Startup Ideas Into{" "}
            <span className="bg-linear-to-r from-violet-400 via-indigo-200 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
              Digital Empires
            </span>
          </h1>

          {/* ৫. Short Elegant Subtitle Description */}
          <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed sm:leading-8">
            Connect with top-tier talent, pitch to global investors, and build
            scalable solutions with the world's most powerful launchpad
            ecosystem.
          </p>

          {/* ৬. CTA Premium Button Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href={"/browse-opportunities"}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-sm font-semibold text-white bg-linear-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-xl shadow-indigo-500/20 active:scale-[0.98] transition-all duration-300 group cursor-pointer"
            >
              <span>Opportunities</span>
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-slate-200"
              />
            </Link>

            <button className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-semibold text-slate-300 bg-white/5 border border-white/5 hover:border-white/10 hover:text-white backdrop-blur-md active:scale-[0.98] transition-all duration-300 group cursor-pointer">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-white group-hover:bg-indigo-500 transition-colors duration-300">
                <Play size={10} className="fill-current ml-0.5" />
              </div>
              <span>Watch Ecosystem Demo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
