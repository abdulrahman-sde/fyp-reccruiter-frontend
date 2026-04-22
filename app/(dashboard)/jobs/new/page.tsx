"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";

export default function NewJobPage() {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/jobs");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="animate-fade-in-up space-y-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-400/70">
          Job Composer
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-white">Create New Job</h1>
        <p className="max-w-3xl text-sm font-light text-white/50">
          Fill all role details, candidate requirements, and hiring workflow settings before publishing.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative z-40 animate-fade-in-up rounded-4xl border border-white/5 bg-white/2 p-1 ring-1 ring-white/2 backdrop-blur-xl animation-delay-100">
          <div className="rounded-[calc(2rem-0.25rem)] bg-linear-to-b from-white/3 to-transparent p-6 md:p-8">
            <h2 className="mb-5 text-lg font-medium tracking-tight text-white">Role Details</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Job Title" htmlFor="title">
                <input id="title" name="title" required placeholder="Senior Frontend Engineer" className={inputStyles} />
              </Field>

              <Field label="Department" htmlFor="department">
                <input id="department" name="department" required placeholder="Engineering" className={inputStyles} />
              </Field>

              <Field label="Employment Type" htmlFor="employmentType">
                <FormSelect
                  id="employmentType"
                  name="employmentType"
                  required
                  placeholder="Select type"
                  options={["Full-Time", "Part-Time", "Contract", "Internship"]}
                />
              </Field>

              <Field label="Experience Level" htmlFor="experienceLevel">
                <FormSelect
                  id="experienceLevel"
                  name="experienceLevel"
                  required
                  placeholder="Select level"
                  options={["Entry", "Mid-Level", "Senior", "Lead / Principal"]}
                />
              </Field>

              <Field label="Work Mode" htmlFor="workMode">
                <FormSelect
                  id="workMode"
                  name="workMode"
                  required
                  placeholder="Select mode"
                  options={["Remote", "Onsite", "Hybrid"]}
                />
              </Field>

              <Field label="Location" htmlFor="location">
                <input id="location" name="location" required placeholder="Lahore / Remote" className={inputStyles} />
              </Field>

              <Field label="Openings" htmlFor="openings">
                <input id="openings" name="openings" required type="number" min={1} defaultValue={1} className={inputStyles} />
              </Field>

              <Field label="Application Deadline" htmlFor="deadline">
                <input id="deadline" name="deadline" type="date" className={inputStyles} required />
              </Field>
            </div>
          </div>
        </div>

        <div className="relative z-30 animate-fade-in-up rounded-4xl border border-white/5 bg-white/2 p-1 ring-1 ring-white/2 backdrop-blur-xl animation-delay-100">
          <div className="rounded-[calc(2rem-0.25rem)] bg-linear-to-b from-white/3 to-transparent p-6 md:p-8">
            <h2 className="mb-5 text-lg font-medium tracking-tight text-white">Compensation</h2>

            <div className="grid gap-5 md:grid-cols-3">
              <Field label="Currency" htmlFor="currency">
                <FormSelect id="currency" name="currency" defaultValue="USD" options={["USD", "EUR", "GBP", "PKR"]} />
              </Field>

              <Field label="Minimum Salary" htmlFor="salaryMin">
                <input id="salaryMin" name="salaryMin" type="number" min={0} placeholder="50000" className={inputStyles} />
              </Field>

              <Field label="Maximum Salary" htmlFor="salaryMax">
                <input id="salaryMax" name="salaryMax" type="number" min={0} placeholder="80000" className={inputStyles} />
              </Field>
            </div>
          </div>
        </div>

        <div className="relative z-20 animate-fade-in-up rounded-4xl border border-white/5 bg-white/2 p-1 ring-1 ring-white/2 backdrop-blur-xl animation-delay-100">
          <div className="rounded-[calc(2rem-0.25rem)] bg-linear-to-b from-white/3 to-transparent p-6 md:p-8">
            <h2 className="mb-5 text-lg font-medium tracking-tight text-white">Description & Requirements</h2>

            <div className="grid gap-5">
              <Field label="Job Summary" htmlFor="summary">
                <textarea
                  id="summary"
                  name="summary"
                  required
                  rows={4}
                  placeholder="Write a concise overview of the role and mission."
                  className={textareaStyles}
                />
              </Field>

              <Field label="Key Responsibilities" htmlFor="responsibilities">
                <textarea
                  id="responsibilities"
                  name="responsibilities"
                  required
                  rows={5}
                  placeholder="List main responsibilities, one per line."
                  className={textareaStyles}
                />
              </Field>

              <Field label="Required Qualifications" htmlFor="qualifications">
                <textarea
                  id="qualifications"
                  name="qualifications"
                  required
                  rows={5}
                  placeholder="List mandatory qualifications and experience."
                  className={textareaStyles}
                />
              </Field>

              <Field label="Preferred Skills (comma separated)" htmlFor="skills">
                <input
                  id="skills"
                  name="skills"
                  placeholder="React, TypeScript, Next.js, Design Systems"
                  className={inputStyles}
                />
              </Field>

              <Field label="Benefits & Perks" htmlFor="benefits">
                <textarea
                  id="benefits"
                  name="benefits"
                  rows={4}
                  placeholder="List benefits, perks, and growth opportunities."
                  className={textareaStyles}
                />
              </Field>
            </div>
          </div>
        </div>

        <div className="relative z-10 animate-fade-in-up rounded-4xl border border-white/5 bg-white/2 p-1 ring-1 ring-white/2 backdrop-blur-xl animation-delay-100">
          <div className="rounded-[calc(2rem-0.25rem)] bg-linear-to-b from-white/3 to-transparent p-6 md:p-8">
            <h2 className="mb-5 text-lg font-medium tracking-tight text-white">Screening & Publish</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Application Form Type" htmlFor="formType">
                <FormSelect
                  id="formType"
                  name="formType"
                  defaultValue="Resume + Basic Details"
                  options={[
                    "Resume + Basic Details",
                    "Resume + Portfolio + Cover Letter",
                    "Resume + Screening Questions",
                  ]}
                />
              </Field>

              <Field label="Initial Job Status" htmlFor="status">
                <FormSelect
                  id="status"
                  name="status"
                  defaultValue="Draft"
                  options={["Draft", "Publish Immediately"]}
                />
              </Field>

              <Field label="Screening Question 1" htmlFor="question1">
                <input id="question1" name="question1" placeholder="Describe your most relevant project." className={inputStyles} />
              </Field>

              <Field label="Screening Question 2" htmlFor="question2">
                <input id="question2" name="question2" placeholder="Why are you a strong fit for this role?" className={inputStyles} />
              </Field>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 pb-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="h-11 px-4 rounded-full border-white/12 bg-white/5 text-white hover:bg-white/10"
            onClick={() => router.push("/jobs")}
          >
            Cancel
          </Button>
          <Button type="submit" className="h-11 px-4 rounded-full bg-white text-black hover:bg-white/90">
            Save Job Post
          </Button>
        </div>
      </form>
    </div>
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
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputStyles =
  "h-11 w-full rounded-2xl border border-white/10 bg-white/4 px-4 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-emerald-300/45 focus:bg-white/6";

const textareaStyles =
  "w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-emerald-300/45 focus:bg-white/6";

type FormSelectProps = {
  id: string;
  name: string;
  options: string[];
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
};

function FormSelect({
  id,
  name,
  options,
  placeholder = "Select an option",
  defaultValue = "",
  required = false,
}: FormSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
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
    <div ref={rootRef} className="relative">
      <select
        id={`${id}-native`}
        name={name}
        value={selectedValue}
        onChange={(event) => setSelectedValue(event.target.value)}
        required={required}
        tabIndex={-1}
        className="sr-only"
        aria-hidden="true"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-listbox`}
        onClick={() => setIsOpen((open) => !open)}
        className="h-11 w-full rounded-2xl border border-white/10 bg-white/4 px-4 pr-11 text-left text-sm text-white outline-none transition-all hover:border-white/20 hover:bg-white/6 focus-visible:border-emerald-300/45 focus-visible:bg-white/6 focus-visible:shadow-[0_0_0_3px_rgba(52,211,153,0.12)]"
      >
        <span className={selectedValue ? "text-white" : "text-white/35"}>{selectedValue || placeholder}</span>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/45">
          <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </span>
      </button>

      {isOpen ? (
        <div className="absolute z-50 mt-2 w-full rounded-2xl border border-white/12 bg-black/45 p-1.5 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.08)]">
          <ul id={`${id}-listbox`} role="listbox" aria-label={`${name} options`} className="space-y-1">
            {options.map((option) => {
              const isSelected = selectedValue === option;

              return (
                <li key={option} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      setSelectedValue(option);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                      isSelected
                        ? "bg-emerald-300/15 text-emerald-100"
                        : "text-white/90 hover:bg-white/10 hover:text-white"
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