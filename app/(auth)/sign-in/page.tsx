import Link from "next/link";
import { AuthShell } from "@/components/auth/recruiter/AuthShell";
import { AuthField } from "@/components/auth/recruiter/AuthField";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <AuthShell
      eyebrow="Account Access"
      title="Sign in to your workspace"
      description="Continue where you left off and manage jobs, applicants, and interview insights from one unified dashboard."
      footer={
        <>
          New to HireFlow?{" "}
          <Link href="/sign-up" className="text-emerald-300 hover:text-emerald-200 transition-colors">
            Create an account
          </Link>
        </>
      }
    >
      <form className="space-y-5">
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
          autoComplete="current-password"
          placeholder="Enter your password"
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

        <Button className="h-11 w-full rounded-2xl bg-foreground text-background hover:opacity-90">
          Sign in
        </Button>
      </form>
    </AuthShell>
  );
}