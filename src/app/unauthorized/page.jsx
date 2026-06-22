"use client";

import { ShieldX, ArrowLeft, Home, Lock } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 px-4">
      {/* Background Glow */}
      <div className="absolute w-125 h-125 bg-red-500/20 blur-3xl rounded-full -top-25 -left-25" />
      <div className="absolute w-100 h-100 bg-purple-500/20 blur-3xl rounded-full -bottom-30 -right-30" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="p-4 rounded-full bg-red-500/10 border border-red-500/30">
              <ShieldX className="w-10 h-10 text-red-400" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-white">Unauthorized Access</h1>

          {/* Subtitle */}
          <p className="text-slate-400 mt-3 text-sm leading-relaxed">
            You don’t have permission to view this page. Please login or contact
            admin if you think this is a mistake.
          </p>

          {/* Lock Info */}
          <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-xs">
            <Lock className="w-4 h-4" />
            Secure Access Protected
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/signin"
              className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 transition text-white py-2.5 rounded-xl font-medium"
            >
              Sign In Now
            </Link>

            <div className="flex gap-3">
              <Link
                href="/"
                className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition text-white py-2.5 rounded-xl"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>

              <button
                onClick={() => window.history.back()}
                className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition text-white py-2.5 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          © {new Date().getFullYear()} StartupForge. All rights reserved.
        </p>
      </div>
    </div>
  );
}
