import React, { Suspense } from "react";
import BrowseOpportunities from "./BrowseOpportunities";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-80 h-80 rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute w-60 h-60 rounded-full bg-violet-500/15 blur-[100px] pointer-events-none" />
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-indigo-500/20 border-t-indigo-400 animate-spin shadow-[0_0_25px_rgba(99,102,241,0.5)]" />
        <div className="absolute w-10 h-10 rounded-full border-2 border-violet-500/20 border-b-violet-300 animate-[spin_1.5s_linear_infinite_reverse] shadow-[0_0_20px_rgba(168,85,247,0.5)]" />
        <div className="absolute w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1),0_0_40px_rgba(34,211,238,0.7)] animate-pulse" />
      </div>
    </div>
  );
};

const BrowseOpportunitiesPage = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <BrowseOpportunities />
      </Suspense>
    </div>
  );
};

export default BrowseOpportunitiesPage;
