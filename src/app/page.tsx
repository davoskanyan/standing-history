import Link from "next/link";

import { getAllDatasets } from "@/entities/dataset/registry";

export default function Home() {
  const datasets = getAllDatasets();

  return (
    <main className="flex-1">
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto max-w-4xl px-4 py-12 sm:py-16">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Standing History
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground sm:text-lg">
            Browse league standings by matchweek. Pick a competition below to
            see the table at any point in the season.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-4xl px-4 py-8">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Leagues
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {datasets.map((d) => (
            <li key={d.slug}>
              <Link
                href={`/league/${d.slug}/matchweek/${d.matchweekDates.length}`}
                className="block rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="font-medium">{d.label}</span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {d.matchweekDates.length} matchweeks
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
