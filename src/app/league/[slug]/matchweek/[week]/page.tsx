import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDataset } from "@/entities/dataset/registry";
import { MatchweekFixtures } from "@/entities/matchweek-fixtures";
import { StandingTable } from "@/entities/standing-table";
import {
  computeStandings,
  getMatchesForMatchweek,
} from "@/shared/lib/standings";
import { MatchweekPickerRouted } from "./MatchweekPickerRouted";

export const dynamicParams = true;
export const revalidate = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; week: string }>;
}): Promise<Metadata> {
  const { slug, week: weekParam } = await params;
  const dataset = getDataset(slug);
  if (!dataset) return {};

  const week = parseInt(weekParam, 10);
  const maxWeek = dataset.matchweekDates.length;
  if (Number.isNaN(week) || week < 1 || week > maxWeek) return {};

  const title = `${dataset.label} – Matchweek ${week}`;
  const description = `${dataset.label} league table and matchweek results after Matchweek ${week} of ${maxWeek}. Full standings with points, wins, draws, losses, goal difference, and recent form.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/league/${slug}/matchweek/${week}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LeagueMatchweekPage({
  params,
}: {
  params: Promise<{ slug: string; week: string }>;
}) {
  const { slug, week: weekParam } = await params;
  const dataset = getDataset(slug);

  if (!dataset) {
    notFound();
  }

  const { label, matches, matchweekDates } = dataset;
  const weeks = matchweekDates.map((_, i) => i + 1);
  const minWeek = 1;
  const maxWeek = matchweekDates.length;

  const week = (() => {
    const n = parseInt(weekParam, 10);
    if (Number.isNaN(n) || n < minWeek || n > maxWeek) return null;
    return n;
  })();

  if (week === null) {
    notFound();
  }

  const rows = computeStandings(matches, matchweekDates, week);
  const fixtureMatches = getMatchesForMatchweek(matches, matchweekDates, week);
  const basePath = `/league/${slug}`;

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
            League standings
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {label}
          </h1>
        </div>
        <MatchweekPickerRouted
          basePath={basePath}
          weeks={weeks}
          value={week}
          placeholder="Select matchweek"
        />
      </div>
      <div className="rounded-xl border border-border/60 bg-card overflow-hidden shadow-sm">
        <StandingTable
          caption={`Standings after Matchweek ${week} of ${maxWeek}`}
          rows={rows}
        />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
          Matchweek {week} results
        </p>
        <MatchweekFixtures
          matches={fixtureMatches}
          caption={`Fixtures and results for Matchweek ${week}`}
        />
      </div>
    </main>
  );
}
