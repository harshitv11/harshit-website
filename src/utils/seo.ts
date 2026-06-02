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

export function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
