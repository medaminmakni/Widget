import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import { getDictionary, isLocale, locales, siteUrl } from '@/lib/i18n';

type Props = { children: ReactNode; params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { fr: '/fr', en: '/en', 'x-default': '/fr' },
    },
    openGraph: {
      type: 'website',
      siteName: 'Widget Consulting',
      title: t.meta.title,
      description: t.meta.description,
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      url: `/${lang}`,
    },
    twitter: { card: 'summary_large_image', title: t.meta.title, description: t.meta.description },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F2EC' },
    { media: '(prefers-color-scheme: dark)', color: '#0C0E12' },
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Widget Consulting',
  description: 'Software studio in Sfax building web platforms, mobile apps, dashboards and custom software for businesses in Tunisia and worldwide.',
  address: { '@type': 'PostalAddress', addressLocality: 'Sfax', addressCountry: 'TN' },
  areaServed: 'Worldwide',
  knowsLanguage: ['fr', 'en', 'ar'],
  url: siteUrl,
};

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=Instrument+Sans:wght@400..700&family=JetBrains+Mono:wght@400;600&display=swap"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
