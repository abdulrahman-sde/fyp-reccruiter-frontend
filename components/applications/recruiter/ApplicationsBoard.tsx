"use client";

import { useTransition } from "react";
import { useApplications } from "@/hooks/useApplications";
import { ApplicationsHeader } from "./ApplicationsHeader";
import { ApplicationsFilterBar } from "./ApplicationsFilterBar";
import { ApplicationsTable } from "./ApplicationsTable";
import { updateApplicationDecision } from "@/app/actions/applications";

type Props = {
  jobId: string;
};

export function ApplicationsBoard({ jobId }: Props) {
  const {
    job,
    counts,
    anyInterview,
    applications,
    filters,
    loading,
    error,
    setFilters,
    toggleStatus,
    applyOptimisticStatus,
    refresh,
  } = useApplications(jobId);

  const [isPending, startTransition] = useTransition();

  function handleDecision(applicationId: string, decision: "SHORTLISTED" | "REJECTED") {
    applyOptimisticStatus(applicationId, decision);
    startTransition(async () => {
      const result = await updateApplicationDecision(applicationId, jobId, decision);
      if (!result.success) {
        // Revert optimistic update on failure
        await refresh();
      }
    });
  }

  if (loading && !job) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-sm text-white/40 animate-pulse">Loading applications…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3">
        <div className="text-sm text-red-400">{error}</div>
        <button
          type="button"
          onClick={() => void refresh()}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 hover:text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-sm text-white/40">Job not found.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <ApplicationsHeader
        job={job}
        counts={counts}
        activeStatuses={filters.statuses}
        onToggleStatus={toggleStatus}
        onClearStatuses={() => setFilters({ statuses: [] })}
      />

      <ApplicationsFilterBar
        filters={filters}
        anyInterview={anyInterview}
        onChange={setFilters}
      />

      {anyInterview && (
        <div className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/5 px-4 py-2 text-[11px] text-emerald-300 w-fit animate-fade-in-up animation-delay-150">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Interview signal available — sorted by interview score first.
        </div>
      )}

      <div className="overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/2 p-1 ring-1 ring-white/2 backdrop-blur-xl animate-fade-in-up animation-delay-200">
        <div className="rounded-[calc(2.5rem-0.25rem)] bg-linear-to-b from-white/3 to-transparent p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] md:p-6">
          <ApplicationsTable
            rows={applications}
            jobId={jobId}
            anyInterview={anyInterview}
            onDecision={handleDecision}
            isPending={isPending}
          />
        </div>
      </div>
    </div>
  );
}
