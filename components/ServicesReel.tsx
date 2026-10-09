'use client';

import { useEffect, useRef, useState } from 'react';
import type { Dict } from '@/lib/i18n';

// Which tiles of each card's small glyph are filled ('on'), empty, or the orange piece ('go').
const glyphs: string[][] = [
  ['on', 'go', 'on', 'on'],
  ['on', 'go', '', 'on'],
  ['', 'go', 'on', 'on'],
  ['on', 'go', 'on', ''],
  ['on', 'go', 'on', 'on'],
  ['', 'go', '', 'on'],
];
const darkCards = [1, 4];

/** Services as a horizontal reel: the section pins and cards slide sideways while scrolling. On phones it is a swipeable row. */
export default function ServicesReel({ t }: { t: Dict }) {
  const reelRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [flat, setFlat] = useState(true);
  const [index, setIndex] = useState(1);
  const total = t.services.items.length;

  useEffect(() => {
    const reel = reelRef.current;
    const track = trackRef.current;
    if (!reel || !track) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let dist = 0;

    const move = () => {
      if (reel.classList.contains('flat')) return;
      const b = reel.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, -b.top / Math.max(1, reel.offsetHeight - window.innerHeight)));
      track.style.transform = `translate3d(${(-p * dist).toFixed(1)}px,0,0)`;
      setIndex(Math.min(total, 1 + Math.floor(p * (total - 0.001))));
    };
    const size = () => {
      // Too narrow or too short for the pinned reel: fall back to a swipeable row.
      const isFlat = reduce || window.innerWidth < 820 || window.innerHeight < 560;
      setFlat(isFlat);
      reel.classList.toggle('flat', isFlat);
      if (isFlat) {
        reel.style.height = '';
        track.style.transform = '';
        return;
      }
      dist = Math.max(0, track.scrollWidth - window.innerWidth);
      reel.style.height = `${window.innerHeight + dist}px`;
      move();
    };
    size();
    document.fonts?.ready.then(size).catch(() => {});
    window.addEventListener('resize', size);
    window.addEventListener('scroll', move, { passive: true });
    return () => {
      window.removeEventListener('resize', size);
      window.removeEventListener('scroll', move);
    };
  }, [total]);

  return (
    <section className={`reel${flat ? ' flat' : ''}`} id="services" ref={reelRef}>
      <div className="reel-sticky">
        <div className="wrap reel-head">
          <h2>{t.services.title}</h2>
          <span className="reel-count">
            {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
        <div className="track" ref={trackRef}>
          {t.services.items.map((s, i) => (
            <article className={`panel${darkCards.includes(i) ? ' dark' : ''}`} key={s.title} data-cursor="drag">
              <div className="glyph" aria-hidden="true">
                {(glyphs[i] ?? glyphs[0]).map((g, j) => (
                  <i key={j} className={g || undefined} />
                ))}
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <div className="meta">
                <span>{t.services.startWith}</span>
                <b>{s.start}</b>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
