// Homepage "Selected work" and "Where I've worked" content.
// Edit here; the homepage reads from this file.

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
  {
    where: "Intel",
    title: "Faster Android startup, on the factory floor",
    body: "I found a way to pre-compile only the apps that mattered, so the assembly line could ship ASUS's Lollipop upgrade on schedule. It earned a divisional award.",
  },
];

export type Role = {
  company: string;
  role: string;
  summary: string;
  years?: string;
};

// Most recent first. Add `years` (e.g. "2022–now") when you're ready.
export const roles: Role[] = [
  {
    company: "Google",
    role: "Senior Software Engineer",
    summary: "Open-source developer platforms and AI tooling.",
  },
  {
    company: "Microsoft",
    role: "Software Engineer / SRE",
    summary: "Built and kept microsoft.com running.",
  },
  {
    company: "Capital One",
    role: "Lead Software Engineer",
    summary:
      "Machine learning platform infrastructure and company-wide Go adoption.",
  },
  {
    company: "18F",
    role: "Software Engineer",
    summary:
      "Cloud and compliance tooling for federal agencies, including cloud.gov.",
  },
  {
    company: "Intel",
    role: "Software Engineer",
    summary:
      "Android performance on the compiler team, after rotations across LAN and Intel Labs.",
  },
];
