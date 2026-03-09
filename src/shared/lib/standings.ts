import type {
  StandingTableFormResult,
  StandingTableRow,
} from "@/entities/standing-table/types";

export interface MatchRow {
  Date: string;
  HomeTeam: string;
  AwayTeam: string;
  FTHG: number;
  FTAG: number;
  FTR: string;
}

function parseDateKey(d: string): number {
  const [day, month, year] = d.split("/").map(Number);
  return year * 10000 + month * 100 + day;
}

export function getMatchweek(
  matchDate: string,
  matchweekDates: string[]
): number {
  const key = parseDateKey(matchDate);
  for (let i = 0; i < matchweekDates.length; i++) {
    if (key <= parseDateKey(matchweekDates[i])) return i + 1;
  }
  return matchweekDates.length;
}

export function deriveMatchweekDates(matches: MatchRow[]): string[] {
  const byDate = [...matches].sort(
    (a, b) => parseDateKey(a.Date) - parseDateKey(b.Date)
  );
  const teams = new Set<string>();
  for (const m of byDate) {
    teams.add(m.HomeTeam);
    teams.add(m.AwayTeam);
  }
  const numTeams = teams.size;
  const matchesPerRound = numTeams / 2;
  const dates: string[] = [];
  for (let i = 0; i < byDate.length; i += matchesPerRound) {
    const round = byDate.slice(i, i + matchesPerRound);
    const lastMatch = round[round.length - 1];
    if (lastMatch) dates.push(lastMatch.Date);
  }
  return dates;
}

export function computeStandings(
  matches: MatchRow[],
  matchweekDates: string[],
  upToMatchweek: number
): StandingTableRow[] {
  const byDate = [...matches].sort(
    (a, b) => parseDateKey(a.Date) - parseDateKey(b.Date)
  );
  const included = byDate.filter(
    (m) => getMatchweek(m.Date, matchweekDates) <= upToMatchweek
  );

  const teamStats: Record<
    string,
    {
      won: number;
      drawn: number;
      lost: number;
      goalsFor: number;
      goalsAgainst: number;
      results: StandingTableFormResult[];
    }
  > = {};

  for (const m of included) {
    const home = m.HomeTeam;
    const away = m.AwayTeam;
    if (!teamStats[home])
      teamStats[home] = {
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        results: [],
      };
    if (!teamStats[away])
      teamStats[away] = {
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        results: [],
      };

    teamStats[home].goalsFor += m.FTHG;
    teamStats[home].goalsAgainst += m.FTAG;
    teamStats[away].goalsFor += m.FTAG;
    teamStats[away].goalsAgainst += m.FTHG;

    if (m.FTR === "H") {
      teamStats[home].won++;
      teamStats[home].results.push("W");
      teamStats[away].lost++;
      teamStats[away].results.push("L");
    } else if (m.FTR === "A") {
      teamStats[away].won++;
      teamStats[away].results.push("W");
      teamStats[home].lost++;
      teamStats[home].results.push("L");
    } else {
      teamStats[home].drawn++;
      teamStats[home].results.push("D");
      teamStats[away].drawn++;
      teamStats[away].results.push("D");
    }
  }

  const rows: StandingTableRow[] = Object.entries(teamStats).map(
    ([team, s]) => ({
      position: 0,
      team,
      played: s.won + s.drawn + s.lost,
      won: s.won,
      drawn: s.drawn,
      lost: s.lost,
      goalsFor: s.goalsFor,
      goalsAgainst: s.goalsAgainst,
      points: s.won * 3 + s.drawn,
      form: s.results.slice(-5),
    })
  );

  rows.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const gdA = a.goalsFor - a.goalsAgainst;
    const gdB = b.goalsFor - b.goalsAgainst;
    return gdB - gdA;
  });

  rows.forEach((r, i) => {
    r.position = i + 1;
  });

  return rows;
}
