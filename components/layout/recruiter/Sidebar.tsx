"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AuthUser } from "@/types/auth";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: "M3 3H10V10H3V3ZM14 3H21V10H14V3ZM3 14H10V21H3V14ZM14 14H21V21H14V14Z",
  },
  {
    label: "Jobs",
    href: "/jobs",
    icon: "M4 6H20V20H4V6ZM4 2H20C21.1 2 22 2.9 22 4V20C22 21.1 21.1 22 20 22H4C2.9 22 2 21.1 2 20V4C2 2.9 2.9 2 4 2ZM20 6V4H4V6H20Z",
  },
  {
    label: "Applications",
    href: "/applications",
    icon: "M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z",
  },
];

export function Sidebar({ user }: { user: AuthUser }) {
  const pathname = usePathname();
  const firstName = user.profile?.firstName ?? "";
  const lastName = user.profile?.lastName ?? "";
  const initials = (`${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || user.email?.[0]?.toUpperCase()) ?? "?";
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : user.email;

  return (
    <>
      <aside className="w-64 border-r border-border bg-background flex-col hidden md:flex shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-emerald-400/20 ring-1 ring-emerald-400/50 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <span className="font-medium text-lg tracking-tight">HireFlow</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 pt-8 pb-4 space-y-1">
          {navItems.map((item, i) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={i}
                href={item.href}
                className={`flex items-center gap-4 px-3 py-2.5 rounded-xl transition-all duration-300 ease-out group ${
                  isActive
                    ? "bg-white/6 text-foreground shadow-sm ring-1 ring-white/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/2"
                }`}
              >
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${isActive ? "text-foreground" : "group-hover:scale-110"}`}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d={item.icon} />
                </svg>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-border">
          <Link
            href="/profile"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-400/15 ring-1 ring-emerald-400/30 flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-emerald-400">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{fullName}</p>
              <p className="text-[11px] text-muted-foreground truncate">
                {user.profile?.jobTitle ?? "Recruiter"}
              </p>
            </div>
            <svg
              className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </aside>

      <nav className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-between rounded-2xl border border-white/10 bg-background/85 px-2 py-2 shadow-[0_14px_40px_-20px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl md:hidden">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-11 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-medium tracking-wide transition-all ${
                isActive
                  ? "bg-white/10 text-foreground"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              }`}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d={item.icon} />
              </svg>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
