// Series shown on the homepage and at the end of each post in the series.
// A post joins a series with `series: <key>` and `seriesPart: <n>` in its
// front matter. `planned` titles show for parts that aren't published yet.

export type Series = {
  title: string;
  description: string;
  planned: string[];
};

export const series: Record<string, Series> = {
  "dgx-spark": {
    title: "A DGX Spark in my server room",
    description:
      "Setting up an NVIDIA DGX Spark at home and measuring it: speed, accuracy, power, and what it costs compared with the cloud.",
    planned: [
      "Unboxing and headless setup",
      "Remote access",
      "First models and benchmarks",
      "Evaluating local models",
      "Power, noise, heat, and cost",
    ],
  },
};

export const featuredSeries = "dgx-spark";
