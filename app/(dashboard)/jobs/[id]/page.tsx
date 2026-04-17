"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { use } from "react";
import Link from "next/link";

export default function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  // Mock Data
  const job = {
    title: "Senior Frontend Engineer",
    dept: "Engineering",
    type: "Full-Time",
    location: "Remote",
    status: "Active",
    posted: "14 days ago",
    salary: "$140k - $180k",
    applicants: 145,
    matches: [
      { id: "c1", name: "Elara Vance", score: 94, status: "Pending Screen" },
      { id: "c4", name: "Cassian Reed", score: 79, status: "Interviewed" }
    ],
    requirements: [
       "10+ years React/Next.js experience",
       "Proven track record scaling frontends past 1M MAU",
       "Deep understanding of Web Vitals and performance optimization"
    ]
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 text-white/50 text-sm mb-4">
         <Link href="/jobs" className="hover:text-white transition-colors">Job Postings</Link>
         <span>/</span>
         <span className="text-white">{job.title}</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up">
        <div className="space-y-2">
          <Badge variant="outline" className={`border-emerald-400/20 bg-emerald-400/10 text-emerald-400 font-medium mb-2`}>
            {job.status}
          </Badge>
          <h1 className="text-4xl font-medium tracking-tight">{job.title}</h1>
          <p className="text-white/50 font-light flex items-center gap-3">
            {job.dept} <span className="w-1 h-1 rounded-full bg-white/20" /> {job.type} <span className="w-1 h-1 rounded-full bg-white/20" /> {job.location}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-full px-6 py-6 text-sm font-medium bg-transparent border border-white/10 text-white hover:bg-white/5 transition-all">
            Edit Role
          </Button>
          <Button className="rounded-full px-6 py-6 text-sm font-medium bg-emerald-400 text-black hover:bg-emerald-300 active:scale-95 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            Close Posting
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up animation-delay-100">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6 flex flex-col">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-1 rounded-[1.5rem] bg-white/[0.02] border border-white/[0.05] ring-1 ring-white/[0.02] backdrop-blur-xl">
               <div className="h-full rounded-[calc(1.5rem-0.25rem)] bg-gradient-to-b from-white/[0.03] to-transparent p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                 <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">Total Pool</span>
                 <div className="text-4xl font-light text-white tracking-tight">{job.applicants}</div>
               </div>
            </div>
            <div className="p-1 rounded-[1.5rem] bg-white/[0.02] border border-emerald-500/20 ring-1 ring-emerald-500/10 backdrop-blur-xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-emerald-500/5 blur-[40px]" />
               <div className="relative z-10 h-full rounded-[calc(1.5rem-0.25rem)] bg-gradient-to-b from-emerald-500/10 to-transparent p-6 shadow-[inset_0_1px_1px_rgba(16,185,129,0.1)]">
                 <span className="text-[10px] uppercase tracking-widest text-emerald-400/60 block mb-2 px-2 py-0.5 rounded bg-emerald-500/10 w-fit">AI Matches</span>
                 <div className="text-4xl font-bold text-emerald-400 tracking-tight drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">{job.matches.length}</div>
               </div>
            </div>
          </div>

          <div className="p-1 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] ring-1 ring-white/[0.02] backdrop-blur-xl flex-1">
             <div className="h-full rounded-[calc(2rem-0.25rem)] bg-gradient-to-b from-white/[0.03] to-transparent p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                <h2 className="text-xl font-medium text-white mb-6">AI Evaluation Criteria</h2>
                <div className="space-y-4">
                  {job.requirements.map((req, i) => (
                    <div key={i} className="flex gap-4 items-start pb-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] p-2 rounded-xl transition-colors cursor-default">
                       <div className="w-6 h-6 rounded-full bg-emerald-400/10 border border-emerald-400/20 shrink-0 flex items-center justify-center text-[10px] text-emerald-400 font-bold">
                         {i+1}
                       </div>
                       <p className="text-sm text-white/70 font-light mt-0.5">{req}</p>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>

        {/* Top Candidates Sidebar */}
        <div className="p-1 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] ring-1 ring-white/[0.02] backdrop-blur-xl h-[600px]">
           <div className="h-full flex flex-col rounded-[calc(2rem-0.25rem)] bg-black/20 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative overflow-hidden">
              <h3 className="text-sm font-medium text-white/90 mb-6 flex items-center justify-between">
                Top Matches <Link href="/applications" className="text-[10px] uppercase tracking-widest text-emerald-400 hover:text-emerald-300">View All →</Link>
              </h3>
              
              <div className="space-y-3 flex-1 overflow-y-auto pr-2">
                {job.matches.map(c => (
                   <Link key={c.id} href={`/applications/${c.id}`} className="block p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 hover:bg-white/10 transition-all group cursor-pointer relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/0 blur-[30px] rounded-full group-hover:bg-emerald-500/20 transition-colors pointer-events-none" />
                       <div className="flex justify-between items-start relative z-10">
                          <div>
                            <span className="block text-sm font-medium text-white group-hover:text-emerald-400 transition-colors mb-1">{c.name}</span>
                            <span className="block text-[10px] uppercase tracking-widest text-white/40">{c.status}</span>
                          </div>
                          <div className={`px-2 py-1 rounded bg-emerald-400/10 border border-emerald-400/20 text-xs font-bold text-emerald-400`}>
                            {c.score}%
                          </div>
                       </div>
                   </Link>
                ))}
              </div>
              
              <div className="pt-6 border-t border-white/5 mt-auto">
                 <div className="flex justify-between text-xs text-white/40 font-light">
                   <span>Posted</span>
                   <span>{job.posted}</span>
                 </div>
                 <div className="flex justify-between text-xs text-white/40 font-light mt-2">
                   <span>Target</span>
                   <span>{job.salary}</span>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
