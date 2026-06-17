import React from "react";
import Link from "next/link";
import { Zap, Mail, ArrowRight, Heart } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-slate-950 text-slate-400">
      {/* Decorative Top linear Line */}
      <div className="absolute top-0 left-0 right-0 h-1px bg-linear-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3 xl:gap-8">
          {/* Brand/Platform Info Section */}
          <div className="space-y-6">
            <Link
              href="/"
              className="flex items-center gap-2.5 transition-transform active:scale-95"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-tr from-violet-500 to-indigo-500 text-white shadow-lg shadow-indigo-500/30">
                <Zap size={22} className="fill-current" />
              </div>
              <span className="bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-xl font-bold tracking-tight text-transparent">
                Startup<span className="text-indigo-400">Forge</span>
              </span>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-slate-400">
              The premium destination for startup founders to pitch visionary
              ideas, recruit elite global collaborators, and forge unstoppable
              teams.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-slate-400 transition-all duration-300 hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-white"
              >
                <FaXTwitter size={18} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-slate-400 transition-all duration-300 hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-white"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-slate-400 transition-all duration-300 hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-white"
              >
                <FaGithub size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {/* Explore Column */}
              <div>
                <h3 className="text-sm font-semibold tracking-wider text-slate-200 uppercase">
                  Explore
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li>
                    <Link
                      href="/"
                      className="text-sm transition-colors duration-200 hover:text-white flex items-center gap-1 group"
                    >
                      <ArrowRight
                        size={12}
                        className="opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-indigo-400"
                      />
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/startups"
                      className="text-sm transition-colors duration-200 hover:text-white flex items-center gap-1 group"
                    >
                      <ArrowRight
                        size={12}
                        className="opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-indigo-400"
                      />
                      Browse Startups
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/opportunities"
                      className="text-sm transition-colors duration-200 hover:text-white flex items-center gap-1 group"
                    >
                      <ArrowRight
                        size={12}
                        className="opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-indigo-400"
                      />
                      Browse Opportunities
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Platform Column */}
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold tracking-wider text-slate-200 uppercase">
                  Platform
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li>
                    <Link
                      href="/login"
                      className="text-sm transition-colors duration-200 hover:text-white flex items-center gap-1 group"
                    >
                      <ArrowRight
                        size={12}
                        className="opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-indigo-400"
                      />
                      Login / Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-sm transition-colors duration-200 hover:text-white flex items-center gap-1 group"
                    >
                      <ArrowRight
                        size={12}
                        className="opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-indigo-400"
                      />
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="text-sm transition-colors duration-200 hover:text-white flex items-center gap-1 group"
                    >
                      <ArrowRight
                        size={12}
                        className="opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-indigo-400"
                      />
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Premium Newsletter Section */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-slate-200 uppercase">
                Stay Updated
              </h3>
              <p className="mt-4 text-sm text-slate-400">
                Get the latest startup trends and fresh tech opportunities
                directly in your inbox.
              </p>
              <form className="mt-4 sm:flex sm:max-w-md gap-2">
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="input input-sm h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition-all focus:border-indigo-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  />
                </div>
                <div className="mt-3 sm:mt-0">
                  <button
                    type="submit"
                    className="btn btn-sm h-10 w-full sm:w-auto rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 text-white font-medium hover:from-violet-500 hover:to-indigo-500 border-none shadow-md shadow-indigo-500/20 active:scale-95 transition-all px-4"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section (Copyright & Meta) */}
        <div className="mt-12 border-t border-white/5 pt-8 md:flex md:items-center md:justify-between">
          <p className="text-xs text-slate-500 order-2 md:order-1 text-center md:text-left">
            &copy; {currentYear} StartupForge. All rights reserved.
          </p>
          <div className="flex justify-center items-center gap-1 text-xs text-slate-500 order-1 md:order-2 mb-4 md:mb-0">
            <span>Built with</span>
            <Heart
              size={12}
              className="text-rose-500 fill-current animate-pulse"
            />
            <span>for innovators worldwide.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
