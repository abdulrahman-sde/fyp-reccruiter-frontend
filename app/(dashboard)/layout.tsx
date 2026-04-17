import { Sidebar } from "@/components/layout/recruiter/Sidebar";
import { Header } from "@/components/layout/recruiter/Header";

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 relative z-0">
          {/* Subtle ambient light for the dashboard */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen -z-10" />
          {children}
        </main>
      </div>
    </div>
  );
}
