import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { StandingTableRow } from "./types";

interface StandingTableProps {
  caption?: string;
  rows: StandingTableRow[];
}

export function StandingTable({ caption, rows }: StandingTableProps) {
  return (
    <Table>
      {caption && (
        <TableCaption className="mb-4 text-muted-foreground text-xs sm:text-sm">
          {caption}
        </TableCaption>
      )}
      <TableHeader>
        <TableRow className="border-b border-border/60 hover:bg-transparent">
          <TableHead className="w-12 sm:w-14 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            #
          </TableHead>
          <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground min-w-[140px] sm:min-w-0">
            Team
          </TableHead>
          <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            P
          </TableHead>
          <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            W
          </TableHead>
          <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            D
          </TableHead>
          <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            L
          </TableHead>
          <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell">
            GF:GA
          </TableHead>
          <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            GD
          </TableHead>
          <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">
            Form
          </TableHead>
          <TableHead className="text-center text-xs font-bold uppercase tracking-wider text-primary">
            Pts
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((team) => (
          <TableRow
            key={team.position}
            className="border-b border-border/40 transition-colors hover:bg-muted/30"
          >
            <TableCell className="text-center py-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-md text-xs font-bold bg-muted/60 text-muted-foreground">
                {team.position}
              </span>
            </TableCell>
            <TableCell className="font-semibold text-sm sm:text-base py-3 sm:py-3.5 text-foreground">
              {team.team}
            </TableCell>
            <TableCell className="text-center font-medium text-muted-foreground text-sm">
              {team.played}
            </TableCell>
            <TableCell className="text-center font-semibold text-sm text-foreground">
              {team.won}
            </TableCell>
            <TableCell className="text-center font-medium text-sm text-muted-foreground">
              {team.drawn}
            </TableCell>
            <TableCell className="text-center font-medium text-sm text-muted-foreground">
              {team.lost}
            </TableCell>
            <TableCell className="text-center font-medium text-sm text-muted-foreground hidden md:table-cell">
              {team.goalsFor}:{team.goalsAgainst}
            </TableCell>
            <TableCell className="text-center font-semibold text-sm">
              <span
                className={
                  team.goalsFor - team.goalsAgainst > 0
                    ? "text-primary"
                    : team.goalsFor - team.goalsAgainst < 0
                      ? "text-destructive"
                      : "text-muted-foreground"
                }
              >
                {team.goalsFor - team.goalsAgainst > 0 ? "+" : ""}
                {team.goalsFor - team.goalsAgainst}
              </span>
            </TableCell>
            <TableCell className="text-center hidden sm:table-cell py-3">
              <div className="flex gap-1 justify-center">
                {team.form.map((result, index) => (
                  <span
                    key={index}
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-bold ${
                      result === "W"
                        ? "bg-primary/20 text-primary ring-1 ring-primary/30"
                        : result === "D"
                          ? "bg-muted text-muted-foreground"
                          : "bg-destructive/20 text-destructive ring-1 ring-destructive/30"
                    }`}
                  >
                    {result}
                  </span>
                ))}
              </div>
            </TableCell>
            <TableCell className="text-center py-3">
              <span className="inline-flex items-center justify-center min-w-[2.25rem] sm:min-w-[2.75rem] rounded-lg bg-primary/15 px-2 py-1 text-sm font-bold text-primary sm:text-base">
                {team.points}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
