import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  plugins: [imagetools(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    // Keep the SVG logo masks as cacheable files instead of inlining them into every page.
    assetsInlineLimit: (filePath) =>
      filePath.endsWith(".svg") ? false : undefined,
  },
});
