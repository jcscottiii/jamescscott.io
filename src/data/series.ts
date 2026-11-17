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
    title: "An AI supercomputer in my server room",
    description:
      "Setting up an NVIDIA DGX Spark at home, then putting real numbers on it: speed, accuracy, power, and what it costs next to the cloud.",
    planned: [
      "Unboxing and headless setup",
      "Remote access that just works",
      "First models, real numbers",
      "Evaluating local models properly",
      "Power, noise, heat, and cost",
    ],
  },
};

export const featuredSeries = "dgx-spark";
