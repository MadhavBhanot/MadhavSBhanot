import { useEffect, useMemo, useRef } from "react";
import { gsap, reducedMotion } from "../lib/scroll";
import { Wanted } from "./Wanted";

/** Spray-paint blues laid down in order; the last wash is the crumpled-paper grey the poster sits on. */
const INKS = ["#1d4fd8", "#3b6ff0", "#1a3fb0", "#898989"];
/** The blob mask's wobbly edge never dips below this fraction of its half-width. */
const BLOB_MIN = 0.66;

/** Hidden page: a watercolour wash blooms from (x, y), then the page fades in on the paper.
 *  Perf: the watercolour edge is a pre-baked mask image and the washes only animate `transform: scale`,
 *  so the GPU composites every frame (no per-frame SVG filter or repaint — that was the phone lag). */
export function Splash({ x, y, onClose }: { x: number; y: number; onClose: () => void }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  // Wash boxes sized so the last one covers the farthest corner; droplets thrown out around the click.
  const { washes, drops } = useMemo(() => {
    const cover = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 20;
    return {
      washes: INKS.map((_, i) => (2 * cover * (0.55 + i * 0.15)) / BLOB_MIN),
      drops: Array.from({ length: 14 }, (_, i) => {
        const a = Math.random() * Math.PI * 2;
        const d = 50 + Math.random() * 240;
        return { left: x + Math.cos(a) * d, top: y + Math.sin(a) * d, size: 10 + Math.random() * 34, fill: INKS[i % 2] };
      }),
    };
  }, [x, y]);

  useEffect(() => {
    const d = dlg.current!;
    d.showModal();
    d.querySelector<HTMLElement>(".splash-back")?.focus();
    const t = gsap.timeline()
      .fromTo(d.querySelectorAll(".splash-drop"), { scale: 0 }, { scale: 1, duration: 0.5, ease: "back.out(2.2)", stagger: 0.015 }, 0)
      .fromTo(d.querySelectorAll(".splash-wash"), { scale: 0 }, { scale: 1, duration: 1.5, ease: "power2.out", stagger: 0.14 }, 0.05)
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
      <div className="splash-ink" aria-hidden>
        {drops.map((p, i) => (
          <i key={i} className="splash-blob splash-drop" style={{ left: p.left, top: p.top, width: p.size, height: p.size, background: p.fill, rotate: `${i * 47}deg` }} />
        ))}
        {washes.map((size, i) => (
          <i key={i} className="splash-blob splash-wash" style={{ left: x, top: y, width: size, height: size, background: INKS[i], rotate: `${i * 97}deg`, opacity: i === INKS.length - 1 ? 1 : 0.85 }} />
        ))}
      </div>

      <div className="splash-page">
        <Wanted onBack={close} />
      </div>
    </dialog>
  );
}
