import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { getPostSlug } from "@/utils/getPostPaths";
import { postFilter } from "@/utils/postFilter";
import { renderOgCard } from "@/utils/ogCard";
import { series } from "@/data/series";
import config from "@/config";

export async function getStaticPaths() {
  if (!config.features.dynamicOgImage) {
    return [];
  }

  const posts = await getCollection("posts").then(p =>
    p.filter(post => postFilter(post) && !post.data.ogImage)
  );

  return posts.map(post => ({
    params: { slug: getPostSlug(post.id, post.filePath) },
    props: post,
  }));
}

// jamescscott.net: per-post social preview, styled in src/utils/ogCard.ts.
export const GET: APIRoute = async ({ props, url }) => {
  if (!config.features.dynamicOgImage) {
    return new Response(null, { status: 404, statusText: "Not found" });
  }

  const post = props as CollectionEntry<"posts">;
  const { title, tags, series: seriesKey, seriesPart } = post.data;
  const eyebrow =
    seriesKey && series[seriesKey] && seriesPart
      ? `${series[seriesKey].title} · Part ${seriesPart}`
      : tags.map(t => `#${t}`).slice(0, 3).join("  ");

  return renderOgCard({ eyebrow, title, url });
};
