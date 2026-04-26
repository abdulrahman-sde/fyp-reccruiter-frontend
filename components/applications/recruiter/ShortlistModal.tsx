"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

const QUESTION_SUGGESTIONS = [
  "Walk me through your most technically challenging project.",
  "How do you approach debugging a production issue?",
  "Describe a time you had to learn a new technology quickly.",
  "How do you handle disagreements with teammates on technical decisions?",
  "What's your approach to writing maintainable code?",
];

type Props = {
  onConfirm: (customQuestions: string[], windowStart: string, windowEnd: string) => void;
  onCancel: () => void;
};

function toLocalDatetimeValue(d: Date): string {
  // Returns "YYYY-MM-DDTHH:MM" in local time for datetime-local inputs
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function ShortlistModal({ onConfirm, onCancel }: Props) {
  const [questions, setQuestions] = useState<string[]>([""]);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const defaultStart = new Date();
  const defaultEnd = new Date(defaultStart.getTime() + 7 * 24 * 60 * 60 * 1000);

  const [windowStart, setWindowStart] = useState(toLocalDatetimeValue(defaultStart));
  const [windowEnd, setWindowEnd] = useState(toLocalDatetimeValue(defaultEnd));

  useEffect(() => {
    firstInputRef.current?.focus();
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [onCancel]);

  const addQuestion = () => setQuestions((q) => [...q, ""]);
  const removeQuestion = (i: number) =>
    setQuestions((q) => (q.length === 1 ? [""] : q.filter((_, idx) => idx !== i)));
  const updateQuestion = (i: number, val: string) =>
    setQuestions((q) => q.map((item, idx) => (idx === i ? val : item)));

  const filled = questions.filter((q) => q.trim());

  function handleConfirm() {
    // Convert local datetime-local strings to ISO strings for the API
    const startIso = new Date(windowStart).toISOString();
    const endIso = new Date(windowEnd).toISOString();
    onConfirm(filled, startIso, endIso);
  }

  const inputCls =
    "flex-1 h-10 rounded-2xl border border-white/10 bg-white/4 px-4 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-emerald-300/45 focus:bg-white/6";
  const datetimeCls =
    "w-full h-10 rounded-2xl border border-white/10 bg-white/4 px-4 text-sm text-white outline-none transition-colors focus:border-emerald-300/45 focus:bg-white/6 [color-scheme:dark]";

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={onCancel}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortlist-modal-title"
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 animate-fade-in-up"
      >
        <div className="rounded-[2rem] border border-white/10 bg-neutral-950/98 p-1 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.9)] ring-1 ring-white/5 backdrop-blur-2xl">
          <div className="rounded-[calc(2rem-0.25rem)] bg-linear-to-b from-white/3 to-transparent p-6">
            {/* Header */}
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-emerald-300/70">Shortlist for Interview</div>
                <h2 id="shortlist-modal-title" className="mt-1 text-lg font-medium text-white">
                  Schedule Interview Window
                </h2>
                <p className="mt-1 text-sm font-light text-white/45">
                  Set the window during which the candidate can take the AI interview, then optionally add custom questions.
                </p>
              </div>
              <button
                type="button"
                onClick={onCancel}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* Interview window */}
            <div className="mb-5 space-y-3">
              <p className="text-[11px] uppercase tracking-widest text-white/30">Interview Window</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] text-white/40">Opens</label>
                  <input
                    type="datetime-local"
                    value={windowStart}
                    onChange={(e) => setWindowStart(e.target.value)}
                    className={datetimeCls}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-white/40">Closes</label>
                  <input
                    type="datetime-local"
                    value={windowEnd}
                    onChange={(e) => setWindowEnd(e.target.value)}
                    min={windowStart}
                    className={datetimeCls}
                  />
                </div>
              </div>
            </div>

            {/* Questions */}
            <p className="mb-2 text-[11px] uppercase tracking-widest text-white/30">Custom Questions (optional)</p>
            <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
              {questions.map((q, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[11px] font-medium text-white/40">
                    {i + 1}
                  </span>
                  <input
                    ref={i === 0 ? firstInputRef : undefined}
                    type="text"
                    value={q}
                    onChange={(e) => updateQuestion(i, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addQuestion();
                      }
                    }}
                    placeholder={QUESTION_SUGGESTIONS[i % QUESTION_SUGGESTIONS.length]}
                    className={inputCls}
                  />
                  <button
                    type="button"
                    onClick={() => removeQuestion(i)}
                    className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full border border-white/8 bg-white/3 text-white/25 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-colors"
                    aria-label="Remove question"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addQuestion}
              className="mt-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] text-white/55 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Plus className="h-3.5 w-3.5" /> Add question
            </button>

            {filled.length > 0 && (
              <p className="mt-3 text-[11px] text-white/30">
                {filled.length} custom question{filled.length !== 1 ? "s" : ""} will be asked by the AI agent
              </p>
            )}

            {/* Actions */}
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 rounded-2xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-white/70 hover:bg-white/8 hover:text-white transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 rounded-2xl bg-emerald-400 py-3 text-sm font-medium text-black hover:bg-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all active:scale-95"
              >
                Shortlist for Interview
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
