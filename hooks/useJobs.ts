"use client";

import { useState, useEffect, useCallback } from "react";
import type { JobSummary, JobStatus } from "@/types/job";

interface UseJobsResult {
  jobs: JobSummary[];
  total: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useJobs(status?: JobStatus): UseJobsResult {
  const [jobs, setJobs] = useState<JobSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams({ limit: "100" });
      if (status) params.set("status", status);
      const res = await fetch(`/api/jobs?${params.toString()}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load jobs");
      const body = (await res.json()) as { success: boolean; data: { jobs: JobSummary[]; total: number } };
      if (!body.success) throw new Error("Failed to load jobs");
      setJobs(body.data.jobs);
      setTotal(body.data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return { jobs, total, loading, error, refetch: fetchJobs };
}
