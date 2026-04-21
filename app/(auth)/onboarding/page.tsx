"use client";

import Link from "next/link";
import { AuthShell } from "@/components/auth/recruiter/AuthShell";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const fieldStyles =
  "h-11 w-full rounded-2xl border border-white/10 bg-white/4 px-4 text-sm text-foreground placeholder:text-muted-foreground/80 outline-none transition-colors focus:border-emerald-300/45 focus:bg-white/6";

const textareaStyles =
  "w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/80 outline-none transition-colors focus:border-emerald-300/45 focus:bg-white/6";

export default function RecruiterOnboardingPage() {
  const router = useRouter();

  return (
    <AuthShell
      eyebrow="Recruiter Setup"
      title="Complete your company profile"
      description="Before publishing your first role, tell candidates who you are by adding your company identity and contact details."
      footer={
        <>
          Already completed onboarding?{" "}
          <Link href="/dashboard" className="text-emerald-300 transition-colors hover:text-emerald-200">
            Go to dashboard
          </Link>
        </>
      }
    >
      <form className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-white/4 p-4 md:p-5">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-300/80">
            Brand Identity
          </p>

          <div className="grid gap-4 md:grid-cols-[120px_1fr] md:items-start">
            <div className="flex h-30 w-30 items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/3 text-center text-xs text-muted-foreground">
              Logo
              <br />
              Preview
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Company Logo
              </label>
              <input
                type="file"
                accept="image/*"
                className="block h-11 w-full rounded-2xl border border-white/10 bg-white/4 px-3 text-sm text-foreground file:mr-4 file:rounded-full file:border-0 file:bg-emerald-300/20 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-emerald-200 hover:file:bg-emerald-300/30"
              />
              <p className="text-xs text-muted-foreground">
                Recommended: square image, PNG or JPG, up to 2MB.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/4 p-4 md:p-5">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-300/80">
            Company Information
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Company Name" htmlFor="companyName">
              <input id="companyName" name="companyName" required placeholder="Acme Labs" className={fieldStyles} />
            </Field>

            <Field label="Industry" htmlFor="industry">
              <input id="industry" name="industry" required placeholder="Software, Fintech, HealthTech" className={fieldStyles} />
            </Field>

            <Field label="Company Website" htmlFor="website">
              <input id="website" name="website" type="url" placeholder="https://yourcompany.com" className={fieldStyles} />
            </Field>

            <Field label="Company Size" htmlFor="size">
              <select id="size" name="size" defaultValue="" className={fieldStyles} required>
                <option value="" disabled>
                  Select company size
                </option>
                <option>1-10 employees</option>
                <option>11-50 employees</option>
                <option>51-200 employees</option>
                <option>201-500 employees</option>
                <option>500+ employees</option>
              </select>
            </Field>
          </div>

          <div className="mt-4">
            <Field label="Company Description" htmlFor="description">
              <textarea
                id="description"
                name="description"
                rows={5}
                required
                placeholder="Tell candidates what your company does, your mission, and your culture."
                className={textareaStyles}
              />
            </Field>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/4 p-4 md:p-5">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-300/80">
            Contact Details
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Head Office Location" htmlFor="location">
              <input id="location" name="location" required placeholder="Lahore, Pakistan" className={fieldStyles} />
            </Field>

            <Field label="Phone Number" htmlFor="phone">
              <input id="phone" name="phone" type="tel" required placeholder="+92 300 1234567" className={fieldStyles} />
            </Field>

            <Field label="Hiring Contact Name" htmlFor="contactName">
              <input id="contactName" name="contactName" required placeholder="Hamza Khan" className={fieldStyles} />
            </Field>

            <Field label="Hiring Contact Email" htmlFor="contactEmail">
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                required
                placeholder="recruiting@company.com"
                className={fieldStyles}
              />
            </Field>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-full border-white/12 bg-white/5 text-foreground hover:bg-white/10"
            onClick={() => router.push("/sign-up")}
          >
            Back
          </Button>
          <Button
            type="button"
            className="h-11 rounded-full bg-foreground text-background hover:opacity-90"
            onClick={() => router.push("/dashboard")}
          >
            Save and continue
          </Button>
        </div>
      </form>
    </AuthShell>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2" htmlFor={htmlFor}>
      <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}