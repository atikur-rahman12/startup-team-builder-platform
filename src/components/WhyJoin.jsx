import React from "react";
import { Globe, BarChart3, Users, ArrowRight } from "lucide-react";

const WhyJoin = () => {
  // Mock Data for Features
  const benefits = [
    {
      title: "Premium Venture Network",
      description:
        "Get direct access to top-tier venture capitalists and angel investors who are actively looking for the next big thing.",
      icon: <Globe size={24} className="text-violet-400" />,
    },
    {
      title: "Cutting-Edge Analytics",
      description:
        "Track your startup's growth, pitching performance, and investor engagement with our real-time smart dashboard.",
      icon: <BarChart3 size={24} className="text-cyan-400" />,
    },
    {
      title: "Founder-First Ecosystem",
      description:
        "Collaborate with brilliant minds, join exclusive masterclasses, and get resources designed to fast-track your launch.",
      icon: <Users size={24} className="text-indigo-400" />,
    },
  ];

  return (
    <section className="bg-slate-950 w-full py-20 sm:py-28 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Why Visionaries Choose{" "}
            <span className="bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              StartupForge
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 mt-4 leading-relaxed">
            We provide more than just tools. We provide the unfair advantage you
            need to dominate the market.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative group flex flex-col justify-between rounded-2xl border border-white/5 bg-linear-to-b from-white/[0.03] to-transparent p-8 transition-all duration-300 hover:border-white/10"
            >
              <div>
                {/* Icon container with hover animation */}
                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 mb-6 group-hover:scale-105 transition-transform duration-300 shadow-inner">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  {benefit.description}
                </p>
              </div>

              <div className="mt-6 pt-4 flex items-center gap-1.5 text-xs font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors duration-200 cursor-pointer">
                <span>Learn more</span>
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoin;
