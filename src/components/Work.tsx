import { ArrowUpRight } from "lucide-react";
import { FEATURED, PROJECTS, type Shot } from "../data";
import { BrowserWindow } from "./BrowserWindow";
import { SectionHeader } from "./SectionHeader";

/** Thumbnail with the blurred-screenshot ambient glow behind a browser window. */
function Thumbnail({ shot, index, size, win }: { shot: Shot; index: string; size: "lg" | "sm"; win: { left: number; top: number } }) {
  return (
    <div className={`thumb thumb--${size}`}>
      <img className="thumb-ambient" src={shot.ambient} alt="" />
      <div className="thumb-shade" />
      <span className="thumb-index" data-speed="0.92">{index}</span>
      <div className="thumb-window" style={{ left: win.left, top: win.top }} data-parallax>
        <BrowserWindow shot={shot} size={size} />
      </div>
    </div>
  );
}

function ArrowButton() {
  return (
    <span className="arrow-btn" aria-hidden>
      <ArrowUpRight size={22} strokeWidth={1.6} />
    </span>
  );
}

export function Work() {
  const f = FEATURED;
  return (
    <section className="section work" id="work">
      <SectionHeader title="Selected work" index="03 — PROJECTS" />

      <div className="work-grid">
        <div className="featured-wrap">
          <img src="/assets/doodle-runner.svg" alt="" className="doodle runner" data-draw />
          <a className="card featured" href={f.href} target="_blank" rel="noreferrer" data-reveal>
            <Thumbnail shot={f.shot} index={f.index} size="lg" win={{ left: 70, top: 52 }} />
            <div className="featured-text">
              <span className="badge">{f.badge}</span>
              <h3 className="featured-title">{f.title}</h3>
              <p className="body-text">{f.description}</p>
              <div className="metrics">
                {f.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="metric-value"><span data-count={m.value} data-decimals={0}>{m.value}</span>{m.suffix}</p>
                    <p className="metric-label">{m.label.toUpperCase()}</p>
                  </div>
                ))}
              </div>
              <ul className="tags">{f.tags.map((t) => <li key={t} className="tag">{t}</li>)}</ul>
              <span className="featured-link"><ArrowButton />{f.linkLabel}</span>
            </div>
          </a>
        </div>

        <div className="work-row">
          {PROJECTS.map((p) => (
            <a className="work-card" key={p.title} href={p.href} target="_blank" rel="noreferrer" data-reveal>
              <Thumbnail shot={p.shot} index={p.index} size="sm" win={p.win} />
              <div className="work-head">
                <div>
                  <p className="eyebrow eyebrow--sm">{p.meta}</p>
                  <h3 className="work-title">{p.title}</h3>
                </div>
                <ArrowButton />
              </div>
              <p className="work-desc">{p.description}</p>
              <p className="work-stack">{p.stack}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
