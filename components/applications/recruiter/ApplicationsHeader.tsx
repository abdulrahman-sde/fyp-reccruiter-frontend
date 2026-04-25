import type { ApplicationsJobContext, ApplicationStatus } from "@/types/application";

type Counts = {
  total: number;
  new: number;
  shortlisted: number;
  interviewed: number;
  rejected: number;
  hired: number;
};

type Props = {
  job: ApplicationsJobContext;
  counts: Counts;
  activeStatuses: ApplicationStatus[];
  onToggleStatus: (s: ApplicationStatus) => void;
  onClearStatuses: () => void;
};

const CHIPS: Array<{
  key: string;
  label: (c: Counts) => string;
  statuses: ApplicationStatus[] | null; // null = show all
  accent: string;
}> = [
  { key: "total", label: (c) => `${c.total} total`, statuses: null, accent: "text-white" },
  { key: "new", label: (c) => `${c.new} new`, statuses: ["APPLIED", "UNDER_REVIEW"], accent: "text-sky-300" },
  {
    key: "shortlisted",
    label: (c) => `${c.shortlisted} shortlisted`,
    statuses: ["SHORTLISTED", "INTERVIEW_SCHEDULED"],
    accent: "text-violet-300",
  },
  { key: "interviewed", label: (c) => `${c.interviewed} interviewed`, statuses: ["INTERVIEWED"], accent: "text-emerald-300" },
  { key: "hired", label: (c) => `${c.hired} hired`, statuses: ["HIRED"], accent: "text-emerald-200" },
  { key: "rejected", label: (c) => `${c.rejected} rejected`, statuses: ["REJECTED"], accent: "text-red-300" },
];

export function ApplicationsHeader({ job, counts, activeStatuses, onToggleStatus, onClearStatuses }: Props) {
  return (
    <div className="space-y-5 animate-fade-in-up">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Applications</div>
          <h1 className="text-3xl font-medium tracking-tight text-white">{job.job_title}</h1>
          <p className="mt-1 text-sm font-light text-white/50">
            {job.company_name} · <span className="uppercase tracking-widest text-[10px] text-white/40">{job.job_status}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {CHIPS.map((chip) => {
          const isTotal = chip.statuses === null;
          const active = !isTotal && chip.statuses!.every((s) => activeStatuses.includes(s));
          return (
            <button
              key={chip.key}
              type="button"
              onClick={() => {
                if (isTotal) return onClearStatuses();
                chip.statuses!.forEach((s) => onToggleStatus(s));
              }}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                active
                  ? "border-white/20 bg-white/10 text-white shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                  : `border-white/5 bg-white/2 text-white/70 hover:bg-white/5 hover:text-white ${chip.accent}`
              }`}
            >
              {chip.label(counts)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
