import React from "react";
import { Rocket, Target, Users, ShieldCheck } from "lucide-react";

const Statistics = () => {
  // Mock Data for Statistics
  const stats = [
    {
      id: 1,
      value: "$45M+",
      label: "Total Funding Raised",
      icon: <Target className="text-cyan-400" size={20} />,
      description: "By startups forged on our platform",
    },
    {
      id: 2,
      value: "1,200+",
      label: "Active Startups",
      icon: <Rocket className="text-violet-400" size={20} />,
      description: "Building & scaling right now",
    },
    {
      id: 3,
      value: "25K+",
      label: "Global Investors",
      icon: <Users className="text-indigo-400" size={20} />,
      description: "Ready to back next-gen ideas",
    },
    {
      id: 4,
      value: "94%",
      label: "Success Rate",
      icon: <ShieldCheck className="text-emerald-400" size={20} />,
      description: "From incubation to seed funding",
    },
  ];

  return (
    <section className="bg-slate-950 w-full py-16 sm:py-24 relative overflow-hidden">
      {/* Subtle Grid Line Mask Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px)] bg-[size:40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* --- নতুন যুক্ত করা হয়েছে: Section Title Block --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Our Ecosystem In{" "}
            <span className="bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Numbers
            </span>
          </h2>
          <p className="text-base text-slate-400 mt-3 leading-relaxed">
            Real impact, tangible growth, and unmatched success across the
            global startup landscape.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="relative group rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] p-6 transition-all duration-300 backdrop-blur-md overflow-hidden hover:border-white/10"
            >
              {/* Hover Interactive Glow */}
              <div className="absolute -inset-px bg-linear-to-r from-violet-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/5">
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {stat.value}
              </h3>
              <p className="text-sm font-semibold text-slate-200 mt-1">
                {stat.label}
              </p>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
