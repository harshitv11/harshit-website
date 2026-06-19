import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { sanityClient, postBySlugQuery } from "../lib/sanity";
import "./BlogPostSanity.css";

interface Post {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  author: string;
  tags: string[];
  body: any[];
  readingTime: number;
  faqSchema: string;
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const extractToc = (body: any[]): { id: string; text: string }[] =>
  (body || [])
    .filter((b) => b._type === "block" && b.style === "h2")
    .map((b) => {
      const text = (b.children || []).map((c: any) => c.text || "").join("");
      return { id: slugify(text), text };
    })
    .filter((item) => item.text && item.id);

const TableOfContents = ({ items }: { items: { id: string; text: string }[] }) => {
  const [open, setOpen] = useState(false);
  if (!items.length) return null;
  return (
    <nav className="bps-toc" aria-label="Table of contents">
      <button
        className="bps-toc-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>Contents</span>
        <span className="bps-toc-arrow">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <ol className="bps-toc-list">
          {items.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="bps-toc-link"
                onClick={() => setOpen(false)}
              >
                <span className="bps-toc-num">{i + 1}.</span>
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
};

const ptComponents = {
  block: {
    h1: ({ children }: any) => <h1 className="bp-h1">{children}</h1>,
    h2: ({ children, value }: any) => {
      const text = (value?.children || []).map((c: any) => c.text || "").join("");
      const id = slugify(text);
      return (
        <h2 id={id} className="bp-h2">
          {children}
        </h2>
      );
    },
    h3: ({ children, value }: any) => {
      const text = (value?.children || []).map((c: any) => c.text || "").join("");
      const id = slugify(text);
      return (
        <h3 id={id} className="bp-h3">
          {children}
        </h3>
      );
    },
    h4: ({ children }: any) => <h4 className="bp-h4">{children}</h4>,
    normal: ({ children }: any) => {
      const text = Array.isArray(children)
        ? children.map((c: any) => (typeof c === "string" ? c : "")).join("")
        : String(children || "");
      if (text.trim() === "---") return <hr />;
      if (!text.trim()) return null;
      return <p className="bp-p">{children}</p>;
    },
    blockquote: ({ children }: any) => (
      <blockquote className="bp-quote">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="bp-ul">{children}</ul>,
    number: ({ children }: any) => <ol className="bp-ol">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="bp-li">{children}</li>,
    number: ({ children }: any) => <li className="bp-li">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    code: ({ children }: any) => (
      <code className="bp-code-inline">{children}</code>
    ),
    link: ({ value, children }: any) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="bp-link"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: any) => (
      <figure className="bp-figure">
        <img
          src={value?.asset?.url}
          alt={value?.alt || ""}
          className="bp-img"
          loading="lazy"
        />
        {value?.caption && (
          <figcaption className="bp-caption">{value.caption}</figcaption>
        )}
      </figure>
    ),
  },
};

const BlogPostSanity = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    window.scrollTo(0, 0);

    sanityClient
      .fetch(postBySlugQuery, { slug })
      .then((data: Post) => {
        if (!data) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        setPost(data);
        setLoading(false);

        const seoTitle = data.seoTitle || data.title;
        const seoDesc = data.seoDescription || data.excerpt;
        const canonicalUrl = `https://www.harshitmutha.digital/blog/${slug}`;
        const dateModified = data.updatedAt || data.publishedAt;

        document.title = seoTitle;

        const setMeta = (attr: string, val: string, content: string) => {
          let el = document.querySelector(
            `meta[${attr}="${val}"]`
          ) as HTMLMetaElement;
          if (!el) {
            el = document.createElement("meta");
            el.setAttribute(attr, val);
            document.head.appendChild(el);
          }
          el.setAttribute("content", content);
        };

        setMeta("name", "description", seoDesc);
        setMeta("property", "og:title", seoTitle);
        setMeta("property", "og:description", seoDesc);
        setMeta("property", "og:url", canonicalUrl);
        setMeta("property", "og:type", "article");
        setMeta("property", "og:site_name", "Harshit Mutha");
        setMeta("name", "twitter:card", "summary_large_image");
        setMeta("name", "twitter:title", seoTitle);
        setMeta("name", "twitter:description", seoDesc);
        setMeta("name", "robots", "index, follow");

        let canonical = document.querySelector(
          'link[rel="canonical"]'
        ) as HTMLLinkElement;
        if (!canonical) {
          canonical = document.createElement("link");
          canonical.rel = "canonical";
          document.head.appendChild(canonical);
        }
        canonical.href = canonicalUrl;

        // Remove existing schemas to avoid duplication on re-render
        ["schema-article", "schema-faq", "schema-breadcrumb", "schema-person"].forEach(
          (id) => document.getElementById(id)?.remove()
        );

        // BlogPosting schema
        const articleSchema = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: seoTitle,
          description: seoDesc,
          url: canonicalUrl,
          datePublished: data.publishedAt,
          dateModified: dateModified,
          inLanguage: "en",
          author: {
            "@type": "Person",
            "@id": "https://www.harshitmutha.digital/#author",
            name: "Harshit Mutha",
            url: "https://www.harshitmutha.digital",
            jobTitle: "ChatGPT Ads Specialist",
            sameAs: ["https://www.linkedin.com/in/harshit-mutha/"],
          },
          publisher: {
            "@type": "Person",
            name: "Harshit Mutha",
            url: "https://www.harshitmutha.digital",
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": canonicalUrl,
          },
        };
        const s1 = document.createElement("script");
        s1.id = "schema-article";
        s1.type = "application/ld+json";
        s1.text = JSON.stringify(articleSchema);
        document.head.appendChild(s1);

        // BreadcrumbList schema
        const breadcrumbSchema = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.harshitmutha.digital",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog",
              item: "https://www.harshitmutha.digital/blog",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: data.title,
              item: canonicalUrl,
            },
          ],
        };
        const s3 = document.createElement("script");
        s3.id = "schema-breadcrumb";
        s3.type = "application/ld+json";
        s3.text = JSON.stringify(breadcrumbSchema);
        document.head.appendChild(s3);

        // FAQ schema from Sanity field
        if (data.faqSchema) {
          try {
            JSON.parse(data.faqSchema); // validate before injecting
            const s2 = document.createElement("script");
            s2.id = "schema-faq";
            s2.type = "application/ld+json";
            s2.text = data.faqSchema;
            document.head.appendChild(s2);
          } catch {
            // invalid JSON — skip silently
          }
        }
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });

    return () => {
      document.body.style.overflow = "hidden";
      document.body.style.height = "";
      ["schema-article", "schema-faq", "schema-breadcrumb", "schema-person"].forEach(
        (id) => document.getElementById(id)?.remove()
      );
      document.querySelector('link[rel="canonical"]')?.remove();
    };
  }, [slug]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  if (loading)
    return (
      <div className="bps-wrap">
        <nav className="bps-nav">
          <Link to="/" className="bps-logo">
            HM
          </Link>
        </nav>
        <div className="bps-loading">
          <div className="bps-skel-title" />
          <div className="bps-skel-body" />
        </div>
      </div>
    );

  if (notFound)
    return (
      <div className="bps-wrap">
        <nav className="bps-nav">
          <Link to="/" className="bps-logo">
            HM
          </Link>
        </nav>
        <div className="bps-notfound">
          <h2>Post not found.</h2>
          <Link to="/blog">← Back to Blog</Link>
        </div>
      </div>
    );

  if (!post) return null;

  const tocItems = extractToc(post.body);
  const dateModified = post.updatedAt || post.publishedAt;

  return (
    <div className="bps-wrap">
      <nav className="bps-nav">
        <Link to="/" className="bps-logo">
          HM
        </Link>
        <div className="bps-nav-right">
          <Link to="/blog" className="bps-nav-link">
            ← Blog
          </Link>
          <a
            href="https://calendly.com/hv1138769/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bps-nav-cta"
          >
            Book a Free Call
          </a>
        </div>
      </nav>

      {/* Breadcrumb */}
      <nav className="bps-breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li aria-hidden="true">›</li>
          <li aria-current="page">{post.title}</li>
        </ol>
      </nav>

      <article className="bps-article" itemScope itemType="https://schema.org/BlogPosting">
        <header className="bps-header">
          {post.tags?.length > 0 && (
            <div className="bps-tags">
              {post.tags.slice(0, 3).map((t) => (
                <span key={t} className="bps-tag">
                  {t}
                </span>
              ))}
            </div>
          )}

          <h1 itemProp="headline">{post.title}</h1>

          <div className="bps-byline">
            <div className="bps-avatar" aria-hidden="true">
              HM
            </div>
            <div>
              <strong>
                By{" "}
                <a
                  href="https://www.linkedin.com/in/harshit-mutha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bps-author-link"
                >
                  {post.author || "Harshit Mutha"}
                </a>
                , ChatGPT Ads Specialist
              </strong>
              <span>
                {post.readingTime ? `${post.readingTime} min read · ` : ""}
                Published: <time dateTime={post.publishedAt} itemProp="datePublished">{formatDate(post.publishedAt)}</time>
                {dateModified !== post.publishedAt && (
                  <>
                    {" · "}Updated:{" "}
                    <time dateTime={dateModified} itemProp="dateModified">{formatDate(dateModified)}</time>
                  </>
                )}
              </span>
            </div>
          </div>

          {post.excerpt && (
            <p className="bps-excerpt" itemProp="description">
              {post.excerpt}
            </p>
          )}

          {/* Editorial note */}
          <div className="bps-editorial-note">
            <span className="bps-editorial-icon">ℹ</span>
            <span>
              <strong>Editorial note:</strong> This article was researched using
              official OpenAI announcements, the OpenAI Help Centre and reporting
              from major technology publications. Claims that cannot be verified
              from official sources are labelled accordingly.
            </span>
          </div>
        </header>

        {/* Table of Contents */}
        {tocItems.length > 0 && <TableOfContents items={tocItems} />}

        <div className="bps-body" itemProp="articleBody">
          {post.body && (
            <PortableText value={post.body} components={ptComponents} />
          )}
        </div>

        {/* Author card */}
        <footer className="bps-author-footer">
          <div className="bps-author-card">
            <div className="bps-author-avatar" aria-hidden="true">
              HM
            </div>
            <div className="bps-author-info">
              <strong>
                Written by{" "}
                <a
                  href="https://www.linkedin.com/in/harshit-mutha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bp-link"
                >
                  Harshit Mutha
                </a>
                , ChatGPT Ads Specialist
              </strong>
              <p>
                Harshit is an AI Ads Specialist focused on paid advertising on
                AI-native platforms including ChatGPT and Perplexity. He works
                with B2B brands in the US, UK and Australia on conversational
                advertising strategy, campaign setup and AI-search visibility.
              </p>
              <Link to="/chatgpt-ads" className="bps-author-cta">
                Work with Harshit →
              </Link>
            </div>
          </div>
        </footer>
      </article>

      <footer className="bps-footer">
        <Link to="/blog">← All Articles</Link>
        <p>© 2026 Harshit Mutha</p>
      </footer>
    </div>
  );
};

export default BlogPostSanity;
