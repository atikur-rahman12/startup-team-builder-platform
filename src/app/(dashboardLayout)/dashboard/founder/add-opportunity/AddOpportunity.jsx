"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Wrench,
  Monitor,
  Clock,
  Calendar,
  Sparkles,
  ArrowRight,
  Building,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { addOpportunity, getStartupByEmail } from "@/lib/api/startups/action";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const AddOpportunity = () => {
  const { data: session, isPending: authLoading } = authClient.useSession();
  const userEmail = session?.user?.email;

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [startupInfo, setStartupInfo] = useState(null);

  const [formData, setFormData] = useState({
    roleTitle: "",
    requiredSkills: "",
    workType: "",
    commitmentLevel: "",
    deadline: "",
  });

  useEffect(() => {
    const fetchStartup = async () => {
      if (!userEmail) {
        if (!authLoading) setPageLoading(false);
        return;
      }

      try {
        const data = await getStartupByEmail(userEmail);
        setStartupInfo(data);
      } catch (err) {
        console.error("Failed to load startup info", err);
      } finally {
        setPageLoading(false);
      }
    };

    fetchStartup();
  }, [userEmail, authLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      toast.error("You must be logged in to post an opportunity!");
      return;
    }

    if (!startupInfo) {
      toast.error(
        "You must register a startup first before posting opportunities!",
      );
      return;
    }

    if (startupInfo.status !== "active") {
      toast.error(`Venture is ${startupInfo.status}. Action prohibited.`);
      return;
    }

    setLoading(true);

    const payload = {
      ...formData,
      founderEmail: userEmail,
      startupId: startupInfo._index || startupInfo._id,
      startupName: startupInfo.startupName,
      startupLogo: startupInfo.logo,
    };

    try {
      const response = await addOpportunity(payload);

      if (response?.success || response?.insertedId) {
        toast.success("Opportunity published to talent ecosystem! 🚀");

        setFormData({
          roleTitle: "",
          requiredSkills: "",
          workType: "",
          commitmentLevel: "",
          deadline: "",
        });
      } else {
        toast.error(response?.message || "Failed to deploy opportunity.");
      }
    } catch (error) {
      console.error("Deployment Error:", error);
      toast.error("Network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || pageLoading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-indigo-500" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="w-full max-w-md mx-auto my-12 p-6 border border-zinc-800 bg-zinc-900/30 rounded-2xl text-center space-y-4">
        <AlertCircle size={40} className="text-red-400 mx-auto" />
        <h3 className="text-lg font-bold text-zinc-200">
          Authentication Required
        </h3>
        <p className="text-sm text-zinc-400">
          Please log in to your account to manage or add venture opportunities.
        </p>
      </div>
    );
  }

  const isVentureActive = startupInfo?.status === "active";

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 px-4 sm:px-6 lg:px-0 py-8 animate-fadeIn">
      {/* 🌟 HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800/80 pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 tracking-widest uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 shadow-xs">
            <span className="size-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Talent Acquisition
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-transparent mt-3 tracking-tight bg-linear-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text">
            Add New Opportunity
          </h1>
          <p className="text-zinc-400 text-sm mt-1.5 font-medium">
            Recruit top-tier co-founders, developers, and builders into your
            venture ecosystem.
          </p>
        </div>
      </div>

      {startupInfo ? (
        <div className="space-y-4">
          <div className="relative overflow-hidden bg-linear-to-r from-zinc-900/40 to-zinc-950/60 backdrop-blur-xl border border-zinc-800/60 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5 group transition-all duration-300 hover:border-zinc-700/60">
            <div className="absolute top-0 right-0 p-8 text-indigo-500/5 pointer-events-none">
              <Building size={120} />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left relative z-10">
              <div className="size-16 rounded-xl overflow-hidden border border-zinc-700/50 bg-zinc-950 p-1 shrink-0">
                <Image
                  src={startupInfo.logo}
                  alt={startupInfo.startupName}
                  height={180}
                  width={180}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">
                  Publishing Organization
                </span>
                <h3 className="text-lg font-bold text-zinc-100 tracking-tight">
                  {startupInfo.startupName}
                </h3>
                <p className="text-xs text-zinc-400 font-medium">
                  Sector:{" "}
                  <span className="text-zinc-300">{startupInfo.industry}</span>
                </p>
              </div>
            </div>

            <div
              className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-xs font-semibold shadow-xs relative z-10 ${
                isVentureActive
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : startupInfo.status === "pending"
                    ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                    : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}
            >
              {isVentureActive ? (
                <CheckCircle size={14} />
              ) : startupInfo.status === "pending" ? (
                <AlertCircle size={14} />
              ) : (
                <XCircle size={14} />
              )}
              Venture {startupInfo.status.toUpperCase()}
            </div>
          </div>

          {!isVentureActive && (
            <div
              className={`p-4 border rounded-xl flex items-center gap-3 text-sm font-medium ${
                startupInfo.status === "pending"
                  ? "border-amber-500/20 bg-amber-500/5 text-amber-400"
                  : "border-red-500/20 bg-red-500/5 text-red-400"
              }`}
            >
              <AlertCircle size={20} className="shrink-0" />
              <p>
                {startupInfo.status === "pending"
                  ? "Your venture profile is currently undergoing verification. You will be able to deploy talent opportunities once administration grants approval."
                  : "Your venture profile application has been rejected. Opportunity deployment is restricted."}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="p-5 border border-amber-500/20 bg-amber-500/5 rounded-2xl flex items-center gap-4 text-amber-400">
          <AlertCircle size={24} className="shrink-0" />
          <p className="text-sm font-medium">
            No registered venture profile found for{" "}
            <span className="underline">{userEmail}</span>. You need to create a
            startup profile first before deploying core talent opportunities.
          </p>
        </div>
      )}

      {/* 🛠️ OPPORTUNITY FORM LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDEBAR */}
        <div className="lg:col-span-1 bg-linear-to-br from-indigo-600/10 via-transparent to-transparent border border-zinc-800/40 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-[-20%] left-[-20%] w-40 h-40 bg-indigo-500/10 blur-[50px] rounded-full" />
          <div className="space-y-4 relative z-10">
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl w-fit">
              <Sparkles className="text-indigo-400 animate-pulse" size={24} />
            </div>
            <h3 className="text-lg font-bold text-zinc-200">
              Attract Core Talent
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Define precise requirements for your target nodes. High-fidelity
              listings with structured skills receive up to 75% higher matching
              responses across our validator network.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-zinc-900 space-y-3 relative z-10">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <CheckCircle size={14} className="text-indigo-400" /> Automated
              matching matrix
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <CheckCircle size={14} className="text-indigo-400" /> Real-time
              dashboard routing
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR: THE FORM CRADLE */}
        <div className="lg:col-span-2 bg-[#0d0d0e]/60 backdrop-blur-md border border-zinc-800/40 rounded-2xl p-6 md:p-8 shadow-xl shadow-black/40">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ROLE TITLE */}
            <div className="form-control w-full space-y-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Role Title
              </label>
              <div className="relative flex items-center">
                <Briefcase
                  size={16}
                  className="absolute left-4 text-zinc-500"
                />
                <input
                  type="text"
                  name="roleTitle"
                  required
                  disabled={!isVentureActive}
                  placeholder="e.g., Lead Full-Stack Engineer, Co-Founder"
                  value={formData.roleTitle}
                  onChange={handleChange}
                  className="w-full bg-zinc-900/40 border border-zinc-800/80 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-zinc-200 outline-none transition-all placeholder:text-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* REQUIRED SKILLS */}
            <div className="form-control w-full space-y-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Required Skills
              </label>
              <div className="relative flex items-center">
                <Wrench size={16} className="absolute left-4 text-zinc-500" />
                <input
                  type="text"
                  name="requiredSkills"
                  required
                  disabled={!isVentureActive}
                  placeholder="e.g., React, Tailwind CSS, Node.js (Comma separated)"
                  value={formData.requiredSkills}
                  onChange={handleChange}
                  className="w-full bg-zinc-900/40 border border-zinc-800/80 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-zinc-200 outline-none transition-all placeholder:text-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* WORK TYPE & COMMITMENT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="form-control w-full space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Work Type
                </label>
                <div className="relative flex items-center">
                  <Monitor
                    size={16}
                    className="absolute left-4 text-zinc-500 z-10"
                  />
                  <select
                    name="workType"
                    required
                    disabled={!isVentureActive}
                    value={formData.workType}
                    onChange={handleChange}
                    className="select w-full bg-zinc-900/40 border border-zinc-800/80 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 rounded-xl pl-11 pr-4 text-sm font-medium text-zinc-200 outline-none transition-all min-h-fit h-11.5 select-bordered disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option
                      value=""
                      disabled
                      className="bg-zinc-950 text-zinc-600"
                    >
                      Select Work Setup
                    </option>
                    <option
                      value="Remote"
                      className="bg-zinc-950 text-zinc-300"
                    >
                      Remote
                    </option>
                    <option
                      value="On-site"
                      className="bg-zinc-950 text-zinc-300"
                    >
                      On-site
                    </option>
                    <option
                      value="Hybrid"
                      className="bg-zinc-950 text-zinc-300"
                    >
                      Hybrid
                    </option>
                  </select>
                </div>
              </div>

              <div className="form-control w-full space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Commitment Level
                </label>
                <div className="relative flex items-center">
                  <Clock
                    size={16}
                    className="absolute left-4 text-zinc-500 z-10"
                  />
                  <select
                    name="commitmentLevel"
                    required
                    disabled={!isVentureActive}
                    value={formData.commitmentLevel}
                    onChange={handleChange}
                    className="select w-full bg-zinc-900/40 border border-zinc-800/80 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 rounded-xl pl-11 pr-4 text-sm font-medium text-zinc-200 outline-none transition-all min-h-fit h-11.5 select-bordered disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option
                      value=""
                      disabled
                      className="bg-zinc-950 text-zinc-600"
                    >
                      Select Commitment
                    </option>
                    <option
                      value="Full-time"
                      className="bg-zinc-950 text-zinc-300"
                    >
                      Full-time
                    </option>
                    <option
                      value="Part-time"
                      className="bg-zinc-950 text-zinc-300"
                    >
                      Part-time
                    </option>
                    <option
                      value="Contractual"
                      className="bg-zinc-950 text-zinc-300"
                    >
                      Contractual
                    </option>
                    <option
                      value="Equity-Based"
                      className="bg-zinc-950 text-zinc-300"
                    >
                      Equity-Based
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* DEADLINE */}
            <div className="form-control w-full space-y-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Application Deadline
              </label>
              <div className="relative flex items-center">
                <Calendar size={16} className="absolute left-4 text-zinc-500" />
                <input
                  type="date"
                  name="deadline"
                  required
                  disabled={!isVentureActive}
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full bg-zinc-900/40 border border-zinc-800/80 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-zinc-200 outline-none transition-all scheme-dark disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON (With Security Conditions) */}
            <button
              type="submit"
              disabled={loading || !startupInfo || !isVentureActive}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/10 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer group"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  {isVentureActive
                    ? "Deploy Opportunity"
                    : `Deployment Locked (${startupInfo?.status})`}
                  {isVentureActive && (
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  )}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOpportunity;
