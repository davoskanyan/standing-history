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
        <TableRow className="border-b-2 hover:bg-transparent">
          <TableHead className="w-12 sm:w-16 text-center font-semibold text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">
            Pos
          </TableHead>
          <TableHead className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-muted-foreground min-w-[140px] sm:min-w-0">
            Team
          </TableHead>
          <TableHead className="text-center font-semibold text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">
            P
          </TableHead>
          <TableHead className="text-center font-semibold text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">
            W
          </TableHead>
          <TableHead className="text-center font-semibold text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">
            D
          </TableHead>
          <TableHead className="text-center font-semibold text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">
            L
          </TableHead>
          <TableHead className="text-center font-semibold text-xs sm:text-sm uppercase tracking-wider text-muted-foreground hidden md:table-cell">
            G
          </TableHead>
          <TableHead className="text-center font-semibold text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">
            GD
          </TableHead>
          <TableHead className="text-center font-semibold text-xs sm:text-sm uppercase tracking-wider text-muted-foreground hidden sm:table-cell">
            Form
          </TableHead>
          <TableHead className="text-center font-bold text-xs sm:text-sm uppercase tracking-wider">
            Pts
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((team) => (
          <TableRow
            key={team.position}
            className="hover:bg-muted/50 transition-colors border-b"
          >
            <TableCell className="text-center">
              <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-md font-semibold text-xs sm:text-sm bg-muted text-muted-foreground">
                {team.position}
              </span>
            </TableCell>
            <TableCell className="font-semibold text-sm sm:text-base py-3 sm:py-4">
              {team.team}
            </TableCell>
            <TableCell className="text-center font-medium text-muted-foreground text-sm">
              {team.played}
            </TableCell>
            <TableCell className="text-center font-medium text-sm">
              {team.won}
            </TableCell>
            <TableCell className="text-center font-medium text-sm">
              {team.drawn}
            </TableCell>
            <TableCell className="text-center font-medium text-sm">
              {team.lost}
            </TableCell>
            <TableCell className="text-center font-medium text-sm hidden md:table-cell">
              {team.goalsFor}:{team.goalsAgainst}
            </TableCell>
            <TableCell className="text-center font-semibold text-sm">
              {team.goalsFor - team.goalsAgainst > 0 ? "+" : ""}
              {team.goalsFor - team.goalsAgainst}
            </TableCell>
            <TableCell className="text-center hidden sm:table-cell">
              <div className="flex gap-1 sm:gap-1.5 justify-center">
                {team.form.map((result, index) => (
                  <span
                    key={index}
                    className={`w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-sm transition-transform hover:scale-110 ${
                      result === "W"
                        ? "bg-green-500 text-white dark:bg-green-600"
                        : result === "D"
                          ? "bg-slate-400 text-white dark:bg-slate-500"
                          : "bg-red-500 text-white dark:bg-red-600"
                    }`}
                  >
                    {result}
                  </span>
                ))}
              </div>
            </TableCell>
            <TableCell className="text-center">
              <span className="inline-flex items-center justify-center min-w-[2.5rem] sm:min-w-[3rem] px-2 sm:px-3 py-1 sm:py-1.5 rounded-md bg-primary/10 text-primary font-bold text-sm sm:text-base">
                {team.points}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
