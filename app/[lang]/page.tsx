import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import Intro from '@/components/Intro';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Manifesto from '@/components/Manifesto';
import ServicesReel from '@/components/ServicesReel';
import Builder from '@/components/Builder';
import { Process, Work, Offers, Footer } from '@/components/Sections';
import Contact from '@/components/Contact';
import Effects from '@/components/Effects';
import { notFound } from 'next/navigation';

export default function Home({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang as Locale;
  const t = getDictionary(lang);

  return (
    <>
      <Intro />
      <Header t={t} lang={lang} />
      <main id="top">
        <Hero t={t} />
        <Marquee items={t.marquee} />
        <Manifesto label={t.studio.label} text={t.studio.manifesto} />
        <ServicesReel t={t} />
        <Builder t={t} />
        <Process t={t} />
        <Work t={t} />
        <Offers t={t} />
        <Contact t={t} lang={lang} />
      </main>
      <Footer t={t} />
      <Effects cursor={t.cursor} />
    </>
  );
}
