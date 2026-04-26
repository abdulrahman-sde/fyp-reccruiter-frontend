"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { serverFetch } from "@/lib/server-fetch";
import type { JobActionState } from "@/types/job";

const API_BASE = process.env.BACKEND_URL ?? "http://localhost:4000";

const createJobSchema = z.object({
  title: z.string().min(1, "Job title is required").max(200),
  description: z.string().min(1, "Job description is required"),
  requirements: z.string().min(1, "Requirements are required"),
  qualifications: z.string().optional(),
  responsibilities: z.string().optional(),
  location: z.string().optional(),
  job_type: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "REMOTE"]),
  experience_level: z.enum(["ENTRY", "MID", "SENIOR", "LEAD", "EXECUTIVE"]),
  salary_min: z.coerce.number().positive().optional(),
  salary_max: z.coerce.number().positive().optional(),
  salary_currency: z.string().length(3).default("USD"),
  deadline: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  screening_questions: z.string().optional(),
});

const JOB_TYPE_MAP: Record<string, string> = {
  "Full-Time": "FULL_TIME",
  "Part-Time": "PART_TIME",
  "Contract": "CONTRACT",
  "Internship": "INTERNSHIP",
  "Remote": "REMOTE",
};

const EXPERIENCE_MAP: Record<string, string> = {
  "Entry": "ENTRY",
  "Mid-Level": "MID",
  "Senior": "SENIOR",
  "Lead / Principal": "LEAD",
  "Executive": "EXECUTIVE",
};

export async function createJob(
  _state: JobActionState,
  formData: FormData
): Promise<JobActionState> {
  const rawJobType = formData.get("employmentType") as string;
  const rawExpLevel = formData.get("experienceLevel") as string;
  const rawStatus = formData.get("status") as string;

  const validated = createJobSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    requirements: formData.get("requirements"),
    qualifications: formData.get("qualifications") || undefined,
    responsibilities: formData.get("responsibilities") || undefined,
    location: formData.get("location") || undefined,
    job_type: JOB_TYPE_MAP[rawJobType] ?? "FULL_TIME",
    experience_level: EXPERIENCE_MAP[rawExpLevel] ?? "MID",
    salary_min: formData.get("salaryMin") ? Number(formData.get("salaryMin")) : undefined,
    salary_max: formData.get("salaryMax") ? Number(formData.get("salaryMax")) : undefined,
    salary_currency: formData.get("currency") || "USD",
    deadline: formData.get("deadline") ? `${formData.get("deadline")}T00:00:00.000Z` : undefined,
    status: rawStatus === "Publish Immediately" ? "PUBLISHED" : "DRAFT",
    screening_questions: formData.get("screening_questions") || undefined,
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors as JobActionState["errors"] };
  }

  const res = await serverFetch(`${API_BASE}/api/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validated.data),
  });

  const body = (await res.json()) as { success: boolean; message?: string };
  if (!body.success) {
    return { message: body.message ?? "Failed to create job" };
  }

  redirect("/jobs");
}

export async function updateJobStatus(jobId: string, status: string): Promise<{ success: boolean; message?: string }> {
  const res = await serverFetch(`${API_BASE}/api/jobs/${jobId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  const body = (await res.json()) as { success: boolean; message?: string };
  return { success: body.success, message: body.message };
}
