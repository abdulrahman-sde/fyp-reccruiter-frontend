"use client";

import { useDashboardStats } from "@/hooks/useDashboardStats";
import { StatsOverview } from "@/components/dashboard/recruiter/StatsOverview";
import { ActiveJobs } from "@/components/dashboard/recruiter/ActiveJobs";
import { RecentApplications } from "@/components/dashboard/recruiter/RecentApplications";

export default function DashboardPage() {
  const { stats, activeJobs, recentApplications, loading } = useDashboardStats();

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 rounded-full border-2 border-border border-t-foreground  animate-spin"></div>
      </div>
    );
  }

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
          <RecentApplications applications={recentApplications} />
        </div>
      </div>
    </div>
  );
}
