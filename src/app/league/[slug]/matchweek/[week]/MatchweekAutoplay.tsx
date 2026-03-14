"use client";

import { Button } from "@/shared/ui";
import { PauseIcon, PlayIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const AUTOPLAY_INTERVAL_MS = 2000;
const AUTOPLAY_PARAM = "autoplay";

export interface MatchweekAutoplayProps {
  basePath: string;
  week: number;
  minWeek: number;
  maxWeek: number;
}

function useAutoplayFromUrl() {
  const searchParams = useSearchParams();
  return searchParams.get(AUTOPLAY_PARAM) === "1";
}

export function MatchweekAutoplay({
  basePath,
  week,
  minWeek,
  maxWeek,
}: MatchweekAutoplayProps) {
  const router = useRouter();
  const autoplayFromUrl = useAutoplayFromUrl();
  const [isPlaying, setIsPlaying] = useState(autoplayFromUrl);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync with URL when it changes (e.g. after navigation)
  useEffect(() => {
    setIsPlaying(autoplayFromUrl);
  }, [autoplayFromUrl]);

  const advance = useCallback(() => {
    const nextWeek = week >= maxWeek ? minWeek : week + 1;
    router.replace(`${basePath}/matchweek/${nextWeek}?${AUTOPLAY_PARAM}=1`);
  }, [basePath, week, minWeek, maxWeek, router]);

  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = setInterval(advance, AUTOPLAY_INTERVAL_MS);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, advance]);

  const toggle = useCallback(() => {
    const nextPlaying = !isPlaying;
    setIsPlaying(nextPlaying);
    if (nextPlaying) {
      router.replace(`${basePath}/matchweek/${week}?${AUTOPLAY_PARAM}=1`);
    } else {
      router.replace(`${basePath}/matchweek/${week}`);
    }
  }, [basePath, week, isPlaying, router]);

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      className="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent dark:hover:text-accent-foreground"
      onClick={toggle}
      aria-label={isPlaying ? "Pause autoplay" : "Autoplay through matchweeks"}
      title={
        isPlaying
          ? "Pause autoplay"
          : "Automatically advance through matchweeks every 2 seconds"
      }
    >
      {isPlaying ? (
        <PauseIcon className="size-4" aria-hidden />
      ) : (
        <PlayIcon className="size-4" aria-hidden />
      )}
    </Button>
  );
}
