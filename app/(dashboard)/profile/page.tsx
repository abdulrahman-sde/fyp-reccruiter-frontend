import { redirect } from "next/navigation";
import { getSession } from "@/lib/dal";
import { SignOutButton } from "@/components/layout/recruiter/SignOutButton";

export default async function ProfilePage() {
  const user = await getSession();
  if (!user) redirect("/sign-in");

  const firstName = user.profile?.firstName ?? "";
  const lastName = user.profile?.lastName ?? "";
  const initials =
    (`${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() ||
      user.email?.[0]?.toUpperCase()) ??
    "?";
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : "—";

  return (
    <div className="max-w-2xl space-y-5 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-medium tracking-tight mb-2">Profile</h1>
        <p className="text-white/50 font-light">
          Your account and recruiter information.
        </p>
      </div>

      {/* Personal info */}
      <Card>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-emerald-400/15 ring-1 ring-emerald-400/30 flex items-center justify-center shrink-0">
            <span className="text-lg font-semibold text-emerald-400">
              {initials}
            </span>
          </div>
          <div>
            <p className="text-base font-medium text-foreground">{fullName}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="First Name" value={firstName || "—"} />
          <Field label="Last Name" value={lastName || "—"} />
          <Field label="Email" value={user.email} />
          <Field label="Role" value={user.role} />
          <Field label="Phone" value={user.profile?.phone || "—"} />
          <Field label="Job Title" value={user.profile?.jobTitle || "—"} />
        </div>
      </Card>

      {/* Company info */}
      <Card>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
          Company
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Name" value={user.company?.name || "—"} />
          <Field label="Industry" value={user.company?.industry || "—"} />
          <Field label="Size" value={user.company?.size || "—"} />
          <Field label="Website" value={user.company?.website || "—"} />
        </div>
      </Card>

      <div className="flex justify-end">
        <SignOutButton />
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-1 rounded-[1.5rem] bg-white/[0.02] border border-white/[0.08] ring-1 ring-white/[0.03]">
      <div className="rounded-[calc(1.5rem-0.25rem)] bg-gradient-to-b from-white/[0.03] to-transparent p-6">
        {children}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}
