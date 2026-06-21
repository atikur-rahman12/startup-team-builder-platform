"use client";

import React, { useState } from "react";
import { Briefcase, Calendar, Send } from "lucide-react";
import ApplyModal from "@/components/ApplyModal";
import { useSession } from "@/lib/auth-client";

export default function OpportunitiesList({ opportunities, startupName }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const { data: session } = useSession();

  return (
    <>
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

              {/* Skills */}
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

              {/* Specs */}
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

            {/* Apply Button */}
            <div className="mt-6 pt-4 border-t border-white/5">
              <button
                onClick={() =>
                  setSelectedRole({
                    id: opp._id.toString(),
                    title: opp.roleTitle,
                    startup: startupName,
                  })
                }
                className="w-full relative inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 group overflow-hidden"
              >
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

      {/* Dynamic Modal render */}
      <ApplyModal
        isOpen={!!selectedRole}
        onClose={() => setSelectedRole(null)}
        roleTitle={selectedRole?.title}
        startupName={selectedRole?.startup}
        opportunityId={selectedRole?.id}
        user={session?.user}
      />
    </>
  );
}
