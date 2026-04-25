"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import type {
  AiRecommendation,
  ApiApplicationRow,
  ApplicationRow,
  ApplicationStatus,
  RecruiterApplicationsResponse,
} from "@/types/application";
import { ScorePill } from "@/components/applications/recruiter/ScorePill";
import { StatusPill } from "@/components/applications/recruiter/StatusPill";
import { RecommendationPill } from "@/components/applications/recruiter/RecommendationPill";

// ─── mock data (replace with DAL/fetch) ──────────────────────────────────────

const MOCK: Record<string, ApplicationRow> = {
  a1: {
    id: "a1",
    candidate_name: "Elara Vance",
    candidate_title: "Staff Frontend Engineer @ Figma",
    candidate_location: "Remote · Berlin",
    candidate_email: "elara@example.com",
    avatar_initials: "EV",
    applied_at: "2026-04-22T08:20:00Z",
    status: "INTERVIEWED",
    resume: {
      score: 94,
      recommendation: "STRONG_HIRE",
      summary: "Exceptional technical fit. Matches 9/10 core requirements including Next.js App Router, design systems, and perf budgets.",
      skills_match: 96,
      experience_match: 92,
      education_match: 88,
      matched_keywords: ["Next.js 15", "React Server Components", "Design Systems", "Accessibility", "Tailwind"],
      strengths: ["10+ years React / Next.js including App Router migrations", "Built and scaled a 120-component design system", "Owned Core Web Vitals rollout shipping sub-200ms LCP"],
      gaps: ["No formal management title", "Limited backend Python exposure"],
      screening_answers: [
        { question: "Why are you leaving your current role?", answer: "Looking for a smaller team and product ownership." },
        { question: "Earliest start date?", answer: "Four weeks from offer." },
      ],
    },
    interview: {
      score: 91,
      recommendation: "STRONG_HIRE",
      confidence: 0.86,
      summary: "Articulated complex architectural tradeoffs with clarity. Strong systems thinking; minor hesitation on live coding edge cases.",
      competencies: [
        { label: "Communication", score: 94 },
        { label: "Technical Depth", score: 92 },
        { label: "Problem Solving", score: 88 },
        { label: "Culture Fit", score: 90 },
      ],
      questions: [
        { question: "Walk me through how you'd migrate a Pages Router app to App Router.", answer_excerpt: "Start by co-locating server and client components, then migrate data fetching to server components…", rating: 5, note: "Clear, staged, considers rollback." },
        { question: "How would you debug a sudden LCP regression in production?", answer_excerpt: "Check RUM first, bisect deploys, then open the waterfall for the slowest segment…", rating: 5, note: "Excellent mental model." },
        { question: "Design a component library API for theming.", answer_excerpt: "Tokens at the CSS variable layer, semantic aliasing on top…", rating: 4, note: "Solid; missed a case on dark-mode token inheritance." },
      ],
      transcript_url: "#",
      conducted_at: "2026-04-21T15:00:00Z",
    },
    activity: [
      { at: "2026-04-21T15:45:00Z", label: "Interview completed", by: "AI Interviewer" },
      { at: "2026-04-20T09:12:00Z", label: "Interview scheduled", by: "Sarah K." },
      { at: "2026-04-19T10:02:00Z", label: "Shortlisted", by: "Sarah K." },
      { at: "2026-04-22T08:20:00Z", label: "Applied", by: "Candidate" },
    ],
  },
  a2: {
    id: "a2",
    candidate_name: "Julian Thorne",
    candidate_title: "Senior SWE @ Stripe",
    candidate_location: "London, UK",
    candidate_email: "julian@example.com",
    avatar_initials: "JT",
    applied_at: "2026-04-21T10:00:00Z",
    status: "INTERVIEWED",
    resume: {
      score: 88,
      recommendation: "HIRE",
      summary: "Strong generalist with infra leanings. Frontend depth is solid but narrower than top candidates.",
      skills_match: 84,
      experience_match: 90,
      education_match: 85,
      matched_keywords: ["React", "TypeScript", "GraphQL", "Performance"],
      strengths: ["Owned checkout flow at Stripe for 3 years", "Strong TypeScript fundamentals"],
      gaps: ["Limited App Router experience", "No design system leadership"],
      screening_answers: [
        { question: "Why are you leaving your current role?", answer: "Want to be closer to the product." },
        { question: "Earliest start date?", answer: "Two months out." },
      ],
    },
    interview: {
      score: 82,
      recommendation: "HIRE",
      confidence: 0.78,
      summary: "Methodical and precise. Less expressive than expected when pushed into ambiguity.",
      competencies: [
        { label: "Communication", score: 80 },
        { label: "Technical Depth", score: 88 },
        { label: "Problem Solving", score: 84 },
        { label: "Culture Fit", score: 76 },
      ],
      questions: [
        { question: "How do you approach a frontend that feels slow?", answer_excerpt: "Measure first, then split by network, CPU, and render…", rating: 4, note: "Good framework." },
      ],
      transcript_url: "#",
      conducted_at: "2026-04-22T11:00:00Z",
    },
    activity: [
      { at: "2026-04-22T11:40:00Z", label: "Interview completed", by: "AI Interviewer" },
      { at: "2026-04-21T10:00:00Z", label: "Applied", by: "Candidate" },
    ],
  },
};

// ─── tabs ─────────────────────────────────────────────────────────────────────

type Tab = "candidate" | "resume" | "interview";

function toApplicationRow(app: ApiApplicationRow): ApplicationRow {
  const d = app.match_details;
  return {
    id: app.id,
    candidate_name: app.candidate_name,
    candidate_title: app.candidate_title ?? "",
    candidate_location: app.candidate_location ?? "",
    candidate_email: app.candidate_email,
    avatar_initials: app.avatar_initials,
    applied_at: app.applied_at,
    status: app.status as ApplicationStatus,
    resume: {
      score: app.match_score ?? 0,
      recommendation: (d?.recommendation as AiRecommendation) ?? "MAYBE",
      summary: d?.summary ?? "AI analysis pending…",
      skills_match: d?.skills_match ?? 0,
      experience_match: d?.experience_match ?? 0,
      education_match: d?.education_match ?? 0,
      matched_keywords: (d?.matched_keywords as string[]) ?? [],
      strengths: (d?.strengths as string[]) ?? [],
      gaps: (d?.gaps as string[]) ?? [],
      screening_answers: (d?.screening_answers as Array<{ question: string; answer: string }>) ?? [],
    },
    interview: app.interview
      ? {
          score: 0,
          recommendation: "MAYBE",
          confidence: 0,
          summary: "Interview data will appear here once analysis is available.",
          competencies: [],
          questions: [],
          conducted_at: "",
        }
      : null,
    activity: [],
  };
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function ApplicationDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ jobId?: string }>;
}) {
  const { id } = use(params);
  const { jobId } = use(searchParams);
  const [app, setApp] = useState<ApplicationRow | null>(() => MOCK[id] ?? null);
  const [loading, setLoading] = useState<boolean>(!!jobId && !MOCK[id]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("candidate");

  useEffect(() => {
    let cancelled = false;

    async function loadApplication() {
      if (!jobId) {
        setLoading(false);
        if (!MOCK[id]) setLoadError("Missing job context. Open details from the applications list.");
        return;
      }

      setLoading(true);
      setLoadError(null);

      try {
        let found: ApiApplicationRow | undefined;
        let page = 1;
        let total = 0;
        const limit = 50;

        do {
          const res = await fetch(`/api/applications/recruiter/${jobId}?page=${page}&limit=${limit}`, {
            cache: "no-store",
          });
          if (!res.ok) throw new Error("Failed to load job applications");

          const body = (await res.json()) as {
            success: boolean;
            data: RecruiterApplicationsResponse;
          };

          if (!body.success) throw new Error("Invalid response");

          found = body.data.applications.find((a) => a.id === id);
          total = body.data.total;
          page += 1;
        } while (!found && (page - 1) * limit < total);

        if (cancelled) return;

        if (!found) {
          setApp(MOCK[id] ?? null);
          return;
        }

        setApp(toApplicationRow(found));
      } catch {
        if (cancelled) return;
        setLoadError("Could not load application details.");
        setApp(MOCK[id] ?? null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadApplication();

    return () => {
      cancelled = true;
    };
  }, [id, jobId]);

  const backHref = jobId ? `/applications?jobId=${jobId}` : "/applications";

  if (loading) {
    return <ApplicationDetailSkeleton backHref={backHref} />;
  }

  if (!app) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-2 text-white/40">
        <div className="text-sm">Application not found.</div>
        {loadError && <div className="text-xs text-white/30">{loadError}</div>}
        <Link href={backHref} className="text-xs text-emerald-400 hover:text-emerald-300">← Back to applications</Link>
      </div>
    );
  }

  const interviewAvailable = app.interview !== null;

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in-up">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-white/40">
        <Link href={backHref} className="hover:text-white transition-colors">Applications</Link>
        <span>/</span>
        <span className="text-white/70">{app.candidate_name}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-5 rounded-[2rem] border border-white/5 bg-white/2 p-6 ring-1 ring-white/2 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-linear-to-br from-white/10 to-transparent text-base font-medium text-white">
            {app.avatar_initials}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-medium text-white">{app.candidate_name}</h1>
              <StatusPill status={app.status} />
            </div>
            <div className="mt-0.5 text-sm font-light text-white/50">
              {app.candidate_title} · {app.candidate_location}
            </div>
            <div className="mt-0.5 text-xs text-white/35">{app.candidate_email}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-widest text-white/35">Resume Score</div>
            <ScorePill score={app.resume.score} />
          </div>
          {interviewAvailable && (
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-widest text-emerald-300/60">Interview Score</div>
              <ScorePill score={app.interview!.score} />
            </div>
          )}
        </div>
      </div>

      {/* Decision bar */}
      <DecisionBar app={app} />

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-white/5">
        {(
          [
            { k: "candidate", label: "Candidate Details" },
            { k: "resume", label: "Resume Analysis" },
            { k: "interview", label: "Interview Analysis", disabled: !interviewAvailable },
          ] as Array<{ k: Tab; label: string; disabled?: boolean }>
        ).map((t) => (
          <button
            key={t.k}
            type="button"
            disabled={t.disabled}
            onClick={() => setTab(t.k)}
            className={`relative px-4 py-3 text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
              tab === t.k ? "text-white" : "text-white/50 hover:text-white/80"
            }`}
          >
            {t.label}
            {tab === t.k && <span className="absolute inset-x-3 -bottom-px h-px bg-emerald-400" />}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="pb-16">
        {tab === "candidate" && <CandidateTab app={app} />}
        {tab === "resume" && <ResumeTab app={app} />}
        {tab === "interview" && interviewAvailable && <InterviewTab app={app} />}
      </div>
    </div>
  );
}

// ─── Decision bar ─────────────────────────────────────────────────────────────

function DecisionBar({ app }: { app: ApplicationRow }) {
  const isInterviewCompleted = app.status === "INTERVIEWED";
  const buttons: Array<{ label: string; variant: "primary" | "danger" | "ghost" }> = [];

  if (isInterviewCompleted) {
    buttons.push({ label: "Shortlist for Final Onsite Interview", variant: "primary" });
    buttons.push({ label: "Reject", variant: "danger" });
  } else {
    buttons.push({ label: "Shortlist for Interview", variant: "primary" });
    buttons.push({ label: "Reject", variant: "danger" });
  }

  return (
    <div className="flex items-center gap-3">
      {buttons.map((b) => (
        <button
          key={b.label}
          type="button"
          className={`flex-1 rounded-2xl py-3 text-sm font-medium transition-all active:scale-95 ${
            b.variant === "primary"
              ? "bg-emerald-400 text-black hover:bg-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              : b.variant === "danger"
              ? "border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
              : "border border-white/10 text-white/70 hover:bg-white/5 hover:text-white"
          }`}
        >
          {b.label}
        </button>
      ))}
    </div>
  );
}

// ─── Candidate tab ────────────────────────────────────────────────────────────

function CandidateTab({ app }: { app: ApplicationRow }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Card title="Contact">
          <dl className="space-y-3">
            <InfoRow label="Email" value={app.candidate_email} />
            <InfoRow label="Location" value={app.candidate_location} />
            <InfoRow label="Current role" value={app.candidate_title} />
            <InfoRow label="Applied" value={new Date(app.applied_at).toLocaleDateString(undefined, { dateStyle: "medium" })} />
          </dl>
        </Card>

        <Card title="Application Status">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/50">Current status</span>
              <StatusPill status={app.status} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/50">AI recommendation</span>
              <RecommendationPill rec={app.interview?.recommendation ?? app.resume.recommendation} />
            </div>
          </div>
        </Card>
      </div>

      <Card title="Activity Timeline">
        <div className="space-y-4">
          {app.activity.map((a, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-400/60" />
              <div>
                <div className="text-sm text-white">{a.label}</div>
                <div className="text-xs text-white/40">
                  {new Date(a.at).toLocaleString()} · {a.by}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Resume tab ───────────────────────────────────────────────────────────────

function ResumeTab({ app }: { app: ApplicationRow }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <ScoreCard label="Resume Score" score={app.resume.score} />
        <ScoreCard label="Skills Match" score={app.resume.skills_match} />
        <ScoreCard label="Experience Match" score={app.resume.experience_match} />
      </div>

      <Card title="Match Breakdown">
        <div className="space-y-3">
          <BreakdownBar label="Skills" value={app.resume.skills_match} />
          <BreakdownBar label="Experience" value={app.resume.experience_match} />
          <BreakdownBar label="Education" value={app.resume.education_match} />
        </div>
      </Card>

      <Card title="Summary">
        <p className="text-sm font-light text-white/70 leading-relaxed">{app.resume.summary}</p>
      </Card>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Card title="Key Strengths">
          <ul className="space-y-2">
            {app.resume.strengths.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm font-light text-white/70">
                <span className="text-emerald-400 shrink-0">✦</span> {s}
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Gaps / Concerns">
          <ul className="space-y-2">
            {app.resume.gaps.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm font-light text-white/50">
                <span className="text-red-400/60 shrink-0">⨯</span> {s}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title="Matched Keywords">
        <div className="flex flex-wrap gap-1.5">
          {app.resume.matched_keywords.map((k) => (
            <span key={k} className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] text-emerald-300">
              {k}
            </span>
          ))}
        </div>
      </Card>

      {app.resume.screening_answers.length > 0 && (
        <Card title="Screening Answers">
          <div className="space-y-4">
            {app.resume.screening_answers.map((qa, i) => (
              <div key={i}>
                <div className="text-xs uppercase tracking-widest text-white/40">{qa.question}</div>
                <div className="mt-1 text-sm font-light text-white/70">{qa.answer}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <button className="text-xs text-emerald-300 hover:text-emerald-200 transition-colors">↓ Download resume PDF</button>
    </div>
  );
}

// ─── Interview tab ────────────────────────────────────────────────────────────

function InterviewTab({ app }: { app: ApplicationRow }) {
  const iv = app.interview!;
  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-emerald-400/15 bg-emerald-400/5 p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-emerald-300/80">Final Recommendation</div>
            <div className="mt-1 flex items-center gap-3">
              <RecommendationPill rec={iv.recommendation} />
              <span className="text-xs text-white/50">Confidence: {(iv.confidence * 100).toFixed(0)}%</span>
            </div>
          </div>
          <ScorePill score={iv.score} size="lg" />
        </div>
        <p className="mt-4 text-sm font-light text-white/70 leading-relaxed">{iv.summary}</p>
      </div>

      <Card title="Competency Scores">
        <div className="space-y-3">
          {iv.competencies.map((c) => (
            <BreakdownBar key={c.label} label={c.label} value={c.score} />
          ))}
        </div>
      </Card>

      <Card title="Question by Question">
        <div className="space-y-5">
          {iv.questions.map((q, idx) => (
            <div key={idx} className="border-l-2 border-white/10 pl-4">
              <div className="flex items-start justify-between gap-3">
                <div className="text-sm text-white">{q.question}</div>
                <div className="shrink-0 text-[11px] font-medium text-emerald-300">{q.rating}/5</div>
              </div>
              <div className="mt-2 text-sm font-light italic text-white/50">"{q.answer_excerpt}"</div>
              <div className="mt-1 text-xs text-white/40">{q.note}</div>
            </div>
          ))}
        </div>
      </Card>

      {iv.transcript_url && (
        <a href={iv.transcript_url} className="text-xs text-emerald-300 hover:text-emerald-200 transition-colors">
          → Open full transcript
        </a>
      )}
    </div>
  );
}

function ApplicationDetailSkeleton({ backHref }: { backHref: string }) {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-2 text-xs text-white/40">
        <Link href={backHref} className="hover:text-white transition-colors">Applications</Link>
        <span>/</span>
        <SkeletonLine className="h-3 w-32" />
      </div>

      <div className="flex flex-col gap-5 rounded-[2rem] border border-white/5 bg-white/2 p-6 ring-1 ring-white/2 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full border border-white/10 bg-white/5 animate-pulse" />
          <div className="space-y-2">
            <SkeletonLine className="h-6 w-44" />
            <SkeletonLine className="h-4 w-64" />
            <SkeletonLine className="h-3 w-52" />
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="space-y-2">
            <SkeletonLine className="h-3 w-20 ml-auto" />
            <SkeletonLine className="h-7 w-14 ml-auto" />
          </div>
          <div className="space-y-2">
            <SkeletonLine className="h-3 w-24 ml-auto" />
            <SkeletonLine className="h-7 w-14 ml-auto" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <SkeletonLine className="h-11 flex-1 rounded-2xl" />
        <SkeletonLine className="h-11 flex-1 rounded-2xl" />
      </div>

      <div className="flex items-center gap-1 border-b border-white/5">
        <SkeletonLine className="h-10 w-36 rounded-none" />
        <SkeletonLine className="h-10 w-32 rounded-none" />
        <SkeletonLine className="h-10 w-36 rounded-none" />
      </div>

      <div className="space-y-5 pb-16">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <SkeletonCard className="h-44" />
          <SkeletonCard className="h-44" />
        </div>
        <SkeletonCard className="h-52" />
      </div>
    </div>
  );
}

// ─── Shared primitives ────────────────────────────────────────────────────────

function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`rounded-md bg-white/10 animate-pulse ${className}`} />;
}

function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-3xl border border-white/5 bg-white/2 p-5 ring-1 ring-white/2 ${className}`}>
      <div className="space-y-3">
        <SkeletonLine className="h-3 w-24" />
        <SkeletonLine className="h-4 w-full" />
        <SkeletonLine className="h-4 w-5/6" />
        <SkeletonLine className="h-4 w-2/3" />
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/5 bg-white/2 p-5 ring-1 ring-white/2">
      <div className="mb-3 text-[10px] uppercase tracking-widest text-white/40">{title}</div>
      {children}
    </div>
  );
}

function BreakdownBar({ label, value }: { label: string; value: number }) {
  const color = value >= 85 ? "bg-emerald-400" : value >= 70 ? "bg-blue-400" : value >= 55 ? "bg-yellow-400" : "bg-red-400";
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-white/60">{label}</span>
        <span className="font-medium text-white">{value}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function ScoreCard({ label, score }: { label: string; score: number }) {
  const color = score >= 90 ? "text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]" : score >= 75 ? "text-blue-400" : score >= 60 ? "text-yellow-400" : "text-red-400";
  return (
    <div className="rounded-3xl border border-white/5 bg-white/2 p-5 ring-1 ring-white/2">
      <div className="text-[10px] uppercase tracking-widest text-white/40">{label}</div>
      <div className={`mt-2 text-4xl font-bold ${color}`}>{score}</div>
      <div className="text-xs text-white/30">/ 100</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-xs text-white/40 shrink-0">{label}</dt>
      <dd className="text-sm font-light text-white/80 text-right">{value}</dd>
    </div>
  );
}
