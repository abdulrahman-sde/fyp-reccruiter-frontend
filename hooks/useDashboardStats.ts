import { useState, useEffect } from "react";
import { DashboardStats, ActiveJob, Application } from "@/types/dashboard";

export function useDashboardStats() {
  const [loading, setLoading] = useState(true);
  
  const stats: DashboardStats = {
    openJobs: 8,
    totalApplications: 342,
    interviewsPending: 12,
  };

  const activeJobs: ActiveJob[] = [
    {
      id: "j-1",
      title: "Senior Frontend Engineer",
      department: "Engineering",
      postedAt: "2 days ago",
      applicationsCount: 145,
      aiMatchedCount: 23,
      interviewsScheduled: 4,
    },
    {
      id: "j-2",
      title: "Product Marketing Manager",
      department: "Marketing",
      postedAt: "5 days ago",
      applicationsCount: 89,
      aiMatchedCount: 12,
      interviewsScheduled: 2,
    },
    {
      id: "j-3",
      title: "AI Researcher",
      department: "Data Team",
      postedAt: "1 week ago",
      applicationsCount: 42,
      aiMatchedCount: 8,
      interviewsScheduled: 5,
    }
  ];

  const recentApplications: Application[] = [
    { id: "c-1", name: "Elara Vance", role: "Senior Frontend Engineer", matchScore: 94, status: "new", appliedAt: "10m ago" },
    { id: "c-2", name: "Julian Thorne", role: "AI Researcher", matchScore: 88, status: "screening", appliedAt: "1h ago" },
    { id: "c-3", name: "Maya Lin", role: "Product Marketing Manager", matchScore: 82, status: "new", appliedAt: "2h ago" },
    { id: "c-4", name: "Cassian Reed", role: "Senior Frontend Engineer", matchScore: 79, status: "interviewed", appliedAt: "4h ago" },
  ];

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return { stats, activeJobs, recentApplications, loading };
}
