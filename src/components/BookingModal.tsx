import { useEffect, useState } from "react";
import "./styles/BookingModal.css";

interface BookingModalProps {
  delay?: number; // seconds before showing
}

const BookingModal = ({ delay = 15 }: BookingModalProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Don't show if dismissed this session
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

        {/* Close */}
        <button className="bm-close" onClick={dismiss}>✕</button>

        {/* Top badge */}
        <div className="bm-badge">
          <span className="bm-dot"></span> Limited spots available this month
        </div>

        {/* Avatar */}
        <div className="bm-avatar">HM</div>

        {/* Copy */}
        <h2>Let's talk about<br />your ad strategy.</h2>
        <p>Book a free 30-minute call with Harshit. We'll look at what you're running, what's not working, and whether ChatGPT Ads are the right next move.</p>

        {/* Trust bullets */}
        <ul className="bm-bullets">
          <li>✓ No pitch deck. No sales pressure.</li>
          <li>✓ Honest advice — even if it's "not yet"</li>
          <li>✓ 100% free. 30 minutes.</li>
        </ul>

        {/* CTA */}
        <a
          href="https://calendly.com"
          target="_blank"
          rel="noreferrer"
          className="bm-cta"
          onClick={dismiss}
        >
          Book a FREE 30-Min Call →
        </a>
        <p className="bm-no-lockin">No commitment. Cancel anytime.</p>

        <button className="bm-skip" onClick={dismiss}>
          Not right now
        </button>

      </div>
    </div>
  );
};

export default BookingModal;
