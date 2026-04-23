"use client";

import { useState } from "react";
import { JobsHeader } from "@/components/jobs/recruiter/JobsHeader";
import { JobsTabs } from "@/components/jobs/recruiter/JobsTabs";
import { JobList } from "@/components/jobs/recruiter/JobList";

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState("Active");

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <JobsHeader />
      <JobsTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="rounded-4xl border border-white/5 bg-white/2 p-1 ring-1 ring-white/2 backdrop-blur-xl animate-fade-in-up animation-delay-100">
        <div className="min-h-75 rounded-[calc(2rem-0.25rem)] bg-linear-to-b from-white/3 to-transparent p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] md:p-8">
          <JobList activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
}
