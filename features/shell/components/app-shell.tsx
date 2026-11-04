"use client";

// Imports
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import { AppSidebar } from "./app-sidebar";

// Component
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isCodingWorkspace = /\/code\/[^/]+$/.test(pathname);

  return (
    <div className="flex min-h-full flex-1">
      <aside
        className={cn(
          "sticky top-0 hidden h-svh w-60 shrink-0 border-r border-sidebar-border lg:block",
          isCodingWorkspace && "lg:hidden"
        )}
      >
        <Suspense fallback={<div className="p-5 text-sm text-muted-foreground">Loading nav…</div>}>
          <AppSidebar />
        </Suspense>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className={cn(
            "sticky top-0 z-20 flex items-center gap-3 border-b bg-background/85 px-4 py-3 backdrop-blur-sm lg:hidden",
            isCodingWorkspace && "hidden"
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </Button>
          <p className="font-heading text-sm tracking-tight">Yasa&apos;s Notes</p>
        </header>

        <main
          className={cn(
            "mx-auto w-full flex-1",
            isCodingWorkspace ? "max-w-none px-0 py-0" : "max-w-6xl px-4 py-8 sm:px-8"
          )}
        >
          <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
            <div key={pathname}>{children}</div>
          </Suspense>
        </main>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-60 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <Suspense fallback={null}>
            <AppSidebar onNavigate={() => setOpen(false)} />
          </Suspense>
        </SheetContent>
      </Sheet>
    </div>
  );
}
