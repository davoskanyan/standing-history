import type { DatasetEntry } from "./registry";

const SLUG_KEY_ALIASES: Record<string, string> = {
  ligue1: "ligue-1",
};

/** Order for "top" leagues; others follow alphabetically by league label. */
const LEAGUE_PRIORITY: string[] = [
  "premier-league",
  "la-liga",
  "serie-a",
  "bundesliga",
  "ligue-1",
  "championship",
  "eredivisie",
  "primeira-liga",
  "2-bundesliga",
  "la-liga-2",
  "serie-b",
  "ligue-2",
  "scottish-premiership",
  "super-lig",
  "belgian-pro-league",
  "league-one",
  "league-two",
  "scottish-championship",
  "conference",
  "super-league-greece",
  "scottish-league-one",
  "scottish-league-two",
];

function getLeagueKey(slug: string): string {
  const match = slug.match(/^(.+?)-(19|20\d{2})$/);
  return match ? match[1] : slug;
}

function normalizeLeagueKey(key: string): string {
  return SLUG_KEY_ALIASES[key] ?? key;
}

function seasonSortKey(slug: string): number {
  const match = slug.match(/-(\d{4})$/);
  if (match) return parseInt(match[1], 10);
  const short = slug.match(/-(\d{2})(\d{2})$/);
  if (short) return parseInt(short[1] + short[2], 10);
  return 0;
}

function leagueLabelFromDatasets(seasons: DatasetEntry[]): string {
  const label = seasons[0]?.label ?? "";
  return label.replace(/\s*\d{4}\/\d{2}$/, "").trim();
}

export interface LeagueGroup {
  leagueKey: string;
  leagueLabel: string;
  seasons: DatasetEntry[];
}

export function getDatasetsGroupedByLeague(
  datasets: DatasetEntry[]
): LeagueGroup[] {
  const byKey = new Map<string, DatasetEntry[]>();

  for (const d of datasets) {
    const raw = getLeagueKey(d.slug);
    const key = normalizeLeagueKey(raw);
    const list = byKey.get(key) ?? [];
    list.push(d);
    byKey.set(key, list);
  }

  const groups: LeagueGroup[] = [];
  for (const [leagueKey, seasons] of byKey) {
    seasons.sort((a, b) => seasonSortKey(b.slug) - seasonSortKey(a.slug));
    groups.push({
      leagueKey,
      leagueLabel: leagueLabelFromDatasets(seasons),
      seasons,
    });
  }

  const priorityIndex = (key: string) => {
    const i = LEAGUE_PRIORITY.indexOf(key);
    return i === -1 ? LEAGUE_PRIORITY.length : i;
  };
  groups.sort((a, b) => {
    const pa = priorityIndex(a.leagueKey);
    const pb = priorityIndex(b.leagueKey);
    if (pa !== pb) return pa - pb;
    return a.leagueLabel.localeCompare(b.leagueLabel);
  });

  return groups;
}
