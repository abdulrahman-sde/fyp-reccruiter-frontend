import { DashboardStats } from "@/types/dashboard";

export function StatsOverview({ stats }: { stats: DashboardStats }) {
  const cards = [
    { label: "Active Postings", value: stats.openJobs, trend: "+2 this week" },
    {
      label: "Total Applications",
      value: stats.totalApplications,
      trend: "Resumes fully parsed",
    },
    {
      label: "Pending Interviews",
      value: stats.interviewsPending,
      trend: "Awaiting application completion",
    },
    {
      label: "AI Screening Efficiency",
      value: stats.aiScreeningEfficiency,
      trend: "Target: 90%",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="p-1 rounded-[1.5rem] bg-white/[0.02] hover:bg-white/[0.04] transition-all border border-white/[0.08] ring-1 ring-white/[0.03] backdrop-blur-xl group"
        >
          <div className="h-full rounded-[calc(1.5rem-0.25rem)] bg-gradient-to-b from-white/[0.03] to-transparent p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] relative overflow-hidden">
            {/* Subtle glow effect on hover */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-emerald-500/0 blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-700 pointer-events-none" />

            <p className="text-sm text-muted-foreground font-medium mb-3">
              {card.label}
            </p>
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-4xl font-medium tracking-tight text-foreground drop-shadow-sm">
                {card.value}
              </span>
            </div>
            <p className="text-xs text-emerald-400/80 font-light mt-4 tracking-wide bg-emerald-400/[0.05] py-1 px-2 rounded-md inline-block">
              {card.trend}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
