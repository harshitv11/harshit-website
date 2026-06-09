import { useEffect, useState } from "react";
import "./styles/BookingModal.css";

type Phase = "hidden" | "center" | "side";

const BookingModal = () => {
  const [phase, setPhase] = useState<Phase>("hidden");
  const [sideExpanded, setSideExpanded] = useState(false);

  useEffect(() => {
    // Show centre modal after 15 seconds
    const timer = setTimeout(() => setPhase("center"), 15000);
    return () => clearTimeout(timer);
  }, []);

  const dismissCenter = () => {
    // Move from centre to side widget
    setPhase("side");
  };

  const dismissSide = () => {
    setPhase("hidden");
  };

  if (phase === "hidden") return null;

  /* ── Centre modal ── */
  if (phase === "center") {
    return (
      <div className="bm-overlay" onClick={dismissCenter}>
        <div className="bm-modal" onClick={(e) => e.stopPropagation()}>
          <button className="bm-close" onClick={dismissCenter}>✕</button>

          <div className="bm-top">
            <div className="bm-avatar-sm">HM</div>
            <div className="bm-badge">
              <span className="bm-dot"></span> Free · 30 min · No pressure
            </div>
          </div>

          <h2>Get your ads strategy<br />&amp; campaign ready.</h2>
          <p>Book a free call with Harshit — walk away with a clear plan for your ChatGPT Ads, whether you work with me or not.</p>

          <div className="bm-trust-row">
            <span>✓ No pitch</span>
            <span>✓ Honest advice</span>
            <span>✓ 100% free</span>
          </div>

          <a href="https://calendly.com/hv1138769/30min" target="_blank" rel="noreferrer" className="bm-cta" onClick={dismissCenter}>
            Book a FREE 30-Min Call →
          </a>
          <p className="bm-no-lockin">No commitment. Cancel anytime.</p>

          <button className="bm-skip" onClick={dismissCenter}>Not right now</button>
        </div>
      </div>
    );
  }

  /* ── Side widget ── */
  return (
    <div className={`bm-side ${sideExpanded ? "bm-side-expanded" : ""}`}>
      <button className="bm-side-dismiss" onClick={dismissSide} title="Close">✕</button>

      {sideExpanded ? (
        <div className="bm-side-card">
          <div className="bm-top" style={{ marginBottom: 12 }}>
            <div className="bm-avatar-sm">HM</div>
            <div className="bm-badge">
              <span className="bm-dot"></span> Free · 30 min
            </div>
          </div>
          <p style={{ fontSize: 13, color: "#334155", margin: "0 0 14px", lineHeight: 1.5 }}>
            Get a free ChatGPT Ads strategy call with Harshit.
          </p>
          <a href="https://calendly.com/hv1138769/30min" target="_blank" rel="noreferrer" className="bm-cta">
            Book Free Call →
          </a>
          <button className="bm-skip" onClick={() => setSideExpanded(false)} style={{ display: "block", width: "100%", marginTop: 8 }}>
            Minimise
          </button>
        </div>
      ) : (
        <button className="bm-side-tab" onClick={() => setSideExpanded(true)}>
          <div className="bm-avatar-sm" style={{ width: 32, height: 32, fontSize: 11 }}>HM</div>
          <span>Book Free Call</span>
          <span className="bm-dot" style={{ marginLeft: "auto" }}></span>
        </button>
      )}
    </div>
  );
};

export default BookingModal;
