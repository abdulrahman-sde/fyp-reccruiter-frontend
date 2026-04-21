import Link from "next/link";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footer,
}: AuthShellProps) {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden bg-background px-4 py-10 md:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-16 h-80 w-80 rounded-full bg-emerald-400/12 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/8 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-stretch gap-6 lg:grid-cols-2">
        <aside className="hidden rounded-4xl border border-white/8 bg-white/4 p-10 backdrop-blur-2xl lg:flex lg:flex-col lg:justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/20">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-base font-semibold tracking-tight text-foreground">
                HireFlow AI
              </span>
            </Link>

            <p className="mt-8 max-w-sm text-3xl leading-tight font-medium tracking-tight text-foreground">
              A faster hiring command center for modern recruiting teams.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Trusted Workflow
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              Screen candidates, evaluate interviews, and move top talent through
              a consistent AI-first recruitment process.
            </p>
          </div>
        </aside>

        <div className="rounded-4xl border border-white/8 bg-white/4 p-1.5 backdrop-blur-2xl">
          <div className="rounded-[calc(var(--radius-4xl)-0.375rem)] bg-linear-to-b from-white/5 to-transparent p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.14)] md:p-8">
            <div className="mb-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-300/85">
                {eyebrow}
              </p>
              <h1 className="mt-3 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                {title}
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>

            {children}

            {footer ? <div className="mt-7 text-sm text-muted-foreground">{footer}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}