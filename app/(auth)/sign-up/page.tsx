"use client";

import Link from "next/link";
import { AuthShell } from "@/components/auth/recruiter/AuthShell";
import { AuthField } from "@/components/auth/recruiter/AuthField";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  return (
    <AuthShell
      eyebrow="Team Onboarding"
      title="Create your HireFlow account"
      description="Start your recruitment workspace and bring your hiring team into a structured, AI-assisted process."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/sign-in" className="text-emerald-300 hover:text-emerald-200 transition-colors">
            Sign in
          </Link>
        </>
      }
    >
      <form className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <AuthField id="firstName" label="First Name" autoComplete="given-name" placeholder="Hamza" />
          <AuthField id="lastName" label="Last Name" autoComplete="family-name" placeholder="Khan" />
        </div>

        <AuthField
          id="email"
          label="Work Email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
        />

        <AuthField
          id="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          placeholder="Create a strong password"
        />

        <AuthField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
        />

        <Button
          type="button"
          className="h-11 w-full rounded-2xl bg-foreground text-background hover:opacity-90"
          onClick={() => router.push("/onboarding")}
        >
          Create account
        </Button>
      </form>
    </AuthShell>
  );
}