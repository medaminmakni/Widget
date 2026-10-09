import Accent from './Accent';
import Logo from './Logo';
import HeroScene from './HeroScene';
import type { Dict } from '@/lib/i18n';

export default function Hero({ t }: { t: Dict }) {
  return (
    <section className="hero" id="hero">
      <HeroScene label={t.a11y.scene} />
      <Logo className="hero-fallback" size={360} />
      <div className="wrap hero-copy">
        <span className="label">
          <b>●</b>&nbsp; {t.hero.eyebrow}
        </span>
        <h1>
          {t.hero.lines.map((line, i) => (
            <span className="line" key={i}>
              <span>
                <Accent text={line} />
              </span>
            </span>
          ))}
        </h1>
        <div className="hero-foot">
          <p>{t.hero.text}</p>
          <span className="scroll-cue">
            <i />
            {t.hero.cue}
          </span>
        </div>
      </div>
    </section>
  );
}
