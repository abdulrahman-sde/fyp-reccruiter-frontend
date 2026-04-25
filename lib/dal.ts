import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import type { AuthUser } from "@/types/auth";
import type { JobDetail, JobSummary } from "@/types/job";
import type { DashboardStats } from "@/types/dashboard";
import type { RecruiterApplicationsResponse } from "@/types/application";

const API_BASE = process.env.BACKEND_URL ?? "http://localhost:4000";

async function authHeaders(): Promise<HeadersInit | null> {
  const cookieStore = await cookies();
  const access = cookieStore.get("hf_access");
  if (!access) return null;
  return { Cookie: `hf_access=${access.value}` };
}

// Per-request cache — dedups concurrent getSession() calls in the same render pass.
export const getSession = cache(async (): Promise<AuthUser | null> => {
  const headers = await authHeaders();
  if (!headers) return null;

  try {
    const res = await fetch(`${API_BASE}/api/auth/me`, {
      headers,
      cache: "no-store",
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { success: boolean; data: { user: AuthUser } };
    return body.success ? body.data.user : null;
  } catch {
    return null;
  }
});

export const getJobs = cache(async (params?: {
  status?: string;
  page?: number;
  limit?: number;
}): Promise<{ jobs: JobSummary[]; total: number; page: number; limit: number } | null> => {
  const headers = await authHeaders();
  if (!headers) return null;

  const qs = new URLSearchParams();
  if (params?.status) qs.set("status", params.status);
  if (params?.page) qs.set("page", String(params.page));
  if (params?.limit) qs.set("limit", String(params.limit));

  try {
    const res = await fetch(`${API_BASE}/api/jobs?${qs.toString()}`, {
      headers,
      cache: "no-store",
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { success: boolean; data: { jobs: JobSummary[]; total: number; page: number; limit: number } };
    return body.success ? body.data : null;
  } catch {
    return null;
  }
});

export const getDashboardStats = cache(async (): Promise<DashboardStats | null> => {
  const headers = await authHeaders();
  if (!headers) return null;

  try {
    const res = await fetch(`${API_BASE}/api/jobs/stats/dashboard`, {
      headers,
      cache: "no-store",
    });
    if (!res.ok) return null;
    const body = (await res.json()) as {
      success: boolean;
      data: { stats: { activePostings: number; totalApplications: number; pendingInterviews: number } };
    };
    if (!body.success) return null;
    const s = body.data.stats;
    return { openJobs: s.activePostings, totalApplications: s.totalApplications, interviewsPending: s.pendingInterviews };
  } catch {
    return null;
  }
});

export const getJobApplications = cache(async (
  jobId: string,
  params?: { status?: string; page?: number; limit?: number }
): Promise<RecruiterApplicationsResponse | null> => {
  const headers = await authHeaders();
  if (!headers) return null;

  const qs = new URLSearchParams();
  if (params?.status) qs.set("status", params.status);
  if (params?.page) qs.set("page", String(params.page));
  if (params?.limit) qs.set("limit", String(params.limit));

  try {
    const res = await fetch(`${API_BASE}/api/applications/recruiter/${jobId}?${qs.toString()}`, {
      headers,
      cache: "no-store",
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { success: boolean; data: RecruiterApplicationsResponse };
    return body.success ? body.data : null;
  } catch {
    return null;
  }
});

export const getJobById = cache(async (id: string): Promise<JobDetail | null> => {
  const headers = await authHeaders();
  if (!headers) return null;

  try {
    const res = await fetch(`${API_BASE}/api/jobs/${id}`, {
      headers,
      cache: "no-store",
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { success: boolean; data: { job: JobDetail } };
    return body.success ? body.data.job : null;
  } catch {
    return null;
  }
});
