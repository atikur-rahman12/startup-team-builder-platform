import React from "react";
import {
  Briefcase,
  Calendar,
  Layers,
  Send,
  Search,
  Compass,
  MapPin,
  Building2,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { getAllOpportunities } from "@/lib/api/startups/action";

export default async function BrowseOpportunities() {
  const opportunities = await getAllOpportunities();

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 py-20 overflow-hidden">
      {/* 🌌 Background Premium Radial Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16 relative z-10 w-full">
        {/* 🚀 Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Compass size={12} className="animate-spin-slow" /> Explore
            Ecosystem
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Discover{" "}
            <span className="bg-linear-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Startup Opportunities
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-lg font-medium max-w-2xl mx-auto">
            Find premium roles, equity-based gigs, and remote positions in
            hyper-growth startups.
          </p>
        </div>

        {/* 🗂️ Opportunities Grid Container */}
        {opportunities.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center bg-slate-900/40 border border-white/5 p-16 rounded-3xl max-w-xl mx-auto backdrop-blur-md space-y-4 shadow-2xl">
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-500">
              <Layers size={36} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">
                No Active Roles Found
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Currently, there are no active startup opportunities listed.
                Check back shortly!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mx-auto w-full">
            {opportunities.map((opportunity) => (
              <div
                key={opportunity._id?.toString()}
                className="group relative bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/5"
              >
                {/* Subtle top border glow effect on hover */}
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-500/0 to-transparent group-hover:via-indigo-500/40 transition-all duration-500" />

                <div className="space-y-5">
                  {/* Startup Meta (Logo & Name) */}
                  <div className="flex items-center gap-4">
                    {opportunity.startupLogo ? (
                      <div className="size-12 rounded-xl bg-slate-950 border border-white/10 p-2 flex items-center justify-center shrink-0 shadow-inner">
                        <Image
                          src={opportunity.startupLogo}
                          alt={`${opportunity.startupName || "Startup"} logo`}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain rounded-md"
                        />
                      </div>
                    ) : (
                      <div className="size-12 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center shrink-0 text-slate-500">
                        <Building2 size={20} />
                      </div>
                    )}

                    <div className="space-y-0.5 flex-1 flex justify-between items-start">
                      <h4 className="text-xs font-bold text-slate-400 tracking-wide uppercase">
                        {opportunity.startupName || "Anonymous Startup"}
                      </h4>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="inline-block px-2 py-0.5 text-[9px] font-extrabold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md uppercase tracking-wider">
                          {opportunity.workType || "Remote"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Role Title */}
                  <div>
                    <h2 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {opportunity.roleTitle}
                    </h2>
                  </div>

                  {/* Required Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 min-h-[32px]">
                    {opportunity.requiredSkills ? (
                      opportunity.requiredSkills
                        .split(",")
                        .map((skill, index) => (
                          <span
                            key={index}
                            className="text-[10px] bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg text-slate-300 font-semibold"
                          >
                            {skill.trim()}
                          </span>
                        ))
                    ) : (
                      <span className="text-[11px] text-slate-600 italic">
                        No specific skills mentioned
                      </span>
                    )}
                  </div>

                  {/* Border Divider */}
                  <div className="h-px bg-linear-to-r from-white/5 via-white/10 to-white/5" />

                  {/* Card Meta Data Info */}
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Briefcase size={13} className="text-slate-500" />
                      <span>{opportunity.commitmentLevel || "Full-time"}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-right">
                      <Calendar size={13} className="text-slate-500" />
                      <span>
                        {opportunity.deadline
                          ? `Till ${new Date(
                              opportunity.deadline,
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}`
                          : "No Deadline"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 🌟 Premium Interactive CTA Button */}
                <div className="mt-6">
                  <button className="w-full relative inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group/btn overflow-hidden cursor-pointer">
                    {/* Animated white shine overlay */}
                    <div className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    <Send
                      size={14}
                      className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                    />
                    Apply Securely
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
