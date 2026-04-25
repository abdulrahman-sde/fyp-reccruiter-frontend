import type { ApplicationStatus } from "@/types/application";
import { STATUS_LABELS } from "@/hooks/useApplications";

const STYLES: Record<ApplicationStatus, string> = {
  APPLIED: "text-white/70 bg-white/5 border-white/10",
  SCREENING: "text-sky-300 bg-sky-400/10 border-sky-400/20",
  UNDER_REVIEW: "text-sky-300 bg-sky-400/10 border-sky-400/20",
  SHORTLISTED: "text-violet-300 bg-violet-400/10 border-violet-400/20",
  INTERVIEW_SCHEDULED: "text-amber-300 bg-amber-400/10 border-amber-400/20",
  INTERVIEWED: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
  HIRED: "text-emerald-200 bg-emerald-500/15 border-emerald-400/30",
  REJECTED: "text-red-300 bg-red-400/10 border-red-400/20",
  WITHDRAWN: "text-white/40 bg-white/5 border-white/10",
};

export function StatusPill({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${STYLES[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {STATUS_LABELS[status]}
    </span>
  );
}
