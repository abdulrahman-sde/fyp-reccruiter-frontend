"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function ApplicationsPage() {
  const router = useRouter();
  
  const [filters, setFilters] = useState({
    status: "All",
    role: "All Roles",
    minScore: 0,
    search: ""
  });
  
  const tabs = ["All", "Pending Screen", "Awaiting Interview", "Interviewed", "Rejected"];
  const roles = ["All Roles", "Senior Frontend Engineer", "AI Researcher", "Product Marketing"];

  const applications = [
    { id: "c1", name: "Elara Vance", role: "Senior Frontend Engineer", score: 94, status: "Pending Screen", date: "Today" },
    { id: "c2", name: "Julian Thorne", role: "AI Researcher", score: 88, status: "Awaiting Interview", date: "Yesterday" },
    { id: "c3", name: "Maya Lin", role: "Product Marketing", score: 82, status: "Pending Screen", date: "Yesterday" },
    { id: "c4", name: "Cassian Reed", role: "Senior Frontend Engineer", score: 79, status: "Interviewed", date: "2 days ago" },
    { id: "c5", name: "Kaelen Voss", role: "AI Researcher", score: 65, status: "Rejected", date: "1 week ago" },
  ];

  const filteredApplications = applications.filter(app => {
    if (filters.status !== "All" && app.status !== filters.status) return false;
    if (filters.role !== "All Roles" && app.role !== filters.role) return false;
    if (filters.minScore > 0 && app.score < filters.minScore) return false;
    if (filters.search) {
       const s = filters.search.toLowerCase();
       if (!app.name.toLowerCase().includes(s) && !app.role.toLowerCase().includes(s)) return false;
    }
    return true;
  });

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20 shadow-[inset_0_1px_3px_rgba(16,185,129,0.3)]";
    if (score >= 80) return "text-blue-400 bg-blue-400/10 border-blue-400/20";
    if (score >= 70) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    return "text-red-400 bg-red-400/10 border-red-400/20";
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-medium tracking-tight mb-2">Job Applications</h1>
          <p className="text-white/50 font-light">Global directory of parsed and scored profiles.</p>
        </div>
        
        {/* Advanced Filters Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search by name or role..." 
              value={filters.search}
              onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
              className="w-full md:w-64 h-10 bg-white/5 border border-white/10 rounded-full pl-10 pr-4 text-sm font-light text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
            />
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-emerald-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          
          <select 
            value={filters.role}
            onChange={(e) => setFilters(f => ({...f, role: e.target.value}))}
            className="h-10 bg-white/5 border border-white/10 rounded-full px-4 text-sm font-light text-white/70 focus:outline-none focus:ring-1 focus:ring-white/20 appearance-none cursor-pointer"
          >
            {roles.map(r => <option key={r} value={r} className="bg-black text-white">{r}</option>)}
          </select>

          <select 
            value={filters.minScore}
            onChange={(e) => setFilters(f => ({...f, minScore: Number(e.target.value)}))}
            className="h-10 bg-white/5 border border-white/10 rounded-full px-4 text-sm font-light text-white/70 focus:outline-none focus:ring-1 focus:ring-white/20 appearance-none cursor-pointer"
          >
            <option value={0} className="bg-black text-white">All Scores</option>
            <option value={90} className="bg-black text-white">&gt; 90% Match</option>
            <option value={80} className="bg-black text-white">&gt; 80% Match</option>
            <option value={70} className="bg-black text-white">&gt; 70% Match</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 p-1 rounded-full bg-white/[0.02] border border-white/[0.05] ring-1 ring-white/[0.02] backdrop-blur-xl w-fit animate-fade-in-up animation-delay-100">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilters(f => ({ ...f, status: tab }))}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              filters.status === tab
                ? "bg-white/10 text-white shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                : "text-white/50 hover:text-white/90 hover:bg-white/5"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-1 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] ring-1 ring-white/[0.02] backdrop-blur-xl animate-fade-in-up animation-delay-200 overflow-hidden">
        <div className="rounded-[calc(2.5rem-0.25rem)] bg-gradient-to-b from-white/[0.03] to-transparent p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <div className="w-full overflow-x-auto min-h-[300px]">
            {filteredApplications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[200px] text-white/30 text-sm">
                No job applications found matching your criteria.
              </div>
            ) : (
             <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest text-white/40">
                  <th className="pb-4 font-medium px-4">Applicant</th>
                  <th className="pb-4 font-medium px-4">Matched Role</th>
                  <th className="pb-4 font-medium px-4">AI Score</th>
                  <th className="pb-4 font-medium px-4">Status</th>
                  <th className="pb-4 font-medium px-4 text-right">Applied</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredApplications.map((app, i) => (
                  <tr key={i} onClick={() => router.push(`/applications/${app.id}`)} className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                           <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-full" />
                        </div>
                        <span className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">{app.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-white/50">{app.role}</td>
                    <td className="py-4 px-4">
                      <div className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold border ${getScoreColor(app.score)}`}>
                        {app.score}%
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="border-white/10 bg-white/5 text-white/60 font-medium">
                        {app.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-right text-xs text-white/30 tracking-wide">{app.date}</td>
                  </tr>
                ))}
              </tbody>
             </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
