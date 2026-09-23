import { useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { ArrowDown, Download } from "lucide-react";
import { Splash } from "./Splash";

/** Portrait drifts toward the pointer; CSS `translate` + transition does the easing. */
const drift = (e: PointerEvent<HTMLElement>) => {
  if (e.pointerType !== "mouse") return;
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--px", `${((e.clientX - r.left) / r.width - 0.5) * 28}px`);
  e.currentTarget.style.setProperty("--py", `${((e.clientY - r.top) / r.height - 0.5) * 20}px`);
};
const settle = (e: PointerEvent<HTMLElement>) => {
  e.currentTarget.style.removeProperty("--px");
  e.currentTarget.style.removeProperty("--py");
};

export function Hero() {
  // Easter egg: 5 quick taps on the name (each within 600ms of the last) opens the hidden page.
  const taps = useRef({ n: 0, t: 0 });
  const [splash, setSplash] = useState<{ x: number; y: number } | null>(null);
  const tap = (e: MouseEvent) => {
    const k = taps.current;
    k.n = e.timeStamp - k.t < 600 ? k.n + 1 : 1;
    k.t = e.timeStamp;
    if (k.n === 5) { k.n = 0; setSplash({ x: e.clientX, y: e.clientY }); }
  };

  return (
    <section className="hero" id="top" onPointerMove={drift} onPointerLeave={settle}>
      <div className="hero-stage">
        <h1 className="hero-name" data-hero="name" aria-label="Madhav" onClick={tap}>MADHAV</h1>
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
      {splash && <Splash {...splash} onClose={() => setSplash(null)} />}
    </section>
  );
}
