import { site } from "~/content/site";

const pages = ["/", "/uslugi", "/za-men"];

/** Prerendered to build/client/sitemap.xml. */
export function loader() {
  const urls = pages
    .map(
      (path) => `  <url><loc>${new URL(path, site.url).toString()}</loc></url>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
