import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, Pause, Play } from "lucide-react";
import "./wanted.css";

/** Hidden poster (Figma: Desktop - 3 · Most Wanted, hero only), laid out against the screen:
 *  cutouts pinned bottom-left, name centred, role bottom-right. Layers that belong together
 *  (blue silhouette + doodles around the photo, arrow around the role) keep their Figma offsets
 *  as % of their anchor, so the pairs stay composed at any size. */
const A = "/assets/wanted/";

/** Place a child inside an anchor box, from Figma coords of both. */
const rel = (anchor: [number, number, number, number], x: number, y: number, w: number, h: number): CSSProperties => {
  const [ax, ay, aw, ah] = anchor;
  return { left: `${((x - ax) / aw) * 100}%`, top: `${((y - ay) / ah) * 100}%`, width: `${(w / aw) * 100}%`, height: `${(h / ah) * 100}%` };
};
const PHOTO: [number, number, number, number] = [-14, 72, 582, 1030];
const ROLE: [number, number, number, number] = [720, 976, 700.087, 95.463];

/** Rotated image inside its design bounding box (`iw × ih` is the unrotated image size). */
function Rotated({ style, w, h, iw, ih, rotate, src, className, imgClass }: {
  style: CSSProperties; w: number; h: number; iw: number; ih: number; rotate: string; src: string; className?: string; imgClass?: string;
}) {
  return (
    <div className={`w-layer w-center ${className ?? ""}`} style={style}>
      <div className="w-rot" style={{ width: `${(iw / w) * 100}%`, height: `${(ih / h) * 100}%`, transform: rotate }}>
        <img src={A + src} alt="" className={`w-fill ${imgClass ?? ""}`} />
      </div>
    </div>
  );
}

/** "Fired Up" via YouTube's embed (the only licensed way to play it), driven with the IFrame API's postMessage protocol.
 *  Starts 3s after the poster opens (or on the first press of play, if sooner). */
const YT = "https://www.youtube-nocookie.com";
const VIDEO = "f2II8WkVti8";

function MusicPlayer() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const send = (func: string) => frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: [] }), YT);
  const toggle = () => (loaded ? send(playing ? "pauseVideo" : "playVideo") : setLoaded(true));

  // Kick in 3s after the poster opens (the five taps count as the user gesture browsers need for sound).
  useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 3000);
    return () => clearTimeout(id);
  }, []);

  // Player reports its state (1 = playing) once we say we're listening.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== YT || e.source !== frame.current?.contentWindow) return;
      try {
        const state = JSON.parse(e.data)?.info?.playerState;
        if (typeof state === "number") setPlaying(state === 1);
      } catch { /* not a player message */ }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="w-player">
      <button className="splash-back" onClick={toggle} aria-label={playing ? "Pause Fired Up by Styles of Beyond" : "Play Fired Up by Styles of Beyond"}>
        {playing ? <Pause size={16} strokeWidth={1.8} aria-hidden /> : <Play size={16} strokeWidth={1.8} aria-hidden />}
        Fired Up
        <span className={`w-eq ${playing ? "is-on" : ""}`} aria-hidden><i /><i /><i /></span>
      </button>
      {loaded && (
        <iframe
          ref={frame}
          className="w-player-video"
          src={`${YT}/embed/${VIDEO}?enablejsapi=1&autoplay=1&loop=1&playlist=${VIDEO}&controls=0&playsinline=1&rel=0`}
          title="Fired Up — Styles of Beyond"
          allow="autoplay; encrypted-media"
          tabIndex={-1}
          onLoad={() => frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "listening" }), YT)}
        />
      )}
    </div>
  );
}

export function Wanted({ onBack }: { onBack: () => void }) {
  return (
    <div className="wanted">
      <h1 className="sr-only">Madhav Singh Bhanot — Full Stack Developer</h1>

      {/* Name first, so both cutouts (blue silhouette + photo) sit in front of it; the role caption goes on top. */}
      <div className="w-name" aria-hidden>
        <img src={A + "name-madhav.webp"} alt="" className="w-madhav" width="690" height="236" />
        <img src={A + "name-singh.webp"} alt="" className="w-singh" width="642" height="216" />
        <img src={A + "name-bhanot.webp"} alt="" className="w-bhanot" width="572" height="206" />
      </div>

      <div className="w-cutout">
        <img src={A + "blue.webp"} alt="" className="w-layer w-difference" style={rel(PHOTO, 103, -143, 692, 1230)} />
        <img src={A + "photo.webp"} alt="Madhav, in black and white" className="w-layer w-fill" />
        <Rotated style={rel(PHOTO, -114, 786, 595.975, 765.805)} w={595.975} h={765.805} iw={454.442} ih={681.044} rotate="rotate(-167deg)" src="doodles.webp" className="w-hard-light" imgClass="w-bottom" />
      </div>

      <div className="w-role" aria-hidden>
        <img src={A + "role.webp"} alt="" className="w-fill w-cover" style={{ rotate: "0.29deg" }} />
        <Rotated style={rel(ROLE, 1003, 994, 502.686, 502.809)} w={502.686} h={502.809} iw={365} ih={346} rotate="rotate(45.26deg)" src="arrow.webp" className="w-overlay" imgClass="w-cover w-60" />
      </div>

      <button className="splash-back" onClick={onBack}>
        <ArrowLeft size={16} strokeWidth={1.8} aria-hidden /> Back
      </button>

      <MusicPlayer />
    </div>
  );
}
