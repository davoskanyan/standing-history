import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Standing History",
    short_name: "StandingHistory",
    description:
      "Football standings archive across Europe's top leagues. Replay any matchweek from any season.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a1628",
    theme_color: "#16a34a",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    categories: ["sports", "entertainment"],
    lang: "en",
    dir: "ltr",
  };
}
