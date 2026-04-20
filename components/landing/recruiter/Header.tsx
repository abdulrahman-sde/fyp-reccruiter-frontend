"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Pipeline", href: "#pipeline" },
  { label: "Results", href: "#results" },
  { label: "Get Started", href: "#get-started" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* <header className="sticky top-4 z-40 px-4 md:px-6 lg:px-8"> */}
      <header className="sticky top-5 z-50">
        <div className="mx-auto max-w-7xl p-1.5 rounded-full border border-black/10 bg-white/70 backdrop-blur-xl shadow-[0_18px_60px_-36px_rgba(0,0,0,0.35)]">
          <div className="h-14 rounded-[calc(9999px-0.375rem)] bg-white/90 px-2 md:px-3 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-full px-3 py-2 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-black/5"
            >
              <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-black/5 border border-black/10">
                <span className="absolute h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </span>
              <span className="text-sm md:text-base font-semibold tracking-tight text-neutral-900">
                HireFlow AI
              </span>
            </Link>

            <nav className="hidden lg:flex items-center rounded-full border border-black/10 bg-black/2 px-2 py-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-neutral-600 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-black/5 hover:text-neutral-900"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                className="rounded-full px-4 h-9 text-sm text-neutral-700 hover:text-neutral-900 hover:bg-black/5"
              >
                Log in
              </Button>

              <Button className="rounded-full h-10 pl-5 pr-2 text-sm font-medium bg-neutral-900 text-white hover:bg-black transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
                Start free trial
                <span className="ml-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 group-hover/button:translate-x-1 group-hover/button:-translate-y-px">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M4.5 1.5H13.5V10.5H12V3.56066L2.56066 13L1.5 11.9393L10.9393 2.5H4.5V1.5Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </Button>
            </div>

            <button
              type="button"
              className="relative h-10 w-10 rounded-full border border-black/10 bg-black/2 transition-colors duration-500 hover:bg-black/5 md:hidden"
              aria-label="Open navigation menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((open) => !open)}
            >
              <span
                className={`absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1.25 bg-neutral-900 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? "translate-y-0 rotate-45" : ""}`}
              />
              <span
                className={`absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 bg-neutral-900 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 translate-y-1.25 bg-neutral-900 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? "translate-y-0 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`md:hidden fixed inset-0 z-30 bg-white/95 backdrop-blur-2xl px-6 pt-28 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-3">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="rounded-3xl border border-black/10 bg-black/2 px-5 py-4 text-lg font-medium text-neutral-900 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{
                transform: isOpen ? "translateY(0)" : "translateY(14px)",
                opacity: isOpen ? 1 : 0,
                transitionDelay: `${120 + index * 70}ms`,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div
          className="mt-8 rounded-4xl border border-black/10 bg-black/2 p-1.5"
          style={{
            transform: isOpen ? "translateY(0)" : "translateY(18px)",
            opacity: isOpen ? 1 : 0,
            transition: "all 700ms cubic-bezier(0.32,0.72,0,1)",
            transitionDelay: "360ms",
          }}
        >
          <div className="rounded-[calc(2rem-0.375rem)] bg-white p-3 flex gap-2">
            <Button
              variant="outline"
              className="flex-1 rounded-full h-11 border-black/10 text-neutral-900"
              onClick={() => setIsOpen(false)}
            >
              Log in
            </Button>
            <Button
              className="flex-1 rounded-full h-11 bg-neutral-900 text-white hover:bg-black"
              onClick={() => setIsOpen(false)}
            >
              Start free
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}