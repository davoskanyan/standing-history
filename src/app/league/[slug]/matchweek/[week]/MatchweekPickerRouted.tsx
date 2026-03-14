"use client";

import {
  MatchweekPicker,
  MatchweekPickerProps,
} from "@/entities/matchweek-picker";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export interface MatchweekPickerRoutedProps extends MatchweekPickerProps {
  basePath: string;
}

export function MatchweekPickerRouted({
  basePath,
  onValueChange,
  weeks,
  value,
  ...rest
}: MatchweekPickerRoutedProps) {
  const router = useRouter();

  // Always prefetch previous and next matchweek when they exist
  useEffect(() => {
    if (value === null || !weeks.length) return;
    const minWeek = weeks[0];
    const maxWeek = weeks[weeks.length - 1];
    if (value > minWeek) router.prefetch(`${basePath}/matchweek/${value - 1}`);
    if (value < maxWeek) router.prefetch(`${basePath}/matchweek/${value + 1}`);
  }, [basePath, value, weeks, router]);

  const handleValueChange = (week: number | null) => {
    if (week !== null) {
      router.replace(`${basePath}/matchweek/${week}`);
    }
    onValueChange?.(week);
  };

  return (
    <MatchweekPicker
      weeks={weeks}
      value={value}
      onValueChange={handleValueChange}
      {...rest}
    />
  );
}
