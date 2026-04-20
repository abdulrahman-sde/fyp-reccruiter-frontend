export function Metrics() {
  const metrics = [
    { value: "80%", label: "Manual Workload Reduced" },
    { value: "<10s", label: "CV Parsing Speed" },
    { value: "95%+", label: "Transcription Accuracy" },
    { value: "0", label: "Human Fatigue" }
  ];

  return (
    <section id="results" className="relative w-full py-32 bg-white overflow-hidden scroll-mt-28">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.06),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="rounded-[2.5rem] border border-black/5 bg-black/2 p-1.5 ring-1 ring-white/5 backdrop-blur-2xl">
          <div className="rounded-[calc(2.5rem-0.375rem)] bg-black/40 p-12 md:p-20 shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)]">
            <div className="grid grid-cols-1 md:grid-cols-2 flex-wrap lg:grid-cols-4 gap-12 lg:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {metrics.map((m, i) => (
                <div key={i} className={`flex flex-col items-center text-center ${i !== 0 ? "pt-12 md:pt-0" : ""}`}>
                  <span className="text-5xl md:text-7xl font-medium tracking-tight text-neutral-900 mb-4 drop-shadow-lg">
                    {m.value}
                  </span>
                  <span className="text-sm font-medium text-neutral-500 uppercase tracking-[0.2em]">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
