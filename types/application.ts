export type ApplicationStatus =
  | "APPLIED"
  | "SCREENING"
  | "UNDER_REVIEW"
  | "SHORTLISTED"
  | "INTERVIEW_SCHEDULED"
  | "INTERVIEWED"
  | "HIRED"
  | "REJECTED"
  | "WITHDRAWN";

export type AiRecommendation = "STRONG_HIRE" | "HIRE" | "MAYBE" | "NO_HIRE";

export interface ResumeAnalysis {
  score: number;
  recommendation: AiRecommendation;
  summary: string;
  skills_match: number;
  experience_match: number;
  education_match: number;
  matched_keywords: string[];
  strengths: string[];
  gaps: string[];
  screening_answers: Array<{ question: string; answer: string }>;
}

export interface InterviewCompetencyScore {
  label: string;
  score: number;
}

export interface InterviewQuestionEval {
  question: string;
  answer_excerpt: string;
  rating: number;
  note: string;
}

export interface InterviewAnalysis {
  score: number;
  recommendation: AiRecommendation;
  confidence: number;
  summary: string;
  competencies: InterviewCompetencyScore[];
  questions: InterviewQuestionEval[];
  transcript_url?: string;
  conducted_at: string;
}

export interface ApplicationRow {
  id: string;
  candidate_name: string;
  candidate_title: string;
  candidate_location: string;
  candidate_email: string;
  avatar_initials: string;
  applied_at: string;
  status: ApplicationStatus;
  resume: ResumeAnalysis;
  interview: InterviewAnalysis | null;
  interview_scheduled_at?: string;
  activity: Array<{ at: string; label: string; by: string }>;
}

export interface ApplicationsJobContext {
  job_id: string;
  job_title: string;
  company_name: string;
  job_status: "DRAFT" | "PUBLISHED" | "CLOSED" | "ARCHIVED";
}

// API response shape from backend
export interface ApiApplicationRow {
  id: string;
  status: string;
  match_score: number | null;
  match_details: {
    recommendation?: AiRecommendation;
    summary?: string;
    skills_match?: number;
    experience_match?: number;
    education_match?: number;
    matched_keywords?: string[];
    strengths?: string[];
    gaps?: string[];
    screening_answers?: Array<{ question: string; answer: string }>;
  } | null;
  applied_at: string;
  updated_at: string;
  candidate_name: string;
  candidate_email: string;
  candidate_title: string | null;
  candidate_location: string | null;
  avatar_initials: string;
  resume_url: string | null;
  interview: { id: string; status: string } | null;
}

export interface RecruiterApplicationsResponse {
  job: {
    id: string;
    title: string;
    slug: string;
    status: string;
    company_name: string;
  };
  applications: ApiApplicationRow[];
  total: number;
  page: number;
  limit: number;
}

export type ApplicationsSortKey =
  | "interview_score"
  | "resume_score"
  | "combined_score"
  | "recent"
  | "status";

export interface ApplicationsFilters {
  statuses: ApplicationStatus[];
  resume_score_bucket: "ANY" | "90+" | "70-89" | "50-69" | "<50";
  interview_score_bucket: "ANY" | "90+" | "70-89" | "50-69" | "<50";
  recommendations: AiRecommendation[];
  applied_window: "ANY" | "TODAY" | "7D" | "30D";
  search: string;
  sort: ApplicationsSortKey;
}
