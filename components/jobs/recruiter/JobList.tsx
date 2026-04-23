"use client";

import { useRouter } from "next/navigation";
import { useJobs } from "@/hooks/useJobs";
import { JobCard } from "./JobCard";
import type { JobStatus } from "@/types/job";

interface JobListProps {
  activeTab: string;
}

const TAB_TO_STATUS: Record<string, JobStatus | undefined> = {
  Active: "PUBLISHED",
  Draft: "DRAFT",
  Previous: "CLOSED",
};

export function JobList({ activeTab }: JobListProps) {
  const router = useRouter();
  const status = TAB_TO_STATUS[activeTab];
  const { jobs, loading, error } = useJobs(status);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-70 rounded-3xl border border-white/5 bg-white/1 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-white/30 text-sm">
        {error}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-white/30 text-sm">
        No jobs found for this category.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onClick={() => router.push(`/jobs/${job.id}`)}
        />
      ))}
    </div>
  );
}
