"use client";

import { Navbar02 } from "@/components/ui/shadcn-io/navbar-react-course";
import React from "react";
import { useRouter } from "next/navigation";

export default function ReactCourseLayout({
  children,
  modal, // ← parallel route
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  // inside component
  const router = useRouter();

  // Local modal state removed; modal visibility now fully URL-driven via parallel route.

  return (
    <div className="min-h-screen grid grid-rows-[60px_1fr_40px]">
      <header className="g-header flex items-center justify-between px-6">
        <Navbar02
          ctaText="New Post"
          onCtaClick={() =>
            router.push("/react-course/posts/new", { scroll: false })
          }
        />
      </header>

      <main className="g-body overflow-y-auto min-h-0 px-6 py-6">
        {children}
      </main>

      {/* This renders only when a modal route is active */}
      {modal}

      <footer className="g-footer px-6 py-3">React Course Footer</footer>
    </div>
  );
}
