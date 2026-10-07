import en from './i18n/locales/en.json';
import fr from './i18n/locales/fr.json';
import ht from './i18n/locales/ht.json';

export const LOCALES = ['en', 'fr', 'ht'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export type Strings = typeof en;

const dicts: Record<Locale, Strings> = { en, fr, ht } as Record<Locale, Strings>;

export function isLocale(value: string | undefined | null): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

export function getStrings(locale: Locale): Strings {
  return dicts[locale] ?? dicts[DEFAULT_LOCALE];
}

export function resolveLocale(currentLocale: string | undefined): Locale {
  return isLocale(currentLocale) ? currentLocale : DEFAULT_LOCALE;
}

export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  if (clean === '/') return `${prefix}/`;
  const withSlash = clean.endsWith('/') ? clean : `${clean}/`;
  return `${prefix}${withSlash}`;
}

export function stripLocale(pathname: string): { locale: Locale; rest: string } {
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];
  if (isLocale(first) && first !== DEFAULT_LOCALE) {
    const rest = segments.slice(1);
    return { locale: first, rest: rest.length ? `/${rest.join('/')}/` : '/' };
  }
  return { locale: DEFAULT_LOCALE, rest: pathname.endsWith('/') ? pathname : `${pathname}/` };
}
