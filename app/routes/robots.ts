import { site } from "~/content/site";

/** Prerendered to build/client/robots.txt. */
export function loader() {
  const body = `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap.xml
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
