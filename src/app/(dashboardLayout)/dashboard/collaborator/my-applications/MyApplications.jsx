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
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { getUserApplications } from "@/lib/api/startups/action";
import { useSearchParams } from "next/navigation"; // Hook added for parameter routing checks

export default function MyApplications() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  const [allApplications, setAllApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sync tab with URL search parameter dynamically on loading or param update
  useEffect(() => {
    const statusParam = searchParams.get("status");
    const allowedTabs = ["All", "Accepted", "Pending", "Rejected"];
    if (statusParam && allowedTabs.includes(statusParam)) {
      setActiveTab(statusParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const loadApplications = async () => {
      if (!session?.user?.email) return;

      const data = await getUserApplications(session.user.email);
      setAllApplications(data);
      setLoading(false);
    };

    loadApplications();
  }, [session]);

  // Filter Data
  const filteredApplications = useMemo(() => {
    if (activeTab === "All") return allApplications;
    const statusMap = {
      Accepted: "accepted",
      Rejected: "rejected",
      Pending: "pending",
    };
    return allApplications.filter((app) => app.status === statusMap[activeTab]);
  }, [allApplications, activeTab]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplications = filteredApplications.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Stats calculation
  const stats = {
    total: allApplications.length,
    accepted: allApplications.filter((a) => a.status === "accepted").length,
    rejected: allApplications.filter((a) => a.status === "rejected").length,
    pending: allApplications.filter((a) => a.status === "pending").length,
  };

  const ApplicationStats = [
    { label: "Total Applications", value: stats.total, color: "text-white" },
    {
      label: "Accepted",
      value: stats.accepted,
      color: "text-emerald-400",
    },
    { label: "Pending", value: stats.pending, color: "text-amber-400" },
    { label: "Rejected", value: stats.rejected, color: "text-red-400" },
  ];

  const tabs = ["All", "Accepted", "Pending", "Rejected"];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner text-indigo-500 animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full"></span>
          <p className="text-sm font-medium text-slate-400">
            Loading Applications...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-slate-950 py-6 text-white">
      {/* Background Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/5 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
              <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                Application Tracker
              </span>
              <div className="h-3 w-px bg-white/10 mx-1" />
              <span className="text-slate-400 flex items-center gap-1">
                StartupForge v2.0
                <Zap size={12} className="text-amber-400 fill-current" />
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              My{" "}
              <span className="bg-linear-to-r from-violet-400 via-indigo-200 to-cyan-400 bg-clip-text text-transparent">
                Applications
              </span>
            </h1>

            <p className="text-slate-400 text-sm mt-2">
              Track your submitted applications.
            </p>
          </div>

          {/* Tab Filter & Total Count Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-sm font-medium text-slate-400 bg-slate-900/40 border border-white/5 px-4 py-2 rounded-xl backdrop-blur-md">
              Total Submissions:{" "}
              <span className="text-cyan-400 font-bold">
                {allApplications.length}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ApplicationStats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-slate-900/40 border border-white/5 p-5 rounded-2xl backdrop-blur-xl hover:border-white/10 transition-all"
            >
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">
                {stat.label}
              </p>
              <h3 className={`text-3xl font-extrabold ${stat.color}`}>
                {stat.value}
              </h3>
            </div>
          ))}
        </div>

        {/* Navigation Tabs aligned right */}
        <div className="flex items-center gap-1 p-1 rounded-xl border border-white/5 backdrop-blur-md">
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

        {/* Table Container */}
        <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
          <div className="h-125 flex flex-col">
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-xs uppercase text-slate-400">
                    <th className="py-4 flex">Opportunity</th>
                    <th className="py-4 text-center">Startup</th>
                    <th className="py-4 text-center">Applied</th>
                    <th className="py-4 text-center">Portfolio</th>
                    <th className="py-4 text-center">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">
                  {filteredApplications.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-16 text-center">
                        <div className="flex flex-col items-center justify-center space-y-4 max-w-sm mx-auto">
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-500 shadow-xl">
                            <Briefcase
                              size={32}
                              className="stroke-[1.5] text-indigo-400"
                            />
                          </div>

                          <div className="space-y-1">
                            <h3 className="text-lg font-bold tracking-tight text-slate-200">
                              No Applications Found
                            </h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              You haven't submitted any applications yet.
                              Explore new opportunities to get started.
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginatedApplications.map((app) => (
                      <tr
                        key={app._id}
                        className="hover:bg-white/2 transition-colors"
                      >
                        <td className="py-4 font-bold text-slate-200">
                          {app.roleTitle}
                        </td>

                        <td className="py-4 text-center text-slate-300">
                          {app.startupName}
                        </td>

                        <td className="py-4 text-center text-slate-300">
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </td>

                        <td className="py-4 text-center">
                          <a
                            href={app.portfolioLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-cyan-400 hover:text-indigo-300 font-bold"
                          >
                            <ExternalLink size={14} />
                            View
                          </a>
                        </td>

                        <td className="py-4 text-center">
                          {app.status === "pending" && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
                              <Clock size={13} />
                              Pending
                            </span>
                          )}

                          {app.status === "accepted" && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                              <CheckCircle2 size={13} />
                              Accepted
                            </span>
                          )}

                          {app.status === "rejected" && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">
                              <XCircle size={13} />
                              Rejected
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {filteredApplications.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto pt-6 border-t border-white/5">
                <div className="text-sm text-slate-400">
                  Showing{" "}
                  <span className="text-white font-semibold">
                    {startIndex + 1}
                  </span>{" "}
                  -{" "}
                  <span className="text-white font-semibold">
                    {Math.min(
                      startIndex + itemsPerPage,
                      filteredApplications.length,
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="text-cyan-400 font-bold">
                    {filteredApplications.length}
                  </span>{" "}
                  applications
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
