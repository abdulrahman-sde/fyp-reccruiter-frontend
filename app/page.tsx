import { Hero } from "@/components/landing/recruiter/Hero";
import { Features } from "@/components/landing/recruiter/Features";
import { HowItWorks } from "@/components/landing/recruiter/HowItWorks";
import { Metrics } from "@/components/landing/recruiter/Metrics";
import { CTA } from "@/components/landing/recruiter/CTA";
import { Header } from "@/components/landing/recruiter/Header";

export default function RecruiterLandingPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-white ">
      <Header />
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
