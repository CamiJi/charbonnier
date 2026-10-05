# quentin-charbonnier

CV monopage bilingue (FR/EN) de Quentin Charbonnier — géologue de l'exploration et
des ressources. Architecture dupliquée depuis `camilleaubert.com` (Astro 6 + Tailwind 4,
modèle de contenu JSON), habillée d'une **identité naturaliste et cartographique**.

## Stack

- **Astro 6** (site statique, TypeScript strict) — Node **≥ 22.12** requis (`.nvmrc`)
- **Tailwind CSS 4** (`@theme` : tokens couleur/typo/ombres dans `src/styles/global.css`)
- **Source Serif 4**, **Inter** et **IBM Plex Mono** (auto-hébergées via `@fontsource`)
- `@astrojs/sitemap` + `robots.txt`

> ⚠️ `package.json` pinné : `astro@6.3.1`, `@tailwindcss/vite@4.3.0`, `tailwindcss@4.3.0`
> et un `overrides.vite: 7.3.3` — sans ça, npm mélange Vite 7 (Astro) et Vite 8 rolldown
> (peer de Tailwind) et le build casse sur `tsconfigPaths`.

## Commandes

```bash
npm install
npm run dev      # serveur de dev
npm run build    # build statique → dist/
npm run preview  # sert dist/
npm run check    # astro check (typage)
npm run optimize:work-images # convertit les sources JPEG de assets/ en WebP sans EXIF
```

## Structure

```
config-domain.mjs      → SITE_URL + BASE_PATH (à adapter à l'URL de déploiement)
assets/                → sources locales ignorées par Git (PDF/JPEG originaux)
public/
├── work/              → photos WebP optimisées (EXIF supprimé)
└── contours.svg       → courbes de niveau décoratives (aria-hidden)
scripts/optimize-work-images.mjs → reconstruit les WebP depuis assets/
src/
├── i18n/              → fr.json / en.json (CV) + work.fr/en.json (Travaux et billets)
├── pages/             → home FR/EN + routes blog FR/EN
├── components/        → header/footer, section-panels, articles, sections
└── styles/global.css  → tokens, trames stratigraphiques, cartes Work, responsive
```

## Contenu

Tout le texte vit dans `src/i18n/fr.json` et `src/i18n/en.json` (mêmes clés) :
expérience, formation, compétences, langues, qualités, centres d'intérêt, contact.
Chaque expérience porte un identifiant de strate qui associe sa trame à la légende.
Les travaux et les billets (Salsigne, Coiron) vivent dans `src/i18n/work.fr.json` et
`work.en.json`. Les originaux JPEG de `assets/` ne sont jamais servis par le site ; seuls
les WebP générés dans `public/work/` sont publiés. Le PDF source reste dans `assets/` et
sa copie de téléchargement est `public/work/salsigne-field-report.pdf`.
Les routes d’articles sont générées à partir des slugs présents dans les deux fichiers
Work (`/blog/{slug}/` et `/en/blog/{slug}/`).

## Déploiement

URL publique définie dans `config-domain.mjs` (et `public/robots.txt`) :
`https://camiji.github.io/charbonnier/`. `BASE_PATH` gère le sous-chemin GitHub Pages.
Le workflow `.github/workflows/deploy.yml` publie automatiquement `dist/` sur chaque
push vers `main` ; il active également GitHub Pages lors du premier déploiement.
