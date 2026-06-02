const DOMAIN = "https://www.harshitmutha.digital";

export function setMeta(title: string, description: string, path?: string) {
  const url = path ? `${DOMAIN}${path}` : DOMAIN;
  document.title = title;
  setTag("meta", "name", "description", "content", description);
  setTag("meta", "property", "og:title", "content", title);
  setTag("meta", "property", "og:description", "content", description);
  setTag("meta", "property", "og:url", "content", url);
  setTag("meta", "property", "og:type", "content", "website");
  setTag("meta", "name", "twitter:title", "content", title);
  setTag("meta", "name", "twitter:description", "content", description);
  setTag("meta", "name", "twitter:card", "content", "summary_large_image");
  // Update canonical
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = url;
}

function setTag(tag: string, attr: string, attrVal: string, key: string, val: string) {
  let el = document.querySelector(`${tag}[${attr}="${attrVal}"]`) as HTMLMetaElement;
  if (!el) {
    el = document.createElement(tag) as HTMLMetaElement;
    el.setAttribute(attr, attrVal);
    document.head.appendChild(el);
  }
  el.setAttribute(key, val);
}

export function setBlogSchema(title: string, excerpt: string, date: string, slug: string) {
  const existing = document.getElementById("blog-schema");
  if (existing) existing.remove();
  const script = document.createElement("script");
  script.id = "blog-schema";
  script.type = "application/ld+json";
  script.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": excerpt,
    "datePublished": date,
    "url": `https://www.harshitmutha.digital/blog/${slug}`,
    "author": {
      "@type": "Person",
      "name": "Harshit Mutha",
      "url": "https://www.harshitmutha.digital"
    },
    "publisher": {
      "@type": "Person",
      "name": "Harshit Mutha"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.harshitmutha.digital/blog/${slug}`
    }
  });
  document.head.appendChild(script);
}

export function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
