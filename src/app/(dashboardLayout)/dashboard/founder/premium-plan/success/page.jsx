"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const PaymentSuccess = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    toast.success("Payment Completed Successfully!", {
      duration: 4000,
      position: "top-center",

      style: {
        background: "#0f172a", // slate-900
        color: "#fff",
        border: "1px border rgba(255,255,255,0.1)",
        borderRadius: "14px",
        fontSize: "14px",
      },
      iconTheme: {
        primary: "#10b981", // emerald-500
        secondary: "#fff",
      },
    });
  }, []);

  const handleDashboardRedirect = (e) => {
    e.preventDefault();
    setIsRedirecting(true);

    router.push("/dashboard/founder");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4 antialiased">
      <Toaster />

      <div className="relative w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl text-center overflow-hidden animate-fade-in">
        {/* Glow Effect Background */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Success Icon Animation Wrapper */}
        <div className="flex justify-center mb-6">
          <div className="relative flex items-center justify-center w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.2)] animate-bounce-slow">
            <svg
              className="w-10 h-10 text-emerald-400 stroke-[2.5]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
                className="animate-dash"
              />
            </svg>
          </div>
        </div>

        {/* Header Text */}
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
          Payment Successful!
        </h1>
        <p className="text-slate-400 text-sm mb-8 px-4">
          Thank you for your purchase. Your transaction has been completed
          successfully.
        </p>

        {/* Transaction Details Box */}
        <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-5 mb-8 text-left space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 font-medium">Amount Paid</span>
            <span className="text-emerald-400 font-bold text-base">
              $49.00 USD
            </span>
          </div>
          <div className="h-px bg-white/5 w-full"></div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 font-medium">Transaction ID</span>
            <span className="text-slate-200 font-mono text-xs select-all cursor-pointer hover:text-indigo-400 transition-colors">
              TXN-984321765-X
            </span>
          </div>
          <div className="h-px bg-white/5 w-full"></div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 font-medium">Payment Method</span>
            <span className="text-slate-200 font-medium flex items-center gap-1.5">
              💳 Visa ending in 4242
            </span>
          </div>
        </div>

        {/* Action Buttons with Loading Mechanism */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDashboardRedirect}
            disabled={isRedirecting}
            className={`group relative flex-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 transform active:scale-[0.98] text-sm overflow-hidden flex items-center justify-center gap-2 cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed
              ${
                isRedirecting
                  ? "shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                  : "shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_35px_rgba(168,85,247,0.4)]"
              }`}
          >
            {/* শাইন অ্যানিমেশন (লোডিং না থাকলে দেখাবে) */}
            {!isRedirecting && (
              <div className="absolute inset-0 w-1/2 h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:animate-shine" />
            )}

            {isRedirecting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span className="relative z-10">Loading Dashboard...</span>
              </>
            ) : (
              <>
                <span className="relative z-10">Go to Dashboard</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
              </>
            )}
          </button>
        </div>

        {/* Support Link */}
        <p className="mt-8 text-xs text-slate-500">
          Having trouble?{" "}
          <a
            href="#support"
            className="text-indigo-400 hover:underline transition-all"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
