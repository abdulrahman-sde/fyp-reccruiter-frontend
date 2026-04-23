import { NewJobForm } from "@/components/jobs/recruiter/NewJobForm";

export default function NewJobPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="animate-fade-in-up space-y-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-400/70">Job Composer</p>
        <h1 className="text-3xl font-medium tracking-tight text-white">Create New Job</h1>
        <p className="max-w-3xl text-sm font-light text-white/50">
          Fill all role details, candidate requirements, and hiring workflow settings before publishing.
        </p>
      </div>
      <NewJobForm />
    </div>
  );
}
