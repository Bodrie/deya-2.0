/**
 * Runs after `react-router build`.
 *
 * Firebase Hosting serves `404.html` (with a real 404 status) for any URL that
 * has no file. We use the SPA fallback for it, so the visitor sees the site's
 * designed "page not found" view once the router starts.
 */
import fs from "node:fs/promises";

const client = new URL("../build/client/", import.meta.url);

await fs.copyFile(
  new URL("__spa-fallback.html", client),
  new URL("404.html", client),
);

// Client-navigation data for the sitemap and robots resource routes is never requested.
for (const file of ["sitemap.xml.data", "robots.txt.data"]) {
  await fs.rm(new URL(file, client), { force: true });
}

console.log("postbuild: 404.html ready");
