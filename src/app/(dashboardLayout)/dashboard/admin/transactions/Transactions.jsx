"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Zap,
  DollarSign,
  Receipt,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { getAllTransactions } from "@/lib/api/startups/action";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await getAllTransactions();
        setTransactions(data);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  // Total Revenue
  const totalRevenue = useMemo(() => {
    return transactions
      .filter((t) => t.payment_status === "paid")
      .reduce((sum, t) => sum + Number(t.amount), 0)
      .toFixed(2);
  }, [transactions]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">
        <div className="flex flex-col items-center gap-3">
          <span className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></span>
          <p className="text-sm font-medium text-slate-400">
            Loading Transactions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-slate-950 py-12 px-4 sm:px-6 md:px-8 text-white overflow-hidden">
      {/* Background Premium Glow Effects */}
      <div className="absolute top-0 left-1/4 w-125 h-125 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-125 h-125 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto space-y-8">
        {/* Top Header Section */}
        <div className="border-b border-white/5 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                Financial Overview
              </span>
              <div className="h-3 w-px bg-white/10 mx-1" />
              <span className="text-slate-400 flex items-center gap-1">
                StartupForge v2.0
                <Zap size={12} className="text-amber-400 fill-current" />
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Realtime{" "}
              <span className="bg-linear-to-r from-violet-400 via-indigo-200 to-cyan-400 bg-clip-text text-transparent">
                Transactions
              </span>
            </h1>
            <p className="text-slate-400 text-sm mt-2 mb-3">
              {transactions.length} total transactions processed securely.
            </p>
          </div>
        </div>

        {/* Analytics Stats Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Revenue Widget */}
          <div className="relative group bg-slate-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-xl flex items-center justify-between transition-all hover:border-emerald-500/20">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Total Revenue
              </p>
              <h3 className="text-3xl font-black text-white tracking-tight">
                ${totalRevenue}
              </h3>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                <ArrowUpRight size={12} /> Live synchronized
              </p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/5">
              <DollarSign size={24} className="stroke-2" />
            </div>
          </div>

          {/* Volume Widget */}
          <div className="relative group bg-slate-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-xl flex items-center justify-between transition-all hover:border-indigo-500/20">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Total Statements
              </p>
              <h3 className="text-3xl font-black text-white tracking-tight">
                {transactions.length}
              </h3>
              <p className="text-[11px] text-indigo-400 flex items-center gap-1 font-medium">
                All records count
              </p>
            </div>
            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shadow-lg shadow-indigo-500/5">
              <Receipt size={24} className="stroke-2" />
            </div>
          </div>

          {/* Active Campaign Widget */}
          <div className="relative group bg-slate-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-xl flex items-center justify-between transition-all hover:border-cyan-500/20">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Base Gateway
              </p>
              <h3 className="text-2xl font-black bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
                Stripe Premium
              </h3>
              <p className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                Automated Webhooks Active
              </p>
            </div>
            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/5">
              <Zap size={24} className="stroke-2" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Transactions History
        </h1>

        {/* Data Table Grid */}
        <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col min-h-90">
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-white/5 text-xs uppercase text-slate-400">
                    <th className="py-4">User</th>
                    <th className="py-4 text-center">Amount</th>
                    <th className="py-4 text-center">Transaction ID</th>
                    <th className="py-4 text-center">Paid At</th>
                    <th className="py-4 text-center">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-16 text-center">
                        <div className="flex flex-col items-center justify-center space-y-3 max-w-sm mx-auto">
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-indigo-400 shadow-xl">
                            <Receipt size={28} className="stroke-[1.5]" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-base font-bold text-slate-200">
                              No Transactions Found
                            </h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              We couldn't find any transaction history.
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    transactions.map((tx) => (
                      <tr
                        key={tx._id}
                        className="hover:bg-white/2 transition-colors"
                      >
                        {/* USER EMAIL */}
                        <td className="py-4 text-center text-slate-300">
                          {tx.user_email}
                        </td>

                        {/* AMOUNT */}
                        <td className="py-4 text-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-violet-200 text-xs font-semibold capitalize shadow-lg shadow-violet-500/20">
                            ${Number(tx.amount).toFixed(2)}
                          </span>
                        </td>

                        {/* TRANSACTION ID */}
                        <td className="py-4 text-center pl-6 text-slate-400 font-mono text-xs max-w-[320px] truncate group-hover:text-slate-300">
                          {tx.transaction_id}
                        </td>

                        {/* DATE */}
                        <td className="py-4 text-center text-slate-400 text-xs">
                          {new Date(tx.paid_at).toLocaleDateString()}
                        </td>

                        {/* STATUS BADGE */}
                        <td className="py-4 text-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 shadow-sm">
                            <CheckCircle2 size={12} />
                            {tx.payment_status.charAt(0).toUpperCase() +
                              tx.payment_status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
