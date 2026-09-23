import { gsap, ScrollTrigger, SplitText } from "./scroll";

const EASE = "expo.out";
const q = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => gsap.utils.toArray<T>(root.querySelectorAll(sel));
const onEnter = (el: Element, start = "top 88%") => ({ trigger: el, start, once: true });

/** Hero entrance — plays once fonts are ready. */
function heroIntro() {
  const tl = gsap.timeline({ defaults: { ease: EASE, duration: 1.4 } });
  const names = q("[data-hero='name']");
  const splits = names.map((n) => SplitText.create(n, { type: "chars", mask: "chars" }));

  tl.set("[data-hero]", { visibility: "visible" })
    .from("[data-hero='nav']", { autoAlpha: 0, duration: 1 }, 0)
    .from(splits.flatMap((s) => s.chars), { yPercent: 105, stagger: { each: 0.06, from: "start" }, duration: 1.5 }, 0.1)
    .fromTo("[data-hero='portrait']", { autoAlpha: 0, clipPath: "inset(8% 8% 8% 8%)" }, { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.8 }, 0.45)
    .from(["[data-hero='role'] > *", "[data-hero='status']", "[data-hero='pitch'] > *"], { autoAlpha: 0, y: 30, stagger: 0.07 }, 0.8)
    .from(".hero-rule", { scaleX: 0, transformOrigin: "left", duration: 1.6 }, 0.9);

  // Scroll-away parallax
  gsap.to(".hero-stage", { yPercent: -8, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".hero-portrait img", { yPercent: 6, scale: 1.04, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
}

function reveals() {
  ScrollTrigger.batch("[data-reveal]", {
    start: "top 90%",
    once: true,
    // clearProps drops the transform/will-change once done, so finished blocks stop costing a layer.
    onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 48 }, { autoAlpha: 1, y: 0, duration: 1.2, ease: EASE, stagger: 0.09, overwrite: true, clearProps: "transform" }),
  });

  q("[data-split='chars']").forEach((el) => {
    // Word masks (not per-char) keep the layer count low while scrolling.
    const split = SplitText.create(el, { type: "words", mask: "words" });
    gsap.from(split.words, { yPercent: 110, duration: 1.2, ease: EASE, stagger: 0.08, scrollTrigger: onEnter(el) });
  });

  q("[data-rule]:not(.hero-rule)").forEach((el) =>
    gsap.from(el, { scaleX: 0, transformOrigin: "left", duration: 1.6, ease: "power3.inOut", scrollTrigger: onEnter(el) }));

  q("section:not(.hero) [data-draw]").forEach((el) =>
    gsap.fromTo(el, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power2.inOut", delay: 0.5, scrollTrigger: onEnter(el) }));

  q("section:not(.hero) .doodle-text").forEach((el) =>
    gsap.from(el, { autoAlpha: 0, y: 10, duration: 0.9, delay: 0.3, ease: EASE, scrollTrigger: onEnter(el) }));

  q("[data-chips]").forEach((el) =>
    gsap.from(el.children, { autoAlpha: 0, y: 14, scale: 0.9, duration: 0.7, ease: "back.out(1.8)", stagger: 0.035, clearProps: "transform", scrollTrigger: onEnter(el) }));

  q("[data-count]").forEach((el) => {
    const end = Number(el.dataset.count);
    const decimals = Number(el.dataset.decimals ?? 0);
    const obj = { v: 0 };
    el.textContent = (0).toFixed(decimals); // start at 0 so the final value never flashes first
    gsap.to(obj, {
      v: end, duration: 2, ease: "power3.out", scrollTrigger: onEnter(el),
      onUpdate: () => { el.textContent = obj.v.toFixed(decimals); },
    });
  });
}

function scrubs() {
  // About lead: words brighten as you read.
  q("[data-scrub-words]").forEach((el) => {
    const split = SplitText.create(el, { type: "words" });
    gsap.fromTo(split.words, { opacity: 0.18 }, {
      opacity: 1, stagger: 0.1, ease: "none",
      scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
    });
  });

  // Screenshot windows drift inside their thumbnails.
  q("[data-parallax]").forEach((el) =>
    gsap.fromTo(el, { y: 36 }, { y: -12, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } }));

  q("[data-speed]").forEach((el) =>
    gsap.fromTo(el, { y: 40 }, { y: -40, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } }));

  // Giant signature rises letter by letter once it comes into view (not scrubbed, so it always completes).
  q("[data-signature]").forEach((el) => {
    const split = SplitText.create(el, { type: "chars" });
    gsap.from(split.chars, {
      yPercent: 70, opacity: 0, stagger: 0.07, duration: 1.4, ease: EASE,
      scrollTrigger: { trigger: el.parentElement, start: "top 98%", once: true },
    });
  });
}

export function initAnimations() {
  heroIntro();
  reveals();
  scrubs();
  ScrollTrigger.refresh();
}

/** Reduced-motion users get the finished state immediately. */
export function showStatic() {
  gsap.set("[data-hero], [data-reveal]", { visibility: "visible" });
}
