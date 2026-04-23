"use client";

const TABS = ["Active", "Draft", "Previous"];

interface JobsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function JobsTabs({ activeTab, onTabChange }: JobsTabsProps) {
  return (
    <div className="flex items-center justify-center md:block">
      <div className="flex w-fit items-center gap-2 rounded-full border border-white/5 bg-white/2 p-1 ring-1 ring-white/2 backdrop-blur-xl animate-fade-in-up animation-delay-100">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-white/10 text-white shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                : "text-white/50 hover:text-white/90 hover:bg-white/5"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
