import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          HM
        </a>

        {/* Hamburger button — mobile only */}
        <button
          className={`hamburger ${menuOpen ? "hamburger-open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          data-cursor="disable"
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Desktop nav */}
        <ul className="nav-desktop">
          <li><a data-href="#about" href="#about"><HoverLinks text="ABOUT" /></a></li>
          <li><a data-href="#work" href="#work"><HoverLinks text="WORK" /></a></li>
          <li><Link to="/chatgpt-ads"><HoverLinks text="CHATGPT ADS" /></Link></li>
          <li><Link to="/blog"><HoverLinks text="BLOG" /></Link></li>
          <li><a data-href="#contact" href="#contact"><HoverLinks text="CONTACT" /></a></li>
        </ul>
      </div>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}>
        <ul>
          <li><a href="#about" onClick={handleNavClick}>About</a></li>
          <li><a href="#work" onClick={handleNavClick}>Work</a></li>
          <li><Link to="/chatgpt-ads" onClick={handleNavClick}>ChatGPT Ads</Link></li>
          <li><Link to="/blog" onClick={handleNavClick}>Blog</Link></li>
          <li><a href="#contact" onClick={handleNavClick}>Contact</a></li>
        </ul>
      </div>
      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
