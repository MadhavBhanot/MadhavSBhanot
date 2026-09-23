import type { PointerEvent } from "react";
import { STATS } from "../data";
import { SectionHeader } from "./SectionHeader";

/** Feeds pointer position to CSS for the spotlight hover used on cards. */
export const spotlight = (e: PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

export function About() {
  return (
    <section className="section about" id="about">
      <SectionHeader title="About me" index="01 — ABOUT" />
      <div className="about-body">
        <p className="about-lead" data-scrub-words>
          Hi, I'm Madhav — a software engineer working across full-stack and AI/LLM integration, who cares most about
          the part people actually touch.
        </p>
        <div className="about-details">
          <p className="body-text" data-reveal>
            B.Tech Computer Science at Bharati Vidyapeeth, Pune — class of ’26, CGPA 8.32. Previously built React
            dashboards for LLM workflow systems at Innate AI (Helsinki), and shipped full-stack products at Krishlabs
            (Bangalore).
          </p>
          <div className="stats">
            {STATS.map((s) => (
              <div className="card stat" key={s.label} data-reveal onPointerMove={spotlight}>
                <p className="stat-value">
                  <span data-count={s.value} data-decimals={s.decimals}>{s.value.toFixed(s.decimals)}</span>
                  {s.suffix}
                </p>
                <p className="stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
