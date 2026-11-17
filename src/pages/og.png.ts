import type { APIRoute } from "astro";
import { renderOgCard } from "@/utils/ogCard";
import config from "@/config";

// jamescscott.net: site-wide social preview, styled in src/utils/ogCard.ts.
export const GET: APIRoute = async context =>
  renderOgCard({
    eyebrow: "Software engineer",
    title: config.site.title,
    subtitle: "I build the platforms and tools other engineers rely on.",
    url: context.url,
  });
