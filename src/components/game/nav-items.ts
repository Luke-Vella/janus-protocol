import {
  LayoutDashboard,
  ListChecks,
  Mail,
  BookOpen,
  Map,
  Users,
  FolderOpen,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/todo", label: "Work", icon: ListChecks },
  { href: "/emails", label: "Emails", icon: Mail },
  { href: "/journal", label: "Journal", icon: BookOpen },
  { href: "/map", label: "Map", icon: Map },
  { href: "/people", label: "People", icon: Users },
  { href: "/files", label: "Files", icon: FolderOpen },
  { href: "/settings", label: "Settings", icon: Settings },
];

export const GAME_ROUTES = NAV_ITEMS.map((i) => i.href);
