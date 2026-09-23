import { SKILLS } from "../data";
import { SectionHeader } from "./SectionHeader";
import { spotlight } from "./About";

export function Toolkit() {
  return (
    <section className="section toolkit" id="skills">
      <SectionHeader title="Toolkit" index="02 — SKILLS" />
      <div className="skill-grid">
        {SKILLS.map(({ group, items }) => (
          <div className="card skill-card" key={group} data-reveal onPointerMove={spotlight}>
            <p className="eyebrow">{group.toUpperCase()}</p>
            <ul className="chips" data-chips>
              {items.map((i) => <li className="chip" key={i}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
