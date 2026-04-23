"use client";

import dynamic from "next/dynamic";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import { createJob } from "@/app/actions/jobs";
import type { JobActionState } from "@/types/job";

// SSR-safe import — the editor uses browser-only APIs
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const inputStyles =
  "h-11 w-full rounded-2xl border border-white/10 bg-white/4 px-4 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-emerald-300/45 focus:bg-white/6";

const textareaStyles =
  "w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-emerald-300/45 focus:bg-white/6 resize-y min-h-[120px]";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">{label}</span>
      {children}
    </label>
  );
}

type FormSelectProps = {
  id: string;
  name: string;
  options: string[];
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
};

function FormSelect({ id, name, options, placeholder = "Select an option", defaultValue = "", required = false }: FormSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setIsOpen(false);
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
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
      <select id={`${id}-native`} name={name} value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} required={required} tabIndex={-1} className="sr-only" aria-hidden="true">
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <button id={id} type="button" aria-haspopup="listbox" aria-expanded={isOpen} aria-controls={`${id}-listbox`} onClick={() => setIsOpen((o) => !o)} className="h-11 w-full rounded-2xl border border-white/10 bg-white/4 px-4 pr-11 text-left text-sm text-white outline-none transition-all hover:border-white/20 hover:bg-white/6 focus-visible:border-emerald-300/45 focus-visible:bg-white/6 focus-visible:shadow-[0_0_0_3px_rgba(52,211,153,0.12)]">
        <span className={selectedValue ? "text-white" : "text-white/35"}>{selectedValue || placeholder}</span>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/45">
          <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </span>
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-2xl border border-white/12 bg-black/45 p-1.5 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.08)]">
          <ul id={`${id}-listbox`} role="listbox" aria-label={`${name} options`} className="space-y-1">
            {options.map((option) => {
              const isSelected = selectedValue === option;
              return (
                <li key={option} role="presentation">
                  <button type="button" role="option" aria-selected={isSelected} onClick={() => { setSelectedValue(option); setIsOpen(false); }} className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors ${isSelected ? "bg-emerald-300/15 text-emerald-100" : "text-white/90 hover:bg-white/10 hover:text-white"}`}>
                    <span>{option}</span>
                    {isSelected && <Check aria-hidden="true" className="h-3.5 w-3.5" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

// Controlled markdown field that syncs value into a hidden input for the server action
function MarkdownField({ name, placeholder }: { name: string; placeholder?: string }) {
  const [value, setValue] = useState("");
  return (
    <div data-color-mode="dark" className="rounded-2xl overflow-hidden border border-white/10">
      <MDEditor
        value={value}
        onChange={(v) => setValue(v ?? "")}
        preview="edit"
        hideToolbar={false}
        height={260}
        textareaProps={{ placeholder, style: { fontSize: 14 } }}
        style={{ background: "transparent" }}
      />
      <input type="hidden" name={name} value={value} />
    </div>
  );
}

const initialState: JobActionState = {};

export function NewJobForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(createJob, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {state.message && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {state.message}
        </div>
      )}

      {/* Role Details */}
      <div className="relative z-40 animate-fade-in-up rounded-4xl border border-white/5 bg-white/2 p-1 ring-1 ring-white/2 backdrop-blur-xl animation-delay-100">
        <div className="rounded-[calc(2rem-0.25rem)] bg-linear-to-b from-white/3 to-transparent p-6 md:p-8">
          <h2 className="mb-5 text-lg font-medium tracking-tight text-white">Role Details</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Job Title" htmlFor="title">
              <input id="title" name="title" required placeholder="Senior Frontend Engineer" className={inputStyles} />
            </Field>
            <Field label="Employment Type" htmlFor="employmentType">
              <FormSelect id="employmentType" name="employmentType" required placeholder="Select type" options={["Full-Time", "Part-Time", "Contract", "Internship", "Remote"]} />
            </Field>
            <Field label="Experience Level" htmlFor="experienceLevel">
              <FormSelect id="experienceLevel" name="experienceLevel" required placeholder="Select level" options={["Entry", "Mid-Level", "Senior", "Lead / Principal", "Executive"]} />
            </Field>
            <Field label="Location" htmlFor="location">
              <input id="location" name="location" placeholder="Lahore / Remote" className={inputStyles} />
            </Field>
            <Field label="Application Deadline" htmlFor="deadline">
              <input id="deadline" name="deadline" type="date" className={inputStyles} />
            </Field>
            <Field label="Initial Status" htmlFor="status">
              <FormSelect id="status" name="status" defaultValue="Draft" options={["Draft", "Publish Immediately"]} />
            </Field>
          </div>
        </div>
      </div>

      {/* Compensation */}
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

      {/* Description & Requirements */}
      <div className="relative z-20 animate-fade-in-up rounded-4xl border border-white/5 bg-white/2 p-1 ring-1 ring-white/2 backdrop-blur-xl animation-delay-100">
        <div className="rounded-[calc(2rem-0.25rem)] bg-linear-to-b from-white/3 to-transparent p-6 md:p-8">
          <h2 className="mb-5 text-lg font-medium tracking-tight text-white">Description & Requirements</h2>
          <div className="grid gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">Job Description</span>
              <MarkdownField name="description" placeholder="Write a full description of the role — responsibilities, mission, and what makes it exciting…" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">Requirements</span>
              <MarkdownField name="requirements" placeholder="List the skills, experience, and qualifications required for this role…" />
            </div>
          </div>
        </div>
      </div>

      {/* Screening Questions */}
      <div className="relative z-10 animate-fade-in-up rounded-4xl border border-white/5 bg-white/2 p-1 ring-1 ring-white/2 backdrop-blur-xl animation-delay-100">
        <div className="rounded-[calc(2rem-0.25rem)] bg-linear-to-b from-white/3 to-transparent p-6 md:p-8">
          <h2 className="mb-1 text-lg font-medium tracking-tight text-white">Screening Questions</h2>
          <p className="mb-5 text-sm text-white/40">Paste all questions at once, one per line. Applicants will answer these when they apply.</p>
          <textarea
            id="screening_questions"
            name="screening_questions"
            rows={5}
            placeholder={"Describe your most relevant project.\nWhy are you a strong fit for this role?\nWhat is your notice period?"}
            className={textareaStyles}
          />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 pb-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" className="h-11 px-4 rounded-full border-white/12 bg-white/5 text-white hover:bg-white/10" onClick={() => router.push("/jobs")}>
          Cancel
        </Button>
        <Button type="submit" disabled={pending} className="h-11 px-4 rounded-full bg-white text-black hover:bg-white/90">
          {pending ? "Saving…" : "Save Job Post"}
        </Button>
      </div>
    </form>
  );
}
