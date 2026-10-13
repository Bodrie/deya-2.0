import type { Config } from "@react-router/dev/config";

export default {
  // Static site: every page is rendered to HTML at build time and served as
  // plain files from Firebase Hosting. There is no runtime server.
  ssr: false,
  prerender: ["/", "/uslugi", "/za-men", "/sitemap.xml", "/robots.txt"],
} satisfies Config;
