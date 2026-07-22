import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(["draft", "in-progress", "shipped"]),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
  }),
});

/** Leadership / “how I’d run a company” chapters — wiki-style MD, rendered as one running page */
const vision = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/vision" }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    summary: z.string(),
  }),
});

/** Public blog — Markdown posts, indexed, LinkedIn-shareable */
const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    cover: z.string().optional(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { projects, vision, blog };
