import type fr from './fr';

// Texts are plain strings. Words between *asterisks* are shown in orange.
const en: typeof fr = {
  meta: {
    title: 'Widget Consulting · Software studio in Sfax',
    description:
      'Widget Consulting is a software studio in Sfax building websites, mobile apps, dashboards and custom software for businesses in Tunisia and worldwide.',
    ogTitle: 'Every business is missing a piece.',
  },
  a11y: {
    brand: 'Widget Consulting, back to top',
    scene: 'Three-dimensional field of tiles; an orange tile settles into the one empty slot as you scroll',
    menu: 'Main menu',
    language: 'Language',
  },
  nav: { studio: 'Studio', services: 'Services', build: 'Build yours', work: 'Work', cta: 'Start', ctaLong: 'a project' },
  hero: {
    eyebrow: 'Software studio · Sfax → worldwide',
    lines: ['Every business', 'is missing', 'a *piece*.'],
    text: 'We design and build it: web platforms, mobile apps, dashboards and custom software, made by one team for businesses everywhere.',
    cue: 'Scroll to place it',
  },
  marquee: ['Web platforms', 'Mobile apps', 'Dashboards', 'Custom software', 'Cloud', 'IT consulting'],
  studio: {
    label: 'The studio',
    manifesto:
      "We are a software studio in Sfax. We build the *pieces* businesses run on: the website that sells, the app in your client's pocket, the dashboard that replaces ten spreadsheets. One team from first sketch to launch. A fixed scope, and every week something you can *click.*",
  },
  services: {
    title: 'What we build',
    startWith: 'Start with',
    items: [
      { title: 'Web platforms', text: 'Business websites, client portals and web apps that load fast and are easy to update.', start: 'Website · 3 weeks' },
      { title: 'Mobile apps', text: 'iOS and Android apps for your customers, or for your teams in the field.', start: 'MVP · 8 weeks' },
      { title: 'Dashboards', text: 'Your numbers in one live dashboard, instead of ten spreadsheets nobody trusts.', start: 'Dashboard sprint · 2 weeks' },
      { title: 'Custom software', text: 'ERP, CRM and internal tools shaped around how your company actually works.', start: 'Free audit' },
      { title: 'Cloud & integration', text: 'Hosting, migrations, and connecting the tools you already pay for.', start: 'Free audit' },
      { title: 'IT consulting', text: 'Audits and roadmaps, so you never spend on the wrong tool.', start: 'Free 30-min call' },
    ],
  },
  builder: {
    label: 'Build yours',
    title: "Pick your pieces. We'll show you where to start.",
    picks: {
      web: { name: 'Website', sub: 'sites · portals' },
      app: { name: 'Mobile app', sub: 'iOS · Android' },
      data: { name: 'Dashboard', sub: 'data · reporting' },
      erp: { name: 'Custom software', sub: 'ERP · CRM · tools' },
      cloud: { name: 'Cloud', sub: 'hosting · integration' },
      advice: { name: 'Advice', sub: 'audit · roadmap' },
    },
    blueprint: 'Your blueprint',
    empty: 'No pieces yet. Select the tiles that match your project.',
    where: 'Where to start',
    send: 'Send my blueprint',
    piece: 'piece',
    suggestions: {
      none: ['Free 30-minute audit', "Tell us about your business and we'll tell you what to build first."],
      web: ['Business website · 3 weeks', 'Our fixed-scope website package fits this.'],
      data: ['Dashboard sprint · 2 weeks', 'One live dashboard on your data, fixed scope.'],
      audit: ['Free 30-minute audit', 'We review your setup, then send a fixed proposal.'],
      mvp: ['MVP · about 8 weeks', 'A first working version, with a demo every week.'],
      custom: ['Custom project', 'Several pieces together. We scope it with you in a free call, then send a fixed proposal.'],
    },
    msgPieces: 'Pieces I need: ',
    msgStart: 'Suggested start: ',
    msgAbout: 'About my project: ',
  },
  process: {
    label: 'How we work',
    title: 'Built piece by piece, with you watching.',
    steps: [
      { when: 'Day 1', title: 'Free audit call', text: '30 minutes to understand your need and your constraints.' },
      { when: 'Week 1', title: 'Fixed proposal', text: 'Scope, price and deadline in writing before we start.' },
      { when: 'Every week', title: 'Build in sprints', text: 'A demo you can click every week. No surprises.' },
      { when: 'Launch', title: 'The piece lands', text: 'We go live together, and stay to keep it running.' },
    ],
  },
  work: {
    label: 'Selected work',
    title: "Pieces we've shipped.",
    items: [
      { shot: '[Project screenshot]', name: '[Project name]', line: '[Client type] · [What you built] · [Result in one line]' },
      { shot: '[Project screenshot]', name: '[Project name]', line: '[Client type] · [What you built] · [Result in one line]' },
      { shot: '[Project screenshot]', name: '[Project name]', line: '[Client type] · [What you built] · [Result in one line]' },
    ],
  },
  offers: {
    label: 'Ready-made offers',
    title: 'Clear scope. Clear price. Clear deadline.',
    items: [
      { when: '3 weeks', title: 'Business website', points: ['Design and content structure', 'Up to [X] pages, mobile-ready', 'Contact form, analytics, SEO basics'], price: '[YOUR PRICE]' },
      { when: '2 weeks', title: 'Dashboard sprint', points: ['Connect your data sources', 'One live dashboard for your team', 'Training session included'], price: '[YOUR PRICE]' },
      { when: '8 weeks', title: 'MVP', points: ['A first working web or mobile product', 'Weekly demos you can click', 'Launch support'], price: '[YOUR PRICE]' },
    ],
  },
  contact: {
    label: 'Contact',
    title: 'Tell us which piece *is missing.*',
    email: '[contact@yourdomain]',
    whatsapp: '[+216 00 000 000]',
    studio: 'Sfax, Tunisia',
    languagesLabel: 'Languages',
    replyLabel: 'Reply',
    reply: 'Within one working day',
    name: 'Your name',
    message: 'Your project',
    send: 'Send',
    sending: 'Sending…',
    hint: 'We reply within one working day.',
    error: 'Add your name and a valid email so we can reply.',
    failed: 'Sending failed. Try again, or email us directly.',
    sent: "Thank you! Your request was sent. We'll get back to you shortly.",
    preview: 'Received in local mode: the request is printed in the terminal. Add a Resend key to receive e-mails.',
  },
  footer: { copy: '© 2026 Widget Consulting · Sfax, Tunisia', domain: '[yourdomain.com]' },
  cursor: { talk: 'Talk', drop: 'Drop', drag: 'Drag', add: 'Add', send: 'Send', view: 'View' },
};

export default en;
