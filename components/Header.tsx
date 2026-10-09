'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import type { Dict, Locale } from '@/lib/i18n';

export default function Header({ t, lang }: { t: Dict; lang: Locale }) {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > lastY && y > 400);
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const remember = (l: Locale) => {
    document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <header className={`site${solid ? ' solid' : ''}${hidden ? ' hide' : ''}`}>
      <div className="wrap nav">
        <a className="brand" href="#top" aria-label={t.a11y.brand}>
          <Logo />
          <span>
            <span className="brand-word">widget</span>
            <span className="brand-sub">Consulting</span>
          </span>
        </a>
        <nav className="nav-links" aria-label={t.a11y.menu}>
          <a href="#studio">{t.nav.studio}</a>
          <a href="#services">{t.nav.services}</a>
          <a href="#build">{t.nav.build}</a>
          <a href="#work">{t.nav.work}</a>
          <div className="lang" role="group" aria-label={t.a11y.language}>
            {(['fr', 'en'] as const).map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                scroll={false}
                className="lang-btn"
                aria-current={l === lang ? 'true' : undefined}
                onClick={() => remember(l)}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          <a className="pill" href="#contact" data-cursor="talk">
            <i />
            <span>
              {t.nav.cta} <span className="long">{t.nav.ctaLong}</span>
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}
