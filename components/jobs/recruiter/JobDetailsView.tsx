"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useJobDetails } from "@/hooks/useJobDetails";
import { updateJobStatus } from "@/app/actions/jobs";
import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";

interface JobDetailsViewProps {
  jobId: string;
}

const EXPERIENCE_LABELS: Record<string, string> = {
  ENTRY: "Entry Level",
  MID: "Mid Level",
  SENIOR: "Senior",
  LEAD: "Lead",
  EXECUTIVE: "Executive",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-1 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] ring-1 ring-white/[0.02] backdrop-blur-xl">
      <div className="rounded-[calc(2rem-0.25rem)] bg-gradient-to-b from-white/[0.03] to-transparent p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <h2 className="text-base font-medium text-white mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function MarkdownContent({ text }: { text: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => (
          <p className="text-sm text-white/70 font-light leading-relaxed mb-3 last:mb-0">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="space-y-3 my-2">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="space-y-3 my-2">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="flex gap-3 items-start">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400/60 shrink-0" />
            <span className="text-sm text-white/70 font-light leading-relaxed">{children}</span>
          </li>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-white/90">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-white/70">{children}</em>
        ),
        h1: ({ children }) => (
          <h1 className="text-base font-semibold text-white mt-4 mb-2">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-sm font-semibold text-white mt-4 mb-2">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-sm font-medium text-white/90 mt-3 mb-1">{children}</h3>
        ),
        code: ({ children }) => (
          <code className="text-xs bg-white/10 text-white/80 rounded px-1.5 py-0.5 font-mono">{children}</code>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

export function JobDetailsView({ jobId }: JobDetailsViewProps) {
  const { job, loading, error } = useJobDetails(jobId);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-12 w-64 rounded-2xl bg-white/5 animate-pulse" />
        <div className="space-y-6">
          <div className="h-48 rounded-3xl bg-white/5 animate-pulse" />
          <div className="h-64 rounded-3xl bg-white/5 animate-pulse" />
          <div className="h-48 rounded-3xl bg-white/5 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-white/30 text-sm">
        {error ?? "Job not found"}
      </div>
    );
  }

  const isPublished = job.status === "PUBLISHED";

  function handleStatusToggle() {
    if (!job) return;
    const newStatus = isPublished ? "CLOSED" : "PUBLISHED";
    startTransition(async () => {
      await updateJobStatus(job.id, newStatus);
      router.refresh();
    });
  }

  function handleCopyLink() {
    const url = `${window.location.origin}/jobs/${job!.id}/apply`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-4 text-white/50 text-sm">
        <Link href="/jobs" className="hover:text-white transition-colors">Job Postings</Link>
        <span>/</span>
        <span className="text-white">{job.title}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <Badge
            variant="outline"
            className={`font-medium mb-2 ${isPublished ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-400" : "border-white/20 bg-white/5 text-white/60"}`}
          >
            {isPublished ? "Active" : job.status.charAt(0) + job.status.slice(1).toLowerCase()}
          </Badge>
          <h1 className="text-4xl font-medium tracking-tight">{job.title}</h1>
          <p className="text-white/50 font-light flex items-center gap-3 flex-wrap">
            <span>{job.job_type.replace(/_/g, "-")}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>{job.location ?? "Remote"}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>{EXPERIENCE_LABELS[job.experience_level] ?? job.experience_level}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Button
            variant="outline"
            onClick={handleCopyLink}
            className="rounded-full px-5 py-5 text-sm font-medium bg-transparent border border-white/10 text-white hover:bg-white/5 transition-all"
          >
            {copied ? "Copied!" : "Share Link"}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(`/jobs/${job.id}/edit`)}
            className="rounded-full px-5 py-5 text-sm font-medium bg-transparent border border-white/10 text-white hover:bg-white/5 transition-all"
          >
            Edit Role
          </Button>
          <Button
            onClick={() => router.push(`/jobs/${job.id}/applications`)}
            className="rounded-full px-5 py-5 text-sm font-medium bg-white text-black hover:bg-white/90 transition-all"
          >
            View Applications
            {job.applicants_count > 0 && (
              <span className="ml-2 bg-black/10 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {job.applicants_count}
              </span>
            )}
          </Button>
          <Button
            onClick={handleStatusToggle}
            disabled={isPending}
            className={`rounded-full px-5 py-5 text-sm font-medium active:scale-95 transition-all ${
              isPublished
                ? "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                : "bg-emerald-400 text-black hover:bg-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            }`}
          >
            {isPublished ? "Close Posting" : "Publish"}
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Applicants", value: job.applicants_count },
          { label: "AI Matches", value: job.ai_matches_count, highlight: true },
          {
            label: "Posted",
            value: job.published_at ? new Date(job.published_at).toLocaleDateString() : "—",
          },
          {
            label: "Deadline",
            value: job.deadline ? new Date(job.deadline).toLocaleDateString() : "—",
          },
        ].map(({ label, value, highlight }) => (
          <div
            key={label}
            className={`p-1 rounded-[1.5rem] backdrop-blur-xl ${
              highlight
                ? "bg-white/[0.02] border border-emerald-500/20 ring-1 ring-emerald-500/10"
                : "bg-white/[0.02] border border-white/[0.05] ring-1 ring-white/[0.02]"
            }`}
          >
            <div
              className={`h-full rounded-[calc(1.5rem-0.25rem)] p-5 ${
                highlight
                  ? "bg-gradient-to-b from-emerald-500/10 to-transparent"
                  : "bg-gradient-to-b from-white/[0.03] to-transparent"
              }`}
            >
              <span
                className={`text-[10px] uppercase tracking-widest block mb-2 ${
                  highlight ? "text-emerald-400/60" : "text-white/40"
                }`}
              >
                {label}
              </span>
              <div
                className={`text-3xl font-light tracking-tight ${
                  highlight ? "text-emerald-400 font-bold" : "text-white"
                }`}
              >
                {value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Salary */}
      {(job.salary_min || job.salary_max) && (
        <div className="p-1 rounded-[1.5rem] bg-white/[0.02] border border-white/[0.05] ring-1 ring-white/[0.02] backdrop-blur-xl">
          <div className="rounded-[calc(1.5rem-0.25rem)] bg-gradient-to-b from-white/[0.03] to-transparent px-6 py-4 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-white/40">Salary Range</span>
            <span className="text-sm text-white font-medium">
              {job.salary_currency} {job.salary_min} — {job.salary_max}
            </span>
          </div>
        </div>
      )}

      {/* Description */}
      <Section title="Job Description">
        <MarkdownContent text={job.description} />
      </Section>

      {/* Responsibilities */}
      {job.responsibilities && (
        <Section title="Responsibilities">
          <MarkdownContent text={job.responsibilities} />
        </Section>
      )}

      {/* Requirements / AI Criteria */}
      <Section title="Requirements & AI Evaluation Criteria">
        <MarkdownContent text={job.requirements} />
      </Section>

      {/* Qualifications */}
      {job.qualifications && (
        <Section title="Qualifications">
          <MarkdownContent text={job.qualifications} />
        </Section>
      )}

      {/* Screening Questions */}
      {job.screening_questions && (
        <Section title="Screening Questions">
          <div className="space-y-3">
            {job.screening_questions.split("\n").filter(Boolean).map((q, i) => (
              <div key={i} className="flex gap-3 items-start p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <span className="text-xs text-white/40 font-medium mt-0.5 shrink-0">Q{i + 1}</span>
                <p className="text-sm text-white/70 font-light">{q}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Bottom CTA */}
      <div className="flex justify-end pb-8">
        <Button
          onClick={() => router.push(`/jobs/${job.id}/applications`)}
          className="rounded-full px-8 py-6 text-sm font-medium bg-white text-black hover:bg-white/90 transition-all"
        >
          Go to Applications →
        </Button>
      </div>
    </div>
  );
}
