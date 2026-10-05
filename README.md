# quentin-charbonnier

CV monopage bilingue (FR/EN) de Quentin Charbonnier — géologue de l'exploration et
des ressources. Architecture dupliquée depuis `camilleaubert.com` (Astro 6 + Tailwind 4,
modèle de contenu JSON), redessinée en **esthétique Mac OS 9 / System 7**.

## Stack

- **Astro 6** (site statique, TypeScript strict) — Node **≥ 22.12** requis (`.nvmrc`)
- **Tailwind CSS 4** (`@theme` : tokens couleur/typo/ombres dans `src/styles/global.css`)
- **Silkscreen** (Google Font auto-hébergée via `@fontsource`) pour le chrome ; Geneva/Verdana en texte courant
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
│   ├── menu-bar.astro → barre de menus fixe (menu Apple, sections, FR|EN, horloge)
│   ├── mac-window.astro → chrome de fenêtre System 7 (titre rayé, boîtes, ombre dure)
│   └── sections/      → les 8 fenêtres (About, Infos système, Parcours, Langues…)
├── scripts/menu.ts    → horloge, section active (IntersectionObserver), menu Apple
└── styles/global.css  → tokens + `.desktop-grid` (grille bureau 3 colonnes)
```

## Contenu

Tout le texte vit dans `src/i18n/fr.json` et `src/i18n/en.json` (mêmes clés) :
expérience, formation, compétences, langues, qualités, centres d'intérêt, contact.
Ajouter une section = ajouter les clés dans les 2 JSON + une fenêtre dans
`src/components/desktop.astro`.

## Déploiement

URL publique définie dans `config-domain.mjs` (et `public/robots.txt`) — actuellement
placeholder GitLab Pages. `BASE_PATH` gère un éventuel sous-chemin (`/<repo>/`).
