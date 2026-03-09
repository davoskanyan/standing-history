import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length === 0) return [];
  const headers = lines[0].split(",").map((h) => h.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    const row = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = values[j] !== undefined ? values[j].trim() : "";
    }
    rows.push(row);
  }
  return rows;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "../src/entities/dataset/data");
const entityDir = path.join(__dirname, "../src/entities/dataset");

const YEAR_FOLDERS = ["2020", "2021", "2022", "2023", "2024", "2025"];

// Must match src/entities/dataset/league-mapping.ts (used for registry generation only)
const LEAGUE_MAPPING = {
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

function getSeasonSlugAndLabel(divCode, year) {
  const mapping = LEAGUE_MAPPING[divCode];
  const slugPrefix = mapping?.slugPrefix ?? divCode.toLowerCase();
  const leagueLabel = mapping?.label ?? divCode;
  const slug = `${slugPrefix}-${year}`;
  const nextYear = String(parseInt(year, 10) + 1).slice(-2);
  const label = `${leagueLabel} ${year}/${nextYear}`;
  return { slug, label };
}

function parseDateKey(d) {
  const [day, month, year] = d.split("/").map(Number);
  return year * 10000 + month * 100 + day;
}

function deriveMatchweekDates(matches) {
  const byDate = [...matches].sort(
    (a, b) => parseDateKey(a.Date) - parseDateKey(b.Date)
  );
  const teams = new Set();
  for (const m of byDate) {
    teams.add(m.HomeTeam);
    teams.add(m.AwayTeam);
  }
  const numTeams = teams.size;
  const matchesPerRound = numTeams / 2;
  const dates = [];
  for (let i = 0; i < byDate.length; i += matchesPerRound) {
    const round = byDate.slice(i, i + matchesPerRound);
    const lastMatch = round[round.length - 1];
    if (lastMatch) dates.push(lastMatch.Date);
  }
  return dates;
}

function castValue(value) {
  if (value === "" || value == null) return value;
  const n = Number(value);
  if (!Number.isNaN(n)) return n;
  return value;
}

function coerceRow(row) {
  const out = {};
  for (const [key, val] of Object.entries(row)) {
    out[key] = castValue(val);
  }
  return out;
}

const converted = [];

for (const year of YEAR_FOLDERS) {
  const yearDir = path.join(dataDir, year);
  if (!fs.existsSync(yearDir) || !fs.statSync(yearDir).isDirectory()) continue;

  const files = fs.readdirSync(yearDir).filter((f) => f.endsWith(".csv"));
  for (const file of files) {
    const divCode = path.basename(file, ".csv");
    const inputPath = path.join(yearDir, file);
    const csvText = fs.readFileSync(inputPath, "utf8");
    const rows = parseCsv(csvText);
    const matches = rows.map((row) => coerceRow(row));

    const outBase = `${year}-${divCode}`;
    const jsonPath = path.join(dataDir, `${outBase}.json`);
    const datesPath = path.join(dataDir, `${outBase}-dates.json`);

    const matchweekDates = deriveMatchweekDates(matches);

    fs.writeFileSync(jsonPath, JSON.stringify(matches, null, 0) + "\n", "utf8");
    fs.writeFileSync(
      datesPath,
      JSON.stringify(matchweekDates) + "\n",
      "utf8"
    );
    converted.push({ year, divCode, matchweekCount: matchweekDates.length });
    console.log(`Wrote ${outBase}.json and ${outBase}-dates.json (${matchweekDates.length} matchweeks)`);
  }
}

console.log(`\nConverted ${converted.length} CSV files.`);

// Generate registry.generated.ts
// require() is used instead of import to prevent TypeScript from inferring
// literal types from hundreds of large JSON files, which causes heap OOM.
const requireLines = [];
const entryLines = [];

for (const { year, divCode } of converted) {
  const safeId = `${year}_${divCode.replace(/[^A-Z0-9]/gi, "_")}`;
  const matchesId = `matches_${safeId}`;
  const datesId = `dates_${safeId}`;
  requireLines.push(
    `const ${matchesId} = require("./data/${year}-${divCode}.json") as MatchRow[];`,
    `const ${datesId} = require("./data/${year}-${divCode}-dates.json") as string[];`
  );
  const { slug, label } = getSeasonSlugAndLabel(divCode, year);
  entryLines.push(
    `  { slug: "${slug}", label: "${label.replace(/"/g, '\\"')}", matches: ${matchesId}, matchweekDates: ${datesId} },`
  );
}

const registryContent = `/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Generated by scripts/csv-to-json.mjs - do not edit by hand.
 */
import type { MatchRow } from "@/shared/lib/standings";

${requireLines.join("\n")}

export const datasets: { slug: string; label: string; matches: MatchRow[]; matchweekDates: string[] }[] = [
${entryLines.join("\n")}
];

export function getDataset(slug: string) {
  return datasets.find((d) => d.slug === slug);
}

export function getAllDatasets() {
  return datasets;
}
`;

const registryPath = path.join(entityDir, "registry.generated.ts");
fs.writeFileSync(registryPath, registryContent, "utf8");
console.log(`Wrote ${path.relative(path.join(__dirname, ".."), registryPath)}`);
