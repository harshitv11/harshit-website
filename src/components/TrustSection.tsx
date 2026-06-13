import "./styles/TrustSection.css";

const reviewPlatforms = [
  { name: "Google", rating: "5.0", color: "#4285F4", bg: "#EBF2FF" },
  { name: "Clutch", rating: "5.0", color: "#FF3D2E", bg: "#FFF0EF" },
  { name: "Trustpilot", rating: "4.9", color: "#00B67A", bg: "#EDFAF4" },
  { name: "G2", rating: "4.8", color: "#FF492C", bg: "#FFF1EF" },
  { name: "GoodFirms", rating: "5.0", color: "#1A73E8", bg: "#EBF3FF" },
];

interface TrustSectionProps {
  variant?: "light" | "dark";
}

const Stars = () => (
  <div className="ts-stars">★★★★★</div>
);

const TrustSection = ({ variant = "light" }: TrustSectionProps) => {
  const isDark = variant === "dark";

  return (
    <section className={`ts-wrap ${isDark ? "ts-dark" : "ts-light"}`}>

      {/* Top label */}
      <div className="ts-inner">
        <p className="ts-heading-label">
          {isDark ? "⭐ Reviewed & Trusted by Verified Experts" : "⭐ Reviewed & Trusted by Verified Experts"}
        </p>

        {/* Review platform badges */}
        <div className="ts-badges">
          {reviewPlatforms.map((p) => (
            <div
              className="ts-badge"
              key={p.name}
              style={{ background: isDark ? "rgba(255,255,255,0.1)" : p.bg, borderColor: isDark ? "rgba(255,255,255,0.2)" : p.bg }}
            >
              <span className="ts-badge-name" style={{ color: p.color }}>
                {p.name}
              </span>
              <Stars />
              <span className="ts-badge-rating" style={{ color: isDark ? "rgba(255,255,255,0.8)" : "#334155" }}>
                {p.rating} / 5.0
              </span>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};

export default TrustSection;
