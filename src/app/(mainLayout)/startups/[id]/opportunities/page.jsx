import React from "react";
import { Layers, ArrowLeft } from "lucide-react";
import { getOpportunitiesByStartupId } from "@/lib/api/startups/action";
import Link from "next/link";
import Image from "next/image";
import OpportunitiesList from "./OpportunitiesList"; // Adjust path if needed

export default async function StartupOpportunitiesPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  console.log("Fetching opportunities for Startup ID:", id);
  const opportunities = await getOpportunitiesByStartupId(id);

  const startupName =
    opportunities.length > 0 ? opportunities[0].startupName : "Startup";
  const startupLogo = opportunities?.[0]?.startupLogo || null;

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
            <div className="size-20 mb-4 sm:mb-0 rounded-2xl bg-slate-900 border border-white/10 p-3 shadow-xl shrink-0 flex items-center justify-center">
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
            <p className="text-slate-400 text-sm font-medium">
              Join our mission and co-create the future of next-gen technology.
            </p>
          </div>
        </div>

        {/* Opportunities Wrapper */}
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
          /* Client side wrapper handles interactive modals */
          <OpportunitiesList
            opportunities={opportunities}
            startupName={startupName}
          />
        )}
      </div>
    </div>
  );
}
