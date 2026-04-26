"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  ApiApplicationRow,
  ApplicationRow,
  ApplicationStatus,
  RecruiterApplicationsResponse,
} from "@/types/application";
import { toApplicationRow } from "@/lib/applicationUtils";

export function useApplicationDetail(id: string, jobId?: string) {
  const [app, setApp] = useState<ApplicationRow | null>(null);
  const [loading, setLoading] = useState(!!jobId);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!jobId) {
      setLoading(false);
      setError("Missing job context. Open details from the applications list.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let found: ApiApplicationRow | undefined;
      let page = 1;
      let total = 0;
      const limit = 50;

      do {
        const res = await fetch(`/api/applications/recruiter/${jobId}?page=${page}&limit=${limit}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to load job applications");

        const body = (await res.json()) as {
          success: boolean;
          data: RecruiterApplicationsResponse;
        };

        if (!body.success) throw new Error("Invalid response");

        found = body.data.applications.find((a) => a.id === id);
        total = body.data.total;
        page += 1;
      } while (!found && (page - 1) * limit < total);

      if (!found) {
        setError("Application not found.");
        return;
      }

      setApp(toApplicationRow(found));
    } catch {
      setError("Could not load application details.");
    } finally {
      setLoading(false);
    }
  }, [id, jobId]);

  useEffect(() => {
    void load();
  }, [load]);

  function updateStatus(status: ApplicationStatus) {
    setApp((prev) => (prev ? { ...prev, status } : prev));
  }

  return { app, loading, error, updateStatus };
}
