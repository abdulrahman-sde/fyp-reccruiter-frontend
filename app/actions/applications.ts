"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_BASE = process.env.BACKEND_URL ?? "http://localhost:4000";

async function authHeaders(): Promise<HeadersInit | null> {
  const cookieStore = await cookies();
  const access = cookieStore.get("hf_access");
  if (!access) return null;
  return { "Content-Type": "application/json", Cookie: `hf_access=${access.value}` };
}

export async function updateApplicationDecision(
  applicationId: string,
  jobId: string,
  decision: "SHORTLISTED" | "REJECTED",
  rejectionReason?: string
): Promise<{ success: boolean; error?: string }> {
  const headers = await authHeaders();
  if (!headers) return { success: false, error: "Not authenticated" };

  try {
    const res = await fetch(`${API_BASE}/api/applications/${applicationId}/decision`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ decision, rejection_reason: rejectionReason }),
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
