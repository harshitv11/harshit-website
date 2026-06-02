import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ChatGPTAds.css";
import { useScrollReveal } from "../hooks/useScrollReveal";

const ChatGPTAds = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const r1 = useScrollReveal();
  const r2 = useScrollReveal();
  const r3 = useScrollReveal();
  const r4 = useScrollReveal();
  const r5 = useScrollReveal();
  const r6 = useScrollReveal();
  const r7 = useScrollReveal();
  const r8 = useScrollReveal();
  const rCards = useScrollReveal();
  const rSteps = useScrollReveal();
  const rResults = useScrollReveal();
  const rStats = useScrollReveal();

  useEffect(() => {
    // Unlock scroll — main site locks body overflow for GSAP smoother
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    window.scrollTo(0, 0);

    document.title = "ChatGPT Ads Expert — Run Ads on ChatGPT & AI Platforms | Harshit Mutha";
    const setTag = (attr: string, val: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${val}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, val); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setTag("name", "description", "Harshit Mutha runs paid ad campaigns on ChatGPT, Perplexity, and AI platforms for B2B brands in the US, UK, and Australia. Retainers from $1,000/month. Book a call.");
    setTag("property", "og:title", "ChatGPT Ads Expert — Run Ads on ChatGPT & AI Platforms | Harshit Mutha");
    setTag("property", "og:url", "https://www.harshitmutha.digital/chatgpt-ads");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://www.harshitmutha.digital/chatgpt-ads";

    const s1 = document.createElement("script");
    s1.id = "schema-chatgpt-service";
    s1.type = "application/ld+json";
    s1.text = JSON.stringify({
      "@context": "https://schema.org", "@type": "Service",
      "name": "ChatGPT Ads Management",
      "provider": { "@type": "Person", "name": "Harshit Mutha", "url": "https://www.harshitmutha.digital" },
      "description": "ChatGPT Ads and AI platform advertising management for B2B brands in the US, UK, and Australia.",
      "areaServed": ["US", "GB", "AU"],
      "offers": { "@type": "Offer", "priceCurrency": "USD", "price": "1000", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "1000", "priceCurrency": "USD", "unitText": "MONTH" } },
      "serviceType": "AI Platform Advertising"
    });
    document.head.appendChild(s1);

    const s2 = document.createElement("script");
    s2.id = "schema-chatgpt-faq";
    s2.type = "application/ld+json";
    s2.text = JSON.stringify({
      "@context": "https://schema.org", "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "What platforms do you run ChatGPT Ads on?", "acceptedAnswer": { "@type": "Answer", "text": "Primarily ChatGPT (via OpenAI's ad platform) and Perplexity. As other AI platforms open up advertising inventory, I add those to the mix based on relevance to your audience." } },
        { "@type": "Question", "name": "How is ChatGPT advertising different from Google or Meta Ads?", "acceptedAnswer": { "@type": "Answer", "text": "Google and Meta target users based on demographics, interests, and browsing behaviour. ChatGPT and Perplexity target users at the exact moment they ask a question your product answers. The intent is higher and the competition is lower." } },
        { "@type": "Question", "name": "How much does ChatGPT Ads management cost?", "acceptedAnswer": { "@type": "Answer", "text": "Retainers start at $1,000/month and scale to $2,000/month depending on campaign complexity. Ad spend is separate and managed in your own ad account." } },
        { "@type": "Question", "name": "Who is this ChatGPT Ads service for?", "acceptedAnswer": { "@type": "Answer", "text": "B2B business owners and personal brand operators in the US, UK, and Australia spending $2,000–$20,000/month on Meta or Google who want to reach a high-intent audience on AI platforms before the market gets crowded." } }
      ]
    });
    document.head.appendChild(s2);

    return () => {
      // Restore when leaving page
      document.body.style.overflow = "hidden";
      document.body.style.height = "";
      document.getElementById("schema-chatgpt-service")?.remove();
      document.getElementById("schema-chatgpt-faq")?.remove();
    };
  }, []);

  const faqs = [
    { q: "What platforms do you run ads on?", a: "Primarily ChatGPT (via OpenAI's ad platform) and Perplexity. As other AI platforms open up advertising inventory, I add those to the mix based on relevance to your audience." },
    { q: "How is this different from Google or Meta Ads?", a: "Google and Meta target users based on demographics, interests, and browsing behaviour. ChatGPT and Perplexity target users at the exact moment they ask a question your product answers. The intent is higher and the competition is lower — for now." },
    { q: "Do I need to already be running paid ads?", a: "Not necessarily, but it helps if you have some data on what messaging converts for your offer. I can work with brands newer to paid ads, but you'll get more out of this if you have a tested offer." },
    { q: "What results can I expect?", a: "I won't promise specific numbers before seeing your offer and audience. What I can tell you is that CPCs on AI platforms are currently well below Google and Meta equivalents, and conversion rates for high-intent queries are strong. We'll set clear benchmarks in the first 30 days." },
    { q: "Where are you based and who do you work with?", a: "I'm based in India and work exclusively with clients in the US, UK, and Australia. All reporting, communication, and billing is in USD." },
    { q: "How do I get started?", a: "Book a call below. We'll spend 30 minutes looking at your offer, current ad performance, and whether AI platform advertising is the right next move." },
  ];

  return (
    <div className="ca-wrap">

      {/* Nav */}
      <nav className="ca-nav">
        <Link to="/" className="ca-logo">HM</Link>
        <Link to="/" className="ca-back">← Home</Link>
      </nav>

      {/* ── HERO ── */}
      <section className="ca-hero">
        <div className="ca-hero-inner">
          <span className="ca-badge">ChatGPT Ads Expert</span>
          <h1>ChatGPT Ads Expert<br />for B2B Brands</h1>
          <p className="ca-subhead">Most brands are still fighting over the same Google and Meta inventory. I run ads where your competitors haven't shown up yet — ChatGPT, Perplexity, and AI-native platforms.</p>

          {/* Portfolio link */}
          <p className="ca-portfolio-link">
            Want to see my full work and background?{" "}
            <Link to="/">View Portfolio →</Link>
          </p>

          {/* Photo below subheadline */}
          <div className="ca-hero-photo">
            <div className="ca-avatar">
              <div className="ca-avatar-fallback">HM</div>
            </div>
            <div className="ca-hero-bio">
              <strong>Harshit Mutha</strong>
              <span>AI Ads Expert · Based in India · Clients in US, UK & AU</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 1 — What Are ChatGPT Ads ── */}
      <section className="ca-section">
        <div className="ca-container">
          <h2 ref={r1} className="reveal">What Are ChatGPT Ads?</h2>
          <p>ChatGPT Ads are sponsored placements inside ChatGPT's interface — appearing when users ask questions relevant to your product or service. Unlike Google, where users are browsing, or Meta, where they're scrolling, ChatGPT users are in active problem-solving mode.</p>
          <p>They've typed a specific question. They want a specific answer. That's a higher-intent audience than almost any other paid channel right now.</p>
          <p>Perplexity Ads work the same way — your brand appears inside AI-generated answers to queries your customers are already searching for.</p>
          <div ref={rCards} className="ca-cards stagger">
            <div className="ca-card"><div className="ca-card-icon">🎯</div><h4>Higher Intent</h4><p>Users are actively solving a problem — not passively scrolling</p></div>
            <div className="ca-card"><div className="ca-card-icon">💰</div><h4>Lower CPCs</h4><p>The auction isn't competitive yet — costs are a fraction of Google</p></div>
            <div className="ca-card"><div className="ca-card-icon">🚀</div><h4>First-Mover Edge</h4><p>Be in the channel before your competitors even know it exists</p></div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — Who I Work With ── */}
      <section className="ca-section ca-section-alt">
        <div className="ca-container">
          <h2 ref={r2} className="reveal">Who I Work With</h2>
          <p>I work with B2B business owners and personal brand operators in the US, UK, and Australia who:</p>
          <ul className="ca-list">
            <li>Are spending $2,000–$20,000/month on Meta or Google and seeing returns decline</li>
            <li>Want to reach a high-intent audience before AI advertising gets crowded</li>
            <li>Have a clear offer and need a new acquisition channel that actually converts</li>
          </ul>
          <p className="ca-note">This is not for brands still figuring out their positioning. If you have a working offer and want to test a channel with genuine first-mover advantage, that's who I'm built for.</p>
        </div>
      </section>

      {/* ── SECTION 3 — What's Included ── */}
      <section className="ca-section">
        <div className="ca-container">
          <h2 ref={r3} className="reveal">What the Service Includes</h2>
          <div className="ca-services">
            <div className="ca-service-item"><h4>Strategy</h4><p>Every campaign starts with an audit of your offer, audience, and current ad performance. I map the exact queries your buyers are asking on ChatGPT and Perplexity, then build a targeting strategy around those moments.</p></div>
            <div className="ca-service-item"><h4>Creative</h4><p>AI platform ads require a different creative approach than Meta or Google. Copy needs to match the conversational context of the platform — I write and test ad copy built specifically for how people interact with AI answers.</p></div>
            <div className="ca-service-item"><h4>Campaign Management</h4><p>I set up, launch, and manage your campaigns end-to-end. Weekly performance reviews, ongoing creative testing, and clear reporting — no black boxes.</p></div>
            <div className="ca-service-item"><h4>Reporting</h4><p>You get a straightforward report each week: what ran, what converted, what we're testing next. No vanity metrics.</p></div>
          </div>

          {/* CTA after What's Included */}
          <div className="ca-cta-block">
            <a href="https://calendly.com" target="_blank" rel="noreferrer" className="ca-cta">Book a Call →</a>
            <p className="ca-no-lockin">No lock-in. Cancel anytime.</p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="ca-section ca-section-alt">
        <div className="ca-container">
          <h2 ref={r4} className="reveal">How It Works</h2>
          <div ref={rSteps} className="ca-steps stagger">
            <div className="ca-step">
              <div className="ca-step-num">01</div>
              <div className="ca-step-content">
                <h4>Discovery Call</h4>
                <p>30 minutes. We look at your offer, current ad performance, and target audience. I'll tell you honestly whether ChatGPT Ads are the right move right now — and what to expect.</p>
              </div>
            </div>
            <div className="ca-step-arrow">→</div>
            <div className="ca-step">
              <div className="ca-step-num">02</div>
              <div className="ca-step-content">
                <h4>Strategy & Setup</h4>
                <p>I build your targeting strategy, write the first batch of ad creative, set up your campaigns, and get everything ready to go live. This typically takes 5–7 days.</p>
              </div>
            </div>
            <div className="ca-step-arrow">→</div>
            <div className="ca-step">
              <div className="ca-step-num">03</div>
              <div className="ca-step-content">
                <h4>Launch & Weekly Reporting</h4>
                <p>Campaigns go live. You get a clear weekly report: what ran, what converted, what we're testing next. Ongoing optimisation every week — no set-and-forget.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BY THE NUMBERS ── */}
      <section className="ca-section">
        <div className="ca-container">
          <h2 ref={r5} className="reveal">By The Numbers</h2>
          <p className="ca-section-sub">Results from campaigns run on AI platforms. <em>(Real numbers — updated as campaigns complete.)</em></p>
          <div ref={rResults} className="ca-results stagger">
            <div className="ca-result-card">
              <h3>—</h3>
              <p>Average CPC reduction vs Google</p>
              <span>Placeholder — updating soon</span>
            </div>
            <div className="ca-result-card">
              <h3>—</h3>
              <p>Qualified leads generated</p>
              <span>Placeholder — updating soon</span>
            </div>
            <div className="ca-result-card">
              <h3>—</h3>
              <p>Months average client retention</p>
              <span>Placeholder — updating soon</span>
            </div>
            <div className="ca-result-card">
              <h3>$1K–$2K</h3>
              <p>Monthly retainer range</p>
              <span>No lock-in on first engagement</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY NOW ── */}
      <section className="ca-section ca-section-alt">
        <div className="ca-container">
          <h2 ref={r6} className="reveal">Why ChatGPT Ads in 2025</h2>
          <p>AI search is growing faster than any channel since mobile. ChatGPT hit 100 million weekly active users in 2023 — that number has continued climbing. Perplexity is processing hundreds of millions of queries per month.</p>
          <p>The brands advertising there today are paying a fraction of what Google and Meta cost per click, because the auction is not yet competitive.</p>
          <p>That window closes as more agencies figure this out. The brands that move now will have performance data, optimised campaigns, and category positioning before the market gets crowded.</p>
          <div ref={rStats} className="ca-stats stagger">
            <div className="ca-stat"><h3>100M+</h3><p>ChatGPT weekly active users</p></div>
            <div className="ca-stat"><h3>~70%</h3><p>Lower CPCs vs Google on average</p></div>
            <div className="ca-stat"><h3>2025</h3><p>The window is open — for now</p></div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="ca-section">
        <div className="ca-container">
          <h2 ref={r7} className="reveal">Pricing</h2>
          <div ref={r8} className="ca-pricing reveal">
            <div className="ca-price-card">
              <h3>From <span>$1,000</span><small>/month</small></h3>
              <p>Retainers start at $1,000/month and scale to $2,000/month depending on campaign complexity and platforms covered.</p>
              <ul className="ca-list">
                <li>No long-term lock-in on the first engagement</li>
                <li>Ad spend is separate — managed in your own account</li>
                <li>I'd rather earn the retainer than lock you in</li>
              </ul>
              <a href="https://calendly.com" target="_blank" rel="noreferrer" className="ca-cta">Book a Call →</a>
              <p className="ca-no-lockin">No lock-in. Cancel anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="ca-section ca-section-alt">
        <div className="ca-container">
          <h2>Frequently Asked Questions</h2>
          <div className="ca-faq">
            {faqs.map((faq, i) => (
              <div key={i} className={`ca-faq-item ${openFaq === i ? "open" : ""}`}>
                <button className="ca-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <span>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <p className="ca-faq-a">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="ca-section ca-cta-section">
        <div className="ca-container ca-cta-inner">
          <h2>Book a Call</h2>
          <p>30 minutes. We look at your current setup, your offer, and whether ChatGPT Ads make sense for your business right now.</p>
          <p className="ca-note">No pitch deck. No sales pressure. If it's not the right fit, I'll tell you.</p>
          <a href="https://calendly.com" target="_blank" rel="noreferrer" className="ca-cta ca-cta-lg">Book a Call →</a>
          <p className="ca-no-lockin">No lock-in. Cancel anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="ca-footer">
        <Link to="/">← Back to harshitmutha.digital</Link>
        <p>© 2026 Harshit Mutha</p>
      </footer>

    </div>
  );
};

export default ChatGPTAds;
