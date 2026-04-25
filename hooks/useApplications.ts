"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  AiRecommendation,
  ApiApplicationRow,
  ApplicationRow,
  ApplicationsFilters,
  ApplicationsJobContext,
  ApplicationStatus,
  RecruiterApplicationsResponse,
} from "@/types/application";

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  APPLIED: "Applied",
  SCREENING: "Screening",
  UNDER_REVIEW: "Under Review",
  SHORTLISTED: "Shortlisted",
  INTERVIEW_SCHEDULED: "Interview Scheduled",
  INTERVIEWED: "Interviewed",
  HIRED: "Hired",
  REJECTED: "Rejected",
  WITHDRAWN: "Withdrawn",
};

export const REC_LABELS: Record<AiRecommendation, string> = {
  STRONG_HIRE: "Strong Hire",
  HIRE: "Hire",
  MAYBE: "Maybe",
  NO_HIRE: "No Hire",
};

function toApplicationRow(app: ApiApplicationRow): ApplicationRow {
  const d = app.match_details;
  return {
    id: app.id,
    candidate_name: app.candidate_name,
    candidate_title: app.candidate_title ?? "",
    candidate_location: app.candidate_location ?? "",
    candidate_email: app.candidate_email,
    avatar_initials: app.avatar_initials,
    applied_at: app.applied_at,
    status: app.status as ApplicationStatus,
    resume: {
      score: app.match_score ?? 0,
      recommendation: (d?.recommendation as AiRecommendation) ?? "MAYBE",
      summary: d?.summary ?? "AI analysis pending…",
      skills_match: d?.skills_match ?? 0,
      experience_match: d?.experience_match ?? 0,
      education_match: d?.education_match ?? 0,
      matched_keywords: (d?.matched_keywords as string[]) ?? [],
      strengths: (d?.strengths as string[]) ?? [],
      gaps: (d?.gaps as string[]) ?? [],
      screening_answers: (d?.screening_answers as Array<{ question: string; answer: string }>) ?? [],
    },
    interview: app.interview
      ? {
          score: 0,
          recommendation: "MAYBE",
          confidence: 0,
          summary: "",
          competencies: [],
          questions: [],
          conducted_at: "",
        }
      : null,
    activity: [],
  };
}

const RESUME_BUCKETS: Record<ApplicationsFilters["resume_score_bucket"], (n: number) => boolean> = {
  ANY: () => true,
  "90+": (n) => n >= 90,
  "70-89": (n) => n >= 70 && n < 90,
  "50-69": (n) => n >= 50 && n < 70,
  "<50": (n) => n < 50,
};

export function useApplications(jobId?: string) {
  const [data, setData] = useState<RecruiterApplicationsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFiltersState] = useState<ApplicationsFilters>({
    statuses: [],
    resume_score_bucket: "ANY",
    interview_score_bucket: "ANY",
    recommendations: [],
    applied_window: "ANY",
    search: "",
    sort: "resume_score",
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [optimisticStatuses, setOptimisticStatuses] = useState<Record<string, string>>({});

  const fetchApplications = useCallback(async () => {
    if (!jobId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/applications/recruiter/${jobId}?limit=50`);
      if (!res.ok) throw new Error("Failed to load applications");
      const body = (await res.json()) as { success: boolean; data: RecruiterApplicationsResponse };
      if (body.success) {
        setData(body.data);
        setOptimisticStatuses({});
      }
    } catch {
      setError("Could not load applications. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    void fetchApplications();
  }, [fetchApplications]);

  const rawRows: ApplicationRow[] = useMemo(
    () => (data?.applications ?? []).map(toApplicationRow),
    [data]
  );

  // Apply optimistic status updates
  const rowsWithOptimistic = useMemo(
    () =>
      rawRows.map((r) =>
        optimisticStatuses[r.id] ? { ...r, status: optimisticStatuses[r.id] as ApplicationStatus } : r
      ),
    [rawRows, optimisticStatuses]
  );

  const anyInterview = useMemo(
    () => rowsWithOptimistic.some((a) => a.interview !== null),
    [rowsWithOptimistic]
  );

  const effectiveSort =
    anyInterview && filters.sort === "resume_score" ? "interview_score" : filters.sort;

  const counts = useMemo(() => {
    const base = { total: rowsWithOptimistic.length, new: 0, shortlisted: 0, interviewed: 0, rejected: 0, hired: 0 };
    for (const a of rowsWithOptimistic) {
      if (a.status === "APPLIED" || a.status === "UNDER_REVIEW") base.new += 1;
      if (a.status === "SHORTLISTED" || a.status === "INTERVIEW_SCHEDULED") base.shortlisted += 1;
      if (a.status === "INTERVIEWED") base.interviewed += 1;
      if (a.status === "REJECTED") base.rejected += 1;
      if (a.status === "HIRED") base.hired += 1;
    }
    return base;
  }, [rowsWithOptimistic]);

  const filtered = useMemo(() => {
    const now = Date.now();
    const windowMs: Record<ApplicationsFilters["applied_window"], number> = {
      ANY: Infinity,
      TODAY: 24 * 3600 * 1000,
      "7D": 7 * 24 * 3600 * 1000,
      "30D": 30 * 24 * 3600 * 1000,
    };

    return rowsWithOptimistic
      .filter((a) => {
        if (filters.statuses.length && !filters.statuses.includes(a.status)) return false;
        if (!RESUME_BUCKETS[filters.resume_score_bucket](a.resume.score)) return false;
        if (filters.recommendations.length) {
          const rec = a.interview?.recommendation ?? a.resume.recommendation;
          if (!filters.recommendations.includes(rec)) return false;
        }
        if (windowMs[filters.applied_window] !== Infinity) {
          if (now - new Date(a.applied_at).getTime() > windowMs[filters.applied_window]) return false;
        }
        if (filters.search.trim()) {
          const q = filters.search.trim().toLowerCase();
          if (
            !a.candidate_name.toLowerCase().includes(q) &&
            !a.candidate_email.toLowerCase().includes(q) &&
            !a.candidate_title.toLowerCase().includes(q)
          )
            return false;
        }
        return true;
      })
      .sort((a, b) => {
        switch (effectiveSort) {
          case "interview_score":
            return (b.interview?.score ?? -1) - (a.interview?.score ?? -1);
          case "resume_score":
            return b.resume.score - a.resume.score;
          case "combined_score": {
            const combined = (x: ApplicationRow) =>
              x.interview ? 0.7 * x.interview.score + 0.3 * x.resume.score : x.resume.score * 0.6;
            return combined(b) - combined(a);
          }
          case "recent":
            return new Date(b.applied_at).getTime() - new Date(a.applied_at).getTime();
          case "status":
            return a.status.localeCompare(b.status);
        }
      });
  }, [rowsWithOptimistic, filters, effectiveSort]);

  const job: ApplicationsJobContext | null = data
    ? {
        job_id: data.job.id,
        job_title: data.job.title,
        company_name: data.job.company_name,
        job_status: data.job.status as ApplicationsJobContext["job_status"],
      }
    : null;

  const selected = useMemo(
    () => filtered.find((a) => a.id === selectedId) ?? rowsWithOptimistic.find((a) => a.id === selectedId) ?? null,
    [filtered, rowsWithOptimistic, selectedId]
  );

  function setFilters(next: Partial<ApplicationsFilters>) {
    setFiltersState((prev) => ({ ...prev, ...next }));
  }

  function toggleStatus(s: ApplicationStatus) {
    setFiltersState((prev) => ({
      ...prev,
      statuses: prev.statuses.includes(s) ? prev.statuses.filter((x) => x !== s) : [...prev.statuses, s],
    }));
  }

  function applyOptimisticStatus(applicationId: string, status: string) {
    setOptimisticStatuses((prev) => ({ ...prev, [applicationId]: status }));
  }

  return {
    job,
    counts,
    anyInterview,
    applications: filtered,
    filters: { ...filters, sort: effectiveSort },
    loading,
    error,
    setFilters,
    toggleStatus,
    selected,
    selectedId,
    openDetail: (id: string) => setSelectedId(id),
    closeDetail: () => setSelectedId(null),
    applyOptimisticStatus,
    refresh: fetchApplications,
  };
}
