'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

/** A paragraph that lights up word by word as it is read. Words in *asterisks* turn orange. */
export default function Manifesto({ label, text }: { label: string; text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = useMemo(() => {
    let hot = false;
    return text.split(' ').map((raw) => {
      const opens = raw.startsWith('*');
      const closes = raw.endsWith('*');
      if (opens) hot = true;
      const word = { text: raw.replace(/\*/g, ''), hot };
      if (closes) hot = false;
      return word;
    });
  }, [text]);
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setLit(words.length);
      return;
    }
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const b = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, (vh * 0.85 - b.top) / (b.height + vh * 0.35)));
      setLit(Math.round(p * words.length));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [words.length]);

  return (
    <section className="block manifesto" id="studio">
      <div className="wrap">
        <span className="label" style={{ display: 'block', marginBottom: 36 }}>
          {label}
        </span>
        <p ref={ref}>
          {words.map((w, i) => (
            <span key={i}>
              <span className={`w${i < lit ? ' lit' : ''}${i < lit && w.hot ? ' hot' : ''}`}>{w.text}</span>
              {i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
