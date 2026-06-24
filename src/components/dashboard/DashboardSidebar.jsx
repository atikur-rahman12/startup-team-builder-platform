"use client";

import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
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
  User,
  MessageSquare,
} from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import Image from "next/image";
import {
  getNotifications,
  markNotificationRead,
} from "@/lib/api/startups/action";

const DashboardSidebar = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { data: session } = useSession();

  // ড্রপডাউন এর বাইরে ক্লিক ডিটেক্ট করার জন্য Ref
  const notificationRef = useRef(null);

  const currentUser = session?.user;

  const getInitials = (name = "") => {
    const parts = name.trim().split(" ");

    const first = parts[0]?.[0] || "";
    const second = parts[1]?.[0] || "";

    return (first + second).toUpperCase() || "U";
  };

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
      href: "/dashboard/admin/transactions",
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

  useEffect(() => {
    const loadNotifications = async () => {
      if (!currentUser?.email) return;

      const data = await getNotifications(currentUser.email);
      setNotifications(data);
    };

    loadNotifications();

    const interval = setInterval(loadNotifications, 10000);

    return () => clearInterval(interval);
  }, [currentUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // নোটিফিকেশন সর্টিং লজিক: Unread নোটিফিকেশন উপরে, এবং নতুনগুলো টাইমস্ট্যাম্প অনুযায়ী উপরে থাকবে
  const sortedNotifications = [...notifications].sort((a, b) => {
    if (a.isRead !== b.isRead) {
      return a.isRead ? 1 : -1;
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500/30 selection:text-white">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col min-h-screen relative overflow-hidden">
        {/* Top Navbar Section */}
        <nav className="navbar w-full bg-slate-950/40 backdrop-blur-xl border-b border-white/5 px-6 sticky top-0 z-40 justify-between transition-all duration-300">
          <div className="flex items-center gap-4">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-ghost btn-square text-slate-400 hover:text-white hover:bg-white/5 rounded-xl lg:hidden"
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
              <span className="text-xs font-medium text-slate-500 tracking-wider uppercase">
                Workspace
              </span>
              <span className="text-sm font-semibold text-slate-200">
                {role
                  ? `${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard`
                  : "Dashboard"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Home Icon with Tooltip */}
            <div className="relative group">
              <Link
                href="/"
                className="p-2 flex text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-xl transition-all duration-200"
              >
                <Home size={18} />
              </Link>
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 text-xs font-medium text-slate-200 bg-slate-900 border border-white/10 rounded-lg shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 pointer-events-none whitespace-nowrap z-50">
                Home
              </span>
            </div>

            {/* Bell Icon Wrapper */}
            <div className="relative" ref={notificationRef}>
              <div className="relative group">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 flex text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-xl transition-all duration-200 relative cursor-pointer"
                >
                  <Bell size={18} />

                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-0.5 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-linear-to-tr from-indigo-500 to-violet-500 text-white text-[9px] font-bold items-center justify-center ring-2 ring-slate-950 shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                        {unreadCount}
                      </span>
                    </span>
                  )}
                </button>

                {/* Tooltip (Only visible when dropdown is closed) */}
                {!showNotifications && (
                  <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 text-xs font-medium text-slate-200 bg-slate-900 border border-white/10 rounded-lg shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 pointer-events-none whitespace-nowrap z-50">
                    Notifications
                  </span>
                )}
              </div>

              {/* Dropdown - Smooth Open & Close Transition Implementation */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 mt-3 w-96 rounded-2xl border border-white/10 bg-slate-900 shadow-2xl z-50 overflow-hidden transform transition-all duration-300 ease-out origin-top ${
                  showNotifications
                    ? "opacity-100 scale-100 translate-y-0 visible"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none invisible"
                }`}
              >
                <div className="px-4 py-3 border-b border-white/10 font-semibold">
                  Notifications
                </div>

                <div
                  className="overflow-y-auto overscroll-contain"
                  style={{
                    height: "480px",
                    scrollBehavior: "smooth",
                  }}
                  onWheel={(e) => e.stopPropagation()}
                >
                  {sortedNotifications.length === 0 ? (
                    <div className="p-4 text-sm text-slate-400">
                      No notifications
                    </div>
                  ) : (
                    sortedNotifications.map((item) => (
                      <button
                        key={item._id}
                        onClick={async () => {
                          if (!item.isRead) {
                            await markNotificationRead(item._id);

                            setNotifications((prev) =>
                              prev.map((n) =>
                                n._id === item._id ? { ...n, isRead: true } : n,
                              ),
                            );
                          }

                          setShowNotifications(false);

                          const titleLower = item.title?.toLowerCase() || "";
                          const messageLower =
                            item.message?.toLowerCase() || "";

                          if (
                            titleLower.includes("accepted") ||
                            messageLower.includes("accepted")
                          ) {
                            router.push(
                              "/dashboard/collaborator/my-applications?status=accepted",
                            );
                          } else if (
                            titleLower.includes("rejected") ||
                            messageLower.includes("rejected")
                          ) {
                            router.push(
                              "/dashboard/collaborator/my-applications?status=rejected",
                            );
                          } else if (item.link) {
                            router.push(item.link);
                          } else if (item.href) {
                            router.push(item.href);
                          }
                        }}
                        className={`w-full text-left p-4 min-h-21.25 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${
                          !item.isRead ? "bg-indigo-500/5" : ""
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <p className="font-semibold text-sm flex items-center text-white">
                            <span className="p-2 shrink-0">
                              <MessageSquare
                                size={14}
                                className="text-cyan-400"
                              />
                            </span>
                            {item.title}
                          </p>

                          {!item.isRead && (
                            <span className="w-2 h-2 rounded-full bg-indigo-500" />
                          )}
                        </div>

                        <p className="text-xs text-slate-400 mt-1">
                          {item.message}
                        </p>

                        <p className="text-[10px] text-slate-500 mt-2">
                          {new Date(item.createdAt).toLocaleString()}
                        </p>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* User Icon with Tooltip */}
            <div className="relative group">
              <Link
                href="/user-profile"
                className="p-2 flex text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-xl transition-all duration-200"
              >
                <User size={18} />
              </Link>
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 text-xs font-medium text-slate-200 bg-slate-900 border border-white/10 rounded-lg shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 pointer-events-none whitespace-nowrap z-50">
                Profile
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold tracking-widest uppercase bg-slate-900/60 border border-white/5 px-3 py-1.5 rounded-full shadow-inner">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {currentUser?.role
                ? `${currentUser.role} Panel`
                : "Loading Panel..."}
            </div>
          </div>
        </nav>

        {/* Core Layout Main View Render */}
        <div className="p-4 sm:p-6 lg:p-8 grow relative bg-[radial-linear(ellipse_at_top,var(--tw-linear-stops))] from-slate-900/40 via-slate-950 to-slate-950">
          <div className="absolute top-[-10%] right-[-5%] w-100 h-100 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[5%] left-[-5%] w-75 h-75 bg-cyan-600/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 w-full h-full">{children}</div>
        </div>
      </div>

      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <aside className="w-72 min-h-full bg-slate-900/40 border-r border-white/5 backdrop-blur-xl flex flex-col p-5 justify-between relative overflow-hidden">
          <div className="absolute top-[-15%] left-[-15%] w-55 h-55 bg-linear-to-br from-indigo-500/10 to-cyan-500/5 blur-[80px] rounded-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between px-3 mb-5 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 border border-white/10 rounded-xl shadow-xs">
                  <Sparkles
                    size={16}
                    className="text-indigo-400 animate-pulse"
                  />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-white tracking-tight">
                    StartupForge
                  </h2>
                  <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase block mt-0.5">
                    Incubator Suite
                  </span>
                </div>
              </div>
            </div>

            <div className="px-3 mb-5 pointer-events-none relative z-10">
              <div className="h-px w-full bg-linear-to-r from-white/0 via-white/10 to-white/0" />
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
                      className={`group flex items-center gap-3.5 px-4 h-11 rounded-xl font-medium text-[13.5px] transition-all duration-300 relative overflow-hidden ${
                        isActive
                          ? "bg-white/10 text-white shadow-inner"
                          : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-3 bottom-3 w-1 bg-linear-to-b from-indigo-400 to-cyan-400 rounded-r-full" />
                      )}

                      <span
                        className={`transition-colors duration-300 ${
                          isActive
                            ? "text-indigo-400"
                            : "text-slate-500 group-hover:text-slate-300"
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
            <div className="h-px w-full bg-linear-to-r from-transparent via-white/5 to-transparent" />

            {currentUser ? (
              <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-900/40 border border-white/5 backdrop-blur-md animate-fadeIn">
                <div className="relative shrink-0">
                  {currentUser?.image ? (
                    <Image
                      src={currentUser.image}
                      alt={currentUser.name || "User"}
                      height={36}
                      width={36}
                      className="h-9 w-9 rounded-xl border border-white/10 object-cover shadow-sm"
                      unoptimized
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 text-xs font-bold uppercase">
                      {getInitials(currentUser?.name)}
                    </div>
                  )}
                  <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-500 border-2 border-slate-950"></span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-slate-200 truncate">
                      {currentUser.name}
                    </p>
                    {currentUser.role && (
                      <span className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10 shrink-0">
                        {currentUser.role}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 truncate font-medium mt-0.5">
                    {currentUser.email}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/5 animate-pulse">
                <div className="h-9 w-9 bg-white/10 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="h-3 bg-white/10 rounded-sm w-1/2" />
                    <div className="h-3.5 bg-white/10 rounded-sm w-10" />
                  </div>
                  <div className="h-2.5 bg-white/10 rounded-sm w-4/5" />
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
