import "./styles/TrustSection.css";

const reviewPlatforms = [
  { name: "Google", rating: "5.0", stars: 5, color: "#4285F4" },
  { name: "Clutch", rating: "5.0", stars: 5, color: "#FF3D2E" },
  { name: "Trustpilot", rating: "4.9", stars: 5, color: "#00B67A" },
  { name: "G2", rating: "4.8", stars: 5, color: "#FF492C" },
  { name: "GoodFirms", rating: "5.0", stars: 5, color: "#1A73E8" },
];

const clients = [
  "HOLA", "BlueDove", "Hosachiguru", "Shreemeera",
  "MicroGenesis", "Prema Consulting", "Indus Intex", "Brand X",
];

interface TrustSectionProps {
  variant?: "light" | "dark";
  showClients?: boolean;
}

const Stars = ({ count }: { count: number }) => (
  <div className="trust-stars">
    {[...Array(count)].map((_, i) => (
      <span key={i}>★</span>
    ))}
  </div>
);

const TrustSection = ({ variant = "light", showClients = true }: TrustSectionProps) => {
  return (
    <div className={`trust-wrap trust-${variant}`}>

      {/* Review Platforms */}
      <div className="trust-container">
        <p className="trust-label">Reviewed by Verified Experts</p>
        <div className="trust-badges">
          {reviewPlatforms.map((p) => (
            <div className="trust-badge" key={p.name}>
              <span className="trust-badge-name" style={{ color: variant === "dark" ? "#fff" : p.color }}>
                {p.name}
              </span>
              <Stars count={p.stars} />
              <span className="trust-badge-rating">{p.rating}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Client Logos */}
      {showClients && (
        <div className="trust-clients-wrap">
          <p className="trust-label">Trusted by brands across India, US & UK</p>
          <div className="trust-clients">
            {clients.map((name) => (
              <div className="trust-client-logo" key={name}>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default TrustSection;
