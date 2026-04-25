type Props = {
  score: number | null;
  size?: "sm" | "md" | "lg";
  label?: string;
};

function colorFor(score: number) {
  if (score >= 90) return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
  if (score >= 75) return "text-blue-400 bg-blue-400/10 border-blue-400/20";
  if (score >= 60) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
  return "text-red-400 bg-red-400/10 border-red-400/20";
}

export function ScorePill({ score, size = "md", label }: Props) {
  if (score == null) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-white/30">
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        {label ?? "—"}
      </span>
    );
  }
  const pad =
    size === "lg" ? "px-3 py-1.5 text-sm" : size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";
  return (
    <span className={`inline-flex items-center justify-center rounded-full border font-bold ${pad} ${colorFor(score)}`}>
      {score}
    </span>
  );
}
