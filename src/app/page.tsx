import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <h1 className="text-4xl font-bold">Welcome to Janus</h1>
        <p className="text-muted-foreground">
          Sign in or create an account to access your dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <p className="text-muted-foreground">
        Welcome back, {session.user.name}.
      </p>
    </div>
  );
}
