"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Navbar02 } from "@/components/ui/shadcn-io/navbar-react-course";
import { GameSidebar } from "@/components/game/game-sidebar";
import { GAME_ROUTES, NAV_ITEMS } from "@/components/game/nav-items";
import { authClient } from "@/lib/auth-client";


const MOBILE_LINKS = [
  { href: "/About", label: "About" },
  ...NAV_ITEMS.map(({ href, label, icon }) => ({ href, label, Icon: icon })),
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  const showSidebar = GAME_ROUTES.some((r) =>
    r === "/" ? pathname === "/" : pathname.startsWith(r)
  ) && !!session && !isPending;

  return (
    <div className="min-h-screen grid grid-rows-[60px_1fr]">
      <header className="g-header flex items-center justify-between">
        <Navbar02
          mobileNavigationLinks={MOBILE_LINKS}
          onCtaClick={(path) =>
            router.push(path, {
              scroll: false,
            })
          }
        />
      </header>

      <div className="flex min-h-0">
        {showSidebar && <GameSidebar />}
        <main className="g-body flex-1 overflow-y-auto min-h-0 px-6 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
