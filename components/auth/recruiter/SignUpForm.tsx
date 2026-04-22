"use client";

import { useActionState } from "react";
import { AuthField } from "./AuthField";
import { Button } from "@/components/ui/button";
import { signUp } from "@/app/actions/auth";
import type { AuthActionState } from "@/types/auth";

export function SignUpForm() {
  const [state, action, pending] = useActionState<AuthActionState, FormData>(signUp, undefined);

  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <AuthField
          id="firstName"
          label="First Name"
          autoComplete="given-name"
          placeholder="Hamza"
          error={state?.errors?.["firstName"]?.[0]}
        />
        <AuthField
          id="lastName"
          label="Last Name"
          autoComplete="family-name"
          placeholder="Khan"
          error={state?.errors?.["lastName"]?.[0]}
        />
      </div>

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
        autoComplete="new-password"
        placeholder="Min 8 chars, 1 uppercase, 1 number"
        error={state?.errors?.["password"]?.[0]}
      />

      <AuthField
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        autoComplete="new-password"
        placeholder="Re-enter your password"
        error={state?.errors?.["confirmPassword"]?.[0]}
      />

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
        {pending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
