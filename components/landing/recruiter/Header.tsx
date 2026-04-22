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

  const isLoggedIn = false;

  return (
    <>
      {/* ✅ Sticky Header */}
      <header className="sticky top-0 z-99 pt-5 px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl p-1.5 rounded-full border border-black/10 bg-white/70 backdrop-blur-xl shadow-[0_18px_60px_-36px_rgba(0,0,0,0.35)]">
          <div className="h-14 rounded-[calc(9999px-0.375rem)] bg-white/90 px-2 md:px-3 flex items-center justify-between">

            {/* Logo */}
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-full md:px-3 py-2"
            >
              <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-black/5 border border-black/10">
                <span className="absolute h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </span>
              <span className="text-sm md:text-base font-semibold tracking-tight text-neutral-900">
                HireFlow AI
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center rounded-full border border-black/10 bg-black/5 px-2 py-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-black/5 hover:text-neutral-900 transition"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Button */}
            <Button className="hidden md:inline-flex rounded-full h-10 pl-5 pr-2 py-6 text-sm font-medium bg-neutral-900 text-white hover:bg-black">
              {isLoggedIn ? "Dashboard" : "Get Started"}
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center ml-3 group-hover:translate-x-1 group-hover:-translate-y-px transition-transform duration-500">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.5 1.5H13.5V10.5H12V3.56066L2.56066 13L1.5 11.9393L10.9393 2.5H4.5V1.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </span>
            </Button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="relative z-100 h-10 w-10 rounded-full border border-black/10 bg-black/5 md:hidden flex items-center justify-center"
              aria-label="Open navigation menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((open) => !open)}
            >
              <span
                className={`absolute h-[1.5px] w-5 bg-neutral-900 transition-all duration-300 ${isOpen ? "rotate-45" : "-translate-y-1.5"
                  }`}
              />

              <span
                className={`absolute h-[1.5px] w-5 bg-neutral-900 transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"
                  }`}
              />

              <span
                className={`absolute h-[1.5px] w-5 bg-neutral-900 transition-all duration-300 ${isOpen ? "-rotate-45" : "translate-y-1.5"
                  }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ✅ Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-white/80 backdrop-blur-xl px-6 pt-28 transition-all duration-500 ${isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="rounded-3xl border border-black/10 bg-black/5 px-5 py-4 text-lg font-medium text-neutral-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 rounded-3xl border border-black/10 bg-black/5 p-2">
          <Button
            className="w-full rounded-xl h-11 bg-neutral-900 text-white hover:bg-black"
            onClick={() => setIsOpen(false)}
          >
            {isLoggedIn ? "Dashboard" : "Get Started"}
          </Button>
        </div>
      </div>
    </>
  );
}
