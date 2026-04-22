"use client";

import Link from "next/link";
import { useActionState } from "react";
import { AuthField } from "./AuthField";
import { Button } from "@/components/ui/button";
import { signIn } from "@/app/actions/auth";
import type { AuthActionState } from "@/types/auth";

export function SignInForm() {
  const [state, action, pending] = useActionState<AuthActionState, FormData>(signIn, undefined);

  return (
    <form action={action} className="space-y-5">
      <AuthField
        id="email"
        label="Work Email"
        type="email"
        autoComplete="email"
        placeholder="you@company.com"
        error={state?.errors?.["email"]?.[0]}
      />

      <AuthField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="Enter your password"
        error={state?.errors?.["password"]?.[0]}
      />

      <div className="flex items-center justify-between gap-4 text-sm">
        <label className="inline-flex items-center gap-2 text-muted-foreground">
          <input type="checkbox" className="h-4 w-4 rounded border border-white/20 bg-white/4" />
          Keep me signed in
        </label>
        <Link href="/forgot-password" className="text-emerald-300 hover:text-emerald-200 transition-colors">
          Forgot password?
        </Link>
      </div>

      {state?.message && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="h-11 w-full rounded-2xl bg-foreground text-background hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
