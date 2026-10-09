import fr from '@/dictionaries/fr';
import en from '@/dictionaries/en';

export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

export type Dict = typeof fr;

const dictionaries: Record<Locale, Dict> = { fr, en };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: string): Dict {
  return dictionaries[isLocale(locale) ? locale : defaultLocale];
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
