import React from "react";
import { Briefcase, Calendar, Layers, ArrowLeft, Send } from "lucide-react";
import { getOpportunitiesByStartupId } from "@/lib/api/startups/action";
import Link from "next/link";
import Image from "next/image";

export default async function StartupOpportunitiesPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  console.log("Fetching opportunities for Startup ID:", id);
  const opportunities = await getOpportunitiesByStartupId(id);

  const startupName =
    opportunities.length > 0 ? opportunities[0].startupName : "Startup";
  const startupLogo =
    opportunities.length > 0 ? opportunities[0].startupLogo : null;

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10 w-full">
        {/* Back to Directory Button */}
        <Link
          href="/browse-startups"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Startups
        </Link>

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-white/10 pb-10">
          {startupLogo && (
            <div className="size-20 mb-4 rounded-2xl bg-slate-900 border border-white/10 p-3 shadow-xl shrink-0 flex items-center justify-center">
              <Image
                src={startupLogo}
                alt={`${startupName} logo`}
                width={150}
                height={150}
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
          )}
          <div className="text-center sm:text-left space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Opportunities at{" "}
              <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                {startupName}
              </span>
            </h1>
            <p className="text-slate-400 mb-3 text-sm font-medium">
              Join our mission and co-create the future of next-gen technology.
            </p>
          </div>
        </div>

        {/* Opportunities List/Grid */}
        {opportunities.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center bg-white/5 border border-white/10 p-12 rounded-2xl max-w-xl mx-auto backdrop-blur-md space-y-4">
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400">
              <Layers size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">
                No Open Positions
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                This startup hasn't deployed any active opportunities or roles
                at this moment.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {opportunities.map((opp) => (
              <div
                key={opp._id.toString()}
                className="group bg-slate-900/40 border border-white/5 hover:border-indigo-500/20 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-md shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="space-y-4">
                  <div>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md uppercase tracking-wider">
                      {opp.workType}
                    </span>
                    <h2 className="text-xl font-bold text-white mt-2 group-hover:text-indigo-400 transition-colors">
                      {opp.roleTitle}
                    </h2>
                  </div>

                  {/* Skills Tag Cloud */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {opp.requiredSkills ? (
                      opp.requiredSkills.split(",").map((skill, index) => (
                        <span
                          key={index}
                          className="text-[11px] bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg text-slate-300 font-medium"
                        >
                          {skill.trim()}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-slate-500">
                        No skills listed
                      </span>
                    )}
                  </div>

                  <div className="h-px bg-white/5" />

                  {/* Meta Specs */}
                  <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-slate-400">
                    <div className="flex items-center gap-2">
                      <Briefcase size={14} className="text-slate-500" />
                      <span>{opp.commitmentLevel}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-end text-right">
                      <Calendar size={14} className="text-slate-500" />
                      <span>
                        Deadline:{" "}
                        {opp.deadline
                          ? new Date(opp.deadline).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Apply Trigger */}
                <div className="mt-6 pt-4 border-t border-white/5">
                  <button className="w-full relative inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 group overflow-hidden">
                    <Send
                      size={16}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                    Apply for this Role
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
