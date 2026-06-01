import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Ads Expert</h4>
                <h5>ChatGPT Ads Specialist</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Building AI-powered advertising systems using ChatGPT Ads, AI
              creative automation, and next-gen growth strategies. Helping
              brands scale revenue with intelligent, data-driven ad campaigns.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Performance Marketing Specialist</h4>
                <h5>Paid Ads & Funnels</h5>
              </div>
              <h3>2021–24</h3>
            </div>
            <p>
              Specialized in paid advertising, conversion funnels, and lead
              generation. Scaled multiple brands through Meta & Google Ads,
              conversion rate optimization, and data-driven campaign scaling.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Digital Marketing</h4>
                <h5>4 Brands · Learning Phase</h5>
              </div>
              <h3>2019–21</h3>
            </div>
            <p>
              Worked hands-on with 4 brands learning Meta Ads, Google Ads,
              social media marketing, creative strategy, and brand positioning —
              building a strong foundation in performance marketing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
