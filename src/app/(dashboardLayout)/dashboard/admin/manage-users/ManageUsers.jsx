"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ExternalLink,
  Clock,
  CheckCircle2,
  XCircle,
  Zap,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Crown,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { getAllUsers, toggleUserBlock } from "@/lib/api/startups/action";
import Image from "next/image";

export default function ManageUsers() {
  const { data: session } = useSession();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const loadUsers = async () => {
      const data = await getAllUsers();
      setUsers(data);
      setLoading(false);
    };

    loadUsers();
  }, []);

  // Filter Data
  const filteredUsers = useMemo(() => {
    const nonAdminUsers = users.filter(
      (user) => user.role?.toLowerCase() !== "admin",
    );

    if (activeTab === "All") return nonAdminUsers;

    if (activeTab === "Blocked") {
      return nonAdminUsers.filter((user) => user.status === "Blocked");
    }

    if (activeTab === "Unblocked") {
      return nonAdminUsers.filter(
        (user) =>
          user.status === "Active" ||
          user.status === "Unblocked" ||
          !user.status,
      );
    }

    return nonAdminUsers;
  }, [users, activeTab]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const tabs = ["All", "Blocked", "Unblocked"];

  const handleToggleBlock = async (id, isBlocked) => {
    const res = await toggleUserBlock(id, isBlocked);

    if (res.success) {
      setUsers((prev) =>
        prev.map((user) => (user._id === id ? { ...user, isBlocked } : user)),
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner text-indigo-500 animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full"></span>
          <p className="text-sm font-medium text-slate-400">Loading Users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-slate-950 py-12 px-4 sm:px-6 md:px-8 text-white">
      {/* Background Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/5 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                Manage Users
              </span>
              <div className="h-3 w-px bg-white/10 mx-1" />
              <span className="text-slate-400 flex items-center gap-1">
                StartupForge v2.0
                <Zap size={12} className="text-amber-400 fill-current" />
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              User{" "}
              <span className="bg-linear-to-r from-violet-400 via-indigo-200 to-cyan-400 bg-clip-text text-transparent">
                Management
              </span>
            </h1>

            <p className="text-slate-400 text-sm mt-2">
              You can see users data here and block or unblock user.
            </p>
          </div>

          {/* Tab Filter & Total Count Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-sm font-medium text-slate-400 bg-slate-900/40 border border-white/5 px-4 py-2 rounded-xl backdrop-blur-md">
              Total Submissions:{" "}
              <span className="text-cyan-400 font-bold">{users.length}</span>
            </div>

            {/* Navigation Tabs aligned right */}
            <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-white/5 backdrop-blur-md">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setCurrentPage(1);
                  }}
                  className={`relative px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 rounded-lg ${
                    activeTab === tab
                      ? "text-white bg-white/10 shadow-inner"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
          <div className="h-125 flex flex-col">
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-xs uppercase text-slate-400">
                    <th className="py-4">User Name</th>
                    <th className="py-4 text-center">Email</th>
                    <th className="py-4 text-center">Role</th>
                    <th className="py-4 text-center">Premium</th>
                    <th className="py-4 text-center">Status</th>
                    <th className="py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-16 text-center">
                        <div className="flex flex-col items-center justify-center space-y-4 max-w-sm mx-auto">
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-500 shadow-xl">
                            <Briefcase
                              size={32}
                              className="stroke-[1.5] text-indigo-400"
                            />
                          </div>

                          <div className="space-y-1">
                            <h3 className="text-lg font-bold tracking-tight text-slate-200">
                              No Users Found
                            </h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              There are currently no user profiles matching this
                              status queue.
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginatedUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        {/* USER IMAGE */}
                        <td className="py-4">
                          <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden flex items-center justify-center bg-linear-to-br from-violet-500 to-indigo-600 text-white font-bold text-sm shadow-md">
                            {user.image ? (
                              <Image
                                src={user.image}
                                alt={user.name || "User"}
                                height={85}
                                width={85}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              (() => {
                                const nameParts = (user.name || "")
                                  .trim()
                                  .split(" ");
                                const firstInitial =
                                  nameParts[0]?.charAt(0).toUpperCase() || "";
                                const lastInitial =
                                  nameParts.length > 1
                                    ? nameParts[nameParts.length - 1]
                                        .charAt(0)
                                        .toUpperCase()
                                    : "";

                                return `${firstInitial}${lastInitial}`;
                              })()
                            )}
                          </div>
                        </td>

                        {/* EMAIL */}
                        <td className="py-4 text-center text-slate-300">
                          {user.email}
                        </td>

                        {/* ROLE */}
                        <td className="py-4 text-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linear-to-r from-violet-500/20 via-fuchsia-500/20 to-purple-500/20 text-violet-200 text-xs font-semibold capitalize shadow-lg shadow-violet-500/20">
                            {user.role}
                          </span>
                        </td>

                        {/* PREMIUM */}
                        <td className="py-4 text-center">
                          {user.isPremium ? (
                            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
                              Premium
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full bg-slate-700/30 text-slate-300 text-xs font-bold border border-white/5">
                              Free
                            </span>
                          )}
                        </td>

                        {/* STATUS */}
                        <td className="py-4 text-center">
                          {user.isBlocked ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">
                              <XCircle size={13} />
                              Blocked
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                              <CheckCircle2 size={13} />
                              Active
                            </span>
                          )}
                        </td>

                        {/* ACTION BUTTONS */}
                        <td className="py-4 text-center">
                          {user.isBlocked ? (
                            <button
                              onClick={() => handleToggleBlock(user._id, false)}
                              className="px-4 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-semibold transition-all active:scale-95 cursor-pointer"
                            >
                              Unblock
                            </button>
                          ) : (
                            <button
                              onClick={() => handleToggleBlock(user._id, true)}
                              className="px-4 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold transition-all active:scale-95 cursor-pointer"
                            >
                              Block
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {filteredUsers.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto pt-6 border-t border-white/5">
                <div className="text-sm text-slate-400">
                  Showing{" "}
                  <span className="text-white font-semibold">
                    {startIndex + 1}
                  </span>{" "}
                  -{" "}
                  <span className="text-white font-semibold">
                    {Math.min(startIndex + itemsPerPage, filteredUsers.length)}
                  </span>{" "}
                  of{" "}
                  <span className="text-cyan-400 font-bold">
                    {filteredUsers.length}
                  </span>{" "}
                  users
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-xl border border-white/10 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        currentPage === i + 1
                          ? "bg-white/10 text-white shadow-inner"
                          : "bg-slate-800/40 text-slate-400 hover:bg-slate-700/50 hover:text-white"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-xl border border-white/10 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
