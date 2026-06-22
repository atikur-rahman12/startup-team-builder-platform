"use client";

import { SearchX, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#070A12] px-4 overflow-hidden">
      {/* Ambient glow background */}
      <div className="absolute inset-0">
        <div className="absolute w-[650px] h-[650px] bg-amber-500/10 blur-[140px] rounded-full top-[-220px] left-[-220px]" />
        <div className="absolute w-[550px] h-[550px] bg-violet-500/10 blur-[140px] rounded-full bottom-[-220px] right-[-220px]" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md text-center">
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl shadow-[0_25px_100px_-30px_rgba(0,0,0,0.9)] p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <SearchX className="w-10 h-10 text-amber-300" />
            </div>
          </div>

          {/* 404 */}
          <h1 className="text-7xl font-semibold tracking-tight text-white">
            404
          </h1>

          {/* Title */}
          <h2 className="text-xl font-medium text-white/90 mt-3">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-sm text-white/50 mt-3 leading-relaxed">
            The page you’re looking for doesn’t exist or may have been moved.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3">
            {/* Go Home */}
            <Link
              href="/"
              className="group relative w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 text-black font-medium transition-all duration-300 hover:bg-amber-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/20"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>

            {/* Go Back */}
            <button
              onClick={() => window.history.back()}
              className="group relative w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 text-white border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-amber-500/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <ArrowLeft className="w-4 h-4 text-amber-300" />
              Go Back
            </button>
          </div>
        </div>

        {/* Bottom text */}
        <p className="text-xs text-white/30 mt-6">
          Lost in the void? We’ll guide you back.
        </p>
      </div>
    </div>
  );
}
