import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";

export interface MatchweekPickerProps {
  weeks: number[];
  value: number | null;
  onValueChange?: (week: number | null) => void;
  placeholder?: string;
  disabled?: boolean;
}

function weekToLabel(week: number) {
  return `Matchweek ${week}`;
}

export function MatchweekPicker({
  weeks,
  value,
  onValueChange,
  placeholder = "Select matchweek",
  disabled = false,
}: MatchweekPickerProps) {
  const stringValue = value === null ? "" : String(value);
  const minWeek = weeks[0];
  const maxWeek = weeks[weeks.length - 1];
  const canGoPrev = !disabled && (value === null || value > minWeek);
  const canGoNext = !disabled && (value === null || value < maxWeek);

  const goPrev = () => {
    if (value === null) {
      onValueChange?.(maxWeek);
    } else if (value > minWeek) {
      onValueChange?.(value - 1);
    }
  };

  const goNext = () => {
    if (value === null) {
      onValueChange?.(minWeek);
    } else if (value < maxWeek) {
      onValueChange?.(value + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" && canGoPrev) {
      e.preventDefault();
      goPrev();
    } else if (e.key === "ArrowRight" && canGoNext) {
      e.preventDefault();
      goNext();
    }
  };

  return (
    <div
      className="flex items-center gap-1"
      role="group"
      aria-label="Matchweek"
      onKeyDownCapture={handleKeyDown}
    >
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        className="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent dark:hover:text-accent-foreground"
        disabled={!canGoPrev}
        onClick={goPrev}
        aria-label="Previous matchweek"
      >
        <ChevronLeftIcon />
      </Button>
      <Select
        value={stringValue}
        onValueChange={(v) =>
          onValueChange?.(v === "" ? null : parseInt(v, 10))
        }
        disabled={disabled}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {weeks.map((week) => (
            <SelectItem key={week} value={String(week)}>
              {weekToLabel(week)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        className="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent dark:hover:text-accent-foreground"
        disabled={!canGoNext}
        onClick={goNext}
        aria-label="Next matchweek"
      >
        <ChevronRightIcon />
      </Button>
    </div>
  );
}
