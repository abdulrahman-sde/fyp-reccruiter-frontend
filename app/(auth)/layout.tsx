import { redirect } from "next/navigation";
import { getSession } from "@/lib/dal";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();
  if (user?.onboardingDone) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
