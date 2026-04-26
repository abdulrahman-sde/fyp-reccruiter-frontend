import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE = process.env.BACKEND_URL ?? "http://localhost:4000";

export async function POST() {
  const cookieStore = await cookies();
  const refresh = cookieStore.get("hf_refresh");

  if (!refresh) {
    return NextResponse.json({ success: false, message: "No refresh token" }, { status: 401 });
  }

  try {
    const res = await fetch(`${API_BASE}/api/auth/refresh`, {
      method: "POST",
      headers: { Cookie: `hf_refresh=${refresh.value}` },
      cache: "no-store",
    });

    if (!res.ok) {
      // Refresh token is expired or invalid — clear cookies so the client redirects to sign-in
      cookieStore.delete("hf_access");
      cookieStore.delete("hf_refresh");
      return NextResponse.json({ success: false, message: "Session expired" }, { status: 401 });
    }

    // Relay hf_access from backend Set-Cookie header
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
        return NextResponse.json({ success: true });
      }
    }

    // Fallback: try body
    const body = (await res.json()) as { success: boolean; data?: { accessToken?: string } };
    if (body.success && body.data?.accessToken) {
      cookieStore.set("hf_access", body.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60,
        path: "/",
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: "Refresh failed" }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, message: "Internal error" }, { status: 500 });
  }
}
