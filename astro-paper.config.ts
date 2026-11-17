import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://jamescscott.net/",
    title: "James C. Scott",
    description:
      "James C. Scott builds the platforms and tools other engineers rely on. Writing on local AI, infrastructure, Go, and developer tooling.",
    author: "James C. Scott",
    profile: "https://www.linkedin.com/in/jamescscott/",
    // No file with this name exists in public/, so the generated /og.png is used.
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "America/New_York",
    dir: "ltr",
  },
  posts: {
    perPage: 8,
    perIndex: 3,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: { enabled: false },
    search: "pagefind",
    toc: true,
  },
  socials: [
    { name: "github", url: "https://github.com/jcscottiii" },
    { name: "linkedin", url: "https://www.linkedin.com/in/jamescscott/" },
  ],
  shareLinks: [
    { name: "linkedin", url: "https://www.linkedin.com/sharing/share-offsite/?url=" },
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
