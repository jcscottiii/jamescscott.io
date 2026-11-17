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
    where: "web-platform-tests",
    title: "Test infrastructure the browser makers share",
    body: "I'm on the infrastructure team for web-platform-tests, the shared test suite Apple, Google, Microsoft, and Mozilla all run. I help run its CI and results dashboard, have reviewed over 500 changes, and wrote the proposals that brought JavaScript's conformance tests into it and linked its tests to web features.",
    link: { label: "wpt.fyi", url: "https://wpt.fyi" },
  },
  {
    where: "Google",
    title: "AI that's measured, not assumed",
    body: "I drove the benchmark for wpt-gen, an open-source AI tool that writes browser tests. It checks whether the tool's AI reviewer is right, consistent, and in line with human experts, and the team uses it to choose models.",
    link: {
      label: "wpt-gen",
      url: "https://github.com/GoogleChromeLabs/wpt-gen",
    },
  },
  {
    where: "Capital One",
    title: "Bigger compute for data scientists",
    body: "I led the engineers who added distributed computing (Amazon EMR) to the machine learning platform most teams there already used. Dozens of teams adopted it.",
  },
];
