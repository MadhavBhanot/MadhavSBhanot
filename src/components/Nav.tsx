import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import { NAV } from "../data";

export function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 400);
    setScrolled(y > 40);
  });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach(({ href }) => { const el = document.querySelector(href); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden />
      <motion.header
        className={`nav ${scrolled ? "is-scrolled" : ""}`}
        data-hero="nav"
        onFocusCapture={() => setHidden(false)}
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#top" className="nav-logo" aria-label="Madhav — back to top">MADHAV</a>
        <nav className="nav-links" aria-label="Primary">
          {NAV.map(({ label, href }) => (
            <a key={href} href={href} className={active === href ? "is-active" : ""} aria-current={active === href ? "location" : undefined}>
              {active === href && (
                <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
              <span>{label}</span>
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn btn--solid btn--nav">
          Contact <ArrowRight size={16} strokeWidth={1.8} aria-hidden />
        </a>
      </motion.header>
    </>
  );
}
