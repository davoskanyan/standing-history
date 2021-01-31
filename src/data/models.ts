export interface GameJSON {
  homeTeam: string;
  awayTeam: string;
  date: string;
  homeTeamGoals: number;
  awayTeamGoals: number;
  result: 'H' | 'A' | 'D';
}

export type MatchweekStandings = Record<string, StandingRow>;

export interface StandingRow {
  index?: number;
  name: string;
  win: number;
  draw: number;
  loss: number;
  scored: number;
  received: number;
  points: number;
}
