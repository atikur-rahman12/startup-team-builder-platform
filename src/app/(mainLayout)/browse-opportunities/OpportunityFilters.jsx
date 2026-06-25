"use client";

import React, { useMemo, useState } from "react";
import { Search, BriefcaseBusiness, Clock3, X } from "lucide-react";
import OpportunityCard from "./OpportunityCard";

export default function OpportunityFilters({ opportunities }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [workType, setWorkType] = useState("");
  const [commitmentLevel, setCommitmentLevel] = useState("");

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opportunity) => {
      const title =
        opportunity.title ||
        opportunity.opportunityName ||
        opportunity.role ||
        "";

      const matchesSearch = title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesWorkType =
        !workType ||
        opportunity.workType?.toLowerCase() === workType.toLowerCase();

      const matchesCommitment =
        !commitmentLevel ||
        opportunity.commitmentLevel?.toLowerCase() ===
          commitmentLevel.toLowerCase();

      return matchesSearch && matchesWorkType && matchesCommitment;
    });
  }, [opportunities, searchTerm, workType, commitmentLevel]);

  const clearFilters = () => {
    setSearchTerm("");
    setWorkType("");
    setCommitmentLevel("");
  };

  return (
    <div className="space-y-8">
      {/* Search + Filters */}
      <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-5 backdrop-blur-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              placeholder="Search opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* Work Type */}
          <div className="relative">
            <BriefcaseBusiness
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <select
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 appearance-none"
            >
              <option value="">All Work Types</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          {/* Commitment */}
          <div className="relative">
            <Clock3
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <select
              value={commitmentLevel}
              onChange={(e) => setCommitmentLevel(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 appearance-none"
            >
              <option value="">All Commitment</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contractual">Contractual</option>
              <option value="Equity-Based">Equity-Based</option>
            </select>
          </div>
        </div>

        {(searchTerm || workType || commitmentLevel) && (
          <div className="flex justify-end mt-4">
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition"
            >
              <X size={16} />
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Result Count */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-slate-400 text-sm">
          Showing{" "}
          <span className="font-semibold text-white">
            {filteredOpportunities.length}
          </span>{" "}
          opportunities
        </p>
      </div>

      {/* Cards */}
      {filteredOpportunities.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-slate-700 rounded-3xl">
          <Search size={40} className="text-slate-500 mb-4" />

          <h3 className="text-xl font-bold text-white">
            No Opportunities Found
          </h3>

          <p className="text-slate-400 mt-2">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredOpportunities.map((opportunity) => (
            <OpportunityCard
              key={opportunity._id?.toString()}
              opportunity={opportunity}
            />
          ))}
        </div>
      )}
    </div>
  );
}
