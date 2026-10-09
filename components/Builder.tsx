'use client';

import { useState, type ReactNode } from 'react';
import type { Dict } from '@/lib/i18n';

type Key = 'web' | 'app' | 'data' | 'erp' | 'cloud' | 'advice';
const order: Key[] = ['web', 'app', 'data', 'erp', 'cloud', 'advice'];

const icons: Record<Key, ReactNode> = {
  web: (<><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 8h18M8 21h8" /></>),
  app: (<><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></>),
  data: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  erp: (<><rect x="3" y="3" width="8" height="8" rx="2" /><rect x="13" y="3" width="8" height="8" rx="2" /><rect x="3" y="13" width="8" height="8" rx="2" /><rect x="13" y="13" width="8" height="8" rx="2" /></>),
  cloud: <path d="M7 18a4.5 4.5 0 1 1 .9-8.9A6 6 0 0 1 19 11a3.5 3.5 0 0 1-.5 7z" />,
  advice: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
};

/** Event the contact form listens to, so "Send my blueprint" can pre-fill the message. */
export const PREFILL_EVENT = 'widget:prefill';

function suggest(t: Dict, k: Key[]): string[] {
  const s = t.builder.suggestions;
  if (k.length === 0) return s.none;
  if (k.length === 1 && k[0] === 'web') return s.web;
  if (k.length === 1 && k[0] === 'data') return s.data;
  if (k.length === 1 && (k[0] === 'advice' || k[0] === 'cloud')) return s.audit;
  if (k.length <= 2 && (k.includes('app') || k.includes('erp'))) return s.mvp;
  return s.custom;
}

export default function Builder({ t }: { t: Dict }) {
  const [chosen, setChosen] = useState<Key[]>([]);
  const toggle = (k: Key) => setChosen((c) => (c.includes(k) ? c.filter((x) => x !== k) : [...c, k]));
  const [title, why] = suggest(t, chosen);

  const send = () => {
    const names = chosen.map((k) => t.builder.picks[k].name).join(', ');
    const message =
      (chosen.length ? `${t.builder.msgPieces}${names}.\n` : '') + `${t.builder.msgStart}${title}.\n\n${t.builder.msgAbout}`;
    window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: message }));
  };

  return (
    <section className="block" id="build">
      <div className="wrap">
        <div className="section-head">
          <span className="label">{t.builder.label}</span>
          <h2 className="reveal">{t.builder.title}</h2>
        </div>
        <div className="builder">
          <div className="picks">
            {order.map((k) => (
              <button
                key={k}
                type="button"
                className="pick"
                aria-pressed={chosen.includes(k)}
                onClick={() => toggle(k)}
                data-cursor="add"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  {icons[k]}
                </svg>
                <span>
                  <b>{t.builder.picks[k].name}</b>
                  <br />
                  <small>{t.builder.picks[k].sub}</small>
                </span>
              </button>
            ))}
          </div>
          <aside className="blueprint" aria-labelledby="bp-title">
            <div className="bp-top">
              <h3 id="bp-title">{t.builder.blueprint}</h3>
              <div className="mini" aria-hidden="true">
                {Array.from({ length: 9 }, (_, i) => (
                  <i key={i} className={i < chosen.length ? (i === chosen.length - 1 ? 'last' : 'on') : undefined} />
                ))}
              </div>
            </div>
            {chosen.length > 0 ? (
              <ul className="bp-list">
                {chosen.map((k, i) => (
                  <li key={k}>
                    {t.builder.picks[k].name}
                    <span>
                      {t.builder.piece} {String(i + 1).padStart(2, '0')}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="bp-empty">{t.builder.empty}</p>
            )}
            <div className="bp-result" aria-live="polite">
              <span className="label">{t.builder.where}</span>
              <strong>{title}</strong>
              <p>{why}</p>
            </div>
            <a className="btn" href="#contact" onClick={send} data-cursor="send">
              {t.builder.send}
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
