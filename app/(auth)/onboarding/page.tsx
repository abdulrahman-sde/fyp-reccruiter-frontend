"use client";

import Link from "next/link";
import { AuthShell } from "@/components/auth/recruiter/AuthShell";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const fieldStyles =
  "h-11 w-full rounded-2xl border border-white/10 bg-white/4 px-4 text-sm text-foreground placeholder:text-muted-foreground/80 outline-none transition-colors focus:border-emerald-300/45 focus:bg-white/6";

const textareaStyles =
  "w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/80 outline-none transition-colors focus:border-emerald-300/45 focus:bg-white/6";

const companySizeOptions = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "500+ employees",
];

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
                Recommended: square image, PNG or JPG, up to 1MB.
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
              <CompanySizeDropdown />
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
            className="h-11 px-4 rounded-full border-white/12 bg-white/5 text-foreground hover:bg-white/10"
            onClick={() => router.push("/sign-up")}
          >
            Back
          </Button>
          <Button
            type="button"
            className="h-11 px-4 rounded-full bg-foreground text-background hover:opacity-90"
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

function CompanySizeDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <select
        id="size-input"
        name="size"
        required
        tabIndex={-1}
        value={selectedSize}
        onChange={(event) => setSelectedSize(event.target.value)}
        className="sr-only"
        aria-hidden="true"
      >
        <option value="">Select company size</option>
        {companySizeOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button
        type="button"
        id="size"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="company-size-listbox"
        onClick={() => setIsOpen((open) => !open)}
        className="h-11 w-full rounded-2xl border border-white/10 bg-white/4 px-4 pr-11 text-left text-sm text-foreground outline-none transition-all hover:border-white/20 hover:bg-white/6 focus-visible:border-emerald-300/45 focus-visible:bg-white/6 focus-visible:shadow-[0_0_0_3px_rgba(52,211,153,0.12)]"
      >
        <span className={selectedSize ? "text-foreground" : "text-muted-foreground/80"}>
          {selectedSize || "Select company size"}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground/80">
          <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </span>
      </button>

      {isOpen ? (
        <div className="absolute z-20 mt-2 w-full rounded-2xl border border-white/12 bg-black/40 p-1.5 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.08)] ">
          <ul id="company-size-listbox" role="listbox" aria-label="Company size options" className="space-y-1">
            {companySizeOptions.map((option) => {
              const isSelected = selectedSize === option;

              return (
                <li key={option} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      setSelectedSize(option);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                      isSelected
                        ? "bg-emerald-300/15 text-emerald-100"
                        : "text-foreground/90 hover:bg-white/9 hover:text-foreground"
                    }`}
                  >
                    <span>{option}</span>
                    {isSelected ? <Check aria-hidden="true" className="h-3.5 w-3.5" /> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}