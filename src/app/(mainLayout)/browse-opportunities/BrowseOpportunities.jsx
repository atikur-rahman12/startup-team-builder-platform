import React from "react";
import { Layers, Compass } from "lucide-react";
import { getAllOpportunities } from "@/lib/api/startups/action";
import OpportunityFilters from "./OpportunityFilters";

export default async function BrowseOpportunities() {
  const opportunities = await getAllOpportunities();

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 py-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-150 h-150 rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-125 h-125 rounded-full bg-violet-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Compass size={12} />
            Explore Ecosystem
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

        {opportunities.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center bg-slate-900/40 border border-white/5 p-16 rounded-3xl max-w-xl mx-auto backdrop-blur-md space-y-4 shadow-2xl">
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-500">
              <Layers size={36} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">
                No Active Roles Found
              </h3>

              <p className="text-sm text-slate-400">
                Currently, there are no active startup opportunities listed.
                Check back shortly!
              </p>
            </div>
          </div>
        ) : (
          <OpportunityFilters opportunities={opportunities} />
        )}
      </div>
    </div>
  );
}
