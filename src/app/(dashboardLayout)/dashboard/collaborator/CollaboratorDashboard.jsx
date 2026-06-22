"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  DollarSign,
  Briefcase,
  TrendingUp,
  Award,
  Bell,
  Calendar,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  MessageSquare,
  Users,
  Layers,
} from "lucide-react";

export default function CollaboratorDashboard() {
  // Mock data for dashboard
  const [stats] = useState([
    {
      title: "Total Earnings",
      value: "$4,250.00",
      change: "+12.5%",
      isPositive: true,
      icon: DollarSign,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      title: "Active Campaigns",
      value: "8 Roles",
      change: "2 Pending",
      isPositive: true,
      icon: Briefcase,
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/20",
    },
    {
      title: "Performance Score",
      value: "98.4%",
      change: "Top 5%",
      isPositive: true,
      icon: TrendingUp,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500/20",
    },
    {
      title: "Collaborator Rank",
      value: "Elite Tier",
      change: "Level 4",
      isPositive: true,
      icon: Award,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
  ]);

  const [recentActivities] = useState([
    {
      id: 1,
      type: "milestone",
      title: "Milestone Approved",
      description: "Frontend Developer role milestone #2 has been verified.",
      time: "2 hours ago",
      icon: CheckCircle2,
      iconColor: "text-emerald-400",
    },
    {
      id: 2,
      type: "message",
      title: "New Message from Founder",
      description: "NovaTech AI founder left a comment on your submission.",
      time: "5 hours ago",
      icon: MessageSquare,
      iconColor: "text-indigo-400",
    },
    {
      id: 3,
      type: "deadline",
      title: "Upcoming Deadline",
      description: "Backend API Integration deliverable is due in 24 hours.",
      time: "1 day ago",
      icon: Clock,
      iconColor: "text-amber-400",
    },
  ]);

  const [activeProjects] = useState([
    {
      id: "p1",
      role: "Senior Full Stack Engineer",
      startup: "QuantumVortex Labs",
      status: "In Progress",
      progress: 75,
      nextDeadline: "July 02, 2026",
    },
    {
      id: "p2",
      role: "UI/UX & Brand Designer",
      startup: "NovaTech AI",
      status: "Review Pending",
      progress: 90,
      nextDeadline: "July 05, 2026",
    },
  ]);

  return (
    <div className="relative min-h-screen w-full py-12 overflow-hidden">
      {/* 🌌 Premium Ambient Background Glows */}
      {/* <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[130px] pointer-events-none" /> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-10">
        {/* 🚀 Top Heading Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-8">
          <div>
            <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-semibold max-w-max mb-3">
              <LayoutDashboard size={13} /> Control Center
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Collaborator Suite
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-1">
              Welcome back! Track your contributions, earnings, and startup
              milestones.
            </p>
          </div>

          {/* Quick Date Badge */}
          <div className="bg-slate-900/60 border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-2 max-w-max backdrop-blur-md shadow-xl">
            <Calendar size={16} className="text-indigo-400" />
            <span className="text-sm font-semibold text-slate-300">
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* 📊 Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={i}
                className="bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 rounded-2xl p-6 backdrop-blur-xl shadow-xl flex items-center justify-between group"
              >
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {stat.value}
                  </h3>
                  <span
                    className={`inline-flex items-center text-xs font-semibold ${stat.color}`}
                  >
                    {stat.change}
                  </span>
                </div>
                <div
                  className={`p-3 rounded-xl border ${stat.bgColor} ${stat.borderColor} group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent size={22} className={stat.color} />
                </div>
              </div>
            );
          })}
        </div>

        {/* 🛠️ Main Dashboard Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Block: Active Tasks / Roles (Takes 2 Columns on Desktop) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers size={18} className="text-indigo-400" /> Active
                Deployments
              </h2>
              <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
                View All <ChevronRight size={14} />
              </button>
            </div>

            <div className="space-y-4">
              {activeProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-slate-900/40 border border-white/5 hover:border-indigo-500/20 transition-all duration-300 rounded-2xl p-6 backdrop-blur-xl shadow-xl space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        {project.role}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium">
                        Startup:{" "}
                        <span className="text-slate-300">
                          {project.startup}
                        </span>
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 max-w-max">
                      <Clock size={12} /> {project.status}
                    </span>
                  </div>

                  {/* Progress Bar Component */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400">Milestone Progress</span>
                      <span className="text-indigo-400">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden p-[2px] border border-white/5">
                      <div
                        className="h-full bg-linear-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Footer Meta info */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-slate-500 font-medium">
                    <div>
                      Next Deadline:{" "}
                      <span className="text-slate-400">
                        {project.nextDeadline}
                      </span>
                    </div>
                    <button className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-bold transition-all hover:gap-1.5">
                      Workspace <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block: Live Activity Feed */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Bell size={18} className="text-violet-400" /> Activity Stream
              </h2>
            </div>

            <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-xl shadow-xl space-y-6">
              {recentActivities.map((activity) => {
                const ActivityIcon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className="flex gap-4 items-start last:border-b-0 border-b border-white/5 pb-4 last:pb-0"
                  >
                    <div
                      className={`p-2 rounded-xl bg-white/5 border border-white/10 mt-0.5 ${activity.iconColor}`}
                    >
                      <ActivityIcon size={16} />
                    </div>
                    <div className="space-y-1 flex-1">
                      <h4 className="text-sm font-bold text-slate-200">
                        {activity.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-normal">
                        {activity.description}
                      </p>
                      <span className="block text-[10px] text-slate-500 font-semibold tracking-wide">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Stats Support Box */}
            <div className="bg-linear-to-br from-indigo-600/10 to-violet-600/10 border border-indigo-500/20 rounded-2xl p-5 flex items-center justify-between gap-4 group">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">
                  Need Technical Help?
                </h4>
                <p className="text-xs text-slate-400">
                  Connect instantly with the core engineering system.
                </p>
              </div>
              <button className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-950/50 transition-all active:scale-95 shrink-0">
                <Users size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
