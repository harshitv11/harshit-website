import { useEffect, useState } from "react";
import "./styles/BookingModal.css";

interface BookingModalProps {
  delay?: number;
}

const BookingModal = ({ delay = 60 }: BookingModalProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("hm_modal_dismissed")) return;
    const timer = setTimeout(() => setShow(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("hm_modal_dismissed", "yes");
  };

  if (!show) return null;

  return (
    <div className="bm-overlay" onClick={dismiss}>
      <div className="bm-modal" onClick={(e) => e.stopPropagation()}>

        <button className="bm-close" onClick={dismiss}>✕</button>

        {/* Top row — avatar + badge */}
        <div className="bm-top">
          <div className="bm-avatar-sm">HM</div>
          <div className="bm-badge">
            <span className="bm-dot"></span> Free · 30 min · No pressure
          </div>
        </div>

        {/* Copy */}
        <h2>Get your ads strategy<br />&amp; campaign ready.</h2>
        <p>Book a free call with Harshit — walk away with a clear plan for your ChatGPT Ads, whether you work with me or not.</p>

        {/* Trust row */}
        <div className="bm-trust-row">
          <span>✓ No pitch</span>
          <span>✓ Honest advice</span>
          <span>✓ 100% free</span>
        </div>

        {/* CTA */}
        <a href="https://calendly.com/hv1138769/30min" target="_blank" rel="noreferrer" className="bm-cta" onClick={dismiss}>
          Book a FREE 30-Min Call →
        </a>
        <p className="bm-no-lockin">No commitment. Cancel anytime.</p>

        <button className="bm-skip" onClick={dismiss}>Not right now</button>

      </div>
    </div>
  );
};

export default BookingModal;
