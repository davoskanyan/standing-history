# Standing History

A football standings archive that lets you replay any matchweek from any season across Europe’s top leagues. Pick a competition, choose a season, and browse historical league tables.

## Features

### Browsing & navigation

- **Home page** — Hero with total counts (leagues, seasons, matchweeks), “Top leagues” and “More leagues” sections with league cards.
- **League cards** — Each league shows a flag, name, season count, “Latest” link to the most recent matchweek, and season chips (e.g. 2020/21) that link to that season’s final standings.
- **Sticky header** — Logo, app name, and “Leagues” nav link; active state and focus styles.
- **404 page** — Custom “Offside” message with a link back to all leagues.

### League standings

- **Per-season, per-matchweek pages** — URL pattern `/league/[slug]/matchweek/[week]` (e.g. Premier League 2023/24, Matchweek 19).
- **Standings table** — Position (#), Team, P (played), W, D, L, GF:GA (goals for/against, hidden on small screens), GD (goal difference with color: green positive, red negative), Form (last 5 results as W/D/L pills, hidden on very small screens), Pts (points). Sorted by points then goal difference.
- **Matchweek picker** — Previous/Next buttons plus a select dropdown to jump to any matchweek; updates the URL and table without full reload.
- **Matchweek fixtures and results** — Each matchweek page shows a “Matchweek N results” section below the standings: all fixtures for that week in a table (date, home team, score, away team), sorted by date. Empty state when there are no fixtures.

### Data & leagues

- **Multiple leagues** — Premier League, Championship, League One, League Two, Conference (England); La Liga, La Liga 2 (Spain); Bundesliga, 2. Bundesliga (Germany); Ligue 1, Ligue 2 (France); Serie A, Serie B (Italy); Eredivisie (Netherlands); Belgian Pro League; Primeira Liga (Portugal); Süper Lig (Turkey); Super League Greece; Scottish Premiership, Championship, League One, League Two.
- **Many seasons per league** — Historical data by season; “Latest” and season chips for quick access.
- **Matchweek-based standings** — Standings computed up to the selected matchweek from match results (3 pts win, 1 draw, 0 loss; tie-break by goal difference).
- **Data source** — [football-data.co.uk](https://www.football-data.co.uk/downloadm.php); CSV data is processed into JSON (see `registry.generated.ts` and dataset entities).

### SEO & sharing

- **Metadata** — Title template “%s | Standing History”, description, keywords, Open Graph and Twitter card tags.
- **Dynamic per-page metadata** — League + “Matchweek N” titles and descriptions for standings pages.
- **Sitemap** — `sitemap.xml` with homepage and all league/matchweek URLs; final matchweek of each season has higher priority.
- **Robots** — `robots.txt` allows indexing and points to the sitemap.
- **Open Graph image** — Dynamic OG image (1200×630) with branding and league pills for social sharing.

### PWA & accessibility

- **Web app manifest** — Name, short name, description, theme/background colors, icon, categories (sports, entertainment), standalone display.
- **Dark theme** — System dark color scheme and green primary theme.
- **Semantic HTML & ARIA** — Table captions, nav labels, button labels (e.g. “Previous matchweek”, “Next matchweek”), focus-visible rings.

### Tech

- **Next.js App Router** — Server components for data, client components for matchweek picker and header.
- **Static-friendly data** — Datasets loaded from generated registry; `generateMetadata` and page components use `getDataset(slug)` and `computeStandings()`.
- **Responsive layout** — Container max-widths, responsive grid for league cards, table column visibility (GF:GA, Form) toggled by breakpoint.
