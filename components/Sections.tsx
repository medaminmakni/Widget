import type { Dict } from '@/lib/i18n';

const stages: string[][] = [
  ['', '', 'on', ''],
  ['on', '', 'on', ''],
  ['on', '', 'on', 'on'],
  ['on', 'go', 'on', 'on'],
];

export function Process({ t }: { t: Dict }) {
  return (
    <section className="block" id="process" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="section-head">
          <span className="label">{t.process.label}</span>
          <h2 className="reveal">{t.process.title}</h2>
        </div>
        <ol className="steps">
          {t.process.steps.map((s, i) => (
            <li className="reveal" key={s.title}>
              <div className="stage" aria-hidden="true">
                {(stages[i] ?? stages[0]).map((c, j) => (
                  <i key={j} className={c || undefined} />
                ))}
              </div>
              <span className="when">{s.when}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Work({ t }: { t: Dict }) {
  return (
    <section className="block" id="work" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="section-head">
          <span className="label">{t.work.label}</span>
          <h2 className="reveal">{t.work.title}</h2>
        </div>
        <div className="work">
          {t.work.items.map((w, i) => (
            <a className="case reveal" href="#work" key={i} data-cursor="view">
              <div className="shot">{w.shot}</div>
              <h3>{w.name}</h3>
              <p>{w.line}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Offers({ t }: { t: Dict }) {
  return (
    <section className="block" id="offers" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="section-head">
          <span className="label">{t.offers.label}</span>
          <h2 className="reveal">{t.offers.title}</h2>
        </div>
        <div className="offers">
          {t.offers.items.map((o) => (
            <article className="offer reveal" key={o.title}>
              <span className="time">{o.when}</span>
              <h3>{o.title}</h3>
              <ul>
                {o.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className="price">{o.price}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer({ t }: { t: Dict }) {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="giant" aria-hidden="true">
          <span>widget</span>
          <i />
        </div>
        <div className="foot">
          <span>{t.footer.copy}</span>
          <span>{t.footer.domain}</span>
        </div>
      </div>
    </footer>
  );
}
