// Generates static HTML for each blog post (and the blog index) at build time,
// so crawlers that don't execute JS (Googlebot's first pass, GPTBot, ClaudeBot,
// PerplexityBot, etc.) see real titles, meta tags, schema, and article text.
import { createClient } from "@sanity/client";
import { toHTML } from "@portabletext/to-html";
import fs from "fs";
import path from "path";

const DOMAIN = "https://www.harshitmutha.digital";
const DIST = path.resolve("dist");
const TEMPLATE = fs.readFileSync(path.join(DIST, "index.html"), "utf-8");

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || "fxajme1s",
  dataset: process.env.VITE_SANITY_DATASET || "production",
  apiVersion: "2026-06-04",
  useCdn: false,
});

const allPostsQuery = `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc){
  _id, title, "slug": slug.current, publishedAt, excerpt, seoTitle, seoDescription, author, tags, body, readingTime, faqSchema
}`;

function escapeHtml(s = "") {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function injectHead(html, { title, description, url, ogType = "article", schemas = [] }) {
  let out = html;
  out = out.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`);
  out = out.replace(/<meta name="description" content=".*?"\s*\/>/s, `<meta name="description" content="${escapeHtml(description)}" />`);
  out = out.replace(/<meta property="og:title" content=".*?"\s*\/>/s, `<meta property="og:title" content="${escapeHtml(title)}" />`);
  out = out.replace(/<meta property="og:description" content=".*?"\s*\/>/s, `<meta property="og:description" content="${escapeHtml(description)}" />`);
  out = out.replace(/<meta property="og:url" content=".*?"\s*\/>/s, `<meta property="og:url" content="${escapeHtml(url)}" />`);
  out = out.replace(/<meta property="og:type" content=".*?"\s*\/>/s, `<meta property="og:type" content="${ogType}" />`);
  out = out.replace(/<meta name="twitter:title" content=".*?"\s*\/>/s, `<meta name="twitter:title" content="${escapeHtml(title)}" />`);
  out = out.replace(/<meta name="twitter:description" content=".*?"\s*\/>/s, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);

  const canonicalTag = `<link rel="canonical" href="${escapeHtml(url)}" />`;
  if (out.match(/<link rel="canonical".*?\/>/s)) {
    out = out.replace(/<link rel="canonical".*?\/>/s, canonicalTag);
  } else {
    out = out.replace("</head>", `  ${canonicalTag}\n</head>`);
  }

  const schemaTags = schemas.map(s => `<script type="application/ld+json">${JSON.stringify(s).replace(/</g, "\\u003c")}</script>`).join("\n  ");
  out = out.replace("</head>", `  ${schemaTags}\n</head>`);
  return out;
}

function injectBody(html, contentHtml) {
  // Drop a hidden, crawlable snapshot of the article right after <body> opens.
  // React hydrates over #root and replaces this — visitors never see it,
  // but crawlers reading raw HTML get the full article text immediately.
  const marker = '<div id="prerendered-content" aria-hidden="true" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);">';
  const block = `${marker}${contentHtml}</div>`;
  return html.replace(/(<body[^>]*>)/, `$1\n  ${block}`);
}

function write(relPath, html) {
  const full = path.join(DIST, relPath, "index.html");
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html, "utf-8");
  console.log(`prerendered: /${relPath}`);
}

async function run() {
  const posts = await client.fetch(allPostsQuery);
  if (!posts?.length) {
    console.log("No published posts found — skipping prerender.");
    return;
  }

  // --- Individual post pages ---
  for (const post of posts) {
    const url = `${DOMAIN}/blog/${post.slug}`;
    const title = post.seoTitle || post.title;
    const description = post.seoDescription || post.excerpt || "";

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      author: { "@type": "Person", name: "Harshit Mutha", url: DOMAIN, jobTitle: "ChatGPT Ads Specialist" },
      publisher: { "@type": "Person", name: "Harshit Mutha", url: DOMAIN },
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      description,
      url,
    };

    const schemas = [articleSchema];
    if (post.faqSchema) {
      try { schemas.push(JSON.parse(post.faqSchema)); } catch { /* ignore malformed */ }
    }

    let bodyHtml = "";
    try { bodyHtml = toHTML(post.body || []); } catch { bodyHtml = `<p>${escapeHtml(description)}</p>`; }

    const articleSnapshot = `
      <article>
        <h1>${escapeHtml(post.title)}</h1>
        <p>By ${escapeHtml(post.author || "Harshit Mutha")} · ${escapeHtml(String(post.readingTime || ""))} min read</p>
        ${post.excerpt ? `<p>${escapeHtml(post.excerpt)}</p>` : ""}
        ${bodyHtml}
      </article>`;

    let html = injectHead(TEMPLATE, { title, description, url, ogType: "article", schemas });
    html = injectBody(html, articleSnapshot);
    write(`blog/${post.slug}`, html);
  }

  // --- Blog index page ---
  const indexUrl = `${DOMAIN}/blog`;
  const indexSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "AI Ads & Performance Marketing Insights",
    url: indexUrl,
    blogPost: posts.map(p => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${DOMAIN}/blog/${p.slug}`,
      datePublished: p.publishedAt,
    })),
  };

  const listSnapshot = `
    <h1>AI Ads & Performance Marketing Insights</h1>
    <ul>
      ${posts.map(p => `<li><a href="/blog/${p.slug}">${escapeHtml(p.title)}</a> — ${escapeHtml(p.excerpt || "")}</li>`).join("\n      ")}
    </ul>`;

  let indexHtml = injectHead(TEMPLATE, {
    title: "Blog — AI Ads & ChatGPT Marketing | Harshit Mutha",
    description: "Practical writing on ChatGPT Ads, Perplexity Ads, and what's actually working in AI platform advertising right now.",
    url: indexUrl,
    ogType: "website",
    schemas: [indexSchema],
  });
  indexHtml = injectBody(indexHtml, listSnapshot);
  write("blog", indexHtml);
}

run().catch(err => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
