"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function ApplicationsPage() {
  const router = useRouter();
  const roleMenuRef = useRef<HTMLDivElement | null>(null);
  const scoreMenuRef = useRef<HTMLDivElement | null>(null);
  const [openMenu, setOpenMenu] = useState<"role" | "score" | null>(null);
  
  const [filters, setFilters] = useState({
    status: "All",
    role: "All Roles",
    minScore: 0,
    search: ""
  });
  
  const tabs = ["All", "Pending Screen", "Awaiting Interview", "Interviewed", "Rejected"];
  const roles = ["All Roles", "Senior Frontend Engineer", "AI Researcher", "Product Marketing"];
  const scoreOptions = [
    { value: 0, label: "All Scores" },
    { value: 90, label: "> 90% Match" },
    { value: 80, label: "> 80% Match" },
    { value: 70, label: "> 70% Match" },
  ];

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

  const scoreLabel =
    scoreOptions.find((option) => option.value === filters.minScore)?.label ??
    "All Scores";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedRoleMenu = roleMenuRef.current?.contains(target);
      const clickedScoreMenu = scoreMenuRef.current?.contains(target);

      if (!clickedRoleMenu && !clickedScoreMenu) {
        setOpenMenu(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

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
          
          <div className="relative" ref={roleMenuRef}>
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={openMenu === "role"}
              onClick={() => setOpenMenu(openMenu === "role" ? null : "role")}
              className="flex h-10 w-44 items-center justify-between gap-3 rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white/70 transition-all hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20"
            >
              <span className="truncate">{filters.role}</span>
              <svg
                className={`h-4 w-4 text-white/40 transition-transform duration-300 ${openMenu === "role" ? "rotate-180" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {openMenu === "role" && (
              <div className="absolute right-0 top-12 z-40 min-w-56 rounded-3xl border border-white/10 bg-neutral-950/95 p-1.5 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.75)] backdrop-blur-2xl">
                <div className="rounded-[calc(1.5rem-0.375rem)] bg-linear-to-b from-white/5 to-transparent p-1">
                  {roles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        setFilters((f) => ({ ...f, role }));
                        setOpenMenu(null);
                      }}
                      className={`flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm transition-colors ${
                        filters.role === role
                          ? "bg-white/10 text-white"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{role}</span>
                      {filters.role === role && (
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={scoreMenuRef}>
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={openMenu === "score"}
              onClick={() => setOpenMenu(openMenu === "score" ? null : "score")}
              className="flex h-10 w-36 items-center justify-between gap-3 rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white/70 transition-all hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20"
            >
              <span className="truncate">{scoreLabel}</span>
              <svg
                className={`h-4 w-4 text-white/40 transition-transform duration-300 ${openMenu === "score" ? "rotate-180" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {openMenu === "score" && (
              <div className="absolute right-0 top-12 z-40 min-w-40 rounded-3xl border border-white/10 bg-neutral-950/95 p-1.5 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.75)] backdrop-blur-2xl">
                <div className="rounded-[calc(1.5rem-0.375rem)] bg-linear-to-b from-white/5 to-transparent p-1">
                  {scoreOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setFilters((f) => ({ ...f, minScore: option.value }));
                        setOpenMenu(null);
                      }}
                      className={`flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm transition-colors ${
                        filters.minScore === option.value
                          ? "bg-white/10 text-white"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{option.label}</span>
                      {filters.minScore === option.value && (
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 p-1 rounded-full bg-white/2 border border-white/5 ring-1 ring-white/2 backdrop-blur-xl w-fit animate-fade-in-up animation-delay-100">
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

      <div className="overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/2 p-1 ring-1 ring-white/2 backdrop-blur-xl animate-fade-in-up animation-delay-200">
        <div className="rounded-[calc(2.5rem-0.25rem)] bg-linear-to-b from-white/3 to-transparent p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] md:p-8">
          <div className="min-h-75 w-full overflow-x-auto">
            {filteredApplications.length === 0 ? (
              <div className="flex h-50 flex-col items-center justify-center text-sm text-white/30">
                No job applications found matching your criteria.
              </div>
            ) : (
             <table className="min-w-175 w-full border-collapse text-left">
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
                  <tr key={i} onClick={() => router.push(`/applications/${app.id}`)} className="group cursor-pointer transition-colors hover:bg-white/2">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                           <div className="h-full w-full rounded-full bg-linear-to-br from-white/10 to-transparent" />
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
