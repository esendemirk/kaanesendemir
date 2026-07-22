// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://kaanesendemir.com",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/tools") && !page.includes("/vision"),
    }),
  ],
  build: {
    format: "directory",
  },
});
