# Next.js SEO Starter

Next.js 15 (App Router) + TypeScript starter with the boring-but-important parts done right.

- Metadata API: title template, Open Graph, Twitter, canonical
- `sitemap.ts` and `robots.ts`
- JSON-LD component (Organization example, XSS-safe)
- Contact form -> `/api/contact` with honeypot, time trap, validation and rate limiting
- Optional webhook delivery (`CONTACT_WEBHOOK_URL`) for Slack, Make, Zapier or GoHighLevel
- Security headers in `next.config.mjs`

```bash
npm install
cp .env.example .env.local
npm run dev
```
