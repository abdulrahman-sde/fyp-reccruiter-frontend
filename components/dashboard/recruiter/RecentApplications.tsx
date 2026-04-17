import { Application } from "@/types/dashboard";
import { Badge } from "@/components/ui/badge";

export function RecentApplications({ applications }: { applications: Application[] }) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    if (score >= 80) return "text-blue-400 bg-blue-400/10 border-blue-400/20";
    return "text-muted-foreground bg-black/5 dark:bg-card border-border";
  };

  return (
    <div className="p-1 rounded-[2rem] bg-white/[0.02] hover:bg-white/[0.04] group transition-all border border-white/[0.08] ring-1 ring-white/[0.03] backdrop-blur-xl h-full">
      <div className="h-full rounded-[calc(2rem-0.25rem)] bg-gradient-to-b from-white/[0.03] to-transparent p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-medium text-foreground mb-1">Top Recent Scores</h2>
          <p className="text-sm text-muted-foreground font-light">Applications breaking the threshold.</p>
        </div>

        <div className="space-y-4 flex-1">
          {applications.map((application) => (
            <div key={application.id} className="flex items-center justify-between p-4 rounded-[1.5rem] border border-border dark:bg-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-card border border-border flex items-center justify-center overflow-hidden">
                  {/* Subtle placeholder avatar gradient */}
                  <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">{application.name}</span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{application.role}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-muted-foreground hidden sm:block">{application.appliedAt}</span>
                <div className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getScoreColor(application.matchScore)}`}>
                  {application.matchScore}%
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="mt-8 w-full py-3.5 rounded-[1.25rem] border border-border text-sm font-medium text-muted-foreground hover:bg-black/5 dark:bg-card hover:text-foreground transition-colors">
          View Master Leaderboard
        </button>
      </div>
    </div>
  );
}
