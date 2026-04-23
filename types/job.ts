export type JobStatus = "DRAFT" | "PUBLISHED" | "CLOSED" | "ARCHIVED";
export type JobType = "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | "REMOTE";
export type ExperienceLevel = "ENTRY" | "MID" | "SENIOR" | "LEAD" | "EXECUTIVE";

export interface JobSummary {
  id: string;
  title: string;
  location: string | null;
  job_type: JobType;
  experience_level: ExperienceLevel;
  status: JobStatus;
  applicants_count: number;
  ai_matches_count: number;
  created_at: string;
  published_at: string | null;
  deadline: string | null;
}

export interface JobDetail extends JobSummary {
  description: string;
  requirements: string;
  qualifications: string | null;
  responsibilities: string | null;
  salary_min: string | null;
  salary_max: string | null;
  salary_currency: string;
  company_name: string;
  screening_questions: string | null;
  top_matches: Array<{
    id: string;
    applicant_name: string;
    match_score: number;
    status: string;
  }>;
}

export interface CreateJobPayload {
  title: string;
  description: string;
  requirements: string;
  qualifications?: string;
  responsibilities?: string;
  location?: string;
  job_type: JobType;
  experience_level: ExperienceLevel;
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  deadline?: string;
  status: "DRAFT" | "PUBLISHED";
  screening_questions?: string;
}

export interface JobActionState {
  message?: string;
  errors?: Partial<Record<keyof CreateJobPayload, string[]>>;
}
