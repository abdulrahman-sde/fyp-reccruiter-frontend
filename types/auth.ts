export interface AuthUser {
  id: string;
  email: string;
  role: string;
  profile: {
    firstName: string;
    lastName: string;
  } | null;
  onboardingDone: boolean;
}

export type AuthActionState =
  | { errors?: Record<string, string[]>; message?: string }
  | undefined;
