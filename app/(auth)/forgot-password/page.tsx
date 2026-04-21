import Link from "next/link";
import { AuthShell } from "@/components/auth/recruiter/AuthShell";
import { AuthField } from "@/components/auth/recruiter/AuthField";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="Recovery"
      title="Reset your password"
      description="Enter your account email and we will send a secure reset link to help you restore access."
      footer={
        <>
          Remembered your password?{" "}
          <Link href="/sign-in" className="text-emerald-300 hover:text-emerald-200 transition-colors">
            Back to sign in
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

        <Button className="h-11 w-full rounded-2xl bg-foreground text-background hover:opacity-90">
          Send reset link
        </Button>
      </form>
    </AuthShell>
  );
}