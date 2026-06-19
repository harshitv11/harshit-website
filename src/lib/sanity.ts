import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "fxajme1s",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: "2026-06-04",
  useCdn: true,
});

// Blog post queries
export const allPostsQuery = `
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    seoTitle,
    seoDescription,
    author,
    tags,
    readingTime
  }
`;

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "updatedAt": _updatedAt,
    excerpt,
    seoTitle,
    seoDescription,
    author,
    tags,
    body,
    readingTime,
    faqSchema
  }
`;

export const allSlugsQuery = `
  *[_type == "post" && defined(slug.current) && defined(publishedAt)] {
    "slug": slug.current,
    publishedAt
  }
`;
