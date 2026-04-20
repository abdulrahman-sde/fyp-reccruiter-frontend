# HireFlow Frontend Development Rules

## Candidate Portal Guidelines

---

## File Organization Rules

### 0. Page Structure Rule

**All page files (app/**/page.tsx) must only contain high-level section components.**
They should not contain any direct markup or complex logic. This applies to all pages, not just the landing page.

```tsx
// ❌ BAD - Direct markup in page.tsx
export default function Dashboard() {
  return (
    <div>
      <h1>My Context</h1>
      <div className="grid...">...</div>
    </div>
  );
}

// ✅ GOOD - Specific components
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { ApplicationList } from "@/components/dashboard/ApplicationList";

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

### 1. Hooks Extraction Rule

**Everything before the return statement goes to hooks folder**

```jsx
// ❌ BAD - Logic in component
function JobSearch() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    const data = await api.getJobs();
    setJobs(data);
    setLoading(false);
  };

  return <div>...</div>;
}

// ✅ GOOD - Logic in hooks file
// hooks/useJobSearch.ts
export function useJobSearch() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    const data = await api.getJobs();
    setJobs(data);
    setLoading(false);
  };

  return { jobs, loading, fetchJobs };
}

// components/JobSearch.tsx
function JobSearch() {
  const { jobs, loading } = useJobSearch();
  return <div>...</div>;
}
```

---

### 2. Types Extraction Rule

**All TypeScript types/interfaces go to types folder**

```typescript
// ❌ BAD - Types in component file
function JobCard({ job }: { job: { id: string, title: string } }) {
  return <div>...</div>
}

// ✅ GOOD - Types in types folder
// types/job.ts
export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  salary_range: string;
  location: string;
  deadline: string;
}

export interface Application {
  id: string;
  job_id: string;
  status: 'new' | 'screening' | 'interviewed' | 'shortlisted' | 'rejected';
  match_score: number;
  applied_at: string;
}

// components/JobCard.tsx
import { Job } from '@/types/job';

function JobCard({ job }: { job: Job }) {
  return <div>...</div>
}
```

---

### 3. Server-Side Priority Rule

**Keep as much logic server-side as possible**

```typescript
// ❌ BAD - Client-side filtering/sorting
function JobList() {
  const { jobs } = useJobs();
  const filtered = jobs.filter(j => j.location === 'Remote'); // Client-side
  const sorted = filtered.sort((a, b) => b.match_score - a.match_score); // Client-side

  return <div>...</div>
}

// ✅ GOOD - Server-side filtering/sorting
// Server handles filtering and sorting
function JobList() {
  const { jobs } = useJobs({
    location: 'Remote',
    sortBy: 'match_score',
    order: 'desc'
  }); // All done server-side

  return <div>...</div>
}
```

**What should be server-side:**

- Data fetching and processing
- Filtering and sorting large datasets
- Calculations (match scores, rankings)
- Validation logic
- Authentication checks
- File processing (CV parsing)

**What can be client-side:**

- UI state (modals, dropdowns, tabs)
- Form validation (basic, real-time feedback)
- Animations and transitions
- Client-side routing
- Local search/filter on small datasets (<50 items)

---

## Styling Rules

### 4. globals.css Configuration (Tailwind CSS v4)

**All colors and border-radius values go in globals.css using @theme**

```css
/* globals.css - Tailwind CSS v4 */
@import "tailwindcss";

@theme {
  /* Colors */
  --color-background: oklch(100% 0 0);
  --color-foreground: oklch(9% 0.024 285.8);

  --color-primary: oklch(58.8% 0.208 255.5);
  --color-primary-foreground: oklch(98% 0.008 285.8);

  --color-secondary: oklch(96.1% 0.008 285.8);
  --color-secondary-foreground: oklch(24.1% 0.043 285.8);

  --color-muted: oklch(96.1% 0.008 285.8);
  --color-muted-foreground: oklch(56.9% 0.015 285.8);

  --color-accent: oklch(96.1% 0.008 285.8);
  --color-accent-foreground: oklch(24.1% 0.043 285.8);

  --color-destructive: oklch(62.8% 0.257 29.2);
  --color-destructive-foreground: oklch(98% 0.008 285.8);

  --color-border: oklch(89.8% 0.011 285.8);
  --color-input: oklch(89.8% 0.011 285.8);
  --color-ring: oklch(58.8% 0.208 255.5);

  --color-success: oklch(50.3% 0.148 155.5);
  --color-warning: oklch(68.6% 0.196 65.3);
  --color-info: oklch(60.2% 0.151 237.5);

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  @theme {
    --color-background: oklch(9% 0.024 285.8);
    --color-foreground: oklch(98% 0.008 285.8);

    --color-primary: oklch(58.8% 0.208 255.5);
    --color-primary-foreground: oklch(98% 0.008 285.8);

    /* ... other dark mode colors ... */
  }
}

/* ❌ NEVER do this in component files */
/* components should use: className="bg-primary text-primary-foreground rounded-lg" */
/* NOT: className="bg-blue-600 text-white rounded-[0.5rem]" */
```

---

### 5. Shadcn UI Components

**Use Shadcn components for all UI elements**

```tsx
// ✅ GOOD - Using Shadcn components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

function JobCard({ job }: { job: Job }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge variant="secondary">{job.location}</Badge>
        <Button>Apply Now</Button>
      </CardContent>
    </Card>
  );
}

// ❌ BAD - Custom HTML without Shadcn
function JobCard({ job }: { job: Job }) {
  return (
    <div className="border rounded p-4">
      <h3 className="font-bold">{job.title}</h3>
      <span className="bg-gray-200 px-2 py-1 rounded">{job.location}</span>
      <button className="bg-blue-500 text-white px-4 py-2">Apply Now</button>
    </div>
  );
}
```

---

## Folder Structure

```
src/
├── app/                      # Next.js app directory
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── onboarding/
│   ├── (candidate)/
│   │   ├── dashboard/
│   │   ├── jobs/
│   │   ├── applications/
│   │   ├── interview/
│   │   └── profile/
│   └── layout.tsx
│
├── components/
│   ├── layout/              # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── MainLayout.tsx
│   │
│   ├── ui/                  # Shadcn components (auto-generated)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   └── ...
│   │
│   ├── shared/              # Reusable components
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── SearchBar.tsx
│   │   └── FilterPanel.tsx
│   │
│   ├── landing/             # Landing page components
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   └── CTA.tsx
│   │
│   ├── jobs/                # Job-related components
│   │   ├── JobCard.tsx
│   │   ├── JobList.tsx
│   │   ├── JobDetails.tsx
│   │   └── JobFilters.tsx
│   │
│   ├── applications/        # Application components
│   │   ├── ApplicationCard.tsx
│   │   ├── ApplicationList.tsx
│   │   └── ApplicationStatus.tsx
│   │
│   ├── interview/           # Interview components
│   │   ├── InterviewRoom.tsx
│   │   ├── VideoPlayer.tsx
│   │   └── QuestionDisplay.tsx
│   │
│   └── profile/             # Profile components
│       ├── ProfileForm.tsx
│       ├── InterestsSelector.tsx
│       └── CVUpload.tsx
│
├── hooks/                   # All state logic and effects
│   ├── useJobs.ts
│   ├── useApplications.ts
│   ├── useInterview.ts
│   ├── useAuth.ts
│   └── useProfile.ts
│
├── types/                   # All TypeScript definitions
│   ├── job.ts
│   ├── application.ts
│   ├── user.ts
│   ├── interview.ts
│   └── api.ts
│
├── lib/
│   ├── api.ts              # API client
│   └── utils.ts
│
└── styles/
    └── globals.css         # All colors and design tokens (Tailwind v4)
```

---

## Component Pattern Example

```tsx
// types/job.ts
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary_range: string;
  match_score: number;
  status: "draft" | "published" | "archived";
}

export interface JobFilters {
  keyword?: string;
  location?: string;
  type?: string;
  minScore?: number;
}

// hooks/useJobs.ts
import { useState, useEffect } from "react";
import { Job, JobFilters } from "@/types/job";
import { api } from "@/lib/api";

export function useJobs(filters?: JobFilters) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await api.get("/jobs", { params: filters });
      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { jobs, loading, error, refetch: fetchJobs };
}

// components/jobs/JobList.tsx
import { useJobs } from "@/hooks/useJobs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export function JobList() {
  const { jobs, loading } = useJobs();

  if (loading) {
    return <Skeleton className="h-32" />;
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card key={job.id}>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <Badge variant="secondary">{job.location}</Badge>
            <div className="mt-2">Match Score: {job.match_score}%</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

---

## Key Principles Summary

1. **Separation of Concerns**: Logic (hooks) separate from UI (components)
2. **Type Safety**: All types defined in types folder
3. **Server First**: Heavy lifting on server, client for UI only
4. **Design Tokens**: Colors and radius in globals.css only
5. **Component Library**: Use Shadcn for all UI elements
6. **No Hardcoded Values**: Use CSS variables for colors/spacing
7. **API Calls**: Always in hooks, never in components
8. **Reusability**: Hooks and types shared across components
