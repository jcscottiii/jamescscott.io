// Homepage "Selected work" cards. Full history lives on LinkedIn.

export type Work = {
  where: string;
  title: string;
  body: string;
  link?: { label: string; url: string };
};

export const selectedWork: Work[] = [
  {
    where: "Google",
    title: "An open-source developer platform",
    body: "I set the technical direction for webstatus.dev, a distributed cloud platform with a public API, and led the work to get it approved and released as open source.",
    link: { label: "webstatus.dev", url: "https://webstatus.dev" },
  },
  {
    where: "Google",
    title: "AI that's measured, not assumed",
    body: "I build multi-agent AI tooling, and the benchmarks that check whether it's accurate and consistent before a team depends on it.",
  },
  {
    where: "Capital One",
    title: "Bigger compute for data scientists",
    body: "I led the engineers who brought distributed computing to the machine learning platform most teams there used. Dozens of teams adopted it.",
  },
];
