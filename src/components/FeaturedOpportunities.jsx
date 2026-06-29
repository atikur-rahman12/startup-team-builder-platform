import React from "react";
import {
  Compass,
  Layers,
  Briefcase,
  Calendar,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import { getAllOpportunities } from "@/lib/api/startups/action";
import Link from "next/link";
import OpportunityCard from "@/app/(mainLayout)/browse-opportunities/OpportunityCard";

export default async function FeaturedOpportunities() {
  const allOpportunities = await getAllOpportunities({});

  const featuredOpportunities = allOpportunities
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <section className="relative w-full bg-slate-950 text-slate-100 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Glows Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 sm:w-125 h-75 sm:h-125 rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10 w-full">
        {/* Centered Header Section */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 backdrop-blur-md shadow-lg shadow-black/20">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
            <span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent font-semibold">
              Trending Roles
            </span>
            <div className="h-3 w-px bg-white/10 mx-1" />
            <span className="text-slate-400 flex items-center gap-0.5">
              Featured <Zap size={12} className="text-amber-400 fill-current" />
            </span>
          </div>

          {/* Headings */}
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Explore Hot{" "}
            <span className="bg-linear-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Opportunities
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-medium max-w-xl leading-relaxed">
            Apply to the most anticipated roles and equity-based gigs before the
            deadline closes.
          </p>
        </div>

        {/* Opportunities Logic Display */}
        {featuredOpportunities.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center bg-white/5 border border-white/10 p-8 rounded-2xl max-w-xl mx-auto backdrop-blur-md space-y-4">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-400">
              <Layers size={32} />
            </div>
            <p className="text-sm text-slate-400">
              No featured opportunities available right now.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Grid layout matching Browse Page for exactly 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredOpportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity._id?.toString()}
                  opportunity={opportunity}
                />
              ))}
            </div>

            {/* "View All Opportunities" Redirection Button at Bottom Center */}
            <div className="flex justify-center pt-4">
              <Link
                href="/browse-opportunities"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/20 text-sm font-semibold text-slate-300 hover:text-white backdrop-blur-md transition-all duration-300 shadow-lg shadow-black/30"
              >
                Browse All Opportunities
                <ArrowUpRight
                  size={16}
                  className="text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
