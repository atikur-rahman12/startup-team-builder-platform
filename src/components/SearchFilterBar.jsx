"use client";

import React from "react";

export default function SearchFilterBar({
  search,
  setSearch,
  workType,
  setWorkType,
  commitment,
  setCommitment,
}) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-4">
      <div className="flex flex-col md:flex-row gap-4 p-3 bg-slate-900/50 backdrop-blur-xl shadow-2xl">
        {/* Search Input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by role title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-slate-950 border border-white/5 text-sm font-medium text-slate-200 placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
          />
        </div>

        {/* Filters Group */}
        <div className="flex gap-3 sm:flex-nowrap flex-wrap">
          {/* Work Type Filter */}
          <select
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
            className="h-12 px-4 rounded-xl bg-slate-950 border border-white/5 text-sm font-medium text-slate-300 outline-none focus:border-indigo-500/50 transition-all cursor-pointer min-w-35 flex-1 sm:flex-none"
          >
            <option value="">All Work Types</option>
            <option value="Remote">Remote</option>
            <option value="On-site">Onsite</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          {/* Commitment Level Filter */}
          <select
            value={commitment}
            onChange={(e) => setCommitment(e.target.value)}
            className="h-12 px-4 rounded-xl bg-slate-950 border border-white/5 text-sm font-medium text-slate-300 outline-none focus:border-indigo-500/50 transition-all cursor-pointer min-w-40 flex-1 sm:flex-none"
          >
            <option value="">All Commitments</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contractual">Contract</option>
            <option value="Equity-Based">Equity-Based</option>
          </select>
        </div>
      </div>
    </div>
  );
}
