"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function JobsHeader() {
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-medium tracking-tight mb-2">Job Postings</h1>
        <p className="text-white/50 font-light">Manage your open roles, drafts, and past listings.</p>
      </div>
      <Button
        onClick={() => router.push("/jobs/new")}
        className="rounded-full px-6 py-6 text-sm font-medium bg-white text-black hover:bg-white/90 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
      >
        Create New Job
      </Button>
    </div>
  );
}
