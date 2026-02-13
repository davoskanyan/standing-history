import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

const standings = [
  {
    position: 1,
    team: "Manchester City",
    played: 38,
    won: 28,
    drawn: 5,
    lost: 5,
    goalsFor: 96,
    goalsAgainst: 35,
    goalDifference: 61,
    points: 89,
    form: ["W", "W", "W", "W", "W"],
  },
  {
    position: 2,
    team: "Arsenal",
    played: 38,
    won: 26,
    drawn: 6,
    lost: 6,
    goalsFor: 88,
    goalsAgainst: 43,
    goalDifference: 45,
    points: 84,
    form: ["W", "W", "W", "D", "W"],
  },
  {
    position: 3,
    team: "Liverpool",
    played: 38,
    won: 25,
    drawn: 8,
    lost: 5,
    goalsFor: 86,
    goalsAgainst: 41,
    goalDifference: 45,
    points: 83,
    form: ["W", "D", "W", "W", "L"],
  },
  {
    position: 4,
    team: "Aston Villa",
    played: 38,
    won: 20,
    drawn: 8,
    lost: 10,
    goalsFor: 76,
    goalsAgainst: 61,
    goalDifference: 15,
    points: 68,
    form: ["W", "L", "W", "D", "W"],
  },
  {
    position: 5,
    team: "Tottenham",
    played: 38,
    won: 20,
    drawn: 6,
    lost: 12,
    goalsFor: 74,
    goalsAgainst: 61,
    goalDifference: 13,
    points: 66,
    form: ["L", "W", "W", "L", "W"],
  },
  {
    position: 6,
    team: "Chelsea",
    played: 38,
    won: 18,
    drawn: 9,
    lost: 11,
    goalsFor: 77,
    goalsAgainst: 63,
    goalDifference: 14,
    points: 63,
    form: ["W", "D", "D", "W", "L"],
  },
  {
    position: 7,
    team: "Newcastle",
    played: 38,
    won: 18,
    drawn: 6,
    lost: 14,
    goalsFor: 85,
    goalsAgainst: 62,
    goalDifference: 23,
    points: 60,
    form: ["W", "W", "L", "W", "D"],
  },
  {
    position: 8,
    team: "Manchester United",
    played: 38,
    won: 18,
    drawn: 6,
    lost: 14,
    goalsFor: 57,
    goalsAgainst: 58,
    goalDifference: -1,
    points: 60,
    form: ["D", "L", "W", "W", "L"],
  },
  {
    position: 9,
    team: "West Ham",
    played: 38,
    won: 14,
    drawn: 10,
    lost: 14,
    goalsFor: 60,
    goalsAgainst: 74,
    goalDifference: -14,
    points: 52,
    form: ["L", "D", "W", "L", "D"],
  },
  {
    position: 10,
    team: "Crystal Palace",
    played: 38,
    won: 13,
    drawn: 10,
    lost: 15,
    goalsFor: 57,
    goalsAgainst: 58,
    goalDifference: -1,
    points: 49,
    form: ["D", "W", "L", "D", "W"],
  },
  {
    position: 11,
    team: "Brighton",
    played: 38,
    won: 12,
    drawn: 12,
    lost: 14,
    goalsFor: 55,
    goalsAgainst: 62,
    goalDifference: -7,
    points: 48,
    form: ["D", "D", "L", "W", "D"],
  },
  {
    position: 12,
    team: "Bournemouth",
    played: 38,
    won: 13,
    drawn: 9,
    lost: 16,
    goalsFor: 54,
    goalsAgainst: 67,
    goalDifference: -13,
    points: 48,
    form: ["W", "L", "D", "L", "W"],
  },
  {
    position: 13,
    team: "Fulham",
    played: 38,
    won: 13,
    drawn: 8,
    lost: 17,
    goalsFor: 55,
    goalsAgainst: 61,
    goalDifference: -6,
    points: 47,
    form: ["L", "W", "L", "D", "L"],
  },
  {
    position: 14,
    team: "Wolves",
    played: 38,
    won: 13,
    drawn: 7,
    lost: 18,
    goalsFor: 50,
    goalsAgainst: 65,
    goalDifference: -15,
    points: 46,
    form: ["L", "L", "W", "L", "D"],
  },
  {
    position: 15,
    team: "Everton",
    played: 38,
    won: 13,
    drawn: 9,
    lost: 16,
    goalsFor: 40,
    goalsAgainst: 51,
    goalDifference: -11,
    points: 40,
    form: ["D", "L", "D", "W", "L"],
  },
  {
    position: 16,
    team: "Brentford",
    played: 38,
    won: 10,
    drawn: 9,
    lost: 19,
    goalsFor: 56,
    goalsAgainst: 65,
    goalDifference: -9,
    points: 39,
    form: ["L", "D", "L", "L", "D"],
  },
  {
    position: 17,
    team: "Nottingham Forest",
    played: 38,
    won: 9,
    drawn: 9,
    lost: 20,
    goalsFor: 49,
    goalsAgainst: 67,
    goalDifference: -18,
    points: 32,
    form: ["L", "D", "L", "L", "W"],
  },
  {
    position: 18,
    team: "Luton Town",
    played: 38,
    won: 6,
    drawn: 8,
    lost: 24,
    goalsFor: 52,
    goalsAgainst: 85,
    goalDifference: -33,
    points: 26,
    form: ["L", "L", "D", "L", "L"],
  },
  {
    position: 19,
    team: "Burnley",
    played: 38,
    won: 5,
    drawn: 9,
    lost: 24,
    goalsFor: 41,
    goalsAgainst: 78,
    goalDifference: -37,
    points: 24,
    form: ["L", "D", "L", "L", "L"],
  },
  {
    position: 20,
    team: "Sheffield United",
    played: 38,
    won: 3,
    drawn: 7,
    lost: 28,
    goalsFor: 35,
    goalsAgainst: 104,
    goalDifference: -69,
    points: 16,
    form: ["L", "L", "L", "D", "L"],
  },
];

export function StandingTable() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto py-6 sm:py-12 px-3 sm:px-4 max-w-7xl">
        <div className="bg-card rounded-xl shadow-lg border border-border/50 overflow-hidden">
          <div className="overflow-x-auto -mx-3 sm:mx-0">
            <Table>
              <TableCaption className="mb-4 text-muted-foreground text-xs sm:text-sm">
                2023-24 Premier League Season - Final Standings
              </TableCaption>
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
                {standings.map((team) => (
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
                      {team.goalDifference > 0 ? "+" : ""}
                      {team.goalDifference}
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
          </div>
        </div>
      </div>
    </div>
  );
}
