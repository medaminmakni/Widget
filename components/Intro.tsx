/** Opening curtain: the logo assembles, then the curtain lifts (pure CSS, see .intro in globals.css). */
export default function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <svg viewBox="-2 4 96 100" width="96" height="100">
        <rect x="4" y="64" width="36" height="36" rx="8" fill="var(--tile)" />
        <rect x="4" y="24" width="36" height="36" rx="8" fill="var(--tile)" />
        <rect x="44" y="64" width="36" height="36" rx="8" fill="var(--tile)" />
        <rect x="52" y="8" width="36" height="36" rx="8" fill="var(--orange)" />
      </svg>
    </div>
  );
}
