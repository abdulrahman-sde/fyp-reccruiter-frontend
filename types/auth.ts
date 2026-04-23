export interface AuthUser {
  id: string;
  email: string;
  role: string;
  profile: {
    firstName: string;
    lastName: string;
    phone: string | null;
    jobTitle: string | null;
  } | null;
  company: {
    name: string;
    website: string | null;
    industry: string | null;
    size: string | null;
  } | null;
  onboardingDone: boolean;
}

export type AuthActionState =
  | { errors?: Record<string, string[]>; message?: string }
  | undefined;
