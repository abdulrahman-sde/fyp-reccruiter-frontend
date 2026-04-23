import type { JobSummary } from "@/types/job";

const STATUS_STYLES: Record<string, string> = {
  PUBLISHED: "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20",
  DRAFT: "bg-white/5 text-white/70 border border-white/10",
  CLOSED: "bg-white/5 text-white/40 border border-white/5",
  ARCHIVED: "bg-white/5 text-white/30 border border-white/5",
};

const STATUS_LABEL: Record<string, string> = {
  PUBLISHED: "Active",
  DRAFT: "Draft",
  CLOSED: "Closed",
  ARCHIVED: "Archived",
};

const JOB_TYPE_LABEL: Record<string, string> = {
  FULL_TIME: "Full-Time",
  PART_TIME: "Part-Time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
  REMOTE: "Remote",
};

interface JobCardProps {
  job: JobSummary;
  onClick: () => void;
}

export function JobCard({ job, onClick }: JobCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative flex h-70 flex-col rounded-3xl border border-white/5 bg-white/1 p-6 transition-colors hover:border-white/15 cursor-pointer"
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-t from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex items-center justify-between mb-4 relative z-10">
        <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold ${STATUS_STYLES[job.status] ?? STATUS_STYLES["DRAFT"]}`}>
          {STATUS_LABEL[job.status] ?? job.status}
        </span>
        <button
          onClick={(e) => e.stopPropagation()}
          className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path
              d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="mb-auto relative z-10">
        <h3 className="text-xl font-medium text-white mb-2 leading-tight group-hover:text-white/90">
          {job.title}
        </h3>
        <div className="flex items-center gap-2 text-xs font-light text-white/40 mb-1">
          <span>{JOB_TYPE_LABEL[job.job_type] ?? job.job_type}</span>
        </div>
        <p className="text-xs text-white/30">{job.location ?? "Location TBD"}</p>
      </div>

      <div className="relative z-10 pt-6 border-t border-white/5 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Total Pool</span>
          <span className="text-lg text-white font-light">{job.applicants_count}</span>
        </div>
        <div className="h-8 w-px bg-white/10" />
        <div className="flex flex-col items-end group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.3)] transition-all">
          <span className="text-[10px] uppercase tracking-widest text-emerald-400/60 mb-1">AI Matches</span>
          <span className="text-lg text-emerald-400 font-medium flex items-center gap-2">
            {job.status === "PUBLISHED" && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            )}
            {job.ai_matches_count}
          </span>
        </div>
      </div>
    </div>
  );
}
