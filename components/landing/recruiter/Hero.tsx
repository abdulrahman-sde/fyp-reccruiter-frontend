import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative w-full min-h-screen -mt-24  flex items-center justify-center overflow-hidden bg-white">
      {/* Ethereal mesh gradients */}
      <div className="absolute top-1/4 left-1/4 w-125 h-125 bg-purple-500/15 rounded-full blur-[120px] pointer-events-none mix-blend-darken" />
      <div className="absolute bottom-1/4 right-0 w-150 h-150 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-darken" />

      <div className="relative container px-4 md:px-6 mx-auto flex flex-col items-center text-center space-y-10 z-10">
        <div>
          <Badge variant="outline" className="border-black/10 text-neutral-600 bg-black/5 backdrop-blur-xl rounded-full px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em]">
            HireFlow AI Intelligence
          </Badge>
        </div>

        <div className="space-y-6 max-w-225 px-2.5 sm:px-0">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-neutral-900 drop-shadow-lg">
            Hire Smarter, <br className="hidden md:block" /> Not Harder with AI
          </h1>
          <p className="text-lg sm:text-xl text-neutral-500 font-light leading-relaxed max-w-2xl mx-auto">
            Automate your recruitment process. Reduce manual HR workload by 80% while ensuring fair, consistent, and scalable job application evaluation from initial CV screening to final interviews.
          </p>
        </div>

        {/* Double-bezel CTA Wrapper */}
        <div className="p-2 rounded-[2.5rem] bg-black/5 border border-black/10 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col sm:flex-row gap-3 rounded-4xl overflow-hidden">
            <Button size="lg" className="rounded-full px-8 py-7 text-base font-medium bg-neutral-900 text-white hover:bg-black group transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
              Post a Job Today
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center ml-3 group-hover:translate-x-1 group-hover:-translate-y-px transition-transform duration-500">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.5 1.5H13.5V10.5H12V3.56066L2.56066 13L1.5 11.9393L10.9393 2.5H4.5V1.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </span>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 py-7 text-base font-medium border-black/10 text-neutral-800 hover:bg-neutral-900 hover:text-neutral-900 hover:border-black bg-transparent transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
