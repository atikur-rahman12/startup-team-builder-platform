"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Briefcase, Calendar, Building2 } from "lucide-react";
import ApplyButton from "@/components/Opportunity/ApplyButton";

export default function OpportunityCard({ opportunity }) {
  return (
    <>
      <div className="group relative bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/5">
        {/* Subtle top border glow effect on hover */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-500/0 to-transparent group-hover:via-indigo-500/40 transition-all duration-500" />

        <div className="space-y-5">
          {/* Startup Meta (Logo & Name) */}
          <div className="flex items-center gap-4">
            {opportunity?.startupLogo ? (
              <div className="size-12 rounded-xl bg-slate-950 border border-white/10 p-2 flex items-center justify-center shrink-0 shadow-inner">
                <Image
                  src={opportunity?.startupLogo}
                  alt={`${opportunity?.startupName || "Startup"} logo`}
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
                {opportunity?.startupName || "Anonymous Startup"}
              </h4>

              <div className="flex items-center gap-2 shrink-0">
                <span className="inline-block px-2 py-0.5 text-[9px] font-extrabold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md uppercase tracking-wider">
                  {opportunity?.workType || "Remote"}
                </span>
              </div>
            </div>
          </div>

          {/* Role Title */}
          <div>
            <h2 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
              {opportunity?.roleTitle}
            </h2>
          </div>

          {/* Required Skills Tags */}
          <div className="flex flex-wrap gap-1.5 min-h-8">
            {opportunity?.requiredSkills ? (
              opportunity?.requiredSkills.split(",").map((skill, index) => (
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
              <span>{opportunity?.commitmentLevel || "Full-time"}</span>
            </div>
            <div className="flex items-center gap-1.5 text-right">
              <Calendar size={13} className="text-slate-500" />
              <span>
                {opportunity?.deadline
                  ? `Till ${new Date(opportunity?.deadline).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}`
                  : "No Deadline"}
              </span>
            </div>
          </div>
        </div>

        {/* 🌟 Premium Interactive CTA Button */}
        <div className="mt-6">
          <ApplyButton opportunity={opportunity} />
        </div>
      </div>
    </>
  );
}
