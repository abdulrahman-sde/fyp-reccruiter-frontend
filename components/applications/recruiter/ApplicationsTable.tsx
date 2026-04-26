"use client";

import Link from "next/link";
import type { ApplicationRow } from "@/types/application";
import { ScorePill } from "./ScorePill";
import { StatusPill } from "./StatusPill";
import { RecommendationPill } from "./RecommendationPill";

type Props = {
  rows: ApplicationRow[];
  jobId: string;
  anyInterview: boolean;
  onDecision: (applicationId: string, decision: "SHORTLISTED" | "REJECTED", customQuestions?: string[]) => void;
  isPending: boolean;
};

export function ApplicationsTable({ rows, jobId, anyInterview, onDecision, isPending }: Props) {
  if (rows.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2 text-center">
        <div className="text-sm text-white/40">No applications match these filters.</div>
        <div className="text-xs text-white/25">Try clearing status chips or widening score buckets.</div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest text-white/40">
            <th className="pb-3 pl-4 pr-2 font-medium">Candidate</th>
            <th className="pb-3 px-2 font-medium">Resume Score</th>
            <th className={`pb-3 px-2 font-medium ${anyInterview ? "text-emerald-300/70" : ""}`}>
              Interview {anyInterview && <span className="text-emerald-400">●</span>}
            </th>
            <th className="pb-3 px-2 font-medium">Status</th>
            <th className="pb-3 pr-4 pl-2 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.map((row) => (
            <ApplicationRow
              key={row.id}
              row={row}
              jobId={jobId}
              anyInterview={anyInterview}
              onDecision={onDecision}
              isPending={isPending}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ApplicationRow({
  row,
  jobId,
  anyInterview,
  onDecision,
  isPending,
}: {
  row: ApplicationRow;
  jobId: string;
  anyInterview: boolean;
  onDecision: (applicationId: string, decision: "SHORTLISTED" | "REJECTED", customQuestions?: string[]) => void;
  isPending: boolean;
}) {
  const canDecide = row.status === "APPLIED" || row.status === "UNDER_REVIEW";

  return (
    <tr className="group transition-colors hover:bg-white/2">
      <td className="py-3 pl-4 pr-2">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-linear-to-br from-white/10 to-transparent text-xs font-medium text-white/80">
            {row.avatar_initials}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-white group-hover:text-emerald-300 transition-colors">
              {row.candidate_name}
            </div>
            <div className="truncate text-xs text-white/40 font-light">
              {row.candidate_title && row.candidate_location
                ? `${row.candidate_title} · ${row.candidate_location}`
                : row.candidate_title || row.candidate_location || row.candidate_email}
            </div>
          </div>
        </div>
      </td>

      <td className="py-3 px-2">
        <div className="flex items-center gap-2">
          {row.resume.score > 0 ? (
            <>
              <ScorePill score={row.resume.score} />
              <RecommendationPill rec={row.resume.recommendation} size="sm" />
            </>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs text-white/30">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/30" />
              Analyzing…
            </span>
          )}
        </div>
      </td>

      <td
        className={`py-3 px-2 ${
          row.interview ? "border-l border-emerald-400/20 bg-emerald-400/2" : ""
        }`}
      >
        {row.interview ? (
          <ScorePill score={row.interview.score} />
        ) : row.status === "INTERVIEW_SCHEDULED" && row.interview_scheduled_at ? (
          <span className="text-[11px] text-amber-300/80">
            Scheduled · {new Date(row.interview_scheduled_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
          </span>
        ) : (
          <ScorePill score={null} />
        )}
      </td>

      <td className="py-3 px-2">
        <StatusPill status={row.status} />
      </td>

      <td className="py-3 pr-4 pl-2">
        <div className="flex items-center justify-end gap-2">
          {canDecide && (
            <>
              <button
                type="button"
                disabled={isPending}
                onClick={() => onDecision(row.id, "SHORTLISTED")}
                className="h-8 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 text-[11px] font-medium text-emerald-300 transition-all hover:bg-emerald-400/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Shortlist
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={() => onDecision(row.id, "REJECTED")}
                className="h-8 rounded-full border border-red-500/20 px-3 text-[11px] font-medium text-red-400 transition-all hover:bg-red-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reject
              </button>
            </>
          )}
          <Link
            href={`/applications/${row.id}?jobId=${jobId}`}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 text-xs font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white"
          >
            View
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </td>
    </tr>
  );
}
