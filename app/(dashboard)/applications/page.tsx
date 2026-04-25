import { getJobs } from "@/lib/dal";
import { ApplicationsBoardWrapper } from "@/components/applications/recruiter/ApplicationsBoardWrapper";
import type { JobSummary } from "@/types/job";

type Props = {
  searchParams: Promise<{ jobId?: string }>;
};

export default async function ApplicationsPage({ searchParams }: Props) {
  const { jobId } = await searchParams;
  const jobsData = await getJobs({ status: "PUBLISHED", limit: 50 });
  const jobs: JobSummary[] = jobsData?.jobs ?? [];

  return <ApplicationsBoardWrapper jobs={jobs} selectedJobId={jobId} />;
}
