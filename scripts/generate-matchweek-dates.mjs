import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "../src/entities/dataset/data");

const LEAGUES = [
  "2024-LaLiga",
  "2024-PremierLeague",
  "2024-SerieA",
  "2024-Bundesliga",
  "2024-Ligue1",
];

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

for (const name of LEAGUES) {
  const inputPath = path.join(dataDir, `${name}.json`);
  const outputPath = path.join(dataDir, `${name}-dates.json`);
  const raw = fs.readFileSync(inputPath, "utf8");
  const matches = JSON.parse(raw);
  const dates = deriveMatchweekDates(matches);
  fs.writeFileSync(outputPath, JSON.stringify(dates) + "\n", "utf8");
  console.log(`Wrote ${name}-dates.json (${dates.length} matchweeks)`);
}
