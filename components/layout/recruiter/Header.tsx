import { Button } from "@/components/ui/button";
import { SignOutButton } from "./SignOutButton";
import type { AuthUser } from "@/types/auth";
import Link from "next/link";

type HeaderProps = {
  user: AuthUser | null;
};

export function Header({ user }: HeaderProps) {
  const displayName = user?.profile
    ? `${user.profile.firstName} ${user.profile.lastName}`
    : (user?.email ?? "");
  const initial = (
    user?.profile?.firstName?.[0] ??
    user?.email?.[0] ??
    "?"
  ).toUpperCase();

  return (
    <header className="h-16 shrink-0 border-b border-border bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-8 lg:px-12 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-400/18 ring-1 ring-emerald-400/40 md:hidden">
          <div className="h-2 w-2 rounded-full bg-emerald-300" />
        </div>
        <span className="text-sm font-medium tracking-tight text-foreground md:hidden">
          HireFlow
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Button className="rounded-full px-5 py-2 h-9 text-xs font-medium bg-foreground text-background hover:opacity-90 transition-transform active:scale-95 shadow-sm">
          <Link href="/jobs/new">+ Post New Job</Link>
        </Button>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 p-1 pl-3 pr-2 rounded-full border border-border">
            <span className="text-sm text-foreground/80 font-medium">
              {displayName}
            </span>
            <div className="w-6 h-6 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-xs text-foreground/70">
              {initial}
            </div>
          </div>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
