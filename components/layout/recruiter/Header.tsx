"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  return (
    <header className="h-16 shrink-0 border-b border-border bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-8 lg:px-12 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-400/18 ring-1 ring-emerald-400/40 md:hidden">
          <div className="h-2 w-2 rounded-full bg-emerald-300" />
        </div>
        <span className="text-sm font-medium tracking-tight text-foreground md:hidden">HireFlow</span>
      </div>

      <div className="flex items-center gap-4">
        {/* New Job CTA - "Island" Style Button */}
        <Button
          onClick={() => router.push("/jobs/new")}
          className="hidden rounded-full px-5 py-2 h-9 text-xs font-medium bg-foreground text-background hover:opacity-90 transition-transform active:scale-95 shadow-sm md:inline-flex"
        >
          + Post New Job
        </Button>

        {/* Minimal Dropdown trigger */}
        <button className="flex items-center rounded-full border border-border p-1 transition-colors hover:bg-black/5 dark:hover:bg-white/5 md:gap-2 md:pr-2 md:pl-3">
          <span className="hidden text-sm font-medium text-foreground/80 md:inline">
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
