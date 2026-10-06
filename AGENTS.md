# AGENTS.md — threatshield.eu website

Guidance for AI coding agents (Claude Code, Codex, Copilot, …) working in this repo.
`CLAUDE.md` imports this file; keep all content here.

## What this repo is

Static marketing and companion website for the ThreatShield app, served at
https://threatshield.eu/. Five plain HTML pages, Tailwind CSS, a few lines of
vanilla JS. No framework, no backend, no tests.

Owner: Inspired Consulting GmbH. Public repo, MIT license.

## Stack

| Concern    | Tool                                   |
|------------|----------------------------------------|
| Bundler    | Vite 7 (`vite.config.js`)              |
| Templating | `vite-plugin-handlebars` (partials only) |
| CSS        | Tailwind CSS 3 + PostCSS + Autoprefixer |
| JS         | Vanilla ES module, no dependencies     |
| Hosting    | Cloudflare Pages, builds on push to `main` |

Node 20+ works locally. There is no `.nvmrc`. There is no GitHub Actions workflow;
Cloudflare Pages runs `npm run build` itself on every push to `main`.

## Commands

```shell
npm install        # install dev dependencies
npm start          # Vite dev server on http://localhost:8000
npm run build      # rimraf dist && vite build  -> ./dist
npm run clean      # remove ./dist
```

`npm test` is a placeholder and exits 1. There are no linters or formatters configured.
Verify changes by running `npm run build` and by viewing the page with `npm start`.

## Layout

```
src/                     Vite root (vite.config.js sets root to src/)
  index.html             Landing page (hero, benefits, how it works, offers, about, contact)
  documentation.html     Docs / knowledge page
  imprint.html           Legal: imprint
  privacy.html           Legal: privacy policy
  terms.html             Legal: terms of service
  partials/
    doc_head.hbs         Favicon + webmanifest links, included in <head>
    footer.hbs           Shared footer with page links and copyright
  css/main.css           Tailwind directives + custom component/animation CSS
  js/main.js             Desktop navbar show/hide on scroll
  img/                   Images (webp, gif, png) and ts_icons/*.svg
  logos/                 ThreatShield and GitHub logos
  public/robots.txt      Copied as-is to dist root
  favicon*, site.webmanifest, android-chrome-*, apple-touch-icon.png
dist/                    Build output, git-ignored
tailwind.config.js       Brand colors (primary purple, secondary teal, custom gray)
postcss.config.js        tailwindcss + autoprefixer
.editorconfig            4 spaces, LF, UTF-8, max line 120
```

## How things fit together

- **Adding a page**: create `src/<name>.html`, then register it in
  `build.rollupOptions.input` in `vite.config.js`. Pages not listed there are not
  built. Add a link in `src/partials/footer.hbs` if it should be reachable.
- **Partials**: use `{{> name }}` in HTML. Only `doc_head` and `footer` exist.
  There is no layout partial; each page repeats its own `<head>` and `<nav>`.
- **Tailwind content globs** are in `tailwind.config.js` (`./src/**/*.{js,html,hbs}`).
  New file types with classes must be added there or their classes get purged.
- **Brand colors**: use `primary-*`, `secondary-*`, `gray-*` from the Tailwind
  config. Do not introduce raw hex values in HTML; a few inline gradient styles on
  `<body>` and the navs are the existing exception.
- **Custom CSS classes** are prefixed `ts-` (e.g. `ts-card-shadow`, `ts-external-link`,
  `ts-hover-trigger`). Follow that convention for new non-Tailwind classes.
- **JavaScript**: `src/js/main.js` is loaded as a module on every page except
  `documentation.html`. `index.html` also contains
  two inline `<script>` blocks: mobile menu toggle and the rotating hero word
  effect (`#changing-word`, `.letter` classes in `main.css`).
- **Asset references** in HTML use relative paths (`./img/...`, `./logos/...`).
  Vite hashes them into `dist/assets/`. Files in `src/public/` are copied verbatim.

## Conventions

- Indent with 4 spaces (`.editorconfig`). Keep LF line endings.
- Content language is English. Some code comments are in German; either is fine
  in comments, but all user-facing text must be English.
- Commit messages: short imperative sentence, no prefix convention.
- Work on a feature branch and open a PR to `main`. Pushing to `main` deploys.
- Keep images optimized (webp preferred). The repo already carries large GIFs;
  do not add more without compressing.

## Things to know before changing anything

- `#navbar` show/hide logic in `main.js` only activates when a `#navbar` element
  exists and `window.innerWidth > 1023`. The mobile nav (`#mobileNav`) is a
  separate element. Legal pages and `documentation.html` have no navbar.
- The footer copyright year is hard-coded in `footer.hbs`.
- There are no tests, so a successful `npm run build` plus a visual check in the
  dev server is the acceptance bar.
