import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_BASE = process.env.BACKEND_URL ?? "http://localhost:4000";

async function tryRefresh(): Promise<string | null> {
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
  } catch {
    // fall through
  }
  return null;
}

/**
 * Authenticated server fetch for server actions.
 * Retries once with a refreshed access token on 401.
 * Redirects to /sign-in if no valid session exists.
 */
export async function serverFetch(
  url: string,
  init: RequestInit & { headers?: Record<string, string> } = {}
): Promise<Response> {
  const cookieStore = await cookies();
  const access = cookieStore.get("hf_access");

  if (!access) {
    const newToken = await tryRefresh();
    if (!newToken) redirect("/sign-in");
    return fetch(url, {
      ...init,
      headers: { ...init.headers, Cookie: `hf_access=${newToken}` },
      cache: "no-store",
    });
  }

  const res = await fetch(url, {
    ...init,
    headers: { ...init.headers, Cookie: `hf_access=${access.value}` },
    cache: "no-store",
  });

  if (res.status !== 401) return res;

  const newToken = await tryRefresh();
  if (!newToken) redirect("/sign-in");

  return fetch(url, {
    ...init,
    headers: { ...init.headers, Cookie: `hf_access=${newToken}` },
    cache: "no-store",
  });
}
