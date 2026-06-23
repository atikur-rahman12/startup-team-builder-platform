"use client";

import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Rocket,
  PlusCircle,
  FolderKanban,
  FileText,
  Sparkles,
  LogOut,
  Bell,
  Home,
  UserCircle,
  Users,
  CreditCard,
} from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import Image from "next/image";

const DashboardSidebar = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const currentUser = session?.user;

  const founderMenu = [
    {
      name: "Dashboard Overview",
      href: "/dashboard/founder",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "My Startup",
      href: "/dashboard/founder/startup",
      icon: <Rocket size={18} />,
    },
    {
      name: "Add Opportunity",
      href: "/dashboard/founder/add-opportunity",
      icon: <PlusCircle size={18} />,
    },
    {
      name: "Manage Opportunities",
      href: "/dashboard/founder/manage-opportunities",
      icon: <FolderKanban size={18} />,
    },
    {
      name: "Applications",
      href: "/dashboard/founder/applications",
      icon: <FileText size={18} />,
    },
  ];

  const collaboratorMenu = [
    {
      name: "Overview",
      icon: <LayoutDashboard size={18} />,
      href: "/dashboard/collaborator",
    },
    {
      name: "My Applications",
      icon: <FileText size={18} />,
      href: "/dashboard/collaborator/my-applications",
    },
    {
      name: "Profile",
      icon: <UserCircle size={18} />,
      href: "/dashboard/collaborator/profile",
    },
  ];

  const adminMenu = [
    {
      name: "Overview",
      icon: <LayoutDashboard size={18} />,
      href: "/dashboard/admin",
    },
    {
      name: "Manage Users",
      icon: <Users size={18} />,
      href: "/dashboard/admin/manage-users",
    },
    {
      name: "Manage Startups",
      icon: <Rocket size={18} />,
      href: "/dashboard/admin/manage-startups",
    },
    {
      name: "Transactions",
      icon: <CreditCard size={18} />,
      href: "/dashboard/transactions",
    },
  ];

  const role = session?.user?.role;

  const navContents =
    role === "founder"
      ? founderMenu
      : role === "collaborator"
        ? collaboratorMenu
        : role === "admin"
          ? adminMenu
          : [];

  const handleLogout = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/signin");
          },
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-[#09090b] text-zinc-100 antialiased selection:bg-indigo-500/30 selection:text-white">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col min-h-screen relative overflow-hidden">
        {/* Top Navbar Section */}
        <nav className="navbar w-full bg-[#09090b]/40 backdrop-blur-xl border-b border-zinc-800/40 px-6 sticky top-0 z-40 justify-between transition-all duration-300">
          <div className="flex items-center gap-4">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-ghost btn-square text-zinc-400 hover:text-white hover:bg-zinc-800/40 rounded-xl lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="inline-block size-5"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>

            <div className="hidden lg:flex flex-col">
              <span className="text-xs font-medium text-zinc-500 tracking-wider uppercase">
                Workspace
              </span>
              <span className="text-sm font-semibold text-zinc-200">
                {role
                  ? `${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard`
                  : "Dashboard"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 border border-transparent hover:border-zinc-800/40 rounded-xl transition-all duration-200"
              title="Go to Homepage"
            >
              <Home size={18} />
            </Link>

            <button
              className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 border border-transparent hover:border-zinc-800/40 rounded-xl transition-all duration-200 relative cursor-pointer"
              title="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-indigo-500 ring-4 ring-[#09090b]"></span>
            </button>

            <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold tracking-widest uppercase bg-zinc-900/60 border border-zinc-800/50 px-3 py-1.5 rounded-full shadow-inner">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {currentUser?.role
                ? `${currentUser.role} Panel`
                : "Loading Panel..."}
            </div>
          </div>
        </nav>

        {/* Core Layout Main View Render */}
        <div className="p-4 sm:p-6 lg:p-8 grow relative bg-[radial-linear(ellipse_at_top,var(--tw-linear-stops))] from-zinc-900/40 via-[#09090b] to-[#09090b]">
          <div className="absolute top-[-10%] right-[-5%] w-100 h-100 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[5%] left-[-5%] w-75 h-75 bg-violet-600/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 w-full h-full">{children}</div>
        </div>
      </div>

      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <aside className="w-72 min-h-full bg-[#0d0d0e] border-r border-zinc-800/40 flex flex-col p-5 justify-between relative overflow-hidden">
          <div className="absolute top-[-15%] left-[-15%] w-55 h-55 bg-linear-to-br from-indigo-500/10 to-violet-500/5 blur-[80px] rounded-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between px-3 mb-5 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-linear-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 rounded-xl shadow-xs">
                  <Sparkles
                    size={16}
                    className="text-indigo-400 animate-pulse"
                  />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-zinc-100 tracking-tight">
                    StartupForge
                  </h2>
                  <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase block mt-0.5">
                    Incubator Suite
                  </span>
                </div>
              </div>
            </div>

            <div className="px-3 mb-5 pointer-events-none relative z-10">
              <div className="h-px w-full bg-linear-to-r from-zinc-800/20 via-zinc-800/80 to-zinc-800/20" />
            </div>

            <ul className="menu p-0 w-full space-y-1 relative z-10">
              {navContents?.map((item, index) => {
                const isActive =
                  index === 0
                    ? pathname === item.href
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`group flex items-center gap-3.5 px-4 h-11 rounded-xl font-medium text-[13.5px] transition-all duration-300 relative overflow-hidden border ${
                        isActive
                          ? "bg-linear-to-r from-indigo-600/15 to-violet-600/5 border-indigo-500/30 text-white shadow-xs"
                          : "text-zinc-400 border-transparent hover:bg-zinc-800/30 hover:border-zinc-800/40 hover:text-zinc-200"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-3 bottom-3 w-1 bg-linear-to-b from-indigo-400 to-violet-500 rounded-r-full" />
                      )}

                      <span
                        className={`transition-colors duration-300 ${
                          isActive
                            ? "text-indigo-400"
                            : "text-zinc-500 group-hover:text-zinc-300"
                        }`}
                      >
                        {item.icon}
                      </span>

                      <span className="tracking-wide">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative z-10 mt-auto pt-4 space-y-3">
            <div className="h-px w-full bg-linear-to-r from-transparent via-zinc-800/60 to-transparent" />

            {currentUser ? (
              <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-zinc-900/30 border border-zinc-800/20 animate-fadeIn">
                <div className="relative shrink-0">
                  <Image
                    src={currentUser.image || "/avatar-fallback.png"}
                    alt={currentUser.name || "User"}
                    height={36}
                    width={36}
                    className="h-9 w-9 rounded-xl border border-zinc-700/50 object-cover shadow-sm"
                    unoptimized
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-500 border-2 border-[#0d0d0e]"></span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-zinc-200 truncate">
                      {currentUser.name}
                    </p>
                    {currentUser.role && (
                      <span className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                        {currentUser.role}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-zinc-500 truncate font-medium mt-0.5">
                    {currentUser.email}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-zinc-900/10 border border-zinc-800/10 animate-pulse">
                <div className="h-9 w-9 bg-zinc-800 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="h-3 bg-zinc-800 rounded-sm w-1/2" />
                    <div className="h-3.5 bg-zinc-800 rounded-sm w-10" />
                  </div>
                  <div className="h-2.5 bg-zinc-800 rounded-sm w-4/5" />
                </div>
              </div>
            )}

            <button
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/10 transition-all cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardSidebar;
