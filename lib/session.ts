import { cookies } from "next/headers";
import type { AuthUser } from "@/types/auth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function getSession(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const access = cookieStore.get("hf_access");
  if (!access) return null;

  try {
    const res = await fetch(`${API_BASE}/api/auth/me`, {
      headers: { Cookie: `hf_access=${access.value}` },
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { success: boolean; data: { user: AuthUser } };
    return body.success ? body.data.user : null;
  } catch {
    return null;
  }
}
