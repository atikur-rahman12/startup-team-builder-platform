"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // Outside click detect korar jonno ref

  // Fake Authentication State
  const isAuthenticated = false;

  // Mobile menu-r baire click korle close hobar logical handler
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

  // Navigation Items Arrays
  const publicLinks = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "Browse Startups", href: "/startups", icon: <Layers size={18} /> },
    {
      name: "Browse Opportunities",
      href: "/opportunities",
      icon: <Briefcase size={18} />,
    },
  ];

  const authLinks = [
    { name: "Dashboard", href: "/dashboard", icon: <Compass size={18} /> },
    { name: "Profile", href: "/profile", icon: <User size={18} /> },
  ];

  // Active Link Styling Function
  const getLinkClass = (path) => {
    const baseClass =
      "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative group";
    const isActive = pathname === path || (path === "/" && pathname === null);

    return isActive
      ? `${baseClass} text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-md shadow-indigo-500/20`
      : `${baseClass} text-slate-300 hover:text-white hover:bg-white/5`;
  };

  return (
    // menuRef nav tag-e deya holo jate er bhetore click korle menu bondho na hoy
    <nav
      ref={menuRef}
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-transform active:scale-95"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-500 to-indigo-500 text-white shadow-lg shadow-indigo-500/30">
              <Zap size={22} className="fill-current" />
            </div>
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-xl font-bold tracking-tight text-transparent">
              Startup<span className="text-indigo-400">Forge</span>
            </span>
          </Link>

          {/* Desktop Navigation (Large Screens) */}
          <div className="hidden md:flex md:items-center md:gap-2">
            {!isAuthenticated ? (
              <>
                {publicLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={getLinkClass(link.href)}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
                <div className="h-5 w-[1px] bg-white/10 mx-2" />
                <Link
                  href="/login"
                  className="btn btn-ghost btn-sm text-sm font-medium text-white hover:bg-white/10 rounded-xl px-4"
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                {authLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={getLinkClass(link.href)}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
                <div className="h-5 w-[1px] bg-white/10 mx-2" />
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all duration-300"
                  onClick={() => console.log("Logout clicked")}
                >
                  <LogOut size={18} />
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
                  size={24}
                  className="rotate-0 transition-transform duration-300"
                />
              ) : (
                <Menu
                  size={24}
                  className="rotate-0 transition-transform duration-300"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modern Dropdown Animation Engine */}
      <div
        className={`md:hidden absolute top-16 left-0 right-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] origin-top overflow-hidden border-t border-white/5 bg-slate-950/95 backdrop-blur-lg ${
          isOpen
            ? "max-h-[300px] opacity-100 scale-y-100 translate-y-0"
            : "max-h-0 opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="space-y-2 px-4 py-3">
          {!isAuthenticated ? (
            <>
              {publicLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={getLinkClass(link.href)}
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <div className="my-2 border-t border-white/5" />
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </>
          ) : (
            <>
              {authLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={getLinkClass(link.href)}
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <div className="my-2 border-t border-white/5" />
              <button
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/10 transition-all"
                onClick={() => {
                  setIsOpen(false);
                  console.log("Logout clicked");
                }}
              >
                <LogOut size={18} />
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
