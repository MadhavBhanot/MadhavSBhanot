import { useEffect, useMemo, useRef } from "react";
import { gsap, reducedMotion } from "../lib/scroll";
import { Wanted } from "./Wanted";

/** Spray-paint blues laid down in order; the last wash is the crumpled-paper grey the poster sits on. */
const INKS = ["#1d4fd8", "#3b6ff0", "#1a3fb0", "#898989"];

/** Hidden page: a watercolour wash blooms from (x, y), then the page fades in on the paper. */
export function Splash({ x, y, onClose }: { x: number; y: number; onClose: () => void }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  // Splatter droplets thrown out around the click point.
  const drops = useMemo(() => Array.from({ length: 14 }, (_, i) => {
    const a = Math.random() * Math.PI * 2;
    const d = 50 + Math.random() * 240;
    return { cx: x + Math.cos(a) * d, cy: y + Math.sin(a) * d, r: 3 + Math.random() * 14, fill: INKS[i % 2] };
  }), [x, y]);

  useEffect(() => {
    const d = dlg.current!;
    d.showModal();
    d.querySelector<HTMLElement>(".splash-back")?.focus();
    // Radius that reaches the farthest corner, plus slack for the displaced (wobbly) edge.
    const cover = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 140;
    const t = gsap.timeline()
      .from(d.querySelectorAll(".splash-drop"), { scale: 0, transformOrigin: "50% 50%", duration: 0.5, ease: "back.out(2.2)", stagger: 0.015 }, 0)
      .fromTo(d.querySelectorAll(".splash-wash"), { attr: { r: 0 } }, { attr: { r: (i: number) => cover * (0.55 + i * 0.15) }, duration: 1.5, ease: "power2.out", stagger: 0.14 }, 0.05)
      .fromTo(d.querySelector(".splash-page"), { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.45");
    if (reducedMotion()) t.progress(1);
    tl.current = t;
    return () => { t.kill(); if (d.open) d.close(); };
  }, [x, y]);

  const close = () => {
    const t = tl.current;
    if (!t || reducedMotion()) return onClose();
    t.eventCallback("onReverseComplete", onClose).timeScale(1.8).reverse();
  };

  return (
    <dialog
      ref={dlg}
      className="splash"
      aria-label="Hidden page"
      data-lenis-prevent
      onCancel={(e) => { e.preventDefault(); close(); }}
    >
      <svg className="splash-ink" aria-hidden>
        <defs>
          {/* Noise-displaced edges + a touch of blur = bleeding watercolour. */}
          <filter id="watercolor" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="3" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="90" xChannelSelector="R" yChannelSelector="G" result="bleed" />
            <feGaussianBlur in="bleed" stdDeviation="1.4" />
          </filter>
        </defs>
        <g filter="url(#watercolor)">
          {drops.map((p, i) => <circle key={i} className="splash-drop" {...p} opacity={0.9} />)}
          {INKS.map((c, i) => <circle key={c} className="splash-wash" cx={x} cy={y} r={0} fill={c} opacity={i === INKS.length - 1 ? 1 : 0.85} />)}
        </g>
      </svg>

      <div className="splash-page">
        <Wanted onBack={close} />
      </div>
    </dialog>
  );
}
