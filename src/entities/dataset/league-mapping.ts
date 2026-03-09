/**
 * Maps football-data.co.uk division codes (CSV filename / Div column) to human-readable
 * labels and URL slug prefixes. Used for registry generation and display.
 */
export const LEAGUE_MAPPING: Record<
  string,
  { label: string; slugPrefix: string }
> = {
  E0: { label: "Premier League", slugPrefix: "premier-league" },
  E1: { label: "Championship", slugPrefix: "championship" },
  E2: { label: "League One", slugPrefix: "league-one" },
  E3: { label: "League Two", slugPrefix: "league-two" },
  EC: { label: "Conference", slugPrefix: "conference" },
  SP1: { label: "La Liga", slugPrefix: "la-liga" },
  SP2: { label: "La Liga 2", slugPrefix: "la-liga-2" },
  D1: { label: "Bundesliga", slugPrefix: "bundesliga" },
  D2: { label: "2. Bundesliga", slugPrefix: "2-bundesliga" },
  F1: { label: "Ligue 1", slugPrefix: "ligue-1" },
  F2: { label: "Ligue 2", slugPrefix: "ligue-2" },
  I1: { label: "Serie A", slugPrefix: "serie-a" },
  I2: { label: "Serie B", slugPrefix: "serie-b" },
  N1: { label: "Eredivisie", slugPrefix: "eredivisie" },
  B1: { label: "Belgian Pro League", slugPrefix: "belgian-pro-league" },
  P1: { label: "Primeira Liga", slugPrefix: "primeira-liga" },
  T1: { label: "Süper Lig", slugPrefix: "super-lig" },
  G1: { label: "Super League Greece", slugPrefix: "super-league-greece" },
  SC0: { label: "Scottish Premiership", slugPrefix: "scottish-premiership" },
  SC1: { label: "Scottish Championship", slugPrefix: "scottish-championship" },
  SC2: { label: "Scottish League One", slugPrefix: "scottish-league-one" },
  SC3: { label: "Scottish League Two", slugPrefix: "scottish-league-two" },
};

export function getLeagueLabel(divCode: string): string {
  return LEAGUE_MAPPING[divCode]?.label ?? divCode;
}

export function getLeagueSlugPrefix(divCode: string): string {
  return LEAGUE_MAPPING[divCode]?.slugPrefix ?? divCode.toLowerCase();
}

/**
 * Build slug and label for a season (e.g. year 2020 -> "Premier League 2020/21").
 */
export function getSeasonSlugAndLabel(
  divCode: string,
  year: string
): { slug: string; label: string } {
  const mapping = LEAGUE_MAPPING[divCode];
  const slugPrefix = mapping?.slugPrefix ?? divCode.toLowerCase();
  const leagueLabel = mapping?.label ?? divCode;
  const slug = `${slugPrefix}-${year}`;
  const nextYear = String(parseInt(year, 10) + 1).slice(-2);
  const label = `${leagueLabel} ${year}/${nextYear}`;
  return { slug, label };
}
