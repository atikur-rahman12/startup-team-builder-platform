"use client";

import React, { useState, useEffect } from "react";
import { Compass, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import { getAllOpportunities } from "@/lib/api/startups/action";
import OpportunityCard from "./OpportunityCard";
import SearchFilterBar from "@/components/SearchFilterBar";

export default function BrowseOpportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState("");
  const [workType, setWorkType] = useState("");
  const [commitment, setCommitment] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true);
      const data = await getAllOpportunities({
        search,
        workType,
        commitmentLevel: commitment,
      });
      setOpportunities(data);
      setCurrentPage(1);
      setLoading(false);
    };

    const delayDebounceFn = setTimeout(() => {
      fetchFilteredData();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search, workType, commitment]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOpportunities = opportunities.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(opportunities.length / itemsPerPage);

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 py-20 text-slate-100">
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-600/10 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-600/10 blur-[140px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400">
            <Compass size={12} className="animate-spin-slow" />
            Explore Ecosystem
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Discover{" "}
            <span className="bg-linear-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Startup Opportunities
            </span>
          </h1>

          <p className="mx-auto max-w-2xl mb-8 text-sm font-medium text-slate-400 sm:text-lg">
            Find premium roles, equity-based gigs, and remote positions in
            hyper-growth startups.
          </p>
        </div>

        <SearchFilterBar
          search={search}
          setSearch={setSearch}
          workType={workType}
          setWorkType={setWorkType}
          commitment={commitment}
          setCommitment={setCommitment}
        />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 rounded-full border-2 border-indigo-500/20 border-t-indigo-400 animate-spin" />
          </div>
        ) : opportunities.length === 0 ? (
          <div className="mx-auto flex max-w-xl flex-col mt-8 items-center justify-center space-y-4 rounded-3xl border border-white/5 bg-slate-900/40 p-8 text-center shadow-2xl backdrop-blur-md">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-500">
              <Layers size={36} />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">
                No Active Roles Found
              </h3>

              <p className="text-sm leading-relaxed text-slate-400">
                Currently, there are no active startup opportunities matching
                your criteria.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Opportunities Grid */}
            <div className="grid w-full mt-8 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {currentOpportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity._id?.toString()}
                  opportunity={opportunity}
                />
              ))}
            </div>

            {/* 🌟 Pagination UI */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 text-slate-400 transition-all hover:border-indigo-500/50 hover:text-white disabled:pointer-events-none disabled:opacity-40"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`flex size-10 items-center justify-center rounded-xl border text-xs font-bold transition-all ${
                        currentPage === pageNumber
                          ? "border-indigo-500 bg-indigo-500/20 text-indigo-400"
                          : "border-white/5 bg-slate-900/40 text-slate-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ),
                )}

                {/* Next Button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 text-slate-400 transition-all hover:border-indigo-500/50 hover:text-white disabled:pointer-events-none disabled:opacity-40"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
