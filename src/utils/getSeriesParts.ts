import { getCollection, type CollectionEntry } from "astro:content";
import { postFilter } from "./postFilter";
import { series as allSeries } from "@/data/series";

export type SeriesPart = {
  part: number;
  title: string;
  post?: CollectionEntry<"posts">;
};

/**
 * Every part of a series in order: published posts where they exist,
 * planned titles from src/data/series.ts for the rest.
 */
export async function getSeriesParts(key: string): Promise<SeriesPart[]> {
  const meta = allSeries[key];
  const posts = (
    await getCollection("posts", p => p.data.series === key && postFilter(p))
  ).filter(p => p.data.seriesPart);

  const count = Math.max(
    meta?.planned.length ?? 0,
    ...posts.map(p => p.data.seriesPart ?? 0)
  );

  return Array.from({ length: count }, (_, i) => {
    const part = i + 1;
    const post = posts.find(p => p.data.seriesPart === part);
    return {
      part,
      title: post?.data.title ?? meta?.planned[i] ?? `Part ${part}`,
      post,
    };
  });
}
