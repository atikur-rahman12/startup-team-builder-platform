"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Check,
  ArrowRight,
  ShieldCheck,
  Crown,
  ChevronDown,
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

  // FAQ Data
  const faqs = [
    {
      q: "Can I cancel my subscription anytime?",
      a: "Yes, you can cancel your subscription at any time from your dashboard settings.",
    },
    {
      q: "Is there a money-back guarantee?",
      a: "We offer a 14-day money-back guarantee if you are not satisfied with the Pro features.",
    },
    {
      q: "Does the plan include team access?",
      a: "Yes, Pro plan includes up to 5 team members to manage your venture.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-12">
      {/* Card Container */}
      <div className="relative w-full max-w-md p-1 rounded-3xl bg-linear-to-b from-indigo-500 via-purple-500 to-pink-500 shadow-2xl shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-1">
        <div className="relative h-full w-full bg-zinc-950/90 rounded-[22px] p-6 sm:p-8 backdrop-blur-xl overflow-hidden flex flex-col">
          {/* Header Content & Features */}
          <div className="absolute top-0 right-0 mt-6 mr-6">
            <span className="badge border-indigo-500/30 bg-indigo-500/10 text-indigo-400 font-extrabold gap-1 px-3 py-3 uppercase tracking-wider text-[10px]">
              <Crown size={12} className="text-indigo-400 animate-pulse" /> Most
              Popular
            </span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-linear-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-400">
              <Sparkles size={20} className="animate-pulse" />
            </div>
            <h3 className="text-xl font-black text-zinc-100 tracking-tight">
              Pro Ecosystem
            </h3>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed font-medium mb-6">
            Scale your startup incubator with complete automation.
          </p>

          <div className="my-2 flex items-baseline gap-1.5 border-b border-zinc-800/60 pb-6">
            <span className="text-4xl font-black text-zinc-100">$49</span>
            <span className="text-xs text-zinc-500 font-semibold uppercase">
              / Month
            </span>
          </div>

          <div className="space-y-3.5 my-6">
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="p-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <Check size={14} strokeWidth={3} />
                </div>
                <span className="text-xs font-medium text-zinc-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <form action="/api/checkout_sessions" method="POST">
            <section>
              <button
                type="submit"
                role="link"
                className="btn w-full font-bold text-xs rounded-xl border-none bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 text-zinc-50 h-12"
              >
                Upgrade Now <ArrowRight size={14} />
              </button>
            </section>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-lg space-y-4">
        <h4 className="text-center text-sm font-bold text-zinc-100 mb-6">
          Frequently Asked Questions
        </h4>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/30"
          >
            <button
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
              className="w-full flex items-center justify-between p-4 text-xs font-bold text-zinc-300 hover:bg-zinc-800/50 transition-all"
            >
              {faq.q}
              <ChevronDown
                size={14}
                className={`transition-transform ${activeIndex === index ? "rotate-180" : ""}`}
              />
            </button>
            {activeIndex === index && (
              <div className="p-4 pt-0 text-[11px] text-zinc-500 leading-relaxed border-t border-zinc-800/50 bg-zinc-900/50">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumPlanCard;
