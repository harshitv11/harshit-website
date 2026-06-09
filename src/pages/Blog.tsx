import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sanityClient, allPostsQuery } from "../lib/sanity";
import { setMeta } from "../utils/seo";
import "./Blog.css";

interface Post {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMeta(
      "Blog — AI Ads & ChatGPT Marketing | Harshit Mutha",
      "Practical writing on ChatGPT Ads, Perplexity Ads, and what's actually working in AI platform advertising right now. Written by Harshit Mutha.",
      "/blog"
    );
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    window.scrollTo(0, 0);

    sanityClient.fetch(allPostsQuery).then((data: Post[]) => {
      setPosts(data);
      setLoading(false);
    }).catch(() => setLoading(false));

    return () => {
      document.body.style.overflow = "hidden";
      document.body.style.height = "";
    };
  }, []);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="bl-wrap">
      <nav className="bl-nav">
        <Link to="/" className="bl-logo">HM</Link>
        <div className="bl-nav-right">
          <Link to="/chatgpt-ads" className="bl-nav-link">ChatGPT Ads</Link>
          <a href="https://calendly.com/hv1138769/30min" target="_blank" rel="noreferrer" className="bl-nav-cta">Book a Free Call</a>
        </div>
      </nav>

      <header className="bl-header">
        <div className="bl-header-inner">
          <p className="bl-header-tag">From the desk of Harshit Mutha</p>
          <h1>AI Ads & Performance<br />Marketing Insights</h1>
          <p className="bl-header-sub">Practical writing on ChatGPT Ads, Perplexity Ads, and what's actually working in AI platform advertising right now.</p>
        </div>
      </header>

      <main className="bl-main">
        <div className="bl-container">
          {loading && (
            <div className="bl-loading">
              {[1,2,3].map(i => <div key={i} className="bl-skeleton" />)}
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="bl-empty">
              <h3>Posts coming soon.</h3>
              <p>I'm writing about ChatGPT Ads, Perplexity Ads, and AI platform advertising. Check back shortly.</p>
              <Link to="/chatgpt-ads" className="bl-cta">See the ChatGPT Ads service →</Link>
            </div>
          )}

          {!loading && posts.length > 0 && (
            <div className="bl-grid">
              {posts.map((post, i) => (
                <Link to={`/blog/${post.slug}`} key={post._id} className={`bl-card ${i === 0 ? "bl-card-featured" : ""}`}>
                  <div className="bl-card-meta">
                    <span className="bl-date">{formatDate(post.publishedAt)}</span>
                    {post.readingTime && <span className="bl-read">{post.readingTime} min read</span>}
                  </div>
                  <h2 className="bl-card-title">{post.title}</h2>
                  {post.excerpt && <p className="bl-card-excerpt">{post.excerpt}</p>}
                  {post.tags?.length > 0 && (
                    <div className="bl-tags">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="bl-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                  <span className="bl-card-link">Read article →</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="bl-footer">
        <Link to="/">← harshitmutha.digital</Link>
        <p>© 2026 Harshit Mutha · ChatGPT Ads Specialist</p>
      </footer>
    </div>
  );
};

export default Blog;
