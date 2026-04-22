import Link from "next/link";
import { AuthShell } from "@/components/auth/recruiter/AuthShell";
import { SignUpForm } from "@/components/auth/recruiter/SignUpForm";

export default function SignUpPage() {
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
      <SignUpForm />
    </AuthShell>
  );
}
