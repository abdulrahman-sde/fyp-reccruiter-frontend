@AGENTS.md

# HireFlow Frontend — Development Rules

## Architecture

### Page files (`app/**/page.tsx`)
Only high-level section components — no direct markup or logic.

```tsx
// ✅ GOOD
export default function Dashboard() {
  return (
    <div className="space-y-8">
      <StatsHeader />
      <StatsOverview />
      <ApplicationList />
    </div>
  );
}
```

### Hooks (`hooks/`)
All state, effects, and API calls go here — nothing before the `return` in a component.

```tsx
// ✅ GOOD: hooks/useJobs.ts exports useJobs()
// components/JobList.tsx calls const { jobs, loading } = useJobs();
```

### Types (`types/`)
All TypeScript interfaces/types live here — never inline in component files.

### Server-first
- Data fetching, filtering, sorting, auth checks → server side
- UI state, modals, animations, small local filters (<50 items) → client side

---

## Styling

### Tailwind CSS v4
All colors and border-radius go in `app/globals.css` under `@theme`. Never use raw color values (`bg-blue-600`) in components — use semantic tokens (`bg-primary`).

### Shadcn UI
Use Shadcn components for all UI elements (`Button`, `Card`, `Badge`, `Input`, etc.).

---

## Folder structure

```
app/                     # Next.js pages (section components only)
components/
  ui/                    # Shadcn (auto-generated)
  layout/recruiter/      # Sidebar, Header
  landing/recruiter/     # Landing page sections
  auth/recruiter/        # Auth forms
  dashboard/recruiter/   # Dashboard widgets
  jobs/recruiter/        # Job-related components
  applications/          # Application components
hooks/                   # All state/effect/fetch logic
types/                   # All TypeScript definitions
lib/                     # api.ts, utils.ts, dal.ts, session.ts
app/actions/             # Next.js server actions (API calls)
app/globals.css          # Design tokens (@theme)
```

---

## Data Access Layer (DAL) — `lib/dal.ts`

The DAL is the **only** place server components fetch data from the API. It is `server-only` and uses `React.cache` so duplicate calls within one render pass are deduplicated automatically.

```ts
// ✅ CORRECT — server component reads from the DAL
import { getJobs } from "@/lib/dal";
const result = await getJobs({ status: "PUBLISHED" });
```

```ts
// ❌ WRONG — raw fetch inside a page or component
const res = await fetch("/api/jobs");
```

Rules:
- All exported DAL functions are wrapped in `cache()` from `react`.
- The DAL reads the `hf_access` cookie server-side — never pass tokens as props.
- Return `null` on auth failure or network error; the page handles the redirect.
- Add new DAL functions here as new API resources are built (applications, interviews, etc.).

---

## API calls

| Use case | Where |
|---|---|
| Server-side reads (page/layout) | `lib/dal.ts` functions |
| Client-side reads (hooks) | `hooks/use*.ts` via `fetch('/api/...')` |
| Mutations (create/update/delete) | `app/actions/*.ts` server actions |

Never call `fetch` directly inside a component or page.

---

## Key principles

1. **Separation of concerns** — logic in hooks/DAL, markup in components
2. **Type safety** — all types in `types/` folder
3. **Server first** — heavy lifting on the server; DAL for all server reads
4. **Design tokens** — semantic CSS variables only
5. **Shadcn** — no raw HTML buttons/inputs where a Shadcn component exists
6. **No API calls in components** — always via DAL, hooks, or server actions
