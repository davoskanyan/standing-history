import type { MetadataRoute } from "next";

import { getAllDatasets } from "@/entities/dataset/registry";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://standinghistory.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const datasets = getAllDatasets();

  const leaguePages: MetadataRoute.Sitemap = datasets.flatMap((d) =>
    d.matchweekDates.map((_, i) => {
      const week = i + 1;
      const isLastWeek = week === d.matchweekDates.length;
      return {
        url: `${BASE_URL}/league/${d.slug}/matchweek/${week}`,
        lastModified: new Date(),
        changeFrequency: "yearly" as const,
        priority: isLastWeek ? 0.8 : 0.5,
      };
    })
  );

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...leaguePages,
  ];
}
