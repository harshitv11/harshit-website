import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BlogPost as BlogPostType } from "../components/Blog";
import defaultPosts from "../data/blogs.json";
import { setMeta, setBlogSchema, slugify } from "../utils/seo";
import "./BlogPost.css";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [related, setRelated] = useState<BlogPostType[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("hm_blog_posts");
    const all: BlogPostType[] = saved ? JSON.parse(saved) : (defaultPosts as BlogPostType[]);
    const found = all.find((p) => slugify(p.title) === slug);
    setPost(found || null);
    if (found) {
      setRelated(all.filter((p) => p.id !== found.id && p.category === found.category && p.published).slice(0, 3));
      setMeta(
        `${found.title} | Harshit Mutha`,
        found.excerpt,
        `/blog/${slug}`
      );
      setBlogSchema(found.title, found.excerpt, found.date, slug!);
    }
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = "hidden";
      document.body.style.height = "";
    };
  }, [slug]);

  if (!post) return (
    <div className="bp-notfound">
      <h2>Post not found</h2>
      <Link to="/">← Back to Home</Link>
    </div>
  );

  return (
    <div className="bp-wrap">
      <nav className="bp-nav">
        <Link to="/" className="bp-logo">HM</Link>
        <Link to="/#blog" className="bp-back">← All Articles</Link>
      </nav>

      <article className="bp-article">
        <header className="bp-header">
          <span className="bp-category">{post.category}</span>
          <h1>{post.title}</h1>
          <div className="bp-meta">
            <span>By <strong>Harshit Mutha</strong></span>
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <div className="bp-content">
          <p className="bp-lead">{post.excerpt}</p>
          {post.content && post.content !== post.excerpt && (
            <div className="bp-body">
              {post.content.split("\n").filter(Boolean).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}
        </div>

        <footer className="bp-footer">
          <div className="bp-author">
            <div className="bp-author-avatar">HM</div>
            <div>
              <strong>Harshit Mutha</strong>
              <p>AI Ads Expert & ChatGPT Ads Specialist helping brands scale with AI-powered advertising.</p>
            </div>
          </div>
        </footer>
      </article>

      {related.length > 0 && (
        <section className="bp-related">
          <h3>Related Articles</h3>
          <div className="bp-related-grid">
            {related.map((p) => (
              <Link key={p.id} to={`/blog/${slugify(p.title)}`} className="bp-related-card">
                <span className="bp-category">{p.category}</span>
                <h4>{p.title}</h4>
                <p>{p.excerpt.slice(0, 80)}...</p>
                <span className="bp-related-meta">{p.date} · {p.readTime}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPostPage;
