"use client";

import {
  MatchweekPicker,
  MatchweekPickerProps,
} from "@/entities/matchweek-picker";
import { useRouter } from "next/navigation";

export interface MatchweekPickerRoutedProps extends MatchweekPickerProps {
  basePath: string;
}

export function MatchweekPickerRouted({
  basePath,
  onValueChange,
  ...rest
}: MatchweekPickerRoutedProps) {
  const router = useRouter();
  const handleValueChange = (week: number | null) => {
    if (week !== null) {
      router.replace(`${basePath}/matchweek/${week}`);
    }
    onValueChange?.(week);
  };

  return <MatchweekPicker onValueChange={handleValueChange} {...rest} />;
}
