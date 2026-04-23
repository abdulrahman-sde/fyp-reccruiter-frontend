import { use } from "react";
import { JobDetailsView } from "@/components/jobs/recruiter/JobDetailsView";

export default function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <JobDetailsView jobId={id} />;
}
