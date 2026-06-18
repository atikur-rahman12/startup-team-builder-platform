"use client";

import React, { useState } from "react";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries());

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      setIsLoading(true);

      const { data, error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Login failed");
        return;
      } else {
        toast.success("Login successful 🎉");
        router.push(redirectTo);
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden selection:bg-violet-500/30 selection:text-white">
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-violet-600/10 blur-[150px] rounded-full pointer-events-none animate-pulse duration-6000" />
      <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none animate-pulse duration-8000" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="w-full max-w-md relative z-10 group">
        <div className="absolute -inset-0.5 bg-linear-to-r from-violet-500 to-cyan-500 rounded-3xl opacity-20 group-hover:opacity-40 blur-md transition duration-1000 group-hover:duration-200 pointer-events-none" />

        <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linear-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 mb-4 animate-bounce duration-1000">
              <Sparkles size={12} className="text-cyan-400" />
              <span className="text-[11px] font-bold tracking-wider text-violet-300 uppercase">
                Welcome Back
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Sign in to{" "}
              <span className="bg-linear-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                StartupForge
              </span>
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Enter your credentials to access your incubator dashboard.
            </p>
          </div>

          <button
            type="button"
            className="w-full h-12 flex items-center justify-center gap-3 bg-white/3 hover:bg-white/6 border border-white/5 hover:border-white/10 text-slate-200 font-medium rounded-xl transition-all duration-300 transform active:scale-[0.98] cursor-pointer shadow-lg relative group/btn overflow-hidden"
          >
            <div className="absolute -inset-x-full h-full bg-linear-to-r from-transparent via-white/5 to-transparent transition-all duration-1000 group-hover/btn:translate-x-full" />

            <svg
              className="h-5 w-5 shrink-0"
              viewBox="0 0 24 24"
              width="100%"
              height="100%"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 12-4.53z"
              />
            </svg>

            <span className="text-sm tracking-wide font-semibold text-slate-200">
              Continue with Google
            </span>
          </button>

          <div className="flex items-center my-6">
            <div className="grow h-px bg-linear-to-r from-transparent to-white/10" />
            <span className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-widest">
              or
            </span>
            <div className="grow h-px bg-linear-to-l from-transparent to-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 tracking-wide uppercase px-1">
                Email Address
              </label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-violet-400 transition-colors duration-200">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@company.com"
                  className="w-full h-12 pl-11 pr-4 bg-slate-950/40 border border-white/5 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200 text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-1">
                <label className="text-xs font-bold text-slate-400 tracking-wide uppercase">
                  Password
                </label>
                <a
                  href="#forgot"
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-violet-400 transition-colors duration-200">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full h-12 pl-11 pr-11 bg-slate-950/40 border border-white/5 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200 text-sm font-medium tracking-wide"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-linear-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:from-violet-500 hover:via-indigo-500 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-950/50 transition-all duration-300 transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-2 relative overflow-hidden group/submit disabled:opacity-70 disabled:pointer-events-none"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="tracking-wide">Sign In</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover/submit:translate-x-0.5"
                  />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-8 font-medium">
            Don't have an incubator account?{" "}
            <Link
              href="/signup"
              className="text-indigo-400 font-bold hover:text-indigo-300 hover:underline transition-colors"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
