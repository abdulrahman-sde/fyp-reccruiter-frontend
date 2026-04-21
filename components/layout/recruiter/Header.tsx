"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  return (
    <header className="h-16 shrink-0 border-b border-border bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-8 lg:px-12 sticky top-0 z-50">
      <div className="flex items-center">
        {/* Placeholder for Breadcrumbs if needed */}
      </div>

      <div className="flex items-center gap-4">
        {/* New Job CTA - "Island" Style Button */}
        <Button
          onClick={() => router.push("/jobs/new")}
          className="rounded-full px-5 py-2 h-9 text-xs font-medium bg-foreground text-background hover:opacity-90 transition-transform active:scale-95 shadow-sm"
        >
          + Post New Job
        </Button>

        {/* Minimal Dropdown trigger */}
        <button className="flex items-center gap-2 p-1 pl-3 pr-2 rounded-full border border-border hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <span className="text-sm text-foreground/80 font-medium">
            Acme Corp
          </span>
          <div className="w-6 h-6 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-xs text-foreground/70">
            A
          </div>
        </button>
      </div>
    </header>
  );
}
