import { useEffect, useRef, useState } from "react";
import { MotionConfig } from "motion/react";
import { Analytics } from "@vercel/analytics/react";
import { reducedMotion, startSmoothScroll, useGSAP } from "./lib/scroll";
import { initAnimations, showStatic } from "./lib/animations";
import { Cursor } from "./components/Cursor";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Toolkit } from "./components/Toolkit";
import { Work } from "./components/Work";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => startSmoothScroll(), []);
  useEffect(() => { document.fonts.ready.then(() => setFontsReady(true)); }, []);

  useGSAP(() => {
    if (!fontsReady) return;
    if (reducedMotion()) showStatic();
    else initAnimations();
  }, { scope: root, dependencies: [fontsReady] });

  return (
    <MotionConfig reducedMotion="user">
    <div ref={root}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Cursor />
      <Nav />
      <main className="page" id="main">
        <Hero />
        <About />
        <Toolkit />
        <Work />
        <Experience />
        <Contact />
      </main>
      <Analytics />
    </div>
    </MotionConfig>
  );
}
