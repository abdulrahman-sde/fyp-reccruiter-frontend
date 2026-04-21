import Link from "next/link";
import { AuthShell } from "@/components/auth/recruiter/AuthShell";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  return (
    <AuthShell
      eyebrow="Verification"
      title="Verify your email address"
      description="We sent a confirmation link to your inbox. Verify your email to activate your workspace and continue."
      footer={
        <>
          Wrong address?{" "}
          <Link href="/sign-up" className="text-emerald-300 hover:text-emerald-200 transition-colors">
            Update email
          </Link>
        </>
      }
    >
      <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5">
        <p className="text-sm text-foreground/85">
          Check your inbox and spam folder for a message from HireFlow AI.
        </p>
        <p className="text-sm text-muted-foreground">
          Once verified, return here and continue to your dashboard.
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Button variant="outline" className="h-11 rounded-2xl border-white/12 bg-white/5 text-foreground hover:bg-white/10">
          Resend email
        </Button>
        <Button className="h-11 rounded-2xl bg-foreground text-background hover:opacity-90">
          Continue
        </Button>
      </div>
    </AuthShell>
  );
}