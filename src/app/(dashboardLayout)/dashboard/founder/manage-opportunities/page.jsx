"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Wrench,
  Monitor,
  Clock,
  Calendar,
  Trash2,
  Edit3,
  AlertCircle,
  Layers,
  ExternalLink,
  Plus,
  Sparkles,
  OctagonAlert,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import {
  getOpportunitiesByEmail,
  updateOpportunity,
  deleteOpportunity,
} from "@/lib/api/startups/action";

const ManageOpportunitiesPage = () => {
  const { data: session, isPending: authLoading } = authClient.useSession();
  const userEmail = session?.user?.email;

  const [opportunities, setOpportunities] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({
    roleTitle: "",
    requiredSkills: "",
    workType: "",
    commitmentLevel: "",
    deadline: "",
  });

  const [deletingId, setDeletingId] = useState(null);

  const fetchOpportunities = React.useCallback(async () => {
    if (!userEmail) return;
    try {
      const data = await getOpportunitiesByEmail(userEmail);
      setOpportunities(data || []);
    } catch (err) {
      console.error("Failed to fetch opportunities", err);
      toast.error("Failed to load listings.");
    } finally {
      setPageLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    if (!authLoading) {
      if (userEmail) {
        fetchOpportunities();
      } else {
        setPageLoading(false);
      }
    }
  }, [userEmail, authLoading, fetchOpportunities]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const openEditModal = (opp) => {
    setEditingItem(opp);
    setEditForm({
      roleTitle: opp.roleTitle,
      requiredSkills: opp.requiredSkills,
      workType: opp.workType,
      commitmentLevel: opp.commitmentLevel,
      deadline: opp.deadline,
    });
    document.getElementById("edit_opportunity_modal").showModal();
  };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setActionLoading(true);
//     try {
//       const res = await updateOpportunity(editingItem._id, editForm);
//       if (res.success) {
//         toast.success("Opportunity dynamically updated! 🌟");
//         document.getElementById("edit_opportunity_modal").close();
//         fetchOpportunities();
//       } else {
//         toast.error(res.message || "Failed to update node.");
//       }
//     } catch (error) {
//       toast.error("Network synchronization failed.");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const openDeleteModal = (id) => {
//     setDeletingId(id);
//     document.getElementById("delete_opportunity_modal").showModal();
//   };

//   const handleDelete = async () => {
//     if (!deletingId) return;
//     setActionLoading(true);
//     try {
//       const res = await deleteOpportunity(deletingId);
//       if (res.success) {
//         toast.success("Opportunity successfully wiped from ecosystem.");
//         setOpportunities((prev) =>
//           prev.filter((item) => item._id !== deletingId),
//         );
//         document.getElementById("delete_opportunity_modal").close();
//       } else {
//         toast.error(res.message || "Termination blocked.");
//       }
//     } catch (error) {
//       toast.error("Request execution failed.");
//     } finally {
//       setActionLoading(false);
//       setDeletingId(null);
//     }
//   };

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
          Please log in to your account to view or orchestrate active roles.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 px-4 py-8 animate-fadeIn">
      {/* 🌟 HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-zinc-800/80 pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 tracking-widest uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 shadow-xs">
            <Layers size={12} className="text-indigo-400" />
            Control Center
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-transparent mt-3 tracking-tight bg-linear-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text">
            Manage Opportunities
          </h1>
          <p className="text-zinc-400 text-sm mt-1.5 font-medium">
            Review, refine, or terminate open deployment pipelines across your
            startup matrix.
          </p>
        </div>
        <Link
          href="/dashboard/founder/add-opportunity"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800 hover:border-zinc-700 font-semibold text-sm rounded-xl transition-all shadow-xs shrink-0"
        >
          <Plus size={16} /> Deploy New Role
        </Link>
      </div>

      {/* 📊 CORE CONTENT SYSTEM */}
      {opportunities.length === 0 ? (
        <div className="w-full min-h-[50vh] flex flex-col items-center justify-center border border-dashed border-zinc-800/60 bg-zinc-900/5 rounded-3xl p-8 text-center space-y-5 animate-fadeIn">
          <div className="size-16 bg-linear-to-b from-zinc-800/50 to-zinc-900/80 border border-zinc-800 text-zinc-400 flex items-center justify-center rounded-2xl shadow-xl relative group">
            <Briefcase
              size={28}
              className="text-zinc-400 group-hover:text-indigo-400 transition-colors"
            />
            <Sparkles
              size={14}
              className="absolute -top-1 -right-1 text-indigo-400 animate-pulse"
            />
          </div>

          <div className="space-y-2 max-w-md">
            <h3 className="text-xl font-bold text-zinc-200 tracking-tight">
              No Active Positions Deployed
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Your control center dashboard doesn't have any matching deployment
              pipelines currently active in the ecosystem.
            </p>
          </div>

          <Link
            href="/dashboard/founder/add-opportunity"
            className="inline-flex items-center gap-2 text-sm font-bold text-white bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 px-6 py-3 rounded-xl border border-indigo-500/20 transition-all shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:-translate-y-0.5 active:translate-y-0"
          >
            Launch First Opportunity <ExternalLink size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {opportunities.map((opp) => (
            <div
              key={opp._id}
              className="relative overflow-hidden bg-linear-to-b from-zinc-900/40 to-zinc-950/70 backdrop-blur-md border border-zinc-800/80 hover:border-zinc-700/60 rounded-2xl p-5 flex flex-col justify-between shadow-xl transition-all duration-300 group hover:-translate-y-0.5"
            >
              {/* Top Row: Startup Brand */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="size-7 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 p-0.5 shrink-0">
                      <Image
                        src={
                          opp.startupLogo ||
                          "https://i.ibb.co/1GFGfCsr/og-default.png"
                        }
                        alt={opp.startupName}
                        height={35}
                        width={35}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-zinc-400 tracking-tight truncate max-w-[100px]">
                      {opp.startupName}
                    </span>
                  </div>
                  <span className="text-[9px] font-medium text-zinc-500 bg-zinc-900/60 border border-zinc-800/50 px-1.5 py-0.5 rounded-md shrink-0">
                    {new Date(opp.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* Role and Specs */}
                <div>
                  <h3 className="text-base font-bold text-zinc-200 group-hover:text-white transition-colors tracking-tight line-clamp-1">
                    {opp.roleTitle}
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 px-2 py-0.5 rounded-md">
                      <Monitor size={9} /> {opp.workType}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-violet-400 bg-violet-500/5 border border-violet-500/10 px-2 py-0.5 rounded-md">
                      <Clock size={9} /> {opp.commitmentLevel}
                    </span>
                  </div>
                </div>

                {/* Skills Container */}
                <div className="space-y-1 pt-1">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 block">
                    Core Prerequisites
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {opp.requiredSkills.split(",").map((skill, index) => (
                      <span
                        key={index}
                        className="text-[11px] bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 px-2 py-0.5 rounded-md font-medium"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Deadline & Controls */}
              <div className="mt-5 pt-3 border-t border-zinc-900 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-zinc-500 min-w-0">
                  <Calendar size={12} className="text-zinc-500 shrink-0" />
                  <div className="text-[10px] font-medium truncate">
                    <span className="text-zinc-600">Until:</span>{" "}
                    <span className="text-zinc-400 font-bold">
                      {opp.deadline}
                    </span>
                  </div>
                </div>

                {/* Actions Grid */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openEditModal(opp)}
                    className="p-1.5 bg-zinc-900/40 hover:bg-indigo-500/10 border border-zinc-800 hover:border-indigo-500/20 text-zinc-400 hover:text-indigo-400 rounded-lg transition-all cursor-pointer tooltip tooltip-top"
                    data-tip="Edit Position"
                  >
                    <Edit3 size={13} />
                  </button>
                  <button
                    onClick={() => openDeleteModal(opp._id)}
                    className="p-1.5 bg-zinc-900/40 hover:bg-red-500/10 border border-zinc-800 hover:border-red-500/20 text-zinc-500 hover:text-red-400 rounded-lg transition-all cursor-pointer tooltip tooltip-top"
                    data-tip="Delete Position"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🛠️ EDIT MODAL ARCHITECTURE */}
      <dialog id="edit_opportunity_modal" className="modal backdrop-blur-md">
        <div className="modal-box bg-[#0d0d0e] border border-zinc-800 rounded-2xl max-w-xl p-6 md:p-8 shadow-2xl relative">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-zinc-500 hover:text-zinc-200 outline-none">
              ✕
            </button>
          </form>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
              <Edit3 size={20} className="text-indigo-400" /> Update Opportunity
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Synchronize specifications for your deployed structural Node
              pipeline.
            </p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-5">
            {/* ROLE TITLE */}
            <div className="form-control w-full space-y-1.5">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Role Title
              </label>
              <div className="relative flex items-center">
                <Briefcase
                  size={15}
                  className="absolute left-4 text-zinc-500"
                />
                <input
                  type="text"
                  name="roleTitle"
                  required
                  value={editForm.roleTitle}
                  onChange={handleEditChange}
                  className="w-full bg-zinc-900/40 border border-zinc-800 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 rounded-xl py-2.5 pl-11 pr-4 text-sm font-medium text-zinc-200 outline-none transition-all"
                />
              </div>
            </div>

            {/* REQUIRED SKILLS */}
            <div className="form-control w-full space-y-1.5">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Required Skills
              </label>
              <div className="relative flex items-center">
                <Wrench size={15} className="absolute left-4 text-zinc-500" />
                <input
                  type="text"
                  name="requiredSkills"
                  required
                  value={editForm.requiredSkills}
                  onChange={handleEditChange}
                  className="w-full bg-zinc-900/40 border border-zinc-800 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 rounded-xl py-2.5 pl-11 pr-4 text-sm font-medium text-zinc-200 outline-none transition-all"
                />
              </div>
            </div>

            {/* SETUP & COMMITMENT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control w-full space-y-1.5">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Work Type
                </label>
                <div className="relative flex items-center">
                  <Monitor
                    size={15}
                    className="absolute left-4 text-zinc-500 z-10"
                  />
                  <select
                    name="workType"
                    required
                    value={editForm.workType}
                    onChange={handleEditChange}
                    className="select w-full bg-zinc-900/40 border border-zinc-800 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 rounded-xl pl-11 pr-4 text-sm font-medium text-zinc-200 outline-none min-h-fit h-[42px] select-bordered"
                  >
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="form-control w-full space-y-1.5">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Commitment
                </label>
                <div className="relative flex items-center">
                  <Clock
                    size={15}
                    className="absolute left-4 text-zinc-500 z-10"
                  />
                  <select
                    name="commitmentLevel"
                    required
                    value={editForm.commitmentLevel}
                    onChange={handleEditChange}
                    className="select w-full bg-zinc-900/40 border border-zinc-800 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 rounded-xl pl-11 pr-4 text-sm font-medium text-zinc-200 outline-none min-h-fit h-[42px] select-bordered"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contractual">Contractual</option>
                    <option value="Equity-Based">Equity-Based</option>
                  </select>
                </div>
              </div>
            </div>

            {/* DEADLINE */}
            <div className="form-control w-full space-y-1.5">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Application Deadline
              </label>
              <div className="relative flex items-center">
                <Calendar size={15} className="absolute left-4 text-zinc-500" />
                <input
                  type="date"
                  name="deadline"
                  required
                  value={editForm.deadline}
                  onChange={handleEditChange}
                  className="w-full bg-zinc-900/40 border border-zinc-800 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 rounded-xl py-2.5 pl-11 pr-4 text-sm font-medium text-zinc-200 outline-none transition-all scheme-dark"
                />
              </div>
            </div>

            {/* CTA BUTTONS */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-900 mt-6">
              <button
                type="button"
                onClick={() =>
                  document.getElementById("edit_opportunity_modal").close()
                }
                className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm font-semibold rounded-xl hover:bg-zinc-800 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={actionLoading}
                className="px-5 py-2 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm rounded-xl shadow-lg transition-all disabled:opacity-50 cursor-pointer"
              >
                {actionLoading ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* 🚨 PREMIUM DELETE CONFIRMATION MODAL */}
      <dialog id="delete_opportunity_modal" className="modal backdrop-blur-md">
        <div className="modal-box bg-[#0d0d0e] border border-zinc-800/80 rounded-2xl max-w-sm p-6 shadow-2xl text-center space-y-4 animate-scaleUp">
          {/* Neon Alert Icon Glow */}
          <div className="mx-auto size-14 bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center rounded-2xl shadow-inner relative">
            <OctagonAlert size={26} className="animate-pulse" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-zinc-100 tracking-tight">
              Terminate Deployment Node?
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-[280px] mx-auto">
              This action will permanently wipe the active pipeline from the
              global ecosystem. Data recovery is impossible.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                document.getElementById("delete_opportunity_modal").close();
                setDeletingId(null);
              }}
              className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              Abort
            </button>
            <button
              type="button"
              disabled={actionLoading}
              onClick={handleDelete}
              className="px-4 py-2.5 bg-linear-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-red-500/10 hover:shadow-red-500/20 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center"
            >
              {actionLoading ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                "Confirm Delete"
              )}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageOpportunitiesPage;
