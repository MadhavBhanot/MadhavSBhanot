import { ArrowDown, Download } from "lucide-react";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-stage">
        <h1 className="hero-name" data-hero="name" aria-label="Madhav">MADHAV</h1>
        <div className="hero-portrait" data-hero="portrait">
          <img src="/assets/sketch.webp" alt="Line sketch of Madhav" draggable={false} />
        </div>
        <p className="hero-name hero-name--outline" data-hero="name" aria-hidden>MADHAV</p>
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
              Download CV <Download size={15} strokeWidth={1.8} aria-hidden />
            </a>
            <a className="btn btn--solid" href="#work">
              View work <ArrowDown size={15} strokeWidth={2} aria-hidden />
            </a>
          </div>
        </div>
      </div>
      <div className="rule hero-rule" data-rule />
    </section>
  );
}
