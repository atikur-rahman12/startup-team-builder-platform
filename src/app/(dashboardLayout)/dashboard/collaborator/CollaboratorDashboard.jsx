"use client";

import React from "react";
import {
  FileText,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  Zap,
  Clock,
  MessageSquare,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import {
  getAllOpportunities,
  getUserApplications,
} from "@/lib/api/startups/action";

const CollaboratorDashboard = () => {
  const { data: session, isPending } = useSession();
  const userName = session?.user?.name || "User";
  const [recentActivities, setRecentActivities] = useState([]);

  const [stats, setStats] = useState({
    opportunities: 0,
    activeProjects: 0,
    submittedApplications: 0,
    completedTasks: 0,
    rejected: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!session?.user?.email) return;

      const email = session.user.email;

      const [applications, opportunities] = await Promise.all([
        getUserApplications(email),
        getAllOpportunities(),
      ]);

      const submitted = applications.length;

      const accepted = applications.filter(
        (app) => app.status === "accepted",
      ).length;

      const rejected = applications.filter(
        (app) => app.status === "rejected",
      ).length;

      setStats({
        opportunities: opportunities.length,
        submittedApplications: submitted,
        activeProjects: accepted,
        completedTasks: accepted,
        rejected: rejected,
      });

      const activityData = applications.slice(0, 5).map((app, index) => ({
        id: app._id || index,
        title: `Applied for ${app.roleTitle || "Opportunity"}`,
        time: new Date(app.appliedAt).toLocaleDateString(),
        desc: `Application status: ${app.status}`,
        status: app.status,
      }));

      setRecentActivities(activityData);
    };

    fetchStats();
  }, [session]);

  const targetCount = 15;
  const targetPercentage = Math.min(
    Math.round((stats.activeProjects / targetCount) * 100),
    100,
  );

  const cardContent = [
    {
      title: "Opportunities",
      value: stats.opportunities,
      icon: <Briefcase size={22} className="text-white" />,
      // Relatable text for available job posts
      badge:
        stats.opportunities > 0
          ? `${stats.opportunities} positions open`
          : "No open role",
      color: "text-white",
      linkColor: "text-white",
      href: "/browse-opportunities",
    },
    {
      title: "Total Applications",
      value: stats.submittedApplications,
      icon: <FileText size={22} className="text-violet-400" />,
      // Count specific info track
      badge: `${stats.submittedApplications} roles applied`,
      color: "text-violet-400",
      linkColor: "text-violet-400",
      href: "/dashboard/collaborator/my-applications?status=All",
    },
    {
      title: "Accepted",
      value: stats.completedTasks,
      icon: <CheckCircle2 size={22} className="text-emerald-400" />,
      // Milestones tracker based on accepted apps
      badge:
        stats.completedTasks > 0
          ? `${targetPercentage}% of milestone`
          : "Waiting for approval",
      color: "text-emerald-400",
      linkColor: "text-emerald-400",
      href: "/dashboard/collaborator/my-applications?status=Accepted",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: <XCircle size={22} className="text-rose-500" />,
      // Informative status tracker
      badge:
        stats.rejected > 0
          ? `${stats.rejected} needs attention`
          : "Perfect record",
      color: "text-rose-500",
      linkColor: "text-rose-500",
      href: "/dashboard/collaborator/my-applications?status=Rejected",
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-slate-950 py-2 text-white space-y-6 animate-fadeIn">
      {/* Background Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full space-y-6">
        {/* 1. Welcome Header Banner */}
        <div className="relative p-6 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-xl overflow-hidden">
          <div className="relative z-10 flex flex-col gap-1">
            <div className="inline-flex items-center gap-2 mb-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 backdrop-blur-md w-fit">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
              <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                Collaborator Workspace
              </span>
              <div className="h-3 w-px bg-white/10 mx-1" />
              <span className="text-slate-400 flex items-center gap-1">
                StartupForge v2.0
                <Zap size={12} className="text-amber-400 fill-current" />
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2.5 min-h-10">
              Welcome Back,{" "}
              <span className="bg-linear-to-r from-violet-400 via-indigo-200 to-cyan-400 bg-clip-text text-transparent">
                {isPending ? "..." : userName}
              </span>
              <span className="inline-block origin-[70%_70%] animate-wave text-2xl sm:text-3xl">
                👋
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl font-medium leading-relaxed mt-1">
              Here's your collaboration workspace today. Track your project
              contributions, manage active applications, and connect with
              innovative startup ecosystems.
            </p>
          </div>
        </div>

        {/* 3. Overview Analytics Grid */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 px-1">
            Overview Analytics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {cardContent.map((card, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border border-white/5 bg-slate-900/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-slate-900/60 backdrop-blur-xl shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400 tracking-wide">
                      {card.title}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5 group-hover:border-white/10 transition-all duration-300">
                      {card.icon}
                    </div>
                  </div>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span
                      className={`text-3xl font-black tracking-tight ${card.color || "text-white"}`}
                    >
                      {card.value}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-medium text-slate-500 min-h-9.5">
                  <span className="bg-slate-950/60 border border-white/5 px-2 py-0.5 rounded-md text-slate-400">
                    {card.badge}
                  </span>

                  <Link
                    href={card.href}
                    className={`flex items-center gap-0.5 ${card.linkColor} hover:opacity-80 transition-all duration-300 transform translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 font-bold`}
                  >
                    View Details <ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Recent Activity Log */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                <Zap size={14} className="text-indigo-400" />
                Activity Stream
              </div>
              <h3 className="text-base font-bold text-slate-200 mt-1">
                Recent Updates & Progress
              </h3>
            </div>
          </div>

          {/* Activity List */}
          <div className="space-y-4">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-slate-950/40 hover:border-white/10 transition-all duration-200"
                >
                  <div className="p-2 rounded-lg bg-slate-900/60 border border-white/5 shrink-0">
                    {activity.status === "accepted" ? (
                      <CheckCircle2 size={14} className="text-emerald-400" />
                    ) : activity.status === "rejected" ? (
                      <XCircle size={14} className="text-rose-500" />
                    ) : (
                      <Clock size={14} className="text-amber-400" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-semibold text-slate-200">
                        {activity.title}
                      </h4>

                      <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1 shrink-0">
                        <Clock size={10} />
                        {activity.time}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 font-medium">
                      {activity.desc}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-slate-500">
                No recent activity found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaboratorDashboard;
