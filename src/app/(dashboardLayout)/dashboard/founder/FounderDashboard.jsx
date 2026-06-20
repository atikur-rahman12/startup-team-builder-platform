"use client";

import React from "react";
import {
  FolderKanban,
  FileText,
  Users,
  ArrowUpRight,
  BarChart3,
  Crown,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import Link from "next/link";

const FounderDashboard = () => {
  const { data: session } = useSession();
  const isPremium = session?.user?.isPremium ?? false;

  const userName = session?.user?.name || "Founder";

  const stats = {
    totalOpportunities: 12,
    totalApplications: 48,
    acceptedMembers: 16,
  };

  const chartData = [
    { month: "Jan", Opportunities: 4, Applications: 10, Accepted: 2 },
    { month: "Feb", Opportunities: 6, Applications: 18, Accepted: 5 },
    { month: "Mar", Opportunities: 8, Applications: 25, Accepted: 9 },
    { month: "Apr", Opportunities: 9, Applications: 32, Accepted: 11 },
    { month: "May", Opportunities: 11, Applications: 42, Accepted: 14 },
    {
      month: "Jun",
      Opportunities: stats.totalOpportunities,
      Applications: stats.totalApplications,
      Accepted: stats.acceptedMembers,
    },
  ];

  const cardContent = [
    {
      title: "Total Opportunities",
      value: stats.totalOpportunities,
      icon: <FolderKanban size={22} className="text-indigo-400" />,
      badge: "+2 this week",
      bgGradient: "from-indigo-500/10 to-transparent",
      borderColor: "border-indigo-500/20",
    },
    {
      title: "Total Applications",
      value: stats.totalApplications,
      icon: <FileText size={22} className="text-violet-400" />,
      badge: "+14 new",
      bgGradient: "from-violet-500/10 to-transparent",
      borderColor: "border-violet-500/20",
    },
    {
      title: "Accepted Members",
      value: stats.acceptedMembers,
      icon: <Users size={22} className="text-emerald-400" />,
      badge: "Target: 25",
      bgGradient: "from-emerald-500/10 to-transparent",
      borderColor: "border-emerald-500/20",
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="relative p-6 sm:p-8 rounded-2xl bg-zinc-900/20 border border-zinc-800/40 backdrop-blur-md overflow-hidden">
        <div className="absolute top-0 right-0 w-62.5 h-62.5 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight flex items-center gap-2.5 min-h-10">
            Welcome Back, {userName}
            <span className="inline-block origin-[70%_70%] animate-wave text-2xl sm:text-3xl">
              👋
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl font-medium leading-relaxed mt-1">
            Here's what's happening with your startup incubator today. Monitor
            applications, update opportunities, and scale your ecosystem.
          </p>
        </div>
      </div>

      {isPremium ? (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Crown size={22} className="text-emerald-400" />
            </div>

            <div>
              <h4 className="text-lg font-bold text-emerald-400">
                ✨ Premium Account Active
              </h4>

              <p className="text-sm text-zinc-400 mt-2 leading-relaxed max-w-2xl">
                Enjoy unlimited opportunity postings, priority visibility,
                advanced recruitment tools, applicant insights, and premium
                founder features.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/founder/add-opportunity"
            className="shrink-0 w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          >
            Start Adding Opportunities
            <ArrowUpRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="relative p-6 rounded-2xl border border-indigo-500/30 bg-linear-to-r from-indigo-500/10 via-purple-500/5 to-transparent backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 overflow-hidden group">
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute right-20 bottom-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full pointer-events-none" />

          <div className="flex items-start gap-4 relative z-10">
            <div className="p-3 rounded-xl bg-linear-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-400 shrink-0 shadow-lg shadow-indigo-500/5 group-hover:scale-105 transition-transform duration-300">
              <Crown size={22} className="animate-pulse" />
            </div>

            <div>
              <h4 className="text-sm font-bold text-zinc-100 tracking-wide flex items-center gap-2">
                Unlock the Full Potential of Your Incubator
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider border border-indigo-500/30">
                  PRO PLAN
                </span>
              </h4>

              <p className="text-xs text-zinc-400 mt-1.5 max-w-2xl font-medium leading-relaxed">
                Upgrade to Premium today to get advanced applicant matching
                analytics, unlimited workspace opportunities, automated email
                follow-ups, and exclusive deep-dive insights to help scale your
                ecosystem efficiently.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/founder/premium-plan"
            className="relative z-10 shrink-0 w-full sm:w-auto px-5 py-3 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-zinc-50 text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20 transition-all duration-300 transform active:scale-95 group-hover:shadow-purple-500/20"
          >
            Upgrade to Premium
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </Link>
        </div>
      )}

      {/* 3. Overview Analytics Grid */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 px-1">
          Overview Analytics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cardContent.map((card, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl border ${card.borderColor} bg-zinc-900/20 bg-linear-to-br ${card.bgGradient} p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700/60 hover:bg-zinc-900/40 shadow-xs hover:shadow-indigo-500/5`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-400 tracking-wide">
                    {card.title}
                  </span>
                  <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 group-hover:border-zinc-700/80 transition-all duration-300">
                    {card.icon}
                  </div>
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-zinc-100 tracking-tight">
                    {card.value}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-800/40 flex items-center justify-between text-[11px] font-medium text-zinc-500">
                <span className="bg-zinc-900/60 border border-zinc-800/40 px-2 py-0.5 rounded-md text-zinc-400">
                  {card.badge}
                </span>
                <span className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 text-zinc-400 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  View Details <ArrowUpRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Performance Analytics Section */}
      <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-800/40 backdrop-blur-md relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
              <BarChart3 size={14} className="text-indigo-400" />
              Performance Analytics
            </div>
            <h3 className="text-base font-bold text-zinc-200 mt-1">
              Ecosystem Growth
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-indigo-500"></span>{" "}
              Opportunities
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-violet-500"></span>{" "}
              Applications
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500"></span>{" "}
              Accepted
            </div>
          </div>
        </div>

        {/* Chart Block */}
        <div className="h-72 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorOpp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#27272a"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke="#71717a"
                tickLine={false}
                axisLine={false}
              />
              <YAxis stroke="#71717a" tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#09090b",
                  borderColor: "#27272a",
                  borderRadius: "12px",
                  color: "#f4f4f5",
                }}
                itemStyle={{ fontSize: "12px" }}
              />
              <Area
                type="monotone"
                dataKey="Opportunities"
                stroke="#6366f1"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorOpp)"
              />
              <Area
                type="monotone"
                dataKey="Applications"
                stroke="#8b5cf6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorApp)"
              />
              <Area
                type="monotone"
                dataKey="Accepted"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorAcc)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FounderDashboard;
