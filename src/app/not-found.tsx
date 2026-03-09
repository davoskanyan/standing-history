import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-semibold text-muted-foreground mb-8">
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
        404 — Page not found
      </div>

      <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl mb-4">
        <span className="text-primary">Off</span>side.
      </h1>

      <p className="max-w-md text-base text-muted-foreground sm:text-lg mb-10">
        That page doesn&apos;t exist or the season data you&apos;re looking for
        hasn&apos;t been added yet.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/30 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        ← Back to all leagues
      </Link>
    </main>
  );
}
