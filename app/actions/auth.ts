"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { AuthActionState, AuthUser } from "@/types/auth";

// Server actions run on the server — use the internal proxy base so the
// backend URL is never bundled into client code.
const API_BASE = process.env.BACKEND_URL ?? "http://localhost:4000";

const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 7 days

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const signUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required").max(100),
    lastName: z.string().min(1, "Last name is required").max(100),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const onboardingSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  companyName: z.string().min(1, "Company name is required").max(255),
  industry: z.string().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  size: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
});

async function setAuthCookies(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();
  cookieStore.set("hf_access", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60,
    path: "/",
  });
  cookieStore.set("hf_refresh", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: REFRESH_TOKEN_MAX_AGE,
    path: "/api/auth",
  });
}

export async function signIn(
  _state: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const validated = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validated.data),
  });

  const body = (await res.json()) as
    | {
        success: true;
        data: { user: AuthUser; accessToken?: string; refreshToken?: string };
      }
    | { success: false; message: string };

  if (!body.success) {
    return { message: body.message };
  }

  // Extract cookies from Set-Cookie response header
  const setCookie = res.headers.getSetCookie();
  const cookieStore = await cookies();
  for (const c of setCookie) {
    // Parse name=value from each Set-Cookie string and relay it
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
    } else if (name === "hf_refresh") {
      cookieStore.set("hf_refresh", value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: REFRESH_TOKEN_MAX_AGE,
        path: "/",
      });
    }
  }

  const user = body.data.user;
  redirect(user.onboardingDone ? "/dashboard" : "/onboarding");
}

export async function signUp(
  _state: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const validated = signUpSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { confirmPassword: _, ...payload } = validated.data;

  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = (await res.json()) as
    | { success: true; data: { user: AuthUser } }
    | { success: false; message: string };

  if (!body.success) {
    return { message: body.message };
  }

  const setCookie = res.headers.getSetCookie();
  const cookieStore = await cookies();
  for (const c of setCookie) {
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
    } else if (name === "hf_refresh") {
      cookieStore.set("hf_refresh", value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: REFRESH_TOKEN_MAX_AGE,
        path: "/",
      });
    }
  }

  // Store names in a temporary cookie for the onboarding step
  cookieStore.set(
    "hf_pending_names",
    JSON.stringify({
      firstName: payload.firstName,
      lastName: payload.lastName,
    }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 60, // 30 min to complete onboarding
      path: "/",
    },
  );

  redirect("/onboarding");
}

export async function completeOnboarding(
  _state: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const cookieStore = await cookies();
  const access = cookieStore.get("hf_access");
  if (!access) redirect("/sign-in");

  // Read saved names from temp cookie, fall back to form fields
  let savedNames = { firstName: "", lastName: "" };
  const pendingNames = cookieStore.get("hf_pending_names");
  if (pendingNames) {
    try {
      savedNames = JSON.parse(pendingNames.value) as {
        firstName: string;
        lastName: string;
      };
    } catch {
      /* ignore */
    }
  }

  const validated = onboardingSchema.safeParse({
    firstName: formData.get("firstName") || savedNames.firstName,
    lastName: formData.get("lastName") || savedNames.lastName,
    companyName: formData.get("companyName"),
    industry: formData.get("industry") || undefined,
    website: formData.get("website") || undefined,
    size: formData.get("size") || undefined,
    description: formData.get("description") || undefined,
    location: formData.get("location") || undefined,
    phone: formData.get("phone") || undefined,
    jobTitle: formData.get("jobTitle") || undefined,
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const res = await fetch(`${API_BASE}/api/auth/onboarding/recruiter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `hf_access=${access.value}`,
    },
    body: JSON.stringify(validated.data),
  });

  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return {
      message:
        "Unexpected response from server while completing onboarding. Please try again.",
    };
  }

  const body = (await res.json()) as
    | { success: true; data: { user: AuthUser } }
    | { success: false; message: string };

  if (!body.success) {
    return { message: body.message };
  }

  cookieStore.delete("hf_pending_names");
  redirect("/dashboard");
}

export async function signOut(): Promise<void> {
  const cookieStore = await cookies();
  const refresh = cookieStore.get("hf_refresh");

  if (refresh) {
    await fetch(`${API_BASE}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `hf_refresh=${refresh.value}`,
      },
    }).catch(() => {});
  }

  cookieStore.delete("hf_access");
  cookieStore.delete("hf_refresh");
  redirect("/sign-in");
}
