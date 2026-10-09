'use client';

import { useEffect } from 'react';
import type { Dict } from '@/lib/i18n';

/**
 * Page-wide polish that needs the browser:
 * - soft lift-in of `.reveal` blocks below the fold (content stays visible at rest)
 * - the orange cursor that grows into a label over elements with data-cursor
 */
export default function Effects({ cursor }: { cursor: Dict['cursor'] }) {
  useEffect(() => {
    document.documentElement.classList.add('js');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups: (() => void)[] = [];

    if (!reduce && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.remove('pending');
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: '0px 0px -8% 0px' },
      );
      document.querySelectorAll<HTMLElement>('.reveal').forEach((el, i) => {
        if (el.getBoundingClientRect().top > window.innerHeight) {
          el.classList.add('pending');
          el.style.transitionDelay = `${(i % 4) * 0.08}s`;
          io.observe(el);
        }
      });
      cleanups.push(() => io.disconnect());
    }

    if (!reduce && window.matchMedia('(pointer: fine)').matches) {
      const cur = document.createElement('div');
      cur.className = 'cursor';
      const label = document.createElement('span');
      cur.appendChild(label);
      document.body.appendChild(cur);
      let cx = -100, cy = -100, mx = -100, my = -100, raf = 0;
      const onMove = (e: PointerEvent) => {
        mx = e.clientX;
        my = e.clientY;
      };
      const onOver = (e: Event) => {
        const el = (e.target as Element | null)?.closest?.('[data-cursor]');
        cur.classList.toggle('big', !!el);
        const key = el?.getAttribute('data-cursor') as keyof Dict['cursor'] | null;
        label.textContent = key ? cursor[key] ?? '' : '';
      };
      const follow = () => {
        cx += (mx - cx) * 0.18;
        cy += (my - cy) * 0.18;
        cur.style.transform = `translate(${cx}px,${cy}px)`;
        raf = requestAnimationFrame(follow);
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerover', onOver);
      raf = requestAnimationFrame(follow);
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        window.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerover', onOver);
        cur.remove();
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [cursor]);

  return null;
}
