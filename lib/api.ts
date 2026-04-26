/**
 * Client-side fetch wrapper with automatic token refresh.
 * On 401, calls the Next.js /api/auth/refresh route handler (which uses the
 * httpOnly hf_refresh cookie) and retries the original request once.
 * If the refresh also fails, redirects to /sign-in.
 */
export async function apiFetch(input: string, init?: RequestInit): Promise<Response> {
  const res = await fetch(input, { credentials: "include", ...init });

  if (res.status !== 401) return res;

  // Attempt refresh
  const refreshRes = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  });

  if (!refreshRes.ok) {
    window.location.href = "/sign-in";
    // Return a never-resolving promise so the calling code doesn't continue
    return new Promise(() => {});
  }

  // Retry the original request — the new hf_access cookie is now set
  return fetch(input, { credentials: "include", ...init });
}
