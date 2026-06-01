import { useState, useEffect } from "react";
import "./styles/Admin.css";
import { BlogPost } from "./Blog";
import defaultPosts from "../data/blogs.json";
import { MdAdd, MdEdit, MdDelete, MdLogout, MdVisibility, MdVisibilityOff, MdSave, MdArrowBack } from "react-icons/md";

const ADMIN_PASSWORD = "HM@2026";

type View = "dashboard" | "posts" | "new-post" | "edit-post" | "settings";

const emptyPost: Omit<BlogPost, "id"> = {
  category: "AI Ads",
  title: "",
  excerpt: "",
  content: "",
  date: "",
  readTime: "5 min read",
  featured: false,
  published: true,
};

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState("");
  const [view, setView] = useState<View>("dashboard");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<Omit<BlogPost, "id">>(emptyPost);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const session = sessionStorage.getItem("hm_admin");
    if (session === "yes") setAuthed(true);
    loadPosts();
  }, []);

  const loadPosts = () => {
    const saved = localStorage.getItem("hm_blog_posts");
    setPosts(saved ? JSON.parse(saved) : (defaultPosts as BlogPost[]));
  };

  const savePosts = (updated: BlogPost[]) => {
    localStorage.setItem("hm_blog_posts", JSON.stringify(updated));
    setPosts(updated);
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      sessionStorage.setItem("hm_admin", "yes");
      setPwError("");
    } else {
      setPwError("Wrong password. Try again.");
    }
  };

  const handleLogout = () => {
    setAuthed(false);
    sessionStorage.removeItem("hm_admin");
    window.location.hash = "";
  };

  const handleSavePost = () => {
    if (!formData.title.trim()) return alert("Title is required!");
    if (!formData.excerpt.trim()) return alert("Excerpt is required!");

    let updated: BlogPost[];
    if (editingPost) {
      updated = posts.map((p) =>
        p.id === editingPost.id ? { ...formData, id: editingPost.id } : p
      );
    } else {
      const newId = posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
      const now = new Date();
      const dateStr = now.toLocaleString("en-IN", { month: "short", year: "numeric" });
      updated = [...posts, { ...formData, id: newId, date: formData.date || dateStr }];
    }

    savePosts(updated);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setView("posts");
      setEditingPost(null);
      setFormData(emptyPost);
    }, 1200);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({ ...post });
    setView("edit-post");
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this post?")) return;
    savePosts(posts.filter((p) => p.id !== id));
  };

  const togglePublish = (id: number) => {
    savePosts(posts.map((p) => (p.id === id ? { ...p, published: !p.published } : p)));
  };

  const toggleFeatured = (id: number) => {
    savePosts(posts.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)));
  };

  const resetToDefault = () => {
    if (!confirm("Reset all blogs to default? Your changes will be lost.")) return;
    localStorage.removeItem("hm_blog_posts");
    loadPosts();
    alert("Reset done!");
  };

  // ── LOGIN SCREEN ──
  if (!authed) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <div className="admin-logo">HM</div>
          <h2>Admin Panel</h2>
          <p>Harshit Mutha · AI Ads Expert</p>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="admin-input"
            autoFocus
          />
          {pwError && <p className="admin-error">{pwError}</p>}
          <button className="admin-btn-primary" onClick={handleLogin}>
            Login
          </button>
          <p className="admin-hint">Default password: HM@2026</p>
        </div>
      </div>
    );
  }

  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = posts.filter((p) => !p.published).length;
  const featuredCount = posts.filter((p) => p.featured).length;

  // ── MAIN ADMIN ──
  return (
    <div className="admin-wrap">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-logo-sm">HM</div>
          <span>Admin</span>
        </div>
        <nav className="admin-nav">
          <button className={view === "dashboard" ? "active" : ""} onClick={() => setView("dashboard")}>
            📊 Dashboard
          </button>
          <button className={view === "posts" || view === "edit-post" ? "active" : ""} onClick={() => setView("posts")}>
            📝 Blog Posts
          </button>
          <button className={view === "new-post" ? "active" : ""} onClick={() => { setView("new-post"); setEditingPost(null); setFormData(emptyPost); }}>
            <MdAdd /> New Post
          </button>
          <button className={view === "settings" ? "active" : ""} onClick={() => setView("settings")}>
            ⚙️ Settings
          </button>
        </nav>
        <button className="admin-logout" onClick={handleLogout}>
          <MdLogout /> Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="admin-main">

        {/* DASHBOARD */}
        {view === "dashboard" && (
          <div className="admin-content">
            <h1>Welcome back, Harshit 👋</h1>
            <p className="admin-subtitle">Here's your website overview</p>
            <div className="admin-stats">
              <div className="admin-stat-card">
                <h3>{posts.length}</h3>
                <p>Total Posts</p>
              </div>
              <div className="admin-stat-card green">
                <h3>{publishedCount}</h3>
                <p>Published</p>
              </div>
              <div className="admin-stat-card orange">
                <h3>{draftCount}</h3>
                <p>Drafts</p>
              </div>
              <div className="admin-stat-card blue">
                <h3>{featuredCount}</h3>
                <p>Featured</p>
              </div>
            </div>

            <div className="admin-quick">
              <h2>Quick Actions</h2>
              <div className="admin-quick-btns">
                <button className="admin-btn-primary" onClick={() => { setView("new-post"); setFormData(emptyPost); }}>
                  <MdAdd /> Write New Blog
                </button>
                <button className="admin-btn-secondary" onClick={() => setView("posts")}>
                  📝 Manage Posts
                </button>
                <a className="admin-btn-secondary" href="/" target="_blank">
                  🌐 View Website
                </a>
              </div>
            </div>

            <div className="admin-info-box">
              <h3>💡 How to permanently save blogs</h3>
              <ol>
                <li>Write your blog post here → it saves to your browser immediately</li>
                <li>To make it permanent (survive after hosting), ask Claude: <strong>"Upload my latest blog posts to the website"</strong></li>
                <li>Claude will update <code>src/data/blogs.json</code> and rebuild</li>
                <li>Upload the new <code>dist</code> folder to Hostinger</li>
              </ol>
            </div>
          </div>
        )}

        {/* POSTS LIST */}
        {(view === "posts") && (
          <div className="admin-content">
            <div className="admin-header-row">
              <h1>Blog Posts</h1>
              <button className="admin-btn-primary" onClick={() => { setView("new-post"); setFormData(emptyPost); setEditingPost(null); }}>
                <MdAdd /> New Post
              </button>
            </div>
            <div className="admin-post-list">
              {posts.map((post) => (
                <div className="admin-post-item" key={post.id}>
                  <div className="admin-post-info">
                    <span className={`admin-post-badge ${post.published ? "green" : "gray"}`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                    {post.featured && <span className="admin-post-badge blue">Featured</span>}
                    <span className="admin-post-cat">{post.category}</span>
                    <h4>{post.title}</h4>
                    <p>{post.excerpt.slice(0, 80)}...</p>
                    <small>{post.date} · {post.readTime}</small>
                  </div>
                  <div className="admin-post-actions">
                    <button title="Edit" onClick={() => handleEdit(post)}><MdEdit /></button>
                    <button title={post.published ? "Unpublish" : "Publish"} onClick={() => togglePublish(post.id)}>
                      {post.published ? <MdVisibilityOff /> : <MdVisibility />}
                    </button>
                    <button title={post.featured ? "Unfeature" : "Feature"} onClick={() => toggleFeatured(post.id)}
                      className={post.featured ? "featured-active" : ""}>
                      ⭐
                    </button>
                    <button title="Delete" className="danger" onClick={() => handleDelete(post.id)}>
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NEW / EDIT POST */}
        {(view === "new-post" || view === "edit-post") && (
          <div className="admin-content">
            <div className="admin-header-row">
              <button className="admin-back" onClick={() => { setView("posts"); setEditingPost(null); }}>
                <MdArrowBack /> Back
              </button>
              <h1>{editingPost ? "Edit Post" : "New Blog Post"}</h1>
            </div>

            <div className="admin-form">
              <div className="admin-form-row">
                <label>Title *</label>
                <input className="admin-input" placeholder="Enter blog title..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>

              <div className="admin-form-row two-col">
                <div>
                  <label>Category</label>
                  <select className="admin-input"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                    <option>AI Ads</option>
                    <option>ChatGPT Marketing</option>
                    <option>AI Automation</option>
                    <option>Performance Marketing</option>
                    <option>Digital Growth</option>
                  </select>
                </div>
                <div>
                  <label>Read Time</label>
                  <input className="admin-input" placeholder="e.g. 5 min read"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })} />
                </div>
              </div>

              <div className="admin-form-row">
                <label>Short Excerpt * (shown on blog cards)</label>
                <textarea className="admin-input admin-textarea" rows={3}
                  placeholder="Write a short summary of the blog post..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} />
              </div>

              <div className="admin-form-row">
                <label>Full Content</label>
                <textarea className="admin-input admin-textarea" rows={10}
                  placeholder="Write the full blog content here..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
              </div>

              <div className="admin-form-row two-col">
                <div className="admin-toggle-row">
                  <label>Published</label>
                  <input type="checkbox" checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })} />
                </div>
                <div className="admin-toggle-row">
                  <label>Featured (shown large)</label>
                  <input type="checkbox" checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} />
                </div>
              </div>

              <div className="admin-form-actions">
                <button className={`admin-btn-primary ${saved ? "saved" : ""}`} onClick={handleSavePost}>
                  {saved ? "✓ Saved!" : <><MdSave /> Save Post</>}
                </button>
                <button className="admin-btn-secondary" onClick={() => { setView("posts"); setEditingPost(null); }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {view === "settings" && (
          <div className="admin-content">
            <h1>Settings</h1>
            <div className="admin-info-box">
              <h3>🔑 Change Password</h3>
              <p>To change the admin password, ask Claude: <strong>"Change my admin password to [new password]"</strong></p>
              <p>Current password location: <code>src/components/Admin.tsx</code> line 10</p>
            </div>
            <div className="admin-info-box orange">
              <h3>🔄 Reset Blog Posts</h3>
              <p>This will reset all blog posts to the default sample posts and remove any changes you made.</p>
              <button className="admin-btn-danger" onClick={resetToDefault}>Reset to Default</button>
            </div>
            <div className="admin-info-box">
              <h3>📤 How to publish to Hostinger</h3>
              <ol>
                <li>Ask Claude: <strong>"Save my blog posts permanently and build the site"</strong></li>
                <li>Claude updates <code>blogs.json</code> and you run <code>npm run build</code></li>
                <li>Upload the <code>dist</code> folder to Hostinger <code>public_html</code></li>
                <li>Your site is live with the latest blogs!</li>
              </ol>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Admin;
