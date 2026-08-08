# Deployment

The site is a static-friendly Next.js application with no database or runtime secrets.

## Vercel

1. Import the repository into Vercel.
2. Use the detected Next.js build settings.
3. Set the production domain used by `metadataBase`, sitemap, and robots.
4. No deployment secrets are required by the repository workflow.

## Cloudflare

Use the Next.js deployment adapter appropriate for the selected Cloudflare product, or export static output after confirming all desired features are compatible. Update the canonical domain in `src/app/layout.tsx`, `src/app/sitemap.ts`, and `src/app/robots.ts`.

The GitHub Actions workflow validates code; it does not deploy.
