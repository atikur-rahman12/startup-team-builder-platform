"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Zap,
  Briefcase,
  Layers,
  Globe,
  Mail,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { getAllStartups, updateStartupStatus } from "@/lib/api/startups/action";
import Image from "next/image";

export default function ManageStartups() {
  const { data: session } = useSession();

  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    const loadStartups = async () => {
      try {
        const data = await getAllStartups();
        setStartups(data || []);
      } catch (error) {
        console.error("Failed to load startups:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStartups();
  }, []);

  // Filter Data according to tabs (All, Pending, Approved, Rejected)
  // ব্যাকএন্ডে স্ট্যাটাস lowercase-এ থাকে ("pending", "approved", "rejected") তাই তুলনা করার সময় lowercase করা হয়েছে
  const filteredStartups = useMemo(() => {
    if (activeTab === "All") return startups;

    return startups.filter((startup) => {
      const currentStatus = startup.status?.toLowerCase() || "pending";
      return currentStatus === activeTab.toLowerCase();
    });
  }, [startups, activeTab]);

  const tabs = ["All", "Pending", "Approved", "Rejected"];

  // Handle Approve / Reject Actions
  const handleStatusUpdate = async (id, newStatus) => {
    const res = await updateStartupStatus(id, newStatus);

    if (res?.success) {
      setStartups((prev) =>
        prev.map((startup) =>
          startup._id === id ? { ...startup, status: newStatus } : startup,
        ),
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner text-indigo-500 animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full"></span>
          <p className="text-sm font-medium text-slate-400">
            Loading Startups...
          </p>
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
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/5 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                Startup Console
              </span>
              <div className="h-3 w-px bg-white/10 mx-1" />
              <span className="text-slate-400 flex items-center gap-1">
                StartupForge v2.0
                <Zap size={12} className="text-amber-400 fill-current" />
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Manage{" "}
              <span className="bg-linear-to-r from-violet-400 via-indigo-200 to-cyan-400 bg-clip-text text-transparent">
                Startups
              </span>
            </h1>

            <p className="text-slate-400 text-sm mt-2">
              Review, approve, or reject startup applications registered on your
              platform.
            </p>
          </div>

          {/* Tab Filter & Total Count Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-sm font-medium text-slate-400 bg-slate-900/40 border border-white/5 px-4 py-2 rounded-xl backdrop-blur-md">
              Filtered:{" "}
              <span className="text-cyan-400 font-bold">
                {filteredStartups.length}
              </span>{" "}
              startup(s)
            </div>

            {/* Navigation Tabs aligned right */}
            <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-white/5 backdrop-blur-md">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 rounded-lg ${
                    activeTab === tab
                      ? "text-white bg-white/10 shadow-inner"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    {tab === "All" && (
                      <Layers size={14} className="text-indigo-400" />
                    )}
                    {tab === "Pending" && (
                      <Clock size={14} className="text-amber-400" />
                    )}
                    {tab === "Approved" && (
                      <CheckCircle2 size={14} className="text-emerald-400" />
                    )}
                    {tab === "Rejected" && (
                      <XCircle size={14} className="text-rose-400" />
                    )}
                    {tab}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Startups Main List Wrapper */}
        <div className="space-y-4">
          {filteredStartups.length === 0 ? (
            <div className="bg-slate-900/20 border border-white/5 rounded-2xl p-8 backdrop-blur-xl text-center">
              <div className="flex flex-col items-center justify-center space-y-4 max-w-sm mx-auto">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-500 shadow-xl">
                  <Briefcase
                    size={32}
                    className="stroke-[1.5] text-indigo-400"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold tracking-tight text-slate-200">
                    No Startups found
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    There are currently no startup configurations matching this
                    status queue.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            filteredStartups.map((startup) => {
              // বার বার কন্ডিশন সহজ করার জন্য স্ট্যাটাস ভ্যারিয়েবল ডিফাইন করা হলো
              const currentStatus = startup.status?.toLowerCase() || "pending";

              return (
                <div
                  key={startup._id}
                  className="group relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-5 sm:p-6 bg-slate-900/40 border border-white/5 hover:border-white/10 rounded-2xl backdrop-blur-xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/5"
                >
                  {/* Left Side: Image + Details */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
                    {/* Startup Logo */}
                    <div className="relative w-14 h-14 rounded-xl border border-white/10 overflow-hidden flex-shrink-0 bg-linear-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center shadow-md">
                      {startup.logo ? (
                        <Image
                          src={startup.logo}
                          alt={startup.startupName || "Startup"}
                          height={100}
                          width={100}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <Layers className="text-indigo-400 w-6 h-6" />
                      )}
                    </div>

                    {/* Info Details Stack */}
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white tracking-wide truncate">
                          {startup.startupName}
                        </h3>
                        {activeTab === "All" && (
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${
                              currentStatus === "approved"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : currentStatus === "rejected"
                                  ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                  : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            }`}
                          >
                            {startup.status
                              ? startup.status.charAt(0).toUpperCase() +
                                startup.status.slice(1)
                              : "Pending"}
                          </span>
                        )}
                      </div>

                      {/* Tags & Email Layout Row */}
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        {/* Industry Tag */}
                        {startup.industry && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-medium">
                            <Globe size={12} />
                            {startup.industry}
                          </span>
                        )}

                        {/* Funding Stage Tag */}
                        {startup.fundingStage && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-white/5 font-medium">
                            {startup.fundingStage}
                          </span>
                        )}

                        {/* Email Identity */}
                        {startup.founderEmail && (
                          <span className="inline-flex items-center gap-1 px-1 py-1 text-slate-400 font-normal truncate max-w-[200px] sm:max-w-xs">
                            <Mail size={12} className="text-slate-500" />
                            {startup.founderEmail}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Quick Response Action Buttons */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end border-t lg:border-t-0 border-white/5 pt-4 lg:pt-0">
                    {currentStatus === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusUpdate(startup._id, "approved")
                          }
                          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-sm font-semibold transition-all active:scale-95 w-full sm:w-auto cursor-pointer"
                        >
                          <CheckCircle2 size={15} />
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(startup._id, "rejected")
                          }
                          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-sm font-semibold transition-all active:scale-95 w-full sm:w-auto cursor-pointer"
                        >
                          <XCircle size={15} />
                          Reject
                        </button>
                      </>
                    )}

                    {currentStatus === "approved" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(startup._id, "rejected")
                        }
                        className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/20 transition-all cursor-pointer"
                      >
                        Move to Reject
                      </button>
                    )}

                    {currentStatus === "rejected" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(startup._id, "approved")
                        }
                        className="px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/20 transition-all cursor-pointer"
                      >
                        Re-Approve
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
