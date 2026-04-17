export interface DashboardStats {
  openJobs: number;
  totalApplications: number;
  interviewsPending: number;
  aiScreeningEfficiency: string;
}

export interface ActiveJob {
  id: string;
  title: string;
  department: string;
  postedAt: string;
  applicationsCount: number;
  aiMatchedCount: number;
  interviewsScheduled: number;
}

export interface Application {
  id: string;
  name: string;
  role: string;
  matchScore: number;
  status: "new" | "screening" | "interviewed" | "shortlisted" | "rejected";
  appliedAt: string;
}
