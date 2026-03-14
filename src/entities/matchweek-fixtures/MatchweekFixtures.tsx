import type { MatchRow } from "@/shared/lib/standings";
import { formatMatchDate } from "@/shared/lib/standings";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

export interface MatchweekFixturesProps {
  matches: MatchRow[];
  caption?: string;
}

export function MatchweekFixtures({
  matches,
  caption,
}: MatchweekFixturesProps) {
  if (matches.length === 0) {
    return (
      <div className="rounded-xl border border-border/60 bg-card overflow-hidden shadow-sm px-6 py-8">
        <p className="text-muted-foreground text-sm text-center">
          No fixtures for this matchweek
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border/60 bg-card overflow-hidden shadow-sm">
      <Table>
        {caption && (
          <TableCaption className="mb-4 text-muted-foreground text-xs sm:text-sm">
            {caption}
          </TableCaption>
        )}
        <TableHeader>
          <TableRow className="border-b border-border/60 hover:bg-transparent">
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">
              Date
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground min-w-[100px]">
              Home
            </TableHead>
            <TableHead className="w-16 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Score
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground min-w-[100px] text-right">
              Away
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map((m, index) => (
            <TableRow
              key={`${m.Date}-${m.HomeTeam}-${m.AwayTeam}-${index}`}
              className="border-b border-border/40 transition-colors hover:bg-muted/30"
            >
              <TableCell className="text-muted-foreground text-sm hidden sm:table-cell py-3">
                {formatMatchDate(m.Date)}
              </TableCell>
              <TableCell className="font-medium text-sm text-foreground py-3">
                {m.HomeTeam}
              </TableCell>
              <TableCell className="text-center font-semibold text-sm text-foreground py-3">
                {m.FTHG} – {m.FTAG}
              </TableCell>
              <TableCell className="font-medium text-sm text-foreground text-right py-3">
                {m.AwayTeam}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
