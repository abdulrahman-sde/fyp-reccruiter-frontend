import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/recruiter/AuthShell";
import { OnboardingForm } from "@/components/auth/recruiter/OnboardingForm";

export default async function RecruiterOnboardingPage() {
  const cookieStore = await cookies();

  if (!cookieStore.has("hf_access")) {
    redirect("/sign-in");
  }

  let defaultFirstName = "";
  let defaultLastName = "";
  const pending = cookieStore.get("hf_pending_names");
  if (pending) {
    try {
      const parsed = JSON.parse(pending.value) as {
        firstName?: string;
        lastName?: string;
      };
      defaultFirstName = parsed.firstName ?? "";
      defaultLastName = parsed.lastName ?? "";
    } catch {
      /* ignore */
    }
  }

  return (
    <AuthShell
      eyebrow="Recruiter Setup"
      title="Complete your company profile"
      description="Before publishing your first role, tell candidates who you are by adding your company identity and contact details."
      footer={
        <>
          Already completed onboarding?{" "}
          <Link
            href="/dashboard"
            className="text-emerald-300 transition-colors hover:text-emerald-200"
          >
            Go to dashboard
          </Link>
        </>
      }
    >
      <OnboardingForm
        defaultFirstName={defaultFirstName}
        defaultLastName={defaultLastName}
      />
    </AuthShell>
  );
}
