import Link from "next/link";
import { AuthShell } from "@/components/auth/recruiter/AuthShell";
import { SignInForm } from "@/components/auth/recruiter/SignInForm";

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
      <SignInForm />
    </AuthShell>
  );
}
