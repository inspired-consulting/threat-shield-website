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
| Bundler    | Vite 8 (`vite.config.mjs`)              |
| Templating | `vite-plugin-handlebars` (partials only) |
| CSS        | Tailwind CSS 4 via `@tailwindcss/vite` (no PostCSS config) |
| JS         | Vanilla ES module, no dependencies     |
| Hosting    | Cloudflare Pages, builds on push to `main` |

Vite 8 requires Node 20.19+ or 22.12+. There is no `.nvmrc`. There is no GitHub Actions workflow;
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
src/                     Vite root (vite.config.mjs sets root to src/)
  index.html             Landing page (hero, what it does, features, run it yourself, demo, contribute, about)
  documentation.html     Docs / knowledge page
  imprint.html           Legal: imprint
  privacy.html           Legal: privacy policy
  terms.html             Legal: terms of service
  partials/
    doc_head.hbs         Favicon + webmanifest links, included in <head>
    footer.hbs           Shared footer with page links and copyright
  css/main.css           Tailwind import, @theme brand colors, custom component/animation CSS
  js/main.js             Desktop navbar show/hide on scroll
  img/                   Images (webp, gif, png) and ts_icons/*.svg
  logos/                 ThreatShield and GitHub logos
  public/                robots.txt and llms.txt, copied as-is to dist root
  favicon*, site.webmanifest, android-chrome-*, apple-touch-icon.png
dist/                    Build output, git-ignored
.editorconfig            4 spaces, LF, UTF-8, max line 120
```

## How things fit together

- **Adding a page**: create `src/<name>.html`, then register it in
  `build.rollupOptions.input` in `vite.config.mjs`. Pages not listed there are not
  built. Add a link in `src/partials/footer.hbs` if it should be reachable.
- **Partials**: use `{{> name }}` in HTML. Only `doc_head` and `footer` exist.
  There is no layout partial; each page repeats its own `<head>` and `<nav>`.
- **Tailwind 4 is CSS-first**: there is no `tailwind.config.js`. Source files are
  detected automatically (everything not git-ignored). Theme values live in the
  `@theme` block at the top of `src/css/main.css`.
- **Brand colors**: use `primary-*`, `secondary-*`, `gray-*` from the `@theme`
  block. The default Tailwind gray scale is replaced; only `gray-100` to `gray-900`
  exist. Do not introduce raw hex values in HTML; a few inline gradient styles on
  `<body>` and the navs are the existing exception.
- **Tailwind 4 renames to remember**: `rounded-sm` is now `rounded-xs`, the old bare
  `rounded` is now `rounded-sm`, `outline-none` is `outline-hidden`, opacity goes in
  the color (`ring-primary-400/75`). Default border color is `currentColor`, so
  always set a border color class. Buttons get `cursor: pointer` from a base rule.
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
- Keep images optimized: webp, sized close to the largest rendered size (2x for
  retina), `width`/`height` attributes set, `loading="lazy"` below the fold. Animated
  icons are animated webp, not GIF. No spaces in image file names; they break `srcset`.
- `src/public/llms.txt` summarizes the project for AI crawlers. Update it when the
  positioning, links or legal pages change.

## Things to know before changing anything

- `#navbar` show/hide logic in `main.js` only activates when a `#navbar` element
  exists and `window.innerWidth > 1023`. The mobile nav (`#mobileNav`) is a
  separate element. Legal pages and `documentation.html` have no navbar.
- The footer copyright year is hard-coded in `footer.hbs`.
- There are no tests, so a successful `npm run build` plus a visual check in the
  dev server is the acceptance bar.
