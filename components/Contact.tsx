'use client';

import { useEffect, useRef, useState, type FormEvent, type PointerEvent } from 'react';
import Accent from './Accent';
import { PREFILL_EVENT } from './Builder';
import type { Dict, Locale } from '@/lib/i18n';

type Status = 'idle' | 'sending' | 'sent' | 'preview' | 'invalid' | 'failed';

export default function Contact({ t, lang }: { t: Dict; lang: Locale }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState(''); // honeypot: real visitors never see or fill this
  const [status, setStatus] = useState<Status>('idle');
  const msgRef = useRef<HTMLTextAreaElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setMessage(detail);
      window.setTimeout(() => msgRef.current?.focus({ preventScroll: true }), 700);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('invalid');
      (name.trim() ? emailRef : nameRef).current?.focus();
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, company, lang }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; preview?: boolean };
      if (!res.ok || !data.ok) throw new Error('failed');
      setStatus(data.preview ? 'preview' : 'sent');
      if (!data.preview) {
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch {
      setStatus('failed');
    }
  };

  const magnet = (e: PointerEvent<HTMLButtonElement>) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const b = e.currentTarget;
    const r = b.getBoundingClientRect();
    b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.25}px)`;
  };

  const note =
    status === 'invalid' ? t.contact.error
    : status === 'failed' ? t.contact.failed
    : status === 'sent' ? t.contact.sent
    : status === 'preview' ? t.contact.preview
    : t.contact.hint;

  return (
    <section className="close" id="contact">
      <div className="wrap">
        <span className="label" style={{ display: 'block', marginBottom: 28 }}>
          {t.contact.label}
        </span>
        <h2 className="reveal">
          <Accent text={t.contact.title} />
        </h2>
        <div className="close-grid">
          <dl className="facts">
            <div><dt>Email</dt><dd>{t.contact.email}</dd></div>
            <div><dt>WhatsApp</dt><dd>{t.contact.whatsapp}</dd></div>
            <div><dt>Studio</dt><dd>{t.contact.studio}</dd></div>
            <div><dt>{t.contact.languagesLabel}</dt><dd>Français · English · العربية</dd></div>
            <div><dt>{t.contact.replyLabel}</dt><dd>{t.contact.reply}</dd></div>
          </dl>
          <form className="brief" onSubmit={submit} noValidate>
            <div className="field">
              <input id="f-name" ref={nameRef} name="name" autoComplete="name" placeholder=" " required value={name} onChange={(e) => setName(e.target.value)} />
              <label htmlFor="f-name">{t.contact.name}</label>
            </div>
            <div className="field">
              <input id="f-email" ref={emailRef} name="email" type="email" autoComplete="email" placeholder=" " required value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="f-email">Email</label>
            </div>
            <div className="field">
              <textarea id="f-msg" ref={msgRef} name="message" placeholder=" " value={message} onChange={(e) => setMessage(e.target.value)} />
              <label htmlFor="f-msg">{t.contact.message}</label>
            </div>
            <div className="hp" aria-hidden="true">
              <label htmlFor="f-company">Company</label>
              <input id="f-company" name="company" tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
            <div className="send">
              <button
                className="orb"
                type="submit"
                disabled={status === 'sending'}
                data-cursor="send"
                onPointerMove={magnet}
                onPointerLeave={(e) => (e.currentTarget.style.transform = '')}
              >
                {status === 'sending' ? t.contact.sending : t.contact.send}
              </button>
              <p className={`form-note${status === 'sent' || status === 'preview' ? ' ok' : ''}`} role="status">
                {note}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
