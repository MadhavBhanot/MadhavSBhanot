import type { CSSProperties } from "react";
import type { Shot } from "../data";

/** Screenshot framed in a minimal browser chrome, cropped exactly like the Figma slot. */
export function Screenshot({ shot, className }: { shot: Shot; className?: string }) {
  const { crop } = shot;
  const style: CSSProperties = { width: `${crop.w}%`, height: `${crop.h}%`, left: `${crop.l}%`, top: `${crop.t}%` };
  return (
    <div className={`shot ${className ?? ""}`}>
      <img src={shot.src} alt="" style={style} loading="lazy" draggable={false} />
    </div>
  );
}

export function BrowserWindow({ shot, size = "lg" }: { shot: Shot; size?: "lg" | "sm" }) {
  return (
    <div className={`window window--${size}`} style={{ width: shot.width }}>
      <div className="window-bar">
        {["red", "yellow", "green"].map((c) => (
          <img key={c} src={`/assets/dot-${c}${size === "sm" ? "-sm" : ""}.svg`} alt="" />
        ))}
        <span className="window-url">{shot.url}</span>
        <span className="window-balance" />
      </div>
      <div style={{ height: shot.height, position: "relative" }}>
        <Screenshot shot={shot} className="window-shot" />
      </div>
    </div>
  );
}
