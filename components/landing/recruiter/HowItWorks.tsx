import { Badge } from "@/components/ui/badge";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Instant Onboarding",
      desc: "Job applications upload their CV. Our AI engine extracts full text in under 10 seconds, storing skills, education, and contact info securely.",
    },
    {
      num: "02",
      title: "Contextual Match Scoring",
      desc: "When job applications apply, the AI analyzes their indexed CV against your specific job requirements, generating an absolute 0-100 match score.",
    },
    {
      num: "03",
      title: "Adaptive AI Interviews",
      desc: "Top job applications take a real-time, bi-directional voice interview. The AI listens, adapts follow-ups, and conducts a deeply contextual assessment.",
    },
    {
      num: "04",
      title: "Comprehensive Analytics",
      desc: "Get an immutable evaluation report with question-by-question breakdowns, transcripts, and an AI-generated suitability recommendation.",
    }
  ];

  return (
    <section id="pipeline" className="relative w-full py-32 md:py-48 bg-white overflow-hidden scroll-mt-28">
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row gap-16 lg:gap-24">
        {/* Sticky Header Side */}
        <div className="w-full md:w-5/12 flex flex-col items-start">
          <div className="sticky top-24 md:top-32 space-y-4 md:space-y-6">
            <Badge variant="outline" className="border-black/10 text-neutral-600 bg-black/5 backdrop-blur-xl rounded-full px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em]">
              The Pipeline
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-[1.1]">
              A flawless <br className="hidden lg:block" /> automated <br className="hidden lg:block" /> sequence.
            </h2>
            <p className="text-lg sm:text-xl font-light text-neutral-500 leading-relaxed">
              We took the most labor-intensive parts of recruiting and engineered an autonomous workflow that never fatigues.
            </p>
          </div>
        </div>

        {/* Scrollable Steps Side */}
        <div className="w-full md:w-7/12 flex flex-col gap-12">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              {/* Vertical connecting line */}
              {i !== steps.length - 1 && (
                <div className="absolute -bottom-10 left-5 md:-bottom-12 md:left-6 top-14 md:top-16 w-px bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />
              )}

              <div className="flex gap-4 md:gap-8">
                <div className="relative shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/5 border border-black/10 flex items-center justify-center backdrop-blur-md z-10">
                  <div className="absolute inset-0 rounded-full bg-emerald-400/0 group-hover:bg-emerald-400/20 blur-md transition-colors duration-500" />
                  <span className="text-[10px] md:text-xs font-mono text-neutral-600">{step.num}</span>
                </div>
                <div className="pt-1.5 md:pt-2 pb-6 md:pb-8">
                  <h3 className="text-xl sm:text-2xl font-medium text-neutral-900 mb-2 md:mb-4">{step.title}</h3>
                  <p className="text-base sm:text-lg text-neutral-500 font-light leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
