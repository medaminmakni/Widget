import { NextResponse } from 'next/server';

type Body = { name?: unknown; email?: unknown; message?: unknown; company?: unknown; lang?: unknown };

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  // Spam bots fill the hidden "company" field; pretend success and drop it.
  if (clean(body.company, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const message = clean(body.message, 5000);
  const lang = clean(body.lang, 5) || 'fr';

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid_fields' }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM || 'Widget Consulting <onboarding@resend.dev>';

  // Local mode: no e-mail service configured yet. Print the request so nothing is lost.
  if (!apiKey || !to) {
    console.log('\n[contact] New request (local mode, no e-mail sent)\n', { name, email, lang, message }, '\n');
    return NextResponse.json({ ok: true, preview: true });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Nouveau projet · ${name}`,
      text: `Nom : ${name}\nEmail : ${email}\nLangue : ${lang}\n\n${message}`,
      html: `<p><b>Nom :</b> ${escapeHtml(name)}<br><b>Email :</b> ${escapeHtml(email)}<br><b>Langue :</b> ${escapeHtml(lang)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    }),
  });

  if (!res.ok) {
    console.error('[contact] Resend error', res.status, await res.text().catch(() => ''));
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
