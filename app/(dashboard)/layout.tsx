import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/recruiter/Sidebar";
import { Header } from "@/components/layout/recruiter/Header";
import { getSession } from "@/lib/session";

export default async function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();
  if (!user) redirect("/sign-in");

  return (
    <div className="flex min-h-dvh bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header user={user} />
        <main className="relative z-0 flex-1 overflow-y-auto p-4 pb-24 md:p-8 md:pb-8 lg:p-12 lg:pb-12">
          <div className="absolute top-0 left-1/4 w-125 h-125 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen -z-10" />
          {children}
        </main>
      </div>
    </div>
  );
}
