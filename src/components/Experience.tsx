import { EXPERIENCE } from "../data";
import { SectionHeader } from "./SectionHeader";

export function Experience() {
  return (
    <section className="section experience" id="experience">
      <SectionHeader title="Experience" index="04 — EXPERIENCE" />
      <ol className="roles">
        {EXPERIENCE.map((r) => (
          <li className="role" key={r.title} data-reveal>
            <p className="role-when">{r.when}</p>
            <div className="role-title">
              <h3>
                {r.title}
                {r.star && <img src="/assets/doodle-star.svg" alt="" className="doodle role-star" data-draw />}
              </h3>
              <p>{r.org}</p>
            </div>
            <p className="role-text">{r.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
