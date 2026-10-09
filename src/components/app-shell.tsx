"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Navbar02 } from "@/components/ui/shadcn-io/navbar-react-course";

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="min-h-screen grid grid-rows-[60px_1fr_40px]">
      <header className="g-header flex items-center justify-between px-6">
        <Navbar02
          onCtaClick={(path) =>
            router.push(path, {
              scroll: false,
            })
          }
        />
      </header>

      <main className="g-body overflow-y-auto min-h-0 px-6 py-6">
        {children}
      </main>

      <footer className="g-footer px-6 py-3">Footer</footer>
    </div>
  );
}
