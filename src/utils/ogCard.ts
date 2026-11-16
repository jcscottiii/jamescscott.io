// Social preview image (1200×630) in the jamescscott.net style.
// Shared by the site-wide /og.png and each post's generated index.png.
import satori from "satori";
import sharp from "sharp";
import { fontData, experimental_getFontFileURL } from "astro:assets";
import { getFontPathByWeight } from "./getFontPathByWeight";
import config from "@/config";

type Options = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  url: URL;
};

async function loadFont(
  cssVariable: keyof typeof fontData,
  weight: number,
  url: URL
) {
  const path = getFontPathByWeight(fontData[cssVariable], weight, {
    format: "woff",
  });
  if (!path) throw new Error(`Cannot find ${cssVariable} at weight ${weight}.`);
  return fetch(experimental_getFontFileURL(path, url)).then(r => r.arrayBuffer());
}

export async function renderOgCard({ eyebrow, title, subtitle, url }: Options) {
  const [inter400, inter700, mono500] = await Promise.all([
    loadFont("--font-inter", 400, url),
    loadFont("--font-inter", 700, url),
    loadFont("--font-jetbrains-mono", 500, url),
  ]);
  const host = new URL(config.site.url).hostname;
  const titleSize = title.length > 60 ? 54 : title.length > 36 ? 62 : 72;

  const svg = await satori(
    {
      type: "div",
      key: null,
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "48px",
          backgroundImage:
            "linear-gradient(120deg, #cfe0f5 0%, #e7d9f7 50%, #fbe1d3 100%)",
          fontFamily: "Inter",
        },
        children: {
          type: "div",
          props: {
            style: {
              width: 1104,
              height: 534,
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "56px 64px",
              borderRadius: "32px",
              background: "rgba(255,255,255,0.86)",
              color: "#16181d",
            },
            children: [
              {
                type: "div",
                props: {
                  style: { display: "flex", flexDirection: "column", gap: "20px" },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          fontFamily: "JetBrains Mono",
                          fontSize: 26,
                          color: "#0b5d8c",
                        },
                        children: eyebrow,
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: titleSize,
                          fontWeight: 700,
                          lineHeight: 1.1,
                          letterSpacing: "-0.02em",
                        },
                        children: title,
                      },
                    },
                    subtitle
                      ? {
                          type: "div",
                          props: {
                            style: { fontSize: 28, color: "#545a64", lineHeight: 1.4 },
                            children: subtitle,
                          },
                        }
                      : null,
                  ].filter(Boolean),
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 26,
                    color: "#545a64",
                  },
                  children: [
                    { type: "span", props: { children: config.site.author } },
                    {
                      type: "span",
                      props: {
                        style: { fontFamily: "JetBrains Mono", color: "#16181d" },
                        children: host,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: [
        { name: "Inter", data: inter400, weight: 400, style: "normal" },
        { name: "Inter", data: inter700, weight: 700, style: "normal" },
        { name: "JetBrains Mono", data: mono500, weight: 500, style: "normal" },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
}
