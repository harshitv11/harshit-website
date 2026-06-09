import { useState, useRef } from "react";
import { MdArrowOutward, MdCopyright } from "react-icons/md";
import emailjs from "@emailjs/browser";
import "./styles/Contact.css";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  };

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

            <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
              <h4>Send a Message</h4>
              <input
                className="contact-input"
                type="text"
                name="from_name"
                placeholder="Your Name"
                required
              />
              <input
                className="contact-input"
                type="email"
                name="reply_to"
                placeholder="Your Email"
                required
              />
              <textarea
                className="contact-input contact-textarea"
                name="message"
                placeholder="Your Message"
                rows={4}
                required
              />
              <button
                className="contact-submit"
                data-cursor="disable"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : <>Send Message <MdArrowOutward /></>}
              </button>
              {status === "success" && (
                <p style={{ color: "#4ade80", marginTop: "0.5rem", fontSize: "0.9rem" }}>
                  ✓ Message sent! I'll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p style={{ color: "#f87171", marginTop: "0.5rem", fontSize: "0.9rem" }}>
                  Something went wrong. Please email me directly at hv1138769@gmail.com
                </p>
              )}
            </form>
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
              href="mailto:hv1138769@gmail.com"
              data-cursor="disable"
              className="contact-social"
            >
              Email Me <MdArrowOutward />
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
