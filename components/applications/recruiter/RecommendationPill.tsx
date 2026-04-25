import type { AiRecommendation } from "@/types/application";
import { REC_LABELS } from "@/hooks/useApplications";

const STYLES: Record<AiRecommendation, string> = {
  STRONG_HIRE: "text-emerald-300 bg-emerald-400/10 border-emerald-400/25",
  HIRE: "text-blue-300 bg-blue-400/10 border-blue-400/25",
  MAYBE: "text-yellow-300 bg-yellow-400/10 border-yellow-400/25",
  NO_HIRE: "text-red-300 bg-red-400/10 border-red-400/25",
};

export function RecommendationPill({ rec, size = "md" }: { rec: AiRecommendation; size?: "sm" | "md" }) {
  const pad = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-0.5 text-[11px]";
  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${pad} ${STYLES[rec]}`}
    >
      {REC_LABELS[rec]}
    </span>
  );
}
