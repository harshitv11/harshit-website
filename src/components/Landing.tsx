import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              HARSHIT
              <br />
              <span>MUTHA</span>
              <br />
              <span className="h1-keyword">AI Ads Expert</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>AI Ads Expert &</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Growth</div>
              <div className="landing-h2-2">Strategy</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Strategy</div>
              <div className="landing-h2-info-1">Growth</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
