import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ChatGPTAds.css";

const ChatGPTAds = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Meta
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

    // Schema — Service
    const s1 = document.createElement("script");
    s1.id = "schema-chatgpt-service";
    s1.type = "application/ld+json";
    s1.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "ChatGPT Ads Management",
      "provider": { "@type": "Person", "name": "Harshit Mutha", "url": "https://www.harshitmutha.digital" },
      "description": "ChatGPT Ads and AI platform advertising management for B2B brands in the US, UK, and Australia. Includes strategy, creative, campaign management, and reporting.",
      "areaServed": ["US", "GB", "AU"],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": "1000",
        "priceSpecification": { "@type": "UnitPriceSpecification", "price": "1000", "priceCurrency": "USD", "unitText": "MONTH" }
      },
      "serviceType": "AI Platform Advertising"
    });
    document.head.appendChild(s1);

    // Schema — FAQPage
    const s2 = document.createElement("script");
    s2.id = "schema-chatgpt-faq";
    s2.type = "application/ld+json";
    s2.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "What platforms do you run ChatGPT Ads on?", "acceptedAnswer": { "@type": "Answer", "text": "Primarily ChatGPT (via OpenAI's ad platform) and Perplexity. As other AI platforms open up advertising inventory, I add those to the mix based on relevance to your audience." } },
        { "@type": "Question", "name": "How is ChatGPT advertising different from Google or Meta Ads?", "acceptedAnswer": { "@type": "Answer", "text": "Google and Meta target users based on demographics, interests, and browsing behaviour. ChatGPT and Perplexity target users at the exact moment they ask a question your product answers. The intent is higher and the competition is lower." } },
        { "@type": "Question", "name": "How much does ChatGPT Ads management cost?", "acceptedAnswer": { "@type": "Answer", "text": "Retainers start at $1,000/month and scale to $2,000/month depending on campaign complexity. Ad spend is separate and managed in your own ad account." } },
        { "@type": "Question", "name": "Who is this ChatGPT Ads service for?", "acceptedAnswer": { "@type": "Answer", "text": "B2B business owners and personal brand operators in the US, UK, and Australia spending $2,000–$20,000/month on Meta or Google who want to reach a high-intent audience on AI platforms before the market gets crowded." } }
      ]
    });
    document.head.appendChild(s2);

    return () => {
      document.getElementById("schema-chatgpt-service")?.remove();
      document.getElementById("schema-chatgpt-faq")?.remove();
    };
  }, []);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

      {/* Hero */}
      <section className="ca-hero">
        <div className="ca-hero-inner">
          <span className="ca-badge">ChatGPT Ads Expert</span>
          <h1>ChatGPT Ads Expert<br />for B2B Brands</h1>
          <p className="ca-subhead">Most brands are still fighting over the same Google and Meta inventory. I run ads where your competitors haven't shown up yet — ChatGPT, Perplexity, and AI-native platforms.</p>
          <a href="https://calendly.com" target="_blank" rel="noreferrer" className="ca-cta">Book a Call →</a>
        </div>
      </section>

      {/* Section 1 */}
      <section className="ca-section">
        <div className="ca-container">
          <h2>What Are ChatGPT Ads?</h2>
          <p>ChatGPT Ads are sponsored placements inside ChatGPT's interface — appearing when users ask questions relevant to your product or service. Unlike Google, where users are browsing, or Meta, where they're scrolling, ChatGPT users are in active problem-solving mode.</p>
          <p>They've typed a specific question. They want a specific answer. That's a higher-intent audience than almost any other paid channel right now.</p>
          <p>Perplexity Ads work the same way — your brand appears inside AI-generated answers to queries your customers are already searching for.</p>
          <div className="ca-cards">
            <div className="ca-card"><div className="ca-card-icon">🎯</div><h4>Higher Intent</h4><p>Users are actively solving a problem — not passively scrolling</p></div>
            <div className="ca-card"><div className="ca-card-icon">💰</div><h4>Lower CPCs</h4><p>The auction isn't competitive yet — costs are a fraction of Google</p></div>
            <div className="ca-card"><div className="ca-card-icon">🚀</div><h4>First-Mover Edge</h4><p>Be in the channel before your competitors even know it exists</p></div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="ca-section ca-section-alt">
        <div className="ca-container">
          <h2>Who I Work With</h2>
          <p>I work with B2B business owners and personal brand operators in the US, UK, and Australia who:</p>
          <ul className="ca-list">
            <li>Are spending $2,000–$20,000/month on Meta or Google and seeing returns decline</li>
            <li>Want to reach a high-intent audience before AI advertising gets crowded</li>
            <li>Have a clear offer and need a new acquisition channel that actually converts</li>
          </ul>
          <p className="ca-note">This is not for brands still figuring out their positioning. If you have a working offer and want to test a channel with genuine first-mover advantage, that's who I'm built for.</p>
        </div>
      </section>

      {/* Section 3 */}
      <section className="ca-section">
        <div className="ca-container">
          <h2>What the Service Includes</h2>
          <div className="ca-services">
            <div className="ca-service-item"><h4>Strategy</h4><p>Every campaign starts with an audit of your offer, audience, and current ad performance. I map the exact queries your buyers are asking on ChatGPT and Perplexity, then build a targeting strategy around those moments.</p></div>
            <div className="ca-service-item"><h4>Creative</h4><p>AI platform ads require a different creative approach than Meta or Google. Copy needs to match the conversational context of the platform — I write and test ad copy built specifically for how people interact with AI answers.</p></div>
            <div className="ca-service-item"><h4>Campaign Management</h4><p>I set up, launch, and manage your campaigns end-to-end. Weekly performance reviews, ongoing creative testing, and clear reporting — no black boxes.</p></div>
            <div className="ca-service-item"><h4>Reporting</h4><p>You get a straightforward report each week: what ran, what converted, what we're testing next. No vanity metrics.</p></div>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="ca-section ca-section-alt">
        <div className="ca-container">
          <h2>Why ChatGPT Ads in 2025</h2>
          <p>AI search is growing faster than any channel since mobile. ChatGPT hit 100 million weekly active users in 2023 — that number has continued climbing. Perplexity is processing hundreds of millions of queries per month.</p>
          <p>The brands advertising there today are paying a fraction of what Google and Meta cost per click, because the auction is not yet competitive.</p>
          <p>That window closes as more agencies figure this out. The brands that move now will have performance data, optimised campaigns, and category positioning before the market gets crowded.</p>
          <div className="ca-stats">
            <div className="ca-stat"><h3>100M+</h3><p>ChatGPT weekly active users</p></div>
            <div className="ca-stat"><h3>~70%</h3><p>Lower CPCs vs Google on average</p></div>
            <div className="ca-stat"><h3>2025</h3><p>The window is open — for now</p></div>
          </div>
        </div>
      </section>

      {/* Section 5 — Pricing */}
      <section className="ca-section">
        <div className="ca-container">
          <h2>Pricing</h2>
          <div className="ca-pricing">
            <div className="ca-price-card">
              <h3>From <span>$1,000</span><small>/month</small></h3>
              <p>Retainers start at $1,000/month and scale to $2,000/month depending on campaign complexity and platforms covered.</p>
              <ul className="ca-list">
                <li>No long-term lock-in on the first engagement</li>
                <li>Ad spend is separate — managed in your own account</li>
                <li>I'd rather earn the retainer than lock you in</li>
              </ul>
              <a href="https://calendly.com" target="_blank" rel="noreferrer" className="ca-cta">Book a Call →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 — FAQ */}
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

      {/* CTA */}
      <section className="ca-section ca-cta-section">
        <div className="ca-container ca-cta-inner">
          <h2>Book a Call</h2>
          <p>30 minutes. We look at your current setup, your offer, and whether ChatGPT Ads make sense for your business right now.</p>
          <p className="ca-note">No pitch deck. No sales pressure. If it's not the right fit, I'll tell you.</p>
          <a href="https://calendly.com" target="_blank" rel="noreferrer" className="ca-cta ca-cta-lg">Book a Call →</a>
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

import { useState } from "react";
export default ChatGPTAds;
