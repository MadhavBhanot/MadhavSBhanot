import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis: Lenis | null = null;

/** Smooth scroll driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function startSmoothScroll() {
  if (lenis || reducedMotion()) return () => {};
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (t: number) => lenis?.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // Route in-page anchor links through Lenis.
  const onClick = (e: MouseEvent) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    e.preventDefault();
    const href = a.getAttribute("href")!;
    scrollToTarget(href);
    // Move keyboard focus with the scroll (skip link, nav links).
    const el = href.length > 1 ? document.querySelector<HTMLElement>(href) : null;
    if (el) { if (!el.hasAttribute("tabindex")) el.tabIndex = -1; el.focus({ preventScroll: true }); }
  };
  document.addEventListener("click", onClick);

  return () => {
    document.removeEventListener("click", onClick);
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToTarget(target: string | number) {
  const el = typeof target === "string" ? (target === "#" ? 0 : document.querySelector<HTMLElement>(target)) : target;
  if (el === null) return;
  if (lenis) lenis.scrollTo(el, { offset: -24, duration: 1.4 });
  else if (typeof el === "number") window.scrollTo({ top: el, behavior: "smooth" });
  else el.scrollIntoView({ behavior: "smooth" });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
