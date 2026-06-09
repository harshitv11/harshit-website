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
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  author: string;
  tags: string[];
  body: any[];
  readingTime: number;
  faqSchema: string;
}

const ptComponents = {
  block: {
    h1: ({ children }: any) => <h1 className="bp-h1">{children}</h1>,
    h2: ({ children }: any) => <h2 className="bp-h2">{children}</h2>,
    h3: ({ children }: any) => <h3 className="bp-h3">{children}</h3>,
    h4: ({ children }: any) => <h4 className="bp-h4">{children}</h4>,
    normal: ({ children }: any) => {
      const text = Array.isArray(children) ? children.map((c: any) => (typeof c === "string" ? c : "")).join("") : String(children || "");
      if (text.trim() === "---") return <hr />;
      if (!text.trim()) return null;
      return <p className="bp-p">{children}</p>;
    },
    blockquote: ({ children }: any) => <blockquote className="bp-quote">{children}</blockquote>,
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
    code: ({ children }: any) => <code className="bp-code-inline">{children}</code>,
    link: ({ value, children }: any) => (
      <a href={value?.href} target={value?.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="bp-link">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <figure className="bp-figure">
        <img src={value?.asset?.url} alt={value?.alt || ""} className="bp-img" loading="lazy" />
        {value?.caption && <figcaption className="bp-caption">{value.caption}</figcaption>}
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

    sanityClient.fetch(postBySlugQuery, { slug }).then((data: Post) => {
      if (!data) { setNotFound(true); setLoading(false); return; }
      setPost(data);
      setLoading(false);

      // SEO meta
      document.title = data.seoTitle || data.title;
      const setTag = (a: string, v: string, c: string) => {
        let el = document.querySelector(`meta[${a}="${v}"]`) as HTMLMetaElement;
        if (!el) { el = document.createElement("meta"); el.setAttribute(a, v); document.head.appendChild(el); }
        el.setAttribute("content", c);
      };
      setTag("name", "description", data.seoDescription || data.excerpt);
      setTag("property", "og:title", data.seoTitle || data.title);
      setTag("property", "og:description", data.seoDescription || data.excerpt);
      setTag("property", "og:url", `https://www.harshitmutha.digital/blog/${slug}`);
      setTag("property", "og:type", "article");
      setTag("name", "twitter:card", "summary_large_image");
      setTag("name", "twitter:title", data.seoTitle || data.title);
      setTag("name", "twitter:description", data.seoDescription || data.excerpt);

      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
      canonical.href = `https://www.harshitmutha.digital/blog/${slug}`;

      // Article schema
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": data.title,
        "author": {
          "@type": "Person",
          "name": "Harshit Mutha",
          "url": "https://www.harshitmutha.digital",
          "jobTitle": "ChatGPT Ads Specialist"
        },
        "publisher": {
          "@type": "Person",
          "name": "Harshit Mutha",
          "url": "https://www.harshitmutha.digital"
        },
        "datePublished": data.publishedAt,
        "dateModified": data.publishedAt,
        "description": data.seoDescription || data.excerpt,
        "url": `https://www.harshitmutha.digital/blog/${slug}`
      };
      const s1 = document.createElement("script");
      s1.id = "schema-article";
      s1.type = "application/ld+json";
      s1.text = JSON.stringify(articleSchema);
      document.head.appendChild(s1);

      // FAQ schema from Sanity field
      if (data.faqSchema) {
        try {
          const s2 = document.createElement("script");
          s2.id = "schema-faq";
          s2.type = "application/ld+json";
          s2.text = data.faqSchema;
          document.head.appendChild(s2);
        } catch (e) {}
      }
    }).catch(() => { setNotFound(true); setLoading(false); });

    return () => {
      document.body.style.overflow = "hidden";
      document.body.style.height = "";
      document.getElementById("schema-article")?.remove();
      document.getElementById("schema-faq")?.remove();
    };
  }, [slug]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  if (loading) return (
    <div className="bps-wrap">
      <nav className="bps-nav"><Link to="/" className="bps-logo">HM</Link></nav>
      <div className="bps-loading"><div className="bps-skel-title" /><div className="bps-skel-body" /></div>
    </div>
  );

  if (notFound) return (
    <div className="bps-wrap">
      <nav className="bps-nav"><Link to="/" className="bps-logo">HM</Link></nav>
      <div className="bps-notfound">
        <h2>Post not found.</h2>
        <Link to="/blog">← Back to Blog</Link>
      </div>
    </div>
  );

  if (!post) return null;

  return (
    <div className="bps-wrap">
      <nav className="bps-nav">
        <Link to="/" className="bps-logo">HM</Link>
        <div className="bps-nav-right">
          <Link to="/blog" className="bps-nav-link">← Blog</Link>
          <a href="https://calendly.com/hv1138769/30min" target="_blank" rel="noreferrer" className="bps-nav-cta">Book a Free Call</a>
        </div>
      </nav>

      <article className="bps-article">
        <header className="bps-header">
          {post.tags?.length > 0 && (
            <div className="bps-tags">
              {post.tags.slice(0, 3).map(t => <span key={t} className="bps-tag">{t}</span>)}
            </div>
          )}
          <h1>{post.title}</h1>
          <div className="bps-byline">
            <div className="bps-avatar">HM</div>
            <div>
              <strong>By {post.author || "Harshit Mutha"}, ChatGPT Ads Specialist</strong>
              <span>
                {post.readingTime && `${post.readingTime} min read · `}
                Last Updated: {formatDate(post.publishedAt)}
              </span>
            </div>
          </div>
          {post.excerpt && <p className="bps-excerpt">{post.excerpt}</p>}
        </header>

        <div className="bps-body">
          {post.body && <PortableText value={post.body} components={ptComponents} />}
        </div>

        {/* Author byline */}
        <footer className="bps-author-footer">
          <div className="bps-author-card">
            <div className="bps-author-avatar">HM</div>
            <div className="bps-author-info">
              <strong>Written by Harshit Mutha, ChatGPT Ads Specialist</strong>
              <p>Harshit runs ChatGPT Ads and Perplexity Ads campaigns for B2B brands in the US, UK, and Australia. He specialises in high-intent AI platform advertising for business owners spending $2k–$20k/month on paid media.</p>
              <Link to="/chatgpt-ads" className="bps-author-cta">Work with Harshit →</Link>
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
