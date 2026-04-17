"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { use, useState } from "react";
import Link from "next/link";

export default function InterviewEvaluation({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [openQ, setOpenQ] = useState<number | null>(0);
  
  // Mock Data
  const interview = {
    name: "Elara Vance",
    role: "Senior Frontend Engineer",
    score: 92,
    status: "Evaluation Ready",
    length: "42m",
    transcript: [
      {
        q: "How do you handle severe performance bottlenecks in complex React apps?",
        a: "I rely heavily on the React Profiler to identify stray re-renders. Then, I isolate state to the lowest possible branch in the tree, memoize expensive calculations with useMemo, and enforce virtualized lists for large DOM renders.",
        ai: "Strong conceptual understanding. Provided practical examples aligned with our team's architecture. Score: 9.5/10"
      },
      {
        q: "Describe a time you disagreed with the backend engineering team.",
        a: "We were trying to ship a feature but the REST API payload was 3MB. I scheduled a call to negotiate a GraphQL-like DTO structure where I only requested what the client needed. It pushed back their timeline by two days but dropped our load time by 3 seconds.",
        ai: "Good demonstration of leadership and cross-functional communication. Prioritized UX over taking the easy path. Score: 9/10"
      }
    ]
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-4 text-white/50 text-sm mb-4">
         <div className="flex items-center gap-4">
           <Link href="/interviews" className="hover:text-white transition-colors">Interviews</Link>
           <span>/</span>
           <span className="text-white">{interview.name} — Evaluation </span>
         </div>
         <Badge variant="outline" className="border-white/10 bg-white/5 text-white/60 font-medium">
             {interview.status}
         </Badge>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-6 animate-fade-in-up">
        <div className="flex-1 p-1 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] ring-1 ring-white/[0.02] backdrop-blur-xl">
           <div className="h-[400px] flex flex-col justify-between rounded-[calc(2rem-0.25rem)] bg-black/50 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative overflow-hidden group">
               {/* Faux Video Player */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                     <div className="w-4 h-4 text-white translate-x-0.5">▶</div>
                  </div>
               </div>
               
               <div className="relative z-10 flex justify-between items-start">
                  <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-xs font-medium text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> REC
                  </div>
                  <div className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg text-xs font-medium text-white/70">
                    {interview.length}
                  </div>
               </div>

               <div className="relative z-10 font-medium text-lg text-white drop-shadow-md">
                 AI Session Recording
               </div>
           </div>
        </div>

        <div className="w-full md:w-[350px] flex flex-col gap-4">
           {/* Final Score */}
           <div className="flex flex-col justify-center items-center h-[200px] p-1 rounded-[2rem] bg-white/[0.02] border border-emerald-500/20 ring-1 ring-emerald-500/10 backdrop-blur-xl relative overflow-hidden">
               <div className="absolute inset-0 bg-emerald-500/5 blur-[80px]" />
               <span className="text-[10px] uppercase tracking-widest text-emerald-400 mb-2 relative z-10">AI Interview Score</span>
               <div className="text-7xl font-bold text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)] relative z-10">{interview.score}%</div>
           </div>
           
           {/* Final Decision Buttons */}
           <Button className="w-full rounded-[1.5rem] py-6 text-base font-medium bg-emerald-400 text-black hover:bg-emerald-300 active:scale-95 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
             Shortlist for Human Interview
           </Button>
           <Button className="w-full rounded-[1.5rem] py-6 text-sm font-medium bg-transparent border border-red-500/20 text-red-400 hover:bg-red-500/10 active:scale-95 transition-all">
             Reject Candidate
           </Button>
        </div>
      </div>

      {/* Accordion Transcript */}
      <div className="animate-fade-in-up animation-delay-200">
         <h2 className="text-xl font-medium text-white mb-6">AI Q&A Transcript</h2>
         <div className="space-y-4">
            {interview.transcript.map((item, i) => (
              <div key={i} className="p-1 rounded-[1.5rem] bg-white/[0.02] border border-white/[0.05] ring-1 ring-white/[0.02] backdrop-blur-xl transition-all">
                <button 
                  onClick={() => setOpenQ(openQ === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between rounded-[calc(1.5rem-0.25rem)] bg-gradient-to-b from-white/[0.03] to-transparent hover:bg-white/[0.05] transition-colors"
                >
                  <span className="font-medium text-white/90 pr-8">{item.q}</span>
                  <span className="text-white/30 text-xl font-light transform transition-transform duration-300 ${openQ === i ? 'rotate-180' : ''}">
                    {openQ === i ? '−' : '+'}
                  </span>
                </button>
                
                {openQ === i && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/5">
                    <div className="space-y-4">
                      <div className="flex gap-4">
                         <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 shrink-0 flex items-center justify-center text-xs text-white/50 bg-gradient-to-b from-white/10 to-transparent">C</div>
                         <p className="text-sm font-light text-white/70 leading-relaxed mt-1.5">{item.a}</p>
                      </div>
                      <div className="flex gap-4">
                         <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 shrink-0 flex items-center justify-center text-xs text-emerald-400 font-bold drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]">AI</div>
                         <p className="text-sm font-medium text-emerald-400/80 leading-relaxed mt-1.5 italic">"{item.ai}"</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
