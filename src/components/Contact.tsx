import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUp, Check } from "lucide-react";
import { EMAIL, SOCIALS } from "../data";
import { scrollToTarget } from "../lib/scroll";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact" data-reveal>
        <p className="contact-eyebrow">05 — CONTACT</p>
        <h2 className="contact-title" data-split="chars">Let's build something.</h2>

        <div className="contact-cta">
          <div className="doodle say-hi" aria-hidden>
            <span className="doodle-text" style={{ rotate: "-6deg", left: 0, top: 0, fontSize: 32, color: "#141312" }}>say hi!</span>
            <img src="/assets/doodle-sayhi-arrow.svg" alt="" data-draw style={{ left: 70, top: 18 }} />
          </div>
            <button
              className="email-btn"
              onClick={copy}
              aria-label={`Copy email address ${EMAIL}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span key="done" className="email-btn-inner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    Copied to clipboard <Check size={17} strokeWidth={2} />
                  </motion.span>
                ) : (
                  <motion.span key="mail" className="email-btn-inner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    {EMAIL} <ArrowRight size={17} strokeWidth={2} aria-hidden />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <span className="sr-only" aria-live="polite">{copied ? "Email address copied" : ""}</span>
        </div>

        <img src="/assets/doodle-plane-trail.svg" alt="" className="doodle plane-trail" data-draw />
        <img src="/assets/doodle-plane.svg" alt="" className="doodle plane" />
      </div>

      <footer className="footer">
        <p>© 2026 Madhav Singh Bhanot — Mumbai, IN</p>
        <ul className="socials">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="link-underline">{s.label}</a>
            </li>
          ))}
        </ul>
      </footer>
      <div className="signoff">
        <p>PSST — KNOCK FIVE TIMES ON THE NAME UP TOP</p>
        <button className="link-underline back-top" onClick={() => scrollToTarget(0)}>
          BACK TO TOP <ArrowUp size={12} strokeWidth={2} />
        </button>
      </div>
      <div className="signature" aria-hidden>
        <p data-signature>MADHAV</p>
      </div>
    </section>
  );
}
