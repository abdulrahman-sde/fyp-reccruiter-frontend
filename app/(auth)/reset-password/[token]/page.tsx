import Link from "next/link";
import { AuthShell } from "@/components/auth/recruiter/AuthShell";
import { AuthField } from "@/components/auth/recruiter/AuthField";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  return (
    <AuthShell
      eyebrow="Security Update"
      title="Create a new password"
      description="Set a fresh password for your account. Use a unique phrase you do not reuse on other platforms."
      footer={
        <>
          Need a new reset link?{" "}
          <Link href="/forgot-password" className="text-emerald-300 hover:text-emerald-200 transition-colors">
            Request again
          </Link>
        </>
      }
    >
      <form className="space-y-5">
        <AuthField
          id="newPassword"
          label="New Password"
          type="password"
          autoComplete="new-password"
          placeholder="Enter a new password"
        />

        <AuthField
          id="confirmPassword"
          label="Confirm New Password"
          type="password"
          autoComplete="new-password"
          placeholder="Repeat the new password"
        />

        <Button className="h-11 w-full rounded-2xl bg-foreground text-background hover:opacity-90">
          Update password
        </Button>
      </form>
    </AuthShell>
  );
}