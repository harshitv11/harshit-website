import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a href="#" data-cursor="disable">
                LinkedIn — Coming Soon
              </a>
            </p>
            <h4>Expertise</h4>
            <p>AI-Powered Advertising &amp; Growth Strategy</p>
            <p>Performance Marketing &amp; Conversion Optimization</p>

            <div className="contact-form">
              <h4>Send a Message</h4>
              <input
                className="contact-input"
                type="text"
                placeholder="Your Name"
              />
              <input
                className="contact-input"
                type="email"
                placeholder="Your Email"
              />
              <textarea
                className="contact-input contact-textarea"
                placeholder="Your Message"
                rows={4}
              />
              <button className="contact-submit" data-cursor="disable">
                Send Message <MdArrowOutward />
              </button>
            </div>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="#"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn — Coming Soon <MdArrowOutward />
            </a>
            <a
              href="#"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram — Coming Soon <MdArrowOutward />
            </a>
            <a
              href="mailto:hello@harshitmutha.digital"
              data-cursor="disable"
              className="contact-social"
            >
              Email Me <MdArrowOutward />
            </a>
            <a
              href="#"
              data-cursor="disable"
              className="contact-social contact-calendly"
            >
              Book a Call (Calendly) <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Harshit Mutha</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
