import type {
  AiRecommendation,
  ApiApplicationRow,
  ApplicationRow,
  ApplicationStatus,
  CareerProgression,
  ExperienceRelevance,
} from "@/types/application";

export function toApplicationRow(app: ApiApplicationRow): ApplicationRow {
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
      red_flags: (d?.red_flags as string[]) ?? [],
      career_progression: (d?.career_progression as CareerProgression) ?? "UNCLEAR",
      experience_relevance: (d?.experience_relevance as ExperienceRelevance) ?? "PARTIALLY_RELEVANT",
      has_quantified_achievements: d?.has_quantified_achievements ?? false,
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
