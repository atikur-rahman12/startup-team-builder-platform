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
  ChevronDown,
} from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const userMenuRef = useRef(null);
  const { data: session, isPending } = useSession();

  const isAuthenticated = !!session;
  const currentUser = session?.user;

  const getInitials = (name) => {
    if (!name) return "?";

    const words = name.trim().split(" ");

    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    if (isOpen || isUserDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, isUserDropdownOpen]);

  const handleLogout = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            setIsOpen(false);
            setIsUserDropdownOpen(false);
            console.log("User successfully logged out.");
            router.push("/");
          },
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const dashboardHref =
    currentUser?.role === "collaborator"
      ? "/dashboard/collaborator"
      : "/dashboard/founder";

  const publicLinks = [
    { name: "Home", href: "/", icon: <Home size={16} /> },
    {
      name: "Browse Startups",
      href: "/browse-startups",
      icon: <Layers size={16} />,
    },
    {
      name: "Browse Opportunities",
      href: "/browse-opportunities",
      icon: <Briefcase size={16} />,
    },
  ];

  const authLinks = [
    { name: "Dashboard", href: dashboardHref, icon: <Compass size={16} /> },
    { name: "Profile", href: "/profile", icon: <User size={16} /> },
  ];

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

  const getDropdownLinkClass = (path) => {
    const baseClass =
      "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative overflow-hidden group";
    const isActive = pathname === path;

    return isActive
      ? `${baseClass} text-white bg-white/5 border-l-2 border-indigo-500 pl-2.5`
      : `${baseClass} text-slate-400 hover:text-white hover:bg-white/5`;
  };

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
        <div className="flex h-16 items-center justify-between py-4">
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

          <div className="hidden md:flex md:items-center md:gap-4">
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

            {!isAuthenticated ? (
              <>
                <Link
                  href="/signin"
                  className="text-sm font-medium text-slate-300 hover:text-white transition-all duration-200 px-4 py-2 rounded-xl hover:bg-white/5"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-medium text-white bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-md shadow-indigo-500/20 px-4 py-2 rounded-xl active:scale-95 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-white/5 border border-white/5 hover:border-white/10 transition-all active:scale-98"
                >
                  {currentUser?.image ? (
                    <Image
                      src={currentUser.image}
                      alt={currentUser.name}
                      height={80}
                      width={80}
                      className="h-7 w-7 rounded-full border border-white/10 object-cover"
                    />
                  ) : (
                    <div className="h-7 w-7 rounded-full bg-linear-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white border border-white/10">
                      {getInitials(currentUser?.name)}
                    </div>
                  )}
                  <span className="text-sm font-medium text-slate-200 hidden lg:inline-block">
                    {currentUser?.name}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform duration-300 ${isUserDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl border border-white/10 bg-slate-950 p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-3 py-2 border-b border-white/5 mb-1.5">
                      <p className="text-sm font-semibold text-white truncate">
                        {currentUser?.name}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {currentUser?.email}
                      </p>
                    </div>

                    <div className="space-y-0.5 border-b border-white/5 pb-1.5 mb-1.5">
                      {authLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsUserDropdownOpen(false)}
                          className={getDropdownLinkClass(link.href)}
                        >
                          {link.icon}
                          <span>{link.name}</span>
                        </Link>
                      ))}
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all duration-200"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-colors duration-200 focus:outline-none"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-16 left-0 right-0 z-40 transition-all duration-500 ease-in-out origin-top overflow-hidden border-t border-white/5 bg-slate-950/95 backdrop-blur-lg ${
          isOpen
            ? "max-h-137.5 opacity-100 scale-y-100 translate-y-0"
            : "max-h-0 opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="space-y-1.5 px-4 py-4">
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

          {!isAuthenticated ? (
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/signin"
                className="flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 active:scale-[0.98] transition-all"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 px-4 py-2.5 mb-2 rounded-xl bg-white/5 border border-white/5">
                {currentUser?.image ? (
                  <Image
                    src={currentUser.image}
                    alt={currentUser.name}
                    height={80}
                    width={80}
                    className="h-9 w-9 rounded-full border border-white/10 object-cover"
                  />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-linear-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-sm font-bold text-white border border-white/10">
                    {getInitials(currentUser?.name)}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">
                    {currentUser?.name}
                  </span>
                  <span className="text-xs text-slate-400">
                    {currentUser?.email}
                  </span>
                </div>
              </div>

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
