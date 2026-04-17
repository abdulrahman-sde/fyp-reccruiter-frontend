"use client";
import { Badge } from "@/components/ui/badge";

export default function ReportsPage() {
  const metrics = [
    { label: "Time to Hire", value: "14 days", trend: "-20%", positive: true },
    { label: "AI Match Accuracy", value: "94%", trend: "+5%", positive: true },
    { label: "Cost per Hire", value: "$4.2k", trend: "-12%", positive: true },
    { label: "Offer Acceptance", value: "88%", trend: "-2%", positive: false },
  ];

  const sourceData = [
    { source: "LinkedIn", applicants: 450, hires: 12, efficiency: "2.6%" },
    { source: "Direct Referral", applicants: 85, hires: 9, efficiency: "10.5%" },
    { source: "AI Sourcing Engine", applicants: 320, hires: 28, efficiency: "8.7%" },
    { source: "Career Site", applicants: 610, hires: 5, efficiency: "0.8%" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-medium tracking-tight mb-2">Hiring Intelligence</h1>
          <p className="text-white/50 font-light">Global recruiting analytics driven by AI recommendations.</p>
        </div>
        <div className="hidden md:flex bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-xl">
          <button className="px-4 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-400/10 rounded-full">30 Days</button>
          <button className="px-4 py-1.5 text-xs font-medium text-white/50 hover:text-white/90 transition-colors">Quarter</button>
          <button className="px-4 py-1.5 text-xs font-medium text-white/50 hover:text-white/90 transition-colors">Year</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 animate-fade-in-up animation-delay-100">
        {metrics.map((m, i) => (
          <div key={i} className="p-1 rounded-[1.5rem] bg-white/[0.02] border border-white/[0.05] ring-1 ring-white/[0.02] backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="h-full rounded-[calc(1.5rem-0.25rem)] bg-black/20 p-5 md:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-widest text-white/40 mb-4 block group-hover:text-white/60 transition-colors">{m.label}</span>
              <div className="flex items-end justify-between">
                <span className="text-2xl md:text-3xl font-medium text-white tracking-tight">{m.value}</span>
                <span className={`text-xs font-medium ${m.positive ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]' : 'text-red-400'}`}>
                  {m.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up animation-delay-200">
        {/* Faux Graph Area */}
        <div className="lg:col-span-2 p-1 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] ring-1 ring-white/[0.02] backdrop-blur-xl group">
          <div className="h-full min-h-[350px] rounded-[calc(2rem-0.25rem)] bg-gradient-to-b from-white/[0.03] to-transparent p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col">
            <div className="flex justify-between items-start mb-8">
               <h2 className="text-xl font-medium text-white">Candidates vs AI Matches</h2>
               <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs py-1">Optimal Conversion</Badge>
            </div>
            
            {/* Abstract chart visualization */}
            <div className="flex-1 mt-auto relative border-b border-white/10 flex items-end justify-between px-2 pt-12 pb-0 gap-2">
               {/* Grid lines */}
               <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-0">
                 {[1,2,3,4].map(i => <div key={i} className="w-full border-t border-white/5" />)}
               </div>

               {/* Bars */}
               {[40, 65, 45, 80, 95, 75, 100].map((h, i) => (
                 <div key={i} className="relative w-full flex justify-center group/bar">
                   <div className="absolute bottom-0 w-8 md:w-12 bg-white/5 rounded-t-lg transition-all duration-500 group-hover/bar:bg-white/10" style={{ height: `${h}%` }} />
                   <div className="absolute bottom-0 w-8 md:w-12 bg-gradient-to-t from-emerald-500/80 to-emerald-400 rounded-t-lg transition-all duration-700 shadow-[0_0_15px_rgba(16,185,129,0.3)] origin-bottom animate-fade-in-up" style={{ height: `${h * 0.4}%`, animationDelay: `${i * 100}ms` }} />
                 </div>
               ))}
            </div>
            <div className="flex justify-between mt-4 px-4 text-[10px] text-white/30 uppercase tracking-widest">
               <span>Mon</span>
               <span>Tue</span>
               <span>Wed</span>
               <span>Thu</span>
               <span>Fri</span>
               <span>Sat</span>
               <span>Sun</span>
            </div>
          </div>
        </div>

        {/* Source Table */}
        <div className="p-1 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] ring-1 ring-white/[0.02] backdrop-blur-xl">
          <div className="h-full rounded-[calc(2rem-0.25rem)] bg-gradient-to-b from-white/[0.03] to-transparent p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <h2 className="text-xl font-medium text-white mb-6">Source Performance</h2>
            <div className="space-y-4">
              {sourceData.map((src, i) => (
                <div key={i} className="p-4 rounded-[1rem] bg-black/20 border border-white/5 hover:bg-white/5 transition-colors cursor-default">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-white/90">{src.source}</span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">{src.efficiency} Rate</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-light text-white/40">
                    <span>{src.applicants} App</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-white/70">{src.hires} Hires</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
