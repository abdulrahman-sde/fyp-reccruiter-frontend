"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import type { JobDetail } from "@/types/job";

interface UseJobDetailsResult {
  job: JobDetail | null;
  loading: boolean;
  error: string | null;
}

export function useJobDetails(id: string): UseJobDetailsResult {
  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJob() {
      try {
        setLoading(true);
        setError(null);
        const res = await apiFetch(`/api/jobs/${id}`);
        if (res.status === 404) throw new Error("Job not found");
        if (!res.ok) throw new Error("Failed to load job");
        const body = (await res.json()) as { success: boolean; data: { job: JobDetail } };
        if (!body.success) throw new Error("Failed to load job");
        setJob(body.data.job);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [id]);

  return { job, loading, error };
}
