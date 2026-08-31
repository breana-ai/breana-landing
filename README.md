# Breana landing page

This private repository contains only the production Breana landing page. It is a dependency-free static site prepared for continuous deployment with Netlify.

## Deploy with Netlify

1. In Netlify, choose **Add new project** and **Import an existing project**.
2. Select GitHub and choose `breana-ai/breana-landing`.
3. Use `main` as the production branch.
4. Leave the build command empty.
5. The root `netlify.toml` publishes the repository root (`.`).

Netlify will deploy every accepted push to `main`. The production site assumes the canonical origin is `https://breana.ai/`.

## Updating the site

Edit the files in this repository, preview the changes locally, then commit and push them to `main`. Netlify will deploy the new commit automatically.

## Architecture

- Semantic static HTML with local CSS and JavaScript
- Self-hosted fonts and optimized images
- Netlify security, caching, and redirect rules
- Accessible form labels and keyboard-operable workflow controls
- Organization and WebSite structured data
- Existing Google Forms waitlist destination
- No analytics or advertising pixels enabled

See `QA.md` for the current validation record and `TRACKING.md` before adding analytics or advertising pixels.

The coral mark in `assets/brand/` is the approved website derivative of the canonical Breana reciprocal-claw vector master. Do not retrace or replace it from a raster source.
