"use client";

import React, { useEffect, useState } from "react";
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Github,
  Globe,
  FileText,
  Mail,
  User,
  ShieldAlert,
} from "lucide-react";
import {
  getFounderApplications,
  updateApplicationStatus,
} from "@/lib/api/startups/action";
import { useSession } from "@/lib/auth-client";

export default function Applications() {
  const { data: session, isPending: authPending } = useSession();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    if (session?.user?.email) {
      fetchApplications();
    }
  }, [session]);

  const fetchApplications = async () => {
    setLoading(true);
    const data = await getFounderApplications(session.user.email);
    setApplications(data);
    setLoading(false);
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    const res = await updateApplicationStatus(id, newStatus);
    if (res.success) {
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: newStatus } : app,
        ),
      );
    } else {
      alert(res.message || "Something went wrong!");
    }
    setUpdatingId(null);
  };

  if (authPending || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-indigo-400">
        <div className="h-10 w-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-10">
        {/* 🚀 Top Heading Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Applicant Dashboard
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-1">
              Review and manage talents applying to your startup opportunities.
            </p>
          </div>
          <div className="bg-slate-900/60 border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-2 max-w-max backdrop-blur-md">
            <Briefcase size={16} className="text-indigo-400" />
            <span className="text-sm font-semibold text-slate-200">
              Total Applications: {applications.length}
            </span>
          </div>
        </div>

        {/* Grid / List Wrapper */}
        {applications.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center bg-slate-900/20 border border-white/5 p-16 rounded-3xl max-w-xl mx-auto backdrop-blur-md space-y-4 shadow-2xl">
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-500">
              <ShieldAlert size={36} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                No Applications Yet
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mt-1">
                As soon as candidates start applying for your active roles, they
                will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 transition-all duration-300 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Left Block: Applicant Core Info & Meta */}
                <div className="space-y-4 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-semibold">
                      <Briefcase size={13} /> {app.roleTitle}
                    </div>
                    <span className="text-slate-500 text-sm font-medium">
                      at {app.startupName}
                    </span>

                    {/* Status Badges */}
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold capitalize ${
                        app.status === "accepted" || app.status === "Accept"
                          ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                          : app.status === "rejected" || app.status === "Reject"
                            ? "bg-rose-500/10 border border-rose-500/20 text-rose-400"
                            : "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                      }`}
                    >
                      {app.status === "accepted" ? (
                        <CheckCircle2 size={12} />
                      ) : app.status === "rejected" ? (
                        <XCircle size={12} />
                      ) : (
                        <Clock size={12} />
                      )}
                      {app.status === "accepted"
                        ? "Accepted"
                        : app.status === "rejected"
                          ? "Rejected"
                          : "Pending"}
                    </span>
                  </div>

                  {/* Primary Personal Info */}
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <User size={18} className="text-slate-400" />{" "}
                      {app.fullName}
                    </h2>
                    <p className="text-slate-400 text-sm mt-1 flex items-center gap-1.5">
                      <Mail size={14} /> {app.email}
                    </p>
                  </div>

                  {/* Links Section */}
                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    {app.githubUrl && (
                      <a
                        href={app.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 px-3 py-1.5 rounded-xl transition-all"
                      >
                        {/* <Github size={14} /> */}
                        GitHub <ExternalLink size={12} className="opacity-60" />
                      </a>
                    )}
                    {app.portfolioLink && (
                      <a
                        href={app.portfolioLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 px-3 py-1.5 rounded-xl transition-all"
                      >
                        <Globe size={14} /> Portfolio{" "}
                        <ExternalLink size={12} className="opacity-60" />
                      </a>
                    )}
                    {app.resumeUrl && (
                      <a
                        href={app.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold bg-linear-to-r from-indigo-500/20 to-violet-500/20 hover:from-indigo-500/30 hover:to-violet-500/30 text-indigo-300 border border-indigo-500/20 px-3 py-1.5 rounded-xl transition-all"
                      >
                        <FileText size={14} /> Resume{" "}
                        <ExternalLink size={12} className="opacity-60" />
                      </a>
                    )}
                  </div>

                  {/* Cover Letter Box */}
                  {app.coverLetter && app.coverLetter !== "null" && (
                    <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-4 mt-2">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Cover Letter
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed font-normal">
                        {app.coverLetter}
                      </p>
                    </div>
                  )}

                  {/* Date Meta */}
                  <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Calendar size={12} /> Applied on:{" "}
                    {new Date(app.appliedAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>

                {/* Right Block: Action Buttons (Accept / Reject) */}
                <div className="flex lg:flex-col sm:flex-row flex-col gap-3 min-w-35 w-full lg:w-auto border-t lg:border-t-0 border-white/5 pt-4 lg:pt-0">
                  <button
                    disabled={
                      updatingId === app._id || app.status === "accepted"
                    }
                    onClick={() => handleStatusChange(app._id, "accepted")}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      app.status === "accepted"
                        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 cursor-not-allowed"
                        : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/20 disabled:opacity-50"
                    }`}
                  >
                    <CheckCircle2 size={16} />
                    {app.status === "accepted" ? "Accepted" : "Accept"}
                  </button>

                  <button
                    disabled={
                      updatingId === app._id || app.status === "rejected"
                    }
                    onClick={() => handleStatusChange(app._id, "rejected")}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      app.status === "rejected"
                        ? "bg-rose-500/10 text-rose-500 border border-rose-500/20 cursor-not-allowed"
                        : "bg-slate-900 border border-white/10 hover:border-rose-500/40 text-slate-300 hover:text-rose-400 disabled:opacity-50"
                    }`}
                  >
                    <XCircle size={16} />
                    {app.status === "rejected" ? "Rejected" : "Reject"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
