"use client";

import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const weeklyData = [
  { day: "Mon", applicants: 40, aiMatches: 16 },
  { day: "Tue", applicants: 65, aiMatches: 28 },
  { day: "Wed", applicants: 45, aiMatches: 19 },
  { day: "Thu", applicants: 80, aiMatches: 38 },
  { day: "Fri", applicants: 95, aiMatches: 47 },
  { day: "Sat", applicants: 75, aiMatches: 35 },
  { day: "Sun", applicants: 100, aiMatches: 52 },
];

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

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-950/95 p-3 shadow-xl backdrop-blur-xl">
      <div className="mb-2 text-[10px] uppercase tracking-widest text-white/40">{label}</div>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-xs">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          <span className="text-white/60">{p.name}:</span>
          <span className="font-medium text-white">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function ReportsPage() {
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

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 animate-fade-in-up animation-delay-100">
        {metrics.map((m, i) => (
          <div key={i} className="p-1 rounded-[1.5rem] bg-white/[0.02] border border-white/[0.05] ring-1 ring-white/[0.02] backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="h-full rounded-[calc(1.5rem-0.25rem)] bg-black/20 p-5 md:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-widest text-white/40 mb-4 block">{m.label}</span>
              <div className="flex items-end justify-between">
                <span className="text-2xl md:text-3xl font-medium text-white tracking-tight">{m.value}</span>
                <span className={`text-xs font-medium ${m.positive ? "text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]" : "text-red-400"}`}>
                  {m.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up animation-delay-200">
        {/* Real Bar Chart */}
        <div className="lg:col-span-2 p-1 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] ring-1 ring-white/[0.02] backdrop-blur-xl group">
          <div className="h-full min-h-[350px] rounded-[calc(2rem-0.25rem)] bg-gradient-to-b from-white/[0.03] to-transparent p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col">
            <div className="flex justify-between items-start mb-8">
              <h2 className="text-xl font-medium text-white">Candidates vs AI Matches</h2>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs py-1">
                Optimal Conversion
              </Badge>
            </div>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={weeklyData} barGap={4} barCategoryGap="30%">
                  <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
                    width={28}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                  <Legend
                    wrapperStyle={{ paddingTop: 16, fontSize: 12, color: "rgba(255,255,255,0.5)" }}
                    iconType="circle"
                    iconSize={8}
                  />
                  <Bar dataKey="applicants" name="Applicants" fill="rgba(255,255,255,0.12)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="aiMatches" name="AI Matches" fill="#34d399" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
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
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                      {src.efficiency} Rate
                    </span>
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
