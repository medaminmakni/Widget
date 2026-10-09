import { NextResponse, type NextRequest } from 'next/server';

const locales = ['fr', 'en'];

function pickLocale(req: NextRequest): string {
  const saved = req.cookies.get('NEXT_LOCALE')?.value;
  if (saved && locales.includes(saved)) return saved;
  const header = (req.headers.get('accept-language') || '').toLowerCase();
  const first = header.split(',')[0]?.trim() || '';
  // French and Arabic speakers get French; everyone else English.
  if (first.startsWith('fr') || first.startsWith('ar')) return 'fr';
  return 'en';
}

/** Sends visitors from "/" (or any path without a language) to /fr or /en. */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${pickLocale(req)}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip API routes, Next internals and files with an extension (icons, images, sitemap…)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
