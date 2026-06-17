"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Briefcase,
  Layers,
  Home,
  Compass,
  User,
  LogOut,
  Menu,
  X,
  Zap,
} from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Authentication State Handler (Default-e logged out thakbe)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mobile menu outside click event handler
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  // Handle Logout Action
  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsOpen(false);
    console.log("User successfully logged out.");
    router.push("/");
  };

  // Fake Login Trigger Action
  const handleFakeLogin = () => {
    setIsAuthenticated(true);
    setIsOpen(false);
    router.push("/dashboard");
  };

  // Navigation Items Arrays
  const publicLinks = [
    { name: "Home", href: "/", icon: <Home size={16} /> },
    { name: "Browse Startups", href: "/startups", icon: <Layers size={16} /> },
    {
      name: "Browse Opportunities",
      href: "/opportunities",
      icon: <Briefcase size={16} />,
    },
  ];

  const authLinks = [
    { name: "Dashboard", href: "/dashboard", icon: <Compass size={16} /> },
    { name: "Profile", href: "/profile", icon: <User size={16} /> },
  ];

  // Modern Underline Style Tracker
  const getLinkClass = (path) => {
    const baseClass =
      "flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all duration-300 relative group";
    const isActive = pathname === path || (path === "/" && pathname === null);

    return {
      linkElement: isActive
        ? `${baseClass} text-white`
        : `${baseClass} text-slate-400 hover:text-white`,
      underlineElement: isActive
        ? "absolute bottom-[-4px] left-3 right-3 h-[2px] bg-linear-to-r from-violet-500 via-indigo-500 to-cyan-400 rounded-full transition-all duration-300"
        : "absolute bottom-[-4px] left-1/2 right-1/2 h-[2px] bg-linear-to-r from-violet-500 to-indigo-500 rounded-full opacity-0 transition-all duration-300 group-hover:left-3 group-hover:right-3 group-hover:opacity-100",
    };
  };

  // Mobile Active/Hover Style handler
  const getMobileLinkClass = (path) => {
    const baseClass =
      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden";
    const isActive = pathname === path || (path === "/" && pathname === null);

    return isActive
      ? `${baseClass} text-white bg-white/5 border-l-2 border-indigo-500`
      : `${baseClass} text-slate-400 hover:text-white hover:bg-white/5`;
  };

  return (
    <nav
      ref={menuRef}
      className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-md"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navbar main wrapper spacing handled by py-4 */}
        <div className="flex h-16 items-center justify-between py-4">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-transform active:scale-95"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-tr from-violet-500 to-indigo-500 text-white shadow-lg shadow-indigo-500/30">
              <Zap size={20} className="fill-current" />
            </div>
            <span className="bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-lg font-bold tracking-tight text-transparent">
              Startup<span className="text-indigo-400">Forge</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-4">
            {!isAuthenticated ? (
              <>
                {publicLinks.map((link) => {
                  const style = getLinkClass(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={style.linkElement}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                      <span className={style.underlineElement} />
                    </Link>
                  );
                })}
                <div className="h-5 w-px bg-white/10 mx-2" />

                {/* Sign In & Sign Up Buttons */}
                <button
                  onClick={handleFakeLogin}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-all duration-200 px-4 py-2 rounded-xl hover:bg-white/5"
                >
                  Sign In
                </button>
                <Link
                  href="/signup"
                  className="text-sm font-medium text-white bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-md shadow-indigo-500/20 px-4 py-2 rounded-xl active:scale-95 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                {authLinks.map((link) => {
                  const style = getLinkClass(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={style.linkElement}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                      <span className={style.underlineElement} />
                    </Link>
                  );
                })}
                <div className="h-5 w-px bg-white/10 mx-2" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all duration-300"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-colors duration-200 focus:outline-none"
            >
              {isOpen ? (
                <X
                  size={22}
                  className="rotate-0 transition-transform duration-300"
                />
              ) : (
                <Menu
                  size={22}
                  className="rotate-0 transition-transform duration-300"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modern Dropdown Animation Engine */}
      <div
        className={`md:hidden absolute top-16 left-0 right-0 z-40 transition-all duration-500 ease-in-out origin-top overflow-hidden border-t border-white/5 bg-slate-950/95 backdrop-blur-lg ${
          isOpen
            ? "max-h-87.5 opacity-100 scale-y-100 translate-y-0"
            : "max-h-0 opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="space-y-1.5 px-4 py-4">
          {!isAuthenticated ? (
            <>
              {publicLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={getMobileLinkClass(link.href)}
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}

              <div className="my-2 border-t border-white/5" />

              {/* Mobile View Buttons Layout */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleFakeLogin}
                  className="flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 active:scale-[0.98] transition-all"
                >
                  Sign In
                </button>
                <Link
                  href="/signup"
                  className="flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </>
          ) : (
            <>
              {authLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={getMobileLinkClass(link.href)}
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <div className="my-2 border-t border-white/5" />
              <button
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/10 transition-all"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
