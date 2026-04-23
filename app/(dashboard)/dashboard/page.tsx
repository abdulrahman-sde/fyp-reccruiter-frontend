import { getDashboardStats, getJobs } from "@/lib/dal";
import { StatsOverview } from "@/components/dashboard/recruiter/StatsOverview";
import { ActiveJobs } from "@/components/dashboard/recruiter/ActiveJobs";
import { RecentApplications } from "@/components/dashboard/recruiter/RecentApplications";
import type { DashboardStats } from "@/types/dashboard";

export default async function DashboardPage() {
  const [statsData, jobsData] = await Promise.all([
    getDashboardStats(),
    getJobs({ status: "PUBLISHED", limit: 5 }),
  ]);

  const stats: DashboardStats = statsData ?? { openJobs: 0, totalApplications: 0, interviewsPending: 0 };

  const activeJobs = (jobsData?.jobs ?? []).map((j) => ({
    id: j.id,
    title: j.title,
    department: j.experience_level,
    postedAt: new Date(j.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    applicationsCount: j.applicants_count,
    aiMatchedCount: j.ai_matches_count,
    interviewsScheduled: 0,
  }));

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-medium tracking-tight mb-2">Overview</h1>
        <p className="text-muted-foreground font-light">
          Your autonomous recruitment system is active.
        </p>
      </div>

      <div className="animate-fade-in-up animation-delay-100">
        <StatsOverview stats={stats} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 animate-fade-in-up animation-delay-200">
        <div className="xl:col-span-7">
          <ActiveJobs jobs={activeJobs} />
        </div>
        <div className="xl:col-span-5">
          <RecentApplications applications={[]} />
        </div>
      </div>
    </div>
  );
}
