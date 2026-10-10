"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./nav-items";

export function GameSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:block w-52 shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="sticky top-0 flex flex-col gap-6 p-4">
        <div className="px-2 text-center text-xs font-semibold uppercase tracking-[0.3em]">
          Janus
          <br />
          Protocol
        </div>
        <nav aria-label="Janus Protocol" className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  active && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                )}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
