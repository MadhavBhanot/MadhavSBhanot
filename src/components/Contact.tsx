import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUp, Check } from "lucide-react";
import { EMAIL, SOCIALS } from "../data";
import { scrollToTarget } from "../lib/scroll";
import { Magnetic } from "./Magnetic";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [flying, setFlying] = useState(false);

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
          <Magnetic strength={0.2}>
            <button
              className="email-btn"
              onClick={copy}
              onPointerEnter={() => setFlying(true)}
              onPointerLeave={() => setFlying(false)}
              aria-label={`Copy email address ${EMAIL}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span key="done" className="email-btn-inner" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }}>
                    Copied to clipboard <Check size={17} strokeWidth={2} />
                  </motion.span>
                ) : (
                  <motion.span key="mail" className="email-btn-inner" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }}>
                    {EMAIL} <ArrowRight size={17} strokeWidth={2} className="btn-icon" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <span className="sr-only" aria-live="polite">{copied ? "Email address copied" : ""}</span>
          </Magnetic>
        </div>

        <img src="/assets/doodle-plane-trail.svg" alt="" className="doodle plane-trail" data-draw />
        <motion.img
          src="/assets/doodle-plane.svg"
          alt=""
          className="doodle plane"
          animate={flying ? { x: 26, y: -22, rotate: -8 } : { x: 0, y: [0, -6, 0], rotate: 0 }}
          transition={flying ? { type: "spring", stiffness: 200, damping: 14 } : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
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
        <p>DESIGNED &amp; BUILT BY MADHAV</p>
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
