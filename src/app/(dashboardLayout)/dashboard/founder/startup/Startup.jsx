"use client";

import React, { useState, useEffect } from "react";
import {
  Rocket,
  UploadCloud,
  Briefcase,
  AlignLeft,
  Mail,
  Coins,
  Building,
  CheckCircle,
  ArrowRight,
  Edit2,
  Trash2,
  Loader2,
  Calendar,
  ShieldCheck,
  Sparkles,
  Save,
  XCircle,
  AlertTriangle,
  Clock,
  XOctagon,
  Lock,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  addStartups,
  getStartupByEmail,
  updateStartup,
  deleteStartup,
} from "@/lib/api/startups/action";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";

const STATIC_ADMIN_STATUS = "Approved";

const StartupPage = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isLaunching, setIsLaunching] = useState(false);
  const [existingStartup, setExistingStartup] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    startupName: "",
    logo: "",
    industry: "",
    description: "",
    fundingStage: "",
    founderEmail: "",
  });

  useEffect(() => {
    const checkExistingStartup = async () => {
      if (session?.user?.email) {
        setFormData((prev) => ({
          ...prev,
          founderEmail: session.user.email,
        }));

        try {
          const startup = await getStartupByEmail(session.user.email);
          if (startup && startup._id) {
            setExistingStartup(startup);
          }
        } catch (error) {
          console.error("Error checking startup:", error);
        } finally {
          setPageLoading(false);
        }
      } else {
        setPageLoading(false);
      }
    };

    checkExistingStartup();
  }, [session]);

  const handleEditClick = () => {
    if (existingStartup) {
      setFormData({
        startupName: existingStartup.startupName || "",
        logo: existingStartup.logo || "",
        industry: existingStartup.industry || "",
        description: existingStartup.description || "",
        fundingStage: existingStartup.fundingStage || "",
        founderEmail:
          existingStartup.founderEmail || session?.user?.email || "",
      });
      setIsEditing(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!session?.user?.email) {
      toast.error("User session missing!");
      return;
    }

    setLoading(true);
    setIsDeleteModalOpen(false);

    try {
      const data = await deleteStartup(session.user.email);

      if (data && !data.error) {
        toast.success("Startup successfully removed from ecosystem! 🗑️");
        setExistingStartup(null);
        setIsEditing(false);
        setFormData({
          startupName: "",
          logo: "",
          industry: "",
          description: "",
          fundingStage: "",
          founderEmail: session?.user?.email || "",
        });
      } else {
        toast.error(data?.message || "Could not execute data purge sequence.");
      }
    } catch (error) {
      console.error("Error executing network deletion:", error);
      toast.error("Internal network request crashed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true); // 🛠️ Fixed typo from 'loading(true)' to 'setLoading(true)'
    const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const apiFormData = new FormData();
    apiFormData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        {
          method: "POST",
          body: apiFormData,
        },
      );
      const data = await response.json();
      if (data.success) {
        setFormData({ ...formData, logo: data.data.url });
        toast.success("Logo uploaded successfully! 🎉");
      } else {
        toast.error("Upload failed! Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Logo upload failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.logo) {
      toast.error("Please upload a logo first!");
      return;
    }

    setLoading(true);

    try {
      if (isEditing) {
        const data = await updateStartup(session.user.email, formData);

        if (data && !data.error) {
          toast.success("Startup core updated successfully! 🛠️");
          setExistingStartup({
            ...existingStartup,
            ...formData,
          });
          setIsEditing(false);
        } else {
          toast.error(data.message || "Failed to update startup");
        }
      } else {
        const data = await addStartups(formData);

        if (data && !data.error) {
          toast.success("Data secured on blockchain incubator network!");
          setIsLaunching(true);

          const nextStartupData = {
            ...formData,
            createdAt: new Date(),
          };

          setTimeout(() => {
            setExistingStartup(nextStartupData);
            setIsLaunching(false);

            setFormData({
              startupName: "",
              logo: "",
              industry: "",
              description: "",
              fundingStage: "",
              founderEmail: session?.user?.email || "",
            });
            toast.success("Startup launched successfully! 🚀");
          }, 2500);
        } else {
          toast.error(data.message || "Failed to create startup");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
      </div>
    );
  }

  if (isLaunching) {
    return (
      <div className="fixed inset-0 z-50 bg-[#09090b] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none animate-pulse" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-75 h-75 bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative flex items-center justify-center size-40 mb-8">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/20 animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-3 rounded-full border border-violet-500/40 p-1 animate-[spin_3s_linear_infinite]">
            <div className="size-2 rounded-full bg-violet-400 shadow-[0_0_15px_#a78bfa]" />
          </div>
          <div className="absolute inset-6 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 shadow-2xl flex items-center justify-center group">
            <Rocket className="text-indigo-400 size-10 animate-bounce transition-transform" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 text-violet-400 size-5 animate-pulse" />
        </div>

        <div className="text-center space-y-3 px-4 max-w-sm relative z-10">
          <h2 className="text-xl font-black text-transparent tracking-wider uppercase bg-linear-to-r from-zinc-100 via-indigo-200 to-zinc-200 bg-clip-text">
            Forging Venture Core
          </h2>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest text-zinc-500 uppercase">
            <span className="size-1.5 rounded-full bg-indigo-500 animate-ping" />
            Deploying to Incubator Network
          </div>
          <p className="text-[11px] text-zinc-400/70 font-medium leading-relaxed">
            Securing node signatures, generating ecosystem profile grids and
            initializing venture dashboards...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fadeIn px-4 sm:px-0">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800/80 pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 tracking-widest uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 shadow-xs">
            <span className="size-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Venture Hub
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-transparent mt-3 tracking-tight bg-linear-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text">
            {existingStartup && !isEditing
              ? "Venture Profile"
              : isEditing
                ? "Update Venture Core"
                : "Forge New Startup"}
          </h1>
          <p className="text-zinc-400 text-sm mt-1.5 font-medium">
            {existingStartup && !isEditing
              ? "Monitor and manage your ecosystem presence from your command center."
              : isEditing
                ? "Modify your existing venture payload parameters. (Founder email locked)"
                : "Launch your innovative project into StartupForge's premium incubator network."}
          </p>
        </div>
      </div>

      {existingStartup && !isEditing ? (
        /* PREMIUM STARTUP INFO VIEW */
        <div className="relative overflow-hidden bg-linear-to-b from-zinc-900/50 to-zinc-950/80 backdrop-blur-xl border border-zinc-800/60 rounded-3xl p-6 md:p-10 shadow-2xl shadow-black/80 space-y-8 group transition-all duration-300 hover:border-zinc-700/60">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-500/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800/60">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full">
              <div className="relative size-24 rounded-2xl p-0.5 bg-linear-to-tr from-zinc-700 via-zinc-800 to-indigo-500/40 shadow-inner overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
                <div className="size-full rounded-[14px] overflow-hidden bg-zinc-950 flex items-center justify-center">
                  <Image
                    src={existingStartup.logo}
                    alt={existingStartup.startupName}
                    height={150}
                    width={150}
                    className="size-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-zinc-100 via-zinc-200 to-zinc-400">
                    {existingStartup.startupName}
                  </h2>

                  {/* 🆕 DYNAMIC BADGE SYSTEM BASED ON STATIC STATUS */}
                  {STATIC_ADMIN_STATUS === "Approved" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-sm animate-fadeIn">
                      <ShieldCheck size={12} />
                      Approved
                    </span>
                  )}
                  {STATIC_ADMIN_STATUS === "Pending" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-400 shadow-sm animate-pulse">
                      <Clock
                        size={12}
                        className="animate-spin [animation-duration:3s]"
                      />
                      Pending Approval
                    </span>
                  )}
                  {STATIC_ADMIN_STATUS === "Rejected" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-rose-500/10 border border-rose-500/20 text-rose-400 shadow-sm animate-fadeIn">
                      <XOctagon size={12} />
                      Rejected
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-zinc-400 text-sm">
                  <span className="px-2.5 py-1 bg-zinc-900/80 border border-zinc-800 rounded-lg font-medium text-xs text-indigo-300 flex items-center gap-1.5">
                    <Briefcase size={12} />
                    {existingStartup.industry}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0 border-zinc-800/60">
              <button
                type="button"
                onClick={handleEditClick}
                className="flex-1 lg:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50 text-zinc-300 rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-200 shadow-sm hover:scale-[1.02] cursor-pointer"
              >
                <Edit2 size={14} className="text-zinc-400" />
                Edit
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => setIsDeleteModalOpen(true)}
                className="flex-1 lg:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-500/5 border border-rose-500/20 hover:bg-rose-500/10 hover:border-rose-500/30 text-rose-400 rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-200 shadow-sm hover:scale-[1.02] cursor-pointer disabled:opacity-50"
              >
                <Trash2 size={14} />
                {loading ? "Wiping Data..." : "Delete"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-zinc-900/30 border border-zinc-800/40 rounded-xl relative overflow-hidden group/card hover:bg-zinc-900/50 transition-all">
              <div className="absolute top-0 right-0 p-3 text-zinc-800 group-hover/card:text-indigo-500/10 transition-colors">
                <Coins size={40} />
              </div>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">
                Capitalization Stage
              </span>
              <span className="text-base font-bold text-zinc-200 mt-2 flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                {existingStartup.fundingStage}
              </span>
            </div>

            <div className="p-4 bg-zinc-900/30 border border-zinc-800/40 rounded-xl relative overflow-hidden group/card hover:bg-zinc-900/50 transition-all">
              <div className="absolute top-0 right-0 p-3 text-zinc-800 group-hover/card:text-indigo-500/10 transition-colors">
                <Mail size={40} />
              </div>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">
                Primary Operator
              </span>
              <span className="text-sm font-semibold text-zinc-300 mt-2 block truncate">
                {existingStartup.founderEmail}
              </span>
            </div>

            <div className="p-4 bg-zinc-900/30 border border-zinc-800/40 rounded-xl relative overflow-hidden group/card hover:bg-zinc-900/50 transition-all">
              <div className="absolute top-0 right-0 p-3 text-zinc-800 group-hover/card:text-indigo-500/10 transition-colors">
                <Calendar size={40} />
              </div>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">
                Ecosystem Onboarding
              </span>
              <span className="text-sm font-semibold text-zinc-300 mt-2 block">
                {existingStartup.createdAt
                  ? new Date(existingStartup.createdAt).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric", year: "numeric" },
                    )
                  : "Verified Member"}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="size-1 bg-indigo-500 rounded-full" />
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">
                Executive Abstract & Core Problem Statement
              </span>
            </div>

            {/* 🆕 PREMIUM DYNAMIC DESCRIPTION VIEW */}
            <div className="relative group/pitch">
              {STATIC_ADMIN_STATUS === "Approved" ? (
                <>
                  {/* 🟩 Approved View (Original Pitch) */}
                  <div className="absolute -inset-px bg-linear-to-r from-indigo-500/10 to-transparent rounded-2xl opacity-0 group-hover/pitch:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="p-5 sm:p-6 bg-zinc-900/20 border border-zinc-800/60 rounded-2xl text-sm sm:text-base text-zinc-300 leading-relaxed font-normal shadow-inner animate-fadeIn">
                    {existingStartup.description}
                  </div>
                </>
              ) : STATIC_ADMIN_STATUS === "Pending" ? (
                <>
                  {/* 🟨 Pending View (Premium Glassmorphism Locked Msg) */}
                  <div className="absolute -inset-px bg-linear-to-r from-amber-500/10 to-transparent rounded-2xl pointer-events-none" />
                  <div className="p-6 bg-zinc-900/10 border border-amber-500/20 rounded-2xl text-zinc-300 leading-relaxed font-normal shadow-2xl relative overflow-hidden backdrop-blur-xs flex flex-col sm:flex-row items-center sm:items-start gap-4 animate-fadeIn">
                    <div className="absolute top-0 right-0 p-8 text-amber-500/5 pointer-events-none">
                      <Lock size={120} />
                    </div>
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 shrink-0">
                      <Clock
                        size={20}
                        className="animate-spin [animation-duration:4s]"
                      />
                    </div>
                    <div className="space-y-2 text-center sm:text-left">
                      <h4 className="text-sm font-bold text-amber-400/90 tracking-wide uppercase">
                        Core Abstract Locked — Review In Progress
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
                        Your venture core configuration has been successfully
                        encrypted and routed to the StartupForge Review Board.
                        Until the verification cycle completes, your public
                        abstract remains securely hidden from ecosystem nodes.
                      </p>
                      <div className="inline-flex items-center gap-1.5 pt-1 text-[11px] font-semibold text-zinc-500 tracking-wider uppercase">
                        <span className="size-1.5 rounded-full bg-amber-500 animate-ping" />
                        Awaiting Admin Validation Signature
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* 🟥 Rejected View (Premium Error/Rejected Msg) */}
                  <div className="absolute -inset-px bg-linear-to-r from-rose-500/10 to-transparent rounded-2xl pointer-events-none" />
                  <div className="p-6 bg-zinc-900/10 border border-rose-500/20 rounded-2xl text-zinc-300 leading-relaxed font-normal shadow-2xl relative overflow-hidden backdrop-blur-xs flex flex-col sm:flex-row items-center sm:items-start gap-4 animate-fadeIn">
                    <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 shrink-0">
                      <XOctagon size={20} />
                    </div>
                    <div className="space-y-2 text-center sm:text-left">
                      <h4 className="text-sm font-bold text-rose-400/90 tracking-wide uppercase">
                        Venture Verification Rejected
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
                        The StartupForge validation board was unable to
                        authorize your current venture profile parameters.
                        Please click the{" "}
                        <strong className="text-zinc-200">Edit</strong> button
                        above to revise your core abstract data or compliance
                        parameters and re-submit for audit.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* CREATE / EDIT FORM VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-linear-to-br from-indigo-600/10 via-transparent to-transparent border border-zinc-800/40 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-[-20%] left-[-20%] w-40 h-40 bg-indigo-500/10 blur-[50px] rounded-full" />
            <div className="space-y-4 relative z-10">
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl w-fit">
                <Rocket className="text-indigo-400 animate-pulse" size={24} />
              </div>
              <h3 className="text-lg font-bold text-zinc-100">
                {isEditing ? "Modify Node Data" : "Forge Your Vision"}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {isEditing
                  ? "Update parameters to map correct ecosystem details. Synchronization to primary database clusters happens in real-time."
                  : "Join our premium incubator ecosystem. Get access to funding opportunities, top-tier collaborators, and real-time project analytics."}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-zinc-900 space-y-3 relative z-10">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <CheckCircle size={14} className="text-indigo-400" /> Complete
                profile setup
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <CheckCircle size={14} className="text-indigo-400" /> Instant
                verification
              </div>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-full mt-4 flex items-center justify-center gap-1.5 py-2 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 rounded-xl text-xs font-semibold text-zinc-400 cursor-pointer transition-all"
                >
                  <XCircle size={14} /> Cancel Edit
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 bg-[#0d0d0e]/60 backdrop-blur-md border border-zinc-800/40 rounded-2xl p-6 md:p-8 shadow-xl shadow-black/40">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                  Company Logo
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-5 p-5 bg-zinc-900/30 border border-dashed border-zinc-800 hover:border-indigo-500/40 rounded-xl transition-all duration-300 relative">
                  {formData.logo ? (
                    <div className="relative size-20 rounded-xl border border-zinc-700 overflow-hidden shrink-0 bg-zinc-950">
                      <Image
                        src={formData.logo}
                        alt="Preview"
                        height={85}
                        width={85}
                        className="size-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="size-20 rounded-xl border border-zinc-800 bg-zinc-950/50 flex items-center justify-center shrink-0 text-zinc-600">
                      <Building size={28} />
                    </div>
                  )}
                  <div className="grow text-center sm:text-left space-y-1">
                    <p className="text-sm font-medium text-zinc-200">
                      Upload high-resolution logo
                    </p>
                    <p className="text-xs text-zinc-500">
                      Supports PNG, JPG, or SVG. Managed via Imgbb.
                    </p>
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-400 bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/10 rounded-lg cursor-pointer transition-all mt-2">
                      <UploadCloud size={14} />
                      {loading ? "Uploading..." : "Choose File"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="form-control w-full space-y-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Startup Name
                  </label>
                  <div className="relative flex items-center">
                    <Building
                      size={16}
                      className="absolute left-4 text-zinc-500"
                    />
                    <input
                      type="text"
                      name="startupName"
                      placeholder="e.g., Stripe"
                      required
                      value={formData.startupName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          startupName: e.target.value,
                        })
                      }
                      className="w-full bg-zinc-900/40 border border-zinc-800/80 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-zinc-200 outline-none transition-all placeholder:text-zinc-600"
                    />
                  </div>
                </div>

                <div className="form-control w-full space-y-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Industry / Sector
                  </label>
                  <div className="relative flex items-center">
                    <Briefcase
                      size={16}
                      className="absolute left-4 text-zinc-500"
                    />
                    <input
                      type="text"
                      name="industry"
                      placeholder="e.g., FinTech, SaaS, AI"
                      required
                      value={formData.industry}
                      onChange={(e) =>
                        setFormData({ ...formData, industry: e.target.value })
                      }
                      className="w-full bg-zinc-900/40 border border-zinc-800/80 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-zinc-200 outline-none transition-all placeholder:text-zinc-600"
                    />
                  </div>
                </div>

                <div className="form-control w-full space-y-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Funding Stage
                  </label>
                  <div className="relative flex items-center">
                    <Coins
                      size={16}
                      className="absolute left-4 text-zinc-500 z-10"
                    />
                    <select
                      required
                      name="fundingStage"
                      value={formData.fundingStage}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fundingStage: e.target.value,
                        })
                      }
                      className="select w-full bg-zinc-900/40 border border-zinc-800/80 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 rounded-xl pl-11 pr-4 text-sm font-medium text-zinc-200 outline-none transition-all min-h-fit h-11.5 select-bordered"
                    >
                      <option
                        value=""
                        disabled
                        className="bg-zinc-950 text-zinc-600"
                      >
                        Select Funding Stage
                      </option>
                      <option
                        value="Idea Phase"
                        className="bg-zinc-950 text-zinc-300"
                      >
                        Idea Phase
                      </option>
                      <option
                        value="Pre-Seed"
                        className="bg-zinc-950 text-zinc-300"
                      >
                        Pre-Seed
                      </option>
                      <option
                        value="Seed Stage"
                        className="bg-zinc-950 text-zinc-300"
                      >
                        Seed Stage
                      </option>
                      <option
                        value="Series A+"
                        className="bg-zinc-950 text-zinc-300"
                      >
                        Series A+
                      </option>
                      <option
                        value="Bootstrapped"
                        className="bg-zinc-950 text-zinc-300"
                      >
                        Bootstrapped
                      </option>
                    </select>
                  </div>
                </div>

                <div className="form-control w-full space-y-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Founder Email (Immutable)
                  </label>
                  <div className="relative flex items-center">
                    <Mail size={16} className="absolute left-4 text-zinc-500" />
                    <input
                      type="email"
                      name="founderEmail"
                      placeholder="founder@company.com"
                      required
                      disabled
                      value={formData.founderEmail}
                      className="w-full bg-zinc-950/80 border border-zinc-900 focus:ring-0 rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-zinc-500 outline-none transition-all cursor-not-allowed border-dashed"
                    />
                  </div>
                </div>
              </div>

              <div className="form-control w-full space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Startup Description
                </label>
                <div className="relative flex items-start">
                  <AlignLeft
                    size={16}
                    className="absolute left-4 top-3.5 text-zinc-500"
                  />
                  <textarea
                    name="description"
                    rows="4"
                    placeholder="Briefly pitch your product, mission, and the problem you are solving..."
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-zinc-900/40 border border-zinc-800/80 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-zinc-200 outline-none transition-all placeholder:text-zinc-600 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/10 transition-all duration-300 disabled:opacity-50 cursor-pointer group"
              >
                {isEditing ? (
                  <>
                    {loading ? "Saving Changes..." : "Save Changes"}
                    <Save
                      size={16}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </>
                ) : (
                  <>
                    {loading ? "Launching..." : "Launch Startup"}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CUSTOM CONFIRMATION MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 shadow-2xl space-y-6 relative overflow-hidden animate-scaleIn">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-rose-500/10 blur-xl rounded-full pointer-events-none" />

            <div className="flex items-start gap-4">
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 shrink-0">
                <AlertTriangle size={22} className="animate-pulse" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-zinc-200 tracking-tight">
                  Purge Venture Core?
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Are you absolutely sure you want to delete this venture? This
                  action is permanent and cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-rose-600/20 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartupPage;
