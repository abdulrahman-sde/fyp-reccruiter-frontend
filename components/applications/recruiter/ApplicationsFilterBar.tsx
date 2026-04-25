"use client";

import { useEffect, useRef, useState } from "react";
import type {
  ApplicationsFilters,
  ApplicationsSortKey,
} from "@/types/application";

type Props = {
  filters: ApplicationsFilters;
  anyInterview: boolean;
  onChange: (patch: Partial<ApplicationsFilters>) => void;
};

type MenuKey = "resume" | "interview" | "sort" | null;

const RESUME_BUCKETS: Array<{ value: ApplicationsFilters["resume_score_bucket"]; label: string }> = [
  { value: "ANY", label: "Any score" },
  { value: "90+", label: "90+" },
  { value: "70-89", label: "70–89" },
  { value: "50-69", label: "50–69" },
  { value: "<50", label: "<50" },
];

const SORTS = (anyInterview: boolean): Array<{ value: ApplicationsSortKey; label: string; disabled?: boolean }> => [
  { value: "interview_score", label: "Interview score (high → low)", disabled: !anyInterview },
  { value: "resume_score", label: "Resume score (high → low)" },
  { value: "combined_score", label: "Combined score (70/30)" },
  { value: "recent", label: "Most recent" },
  { value: "status", label: "Status" },
];

export function ApplicationsFilterBar({ filters, anyInterview, onChange }: Props) {
  const [open, setOpen] = useState<MenuKey>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(null);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const sortLabel = SORTS(anyInterview).find((s) => s.value === filters.sort)?.label ?? "Sort";
  const resumeLabel =
    filters.resume_score_bucket === "ANY"
      ? "Resume score"
      : `Resume · ${RESUME_BUCKETS.find((b) => b.value === filters.resume_score_bucket)!.label}`;
  const interviewLabel =
    filters.interview_score_bucket === "ANY"
      ? "Interview score"
      : `Interview · ${RESUME_BUCKETS.find((b) => b.value === filters.interview_score_bucket)!.label}`;

  return (
    <div
      ref={wrapRef}
      className="flex flex-col gap-3 rounded-full border border-white/5 bg-white/2 p-2 ring-1 ring-white/2 backdrop-blur-xl md:flex-row md:items-center md:gap-2 animate-fade-in-up animation-delay-100"
    >
      <div className="relative flex-1 min-w-0">
        <input
          type="text"
          placeholder="Search candidates…"
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          className="h-10 w-full rounded-full bg-white/5 border border-white/10 pl-10 pr-4 text-sm font-light text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
        />
        <svg
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <DropdownButton
          label={resumeLabel}
          active={filters.resume_score_bucket !== "ANY"}
          isOpen={open === "resume"}
          onToggle={() => setOpen(open === "resume" ? null : "resume")}
        >
          {RESUME_BUCKETS.map((b) => (
            <MenuItem
              key={b.value}
              label={b.label}
              selected={filters.resume_score_bucket === b.value}
              onClick={() => {
                onChange({ resume_score_bucket: b.value });
                setOpen(null);
              }}
            />
          ))}
        </DropdownButton>

        <DropdownButton
          label={interviewLabel}
          active={filters.interview_score_bucket !== "ANY"}
          isOpen={open === "interview"}
          onToggle={() => setOpen(open === "interview" ? null : "interview")}
          disabled={!anyInterview}
        >
          {RESUME_BUCKETS.map((b) => (
            <MenuItem
              key={b.value}
              label={b.label}
              selected={filters.interview_score_bucket === b.value}
              onClick={() => {
                onChange({ interview_score_bucket: b.value });
                setOpen(null);
              }}
            />
          ))}
        </DropdownButton>

        <DropdownButton
          label={`Sort: ${sortLabel}`}
          active
          isOpen={open === "sort"}
          onToggle={() => setOpen(open === "sort" ? null : "sort")}
        >
          {SORTS(anyInterview).map((s) => (
            <MenuItem
              key={s.value}
              label={s.label}
              selected={filters.sort === s.value}
              disabled={s.disabled}
              onClick={() => {
                if (s.disabled) return;
                onChange({ sort: s.value });
                setOpen(null);
              }}
            />
          ))}
        </DropdownButton>
      </div>
    </div>
  );
}

function DropdownButton({
  label,
  active,
  isOpen,
  onToggle,
  children,
  disabled,
}: {
  label: string;
  active: boolean;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={onToggle}
        className={`flex h-10 items-center gap-2 rounded-full border px-4 text-xs font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
          active
            ? "border-white/20 bg-white/10 text-white"
            : "border-white/10 bg-white/5 text-white/70 hover:text-white"
        }`}
      >
        <span className="truncate max-w-48">{label}</span>
        <svg
          className={`h-3.5 w-3.5 text-white/40 transition-transform ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-40 min-w-56 rounded-3xl border border-white/10 bg-neutral-950/95 p-1.5 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.75)] backdrop-blur-2xl">
          <div className="rounded-[calc(1.5rem-0.375rem)] bg-linear-to-b from-white/5 to-transparent p-1">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({
  label,
  selected,
  disabled,
  onClick,
  keepOpen,
}: {
  label: string;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
  keepOpen?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onMouseDown={(e) => {
        if (keepOpen) e.preventDefault();
      }}
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
        selected ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span>{label}</span>
      {selected && <span className="h-2 w-2 rounded-full bg-emerald-400" />}
    </button>
  );
}
