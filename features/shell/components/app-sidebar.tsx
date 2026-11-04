"use client";

// Imports
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChartNoAxesColumn,
  LayoutDashboard,
  PenLine,
  RotateCcw,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "./theme-toggle";

// Constants
const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/notes", label: "Notes", icon: BookOpen },
  { href: "/practice", label: "Practice", icon: PenLine },
  { href: "/review", label: "Review", icon: RotateCcw },
  { href: "/progress", label: "Progress", icon: ChartNoAxesColumn },
] as const;

// Helpers
function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

// Component
export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="px-5 py-5">
        <Link href="/" onClick={onNavigate} className="block">
          <p className="font-heading text-lg tracking-tight">Yasa&apos;s Notes</p>
          <p className="mt-1 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
            CS practice studio
          </p>
        </Link>
      </div>

      <Separator />

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/70 hover:text-sidebar-foreground"
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Separator />

      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-xs text-muted-foreground">Theme</span>
        <ThemeToggle />
      </div>
    </div>
  );
}
