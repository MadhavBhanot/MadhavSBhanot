import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowDown, Download } from "lucide-react";

export function Hero() {
  // Pointer parallax for the portrait and the name layers.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const portraitX = useTransform(sx, (v) => v * 14);
  const portraitY = useTransform(sy, (v) => v * 10);
  const nameX = useTransform(sx, (v) => v * -6);

  return (
    <section
      className="hero"
      id="top"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => { mx.set(0); my.set(0); }}
    >
      <div className="hero-stage">
        <motion.h1 className="hero-name" style={{ x: nameX }} data-hero="name" aria-label="Madhav">MADHAV</motion.h1>
        <motion.div className="hero-portrait" style={{ x: portraitX, y: portraitY }} data-hero="portrait">
          <img src="/assets/sketch.webp" alt="Line sketch of Madhav" draggable={false} />
        </motion.div>
        <motion.p className="hero-name hero-name--outline" style={{ x: nameX }} data-hero="name" aria-hidden>MADHAV</motion.p>
      </div>

      <div className="hero-bottom">
        <div className="hero-role" data-hero="role">
          <span>Software</span>
          <em>Developer</em>
        </div>

        <div className="hero-status-wrap" data-hero="status">
          <a href="#contact" className="hero-status">
            <img src="/assets/status-dot.svg" alt="" className="pulse-dot" />
            Open to work
          </a>
        </div>

        <div className="hero-pitch" data-hero="pitch">
          <p>Software engineer — full-stack &amp; AI/LLM.<br />React, Node, Postgres, RAG pipelines.</p>
          <div className="hero-actions">
            <a className="btn btn--ghost" href="/Madhav-Bhanot-Resume.pdf" download>
              Download CV <Download size={15} strokeWidth={1.8} className="btn-icon" aria-hidden />
            </a>
            <a className="btn btn--solid" href="#work">
              View work <ArrowDown size={15} strokeWidth={2} className="btn-icon btn-icon--down" aria-hidden />
            </a>
          </div>
        </div>
      </div>
      <div className="rule hero-rule" data-rule />
    </section>
  );
}
