# Sparkforge Technologies — Corporate Website

Phase 1 corporate website built with Next.js App Router, TypeScript and Tailwind CSS.

## Pages
- Home, About, Services overview and seven service division pages
- Projects gallery with category filtering and keyword search
- Individual project case studies
- Technology ecosystem, Contact, Privacy Policy and Terms of Service
- Responsive navigation, metadata, sitemap, robots rules and 404 page

## Local development
```bash
npm install
npm run dev
```

## Validation
```bash
npm run typecheck
npm run lint
npm run build
```

## Before public launch
- Replace the temporary logo approximation with the original approved logo export. The current source artwork is a flattened moodboard-style image, not an isolated transparent vector master.
- Confirm the permanent domain and update siteUrl in src/app/layout.tsx, src/app/sitemap.ts and src/app/robots.ts.
- Replace the mail-app contact fallback with a monitored server-side enquiry endpoint and spam protection.
- Confirm client publication permissions and approve project summaries and screenshots.
- Review Privacy Policy and Terms with a qualified professional for applicable legal requirements.
- Run typecheck, lint, production build, responsive QA and accessibility checks before merging.

## Environment
No private API keys are committed. The current enquiry form uses an email-client handoff; it does not claim to store or send submissions through a backend. The site is being reviewed through a Netlify deploy preview. Do not merge to the production branch until review and explicit approval.
