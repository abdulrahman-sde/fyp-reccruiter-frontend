import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import type { AuthUser } from "@/types/auth";
import type { JobDetail, JobSummary } from "@/types/job";
import type { DashboardStats } from "@/types/dashboard";
import type { RecruiterApplicationsResponse } from "@/types/application";
import type { Application } from "@/types/dashboard";

const API_BASE = process.env.BACKEND_URL ?? "http://localhost:4000";

async function authHeaders(): Promise<HeadersInit | null> {
  const cookieStore = await cookies();
  const access = cookieStore.get("hf_access");
  if (!access) return null;
  return { Cookie: `hf_access=${access.value}` };
}

/**
 * Calls /api/auth/refresh on the backend using the stored hf_refresh cookie.
 * On success, overwrites hf_access in the cookie store and returns the new token.
 * Returns null if the refresh token is missing, expired, or the call fails.
 */
async function refreshAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const refresh = cookieStore.get("hf_refresh");
  if (!refresh) return null;

  try {
    const res = await fetch(`${API_BASE}/api/auth/refresh`, {
      method: "POST",
      headers: { Cookie: `hf_refresh=${refresh.value}` },
      cache: "no-store",
    });
    if (!res.ok) return null;

    // Persist any new hf_access cookie set by the backend response
    for (const c of res.headers.getSetCookie()) {
      const [pair] = c.split(";");
      const eqIdx = pair!.indexOf("=");
      if (eqIdx === -1) continue;
      const name = pair!.slice(0, eqIdx).trim();
      const value = pair!.slice(eqIdx + 1).trim();
      if (name === "hf_access") {
        cookieStore.set("hf_access", value, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 15 * 60,
          path: "/",
        });
        return value;
      }
    }

    // Fallback: backend returned accessToken in body
    const body = (await res.json()) as { success: boolean; data?: { accessToken?: string } };
    if (body.success && body.data?.accessToken) {
      const value = body.data.accessToken;
      cookieStore.set("hf_access", value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60,
        path: "/",
      });
      return value;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch wrapper for DAL calls. On 401, attempts one token refresh and retries.
 * Returns the Response, or null if permanently unauthorized.
 */
async function fetchWithRefresh(url: string, init: RequestInit): Promise<Response | null> {
  const res = await fetch(url, { ...init, cache: "no-store" });
  if (res.status !== 401) return res;

  const newToken = await refreshAccessToken();
  if (!newToken) return null;

  return fetch(url, {
    ...init,
    headers: { ...(init.headers as Record<string, string>), Cookie: `hf_access=${newToken}` },
    cache: "no-store",
  });
}

// Per-request cache — dedups concurrent getSession() calls in the same render pass.
export const getSession = cache(async (): Promise<AuthUser | null> => {
  const headers = await authHeaders();
  if (!headers) return null;

  try {
    const res = await fetchWithRefresh(`${API_BASE}/api/auth/me`, { headers });
    if (!res || !res.ok) return null;
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
    const res = await fetchWithRefresh(`${API_BASE}/api/jobs?${qs.toString()}`, { headers });
    if (!res || !res.ok) return null;
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
    const res = await fetchWithRefresh(`${API_BASE}/api/jobs/stats/dashboard`, { headers });
    if (!res || !res.ok) return null;
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
    const res = await fetchWithRefresh(`${API_BASE}/api/applications/recruiter/${jobId}?${qs.toString()}`, { headers });
    if (!res || !res.ok) return null;
    const body = (await res.json()) as { success: boolean; data: RecruiterApplicationsResponse };
    return body.success ? body.data : null;
  } catch {
    return null;
  }
});

function toDisplayStatus(status: string): Application["status"] {
  const map: Record<string, Application["status"]> = {
    APPLIED: "new",
    SCREENING: "screening",
    UNDER_REVIEW: "screening",
    SHORTLISTED: "shortlisted",
    INTERVIEW_SCHEDULED: "screening",
    INTERVIEWED: "interviewed",
    HIRED: "shortlisted",
    REJECTED: "rejected",
    WITHDRAWN: "rejected",
  };
  return map[status] ?? "new";
}

export const getTopScoredApplications = cache(async (jobId: string, limit = 4): Promise<Application[]> => {
  const data = await getJobApplications(jobId, { limit: 20 });
  if (!data) return [];

  return data.applications
    .filter((a) => a.match_score !== null)
    .sort((a, b) => (b.match_score ?? 0) - (a.match_score ?? 0))
    .slice(0, limit)
    .map((a) => ({
      id: a.id,
      name: a.candidate_name,
      role: data.job.title,
      matchScore: Math.round(a.match_score ?? 0),
      status: toDisplayStatus(a.status),
      appliedAt: new Date(a.applied_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    }));
});

export const getJobById = cache(async (id: string): Promise<JobDetail | null> => {
  const headers = await authHeaders();
  if (!headers) return null;

  try {
    const res = await fetchWithRefresh(`${API_BASE}/api/jobs/${id}`, { headers });
    if (!res || !res.ok) return null;
    const body = (await res.json()) as { success: boolean; data: { job: JobDetail } };
    return body.success ? body.data.job : null;
  } catch {
    return null;
  }
});
