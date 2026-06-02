import "./styles/Work.css";
import WorkImage from "./WorkImage";

const projects = [
  {
    title: "AI Ads System",
    category: "ChatGPT-Powered Ad Campaigns",
    tools: "ChatGPT Ads · Meta Ads · AI Creative Automation · Performance Tracking",
    image: "/images/callhq.png",
    link: "#",
  },
  {
    title: "Performance Funnels",
    category: "Lead Generation & Conversion",
    tools: "Meta Ads · Google Ads · Landing Pages · A/B Testing · CRO",
    image: "/images/whatsapp.png",
    link: "#",
  },
  {
    title: "AI Growth Strategy",
    category: "Brand Scaling with AI",
    tools: "AI Automation · Growth Strategy · Email Marketing · Brand Positioning",
    image: "/images/broki.png",
    link: "#",
  },
  {
    title: "Creative Automation",
    category: "AI-Powered Ad Creatives",
    tools: "AI Creative Systems · Video Ads · Copywriting · Visual Branding",
    image: "/images/orrdr.png",
    link: "#",
  },
];

// Duplicate for seamless infinite loop
const allProjects = [...projects, ...projects];

const Work = () => {
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>My <span>Work</span></h2>
      </div>

      {/* Infinite scrolling ticker */}
      <div className="work-ticker-wrapper">
        <div className="work-ticker">
          {allProjects.map((project, index) => (
            <div className="work-ticker-card" key={index}>
              <div className="work-ticker-image">
                <WorkImage image={project.image} alt={project.title} link={project.link} />
              </div>
              <div className="work-ticker-info">
                <span className="work-ticker-num">0{(index % projects.length) + 1}</span>
                <h4>{project.title}</h4>
                <p className="work-ticker-cat">{project.category}</p>
                <p className="work-ticker-tools">{project.tools}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
