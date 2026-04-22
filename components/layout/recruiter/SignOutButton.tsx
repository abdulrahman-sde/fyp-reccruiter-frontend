"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/app/actions/auth";

export function SignOutButton() {
  return (
    <form action={signOut}>
      <Button
        type="submit"
        variant="outline"
        className="h-9 rounded-full text-xs border-border bg-transparent hover:bg-white/5"
      >
        Sign out
      </Button>
    </form>
  );
}
