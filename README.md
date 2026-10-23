# Jameric Generator Repairs & Service

# Enquiry backend

Run frontend: `npm run dev:client`
Run backend: `npm run dev:server`
Run both: `npm run dev:all`

Backend typecheck: `npm run typecheck:server`
Backend build: `npm run build:server`
Start built backend: `npm run start:server`

Preview delivery captures email content without sending. Set DELIVERY_MODE=smtp and SMTP_* to send.


React/Vite/TypeScript multi-page website.

## Prerequisites
- Node.js 20+
- npm
- Chromium for Puppeteer prerendering (installed automatically by Puppeteer or system Chrome)

## Commands
- `npm run dev` - local dev server
- `npm run typecheck` - TypeScript project check
- `npm run lint` - lint
- `npm run test` - tests
- `npm run build:client` - client build only
- `npm run prerender` - prerender routes (requires preview server)
- `npm run build` - typecheck + client build + prerender
- `npm run preview` - preview production build

## Production origin
Set `VITE_SITE_ORIGIN` (or update `src/data/business.ts`) to configure canonical origin. No domain invented.

## Static hosting requirements
- Serve `dist/` as static files
- SPA fallback to index.html for unknown client routes; prerendered route HTML exists for known routes
- Unknown service slug shows client not-found state (not HTTP 404 from Vite preview)

## Enquiry limitations
- Form prepares summary only; does not send or store data.
- No backend/email/database/auth/booking.
