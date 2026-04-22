"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { completeOnboarding } from "@/app/actions/auth";
import type { AuthActionState } from "@/types/auth";

const fieldStyles =
  "h-11 w-full rounded-2xl border border-white/10 bg-white/4 px-4 text-sm text-foreground placeholder:text-muted-foreground/80 outline-none transition-colors focus:border-emerald-300/45 focus:bg-white/6";

const textareaStyles =
  "w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/80 outline-none transition-colors focus:border-emerald-300/45 focus:bg-white/6";

type OnboardingFormProps = {
  defaultFirstName?: string;
  defaultLastName?: string;
};

export function OnboardingForm({ defaultFirstName = "", defaultLastName = "" }: OnboardingFormProps) {
  const [state, action, pending] = useActionState<AuthActionState, FormData>(completeOnboarding, undefined);

  return (
    <form action={action} className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/4 p-4 md:p-5">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-300/80">
          Company Information
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Company Name *" htmlFor="companyName" error={state?.errors?.["companyName"]?.[0]}>
            <input id="companyName" name="companyName" required placeholder="Acme Labs" className={fieldStyles} />
          </Field>
          <Field label="Industry" htmlFor="industry">
            <input id="industry" name="industry" placeholder="Software, Fintech, HealthTech" className={fieldStyles} />
          </Field>
          <Field label="Company Website" htmlFor="website" error={state?.errors?.["website"]?.[0]}>
            <input id="website" name="website" type="url" placeholder="https://yourcompany.com" className={fieldStyles} />
          </Field>
          <Field label="Company Size" htmlFor="size">
            <select id="size" name="size" defaultValue="" className={fieldStyles}>
              <option value="">Select company size</option>
              <option value="1-10 employees">1-10 employees</option>
              <option value="11-50 employees">11-50 employees</option>
              <option value="51-200 employees">51-200 employees</option>
              <option value="201-500 employees">201-500 employees</option>
              <option value="500+ employees">500+ employees</option>
            </select>
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Company Description" htmlFor="description">
            <textarea id="description" name="description" rows={4} placeholder="Tell candidates what your company does, your mission, and your culture." className={textareaStyles} />
          </Field>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/4 p-4 md:p-5">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-300/80">
          Your Details
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="First Name *" htmlFor="firstName" error={state?.errors?.["firstName"]?.[0]}>
            <input id="firstName" name="firstName" required defaultValue={defaultFirstName} placeholder="Hamza" className={fieldStyles} />
          </Field>
          <Field label="Last Name *" htmlFor="lastName" error={state?.errors?.["lastName"]?.[0]}>
            <input id="lastName" name="lastName" required defaultValue={defaultLastName} placeholder="Khan" className={fieldStyles} />
          </Field>
          <Field label="Head Office Location" htmlFor="location">
            <input id="location" name="location" placeholder="Lahore, Pakistan" className={fieldStyles} />
          </Field>
          <Field label="Phone Number" htmlFor="phone">
            <input id="phone" name="phone" type="tel" placeholder="+92 300 1234567" className={fieldStyles} />
          </Field>
          <Field label="Your Job Title" htmlFor="jobTitle">
            <input id="jobTitle" name="jobTitle" placeholder="Head of Talent" className={fieldStyles} />
          </Field>
        </div>
      </div>

      {state?.message && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
          {state.message}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="submit"
          disabled={pending}
          className="h-11 rounded-full bg-foreground text-background hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save and continue"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2" htmlFor={htmlFor}>
      <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      {children}
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  );
}
