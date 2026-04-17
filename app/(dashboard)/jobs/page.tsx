"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function JobsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Active");

  const tabs = ["Active", "Draft", "Previous"];

  const jobs = [
    {
      title: "Senior Frontend Engineer",
      dept: "Engineering",
      type: "Full-Time",
      location: "Remote",
      applicants: 145,
      match: 23,
      status: "Active",
    },
    {
      title: "Product Marketing Manager",
      dept: "Marketing",
      type: "Full-Time",
      location: "New York",
      applicants: 89,
      match: 12,
      status: "Active",
    },
    {
      title: "AI Researcher",
      dept: "Data Team",
      type: "Contract",
      location: "London",
      applicants: 42,
      match: 8,
      status: "Draft",
    },
    {
      title: "Staff Backend Engineer",
      dept: "Infrastructure",
      type: "Full-Time",
      location: "Remote",
      applicants: 201,
      match: 34,
      status: "Active",
    },
    {
      title: "VP of Engineering",
      dept: "Leadership",
      type: "Full-Time",
      location: "San Francisco",
      applicants: 56,
      match: 4,
      status: "Draft",
    },
    {
      title: "Lead Product Designer",
      dept: "Design",
      type: "Full-Time",
      location: "Remote",
      applicants: 312,
      match: 45,
      status: "Previous",
    },
  ];

  const filteredJobs = jobs.filter((j) => j.status === activeTab);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-medium tracking-tight mb-2">
            Job Postings
          </h1>
          <p className="text-white/50 font-light">
            Manage your open roles, drafts, and past listings.
          </p>
        </div>
        <Button className="rounded-full px-6 py-6 text-sm font-medium bg-white text-black hover:bg-white/90 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          Create New Job
        </Button>
      </div>

      <div className="flex items-center gap-2 p-1 rounded-full bg-white/[0.02] border border-white/[0.05] ring-1 ring-white/[0.02] backdrop-blur-xl w-fit animate-fade-in-up animation-delay-100">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-white/10 text-white shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                : "text-white/50 hover:text-white/90 hover:bg-white/5"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-1 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] ring-1 ring-white/[0.02] backdrop-blur-xl animate-fade-in-up animation-delay-100">
        <div className="rounded-[calc(2rem-0.25rem)] bg-gradient-to-b from-white/[0.03] to-transparent p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] min-h-[300px]">
          {filteredJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-white/30 text-sm py-12">
              No jobs found for this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, i) => (
                <div
                  key={i}
                  onClick={() => router.push(`/jobs/some-job-id`)}
                  className="group relative p-6 rounded-[1.5rem] border border-white/5 bg-white/[0.01] hover:border-white/15 transition-colors cursor-pointer flex flex-col h-[280px]"
                >
                  <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold ${
                        job.status === "Active"
                          ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                          : job.status === "Previous"
                            ? "bg-white/5 text-white/40 border border-white/5"
                            : "bg-white/5 text-white/70 border border-white/10"
                      }`}
                    >
                      {job.status}
                    </span>
                    <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                      >
                        <path
                          d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  <div className="mb-auto relative z-10">
                    <h3 className="text-xl font-medium text-white mb-2 leading-tight group-hover:text-white/90">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-light text-white/40 mb-1">
                      <span>{job.dept}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span>{job.type}</span>
                    </div>
                    <p className="text-xs text-white/30">{job.location}</p>
                  </div>

                  <div className="relative z-10 pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-white/30 mb-1">
                        Total Pool
                      </span>
                      <span className="text-lg text-white font-light">
                        {job.applicants}
                      </span>
                    </div>
                    <div className="h-8 w-px bg-white/10" />
                    <div className="flex flex-col items-end group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.3)] transition-all">
                      <span className="text-[10px] uppercase tracking-widest text-emerald-400/60 mb-1">
                        AI Matches
                      </span>
                      <span className="text-lg text-emerald-400 font-medium flex items-center gap-2">
                        {job.status === "Active" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        )}
                        {job.match}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
