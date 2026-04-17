"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function InterviewsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Scheduled", "Evaluation Ready"];

  const sessions = [
    {
      title: "Elara Vance",
      role: "Senior Frontend Engineer",
      status: "Evaluation Ready",
      score: 92,
      length: "42m",
    },
    {
      title: "Julian Thorne",
      role: "AI Researcher",
      status: "Scheduled",
      score: "-",
      length: "Tomorrow 2:00 PM",
    },
    {
      title: "Cassian Reed",
      role: "Senior Frontend Engineer",
      status: "Evaluation Ready",
      score: 71,
      length: "38m",
    },
  ];

  const filteredSessions =
    activeTab === "All"
      ? sessions
      : sessions.filter((s) => s.status === activeTab);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-medium tracking-tight mb-2">
            AI Interviews
          </h1>
          <p className="text-muted-foreground font-light">
            Monitor active sessions and review evaluations.
          </p>
        </div>
        <Button className="rounded-full px-6 py-6 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
          Schedule New Interview
        </Button>
      </div>

      <div className="flex items-center gap-2 p-1 rounded-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] ring-1 ring-black/[0.02] dark:ring-white/[0.02] backdrop-blur-xl w-fit animate-fade-in-up animation-delay-100">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-black/10 dark:bg-white/10 text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:bg-white/5"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredSessions.length === 0 ? (
        <div className="p-1 rounded-[2rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] ring-1 ring-black/[0.02] dark:ring-white/[0.02] backdrop-blur-xl animate-fade-in-up animation-delay-100">
          <div className="rounded-[calc(2rem-0.25rem)] bg-gradient-to-b from-black/[0.03] dark:from-white/[0.03] to-transparent p-12 text-center text-muted-foreground text-sm">
            No interviews found for this category.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in-up animation-delay-100">
          {filteredSessions.map((session, i) => (
            <div
              key={i}
              onClick={() => router.push(`/interviews/some-interview-id`)}
              className="p-1 rounded-[2rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] ring-1 ring-black/[0.02] dark:ring-white/[0.02] backdrop-blur-xl group cursor-pointer h-[240px] flex flex-col"
            >
              <div className="flex-1 rounded-[calc(2rem-0.25rem)] bg-gradient-to-b from-black/[0.03] dark:from-white/[0.03] to-transparent p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col justify-between overflow-hidden relative">
                <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 rounded-full bg-emerald-500/0 blur-[60px] group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />

                <div className="flex items-start justify-between relative z-10">
                  <div className="flex flex-col">
                    <span className="text-xl font-medium text-foreground group-hover:text-emerald-400 transition-colors mb-1">
                      {session.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {session.role}
                    </span>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider border ${session.status === "Scheduled" ? "bg-blue-400/10 text-blue-400 border-blue-400/20" : "bg-emerald-400/10 text-emerald-400 border-emerald-400/20"}`}
                  >
                    {session.status}
                  </div>
                </div>

                <div className="flex items-end justify-between relative z-10 border-t border-black/5 dark:border-white/5 pt-6 mt-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                      {session.status === "Scheduled" ? "Status" : "Duration"}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground tracking-wide">
                      {session.length}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase tracking-widest text-emerald-400/50 mb-1">
                      Interview Score
                    </span>
                    {session.score === "-" ? (
                      <span className="text-lg text-muted-foreground font-light">
                        —
                      </span>
                    ) : (
                      <span className="text-2xl text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                        {session.score}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
