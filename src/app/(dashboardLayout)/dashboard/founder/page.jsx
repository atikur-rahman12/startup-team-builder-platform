"use client";

import React from "react";
import {
  FolderKanban,
  FileText,
  Users,
  ArrowUpRight,
  BarChart3,
  Sparkles,
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

const FounderDashboardPage = () => {
  const { data: session } = useSession();

  const userName = session?.user?.name || "Founder";

  // প্ল্যান লিমিট লজিক (স্ট্যাটিক)
  // লিমিট শেষ হলে এটি true করে দিন, তাহলেই প্রিমিয়াম ব্যানারটি শো করবে
  const isLimitReached = false;

  // আপনার স্ট্যাটিক ডেটা
  const stats = {
    totalOpportunities: 12,
    totalApplications: 48,
    acceptedMembers: 16,
  };

  // চার্টের জন্য স্ট্যাটিক মান্থলি ডেটা
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
      {/* 1. Header / Greetings Section */}
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

      {/* 2. Premium Upgrade Alert (Stats কার্ডের ঠিক ওপরে) */}
      {isLimitReached && (
        <div className="relative p-5 rounded-2xl border border-amber-500/20 bg-linear-to-r from-amber-500/10 via-amber-500/5 to-transparent backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden group animate-pulse-slow">
          {/* গ্লো ইফেক্ট ব্যাকগ্রাউন্ড */}
          <div className="absolute -left-10 -top-10 w-32 h-32 bg-amber-500/10 blur-2xl rounded-full pointer-events-none" />

          <div className="flex items-start gap-3.5 relative z-10">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 shadow-lg shadow-amber-500/5">
              <Sparkles size={20} className="animate-spin-slow" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-100 tracking-wide flex items-center gap-1.5">
                Usage Limit Reached
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                  Action Required
                </span>
              </h4>
              <p className="text-xs text-zinc-400 mt-1 max-w-2xl font-medium leading-relaxed">
                You've reached the maximum limit of workspace metrics allowed on
                your current free tier. Upgrade your plan to unlock unlimited
                opportunities, detailed applicant insights, and robust tracking
                tools.
              </p>
            </div>
          </div>

          <button className="relative z-10 shrink-0 w-full sm:w-auto px-4 py-2.5 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all duration-300 transform active:scale-95 group-hover:scale-[1.02]">
            Upgrade Plan
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </button>
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

export default FounderDashboardPage;
