import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setMeta } from "../utils/seo";
import "./ChatGPTAds.css";
import { useScrollReveal } from "../hooks/useScrollReveal";
import TrustSection from "../components/TrustSection";
import BookingModal from "../components/BookingModal";

const ChatGPTAds = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const r1 = useScrollReveal(); const r2 = useScrollReveal();
  const r3 = useScrollReveal(); const r4 = useScrollReveal();
  const r5 = useScrollReveal(); const r6 = useScrollReveal();
  const r7 = useScrollReveal(); const rCards = useScrollReveal();
  const rSteps = useScrollReveal(); const rStats = useScrollReveal();

  useEffect(() => {
    const showIt = () => { setShowToast(true); setTimeout(() => setShowToast(false), 6000); };
    const toastTimer = setInterval(showIt, 45000);
    setTimeout(showIt, 8000);
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    window.scrollTo(0, 0);
    setMeta(
      "ChatGPT Ads Expert — Run Ads on ChatGPT & AI Platforms | Harshit Mutha",
      "Harshit Mutha runs paid ad campaigns on ChatGPT, Perplexity, and AI platforms for B2B brands in the US, UK, and Australia. Retainers from $1,000/month. Book a call.",
      "/chatgpt-ads"
    );
    return () => { clearInterval(toastTimer); document.body.style.overflow = "hidden"; document.body.style.height = ""; };
  }, []);

  const faqs = [
    { q: "What platforms do you run ads on?", a: "Primarily ChatGPT (via OpenAI's ad platform) and Perplexity. As other AI platforms open up advertising inventory, I add those to the mix based on what makes sense for your audience." },
    { q: "How is this different from Google or Meta Ads?", a: "Google and Meta target based on who someone is. ChatGPT and Perplexity target based on what someone is actively asking — right now. That's a fundamentally different (and higher) level of intent." },
    { q: "Do I need to already be running paid ads?", a: "Not necessarily. But you'll get more out of this if you already have a tested offer and some sense of what messaging converts. We can figure that out together on the call." },
    { q: "What results can I expect?", a: "I won't throw fake numbers at you. CPCs are currently well below Google and Meta, and intent is high. We set clear benchmarks in the first 30 days and go from there." },
    { q: "Where are you based and who do you work with?", a: "I'm based in India and work with clients in the US, UK, and Australia. All billing, reporting, and communication is in USD." },
    { q: "How do I get started?", a: "Book a free 30-minute call. We'll look at your offer, current ads, and I'll tell you straight whether ChatGPT Ads make sense for you right now." },
  ];

  return (
    <div className="ca-wrap">

      {/* ── NAV ── */}
      <nav className="ca-nav">
        <Link to="/" className="ca-logo">HM</Link>
        <div className="ca-nav-right">
          <Link to="/" className="ca-nav-link">Portfolio</Link>
          <a href="https://calendly.com/hv1138769/30min" target="_blank" rel="noreferrer" className="ca-nav-cta">Book a Free Call</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="ca-hero">
        <div className="ca-hero-inner">
          <div className="ca-hero-tag">
            <span className="ca-tag-dot"></span>
            Available for new clients · India-based · Serving US, UK & AU
          </div>
          <h1>Your competitors aren't<br /><span className="ca-hero-accent">on ChatGPT yet.</span><br />You should be.</h1>
          <p className="ca-subhead">I run paid ads on ChatGPT, Perplexity, and AI-native platforms — where your buyers are asking questions right now, and nobody's competing for their attention yet.</p>

          <div className="ca-hero-actions">
            <a href="https://calendly.com/hv1138769/30min" target="_blank" rel="noreferrer" className="ca-cta">Book a FREE 30-Min Call →</a>
            <p className="ca-no-lockin">No pitch deck. No pressure. Just an honest conversation.</p>
          </div>

          <div className="ca-hero-card">
            <div className="ca-avatar">HM</div>
            <div className="ca-hero-bio">
              <strong>Harshit Mutha</strong>
              <span>AI Ads Expert · ChatGPT Ads Specialist</span>
            </div>
            <div className="ca-hero-badge-live">
              <span className="ca-live-dot"></span> Taking new clients
            </div>
          </div>

          <Link to="/" className="ca-portfolio-link">Want to see my full background? View Portfolio →</Link>
        </div>
      </section>

      {/* ── TRUST ── */}
      <TrustSection variant="dark" showClients={true} />

      {/* ── WHY CHATGPT ADS ── */}
      <section className="ca-section">
        <div className="ca-container">
          <div className="ca-section-tag">The Opportunity</div>
          <h2 ref={r1} className="reveal">Honestly? Most brands are<br />leaving money on the table.</h2>
          <p className="ca-lead-text">While everyone's fighting over the same crowded Google and Meta auctions — pushing CPCs up, returns down — there's an entirely new channel where buyers are typing in exactly what they need. And the ads? Almost nobody's there yet.</p>
          <div ref={rCards} className="ca-cards stagger">
            <div className="ca-card ca-card-accent">
              <div className="ca-card-icon">🎯</div>
              <h4>Intent you can't buy on Google</h4>
              <p>When someone types "best B2B CRM for 50-person team" into ChatGPT — that's not a browse. That's a decision in progress.</p>
            </div>
            <div className="ca-card">
              <div className="ca-card-icon">💸</div>
              <h4>~70% lower CPCs right now</h4>
              <p>The auction isn't competitive yet. The brands in now are paying a fraction of Google rates — for better-qualified clicks.</p>
            </div>
            <div className="ca-card">
              <div className="ca-card-icon">⏳</div>
              <h4>This window won't stay open</h4>
              <p>More agencies will figure this out. The brands moving now will have data, campaigns, and positioning before it gets crowded.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="ca-section ca-section-alt">
        <div className="ca-container">
          <div className="ca-section-tag">How It Stacks Up</div>
          <h2 ref={r2} className="reveal">ChatGPT Ads vs the channels<br />you're already running</h2>
          <div className="ca-compare">
            <div className="ca-compare-table">
              <div className="ca-compare-header">
                <div></div>
                <div className="ca-compare-col ca-compare-winner">ChatGPT Ads</div>
                <div className="ca-compare-col">Google Ads</div>
                <div className="ca-compare-col">Meta Ads</div>
              </div>
              {[
                ["User intent", "🟢 Actively asking", "🟡 Searching", "🔴 Scrolling"],
                ["Competition level", "🟢 Low (now)", "🔴 Very high", "🔴 Very high"],
                ["Cost per click", "🟢 Low", "🔴 High", "🟡 Medium"],
                ["Audience targeting", "🟢 Query-based", "🟡 Keyword", "🟡 Interest"],
                ["First-mover advantage", "🟢 Yes — right now", "🔴 Gone", "🔴 Gone"],
              ].map(([label, ai, google, meta]) => (
                <div className="ca-compare-row" key={label}>
                  <div className="ca-compare-label">{label}</div>
                  <div className="ca-compare-col ca-compare-winner">{ai}</div>
                  <div className="ca-compare-col">{google}</div>
                  <div className="ca-compare-col">{meta}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO I WORK WITH ── */}
      <section className="ca-section">
        <div className="ca-container">
          <div className="ca-section-tag">Is This For You?</div>
          <h2 ref={r3} className="reveal">I work best with brands who<br />already know their offer works.</h2>
          <div className="ca-fit-grid">
            <div className="ca-fit-card ca-fit-yes">
              <div className="ca-fit-icon">✓</div>
              <h4>Good fit</h4>
              <ul>
                <li>Spending $2K–$20K/month on Meta or Google</li>
                <li>B2B with a clear, specific offer</li>
                <li>Seeing returns decline on current channels</li>
                <li>Ready to test a new acquisition channel</li>
                <li>US, UK, or Australia based (or targeting those markets)</li>
              </ul>
            </div>
            <div className="ca-fit-card ca-fit-no">
              <div className="ca-fit-icon">✗</div>
              <h4>Not the right fit</h4>
              <ul>
                <li>Still figuring out your positioning</li>
                <li>Looking for quick-fix guaranteed results</li>
                <li>Less than $500/month ad budget</li>
                <li>No existing offer or product-market fit</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section className="ca-section ca-section-alt">
        <div className="ca-container">
          <div className="ca-section-tag">The Service</div>
          <h2 ref={r4} className="reveal">Everything from strategy to<br />weekly reporting — handled.</h2>
          <div className="ca-services-grid">
            <div className="ca-service-card">
              <div className="ca-service-num">01</div>
              <h4>Strategy & Audience Mapping</h4>
              <p>I audit your offer, your competitors, and map the exact queries your buyers are typing into ChatGPT and Perplexity. No guessing — we target real demand.</p>
            </div>
            <div className="ca-service-card">
              <div className="ca-service-num">02</div>
              <h4>AI-Native Creative</h4>
              <p>ChatGPT ads need to sound like the platform — conversational, helpful, contextual. I write copy specifically built for how people interact with AI answers.</p>
            </div>
            <div className="ca-service-card">
              <div className="ca-service-num">03</div>
              <h4>Campaign Management</h4>
              <p>Full end-to-end setup and management. I run your campaigns, test creatives, optimise bids, and handle everything technical — so you don't have to.</p>
            </div>
            <div className="ca-service-card">
              <div className="ca-service-num">04</div>
              <h4>Weekly Reporting</h4>
              <p>Every week: what ran, what converted, what we're changing next. No dashboards full of vanity metrics. Just clear numbers and next steps.</p>
            </div>
          </div>
          <div className="ca-cta-block">
            <a href="https://calendly.com/hv1138769/30min" target="_blank" rel="noreferrer" className="ca-cta">Book a FREE Call →</a>
            <p className="ca-no-lockin">No lock-in. Cancel anytime.</p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="ca-section">
        <div className="ca-container">
          <div className="ca-section-tag">The Process</div>
          <h2 ref={r5} className="reveal">From first call to live<br />campaigns in under 2 weeks.</h2>
          <div ref={rSteps} className="ca-steps-new stagger">
            <div className="ca-step-new">
              <div className="ca-step-circle">01</div>
              <div className="ca-step-line"></div>
              <h4>Discovery Call <span>30 min</span></h4>
              <p>We look at your offer, your current ads, and your goals. I'll tell you honestly whether ChatGPT Ads are the right move — and what to realistically expect.</p>
            </div>
            <div className="ca-step-new">
              <div className="ca-step-circle">02</div>
              <div className="ca-step-line"></div>
              <h4>Strategy & Setup <span>5–7 days</span></h4>
              <p>Audience mapping, ad copy, campaign setup. Everything built to match the conversational context of AI platforms — not just adapted from Google.</p>
            </div>
            <div className="ca-step-new">
              <div className="ca-step-circle ca-step-last">03</div>
              <div className="ca-step-line ca-step-line-hidden"></div>
              <h4>Launch & Optimise <span>Ongoing</span></h4>
              <p>Go live. Weekly reports. Ongoing creative testing and bid optimisation. You always know exactly what's working and what we're testing next.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="ca-section ca-section-dark">
        <div className="ca-container">
          <div ref={rStats} className="ca-stats-new stagger">
            <div className="ca-stat-new">
              <h3>100M+</h3>
              <p>ChatGPT weekly active users</p>
              <span>and growing every month</span>
            </div>
            <div className="ca-stat-divider"></div>
            <div className="ca-stat-new">
              <h3>~70%</h3>
              <p>Lower CPCs vs Google</p>
              <span>on AI platform campaigns</span>
            </div>
            <div className="ca-stat-divider"></div>
            <div className="ca-stat-new">
              <h3>2025</h3>
              <p>The window is open</p>
              <span>but it won't stay that way</span>
            </div>
            <div className="ca-stat-divider"></div>
            <div className="ca-stat-new">
              <h3>$1K</h3>
              <p>Starting retainer</p>
              <span>No lock-in on first month</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="ca-section">
        <div className="ca-container">
          <div className="ca-section-tag">Transparent Pricing</div>
          <h2 ref={r6} className="reveal">Simple. No surprises.</h2>
          <div className="ca-pricing-new">
            <div className="ca-price-new">
              <div className="ca-price-top">
                <div>
                  <p className="ca-price-label">Monthly Retainer</p>
                  <h3>$1,000 <span>— $2,000</span></h3>
                  <p className="ca-price-sub">Depending on campaign complexity and number of platforms</p>
                </div>
                <div className="ca-price-tag">Most popular</div>
              </div>
              <ul className="ca-price-list">
                <li>✓ Full campaign strategy & setup</li>
                <li>✓ AI-native ad creative writing & testing</li>
                <li>✓ ChatGPT + Perplexity campaign management</li>
                <li>✓ Weekly performance report</li>
                <li>✓ Ad spend in your own account — full transparency</li>
                <li>✓ No lock-in contract on first engagement</li>
              </ul>
              <a href="https://calendly.com/hv1138769/30min" target="_blank" rel="noreferrer" className="ca-cta ca-cta-full">Book a FREE 30-Min Call →</a>
              <p className="ca-no-lockin">Cancel anytime. I'd rather earn the retainer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="ca-section ca-section-alt">
        <div className="ca-container">
          <div className="ca-section-tag">Questions</div>
          <h2 ref={r7} className="reveal">Things people usually ask<br />before booking a call</h2>
          <div className="ca-faq-new">
            {faqs.map((faq, i) => (
              <div key={i} className={`ca-faq-item-new ${openFaq === i ? "open" : ""}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="ca-faq-q-new">
                  <span>{faq.q}</span>
                  <div className="ca-faq-icon">{openFaq === i ? "−" : "+"}</div>
                </div>
                {openFaq === i && <p className="ca-faq-a-new">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="ca-cta-final">
        <div className="ca-container">
          <div className="ca-cta-final-inner">
            <div className="ca-avatar ca-avatar-lg">HM</div>
            <h2>Let's talk about your brand.</h2>
            <p>30 minutes. I'll look at what you're running now, what's not working, and tell you honestly whether ChatGPT Ads are the right next move. No decks. No sales pitch.</p>
            <a href="https://calendly.com/hv1138769/30min" target="_blank" rel="noreferrer" className="ca-cta ca-cta-lg">Book a FREE 30-Min Call →</a>
            <p className="ca-no-lockin">No lock-in. Cancel anytime. Billing in USD.</p>
          </div>
        </div>
      </section>

      {/* Toast */}
      <div className={`ca-toast ${showToast ? "ca-toast-show" : ""}`}>
        <div className="ca-toast-inner">
          <div className="ca-toast-avatar">HM</div>
          <div className="ca-toast-text">
            <strong>Harshit Mutha</strong>
            <span>Want to see my full portfolio?</span>
          </div>
          <Link to="/" className="ca-toast-btn" onClick={() => setShowToast(false)}>Visit →</Link>
          <button className="ca-toast-close" onClick={() => setShowToast(false)}>✕</button>
        </div>
      </div>

      <BookingModal />

      <footer className="ca-footer">
        <Link to="/">← harshitmutha.digital</Link>
        <p>© 2026 Harshit Mutha · AI Ads Expert</p>
      </footer>

    </div>
  );
};

export default ChatGPTAds;
