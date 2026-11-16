# Web Dev Starters

[![CI](https://github.com/CodeWithLiaqat/web-dev-starters/actions/workflows/ci.yml/badge.svg)](https://github.com/CodeWithLiaqat/web-dev-starters/actions/workflows/ci.yml) ![License: MIT](https://img.shields.io/badge/license-MIT-green)

Small, production-minded starters and snippets I use on client projects. Copy what you need.

| Folder | Stack | What you get |
|---|---|---|
| [`nextjs-seo-starter`](nextjs-seo-starter) | Next.js 15, TypeScript | Metadata/OG, sitemap, robots, JSON-LD, spam-protected contact API, security headers |
| [`vite-react-starter`](vite-react-starter) | Vite, React 19, TypeScript, Vitest | Reusable hooks, scroll Reveal, accessible Accordion, tested helpers |

MIT licensed. No tracking, no CDN.

## About the author
**Liaqat Ali Khan**: full-stack engineer (Next.js, React, WordPress/Elementor, WooCommerce, AI chatbots, technical SEO). Available for client work.
- Portfolio: https://codeics.me
- Company: https://miavrosystems.com
- Fiverr: codewithliaqat | [LinkedIn](https://www.linkedin.com/in/codeics) | [GitHub](https://github.com/CodeWithLiaqat)

## Quality bar
- TypeScript `strict` + `noUncheckedIndexedAccess`
- Unit tests (Vitest) for logic and the API route
- GitHub Actions CI: typecheck, test and build for every project on each push and PR
- Accessibility-first components, `prefers-reduced-motion` respected
- Security: input validation, honeypot, time trap, rate limiting, security headers, XSS-safe JSON-LD
