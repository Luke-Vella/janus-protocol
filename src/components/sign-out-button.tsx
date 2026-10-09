"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <Button variant="outline" onClick={signOut}>
      Sign out
    </Button>
  );
}
