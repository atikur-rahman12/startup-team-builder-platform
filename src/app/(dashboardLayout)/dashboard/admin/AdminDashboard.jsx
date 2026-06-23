"use client";

import StatsPieChart from "@/components/StatsPieChart";
import {
  Users,
  Rocket,
  Briefcase,
  DollarSign,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getAdminStats } from "@/lib/api/startups/action";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const loadStats = async () => {
      const data = await getAdminStats();

      console.log("Admin Stats:", data);

      if (!data) return;

      setStats([
        {
          title: "Total Users",
          value: data.totalUsers.toLocaleString(),
          icon: Users,
          color: "bg-indigo-600",
          bgGradient: "from-indigo-500/10 to-transparent",
          borderColor: "border-indigo-500/20",
        },
        {
          title: "Total Startups",
          value: data.totalStartups.toLocaleString(),
          icon: Rocket,
          color: "bg-violet-600",
          bgGradient: "from-violet-500/10 to-transparent",
          borderColor: "border-violet-500/20",
        },
        {
          title: "Total Opportunities",
          value: data.totalOpportunities.toLocaleString(),
          icon: Briefcase,
          color: "bg-indigo-600",
          bgGradient: "from-indigo-500/10 to-transparent",
          borderColor: "border-indigo-500/20",
        },
        {
          title: "Total Revenue",
          value: `$${data.totalRevenue.toLocaleString()}`,
          icon: DollarSign,
          color: "bg-emerald-600",
          bgGradient: "from-violet-500/10 to-transparent",
          borderColor: "border-violet-500/20",
        },
      ]);
    };

    loadStats();
  }, []);

  return (
    <div className="min-h-screen  text-white p-6 md:p-10">
      <div>
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
          <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
            Admin Dashboard
          </span>
          <div className="h-3 w-px bg-white/10 mx-1" />
          <span className="text-slate-400 flex items-center gap-1">
            StartupForge v2.0
            <Zap size={12} className="text-amber-400 fill-current" />
          </span>
        </div>

        <h1 className="text-4xl font-extrabold text-white">
          Dashboard{" "}
          <span className="bg-linear-to-r from-violet-400 via-indigo-200 to-cyan-400 bg-clip-text text-transparent">
            Overview
          </span>
        </h1>

        <p className="text-slate-400 mt-2 mb-4">
          Monitor platform performance and growth .
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item, idx) => {
          const Icon = item.icon;

          return (
            <div
              key={idx}
              className={`group relative rounded-2xl border ${item.borderColor} bg-zinc-900/20 bg-linear-to-br ${item.bgGradient} p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700/60 hover:bg-zinc-900/40 shadow-xs hover:shadow-indigo-500/5`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{item.title}</p>
                  <h2 className="text-2xl font-bold mt-2">{item.value}</h2>
                </div>

                <div className={`p-3 rounded-xl ${item.color}`}>
                  <Icon className="text-white" size={22} />
                </div>
              </div>

              <div className="mt-5 flex items-center text-xs text-slate-400">
                <TrendingUp size={14} className="mr-1 text-emerald-400" />
                +12.5% from last month
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="mt-10 ">
        <div className="lg:col-span-2 rounded-2xl border border-violet-500/20 bg-zinc-900/20 bg-linear-to-br from-violet-500/10 via-indigo-500/10 to-transparent p-6">
          <h3 className="font-semibold text-lg mb-4">Platform Growth</h3>

          <div className="h-64 flex items-center justify-center text-slate-500">
            <StatsPieChart stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
}
