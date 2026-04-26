"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/lib/server-fetch";

const API_BASE = process.env.BACKEND_URL ?? "http://localhost:4000";

export async function updateApplicationDecision(
  applicationId: string,
  jobId: string,
  decision: "SHORTLISTED" | "REJECTED" | "HIRED",
  rejectionReason?: string,
  customQuestions?: string[],
  interviewWindowStart?: string,
  interviewWindowEnd?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await serverFetch(`${API_BASE}/api/applications/${applicationId}/decision`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        decision,
        rejection_reason: rejectionReason,
        custom_questions: customQuestions,
        interview_window_start: interviewWindowStart,
        interview_window_end: interviewWindowEnd,
      }),
    });

    if (!res.ok) {
      const body = (await res.json()) as { message?: string };
      return { success: false, error: body.message ?? "Failed to update decision" };
    }

    revalidatePath(`/applications`);
    revalidatePath(`/applications/${jobId}`);
    return { success: true };
  } catch {
    return { success: false, error: "Network error" };
  }
}
