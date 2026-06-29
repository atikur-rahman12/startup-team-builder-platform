"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  Clock,
  Calendar,
  User,
  MapPin,
  ArrowLeft,
  CheckCircle,
  Share2,
  Bookmark,
  Building,
  AlertCircle,
} from "lucide-react";
import { useParams } from "next/navigation";
import { getOpportunityById } from "@/lib/api/startups/action";
import ApplyModal from "@/components/ApplyModal";
import { useSession } from "@/lib/auth-client";

export default function OpportunityDetailsPage() {
  const params = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: session } = useSession();

  const currentUser = session?.user
    ? {
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
      }
    : null;

  const [opportunity, setOpportunity] = useState(null);

  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  // ডেট ফরম্যাট করার জন্য হেল্পার ফাংশন (যেমন: July 10, 2026)
  const formatDeadline = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // যদি অলরেডি স্ট্রিং বা ইনভ্যালিড হয়, তবে যা আছে তাই দেখাবে
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const data = await getOpportunityById(params.id);
        setOpportunity(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (params?.id) {
      fetchOpportunity();
    }
  }, [params.id]);

  return (
    <>
      <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500/30 selection:text-white">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-600/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          {/* Back button & Actions */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/dashboard/collaborator/my-applications"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group"
            >
              <ArrowLeft
                size={16}
                className="transform group-hover:-translate-x-1 transition-transform"
              />
              Back to Opportunities
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isSaved
                    ? "bg-indigo-600/20 border-indigo-500 text-indigo-400"
                    : "border-white/10 bg-slate-900/40 text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
              </button>
              <button className="p-2.5 rounded-xl border border-white/10 bg-slate-900/40 text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer">
                <Share2 size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl shadow-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="relative size-16 sm:size-20 rounded-2xl border border-white/10 bg-slate-950 overflow-hidden shrink-0 shadow-inner">
                    {opportunity?.startupLogo && (
                      <Image
                        src={opportunity?.startupLogo}
                        alt={opportunity?.startupName || "Startup Logo"}
                        fill
                        className="object-cover p-2"
                        unoptimized
                      />
                    )}
                  </div>

                  {/* Title and Startup Info */}
                  <div className="space-y-2">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
                      {opportunity?.roleTitle}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 font-medium">
                      <span className="flex items-center gap-1.5 text-indigo-400">
                        <Building size={16} />
                        {opportunity?.startupName}
                      </span>
                      <span className="hidden sm:inline text-slate-700">•</span>
                      <span className="flex items-center gap-1.5">
                        <User size={16} className="text-slate-500" />
                        Founder: {opportunity?.founderName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Tags / Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/5">
                  <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                        Work Type
                      </span>
                      <span className="text-sm font-semibold text-slate-200">
                        {opportunity?.workType}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center gap-3">
                    <div className="p-2 bg-violet-500/10 text-violet-400 rounded-lg">
                      <Briefcase size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                        Commitment
                      </span>
                      <span className="text-sm font-semibold text-slate-200">
                        {opportunity?.commitmentLevel}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                      <Clock size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                        Posted On
                      </span>
                      <span className="text-sm font-semibold text-slate-200">
                        {opportunity?.createdAt
                          ? new Date(opportunity.createdAt).toLocaleDateString()
                          : ""}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center gap-3">
                    <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg">
                      <Calendar size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                        Deadline
                      </span>
                      <span className="text-sm font-semibold text-slate-200">
                        {formatDeadline(opportunity?.deadline)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Card */}
              <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl shadow-xl">
                <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2.5">
                  <div className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg">
                    <Briefcase size={18} />
                  </div>
                  Required Skills & Competencies
                </h2>

                <div className="flex flex-wrap gap-2.5">
                  {opportunity?.requiredSkills ? (
                    opportunity.requiredSkills
                      .split(",")
                      .map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 text-xs sm:text-sm font-medium text-indigo-300 bg-indigo-500/5 border border-indigo-500/10 hover:border-indigo-500/30 hover:bg-indigo-500/10 rounded-xl transition-all duration-200"
                        >
                          {skill.trim()}
                        </span>
                      ))
                  ) : (
                    <span className="text-sm text-slate-500 italic">
                      No specific skills listed
                    </span>
                  )}
                </div>

                <div className="mt-6 pt-5 border-t border-white/5 flex items-center gap-2 text-xs text-slate-400">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  Matches with your core development profile
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Action Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 p-6 rounded-3xl border border-white/10 bg-linear-to-b from-slate-900/80 to-slate-950/80 backdrop-blur-xl shadow-2xl space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">
                    Interested in this role?
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Please ensure your profile information is accurate and up to
                    date before submitting your application.
                  </p>
                </div>

                {/* Deadline Alert Box */}
                <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl flex items-start gap-3">
                  <AlertCircle
                    size={18}
                    className="text-rose-400 shrink-0 mt-0.5"
                  />
                  <div>
                    <span className="text-xs font-semibold text-rose-400 block">
                      Application Closing Soon
                    </span>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      The deadline to apply for this opportunity is{" "}
                      <strong className="text-rose-300">
                        {formatDeadline(opportunity?.deadline)}
                      </strong>
                      .
                    </p>
                  </div>
                </div>

                {/* Action Button (Apply Button) */}
                {isApplied ? (
                  <div className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 shadow-inner">
                    <CheckCircle size={18} />
                    Application Submitted
                  </div>
                ) : (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-linear-to-tr from-indigo-600 via-indigo-500 to-violet-500 hover:from-indigo-500 hover:to-violet-400 shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-center"
                  >
                    Apply For This Opportunity
                  </button>
                )}

                {/* Trust & Safety Guideline */}
                <div className="pt-4 border-t border-white/5 text-center">
                  <p className="text-[11px] text-slate-500">
                    By applying, you agree to share your profile details with
                    the founder of {opportunity?.startupName}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        roleTitle={opportunity?.roleTitle}
        startupName={opportunity?.startupName}
        opportunityId={opportunity?._id?.toString()}
        user={currentUser}
      />
    </>
  );
}
