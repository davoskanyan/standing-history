"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/shared/lib";

const navLinks = [{ href: "/", label: "Leagues" }] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-2.5 no-underline">
          <Image
            src="/logo.svg"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-lg shadow-sm"
            unoptimized
          />
          <span className="text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            Standing<span className="text-primary">History</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1" aria-label="Main">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
