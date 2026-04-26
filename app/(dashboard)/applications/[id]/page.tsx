"use client";

import { use, useState, useTransition } from "react";
import Link from "next/link";
import type { ApplicationRow, ApplicationStatus } from "@/types/application";
import { ScorePill } from "@/components/applications/recruiter/ScorePill";
import { StatusPill } from "@/components/applications/recruiter/StatusPill";
import { RecommendationPill } from "@/components/applications/recruiter/RecommendationPill";
import { ShortlistModal } from "@/components/applications/recruiter/ShortlistModal";
import { updateApplicationDecision } from "@/app/actions/applications";
import { useApplicationDetail } from "@/hooks/useApplicationDetail";

type Tab = "candidate" | "resume" | "interview";

export default function ApplicationDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ jobId?: string }>;
}) {
  const { id } = use(params);
  const { jobId } = use(searchParams);
  const { app, loading, error, updateStatus } = useApplicationDetail(id, jobId);
  const [tab, setTab] = useState<Tab>("candidate");

  const backHref = jobId ? `/applications?jobId=${jobId}` : "/applications";

  if (loading) {
    return <ApplicationDetailSkeleton backHref={backHref} />;
  }

  if (!app) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-2 text-white/40">
        <div className="text-sm">Application not found.</div>
        {error && <div className="text-xs text-white/30">{error}</div>}
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
      <DecisionBar
        app={app}
        jobId={jobId ?? ""}
        onStatusChange={updateStatus}
      />

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

function DecisionBar({
  app,
  jobId,
  onStatusChange,
}: {
  app: ApplicationRow;
  jobId: string;
  onStatusChange: (status: ApplicationStatus) => void;
}) {
  const [showShortlistModal, setShowShortlistModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const s = app.status;
  const canShortlist = s === "APPLIED" || s === "UNDER_REVIEW" || s === "SCREENING";
  const isShortlisted = s === "SHORTLISTED";
  const canReject = s === "APPLIED" || s === "UNDER_REVIEW" || s === "SCREENING";
  const isTerminal = s === "HIRED" || s === "REJECTED" || s === "WITHDRAWN";
  const isInProgress = s === "INTERVIEW_SCHEDULED" || s === "INTERVIEWED";

  function commit(decision: "SHORTLISTED" | "REJECTED", customQuestions?: string[]) {
    setError(null);
    startTransition(async () => {
      const result = await updateApplicationDecision(app.id, jobId, decision, undefined, customQuestions);
      if (!result.success) {
        setError(result.error ?? "Failed to update decision");
      } else {
        onStatusChange(decision);
      }
    });
  }

  if (isTerminal) {
    const config =
      s === "HIRED"
        ? { icon: "✓", label: "Candidate Hired", color: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400" }
        : s === "REJECTED"
        ? { icon: "✕", label: "Application Rejected", color: "border-red-500/20 bg-red-500/5 text-red-400" }
        : { icon: "↩", label: "Candidate Withdrew", color: "border-white/10 bg-white/2 text-white/40" };
    return (
      <div className={`flex items-center gap-2.5 justify-center rounded-2xl border px-4 py-3 ${config.color}`}>
        <span className="text-base leading-none">{config.icon}</span>
        <span className="text-sm font-medium">{config.label}</span>
      </div>
    );
  }

  if (isInProgress) {
    return (
      <div className="flex items-center justify-between rounded-2xl border border-emerald-500/15 bg-emerald-500/5 px-5 py-3">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-emerald-300">
            {s === "INTERVIEW_SCHEDULED" ? "Interview scheduled — awaiting completion" : "Interview completed — analysis in progress"}
          </span>
        </div>
        <span className="text-xs text-white/30 uppercase tracking-widest">{s.replace(/_/g, " ")}</span>
      </div>
    );
  }

  if (isShortlisted) {
    return (
      <>
        {showShortlistModal && (
          <ShortlistModal
            onConfirm={(questions) => {
              setShowShortlistModal(false);
              commit("SHORTLISTED", questions);
            }}
            onCancel={() => setShowShortlistModal(false)}
          />
        )}
        <div className="space-y-2">
          {error && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400">
              {error}
            </div>
          )}
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-3">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-base leading-none">✓</span>
                <span className="text-sm font-medium text-emerald-300">Shortlisted for Interview</span>
              </div>
              <p className="mt-0.5 text-xs text-white/40">
                Interview invite sent. Awaiting candidate confirmation.
              </p>
            </div>
            <button
              type="button"
              disabled={isPending}
              onClick={() => commit("REJECTED")}
              className="shrink-0 rounded-xl border border-red-500/20 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/10 hover:border-red-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Saving…" : "Revoke & Reject"}
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {showShortlistModal && (
        <ShortlistModal
          onConfirm={(questions) => {
            setShowShortlistModal(false);
            commit("SHORTLISTED", questions);
          }}
          onCancel={() => setShowShortlistModal(false)}
        />
      )}
      <div className="space-y-2">
        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400">
            {error}
          </div>
        )}
        <div className="flex items-center gap-3">
          {canShortlist && (
            <button
              type="button"
              disabled={isPending}
              onClick={() => setShowShortlistModal(true)}
              className="flex-1 rounded-2xl py-3 text-sm font-medium transition-all active:scale-95 bg-emerald-400 text-black hover:bg-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Saving…" : "Shortlist for Interview"}
            </button>
          )}
          {canReject && (
            <button
              type="button"
              disabled={isPending}
              onClick={() => commit("REJECTED")}
              className="flex-1 rounded-2xl py-3 text-sm font-medium transition-all active:scale-95 border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Saving…" : "Reject"}
            </button>
          )}
        </div>
      </div>
    </>
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

const PROGRESSION_CONFIG = {
  STRONG: { label: "Strong Progression", color: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10" },
  STEADY: { label: "Steady Career", color: "text-blue-400 border-blue-400/20 bg-blue-400/10" },
  UNCLEAR: { label: "Unclear Trajectory", color: "text-yellow-400 border-yellow-400/20 bg-yellow-400/10" },
  CONCERNING: { label: "Concerning Pattern", color: "text-red-400 border-red-400/20 bg-red-400/10" },
} as const;

const RELEVANCE_CONFIG = {
  HIGHLY_RELEVANT: { label: "Highly Relevant", color: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10" },
  RELEVANT: { label: "Relevant", color: "text-blue-400 border-blue-400/20 bg-blue-400/10" },
  PARTIALLY_RELEVANT: { label: "Partially Relevant", color: "text-yellow-400 border-yellow-400/20 bg-yellow-400/10" },
  NOT_RELEVANT: { label: "Not Relevant", color: "text-red-400 border-red-400/20 bg-red-400/10" },
} as const;

function ResumeTab({ app }: { app: ApplicationRow }) {
  const r = app.resume;
  const progression = PROGRESSION_CONFIG[r.career_progression] ?? PROGRESSION_CONFIG.UNCLEAR;
  const relevance = RELEVANCE_CONFIG[r.experience_relevance] ?? RELEVANCE_CONFIG.PARTIALLY_RELEVANT;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <ScoreCard label="Resume Score" score={r.score} />
        <ScoreCard label="Skills Match" score={r.skills_match} />
        <ScoreCard label="Experience Match" score={r.experience_match} />
      </div>

      {/* Signal badges row */}
      <div className="flex flex-wrap gap-2">
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${progression.color}`}>
          <span>↗</span> {progression.label}
        </span>
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${relevance.color}`}>
          <span>◎</span> {relevance.label}
        </span>
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
          r.has_quantified_achievements
            ? "text-emerald-400 border-emerald-400/20 bg-emerald-400/10"
            : "text-white/40 border-white/10 bg-white/5"
        }`}>
          <span>#</span> {r.has_quantified_achievements ? "Has Metrics" : "No Metrics"}
        </span>
      </div>

      <Card title="Match Breakdown">
        <div className="space-y-3">
          <BreakdownBar label="Skills" value={r.skills_match} />
          <BreakdownBar label="Experience" value={r.experience_match} />
          <BreakdownBar label="Education" value={r.education_match} />
        </div>
      </Card>

      <Card title="AI Summary">
        <p className="text-sm font-light text-white/70 leading-relaxed">{r.summary}</p>
      </Card>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Card title="Key Strengths">
          <ul className="space-y-2">
            {r.strengths.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm font-light text-white/70">
                <span className="text-emerald-400 shrink-0 mt-0.5">✦</span> {s}
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Gaps / Concerns">
          <ul className="space-y-2">
            {r.gaps.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm font-light text-white/50">
                <span className="text-yellow-400/60 shrink-0 mt-0.5">△</span> {s}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {r.red_flags.length > 0 && (
        <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-5">
          <div className="mb-3 text-[10px] uppercase tracking-widest text-red-400/80">Red Flags</div>
          <ul className="space-y-2">
            {r.red_flags.map((flag, i) => (
              <li key={i} className="flex gap-2 text-sm font-light text-red-300/80">
                <span className="text-red-400 shrink-0 mt-0.5">⨯</span> {flag}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Card title="Matched Keywords">
        <div className="flex flex-wrap gap-1.5">
          {r.matched_keywords.map((k) => (
            <span key={k} className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] text-emerald-300">
              {k}
            </span>
          ))}
        </div>
      </Card>

      {r.screening_answers.length > 0 && (
        <Card title="Screening Answers">
          <div className="space-y-4">
            {r.screening_answers.map((qa, i) => (
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
