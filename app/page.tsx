import { getSession } from "@/lib/dal";
import { Header } from "@/components/landing/recruiter/Header";
import { Hero } from "@/components/landing/recruiter/Hero";
import { Features } from "@/components/landing/recruiter/Features";
import { HowItWorks } from "@/components/landing/recruiter/HowItWorks";
import { Metrics } from "@/components/landing/recruiter/Metrics";
import { CTA } from "@/components/landing/recruiter/CTA";

export default async function RecruiterLandingPage() {
  const user = await getSession();

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <Header isLoggedIn={!!user} />
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
