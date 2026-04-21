"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
        <div className="animate-fade-in-up rounded-4xl border border-white/5 bg-white/2 p-1 ring-1 ring-white/2 backdrop-blur-xl animation-delay-100">
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
                <select id="employmentType" name="employmentType" defaultValue="" className={inputStyles} required>
                  <option value="" disabled>
                    Select type
                  </option>
                  <option>Full-Time</option>
                  <option>Part-Time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </Field>

              <Field label="Experience Level" htmlFor="experienceLevel">
                <select id="experienceLevel" name="experienceLevel" defaultValue="" className={inputStyles} required>
                  <option value="" disabled>
                    Select level
                  </option>
                  <option>Entry</option>
                  <option>Mid-Level</option>
                  <option>Senior</option>
                  <option>Lead / Principal</option>
                </select>
              </Field>

              <Field label="Work Mode" htmlFor="workMode">
                <select id="workMode" name="workMode" defaultValue="" className={inputStyles} required>
                  <option value="" disabled>
                    Select mode
                  </option>
                  <option>Remote</option>
                  <option>Onsite</option>
                  <option>Hybrid</option>
                </select>
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

        <div className="animate-fade-in-up rounded-4xl border border-white/5 bg-white/2 p-1 ring-1 ring-white/2 backdrop-blur-xl animation-delay-100">
          <div className="rounded-[calc(2rem-0.25rem)] bg-linear-to-b from-white/3 to-transparent p-6 md:p-8">
            <h2 className="mb-5 text-lg font-medium tracking-tight text-white">Compensation</h2>

            <div className="grid gap-5 md:grid-cols-3">
              <Field label="Currency" htmlFor="currency">
                <select id="currency" name="currency" defaultValue="USD" className={inputStyles}>
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>PKR</option>
                </select>
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

        <div className="animate-fade-in-up rounded-4xl border border-white/5 bg-white/2 p-1 ring-1 ring-white/2 backdrop-blur-xl animation-delay-100">
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

        <div className="animate-fade-in-up rounded-4xl border border-white/5 bg-white/2 p-1 ring-1 ring-white/2 backdrop-blur-xl animation-delay-100">
          <div className="rounded-[calc(2rem-0.25rem)] bg-linear-to-b from-white/3 to-transparent p-6 md:p-8">
            <h2 className="mb-5 text-lg font-medium tracking-tight text-white">Screening & Publish</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Application Form Type" htmlFor="formType">
                <select id="formType" name="formType" defaultValue="Resume + Basic Details" className={inputStyles}>
                  <option>Resume + Basic Details</option>
                  <option>Resume + Portfolio + Cover Letter</option>
                  <option>Resume + Screening Questions</option>
                </select>
              </Field>

              <Field label="Initial Job Status" htmlFor="status">
                <select id="status" name="status" defaultValue="Draft" className={inputStyles}>
                  <option>Draft</option>
                  <option>Publish Immediately</option>
                </select>
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
          <Button variant="outline" className="h-11 rounded-full border-white/12 bg-white/5 text-white hover:bg-white/10" asChild>
            <Link href="/jobs">Cancel</Link>
          </Button>
          <Button type="submit" className="h-11 rounded-full bg-white text-black hover:bg-white/90">
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