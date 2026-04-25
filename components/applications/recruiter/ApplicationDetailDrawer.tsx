"use client";

import { useEffect, useState } from "react";
import type { ApplicationRow } from "@/types/application";
import { ScorePill } from "./ScorePill";
import { StatusPill } from "./StatusPill";
import { RecommendationPill } from "./RecommendationPill";
import { MatchBreakdownChart } from "./MatchBreakdownChart";
import { CompetencyChart } from "./CompetencyChart";

type Tab = "overview" | "resume" | "interview" | "activity";

type Props = {
  application: ApplicationRow | null;
  onClose: () => void;
  onDecision?: (applicationId: string, decision: "SHORTLISTED" | "REJECTED") => void;
};

export function ApplicationDetailDrawer({ application, onClose, onDecision }: Props) {
  const [tab, setTab] = useState<Tab>("overview");

  useEffect(() => {
    if (application) setTab("overview");
  }, [application?.id]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (application) {
      document.addEventListener("keydown", onEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [application, onClose]);

  if (!application) return null;

  const interviewAvailable = application.interview !== null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <aside
        className="fixed right-0 top-0 z-50 h-full w-full overflow-y-auto border-l border-white/10 bg-neutral-950/95 backdrop-blur-2xl md:w-[60%] lg:w-[52%]"
        role="dialog"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-neutral-950/90 px-8 py-5 backdrop-blur-xl">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-linear-to-br from-white/10 to-transparent text-sm font-medium text-white">
              {application.avatar_initials}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <h2 className="truncate text-lg font-medium text-white">{application.candidate_name}</h2>
                <StatusPill status={application.status} />
              </div>
              <div className="truncate text-xs text-white/40">
                {application.candidate_title} · {application.candidate_email}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-1 border-b border-white/5 px-8">
          {(
            [
              { k: "overview", label: "Overview" },
              { k: "resume", label: "Resume Analysis" },
              { k: "interview", label: `Interview Analysis${interviewAvailable ? "" : " ·"}`, disabled: !interviewAvailable },
              { k: "activity", label: "Activity" },
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

        <div className="px-8 pb-32 pt-6">
          {tab === "overview" && <OverviewTab app={application} />}
          {tab === "resume" && <ResumeTab app={application} />}
          {tab === "interview" && application.interview && <InterviewTab app={application} />}
          {tab === "activity" && <ActivityTab app={application} />}
        </div>

        <DecisionBar application={application} onDecision={onDecision} />
      </aside>
    </>
  );
}

function OverviewTab({ app }: { app: ApplicationRow }) {
  const hasInterview = app.interview !== null;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <BigScoreCard
          label="Resume Score"
          score={app.resume.score}
          rec={app.resume.recommendation}
          sublabel="vs Job Description"
        />
        <BigScoreCard
          label="Interview Score"
          score={app.interview?.score ?? null}
          rec={app.interview?.recommendation ?? null}
          sublabel={hasInterview ? "AI evaluation" : "Not yet interviewed"}
          highlighted={hasInterview}
        />
      </div>

      <Card title="Summary">
        <p className="text-sm font-light text-white/70 leading-relaxed">
          {hasInterview ? app.interview!.summary : app.resume.summary}
        </p>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card title="Top Strengths">
          <ul className="space-y-2">
            {app.resume.strengths.slice(0, 3).map((s, i) => (
              <li key={i} className="flex gap-2 text-sm font-light text-white/70">
                <span className="text-emerald-400">✦</span> {s}
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Gaps to Probe">
          <ul className="space-y-2">
            {app.resume.gaps.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm font-light text-white/50">
                <span className="text-red-400/60">⨯</span> {s}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function ResumeTab({ app }: { app: ApplicationRow }) {
  return (
    <div className="space-y-6">
      <Card title="Match Breakdown">
        <MatchBreakdownChart
          skills={app.resume.skills_match}
          experience={app.resume.experience_match}
          education={app.resume.education_match}
        />
      </Card>

      <Card title="Matched Keywords">
        <div className="flex flex-wrap gap-1.5">
          {app.resume.matched_keywords.map((k) => (
            <span key={k} className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] text-emerald-300">
              {k}
            </span>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card title="Strengths">
          <ul className="space-y-2">
            {app.resume.strengths.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm font-light text-white/70">
                <span className="text-emerald-400">✦</span> {s}
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Gaps / Concerns">
          <ul className="space-y-2">
            {app.resume.gaps.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm font-light text-white/50">
                <span className="text-red-400/60">⨯</span> {s}
              </li>
            ))}
          </ul>
        </Card>
      </div>

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

      <div className="flex items-center gap-3">
        <button className="text-xs text-emerald-300 hover:text-emerald-200">↓ Download resume PDF</button>
      </div>
    </div>
  );
}

function InterviewTab({ app }: { app: ApplicationRow }) {
  const i = app.interview!;
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-emerald-400/15 bg-emerald-400/5 p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-emerald-300/80">Final Recommendation</div>
            <div className="mt-1 flex items-center gap-3">
              <RecommendationPill rec={i.recommendation} />
              <span className="text-xs text-white/50">Confidence: {(i.confidence * 100).toFixed(0)}%</span>
            </div>
          </div>
          <ScorePill score={i.score} size="lg" />
        </div>
        <p className="mt-4 text-sm font-light text-white/70 leading-relaxed">{i.summary}</p>
      </div>

      <Card title="Competency Scores">
        <CompetencyChart competencies={i.competencies} />
      </Card>

      <Card title="Question by Question">
        <div className="space-y-5">
          {i.questions.map((q, idx) => (
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

      {i.transcript_url && (
        <button className="text-xs text-emerald-300 hover:text-emerald-200">→ Open full transcript</button>
      )}
    </div>
  );
}

function ActivityTab({ app }: { app: ApplicationRow }) {
  return (
    <Card title="Timeline">
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

function BigScoreCard({
  label,
  score,
  rec,
  sublabel,
  highlighted,
}: {
  label: string;
  score: number | null;
  rec: ApplicationRow["resume"]["recommendation"] | null;
  sublabel: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border p-5 ${
        highlighted
          ? "border-emerald-400/25 bg-emerald-400/5 ring-1 ring-emerald-400/10"
          : "border-white/5 bg-white/2 ring-1 ring-white/2"
      }`}
    >
      <div className="text-[10px] uppercase tracking-widest text-white/40">{label}</div>
      <div className="mt-3 flex items-baseline gap-2">
        {score != null ? (
          <>
            <div
              className={`text-4xl font-bold ${
                score >= 90
                  ? "text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                  : score >= 75
                  ? "text-blue-400"
                  : score >= 60
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {score}
            </div>
            <div className="text-xs text-white/40">/ 100</div>
          </>
        ) : (
          <div className="text-2xl text-white/30">—</div>
        )}
      </div>
      <div className="mt-2 text-xs text-white/50">{sublabel}</div>
      {rec && (
        <div className="mt-3">
          <RecommendationPill rec={rec} />
        </div>
      )}
    </div>
  );
}

function DecisionBar({ application, onDecision }: { application: ApplicationRow; onDecision?: (id: string, d: "SHORTLISTED" | "REJECTED") => void }) {
  const s = application.status;

  const canShortlist = s === "APPLIED" || s === "UNDER_REVIEW" || s === "SCREENING";
  const canReject = s === "APPLIED" || s === "UNDER_REVIEW" || s === "SCREENING" || s === "SHORTLISTED";

  if (!canShortlist && !canReject) {
    return (
      <div className="fixed bottom-0 right-0 z-50 w-full border-t border-white/10 bg-neutral-950/95 p-4 backdrop-blur-xl md:w-[60%] lg:w-[52%]">
        <div className="flex items-center justify-center">
          <span className="text-xs text-white/30 uppercase tracking-widest">
            {s.replace(/_/g, " ")}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 w-full border-t border-white/10 bg-neutral-950/95 p-4 backdrop-blur-xl md:w-[60%] lg:w-[52%]">
      <div className="flex items-center gap-3">
        {canShortlist && (
          <button
            type="button"
            onClick={() => onDecision?.(application.id, "SHORTLISTED")}
            className="flex-1 rounded-2xl py-3 text-sm font-medium transition-all active:scale-95 bg-emerald-400 text-black hover:bg-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            Shortlist for Interview
          </button>
        )}
        {canReject && (
          <button
            type="button"
            onClick={() => onDecision?.(application.id, "REJECTED")}
            className="flex-1 rounded-2xl py-3 text-sm font-medium transition-all active:scale-95 border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
          >
            Reject
          </button>
        )}
      </div>
    </div>
  );
}
