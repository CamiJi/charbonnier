import fr from './fr.json';
import en from './en.json';

export type Locale = 'fr' | 'en';

export function getContent(locale: Locale): typeof fr {
  return locale === 'en' ? (en as unknown as typeof fr) : fr;
}
