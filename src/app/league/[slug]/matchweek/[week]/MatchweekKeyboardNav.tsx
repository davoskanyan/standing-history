"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export interface MatchweekKeyboardNavProps {
  basePath: string;
  week: number;
  minWeek: number;
  maxWeek: number;
}

function isTypingElement(el: EventTarget | null): boolean {
  if (!el || !(el instanceof HTMLElement)) return false;
  const tag = el.tagName.toLowerCase();
  if (tag === "input" || tag === "textarea") return true;
  if (el.isContentEditable) return true;
  return false;
}

export function MatchweekKeyboardNav({
  basePath,
  week,
  minWeek,
  maxWeek,
}: MatchweekKeyboardNavProps) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTypingElement(e.target as HTMLElement)) return;

      if (e.key === "ArrowLeft" && week > minWeek) {
        e.preventDefault();
        router.replace(`${basePath}/matchweek/${week - 1}`);
      } else if (e.key === "ArrowRight" && week < maxWeek) {
        e.preventDefault();
        router.replace(`${basePath}/matchweek/${week + 1}`);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [basePath, week, minWeek, maxWeek, router]);

  return null;
}
