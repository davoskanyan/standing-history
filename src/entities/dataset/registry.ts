import type { MatchRow } from "@/shared/lib/standings";

import { datasets as generatedDatasets } from "./registry.generated";

export interface DatasetEntry {
  slug: string;
  label: string;
  matches: MatchRow[];
  matchweekDates: string[];
}

const datasets: DatasetEntry[] = [...generatedDatasets];

export function getDataset(slug: string): DatasetEntry | undefined {
  return datasets.find((d) => d.slug === slug);
}

export function getAllDatasets(): DatasetEntry[] {
  return datasets;
}
