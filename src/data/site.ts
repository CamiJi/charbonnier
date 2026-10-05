import { SITE_URL, BASE_PATH } from '../../config-domain.mjs';

/** Préfixe de sous-chemin ('' si BASE_PATH = '/'), sans slash final. */
const prefix = BASE_PATH.replace(/\/$/, '');

export const site = {
  name: 'Quentin Charbonnier',
  profiles: {
    linkedIn: 'https://www.linkedin.com/in/quentin-charbonnier-4939552a1/',
  },
  /** Racine publique du site, sans slash final (gère le sous-chemin GitHub Pages). */
  url: `${SITE_URL}${prefix}`,

  /** URL absolue d'une version linguistique ('/' = racine de la locale). */
  href(locale: 'fr' | 'en', path = '/'): string {
    const suffix = locale === 'fr' ? path : `/en${path === '/' ? '/' : path}`;
    return `${SITE_URL}${prefix}${suffix}`;
  },

  /** Chemin interne d'une version linguistique (liens de langue, sans rechargement d'origine). */
  path(locale: 'fr' | 'en'): string {
    return locale === 'fr' ? `${prefix}/` : `${prefix}/en/`;
  },

  /** URL d'un asset statique public/ respectant BASE_PATH. */
  asset(path: string): string {
    return `${prefix}/${path.replace(/^\//, '')}`;
  },
};
