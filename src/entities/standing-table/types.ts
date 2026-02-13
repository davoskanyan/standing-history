export type StandingTableFormResult = "W" | "D" | "L";

export interface StandingTableRow {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  form: StandingTableFormResult[];
}
