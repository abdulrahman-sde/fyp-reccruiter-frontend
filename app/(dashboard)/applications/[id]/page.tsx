"use client";
import { Button } from "@/components/ui/button";
import { use } from "react";
import Link from "next/link";

export default function ApplicationProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  // Mock Data
  const application = {
    name: "Elara Vance",
    role: "Senior Frontend Engineer",
    score: 94,
    status: "Pending Screen",
    analysis: {
      strengths: ["10+ years React/Next.js", "Led migration of legacy monolithic apps", "Deep understanding of web performance"],
      weaknesses: ["Less experience with backend Python", "No formal management title"],
      summary: "Exceptional technical fit for the Senior Frontend role. Highly ranked due to exact matches on 8/10 core job description requirements."
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 text-white/50 text-sm mb-4">
         <Link href="/applications" className="hover:text-white transition-colors">Job Applications</Link>
         <span>/</span>
         <span className="text-white">{application.name}</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up">
        <div>
          <h1 className="text-4xl font-medium tracking-tight mb-2">{application.name}</h1>
          <p className="text-white/50 font-light flex items-center gap-3">
            {application.role} 
            <span className="px-2 py-0.5 rounded-md bg-white/10 text-white/70 text-xs uppercase tracking-widest">{application.status}</span>
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
           <span className="text-[10px] uppercase tracking-widest text-emerald-400/60 font-semibold">AI Match Rank</span>
           <div className="text-5xl text-emerald-400 font-bold drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]">
             {application.score}%
           </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-4 p-2 rounded-[1.5rem] bg-white/[0.02] border border-white/[0.05] ring-1 ring-white/[0.02] backdrop-blur-xl animate-fade-in-up animation-delay-100">
         <Button className="flex-1 rounded-[1rem] py-6 text-sm font-medium bg-emerald-400 text-black hover:bg-emerald-300 active:scale-95 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
           Shortlist & Schedule AI Interview
         </Button>
         <Button className="flex-1 rounded-[1rem] py-6 text-sm font-medium bg-transparent border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 active:scale-95 transition-all">
           Auto-Reject (AI Email)
         </Button>
      </div>

      {/* Resume Analysis Report */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up animation-delay-200">
         <div className="md:col-span-2 p-1 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] ring-1 ring-white/[0.02] backdrop-blur-xl">
           <div className="h-full rounded-[calc(2rem-0.25rem)] bg-gradient-to-b from-white/[0.03] to-transparent p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
             <h2 className="text-xl font-medium text-white mb-6">Resume Analysis vs Job Description</h2>
             
             <div className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-emerald-400/80 mb-3">Key Strengths (Matched)</h3>
                  <ul className="space-y-2">
                    {application.analysis.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/70 text-sm font-light">
                        <span className="text-emerald-400 mt-0.5">✦</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="h-px w-full bg-white/5" />

                <div>
                  <h3 className="text-xs uppercase tracking-widest text-red-400/80 mb-3">Missing / Weaknesses</h3>
                  <ul className="space-y-2">
                    {application.analysis.weaknesses.map((s, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/50 text-sm font-light">
                        <span className="text-red-400/50 mt-0.5">⨯</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
             </div>
           </div>
         </div>

         <div className="p-1 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] ring-1 ring-white/[0.02] backdrop-blur-xl">
           <div className="h-full rounded-[calc(2rem-0.25rem)] bg-gradient-to-b from-emerald-900/10 to-transparent p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(16,185,129,0.05)]">
             <h2 className="text-xs uppercase tracking-widest text-emerald-400/80 mb-4">AI Recommendation</h2>
             <p className="text-sm font-light text-white/70 leading-relaxed mb-6">
               {application.analysis.summary}
             </p>
             <div className="px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs text-center font-medium">
               Highly Recommended to Advance
             </div>
           </div>
         </div>
      </div>

    </div>
  );
}
