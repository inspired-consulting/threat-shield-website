# ThreatShield-Website

This is a companion site for ThreatShield App.

Visit the [website](https://threatshield.eu/).

# Development

This site is build using TailwindCSS, Handlebars, and Vite.

## How to run locally

Install dependencies:

```shell
npm install
```

Run server for local development:

```shell
npm start
```

Build assets:

```shell
npm run build
```

## Deploy

The site is deployed to Cloudflare pages.

Just commit and push changes. This will trigger the Cloudflare build pipeline.

## Initial setup

This repo has been set up by these commands:

    npm install -D tailwindcss postcss autoprefixer vite vite-plugin-handlebars rimraf
    mkdir {src,src/js,src/css}
    touch src/index.html src/js/main.js src/css/main.scss vite.config.js
    npx tailwindcss init -p
