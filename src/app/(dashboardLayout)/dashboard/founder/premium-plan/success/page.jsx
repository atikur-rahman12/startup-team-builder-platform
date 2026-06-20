import { ArrowRight, Crown, Loader2 } from "lucide-react";
import { stripe } from "@/lib/stripe";

import Link from "next/link";
import PaymentSuccessToast from "@/components/PaymentSuccessToast";
import { upgradeToPremium } from "@/lib/api/startups/action";
import { Toaster } from "react-hot-toast";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (session.payment_status === "paid") {
    await upgradeToPremium(session.customer_email);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4 antialiased">
      {/* 👇 ADD TOASTER HERE */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0f172a",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />
      <PaymentSuccessToast />

      {/* Main Card */}
      <div className="relative w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl text-center overflow-hidden animate-fade-in">
        {/* Glow Effect Background */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-2xl animate-pulse" />

            {/* Circle */}
            <div className="relative flex items-center justify-center w-24 h-24 rounded-full border border-amber-400/30 bg-linear-to-br from-amber-400/15 via-yellow-300/10 to-transparent backdrop-blur-xl shadow-[0_0_40px_rgba(251,191,36,0.25)]">
              <Crown
                size={42}
                className="text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.7)] animate-float"
              />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3">
          Welcome to Premium ✨
        </h1>

        <p className="text-slate-300 text-lg leading-relaxed">
          Hi,
          <span className="font-semibold text-white">
            {" "}
            {session.customer_email}
          </span>
        </p>

        <p className="text-slate-400 text-sm leading-7 max-w-md mx-auto mt-5 mb-2">
          Thank you for your purchase. Your Premium membership is now active,
          giving you instant access to all exclusive features, priority
          services, and future updates. We're excited to have you with us!
        </p>

        {/* Transaction Details */}
        <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-5 mb-8 text-left space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 font-medium">Amount Paid</span>
            <span className="text-emerald-400 font-bold text-base">
              $49.00 USD
            </span>
          </div>
          <div className="h-px bg-white/5 w-full"></div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 font-medium">Payment Status</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1.5">
              Completed
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={"/dashboard/founder"}
            className="group relative flex-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 transform active:scale-[0.98] text-sm overflow-hidden flex items-center justify-center gap-2 cursor-pointer "
          >
            <span className="relative z-10">Go to Dashboard</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
          </Link>
        </div>

        <p className="mt-8 text-xs text-slate-500">
          Having trouble?{" "}
          <a
            href="mailto:orders@example.com"
            className="text-indigo-400 hover:underline transition-all"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
