import Link from "next/link";

import {
  getDatasetsGroupedByLeague,
  type LeagueGroup,
} from "@/entities/dataset/group-by-league";
import { getAllDatasets } from "@/entities/dataset/registry";

const TOP_LEAGUES_COUNT = 5;

const LEAGUE_FLAGS: Record<string, string> = {
  "Premier League": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  Championship: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  "League One": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  "League Two": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  Conference: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  "La Liga": "🇪🇸",
  "La Liga 2": "🇪🇸",
  Bundesliga: "🇩🇪",
  "2. Bundesliga": "🇩🇪",
  "Ligue 1": "🇫🇷",
  "Ligue 2": "🇫🇷",
  "Serie A": "🇮🇹",
  "Serie B": "🇮🇹",
  Eredivisie: "🇳🇱",
  "Belgian Pro League": "🇧🇪",
  "Primeira Liga": "🇵🇹",
  "Süper Lig": "🇹🇷",
  "Super League Greece": "🇬🇷",
  "Scottish Premiership": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "Scottish Championship": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "Scottish League One": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "Scottish League Two": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
};

function SeasonChip({
  slug,
  label,
  weekCount,
  leagueLabel,
}: {
  slug: string;
  label: string;
  weekCount: number;
  leagueLabel: string;
}) {
  const season = label.match(/\d{4}\/\d{2}$/)?.[0] ?? label;
  return (
    <Link
      href={`/league/${slug}/matchweek/${weekCount}`}
      className="inline-flex items-center rounded-full border border-border/60 bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:bg-primary/15 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      title={`${leagueLabel} ${season}`}
    >
      {season}
    </Link>
  );
}

function LeagueCard({
  group,
  featured,
}: {
  group: LeagueGroup;
  featured?: boolean;
}) {
  const flag = LEAGUE_FLAGS[group.leagueLabel] ?? "🌍";
  const latestSeason = group.seasons[0];

  return (
    <article
      className={
        featured
          ? "group relative overflow-hidden rounded-xl border border-border/60 bg-card p-5 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 sm:p-6"
          : "group relative overflow-hidden rounded-xl border border-border/50 bg-card/70 p-4 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 sm:p-5"
      }
    >
      {featured && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}

      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span
            className={featured ? "text-2xl" : "text-xl"}
            aria-hidden="true"
          >
            {flag}
          </span>
          <div>
            <h2
              className={
                featured
                  ? "text-base font-bold tracking-tight text-foreground"
                  : "text-sm font-semibold text-foreground"
              }
            >
              {group.leagueLabel}
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {group.seasons.length} season
              {group.seasons.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        {latestSeason && (
          <Link
            href={`/league/${latestSeason.slug}/matchweek/${latestSeason.matchweekDates.length}`}
            className="shrink-0 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
          >
            Latest →
          </Link>
        )}
      </div>

      <ul className="flex flex-wrap gap-1.5">
        {group.seasons.map((d) => (
          <li key={d.slug}>
            <SeasonChip
              slug={d.slug}
              label={d.label}
              weekCount={d.matchweekDates.length}
              leagueLabel={group.leagueLabel}
            />
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Home() {
  const datasets = getAllDatasets();
  const groups = getDatasetsGroupedByLeague(datasets);
  const topLeagues = groups.slice(0, TOP_LEAGUES_COUNT);
  const restLeagues = groups.slice(TOP_LEAGUES_COUNT);

  const totalSeasons = groups.reduce((acc, g) => acc + g.seasons.length, 0);
  const totalMatchweeks = groups.reduce(
    (acc, g) =>
      acc + g.seasons.reduce((a, s) => a + s.matchweekDates.length, 0),
    0
  );

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5"
          aria-hidden="true"
        />

        <div className="container relative mx-auto max-w-5xl px-4 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Football standings archive
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Standing
            <span className="text-primary"> History</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Replay any matchweek from any season across Europe&apos;s top
            leagues. Pick a competition, choose a season, and travel through
            time.
          </p>

          <div className="mt-8 flex flex-wrap gap-6 sm:gap-10">
            <div>
              <div className="text-2xl font-bold text-foreground sm:text-3xl">
                {groups.length}
              </div>
              <div className="mt-0.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Leagues
              </div>
            </div>
            <div className="w-px bg-border/60" aria-hidden="true" />
            <div>
              <div className="text-2xl font-bold text-foreground sm:text-3xl">
                {totalSeasons}
              </div>
              <div className="mt-0.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Seasons
              </div>
            </div>
            <div className="w-px bg-border/60" aria-hidden="true" />
            <div>
              <div className="text-2xl font-bold text-foreground sm:text-3xl">
                {totalMatchweeks.toLocaleString()}
              </div>
              <div className="mt-0.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Matchweeks
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top leagues */}
      <section className="container mx-auto max-w-5xl px-4 py-10">
        <div className="mb-5 flex items-center gap-3">
          <div className="h-4 w-1 rounded-full bg-primary" aria-hidden="true" />
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Top leagues
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topLeagues.map((group) => (
            <LeagueCard key={group.leagueKey} group={group} featured />
          ))}
        </div>
      </section>

      {/* More leagues */}
      {restLeagues.length > 0 && (
        <section className="container mx-auto max-w-5xl px-4 pb-20 pt-2">
          <div className="mb-5 flex items-center gap-3">
            <div
              className="h-4 w-1 rounded-full bg-muted-foreground/40"
              aria-hidden="true"
            />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              More leagues
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {restLeagues.map((group) => (
              <LeagueCard key={group.leagueKey} group={group} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
