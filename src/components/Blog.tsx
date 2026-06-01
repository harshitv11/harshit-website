import { useState, useEffect } from "react";
import "./styles/Blog.css";
import { MdArrowOutward } from "react-icons/md";
import defaultPosts from "../data/blogs.json";

export interface BlogPost {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  featured: boolean;
  published: boolean;
}

const categories = ["All", "AI Ads", "ChatGPT Marketing", "AI Automation", "Performance Marketing", "Digital Growth"];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Merge JSON posts with any admin-added posts from localStorage
    const saved = localStorage.getItem("hm_blog_posts");
    if (saved) {
      setPosts(JSON.parse(saved));
    } else {
      setPosts(defaultPosts as BlogPost[]);
    }
  }, []);

  const published = posts.filter((p) => p.published);

  const filtered = published.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <div className="blog-section section-container" id="blog">
      <div className="blog-container">
        <h2 className="blog-title">
          Latest <span>Insights</span>
        </h2>
        <p className="blog-subtitle">
          AI Ads · Performance Marketing · Growth Strategy
        </p>

        <div className="blog-controls">
          <input
            className="blog-search"
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="blog-categories">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`blog-cat-btn ${activeCategory === cat ? "blog-cat-active" : ""}`}
                onClick={() => setActiveCategory(cat)}
                data-cursor="disable"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {featured.length > 0 && (
          <div className="blog-featured">
            {featured.map((post) => (
              <div className="blog-featured-card" key={post.id}>
                <span className="blog-badge">{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="blog-meta">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                  <a href="#" className="blog-read-link" data-cursor="disable">
                    Read <MdArrowOutward />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="blog-grid">
          {rest.map((post) => (
            <div className="blog-card" key={post.id}>
              <span className="blog-badge">{post.category}</span>
              <h4>{post.title}</h4>
              <p>{post.excerpt}</p>
              <div className="blog-meta">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
                <a href="#" className="blog-read-link" data-cursor="disable">
                  Read <MdArrowOutward />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="blog-empty">
            <p>No articles found. Try a different search or category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
