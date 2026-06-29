import React from "react";
import {
  Briefcase,
  Coins,
  Mail,
  ArrowUpRight,
  Layers,
  Zap,
} from "lucide-react";
import { getAllApprovedStartups } from "@/lib/api/startups/action";
import Image from "next/image";
import Link from "next/link";

export default async function FeaturedStartups() {
  const allStartups = await getAllApprovedStartups();

  const featuredStartups = allStartups
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <section className="relative w-full bg-slate-950 text-slate-100 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 sm:w-125 h-75 sm:h-125 rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10 w-full">
        <div className="flex flex-col items-center text-center mb-8 max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 backdrop-blur-md shadow-lg shadow-black/20">
            <span className="flex h-2 w-2 rounded-full bg-violet-500 animate-ping" />
            <span className="bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent font-semibold">
              Featured Startups
            </span>
            <div className="h-3 w-px bg-white/10 mx-1" />
            <span className="text-slate-400 flex items-center gap-0.5">
              Top Vetted{" "}
              <Zap size={12} className="text-amber-400 fill-current" />
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Latest{" "}
            <span className="bg-linear-to-r from-violet-400 via-indigo-200 to-cyan-400 bg-clip-text text-transparent">
              Startups
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-medium max-w-xl leading-relaxed">
            Explore the latest and most promising tech projects vetted by our
            network.
          </p>
        </div>

        {featuredStartups.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center bg-white/5 border border-white/10 p-8 rounded-2xl max-w-xl mx-auto backdrop-blur-md space-y-4">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-400">
              <Layers size={32} />
            </div>
            <p className="text-sm text-slate-400">
              No featured startups available right now.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredStartups.map((startup) => (
                <div
                  key={startup._id.toString()}
                  className="group bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-black/40 backdrop-blur-md"
                >
                  <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-600/5 blur-2xl rounded-full pointer-events-none group-hover:bg-indigo-600/10 transition-all duration-300" />

                  <div className="space-y-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="size-16 rounded-xl bg-slate-950 border border-white/10 p-2.5 shrink-0 flex items-center justify-center shadow-lg shadow-black/50 group-hover:scale-105 group-hover:border-indigo-500/30 transition-all duration-300">
                        <Image
                          src={startup.logo}
                          alt={`${startup.startupName} logo`}
                          width={250}
                          height={250}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        <span className="px-2.5 py-0.5 text-[9px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md uppercase tracking-wider">
                          New
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors duration-200 truncate">
                          {startup.startupName}
                        </h3>
                        <ArrowUpRight
                          size={16}
                          className="text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                        />
                      </div>
                      <p className="text-slate-400 text-sm font-medium leading-relaxed line-clamp-3 group-hover:text-slate-300 transition-colors duration-200">
                        {startup.description}
                      </p>
                    </div>

                    <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

                    {/* Metadata Tags */}
                    <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-400">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/5 rounded-xl">
                        <Briefcase size={13} className="text-slate-500" />
                        <span>{startup.industry}</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/5 border border-indigo-500/10 rounded-xl">
                        <Coins size={13} className="text-indigo-400/80" />
                        <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                          {startup.fundingStage}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-slate-400">
                    <a
                      href={`mailto:${startup.founderEmail}`}
                      className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                    >
                      <Mail size={14} className="text-slate-500" />
                      <span className="max-w-30 truncate">
                        {startup.founderEmail}
                      </span>
                    </a>

                    <Link href={"/browse-opportunities"}>
                      <button className="group/btn relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/3 hover:bg-indigo-500/10 border border-white/10 hover:border-indigo-500/30 text-slate-300 hover:text-indigo-400 font-medium tracking-wide backdrop-blur-md shadow-lg shadow-black/20 transition-all duration-300 cursor-pointer overflow-hidden">
                        <span>Explore Now</span>
                        <ArrowUpRight
                          size={13}
                          className="text-slate-500 group-hover/btn:text-indigo-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all duration-300 ease-out"
                        />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-4">
              <Link
                href="/browse-startups"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/20 text-sm font-semibold text-slate-300 hover:text-white backdrop-blur-md transition-all duration-300 shadow-lg shadow-black/30"
              >
                View All Startups
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
