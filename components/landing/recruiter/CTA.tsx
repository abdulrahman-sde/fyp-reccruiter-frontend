import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section id="get-started" className="relative w-full py-32 bg-white overflow-hidden scroll-mt-28">
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-purple-900/10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 h-100 w-200 -translate-x-1/2 rounded-full bg-purple-600/20 blur-[150px] pointer-events-none mix-blend-darken" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center space-y-12">
        <div className="p-1.5 rounded-full bg-black/5 border border-black/10 backdrop-blur-2xl">
          <div className="px-6 py-2 rounded-full bg-black/5 shadow-[inset_0_1px_1px_rgba(0,0,0,0.15)] flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
             <span className="text-xs font-medium text-neutral-700 uppercase tracking-widest">Ready to scale your team?</span>
          </div>
        </div>

        <div className="max-w-200 space-y-6">
          <h2 className="text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 drop-shadow-sm">
            Stop scanning. <span className="text-neutral-500">Start hiring.</span>
          </h2>
          <p className="text-xl font-light text-neutral-500 leading-relaxed max-w-2xl mx-auto">
            Transform hours of administrative screening into an efficient, predictable system that finds the job applications you actually need. 
          </p>
        </div>

        <div className="pt-8">
          <div className="p-1.5 rounded-[2.5rem] bg-black/5 border border-black/10 backdrop-blur-2xl inline-block">
             <Button size="lg" className="rounded-[calc(2.5rem-0.375rem)] px-10 py-8 text-lg font-medium bg-neutral-900 text-white hover:bg-black group transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] shadow-[0_0_40px_rgba(0,0,0,0.1)]">
              Create Free Account
              <span className="ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-px">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.5 1.5H13.5V10.5H12V3.56066L2.56066 13L1.5 11.9393L10.9393 2.5H4.5V1.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
