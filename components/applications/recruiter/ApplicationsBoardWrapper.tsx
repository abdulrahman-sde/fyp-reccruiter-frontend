"use client";

import { useRouter } from "next/navigation";
import type { JobSummary } from "@/types/job";
import { ApplicationsBoard } from "./ApplicationsBoard";

type Props = {
  jobs: JobSummary[];
  selectedJobId?: string;
};

export function ApplicationsBoardWrapper({ jobs, selectedJobId }: Props) {
  const router = useRouter();

  if (!selectedJobId || !jobs.find((j) => j.id === selectedJobId)) {
    return (
      <div className="space-y-8 max-w-7xl mx-auto animate-fade-in-up">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Applications</div>
          <h1 className="text-3xl font-medium tracking-tight">Select a job</h1>
          <p className="mt-1 text-sm font-light text-white/50">
            Choose a job posting to review its applications.
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="flex h-48 items-center justify-center rounded-[2rem] border border-white/5 bg-white/2 text-sm text-white/40">
            No published jobs yet. Create and publish a job first.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <button
                key={job.id}
                type="button"
                onClick={() => router.push(`/applications?jobId=${job.id}`)}
                className="group rounded-[1.5rem] border border-white/5 bg-white/2 p-5 text-left ring-1 ring-white/2 transition-all hover:border-emerald-400/20 hover:bg-emerald-400/5 hover:ring-emerald-400/10"
              >
                <div className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                  {job.title}
                </div>
                <div className="mt-1 text-xs font-light text-white/40">
                  {job.location ?? "Remote"} · {job.job_type.replace("_", " ")}
                </div>
                <div className="mt-3 flex items-center gap-3 text-[11px] text-white/50">
                  <span>
                    <span className="font-medium text-white">{job.applicants_count}</span> applicants
                  </span>
                  {job.ai_matches_count > 0 && (
                    <span className="text-emerald-400">
                      <span className="font-medium">{job.ai_matches_count}</span> AI matched
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return <ApplicationsBoard jobId={selectedJobId} />;
}
