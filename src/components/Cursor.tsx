import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/scroll";

/** Minimal arrow cursor that tracks the pointer 1:1 and dips slightly on press. */
export function Cursor() {
  const arrow = useRef<HTMLDivElement>(null);
  const [down, setDown] = useState(false);
  const [enabled] = useState(() => window.matchMedia("(pointer: fine)").matches);

  useEffect(() => {
    if (!enabled) return;
    const el = arrow.current;
    document.documentElement.classList.add("has-cursor");
    const x = gsap.quickSetter(el, "x", "px");
    const y = gsap.quickSetter(el, "y", "px");

    let shown = false;
    const move = (e: PointerEvent) => {
      x(e.clientX); y(e.clientY);
      if (!shown) { shown = true; gsap.to(el, { autoAlpha: 1, duration: 0.2 }); }
    };
    const press = () => setDown(true);
    const release = () => setDown(false);
    const leave = () => { shown = false; gsap.to(el, { autoAlpha: 0, duration: 0.2 }); };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={arrow} className={`cursor ${down ? "is-down" : ""}`} aria-hidden>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3.2 3.2 20 9.6l-7 3.3-3.3 7L3.2 3.2Z" fill="#fff" stroke="#141312" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
