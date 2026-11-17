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
    body: "I set the technical direction for webstatus.dev, which shows which web features work in which browsers. It runs on Google Cloud with a public API, and I led the work to release it as open source.",
    link: { label: "webstatus.dev", url: "https://webstatus.dev" },
  },
  {
    where: "web-platform-tests",
    title: "Test infrastructure the browser makers share",
    body: "Apple, Google, Microsoft, and Mozilla all run web-platform-tests, a shared test suite. I'm on its infrastructure team: I help run its CI and results dashboard and review changes from engineers at several companies. I also wrote the proposals that added JavaScript's official test suite to it and linked its tests to web features.",
    link: { label: "wpt.fyi", url: "https://wpt.fyi" },
  },
  {
    where: "Google",
    title: "Measuring an AI tool's accuracy",
    body: "wpt-gen is an open-source AI tool that writes browser tests. I defined its benchmark, oversaw the engineer who built it, and set up the pipeline that runs it. It checks whether the tool's AI reviewer is right, consistent, and agrees with human reviewers. The team has used it to choose which model to run.",
    link: {
      label: "wpt-gen",
      url: "https://github.com/GoogleChromeLabs/wpt-gen",
    },
  },
  {
    where: "Capital One",
    title: "Distributed computing for data scientists",
    body: "I led the engineers who added distributed computing (Amazon EMR) to the machine learning platform most teams there already used. Dozens of teams adopted it.",
  },
];
