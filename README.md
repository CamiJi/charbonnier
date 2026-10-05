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
```

## Structure

```
config-domain.mjs      → SITE_URL + BASE_PATH (à adapter à l'URL de déploiement)
src/
├── i18n/              → fr.json / en.json = TOUT le contenu du CV (source de vérité)
├── pages/index.astro  → version FR (/)
├── pages/en/index.astro → version EN (/en/)
├── components/
│   ├── site-header.astro / site-footer.astro → navigation, coordonnées, cartouche
│   ├── section-panel.astro → titre éditorial et repère cartographique
│   └── sections/      → présentation, log stratigraphique, formation, contact…
├── public/contours.svg → courbes de niveau décoratives (aria-hidden)
└── styles/global.css  → tokens, trames stratigraphiques, grille responsive
```

## Contenu

Tout le texte vit dans `src/i18n/fr.json` et `src/i18n/en.json` (mêmes clés) :
expérience, formation, compétences, langues, qualités, centres d'intérêt, contact.
Chaque expérience porte un identifiant de strate qui associe sa trame à la légende.
Ajouter une section = ajouter les clés dans les 2 JSON + un panneau dans
`src/components/desktop.astro`.

## Déploiement

URL publique définie dans `config-domain.mjs` (et `public/robots.txt`) :
`https://camiji.github.io/charbonnier/`. `BASE_PATH` gère le sous-chemin GitHub Pages.
Le workflow `.github/workflows/deploy.yml` publie automatiquement `dist/` sur chaque
push vers `main` ; il active également GitHub Pages lors du premier déploiement.
