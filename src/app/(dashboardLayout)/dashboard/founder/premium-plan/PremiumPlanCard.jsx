"use client";

import React from "react";
import {
  Sparkles,
  Check,
  ArrowRight,
  Zap,
  ShieldCheck,
  Crown,
} from "lucide-react";

const PremiumPlanCard = () => {
  const premiumFeatures = [
    "Unlimited Workspace Opportunities",
    "Advanced AI Applicant Matching",
    "Real-time Analytics & Deep Insights",
    "Automated Email Follow-ups",
    "Priority 24/7 Founder Support",
    "Custom Branding & White-labeling",
  ];

  return (
    <div className="flex items-center justify-center p-4">
      {/* Card Container */}
      <div className="relative w-full max-w-md p-1 rounded-3xl bg-linear-to-b from-indigo-500 via-purple-500 to-pink-500 shadow-2xl shadow-indigo-500/10 hover:shadow-purple-500/20 transition-all duration-500 group hover:-translate-y-1">
        {/* Decorative Background Glows */}
        <div className="absolute -inset-4 bg-linear-to-r from-indigo-500 to-pink-500 rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />

        {/* Inner Card (Glassmorphism Look) */}
        <div className="relative h-full w-full bg-zinc-950/90 rounded-[22px] p-6 sm:p-8 backdrop-blur-xl overflow-hidden flex flex-col justify-between">
          {/* Top Premium Badge */}
          <div className="absolute top-0 right-0 mt-6 mr-6">
            <span className="badge border-indigo-500/30 bg-indigo-500/10 text-indigo-400 font-extrabold gap-1 px-3 py-3 uppercase tracking-wider text-[10px]">
              <Crown size={12} className="text-indigo-400 animate-pulse" /> Most
              Popular
            </span>
          </div>

          {/* Header Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-linear-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-400">
                <Sparkles size={20} className="animate-pulse" />
              </div>
              <h3 className="text-xl font-black text-zinc-100 tracking-tight">
                Pro Ecosystem
              </h3>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-medium max-w-[80%]">
              Scale your startup incubator with complete automation and deep
              metrics.
            </p>

            {/* Pricing Section */}
            <div className="my-6 flex items-baseline gap-1.5 border-b border-zinc-800/60 pb-6">
              <span className="text-4xl font-black text-zinc-100 tracking-tight">
                $49
              </span>
              <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">
                / Month
              </span>
            </div>

            {/* Features List */}
            <div className="space-y-3.5 mb-8">
              <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">
                What's Included
              </p>

              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 group/item">
                  <div className="p-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span className="text-xs font-medium text-zinc-300 group-hover/item:text-zinc-100 transition-colors duration-200">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button (DaisyUI Component Modified) */}
          <div className="space-y-3">
            <button className="btn w-full normal-case font-bold text-xs rounded-xl border-none bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-zinc-50 shadow-lg shadow-indigo-500/20 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 h-12 min-h-12">
              Upgrade Now <ArrowRight size={14} strokeWidth={2.5} />
            </button>

            {/* Guarantee Tag */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500 font-medium">
              <ShieldCheck size={12} className="text-zinc-500" />
              <span>Cancel anytime. 14-day money-back guarantee.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlanCard;
