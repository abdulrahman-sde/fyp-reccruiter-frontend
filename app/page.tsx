import { Hero } from "@/components/landing/recruiter/Hero";
import { Features } from "@/components/landing/recruiter/Features";
import { HowItWorks } from "@/components/landing/recruiter/HowItWorks";
import { Metrics } from "@/components/landing/recruiter/Metrics";
import { CTA } from "@/components/landing/recruiter/CTA";

export default function RecruiterLandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Metrics />
        <CTA />
      </main>
    </div>
  );
}
