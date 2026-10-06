# ThreatShield-Website

This is the companion site for the ThreatShield app.

Visit the [website](https://threatshield.eu/).

# Development

This site is built with Vite, TailwindCSS, and Handlebars partials.
It is a static site: five HTML pages under `src/`, no framework, no backend.

Guidance for coding agents and a map of the repo is in [AGENTS.md](AGENTS.md).

## Prerequisites

Node.js 20 or newer and npm.

## How to run locally

Install dependencies:

```shell
npm install
```

Run the dev server on http://localhost:8000:

```shell
npm start
```

Build the production assets into `dist/`:

```shell
npm run build
```

## Deploy

The site is deployed to Cloudflare Pages.

Pushing to `main` triggers the Cloudflare build pipeline, which runs `npm run build`
and publishes `dist/`. There is no GitHub Actions workflow.
