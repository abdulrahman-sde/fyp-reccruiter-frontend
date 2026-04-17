import { ActiveJob } from "@/types/dashboard";

export function ActiveJobs({ jobs }: { jobs: ActiveJob[] }) {
  return (
    <div className="p-1 rounded-[2rem] bg-white/[0.02] hover:bg-white/[0.04] group transition-all border border-white/[0.08] ring-1 ring-white/[0.03] backdrop-blur-xl h-full">
      <div className="h-full rounded-[calc(2rem-0.25rem)] bg-gradient-to-b from-white/[0.03] to-transparent p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-medium text-foreground mb-1">
              Active Roles
            </h2>
            <p className="text-sm text-muted-foreground font-light">
              Monitor your currently open positions.
            </p>
          </div>
          <button className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground hover:text-foreground transition-colors bg-black/5 dark:bg-card px-3 py-1.5 rounded-full border border-border">
            View All
          </button>
        </div>

        <div className="space-y-3 flex-1">
          {jobs.map((job) => (
            <div key={job.id} className="relative group cursor-pointer">
              <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-[1.5rem] border border-border dark:bg-card hover:border-border transition-colors z-10">
                <div className="flex flex-col gap-1 mb-4 sm:mb-0">
                  <span className="text-base font-medium text-foreground group-hover:text-foreground transition-colors">
                    {job.title}
                  </span>
                  <span className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
                    {job.department} <span className="mx-1">•</span>{" "}
                    {job.postedAt}
                  </span>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex flex-col items-end">
                    <span className="text-muted-foreground text-[10px] uppercase tracking-widest font-medium mb-1">
                      Pool
                    </span>
                    <span className="text-foreground lg:text-lg font-light leading-none">
                      {job.applicationsCount}
                    </span>
                  </div>
                  <div className="hidden sm:block h-6 w-px bg-black/10 dark:bg-white/10" />
                  <div className="flex flex-col items-end group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.3)] transition-all">
                    <span className="text-emerald-400/60 text-[10px] uppercase tracking-widest font-medium mb-1">
                      Matched
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse hidden lg:block" />
                      <span className="text-emerald-400 lg:text-lg font-medium leading-none">
                        {job.aiMatchedCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
