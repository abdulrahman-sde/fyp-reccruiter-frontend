import { Badge } from "@/components/ui/badge";

export function Features() {
  const features = [
    {
      title: "Automated CV Parsing",
      badge: "Instant Extraction",
      description: "Extract essential details in under 10 seconds. AI identifies skills, experience, and contact info, dropping the manual labor.",
      span: "md:col-span-8 md:row-span-2",
    },
    {
      title: "AI Match Scoring",
      badge: "Contextual",
      description: "Match profiles accurately to your requirements.",
      span: "md:col-span-4",
    },
    {
      title: "Real-time AI Interviews",
      badge: "Interactive",
      description: "AI-generated questions adapt in real-time.",
      span: "md:col-span-4",
    },
  ];

  return (
    <section id="features" className="relative w-full py-32 bg-white overflow-hidden scroll-mt-28">
      <div className="absolute top-1/2 h-200 w-full -translate-y-1/2 bg-indigo-900/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mx-auto mb-24 flex max-w-175 flex-col items-center space-y-6 text-center">
          <Badge variant="outline" className="border-black/10 text-neutral-600 bg-black/5 backdrop-blur-xl rounded-full px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em]">
            Scale Your Hiring
          </Badge>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900">
            Focus on decisions, not administration
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:auto-rows-[minmax(200px,auto)]">
          {features.map((feature, i) => (
            <div key={i} className={`group rounded-[2.5rem] border border-black/5 bg-black/2 p-1.5 ring-1 ring-black/5 backdrop-blur-2xl ${feature.span}`}>
              <div className="flex h-full w-full flex-col justify-end rounded-[calc(2.5rem-0.375rem)] bg-linear-to-b from-black/2 to-transparent p-8 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)] md:p-10">
                <div className="mb-auto pb-8">
                  <Badge variant="secondary" className="font-medium bg-black/10 text-neutral-600 border-0">{feature.badge}</Badge>
                </div>
                <h3 className="text-2xl font-medium text-neutral-900 mb-4">{feature.title}</h3>
                <p className="text-neutral-500 font-light leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
