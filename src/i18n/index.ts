import fr from './fr.json';
import en from './en.json';
import workFr from './work.fr.json';
import workEn from './work.en.json';

export type Locale = 'fr' | 'en';
export type WorkContent = typeof workFr;
export type WorkArticleSlug = keyof typeof workFr.articles;

export function getContent(locale: Locale): typeof fr {
  return locale === 'en' ? (en as unknown as typeof fr) : fr;
}

export function getWorkContent(locale: Locale): WorkContent {
  return locale === 'en' ? (workEn as unknown as WorkContent) : workFr;
}
